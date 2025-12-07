"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Char } from "@/lib/types";

type FavoritesContextValue = {
  favorites: Char[];
  favoritesCount: number;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (char: Char) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const STORAGE_KEY = "marvel_favorites";

function loadFromStorage(): Char[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Char[];
  } catch {
    return [];
  }
}

function saveToStorage(favorites: Char[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {}
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Char[]>([]);

  // load from localStorage while mount
  useEffect(() => {
    const init = loadFromStorage();
    setFavorites(init);
  }, []);

  // save to loacalStorage if change
  useEffect(() => {
    saveToStorage(favorites);
  }, [favorites]);

  const isFavorite = (id: number) => favorites.some((char) => char.id === id);

  const toggleFavorite = (char: Char) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.id === char.id);
      if (exists) {
        // remove
        return prev.filter((c) => c.id !== char.id);
      }
      // add
      return [...prev, char];
    });
  };

  const value: FavoritesContextValue = {
    favorites,
    favoritesCount: favorites.length,
    isFavorite,
    toggleFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavotitesProvider");
  return context;
}
