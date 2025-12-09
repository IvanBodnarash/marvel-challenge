"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { useEffect, useState } from "react";
import { Char } from "@/lib/types";
import { fetchCharById } from "@/lib/marvelApi";
import styles from "./page.module.css";

import heartInit from "../../../../public/heart_icon_init.png";
import heartActive from "../../../../public/heart_icon_active.png";
import { LoadingBar } from "@/components/ui/LoadingBar";

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const id = Number(params.id);
  const [char, setChar] = useState<Char | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      router.push("/");
      return;
    }

    const load = async () => {
      setLoading(true);
      const data = await fetchCharById(id);
      if (!data) {
        setChar(null);
      } else {
        setChar(data);
      }
      setLoading(false);
    };

    load();
  }, [id, router]);

  if (loading) {
    return (
      <>
        <LoadingBar />
        {/* <p className={styles.statusText}>Loading character...</p> */}
      </>
    );
  }

  if (!char) {
    return (
      <div className={styles.mainDiv}>
        <p className={styles.statusText}>Character not found.</p>
      </div>
    );
  }

  const favorite = isFavorite(char.id);
  const favIconSrc = favorite ? heartActive : heartInit;

  const description =
    char.biography?.fullName && char.biography.fullName !== "-"
      ? `Also known as ${char.biography.fullName}.`
      : "No detailed description available for this character.";

  return (
    <div className={styles.mainDiv}>
      {/* Hero section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Left part (big image) */}
          <div className={styles.heroImageWrapper}>
            <Image
              src={char.images.lg}
              alt={char.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className={styles.heroImage}
            />
          </div>

          {/* Right part (name, description and favToggle) */}
          <div className={styles.heroContent}>
            <div className={styles.titleRow}>
              <h1 className={styles.heroTitle}>{char.name}</h1>

              <button type="button" className={styles.favButton} onClick={() => toggleFavorite(char)}>
                <Image src={favIconSrc} alt={favorite ? "favorite active" : "favorite"} className={styles.favIcon} />
              </button>
            </div>

            <p className={styles.heroDescription}>{description}</p>

            <div className={styles.extraInfo}>
              {char.appearance?.race && char.appearance.race !== "-" && (
                <p>
                  <span>Race:</span> {char.appearance.race}
                </p>
              )}

              {char.biography?.alignment && (
                <p>
                  <span>Alignment:</span> {char.biography.alignment}
                </p>
              )}

              {char.biography?.firstAppearance && (
                <p>
                  <span>First appearance:</span> {char.biography.firstAppearance}
                </p>
              )}

              {char.work?.occupation && char.work.occupation !== "-" && (
                <p>
                  <span>Occupation:</span> {char.work.occupation}
                </p>
              )}

              {char.biography?.placeOfBirth && char.biography.placeOfBirth !== "-" && (
                <p>
                  <span>Place of birth:</span> {char.biography.placeOfBirth}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
