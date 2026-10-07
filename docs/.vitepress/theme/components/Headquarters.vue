<script setup lang="ts">
import { withBase } from 'vitepress'
import { data } from '../../data/theories.data'

const statusLabels: Record<string, string> = {
  core: '核心纲领', accepted: '正式收录', conditional: '有条件收录',
  observation: '观察中', rejected: '不予收录', archived: '已归档'
}
const shortNames: Record<string, string> = {
  water: '大水理论', sleep: '长睡眠理论', 'lean-muscle': '薄肌理论',
  housing: '低成本租房', secondhand: '二手 / 咸鱼', renting: '租万物'
}
const problems: Record<string, string> = {
  water: '喝水这件小事，别搞得太贵太复杂。',
  sleep: '把合理睡眠，放回生活的优先级。',
  'lean-muscle': '从身体训练获得反馈，再算收益与投入。',
  housing: '租金要算，安全、舒服和通勤也要算。',
  secondhand: '需要的是使用价值，不一定是全新标签。',
  renting: '偶尔用一次，未必需要一直拥有。'
}
const page = (path: string) => withBase('/' + path.replace(/^docs\//, '').replace(/\.md$/, ''))
const theories = data.theories
</script>

<template>
  <div class="hq">
    <section class="hero hq-wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <span class="eyebrow">过的人 · 精神总部</span>
        <h1 id="hero-title">过学<span class="title-punctuation">。</span></h1>
        <p class="subtitle">过的人｜全民大过日子时代</p>
        <p class="hero-description">我们研究的不是怎么把日子过便宜，<br class="desktop-break">而是怎么把钱、时间和精力，<br class="desktop-break">花到真正影响生活品质的地方。</p>
        <div class="hero-actions">
          <a class="action primary" :href="withBase('/start/')">30 秒了解过学</a>
          <a class="action secondary" :href="withBase('/practice/')">先看怎么过日子</a>
        </div>
        <p class="hero-aside">混的人混社会，我们过日子。</p>
      </div>
      <div class="constitution-card" aria-label="过学最高纲领">
        <div class="card-top"><span>过学最高纲领</span><span>总纲 · 第一条</span></div>
        <p class="supreme">生活成本<br>可以低，<br><span>生活品质<br>不能低。</span></p>
        <div class="card-bottom">这不是消费降级，<br>这是生活去溢价。</div>
      </div>
    </section>

    <section class="welcome hq-wrap" aria-labelledby="welcome-title">
      <div class="section-heading"><div><span class="eyebrow">入门，不设门槛</span><h2 id="welcome-title">第一次来到过学？</h2></div><a class="text-link" :href="withBase('/start/')">先读这篇</a></div>
      <div class="welcome-grid">
        <a class="welcome-card" :href="withBase('/charter/')"><span class="index">01 / 是什么</span><h3>给过日子，<br>找一套自己的逻辑。</h3><p>少一点无效消耗，多一点真实舒服。不是花得最少，是花得值得。</p><span class="card-link">阅读《过学总纲》</span></a>
        <a class="welcome-card" :href="withBase('/identity/')"><span class="index">02 / 是谁</span><h3>你可能早就是<br>一个“过的人”。</h3><p>不为面子花钱，也不在重要的地方亏待自己。以前只是没人给它起名字。</p><span class="card-link">你是不是过的人？</span></a>
        <a class="welcome-card" :href="withBase('/new/')"><span class="index">03 / 为什么</span><h3>方法越来越多，<br>判断的尺子得有。</h3><p>大水、长睡眠、二手……有价值的方法值得整理，适用边界也值得讲清。</p><span class="card-link">看看《过学新论》</span></a>
      </div>
    </section>

    <section class="map-section hq-wrap" aria-labelledby="map-title">
      <div class="section-heading"><div><span class="eyebrow">一张图，认识这个门派</span><h2 id="map-title">过学是道，具体理论是术。</h2></div></div>
      <div class="theory-map">
        <div class="map-level"><span class="level-label">道 / 总纲</span><a :href="withBase('/charter/')" class="map-root"><strong>过学</strong><span>生活成本可以低，生活品质不能低。</span></a></div>
        <div class="map-connector" aria-hidden="true"></div>
        <div class="map-level"><span class="level-label">尺 / 原则</span><a class="map-principles" :href="withBase('/principles/')"><span>品质优先</span><span>去无效溢价</span><span>核心需求优先</span><span>低维护</span><span>算长期总账</span><strong>十条原则，因人而异</strong></a></div>
        <div class="map-connector" aria-hidden="true"></div>
        <div class="map-level"><span class="level-label">术 / 实践</span><div class="map-leaves"><a v-for="theory in theories" :key="theory.id" :href="page(theory.page)">{{ shortNames[theory.id] || theory.name }}</a></div></div>
        <p class="map-caption">方法不同，先问同一个问题：它让你的日子更好过了吗？<br>大水与长睡眠观察中；其余四项有条件收录。更多理论，持续研究与收录。</p>
      </div>
    </section>

    <section class="practice-section hq-wrap" aria-labelledby="practice-title">
      <div class="section-heading"><div><span class="eyebrow">不光有道理，也得能用</span><h2 id="practice-title">从一个真实问题开始。</h2></div><a class="text-link" :href="withBase('/practice/')">全部实践篇</a></div>
      <div class="practice-grid">
        <a v-for="(theory, i) in theories" :key="theory.id" class="practice-card" :href="page(theory.page)">
          <div class="practice-meta"><span>{{ String(i + 1).padStart(2, '0') }} / {{ theory.category }}</span><span class="status" :class="theory.status">{{ statusLabels[theory.status] }}</span></div>
          <h3>{{ shortNames[theory.id] || theory.name }}</h3>
          <p>{{ problems[theory.id] || theory.summary }}</p>
          <span class="card-link">方法与边界，都在这里</span>
        </a>
      </div>
      <p class="section-note">首版四项有条件收录，两项观察中：原主张、来源与过学分析分别写清，同名说法不一概照收。</p>
    </section>

    <section class="principle-banner hq-wrap" aria-labelledby="principle-title">
      <div><span class="eyebrow">过学基本原则</span><h2 id="principle-title">核心判断不是“贵不贵”，<br>是<span>“值不值”。</span></h2></div>
      <div><p>每天用、睡得舒服、预算承受得住的 3000 元床垫，可能很值。买来闲置、只为展示的便宜货，也可能不值。</p><p>钱、时间、精力、注意力，四笔账一起算。</p><a class="action primary" :href="withBase('/principles/')">看看十条基本原则</a></div>
    </section>

    <section class="decisions-section hq-wrap" aria-labelledby="decisions-title">
      <div class="section-heading"><div><span class="eyebrow">外表有梗，内容认真</span><h2 id="decisions-title">总部最新决议</h2></div><a class="text-link" :href="withBase('/decisions/')">理由与条件</a></div>
      <div class="decision-board">
        <div class="board-heading"><span>{{ data.updated_at }} · 初版整理</span><span>收录需带边界</span></div>
        <a v-for="theory in theories" :key="theory.id" class="decision-row" :href="page(theory.page)"><strong>{{ theory.name }}</strong><span class="decision-explanation">{{ theory.recommendation }}</span><span class="status" :class="theory.status">{{ statusLabels[theory.status] }}</span></a>
        <p class="board-note">这是建站初版的编辑记录，待发起人复核。没有核实的来源，留白，不编。</p>
      </div>
    </section>

    <section class="identity-banner hq-wrap" aria-labelledby="identity-title">
      <div><span class="eyebrow">不办证，不交会费</span><h2 id="identity-title">你是不是过的人？</h2><p>买东西先看使用价值 · 不为面子花钱<br>重要的地方不亏待自己 · 不追求无意义升级</p><a class="action primary" :href="withBase('/identity/')">看看自己中了几条</a></div>
      <blockquote>你可能早就是过的人，<br>只是以前<br><span>没人给它起名字。</span></blockquote>
    </section>

    <section class="hq-wrap join-section"><span class="eyebrow">总部开放，欢迎来稿</span><h2>好方法，不必散落在评论区。</h2><p>发现新理论，或者觉得哪篇写得不对？<br>带上原话、来源和你的理由，一起把过学写得更靠谱。</p><div class="hero-actions"><a class="action primary" href="https://github.com/Allen-boan/guoxue/issues/new?template=new-theory.yml">提交一个新理论</a><a class="action secondary" :href="withBase('/about/')">了解怎么参与</a></div></section>
  </div>
</template>
