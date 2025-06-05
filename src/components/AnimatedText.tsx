'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function AnimatedText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !inView) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distance = windowHeight - rect.top;
      const total = windowHeight + rect.height;

      const progress = Math.min(Math.max(distance / total, 0), 1);
      setScrollProgress(progress);
    };

    if (inView) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView]);

  const insideX = -200 + scrollProgress * 250;
  const newsX = 220 - scrollProgress * 250;

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.textContainer}>
        <p
          className={styles.inside}
          style={{
            transform: `translateX(${insideX}%)`,
          }}
        >
          INSIDE
        </p>
        <p
          className={styles.news}
          style={{
            transform: `translateX(${newsX}%)`,
          }}
        >
          NEWS
        </p>
      </div>
    </div>
  );
}
