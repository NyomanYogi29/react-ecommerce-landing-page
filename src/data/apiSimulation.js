import { Category, Items } from ".";
import { generateNewUserId } from "../utils/generateNewUserId";

const STORAGE_KEY = "end1tech.products";
const USERS_STORAGE_KEY = "end1tech.users";
const LATENCY_MS = 600;

const delay = (ms = LATENCY_MS) => new Promise((r) => setTimeout(r, ms));

function readDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].seller) {
        return parsed;
      }
    }
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function fetchCategories() {
  await delay(200);
  return Category;
}

export async function fetchItems({ category = "All", search = "" } = {}) {
  await delay();

  let items = readDB();

  if (category !== "All") items = items.filter((i) => i.category === category);
  if (search.trim()) {
    const q = search.toLowerCase();
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.seller && i.seller.toLowerCase().includes(q)) ||
        (i.brand && i.brand.toLowerCase().includes(q)),
    );
  }

  return items;
}

export async function fetchItemsByID(id) {
  await delay();

  const item = readDB().find((i) => i.id === Number(id));
  if (!item) throw new Error(`Item dengan id ${id} tidak ditemukan`);
  return item;
}

export async function createOrder(data) {
  writeDB(data);
  await delay();
}

function readUsersDB() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Failed to read users from localStorage: ", error);
  }
  return [];
}

function writeUsersDB(data) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
}

export async function registerUser({ firstName, lastName, email, password }) {
  await delay();

  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsersDB();

  const emailExists = users.some(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );

  if (emailExists) {
    throw new Error("Email sudah terdaftar. Silakan gunakan email lain.");
  }

  const newUser = {
    id: generateNewUserId(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  users.push({
    ...newUser,
    password,
  });

  writeUsersDB(users);
  return newUser;
}

// Devtool
export function resetDB() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(USERS_STORAGE_KEY);
}

