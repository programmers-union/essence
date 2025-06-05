import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import { InteriorShowcaseProps, defaultProject } from '../types/interior';

const InteriorShowcase: React.FC<InteriorShowcaseProps> = ({
  project = defaultProject,
  className,
  variant = 'default'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1

  useEffect(() => {
    const handleScroll = () => {
      const section = containerRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visibleAmount = Math.min(
        1,
        Math.max(0, (windowHeight - rect.top) / windowHeight)
      );

      setScrollProgress(visibleAmount);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scale = 0.3 + 0.7 * scrollProgress;
  const opacity = 0.8 + 0.2 * scrollProgress;

  return (
    <div
      ref={containerRef}
      className={`${styles.ferroContainer} ${className || ''} ${styles[variant]}`}
      style={{
        transform: `scale(${scale})`,
        opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
      }}
    >
      {/* Left and Right Panels - same as before */}
      <div className={styles.ferroLeftPanel}>
        <div className={styles.ferroLogoSection}>
          <h1 className={styles.ferroLogo}>{project.brand || 'WOR'}</h1>
        </div>
        <div className={styles.ferroContentSection}>

            <div className={styles.ferroWrapper}>

                    <h2 className={styles.ferroTitle}>{project.title}</h2>
          <p className={styles.ferroSubtitle}>{project.subtitle}</p>
          <div className={styles.ferroDivider}></div>

          
                <div className={styles.ferroDetailsGrid}>
            <div className={styles.ferroDetailItem}>
              <span className={styles.ferroDetailLabel}>Total Area</span>
              <span className={styles.ferroDetailValue}>{project.details.area}</span>
            </div>
            <div className={styles.ferroDetailItem}>
              <span className={styles.ferroDetailLabel}>Location</span>
              <span className={styles.ferroDetailValue}>{project.details.location}</span>
            </div>
          </div>
            </div>
          


         
          
        </div>
      </div>

      <div className={styles.ferroRightPanel}>
        <div className={styles.ferroImageContainer}>
          <img
            src={project.images.main}
            alt={project.images.alt}
            className={styles.ferroMainImage}
          />
        </div>
      </div>
    </div>
  );
};

export default InteriorShowcase;
