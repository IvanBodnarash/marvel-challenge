"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { favoritesCount } = useFavorites();
  const router = useRouter();
  const searchParams = useSearchParams();

  const favoritesActive = searchParams.get("favorites") === "1";

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleFavoritesClick = () => {
    // toggle ?favorites=1 in URL
    if (favoritesActive) {
      router.push("/");
    } else {
      router.push("/?favorites=1");
    }
  };

  return (
    <header className={styles.navbar}>
      {/* Logo */}
      <button className={styles.logo} onClick={handleLogoClick} title="Go to character list">
        {/* Logo from Figma */}
        MARVEL
      </button>

      {/* Favorites */}
      <div className={styles.favoritesBlock}>
        <button
          className={`${styles.favoritesButton}${favoritesActive ? styles.active : ""}`}
          onClick={handleFavoritesClick}
        >
          ♥
        </button>
        <span className={styles.badge}>{favoritesCount}</span>
      </div>
    </header>
  );
}
