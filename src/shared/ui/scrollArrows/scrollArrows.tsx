"use client";

import styles from "./scrollArrows.module.css";

export const ScrollArrows = () => {
  return (
    <div className={styles.arrowContainer}>
      {[0, 1, 2].map((index) => (
        <div key={index} className={styles.arrow}>
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 7.5L12 15L19.5 7.5"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
