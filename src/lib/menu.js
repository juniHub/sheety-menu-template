/**
 * Loads the menu from a Google Sheet that has been published as CSV
 * (File > Share > Publish to web > Comma-separated values).
 *
 * The first row of the sheet holds the column names. These are recognised,
 * in any order and with any capitalisation or spacing:
 *
 *   item | price | is vegetarian | category | date | image
 */

/** Parses CSV text into rows of cells, including quoted cells that contain commas or line breaks. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let i = text.charCodeAt(0) === 0xfeff ? 1 : 0;

  const endRow = () => {
    row.push(field);
    field = "";
    rows.push(row);
    row = [];
  };

  for (; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"' && field === "") {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      endRow();
    } else if (char === "\r") {
      if (text[i + 1] === "\n") i++;
      endRow();
    } else {
      field += char;
    }
  }
  if (field !== "" || row.length > 0) endRow();

  return rows.filter((cells) => cells.some((cell) => cell.trim() !== ""));
}

// "Is Vegetarian", "is_vegetarian" and "isVegetarian" all become "isvegetarian".
const normalizeHeader = (header) => header.toLowerCase().replace(/[^a-z0-9]/g, "");

const COLUMNS = {
  item: ["item", "name", "dish"],
  price: ["price", "cost"],
  isVegetarian: ["isvegetarian", "vegetarian", "veg"],
  category: ["category", "type"],
  date: ["date", "day"],
  image: ["image", "imageurl", "photo", "picture"],
};

const isYes = (value) => /^(true|yes|y|1|x)$/i.test(value.trim());

// Only web addresses are used as images, so a stray value cannot become a link to something else.
const safeImage = (value) => (/^https?:\/\//i.test(value.trim()) ? value.trim() : "");

/** Turns the rows of the sheet into menu items. Rows without an item name are skipped. */
export function rowsToItems(rows) {
  if (rows.length === 0) return [];
  const headers = rows[0].map(normalizeHeader);
  const indexOf = (names) => headers.findIndex((header) => names.includes(header));
  const index = Object.fromEntries(Object.entries(COLUMNS).map(([key, names]) => [key, indexOf(names)]));

  if (index.item === -1) {
    throw new Error('The sheet needs a column called "item" in its first row.');
  }

  const cell = (row, key) => (index[key] === -1 ? "" : (row[index[key]] || "").trim());

  return rows
    .slice(1)
    .map((row, position) => ({
      id: `${position}-${cell(row, "item")}`,
      item: cell(row, "item"),
      // Keep the price as written apart from a leading currency sign, so "12.50" stays "12.50".
      price: cell(row, "price").replace(/^\$\s*/, ""),
      isVegetarian: isYes(cell(row, "isVegetarian")),
      category: cell(row, "category"),
      date: cell(row, "date"),
      image: safeImage(cell(row, "image")),
    }))
    .filter((item) => item.item !== "");
}

/** Groups items by their date, keeping the order in which dates first appear in the sheet. */
export function groupByDate(items) {
  const groups = [];
  const byDate = new Map();
  items.forEach((item) => {
    const date = item.date || "";
    if (!byDate.has(date)) {
      const group = { date, items: [] };
      byDate.set(date, group);
      groups.push(group);
    }
    byDate.get(date).items.push(item);
  });
  return groups;
}

/** Fetches the published sheet and returns its menu items. */
export async function loadMenu(csvUrl) {
  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`The menu sheet could not be loaded (status ${response.status}).`);
  }
  const text = await response.text();
  // A sheet that is not published answers with a sign-in web page instead of CSV.
  if (/^\s*<(!doctype|html)/i.test(text)) {
    throw new Error("The menu sheet is not published to the web as CSV.");
  }
  return rowsToItems(parseCsv(text));
}
