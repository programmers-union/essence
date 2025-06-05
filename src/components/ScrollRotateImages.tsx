'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/ScrollRotateImages.module.css';

interface ScrollRotateImagesProps {
  image1Src: string;
  image2Src: string;
  leftImageInitialRotation?: number;
  leftImageTargetRotation?: number;
  rightImageInitialRotation?: number;
  rightImageTargetRotation?: number;
}

const ScrollRotateImages: React.FC<ScrollRotateImagesProps> = ({
  image1Src,
  image2Src,
  leftImageInitialRotation = 45,
  leftImageTargetRotation = 0,
  rightImageInitialRotation = 45,
  rightImageTargetRotation = 90
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [leftRotation, setLeftRotation] = useState(leftImageInitialRotation);
  const [rightRotation, setRightRotation] = useState(rightImageInitialRotation);

useEffect(() => {
  const handleScroll = () => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Center of section
    const sectionCenter = rect.top + rect.height / 2;

    // We define animation to start when section center hits bottom of viewport,
    // and end when section center hits middle of viewport
    const start = windowHeight;
    const end = windowHeight / 2;

    const scrollRange = start - end;

    let progress = (start - sectionCenter) / scrollRange;

    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    const currentLeftRotation =
      leftImageInitialRotation +
      (leftImageTargetRotation - leftImageInitialRotation) * progress;

    const currentRightRotation =
      rightImageInitialRotation +
      (rightImageTargetRotation - rightImageInitialRotation) * progress;

    setLeftRotation(currentLeftRotation);
    setRightRotation(currentRightRotation);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial run

  return () => window.removeEventListener("scroll", handleScroll);
}, [
  leftImageInitialRotation,
  leftImageTargetRotation,
  rightImageInitialRotation,
  rightImageTargetRotation
]);


  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
       
        <div className={styles.imageContainer}>
          <div 
            className={styles.imageWrapper}
            style={{ transform: `rotate(${leftRotation}deg)` }}
          >
            <img 
              src={image1Src} 
              alt="Left Rotating Image" 
              className={styles.image}
            />
          </div>
          <div 
            className={styles.imageWrapper}
            style={{ transform: `rotate(${rightRotation}deg)` }}
          >
            <img 
              src={image2Src} 
              alt="Right Rotating Image" 
              className={styles.image}
            />
          </div>
        </div>
       
      </div>
    </section>
  );
};

export default ScrollRotateImages;