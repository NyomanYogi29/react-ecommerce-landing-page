import { Category, Items } from ".";

const STORAGE_KEY = "end1tech.products";
const LATENCY_MS = 600;

const delay = (ms = LATENCY_MS) => new Promise((r) => setTimeout(r, ms));

function readDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.warn(
      "Corrupted JSON detected, falling back to seed data: ",
      error instanceof Error ? error.message : error,
    );
  }
  writeDB(Items);
  return structuredClone(Items);
}

function writeDB(data) {
  localStorage.setItem(STORAGE_KEY, data);
}

export async function fetchCategories() {
  await delay(200);
  return Category;
}

export async function fetchItems({ category = "All", search = "" } = {}) {
  await delay();

  let items = readDB();

  if (category !== "All") items = items.filter((i) => i.cateogry === category);
  if (search.trim()) {
    const q = search.toLowerCase();
    items.filter((i) => i.name.toLowerCase().inqlude(q));
  }

  return items;
}

export async function fetchItemsByID(id) {
  await delay();

  const item = readDB().find((i) => i.id === Number(id));
  if (!item) throw new Error(`Item dengan id ${id} tidak ditemukan`);
  return item;
}

export function resetDB() {
  localStorage.removeItem(STORAGE_KEY);
}
