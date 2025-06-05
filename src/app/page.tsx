"use client";
import React from 'react';
import { useEffect } from "react";
import Image from "next/image";

import "aos/dist/aos.css";
import styles from "../styles/Home.module.css";
import AnimatedText from '@/components/AnimatedText';
import TestimonialSection from "@/components/TestimonialSection";
import { InteriorShowcaseProps } from '../types/interior';
import InteriorShowcase from '../components/InteriorShowcase';
import SeeAllWorks from '@/components/SeeAllWorks';
import AnimatedMessage from '@/components/AnimatedMessage';
import StraightLine from '@/components/BorderBox';
import ScrollRotateImages from '@/components/ScrollRotateImages';

export default function Home() {
  useEffect(() => {
    // MENU POPUP LOGIC
    const openBtn = document.getElementById("openMenuBtn");
    const closeBtn = document.getElementById("closeMenuBtn");
    const popup = document.getElementById("popupMenu");
    if (openBtn && closeBtn && popup) {
      popup.style.display = "none";
      openBtn.addEventListener("click", () => {
        popup.style.display = "flex";
      });
      closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
      });
      window.addEventListener("click", (e) => {
        if (e.target === popup) popup.style.display = "none";
      });
    }

    // TEXT SCROLL HORIZONTAL LOGIC
    const ltr = document.getElementById("ltr");
    const rtl = document.getElementById("rtl");
    const section = document.getElementById("textSection");
    function handleScrollText() {
      if (!ltr || !rtl || !section) return;
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distanceToCenter = sectionCenter - viewportCenter;
      const maxDistance = window.innerHeight;
      const normalizedProgress =
        1 - Math.min(Math.abs(distanceToCenter) / maxDistance, 1);
      const containerWidth = section.offsetWidth;
      const ltrStart = -ltr.offsetWidth;
      const ltrEnd = containerWidth / 2 - ltr.offsetWidth / 2;
      const rtlStart = -rtl.offsetWidth;
      const rtlEnd = containerWidth / 2 - rtl.offsetWidth / 2;
      const ltrX = ltrStart + (ltrEnd - ltrStart) * normalizedProgress;
      const rtlX = rtlStart + (rtlEnd - rtlStart) * normalizedProgress;
      ltr.style.transform = `translateX(${ltrX}px)`;
      rtl.style.transform = `translateX(${-rtlX}px)`;
    }
    window.addEventListener("scroll", handleScrollText);
    window.addEventListener("resize", handleScrollText);
    handleScrollText();

   

    // IMAGE ROTATION ON SCROLL
    function updateRotation() {
      document.querySelectorAll(`.${styles.section6Image}`).forEach((el) => {
        const image = el as HTMLElement;
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          const visibleRatio = Math.min(
            1,
            Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height))
          );
          const angle = 180 - 155 * visibleRatio;
          image.style.transform = `rotate(${angle}deg)`;
        } else {
          image.style.transform = "rotate(180deg)";
        }
      });
    }
    window.addEventListener("scroll", updateRotation);
    window.addEventListener("resize", updateRotation);
    window.addEventListener("load", updateRotation);

   

    // INTERSECTION OBSERVER FOR .design3 BLOCKS
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
            entry.target.classList.remove(styles.hiddenOnLoad);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(`.${styles.design3}`).forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScrollText);
      window.removeEventListener("resize", handleScrollText);
      window.removeEventListener("scroll", updateRotation);
      window.removeEventListener("resize", updateRotation);
      window.removeEventListener("load", updateRotation);
    };
  }, []);




  const projects = [
  {
     id: 'project-1',
    brand: 'WOR',
    title: 'Modern Loft',
    subtitle: 'Industrial elegance in urban setting',
    details: {
      area: '1,200 sq.ft',
      location: 'Brooklyn, NY',
    },
    images: {
      main: 'https://cdn.prod.website-files.com/67c0556f30cad0ecfcf12af0/67c2efa88fd44620b9e18815_portfolio-6-p-1080.webp',
      alt: 'Modern Loft Image',
    },
  },
  {
    id: 'project-2',
    brand: 'ARQ',
    title: 'Coastal Retreat',
    subtitle: 'Serenity by the sea',
    details: {
      area: '2,500 sq.ft',
      location: 'Malibu, CA',
    },
    images: {
      main: 'https://cdn.prod.website-files.com/67c0556f30cad0ecfcf12af0/67c2ec711a334545c9951d5a_portfolio-3-p-1080.webp',
      alt: 'Coastal Retreat Image',
    },
  },
  {
    id: 'project-3',
    brand: 'NOVA',
    title: 'Mountain Getaway',
    subtitle: 'Luxury in nature',
    details: {
      area: '3,000 sq.ft',
      location: 'Aspen, CO',
    },
    images: {
      main: 'https://cdn.prod.website-files.com/67c0556f30cad0ecfcf12af0/67c2eb8d28794a3ca77406fe_portfolio-4-p-1080.webp',
      alt: 'Mountain Getaway Image',
    },
  },
];


  return (
    <div className={styles.body}>

       
      
      

     
          {/* NAVIGATION BAR */}
      <div className={styles.navbg}>
        <div className={styles.nav}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={98}
            height={51}
            className={styles.logoImg}
          />
        </div>
        <div className={styles.navSub}>
          <a href="#" className={styles.navItem}>
            Home
          </a>
          <a href="#" className={styles.navItem}>
            About
          </a>
          <a href="#" className={styles.navItem}>
            Services
          </a>
          <a href="#" className={styles.navItem}>
            Contact
          </a>
          <a href="#" className={styles.navItem}>
            Shop
          </a>
          <a href="#" className={styles.navItem}>
            Blog
          </a>
        </div>
        <div className={styles.rightControls}>
          <div className={styles.cartContainer}>
            <Image
              src="/cart.png"
              alt="Cart"
              width={30}
              height={30}
              className={styles.cartImage}
            />
            <span>Cart</span>
          </div>

          <div id="openMenuBtn" className={styles.menuButton}>
            <Image
              src="/menu.png"
              alt="Menu"
              width={40}
              height={40}
            />
          </div>
          <div id="popupMenu" className={styles.popup}>
            <div className={styles.popupContent}>
              <span id="closeMenuBtn" className={styles.closeBtn}>
                &times;
              </span>
              <p className={styles.navItem2}>Menu</p>
              <p className={styles.navItem2}>Home</p>
              <p className={styles.navItem2}>About</p>
                 <p className={styles.navItem2}>Page</p>
                  <p className={styles.navItem2}>About</p>
              
           
            </div>
          </div>
        </div>
      </div>
      </div>

        <StraightLine />

      

      

      {/* HEADER */}
      <div className={styles.header}>
        <div>WE MAID</div>
        <div>SINCE 1994</div>
      </div>

      {/* MAIN HERO */}
      <div className={styles.container}>
        <div className={styles.brand}>ESSENCE</div>
      </div>
      

      {/* DESIGN BLOCK #1 */}
      <div className={styles.design1}>
        <div>
          <div className={styles.section3Header}>THE</div>
          <div className={styles.section3ImageWrapper}>
            <img
              src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67a1f7f9ab2cf4f466eb53fd_hero-img-1.webp"
              alt="Interior Room with Posters"
              className={styles.section3RoomImage}
            />
          </div>
        </div>

        <div>
          <div className={styles.section3Container}>
            <div className={styles.section3ImageBox}>
              <img
                src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67a1f7f9fef782c3e52e90da_hero-img-2.webp"
                alt="Interior Design"
              />
              <div className={styles.section3Text}>
                <p>
                  SHAPES FUTURE TRENDS
                  <br />
                  INTO TOMORROW'S DESIGNS.
                  <br />
                  EXPLORE OUR VISION FOR INTERIOR
                  <br />
                  AND EXTERIOR CREATIONS.
                </p>
              </div>
            </div>
            <div className={styles.brand2}>
              <p>Luxury</p>
            </div>
          </div>
        </div>
      </div>


     

    <AnimatedMessage
        line1="Inter.Studio → Shapes future"
        line2="We design tomorrow"
        tagline="OUR BELIEF IN DESIGN THINKING"
      />

    

        <ScrollRotateImages
        
        image1Src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67a2030f0c4f1aa404f0d5ce_about-1.webp"
        image2Src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67a2030f5e14b662e8c13835_about-2.webp"
        leftImageInitialRotation={45}
        leftImageTargetRotation={0}
        rightImageInitialRotation={320}
        rightImageTargetRotation={360}
      />

      <div className="text-rpn-color">
        <div className="text-rpn">
          <AnimatedMessage
        line1="Design is a strategy"
        line2="Innovation is the outcome"
        tagline=""
        line1Class="line-three"
        line2Class="line-four"
      />
        </div>
      </div>


      {projects.map((project) => (
      <InteriorShowcase key={project.id} project={project} />
      
    ))}




    
    <SeeAllWorks/>


  

      

      <TestimonialSection/>

       <AnimatedText />

      

      {/* CIRCLE‐ANIMATED CARDS */}
      <div className={styles.section10Container}>
        {/* CARD 1 */}
        <div className={styles.section10Card}>
          <div className={styles.circleImageContainer}>
            <img
              src="https://cdn.prod.website-files.com/67c0556f30cad0ecfcf12af0/67c2cdee0f31989491f1be76_blog-gallery-1.webp"
              alt="Sample Image"
              className={styles.cardImage}
            />
            <div className={styles.circleText}>
              <svg viewBox="0 0 200 200" width="200" height="200">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  />
                </defs>
                <text 
                  fill="#013220"
                  fontSize="12"
                  fontFamily="Arial"
                  letterSpacing="2"
                >
                  <textPath   href="#circlePath">
                    • VIEW DETAILS • VIEW DETAILS • VIEW DETAILS • VIEW DETAILS •
                  </textPath>
                </text>
              </svg>
              <div className={styles.circleIcon}>↗</div>
            </div>
          </div>
          <div className={styles.section10Content}>
            <div className={styles.section10Author}>
              Write by <b>Leslie Alexander</b>
            </div>
            <div className={styles.section5Highlighttwo}>
              How to Mix Modern and Vintage Styles
            </div>
            <a href="#" className={styles.section10Explore}>
              Explore More
            </a>
          </div>
        </div>

        {/* CARD 2 */}
        <div className={styles.section10Card}>
          <div className={styles.circleImageContainer}>
            <img
              src="https://cdn.prod.website-files.com/67c0556f30cad0ecfcf12af0/67c2cf77df9d1ba765b3def2_blog-6.webp"
              alt="Sample Image"
              className={styles.cardImage}
            />
            <div className={styles.circleText}>
              <svg viewBox="0 0 200 200" width="200" height="200">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  />
                </defs>
                <text
                  fill="#013220"
                  fontSize="12"
                  fontFamily="Arial"
                  letterSpacing="2"
                >
                  <textPath href="#circlePath">
                    • VIEW DETAILS • VIEW DETAILS • VIEW DETAILS • VIEW DETAILS •
                  </textPath>
                </text>
              </svg>
              <div className={styles.circleIcon}>↗</div>
            </div>
          </div>
          <div className={styles.section10Content}>
            <div className={styles.section10Author}>
              Write by <b>Guy Hawkins</b>
            </div>
            <div className={styles.section5Highlighttwo}>
              Space-Saving Interior Design Hacks for Apartments
            </div>
            <a href="#" className={styles.section10Explore}>
              Explore More
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className={styles.footerSection}>
        <div className={styles.footer3}>
          <div className={styles.footerColumn2}>
            <div className={styles.footerLogo}>
              <img className={styles.tcs} src="/image.png" alt="" />
            </div>
            <div className={styles.socialIcons}>
              <img
                src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67c3de60347cecfc74cd3983_linkedin.svg"
                alt="LinkedIn"
              />
              <img
                src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67c3de5fab3ddc3074a52dd3_instagram.svg"
                alt="Instagram"
              />
              <img
                src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67c3de5fc17ac25791eca8c6_twitter.svg"
                alt="Twitter"
              />
              <img
                src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67c3de5f6c45159368213c7e_behance.svg"
                alt="Behance"
              />
              <img
                src="https://cdn.prod.website-files.com/67a1b0d6e8bab1f06c4f9f60/67c3de5fededea4b389b56c9_dribbble.svg"
                alt="Dribbble"
              />
            </div>
          </div>
        </div>

        <div className={styles.footer2}>
          <div className={styles.footerColumn}>
            <h2>Info</h2>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Team</a>
            <a href="#">Contact Us</a>
          </div>
          <div className={styles.footerColumn}>
            <h2>Services</h2>
            <a href="#">Portfolio</a>
            <a href="#">Services</a>
            <a href="#">Shop</a>
            <a href="#">Style Guide</a>
            <a href="#">License</a>
            <a href="#">Changelog</a>
          </div>
          <div className={styles.footerColumn}>
            <h2>Contact</h2>
            <p className={styles.whiteColor}>(00) 123 654 78</p>
            <p className={styles.whiteColor}>info@yourmail.com</p>
            <p className={styles.whiteColor}>Shop : Alex Tower, N -26, USA</p>
            <p className={styles.whiteColor}>Office : Mx avenue, Whiston DC</p>
          </div>
          <div className={`${styles.footerColumn} ${styles.subscribe}`}>
            <h3>
              Get 10% off your first order and access exclusive offers.
            </h3>
            <input type="text" placeholder="First Name" />
            <input type="email" placeholder="Email Address" />
            <button>Submit Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
