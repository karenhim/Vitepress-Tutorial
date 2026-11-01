# Getting Started

[[toc]]

## Installation

VitePress can be used on its own, or be installed into an existing project. In both cases, you can install it with

::: code-group
```sh [npm]
npm add -D vitepress@next
```

```sh [yarn]
yarn add -D vitepress@next vue
```
:::

## Setup Wizard
VitePress ships with a command line setup wizard that will help you scaffold a basic project. After installation, start the wizard by running:
::: code-group
```sh [npm]
npx vitepress init
```

```sh [yarn]
yarn vitepress init
```
:::

You will be greeted with a few simple questions:
```init.ansi
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Where should VitePress look for your markdown files?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
◇  Add a prefix for VitePress npm scripts?
│  Yes
│
◇  Prefix for VitePress npm scripts:
│  docs
│
└  Done! Now run pnpm run docs:dev and start writing.
```

## File Structure

If you are building a standalone VitePress site, you can scaffold the site in your current directory (./). However, if you are installing VitePress in an existing project alongside other source code, it is recommended to scaffold the site in a nested directory (e.g. ./docs) so that it is separate from the rest of the project.

Assuming you chose to scaffold the VitePress project in ./docs, the generated file structure should look like this:

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```
The `docs` directory is considered the project root of the VitePress site. The `.vitepress` directory is a reserved location for VitePress' config file, dev server cache, build output, and optional theme customization code.

## The Config File

The config file (`.vitepress/config.js`) allows you to customize various aspects of your VitePress site, with the most basic options being the title and description of the site:

```.vitepress/config.js
export default {
  // site-level options
  title: 'VitePress',
  description: 'Just playing around.',

  themeConfig: {
    // theme-level options
  }
}
```

## Source Files

Markdown files outside the `.vitepress` directory are considered source files.

VitePress uses file-based routing: each `.md` file is compiled into a corresponding `.html` file with the same path. For example, index.md will be compiled into `index.html`, and can be visited at the root path `/` of the resulting VitePress site.

VitePress also provides the ability to generate clean URLs, rewrite paths, and dynamically generate pages. These will be covered in the [Routing Guide](routing).

## Up and Running

The tool should have also injected the following npm scripts to your `package.json` if you allowed it to do so during the setup process:

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
```

The `docs:de`v script will start a local dev server with instant hot updates. Run it with the following command:

::: code-group
```sh [npm]
npm run docs:dev
```
```sh [yarn]
yarn docs:dev
```
:::

Instead of npm scripts, you can also invoke VitePress directly with:

::: code-group
```sh [npm]
npx vitepress dev docs
```
```sh [yarn]
yarn vitepress dev docs
```
:::

More command line usage is documented in the [CLI Reference](https://vitepress.dev/reference/cli).

The dev server should be running at `http://localhost:5173`. Visit the URL in your browser to see your new site in action!