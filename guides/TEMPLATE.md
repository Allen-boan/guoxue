# 行为方法整理模板

先看[行为指南](../docs/行为指南/README.md)及所在领域页。同一方法已经存在就补充它；一个领域可以包含多种方法，每种方法使用独立段落和登记 id。

普通网友可以直接[投稿](https://github.com/Allen-boan/guoxue/issues/new?template=new-theory.yml)，不需要填写 YAML。

## 结构化登记

```yaml
id: 待填写稳定且唯一的英文标识
name: 待填写方法名称
category: 待填写生活领域
source_type: guoxue_practice
summary: 待填写一句话介绍
status: observation
cost_dimensions: []
quality_dimensions: []
cost_changes:
  reduced: []
  increased: []
quality_effects:
  maintained: []
  improved: []
core_principles: []
benefits: []
risks: []
boundaries: []
applicable_when: []
not_applicable_when: []
recommendation: 待核查适用条件与风险，不急于推荐。
review_status: pending_human_review
doc_path: 待填写领域正文路径
anchor: 待填写该方法在正文中的锚点
```

引用网络理论时，把 `source_type` 改为 `internet_theory`，增加 `theory_id`，填写[理论登记](../theories/registry.yaml)中已有条目的 id。作者和来源不在两处独立维护，正文链接到相应理论文章。行为入口的有限实践解释，不代表同名理论的完整主张已核验。

`guoxue_practice` 表示本项目整理的实践方法，不宣称全球首创。没有来源不等于可以编造作者；也不要给常见方法硬造一个“网络理论”的名字。

`cost_dimensions` 与 `quality_dimensions` 使用[核心规则](../constitution/core-principles.yaml)中的 id，只填实际相关项。`cost_changes` 说明减少与增加，`quality_effects` 说明维持与改善，风险和边界交代可能损失；有必要时可以补充 `assumptions`、`possible_losses` 等未知项或计算假设。

`status` 记录收录处理，`review_status` 记录审核进度，二者不能混用。维度标签和收益描述不能自动决定状态，状态变化须经人工审核。`doc_path` 与 `anchor` 必须能定位到正文，登记和文章同时更新。

## 公开正文

下面的块放在领域页里。可以用短段落、粗体标签或小标题组织，手机上也能顺着读。用一个稳定锚点让登记准确找到这一段。

```markdown
<a id="method-id"></a>

## 〔方法名称〕

一句话解释：〔它帮人怎样过好哪一件事。〕

**它解决什么问题**

写一个真实场景：谁遇到什么问题，目前怎样耗费资源。

**它降低了什么成本**

说明实际减少的金钱、时间、精力、注意力、空间、维护、决策、情绪或风险。
也交代增加的成本、比较基准和未知项，不只写有利的一边。

**它维持或提升了什么生活品质**

明确健康、睡眠、营养、舒适、安全、便利、时间自主、关系、体验等具体变化。
效果取决于条件时就写条件，不承诺每个人都会获得相同收益。

**为什么符合“过学”**

先说明硬边界，再连接成本与品质，回答“为什么值”。合理增加投入也可能值得。

**怎么做**

1. 第一个小步骤，写清需要观察什么。
2. 一个可以实际比较或尝试的动作，说明必要投入。
3. 看是否真的改善；不合适就调整或退出。

**什么时候适用**

写明预算、使用频率、身体情况、家庭责任或环境等必要条件。

**什么时候不要照搬**

说明哪些人、哪些场景需要其他方案；不把受限处境当作个人失败。

**风险和边界**

健康、安全与必要生活条件先守住。说明实际风险和核查点，不把未知写成安全。

**对应原则**

列出实际相关的原则编号和名称，例如 P05 · 综合成本与资源集中原则。

**来源类型**

本项目整理的实践方法 / 已有网络理论〔链接到理论正文〕。
```

单位使用成本、等待时长等数字工具只作辅助。健康、安全、必要医疗和重要关系不能靠低价或更多优点抵消；普通生活方法也不替代专业诊疗。
