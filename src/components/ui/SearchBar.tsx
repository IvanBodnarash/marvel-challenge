"use client";

import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  resultsCount: number;
};

export function SearchBar({ value, onChange, resultsCount }: SearchBarProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.inputRow}>
        <span className={styles.icon}>
          <svg width="22" height="22" viewBox="0 0 24 24" className={styles.iconSvg}>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="15" y1="15" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>

        <input
          type="text"
          className={styles.input}
          placeholder="SEARCH A CHARACTER..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className={styles.underline} />

      <p className={styles.resultsText}>{resultsCount} RESULTS</p>
    </section>
  );
}
