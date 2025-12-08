"use client";

import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";
import { Char } from "@/lib/types";
import styles from "./CharacterCard.module.css";

import heartInit from "../../../public/heart_icon_init.png";
import heartActive from "../../../public/heart_icon_active.png";
import heartWhite from "../../../public/heart_icon_white.png";
import { useState } from "react";

type Props = {
  char: Char;
};

export default function CharacterCard({ char }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(char.id);

  const [hover, setHover] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(char);
  };

  const iconSrc = favorite ? (hover ? heartWhite : heartActive) : heartInit;

  return (
    <article className={styles.card} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link href={`/characters/${char.id}`} className={styles.link} title={`View details for ${char.name}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={char.images.lg}
            alt={char.name}
            fill
            sizes="(max-width: 768px 50vw, 20vw)"
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.infoOverlay} />

          <div className={styles.infoContent}>
            <span className={styles.name}>{char.name}</span>

            <button type="button" className={styles.favButton} onClick={handleFavoriteClick}>
              <Image
                src={iconSrc}
                alt={favorite ? "favorite active" : "favorite"}
                className={styles.heartIcon}
              />
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
