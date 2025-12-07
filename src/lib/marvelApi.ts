import { Char } from "./types";

const ALL_CHARS_URL = "https://akabab.github.io/superhero-api/api/all.json";

const CHAR_BY_ID_URL = (id: number) => `https://akabab.github.io/superhero-api/api/id/${id}.json`;

// Cache chars in module to prevent fetching all.json every time
let cachedChars: Char[] | null = null;

// Inner function (fetches all.json, filter only Marvel Chars, chache result)
async function loadAllMarvelChars(): Promise<Char[]> {
  if (cachedChars) return cachedChars;

  const res = await fetch(ALL_CHARS_URL);

  if (!res.ok) throw new Error("Failed to fetch chars");

  const data: Char[] = await res.json();

  // Filter only marvel characters and cache them
  cachedChars = data.filter((character) => character.biography?.publisher === "Marvel Comics");

  return cachedChars;
}

// Returns first N characters (50 by default)
export async function fetchChars(limit: number = 50): Promise<Char[]> {
  const marvelChars = await loadAllMarvelChars();

  // Return first 50 chars
  return marvelChars.slice(0, limit);
}

// Search function (id -> name, because this API don't have name parameter)
export async function searchCharsByName(query: string): Promise<Char[]> {
  const marvelChars = await loadAllMarvelChars();
  const trimmed = query.trim();

  if (!trimmed) return marvelChars.slice(0, 50);

  const q = trimmed.toLowerCase();

  return marvelChars.filter((character) => character.name.toLowerCase().includes(q));
}

// Chars details (show by id)
export async function fetchCharById(id: number): Promise<Char | null> {
  try {
    const res = await fetch(CHAR_BY_ID_URL(id));

    if (!res.ok) {
      console.error("Failed to fetch character by id", id);
      return null;
    }

    const data: Char = await res.json();

    if (data.biography?.publisher !== "Marvel Comics") {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching character by id", error);
    return null;
  }
}

// Only lg images allowed for the UI
export function getCharImageUrl(char: Char): string {
  return char.images.lg;
}
