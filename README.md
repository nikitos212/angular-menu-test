# Angular Menu Test (Angular 19+)

Test task mini app built with **Angular (standalone)** and **TypeScript**.

## Requirements implemented

- **Two pages**
  - Home page with welcome text and a link to the second page
  - Menu page with sections (tabs) and a list of items as **checkboxes** with numeric values
- **Menu page header shows**
  - currently selected menu section
  - number of selected items
  - total sum of selected values
- Data is **static** (no backend)

> Note: hash routing is used (`/#/menu`) to work correctly on GitHub Pages.

## Live demo

- GitHub Pages: **https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>/**

## Tech stack

- Angular 19+ (standalone components)
- TypeScript
- Angular Router
- Signals (`signal`, `computed`)
- HTML / CSS

## Run locally

```bash
npm install
npm start
```