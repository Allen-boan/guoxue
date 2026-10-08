# 行为方法整理模板

先看[日常行动](../docs/03-日常行动/README.md)及所在领域页。同一方法已经存在就补充它；一个领域可以包含多种方法，每种方法使用独立段落和登记 id。

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
core_principles: [P01]
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


`core_principles` 固定引用唯一原则 `P01 · 生活品质改善原则`。具体方法要有真实品质收益，减少无效负担与合理增加投入都可以成立；短期投入的长期价值需要依据及可承受的条件。

## 公开正文

每个方法从生活问题开始，接实际步骤，再说明品质与成本的取舍及边界。登记字段留在底层，不要求每个方法重复十一个标签。用稳定锚点定位段落；下面的占位说明只用于写作，发布前删除。

```markdown
<a id="method-id"></a>

## 〔方法名称〕

〔用一个具体场景说清这项方法解决的问题。〕

1. 〔实际第一步。〕
2. 〔可尝试或比较的动作，包含必要投入。〕
3. 〔根据实际效果调整或退出。〕

**取舍：**〔说明品质收益与成本变化，包含长期条件和可能损失。〕

**边界：**〔说明不适用情况、必要核查与健康安全风险。〕
```

已有网络理论用简短链接导向理论正文，作者和原始主张不重复维护。数字工具只作辅助；健康、安全、必要医疗及其他底线是 P01 的判断边界，不能用便宜抵消明确损害。普通生活方法不替代专业诊疗。
