"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useMemo, useState } from "react";
import { fetchChars, searchCharsByName } from "@/lib/marvelApi";
import { useSearchParams } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { Char } from "@/lib/types";
import { SearchBar } from "@/components/ui/SearchBar";
import CharacterCard from "@/components/characters/CharacterCard";

export default function HomePage() {
  const searchParams = useSearchParams();
  const favoritesMode = searchParams.has("favorites");

  const { favorites } = useFavorites();

  const [allChars, setAllChars] = useState<Char[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load 50 Marvel characters (only when NOT in favorites mode)
  useEffect(() => {
    if (favoritesMode) {
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      const chars = await fetchChars(50);
      setAllChars(chars);
      setLoading(false);
    }

    load();
  }, [favoritesMode]);

  /**
   * Main logic
   * - if favoritesMode -> filter favorites
   * - else -> filter allChars
   */
  const charsToRender = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (favoritesMode) {
      if (!query) return favorites;
      return favorites.filter((char) => char.name.toLowerCase().includes(query));
    }

    if (!query) return allChars;
    return allChars.filter((char) => char.name.toLowerCase().includes(query));
  }, [favoritesMode, favorites, allChars, search]);

  const showEmpty = !loading && charsToRender.length === 0;

  return (
    <div className={styles.main}>
      {favoritesMode && <h1 className={styles.favTitle}>FAVORITES</h1>}
      {/* Search Bar */}
      <SearchBar value={search} onChange={setSearch} resultsCount={charsToRender.length} />

      {/* States */}
      {loading && <p className={styles.statusText}>Loading...</p>}

      {showEmpty && <p className={styles.statusText}>No characters found.</p>}

      {!loading && charsToRender.length > 0 && (
        <section className={styles.grid}>
          {charsToRender.map((char) => (
            <CharacterCard key={char.id} char={char} />
          ))}
        </section>
      )}
    </div>
  );
}
