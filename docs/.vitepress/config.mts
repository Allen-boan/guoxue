import { defineConfig } from 'vitepress'

const base = process.env.SITE_BASE || '/guoxue/'
const origin = 'https://allen-boan.github.io'

export default defineConfig({
  lang: 'zh-CN',
  title: '过学',
  description: '过的人｜全民大过日子时代。生活成本可以低，生活品质不能低。',
  base,
  cleanUrls: true,
  appearance: false,
  lastUpdated: false,
  sitemap: { hostname: `${origin}${base}` },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#a4ee4e' }],
    ['meta', { property: 'og:site_name', content: '过学 · 过的人精神总部' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:type', content: 'website' }]
  ],
  transformHead({ pageData }) {
    const canonical = `${origin}${base}${pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')}`
    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:title', content: pageData.title || '过学' }],
      ['meta', { property: 'og:description', content: pageData.description || '生活成本可以低，生活品质不能低。' }],
      ['meta', { property: 'og:url', content: canonical }]
    ]
  },
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: '过学',
    nav: [
      { text: '第一次来', link: '/start/' },
      { text: '总纲与原则', items: [
        { text: '过学总纲', link: '/charter/' },
        { text: '十条基本原则', link: '/principles/' }
      ] },
      { text: '实践篇', link: '/practice/' },
      { text: '新论与决议', items: [
        { text: '过学新论', link: '/new/' },
        { text: '总部最新决议', link: '/decisions/' }
      ] },
      { text: '过的人', link: '/identity/' }
    ],
    sidebar: [
      { text: '先认识一下', items: [
        { text: '第一次来到过学', link: '/start/' },
        { text: '你是不是过的人？', link: '/identity/' }
      ] },
      { text: '讲道理，也讲人话', items: [
        { text: '过学总纲', link: '/charter/' },
        { text: '十条基本原则', link: '/principles/' }
      ] },
      { text: '今天就能用的实践', collapsed: false, items: [
        { text: '实践篇导读', link: '/practice/' },
        { text: '大水理论', link: '/practice/water' },
        { text: '长睡眠理论', link: '/practice/sleep' },
        { text: '薄肌理论', link: '/practice/lean-muscle' },
        { text: '低成本租房', link: '/practice/housing' },
        { text: '二手 / 咸鱼买东西', link: '/practice/secondhand' },
        { text: '租万物', link: '/practice/renting' }
      ] },
      { text: '总部在研究什么', collapsed: false, items: [
        { text: '过学新论', link: '/new/' },
        { text: '总部最新决议', link: '/decisions/' }
      ] },
      { text: '再多了解一点', collapsed: true, items: [
        { text: '过学词典', link: '/dictionary/' },
        { text: '反面案例', link: '/counterexamples/' },
        { text: '关于过的人与参与', link: '/about/' }
      ] }
    ],
    search: {
      provider: 'local',
      options: { locales: { root: { translations: {
        button: { buttonText: '搜一搜', buttonAriaLabel: '搜索过学内容' },
        modal: { noResultsText: '暂时没找到，换个词试试', resetButtonTitle: '清空搜索',
          footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
      } } } }
    },
    outline: { level: [2, 3], label: '这一篇讲什么' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '逛逛过学',
    returnToTopLabel: '回到上面',
    darkModeSwitchLabel: '外观',
    socialLinks: [{ icon: 'github', link: 'https://github.com/Allen-boan/guoxue' }],
    editLink: { pattern: 'https://github.com/Allen-boan/guoxue/edit/main/docs/:path', text: '一起把这篇写得更好' },
    footer: {
      message: '混的人混社会，我们过日子。',
      copyright: '过学 · 内容持续修订，欢迎带着来源一起建设。'
    },
    notFound: {
      title: '这条路还没修好', quote: '先回总部，换一条路继续逛。', linkText: '回到过学首页'
    }
  }
})
