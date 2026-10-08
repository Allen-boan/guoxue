# 新理论整理模板

这是内容维护者使用的模板。普通网友直接[提交新理论](https://github.com/Allen-boan/guoxue/issues/new?template=new-theory.yml)即可，不需要改文件，也不需要懂 Git。

新理论先进入“观察中”。先说清原主张，再检查判断边界和成本—品质变化，不把模板里的空位改成推测出的作者、日期或数据。同一方法已有段落时优先补充；正文统一放在[过日子的办法](../docs/02-过日子的办法/README.md)的相关生活领域中。本项目整理的日常方法使用[方法模板](../guides/TEMPLATE.md)。

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
page: 待填写对应生活领域正文路径，不包含锚点
doc_path: 与 page 填写同一路径
anchor: 待填写该理论在正文中的稳定锚点
```

`parent_id` 留空表示主项；具体场景归入已有主项时填写其 id，并同步主项的 `child_ids`。

理论登记与对应方法登记通过 `theory_id` 关联，并使用相同的 `doc_path` 和 `anchor`。正文只保留一份，把来源、实际做法、取舍和条件写在一起；领域入口可以链接该段，不复制内容。

`status` 是收录处理，`compatibility` 记录是否符合原则，两个字段不能混用。合法状态见 [registry.yaml](./registry.yaml)。`internet_theory` 描述内容类型，不表示来源已核验；`source_evidence_type`、`sources` 与待补事项记录实际证据情况。只有真实来源才放入 `sources`；记录 URL、标题、作者或来源主体，以及“原始主张 / 转述 / 专业资料”的角色。暂时不知道源头时保留空数组，不生成虚假链接。

成本与品质维度使用 [constitution/core-principles.yaml](../constitution/core-principles.yaml) 中的 id，只填实际相关项。维度标签不等于改善结论；用 `cost_changes` 写减少与增加，用 `quality_effects` 写维持与改善，并在风险和边界中交代可能损失。需要时可增加计算假设或未知项，不编出统一评分和确定收益。维护费用与金钱、时间的关联可以同时标记，计算总账时同一笔支出不重复相加。


`core_principles` 固定引用唯一原则 `P01 · 生活品质改善原则`。判断要说明真实品质收益及其依据，既允许减少无效负担，也允许合理增加投入；有长期价值的短期投入需说明期限、条件和风险。是否符合与是否正式收录分开记录。

## 公开正文

从一个生活问题引出主张，顺着读者的疑问谈选择、做法和实际条件。来源与判断融入这一段讨论，不把登记字段逐一改成小节，也不规定所有方法都有相同的结构。以下仅示意内容如何衔接；占位说明只用于写作，发布前删除。

```markdown
<a id="theory-method-id"></a>

## 〔理论名称〕

〔从一个生活问题讲起，简要说明这项主张是什么。〕

〔说明生活里可以怎样尝试，区分原始主张和本文采用的实践解释，把真实收益、代价、比较方案及适用条件接着讲清楚。必要的安全核查可以列出步骤。〕

〔交代不适用的情况、可能损失和健康安全边界，避免让局部经验变成人人适用的结论。〕

- 作者：待补充。
- 来源：待补充。
```

作者与来源已知时直接填写真实信息；没有就保留待补充。网络流行原因有可靠资料再写，不为凑字段猜测传播史。状态放在文章开头简短标注，完整审核字段保留在登记表；租房属于租万物，方法位置与重复关系由登记中的 `parent_id`、`child_ids` 表达。
