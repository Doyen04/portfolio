'use client';

import React from 'react';
import styles from '../styles/carousel.module.css';

export default function Carousel({ skills }: { skills: string[] }) {
  // Duplicate skills list for a seamless loop
  const repeatedSkills = [...skills, ...skills];

  return (
    <div className={styles.carousel_container}>
      <div className={styles.marquee_track}>
        {repeatedSkills.map((skill, index) => (
          <div key={`${skill}-${index}`} className={styles.marquee_item}>
            <span>{skill}</span>
            <span className={styles.diamond}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}