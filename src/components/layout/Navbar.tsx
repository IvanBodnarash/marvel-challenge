"use client";

import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";
import styles from "./Navbar.module.css";
import marvelLogo from "../../../public/marvel_logo.png";
import favIcon from "../../../public/heart_icon.png";
import Link from "next/link";

export function Navbar() {
  const { favoritesCount } = useFavorites();

  return (
    <header className={styles.navbar}>
      {/* Logo */}
      <Link href="/" title="Go to character list">
        <Image src={marvelLogo} alt="logo" className={styles.logo} />
      </Link>

      {/* Favorites */}
      <div className={styles.favoritesBlock}>
        <Link href="/?favorites" className={styles.favoritesButton}>
          <Image src={favIcon} alt="fav_icon" className={styles.favIcon} />
        </Link>
        <span className={styles.badge}>{favoritesCount}</span>
      </div>
    </header>
  );
}
