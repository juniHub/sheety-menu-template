# Menu Template

A one-page site for a small food business: a welcome section, the story behind it, and a weekly menu that is kept in a Google Sheet. Edit the sheet and the site shows the new menu, with no redeploy.

Live demo: https://menu-template-sheetyapi.netlify.app/

## How the menu works

The site reads a Google Sheet directly as CSV. No API key or third-party service is needed.

### 1. Set up the sheet

The first row holds the column names. They can be in any order, and capitals and spaces do not matter.

| Column | What to put in it | Required |
| --- | --- | --- |
| `item` | Name of the dish | Yes |
| `price` | Price, with or without `$` | No |
| `is vegetarian` | `TRUE` or `yes` for vegetarian dishes | No |
| `category` | Mains, Starters, Desserts and so on | No |
| `date` | The day the dish is offered. Dishes are grouped under each date, in sheet order | No |
| `image` | Web address of a photo, starting with `https://` | No |

Rows without an item name are ignored.

### 2. Share it

In Google Sheets: **Share > General access > Anyone with the link > Viewer**. The site reads the sheet with that link, so anyone who has the link can see the sheet. Keep only the menu in it.

### 3. Tell the site where it is

Open `src/config.js` and replace the long ID in the address with the one from your sheet. The ID is the part of your sheet's address between `/d/` and `/edit`.

You can also set the `REACT_APP_MENU_CSV_URL` environment variable on your host to any CSV address, for example a link from **File > Share > Publish to web** (choose the menu tab and "Comma-separated values"). On Netlify this is under Site configuration > Environment variables.

Edits to the sheet show up the next time the page is loaded, usually within a minute or two.

## Run locally

```bash
npm install
npm start
```

## Tech stack

React 17 (Create React App with CRACO) and Tailwind CSS 2.

## Project structure

- `src/App.js`: the page and the menu.
- `src/lib/menu.js`: reads the published sheet and turns it into menu items.
- `src/config.js`: the address of the sheet.
- `src/data/sampleMenu.js`: the sample menu shown before a sheet is connected.
