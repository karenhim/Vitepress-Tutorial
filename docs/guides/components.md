# Vue Components

[[toc]]

VitePress compiles every Markdown file into a Vue component, so you can use your own Vue components directly in Markdown.

## Live Demo

The cards below are **one component** (`CommandCard.vue`) used **three times** with different data.

<CommandCard command="npm run docs:dev" label="entwickeln">
  Starts the local dev server with hot reload at http://localhost:5173.
</CommandCard>

<CommandCard command="npm run docs:build" label="bauen">
  Builds the static site into docs/.vitepress/dist.
</CommandCard>

<CommandCard command="npm run docs:preview" label="testen">
  Serves the built site locally at http://localhost:8080.
</CommandCard>

## Concepts

| Concept | In `CommandCard` |
| --- | --- |
| Props | `command` and `label` are passed in from the page |
| State | `copied` – each card remembers on its own whether it was copied |
| Events | `@click="copy"` copies the command to the clipboard |
| Slot | the text between the tags becomes the description |
| Reuse | same component, three instances, different data |

## Usage

```md
<CommandCard command="npm run docs:build" label="bauen">
  Builds the static site into docs/.vitepress/dist.
</CommandCard>
```

## Source

::: code-group

```vue [CommandCard.vue]
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  command: string
  label?: string
}>()

const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.command)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="command-card">
    <div class="header">
      <span v-if="label" class="label">{{ label }}</span>
      <code class="command">{{ command }}</code>
      <button class="copy" @click="copy">{{ copied ? 'Copied!' : 'Copy' }}</button>
    </div>
    <div class="body"><slot /></div>
  </div>
</template>
```

```ts [theme/index.ts]
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CommandCard from './components/CommandCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CommandCard', CommandCard)
  }
} satisfies Theme
```

:::
