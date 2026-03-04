![Deploy](https://github.com/nikitos212/angular-menu-test/actions/workflows/deploy.yml/badge.svg)

# Angular Menu Test

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

## Extra features (beyond requirements)

- **Unit tests (Vitest)**: component logic is covered with basic tests (selection count/total, menu switching behavior).
- **Selection is preserved per menu tab**: switching between menu sections does not reset chosen checkboxes.
- **Automatic deploy to GitHub Pages**: GitHub Actions workflow deploys the app on every push to `main`.


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