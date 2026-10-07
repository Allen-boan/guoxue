import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docs = resolve(root, 'docs')
const errors = []
const fail = message => errors.push(message)
const read = path => readFileSync(resolve(root, path), 'utf8')
const registry = parse(read('theories/registry.yaml'))
const constitution = parse(read('constitution/core-principles.yaml'))
const statuses = new Set(['core', 'accepted', 'conditional', 'observation', 'rejected', 'archived'])
const principleIds = new Set()

for (const principle of constitution.principles) {
  if (principleIds.has(principle.id)) fail(`原则编号重复：${principle.id}`)
  principleIds.add(principle.id)
  for (const key of ['id', 'name', 'description', 'positive_signals', 'negative_signals', 'examples', 'exceptions']) {
    if (!principle[key] || (Array.isArray(principle[key]) && !principle[key].length)) fail(`${principle.id} 缺少 ${key}`)
  }
  if (!read('docs/principles/index.md').includes(`{#${principle.id.toLowerCase()}}`)) fail(`公开原则页缺少 ${principle.id} 锚点`)
}
if (principleIds.size !== 10) fail('初版应包含十条基本原则')
if (constitution.supreme_principle.name !== '生活成本可以低，生活品质不能低。') fail('最高纲领与已确认原文不一致')
if (constitution.supreme_principle.fixed_price_thresholds !== false) fail('不能设置固定价格判断标准')
if (constitution.hard_boundaries.protected_values.length !== 8) fail('健康、安全等八项底线不完整')
if (registry.constitution_version !== constitution.version) fail('理论登记引用了不同的纲领版本')

const theoryIds = new Set()
for (const theory of registry.theories) {
  if (theoryIds.has(theory.id)) fail(`理论编号重复：${theory.id}`)
  theoryIds.add(theory.id)
  if (!statuses.has(theory.status)) fail(`${theory.id} 使用未知收录状态`)
  for (const key of ['id', 'name', 'aliases', 'category', 'summary', 'status', 'source_type', 'core_principles', 'benefits', 'risks', 'boundaries', 'recommendation', 'review_status', 'page']) {
    if (theory[key] === undefined) fail(`${theory.id} 缺少 ${key}`)
  }
  for (const id of theory.core_principles) {
    if (!principleIds.has(id)) fail(`${theory.id} 引用了不存在的原则 ${id}`)
  }
  if (!existsSync(resolve(root, theory.page))) { fail(`${theory.id} 的文章不存在`); continue }
  const text = read(theory.page)
  const matter = text.match(/^---\n([\s\S]*?)\n---/)
  if (!matter) { fail(`${theory.id} 缺少文章元信息`); continue }
  const meta = parse(matter[1])
  if (meta.theory_id !== theory.id || meta.status !== theory.status || meta.review_status !== theory.review_status) fail(`${theory.id} 正文状态与登记表不同步`)
  for (let i = 1; i <= 10; i++) if (!text.includes(`## ${i}. `)) fail(`${theory.id} 缺少第 ${i} 项问答`)
  const pagePrinciples = new Set([...text.matchAll(/\*\*(P\d{2})\s/g)].map(match => match[1]))
  if ([...pagePrinciples].sort().join() !== [...theory.core_principles].sort().join()) fail(`${theory.id} 正文原则与登记表不同步`)
  if (theory.source_type === 'internet_term_unverified' && (!text.includes('准确出处待补充') || !theory.source_note?.includes('准确出处待补充'))) fail(`${theory.id} 未公开说明出处待补`)
  if (theory.source_type === 'original_creator_video') {
    if (!theory.sources?.some(source => source.evidence_type === 'primary')) fail(`${theory.id} 标为本人原视频却未提供一手来源`)
    for (const source of theory.sources ?? []) {
      if (!source.author || !source.title || !/^https:\/\//.test(source.url ?? '')) fail(`${theory.id} 来源缺少作者、标题或有效链接`)
      if (!text.includes(source.url)) fail(`${theory.id} 登记的一手来源未在公开文章中列出：${source.url}`)
    }
  }
  if (theory.source_type === 'secondary_repost_original_unverified') {
    if (!theory.sources?.some(source => source.evidence_type === 'secondary')) fail(`${theory.id} 未登记二手来源`)
    if (theory.status !== 'observation' || theory.compatibility !== 'uncertain') fail(`${theory.id} 原始主张未查实，不能直接作为已审核理论`)
    for (const source of theory.sources ?? []) {
      if (!text.includes(source.url)) fail(`${theory.id} 登记的转述来源未在文章中公开`)
    }
  }
  if (theory.status === 'accepted' && theory.review_status === 'initial_editorial') fail(`${theory.id} 未完成人工复核却标为正式收录`)
}

function walk(directory) {
  return readdirSync(directory).flatMap(name => {
    if (['.vitepress', 'node_modules', '.git', 'artifacts'].includes(name)) return []
    const path = resolve(directory, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}
const markdowns = walk(root).filter(path => extname(path) === '.md' && !path.endsWith('product-draft.md'))
for (const path of markdowns) {
  const text = readFileSync(path, 'utf8').replace(/```[\s\S]*?```/g, '')
  for (const match of text.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1]
    if (/^(?:https?:|mailto:|#)/.test(target)) continue
    const pathPart = decodeURIComponent(target.split(/[?#]/)[0])
    const resolved = pathPart.startsWith('/') ? resolve(docs, '.' + pathPart) : resolve(dirname(path), pathPart)
    const candidates = [resolved, resolved + '.md', resolve(resolved, 'index.md')]
    if (!candidates.some(candidate => existsSync(candidate) && statSync(candidate).isFile())) fail(`${relative(root, path)} 链接目标不存在：${target}`)
  }
}

for (const template of ['new-theory', 'content-correction']) {
  const form = parse(read(`.github/ISSUE_TEMPLATE/${template}.yml`))
  const fields = form.body.filter(item => item.type !== 'markdown')
  if (new Set(fields.map(item => item.id)).size !== fields.length) fail(`${template} 投稿字段编号重复`)
}
if (errors.length) {
  console.error(errors.map(error => `✗ ${error}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(`内容检查通过：${principleIds.size} 条原则、${theoryIds.size} 项理论、${markdowns.length} 篇文档；状态、原则映射和本地链接一致。`)
}
