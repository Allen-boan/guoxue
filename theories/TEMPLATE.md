# 新理论整理模板

这是内容维护者使用的模板。普通网友直接[提交新理论](https://github.com/Allen-boan/guoxue/issues/new?template=new-theory.yml)即可，不需要改文件，也不需要懂 Git。

新理论先进入“观察中”。先说清原主张，再检查硬边界和成本—品质变化，不把模板里的空位改成推测出的作者、日期或数据。同一方法已有文章时优先补充；本项目整理的日常方法使用[方法模板](../guides/TEMPLATE.md)。

```yaml
id: 待填写唯一英文标识
name: 待填写理论名称
aliases: []
parent_id: null
child_ids: []
category: 待填写
summary: 待填写一句话介绍
status: observation
compatibility: uncertain
source_type: internet_theory
source_evidence_type: 待填写实际证据情况
sources: []
source_note: 作者与原始来源待补充。
cost_dimensions: []
quality_dimensions: []
cost_changes:
  reduced: []
  increased: []
quality_effects:
  maintained: []
  improved: []
core_principles: [P01]
benefits: []
risks: []
boundaries: []
applicable_when: []
not_applicable_when: []
recommendation: 尚未建议正式收录，待核查定义、来源与适用边界。
review_status: pending_human_review
page: 待填写对应页面路径
doc_path: 与 page 填写同一路径
```

`parent_id` 留空表示主项；具体场景归入已有主项时填写其 id，并同步主项的 `child_ids`。

`status` 是收录处理，`compatibility` 记录是否符合原则，两个字段不能混用。合法状态见 [registry.yaml](./registry.yaml)。`internet_theory` 描述内容类型，不表示来源已核验；`source_evidence_type`、`sources` 与待补事项记录实际证据情况。只有真实来源才放入 `sources`；记录 URL、标题、作者或来源主体，以及“原始主张 / 转述 / 专业资料”的角色。暂时不知道源头时保留空数组，不生成虚假链接。

成本与品质维度使用 [constitution/core-principles.yaml](../constitution/core-principles.yaml) 中的 id，只填实际相关项。维度标签不等于改善结论；用 `cost_changes` 写减少与增加，用 `quality_effects` 写维持与改善，并在风险和边界中交代可能损失。需要时可增加计算假设或未知项，不编出统一评分和确定收益。维护费用与金钱、时间的关联可以同时标记，计算总账时同一笔支出不重复相加。


`core_principles` 固定引用唯一原则 `P01 · 生活品质改善原则`。判断要说明真实品质收益及其依据，既允许减少无效负担，也允许合理增加投入；有长期价值的短期投入需说明期限、条件和风险。是否符合与是否正式收录分开记录。

## 公开文章结构

正文按阅读逻辑展开，不把登记表里的每个字段都改成一个小节。以下是内容骨架；占位说明只用于写作，发布前删除。

```markdown
# 〔理论名称〕

〔从一个生活问题讲起，简要说明这项主张是什么。〕

## 实际怎么做

〔给出可执行步骤，区分原始主张与本文采用的实践解释。〕

## 品质与成本的取舍

〔说明生活品质的真实收益、成本增减、长期效果、比较基准及依据。〕

## 适用范围与边界

〔交代实际条件、可能损失、健康安全风险及不适用情况。〕

## 作者与来源

- 作者：待补充。
- 来源：待补充。
```

作者与来源已知时直接填写真实信息；没有就保留待补充。网络流行原因有可靠资料再写，不为凑字段猜测传播史。状态放在文章开头简短标注，完整审核字段保留在登记表；租房属于租万物，方法位置与重复关系由登记中的 `parent_id`、`child_ids` 表达。
