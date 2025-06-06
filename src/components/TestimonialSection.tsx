import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

type Testimonial = {
  name: string;
  role: string;
  content: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Emily Johnson",
    role: "Product Designer at Intro.Space",
    content:
      "Excellent with the vision but also brought it to life in a way that exceeded our expectations. The space is functional.",
    image: "/image2.webp",
  },
  {
    name: "Marcus Lee",
    role: "Lead Developer at BuildCraft",
    content:
      "Their attention to detail and dedication to the project was incredible. We saw improvements immediately after launch.",
    image: "/image3.webp",
  },
  {
    name: "Sophie Turner",
    role: "Marketing Head at BrightIdeas",
    content:
      "Loved working with the team. Professional, timely, and incredibly creative. The end result spoke volumes!",
    image: "/image4.webp",
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  const testimonial = testimonials[activeIndex];

  return (
    <section className={styles.testimonialSection}>

      <div className={styles.container10}>
        <div className={styles.hishop}  >
          <div className={styles.hisimage}>
              <img src="/image2.png" alt="" />
          </div>

          <div className={styles.counter}>
          <span className={styles.bold}>
            {String(activeIndex + 1).padStart(2, "0")} -
          </span>{" "}
          {String(testimonials.length).padStart(2, "0")}
        </div>

        </div>
      </div>
       


       <div className={styles.container8}>

       

        <div className={styles.imageColumn}>
          {testimonials.map((t, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`${styles.thumbnailButton} ${
                index === activeIndex ? styles.active : ""
              }`}
            >
              <Image
                src={t.image}
                alt={t.name}
                width={100}
                height={100}
                className={styles.image}
              />
            </button>
          ))}
        </div>

        <div className={styles.textContent}>
         <div className={styles.testimonialText}>
          {(() => {
            const words = testimonial.content.split(" ");
            const splitIndex = Math.floor(words.length * 0.8);
            const firstPart = words.slice(0, splitIndex).join(" ");
            const lastPart = words.slice(splitIndex).join(" ");
            return (
              <>
                <span className={styles.blackText}>{firstPart} </span>
                <span className={styles.goldText}>{lastPart}</span>
              </>
            );
          })()}
        </div>
          <div className={styles.author}>{testimonial.name}</div>
          <div className={styles.role}>{testimonial.role}</div>
        </div>

        

        <div className={styles.brand3}>
          <img src="/image5.png" alt="" />
        </div>
      </div>
    </section>
  );
}
