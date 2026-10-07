import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Headquarters from './components/Headquarters.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Headquarters', Headquarters)
  }
} satisfies Theme
