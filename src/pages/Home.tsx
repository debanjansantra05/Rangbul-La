'use client';

import Navbar from "@/components/Navbar";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { Button } from "@/components/ui/button";
import { MountainIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Home() {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Rooms & Suites", href: "#" },
    { label: "Experiences", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <>
      <Navbar
        logo={
          <>
            <MountainIcon className="h-6 w-6 text-white" />
            <span className="font-semibold text-white">
              Rangbul La
            </span>
          </>
        }
        navLinks={navLinks}
        topRightAction={
          <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20">
            Book Now
          </Button>
        }
      />

      <AnimatedHero
        title="Boutique Sustainable Homestay in Darjeeling"
        description="A forest garden retreat in Darjeeling offering slow, artisanal meals, immersive nature walks, and rich birdlife—crafted for mindful, soulful escapes."
      />

      <ParallaxSection />
    </>
  );
}

// ABOUT PAGE CONTENT

function ParallaxSection() {
  const sections = [
    {
      id: 1,
      title: "About Us",
      description:
        "Nestled in the peaceful Himalayas, Rangbul-La offers a luxurious and sustainable homestay experience surrounded by forests, clouds, and breathtaking views. Just 20 minutes from Darjeeling Mall Road, it is the perfect escape from the crowded town — where nature, comfort, and soulful living come together to create unforgettable memories.",
      images: [
        "src/assets/About Us1.heic",
        "src/assets/About Us2.heic",
        "src/assets/About Us3.heic",
      ],
      reverse: false,
    },
    {
      id: 2,
      title: "Luxury Stays",
      description:
        "Discover a peaceful escape where luxury meets nature in the heart of the Himalayas. Our thoughtfully designed stays offer elegant comfort, breathtaking forest and mountain views, and a tranquil atmosphere that lets you truly unwind. Just away from the bustle of Darjeeling town, Rangbul-La is a space to slow down, reconnect, and create unforgettable memories with your loved ones.",
      images: [
        "src/assets/Luxury Stays1.jpg",
        "src/assets/Luxury Stays2.jpg",
        "src/assets/Luxury Stays3.jpg",
      ],
      reverse: true,
    },
    {
      id: 3,
      title: "Culinary Delights",
      description:
        "Experience soulful dining with carefully curated meals made from fresh ingredients and inspired by local Himalayan flavors. From comforting breakfasts with scenic views to warm, homestyle delicacies, every meal at Rangbul-La is crafted to bring together taste, freshness, and the warmth of mountain hospitality.",
      images: [
        "src/assets/Culinary Delights1.jpg",
        "src/assets/Culinary Delights2.jpg",
        "src/assets/Culinary Delights3.jpg",
      ],
      reverse: false,
    },
  ];

  const refs = sections.map(() => useRef(null));

  const scrollProgress = sections.map((_, i) =>
    useScroll({
      target: refs[i],
      offset: ["start end", "center start"],
    }).scrollYProgress
  );

  const opacity = scrollProgress.map((p) =>
    useTransform(p, [0, 0.7], [0, 1])
  );

  const translate = scrollProgress.map((p) =>
    useTransform(p, [0, 1], [-50, 0])
  );

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <div className="px-6 md:px-12">
        {sections.map((section, i) => (
          <SectionCard
            key={section.id}
            section={section}
            reverse={section.reverse}
            opacity={opacity[i]}
            translate={translate[i]}
            refProp={refs[i]}
          />
        ))}
      </div>
    </div>
  );
}

// STACK CARD COMPONENT

function SectionCard({
  section,
  reverse,
  opacity,
  translate,
  refProp,
}: any) {
  const [cards, setCards] = useState(section.images);

  const handleShuffle = () => {
    const updated = [...cards];
    const last = updated.pop();

    if (last) {
      updated.unshift(last);
      setCards(updated);
    }
  };

  const positions = ["front", "middle", "back"];

  return (
    <div
      ref={refProp}
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-20 md:gap-32 overflow-hidden px-6 py-20 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* TEXT CONTENT */}
      <motion.div
        style={{ y: translate }}
        className="max-w-xl text-center md:text-left"
      >
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
          {section.title}
        </h2>

        <motion.p
          style={{ y: translate }}
          className="text-white/70 mt-6 leading-7 text-base md:text-lg"
        >
          {section.description}
        </motion.p>
      </motion.div>

      {/* RESPONSIVE CARD STACK */}
      <motion.div
        style={{
          opacity,
          y: translate,
        }}
        className="
          relative
          flex
          items-center
          justify-center
          mx-auto
          w-full
          overflow-visible
          min-h-[340px]
          sm:min-h-[420px]
          md:min-h-[520px]

          left-1/2
          -translate-x-1/2
          md:left-0
          md:translate-x-0
        "
      >
        <div
          className="
            relative
            flex
            items-center
            justify-center
            w-full
            max-w-[240px]
            sm:max-w-[320px]
            md:max-w-[520px]
            h-[320px]
            sm:h-[380px]
            md:h-[520px]
            mx-auto
          "
        >
          {cards.map((image: string, index: number) => {
            const position = positions[index];

            return (
              <motion.div
                key={`${image}-${index}`}
                drag={position === "front" ? "x" : false}
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.25}
                whileTap={{
                  cursor: "grabbing",
                  scale: 1.02,
                }}
                onDragEnd={(e, info) => {
                  if (
                    position === "front" &&
                    Math.abs(info.offset.x) > 100
                  ) {
                    handleShuffle();
                  }
                }}
                animate={{
                  rotate:
                    position === "front"
                      ? -10
                      : position === "middle"
                      ? 0
                      : 10,

                        x:
                          typeof window !== "undefined" &&
                          window.innerWidth < 640
                            ? position === "front"
                              ? 0
                              : position === "middle"
                              ? 10
                              : 20
                            : position === "front"
                            ? 0
                            : position === "middle"
                            ? 40
                            : 80,

                  scale:
                    position === "front"
                      ? 1
                      : position === "middle"
                      ? 0.95
                      : 0.9,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className={`
                  absolute
                  h-[240px]
                  w-[170px]
                  sm:h-[300px]
                  sm:w-[220px]
                  md:h-[420px]
                  md:w-[300px]
                  overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-white/10
                  backdrop-blur-xl
                  shadow-2xl
                  select-none
                  ${
                    position === "front"
                      ? "cursor-grab active:cursor-grabbing z-30"
                      : position === "middle"
                      ? "z-20"
                      : "z-10"
                  }
                `}
              >
                <img
                  src={image}
                  draggable={false}
                  className="h-full w-full object-contain pointer-events-none"
                  alt={section.title}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}