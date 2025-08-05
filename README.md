# Pandoc Markdown to HTML Converter

## About

This webpage allows you to convert Markdown you write or upload to HTML
and download the HTML as a file.

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
```

## File Overview

```text
./src/
├── App.vue
├── assets
│   ├── logo.jpg
│   ├── logo.svg
│   └── main.css
├── components
│   ├── FilePond.vue
│   ├── InputField.vue
│   ├── RenderField.vue
│   └── SiteHeader.vue
├── composables
│   ├── DownloadHTML.ts
│   └── ServerCall.ts
├── main.ts
├── MainView.vue
└── stores\
    └── siteStatus.ts\
```
