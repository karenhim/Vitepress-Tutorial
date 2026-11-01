# Markdown Examples

VitePress comes with built in Markdown Extensions.

## Table of Contents
Input
```
[[toc]]
```

Output 
[[toc]]

## Links
### Internal Links
Internal links are converted to router links for SPA navigation. Also, every index.md contained in each sub-directory will automatically be converted to index.html, with corresponding URL /.

For example, given the following directory structure:

```
.
├─ index.md
├─ foo
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ index.md
   ├─ three.md
   └─ four.md
```
And providing you are in `foo/one.md`:

```
[Home](/) <!-- sends the user to the root index.md -->
[foo](/foo/) <!-- sends the user to index.html of directory foo -->
[foo heading](./#heading) <!-- anchors user to a heading in the foo index file -->
[bar - three](../bar/three) <!-- you can omit extension -->
[bar - three](../bar/three.md) <!-- you can append .md -->
[bar - four](../bar/four.html) <!-- or you can append .html -->
```

## Frontmatter
YAML frontmatter is supported out of the box:
```yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

## GitHub-Style Tables
Input
```md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```
Output
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Task Lists
Input
```md
- [ ] Write the press release
- [x] Update the website
```
Output

- [ ] Write the press release
- [x] Update the website

## Footnotes
Input
```md
Footnotes are supported[^1], including inline ones^[This is an inline footnote.].

[^1]: Definitions can contain **markdown** and are rendered at the end of the page.
```

Output 
Footnotes are supported[^1], including inline ones^[This is an inline footnote.].

[^1]: Definitions can contain **markdown** and are rendered at the end of the page.

## Emoji :tada:
Input 
```
:tada: :100:
```
Output
:tada: :100:

## Custom Containers
### Default Title
Input 
```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

Output
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

### Custom Title
You may set custom title by appending the text right after the "type" of the container.

Input
```md
::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to toggle the code
```js
console.log('Hello, VitePress!')
´```
:::
```

Output
::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to toggle the code
```js
console.log('Hello, VitePress!')
:::


Also, you may set custom titles globally by adding the following content in site config, helpful if not writing in English:

```
// config.ts
export default defineConfig({
  // ...
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
  // ...
})
```

### Registering New Containers
Beyond the built-in types, you can register additional containers by mapping their names to their default titles:
```ts
// config.ts
export default defineConfig({
  // ...
  markdown: {
    container: {
      customContainers: {
        success: 'SUCCESS'
      }
    }
  }
  // ...
})
```
Registered names work like the built-in ones - including custom titles, attributes, and the GitHub-style alert syntax:
```md
::: success
You have completed the walkthrough!
:::

> [!SUCCESS] Custom title
> This renders the same way.
```
::: success
You have completed the walkthrough!
:::

New containers ship without any styling, so add some in your theme using the container name as the class. For this example, the default theme's palette already provides fitting colors:
```
/* .vitepress/theme/custom.css */
.custom-block.success {
  border-color: transparent;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-success-soft);
}
```

## Nesting
The `:::` markers follow the same rules as fenced code blocks `(```)`: a fence is only closed by a matching fence that is at least as long as the one that opened it. To nest containers (or to mix them with code groups) make the outer fence longer than the ones inside it.

Input 
```md
:::: info Outer container
This box contains another container.

::: details Inner container
```js
console.log('Hello, VitePress!')

:::
::::
```

Output
:::: info Outer container
This box contains another container.

::: details Inner container
```js
console.log('Hello, VitePress!')
```
:::
::::

## Additional Attributes
You can add additional attributes to the custom containers. We use `@mdit/plugin-attrs` for this feature, and it is supported on almost all markdown elements. For example, you can set the open attribute to make the details block open by default:
Input
```md
::: details Click me to toggle the code {open}
```js
console.log('Hello, VitePress!')
:::
```
Output
::: details Click me to toggle the code {open}
```js
console.log('Hello, VitePress!')
```
:::
The special `no-title` attribute renders a container without a title element (it has no effect on `details`, which always needs its summary):
Input
```md
::: tip {no-title}
Just want to try it out? Skip to the [Quickstart](/guides/getting-started).
:::
```
Output
::: tip {no-title}
Just want to try it out? Skip to the [Quickstart](/guides/getting-started).
:::

## `raw`
This is a special container that can be used to prevent style and router conflicts with VitePress. This is especially useful when you're documenting component libraries.
Syntax
```md
::: raw
Wraps in a `<div class="vp-raw">`
:::
```
`vp-raw` class can be directly used on elements too. Style isolation is currently opt-in:
- Install `postcss` with your preferred package manager:
```sh
npm add -D postcss
```
- Create a file named `docs/postcss.config.mjs` and add this to it:
```js
import { postcssIsolateStyles } from 'vitepress'

export default {
  plugins: [postcssIsolateStyles()]
}
```
You can pass its options like this:
```js
postcssIsolateStyles({
  includeFiles: [/custom\.css/] // defaults to [/vp-doc\.css/, /base\.css/]
})
```

## GitHub-flavored Alerts
VitePress also supports GitHub-flavored alerts to render as callouts. They will be rendered the same as the custom containers. Unlike on GitHub, text placed right after the marker becomes the title of the alert (> [!NOTE] Custom Title), and containers you registered yourself work here too.
```md
> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

By default, alert colors match GitHub's, with caution and danger both rendering in red. Enable `themeConfig.gradedContainers` to use a graded severity scale: danger (red), warning (orange), and caution (yellow). Note that `[!DANGER]` is a VitePress extension and will render as a regular blockquote on GitHub.

## Syntax Highlighting in Code Blocks
VitePress uses `Shiki` to highlight language syntax in Markdown code blocks, using coloured text. Shiki supports a wide variety of programming languages. All you need to do is append a valid language alias to the beginning backticks for the code block:
Input
```
```js
export default {
  name: 'MyComponent',
  // ...
}
```
```
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
Output
```js
export default {
  name: 'MyComponent'
  // ...
}
```
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

A list of valid languages is available on Shiki's repository.

You may also customize syntax highlight theme, configure language aliases, and set custom language labels in app config. Please see markdown options for more details.

## Line Highlighting in Code Blocks

Input

```
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

Output
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```
## Focus in Code Blocks

Input
```
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

Output
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

## Colored Diffs in Code Blocks
Input
```
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```
Output
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## Errors and Warnings in Code Blocks

Input
```
```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

Output
```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

## Line Numbers

Output
```ts {1}
// line-numbers is disabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// line-numbers is enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

## Code Groups
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::