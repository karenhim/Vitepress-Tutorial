import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CommandCard from './components/CommandCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register globally so <CommandCard> works in every Markdown file
    app.component('CommandCard', CommandCard)
  }
} satisfies Theme
