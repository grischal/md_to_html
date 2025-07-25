# Pandoc Markdown to HTML Converter

## Project Setup

  ```sh
  npm install
  ```

### Compile and Hot-Reload for Development

  ```sh
  npm run dev
  ```

### Type-Check, Compile and Minify for Production

  ```sh
  npm run build
  ```

### Lint with [ESLint](https://eslint.org/)

  ```sh
  npm run lint
  ```

## Requirements

1. Convert from Markdown to HTML5
2. Allow CSS styling for HTML 5
3. Deploy to cloud

### System Setup

#### Frontend

Built with Vue 3 and split into

#### Backend

Soft symbolic link named pandoc-server pointing to the pandoc executable.
Alternatively you can also rename the pandoc executable to pandoc-server and use it directly instead.

## TODO

- [ ] Update html whenever a CSS variable is updated
- Add functionality to download and upload files
