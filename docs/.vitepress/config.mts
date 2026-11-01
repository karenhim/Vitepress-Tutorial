import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'

// https://vitepress.dev/reference/site-config

export default defineConfig({
  title: "Vitepress Tutorial",
  titleTemplate: "Live demo",
  lang: 'en-US',
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Markdown Examples', link: '/markdown-examples' },
      { text: 'Guides', link: '/guides' }      
    ],

    sidebar: {
  '/guides/': [
    { text: 'Guides', items: [
      { text: 'Getting Started', link: '/guides/getting-started' },
      { text: 'Routing', link: '/guides/routing' }
    ]}
  ]
},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/karenhim' }
    ]
  },
  markdown: {
  config: (md) => {
    md.use(container, 'success', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? '<div class="custom-block success"><p class="custom-block-title">SUCCESS</p>\n'
        : '</div>\n'
    })
  }
}
})
