import { useState } from "react";
import "./Hero.css";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Hero = () => {
  const images = [
    "/images/chinese-menu/momos.png",
    "/images/chinese-menu/noodles.png",
    "/images/chinese-menu/paneer.png",
    "/images/chinese-menu/potatoes.png",
    "/images/chinese-menu/friedrice.png",
    "/images/chinese-menu/springroll.png",
    "/images/chinese-menu/cornsoup.png",
  ];

  const [index, setIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const thumbnailPositions = [
    { x: -50, y: -110 },
    { x: -70, y: 80 },
    { x: 100, y: -230 },
    { x: 290, y: -260 },
    { x: 470, y: -220 },
    { x: 620, y: -80 },
    { x: 650, y: 80 },
  ];

  const selectSlide = (i: number) => {
    const diff = i - index;
    setRotation((r: number) => r + diff * 360);
    setIndex(i);
  };

  const getPosition = (i: number): string => {
    const diff = (i - index + images.length) % images.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === images.length - 1) return "left";
    return "hidden";
  };

  return (
    <div className="hero chinese-menu-page">
      <Navbar />

      <div className="hero-content">
        <div className="hero-left">
          <div className="thumbnails">
            {images.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                className={`thumbnail ${i === index ? "active" : ""}`}
                animate={{
                  x: thumbnailPositions[i].x,
                  y: thumbnailPositions[i].y,
                  scale: i === index ? 1.2 : 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onClick={() => selectSlide(i)}
              />
            ))}
          </div>

          <div className="carousel">
            {images.map((src, i) => {
              const pos = getPosition(i);
              let animate: Record<string, number> = {};
              let zIndex = 1;

              if (pos === "center") {
                animate = {
                  x: 0,
                  y: -40,
                  scale: 1.3,
                  opacity: 1,
                  rotate: rotation,
                };
                zIndex = 3;
              } else if (pos === "left") {
                animate = {
                  x: -300,
                  y: 240,
                  scale: 0.8,
                  opacity: 1,
                  rotate: rotation,
                };
                zIndex = 2;
              } else if (pos === "right") {
                animate = {
                  x: 310,
                  y: 240,
                  scale: 0.8,
                  opacity: 1,
                  rotate: rotation,
                };
                zIndex = 2;
              } else {
                animate = { opacity: 0, scale: 0, x: 0, y: 0 };
                zIndex = 0;
              }

              return (
                <motion.img
                  key={src}
                  src={src}
                  className="dish"
                  style={{ zIndex }}
                  animate={animate}
                  initial={false}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              );
            })}
          </div>
        </div>

        <div className="hero-right">
          <motion.h1
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            We Serve Chinese Now
          </motion.h1>

          <motion.p
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Experience the authentic taste of China with our freshly steamed
            dumplings, sizzling noodles, and golden spring rolls. Each dish is
            handcrafted with love, fresh ingredients, and bold flavors that
            awaken your senses. From rich sauces to comforting soups, every bite
            tells a story of tradition and taste. Whether you're craving a quick
            bite or a soulful meal, we bring the flavors of the East straight to
            your plate — hot, hearty, and unforgettable.
          </motion.p>
          <motion.button
            className="hero-btn"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            Order Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;