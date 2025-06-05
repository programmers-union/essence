import React, { useEffect, useRef, useState } from 'react';
import '../styles/AnimatedMessage.css';

interface AnimatedMessageProps {
  line1: string;
  line2: string;
  tagline?: string;
  line1Class?: string;
  line2Class?: string;
}

const AnimatedMessage: React.FC<AnimatedMessageProps> = ({
  line1,
  line2,
  tagline = 'OUR VISION FOR THE FUTURE',
  line1Class = 'line-one',
  line2Class = 'line-two',
}) => {

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visibleLine1, setVisibleLine1] = useState('');
  const [visibleLine2, setVisibleLine2] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.intersectionRatio >= 0.5);
      },
      { threshold: [0, 0.5, 1] }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isActive) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
      const speed = 1.0;
      const eased = Math.pow(Math.min(1, progress * speed), 0.85);

      setVisibleLine1(line1.slice(0, Math.floor(eased * line1.length)));
      setVisibleLine2(line2.slice(0, Math.floor(eased * line2.length)));
    };

    if (isActive) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive, line1, line2]);

  return (
    <div ref={sectionRef} className="animation-container">
      <p className="tagline">{tagline}</p>

      <h1 className="typing-text">
        <span className={line1Class}>{visibleLine1}</span>
        <br />
        <span className={line2Class}>{visibleLine2}</span>
      </h1>
    </div>
  );
};

export default AnimatedMessage;
