// The address of the menu sheet as CSV.
//
// This one reads the first tab of the Google Sheet "MenuHomemadeFresh"
// directly. For it to work, the sheet must be shared so that anyone with the
// link can view it (Share > General access > Anyone with the link > Viewer).
//
// To use a different sheet, replace the long ID between /d/ and /gviz with the
// one from your sheet's address, or set the REACT_APP_MENU_CSV_URL environment
// variable on your host to any CSV address (for example a link from
// File > Share > Publish to web).
//
// If this is empty the site shows a small sample menu.
const DEFAULT_MENU_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1JL5SwwSS4LWtlxltCe5RUuRsZirQs3tRtwwxu0waOi8/gviz/tq?tqx=out:csv&gid=0&headers=1";

export const MENU_CSV_URL = process.env.REACT_APP_MENU_CSV_URL || DEFAULT_MENU_CSV_URL;
