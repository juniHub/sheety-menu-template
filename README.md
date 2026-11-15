# Menu Template

A one-page site for a small food business: a welcome section, the story behind it, and a weekly menu that is kept in a Google Sheet. Edit the sheet and the site shows the new menu, with no redeploy.

Live demo: https://menu-template-sheetyapi.netlify.app/

## How the menu works

The site reads a Google Sheet that has been published as CSV. No API key or third-party service is needed.

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

### 2. Publish it

In Google Sheets: **File > Share > Publish to web**. Choose the menu tab and **Comma-separated values (.csv)**, press **Publish**, and copy the link.

Publishing makes that tab readable by anyone who has the link, so keep only the menu in it.

### 3. Tell the site where it is

Either paste the link into `src/config.js`, or set it as the `REACT_APP_MENU_CSV_URL` environment variable on your host (on Netlify: Site configuration > Environment variables) and redeploy.

Until a link is set, the site shows a small sample menu.

Google can take a few minutes to refresh a published sheet after an edit.

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
