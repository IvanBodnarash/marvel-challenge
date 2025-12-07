"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchChars, searchCharsByName } from "@/lib/marvelApi";
import { useSearchParams } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { Char } from "@/lib/types";

export default function HomePage() {
  const searchParams = useSearchParams();
  const favoritesMode = searchParams.has("favorites");
  const { favorites } = useFavorites();

  const [chars, setChars] = useState<Char[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (favoritesMode) {
      // If ?favorites -> show only favorites
      setChars(favorites);
      return;
    }

    // If we have search query -> filter by name
    if (query.trim() !== "") {
      searchCharsByName(query).then(setChars);
      return;
    }

    // Otherwise -> load first 50 Marvel Chars
    fetchChars().then(setChars);
  }, [query, favoritesMode, favorites]);

  return (
    <div>
      {/* Search Bar */}{" "}
      {!favoritesMode && (
        <input
          type="text"
          placeholder="Search a Character..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}

      <p className={""}>{chars.length} results</p>

      {chars.map((char) => (
        <div key={char.id}>
          <Image src={char.images.lg} alt={char.name} width={140} height={220} />
          <h3>{char.name}</h3>
        </div>
      ))}
    </div>
  );
}
