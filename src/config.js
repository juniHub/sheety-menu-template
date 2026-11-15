// The address of your menu sheet, published as CSV.
//
// In Google Sheets: File > Share > Publish to web, choose the menu tab and
// "Comma-separated values (.csv)", press Publish, and copy the link it gives
// you. Either paste it between the quotes below, or set it as the
// REACT_APP_MENU_CSV_URL environment variable on your host.
//
// While this is empty the site shows a small sample menu.
export const MENU_CSV_URL = process.env.REACT_APP_MENU_CSV_URL || "";
