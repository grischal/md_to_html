# Pandoc Markdown to HTML Converter

## About

This webpage allows you to convert Markdown you write or upload to HTML
and download the HTML as a file.

It is built using Vue, along with [pandoc-server](https://pandoc.org/pandoc-server.html) as it's backend,
hosted with Vite and deployed with Heroku at [site url](http://localhost:5173/). TODO add url

## Component Overview

```text
App.vue
└── MainView.vue
    ├── SiteHeader.vue
    │   ├── SiteSettings.vue
    │   └── UpDownLoad.vue
    │       ├── DownloadHTML.ts
    │       │   └── PandocCall.ts
    │       └── FilePond.vue
    ├── InputField.vue
    └── RenderField.vue
        └── PandocCall.ts

pandoc-server
```

The site is structured around four main components.

The SiteHeader which contains the logic and template for changing the style of
both the webpage along with the rendered HTML. It also contains the logic and
template for uploading and downloading files to use on the site.

The InputField which contains the text area to write Markdown.

The RenderField which deals with converting the Markdown to HTML
and then rendering the HTML on the site.

The pandoc-server which can either be set up by downloading the pandoc application
and then creating a symlink to it with the name pandoc-server or renaming the pandoc
application itself to pandoc-server. HTTP Post requests containing JSON `{"text":"markdown"}`
are sent to the server and which returns a response output back.

## File Overview

```text
md_to_html/
├── dist
│   ├── assets
│   │   ├── index-D0NfET5g.css
│   │   ├── index-DjxIB4GO.js
│   │   └── logo-BL1Mnp-9.jpg
│   └── index.html
├── env.d.ts
├── eslint.config.ts
├── index.html
├── node_modules
│   └── **TRUNCATED**
├── package.json
├── package-lock.json
├── pandoc-server -> /home/<user>/bin/pandoc
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── logo.jpg
│   │   ├── logo.svg
│   │   └── main.css
│   ├── components
│   │   ├── FilePond.vue
│   │   ├── InputField.vue
│   │   ├── RenderField.vue
│   │   ├── SiteHeader.vue
│   │   ├── SiteSettings.vue
│   │   └── UpDownLoad.vue
│   ├── composables
│   │   ├── DownloadHTML.ts
│   │   └── PandocCall.ts
│   ├── main.ts
│   ├── MainView.vue
│   └── stores
│       └── siteStatus.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
