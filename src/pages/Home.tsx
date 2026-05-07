'use client';

import Navbar from "@/components/Navbar";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { Button } from "@/components/ui/button";
import { MountainIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
            <span className="font-semibold text-white">Rangbul La</span>
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
        "Experience boutique living with handcrafted interiors and serene mountain views.",
      imageUrl:
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb2108c",
      reverse: false,
    },
    {
      id: 2,
      title: "Luxury Stays",
      description:
        "Immerse yourself in curated nature trails and birdwatching experiences.",
      imageUrl:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      reverse: true,
    },
    {
      id: 3,
      title: "Culinary Delights",
      description:
        "Enjoy slow, farm-to-table meals crafted with locally sourced ingredients.",
      imageUrl:
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
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
          <div
            key={section.id}
            ref={refs[i]}
            className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-20 md:gap-32 ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* TEXT CONTENT */}
            <motion.div
              style={{ y: translate[i] }}
              className="max-w-sm"
            >
              <h2 className="text-3xl md:text-5xl font-semibold">
                {section.title}
              </h2>

              <motion.p
                style={{ y: translate[i] }}
                className="text-white/70 mt-6 leading-7"
              >
                {section.description}
              </motion.p>
            </motion.div>

            {/* STACKED IMAGE CARDS */}
            <motion.div
              style={{
                opacity: opacity[i],
                y: translate[i],
              }}
              className="relative flex items-center justify-center
              h-[360px] w-[320px]
              md:h-[520px] md:w-[520px]"
            >
              {/* BACK CARD */}
              <motion.div
                initial={{ rotate: 10, x: 80 }}
                whileInView={{ rotate: 10, x: 80 }}
                transition={{ duration: 0.6 }}
                className="absolute
                h-[280px] w-[200px]
                md:h-[420px] md:w-[300px]
                overflow-hidden rounded-3xl
                border border-white/10
                bg-white/10 backdrop-blur-xl
                shadow-2xl"
              >
                <img
                  src={section.imageUrl}
                  className="h-full w-full object-cover"
                  alt={section.title}
                />
              </motion.div>

              {/* MIDDLE CARD */}
              <motion.div
                initial={{ rotate: 0, x: 40 }}
                whileInView={{ rotate: 0, x: 40 }}
                transition={{ duration: 0.6 }}
                className="absolute
                h-[280px] w-[200px]
                md:h-[420px] md:w-[300px]
                overflow-hidden rounded-3xl
                border border-white/10
                bg-white/10 backdrop-blur-xl
                shadow-2xl"
              >
                <img
                  src={section.imageUrl}
                  className="h-full w-full object-cover"
                  alt={section.title}
                />
              </motion.div>

              {/* FRONT CARD */}
              <motion.div
                initial={{ rotate: -10, x: 0 }}
                whileInView={{ rotate: -10, x: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute
                h-[280px] w-[200px]
                md:h-[420px] md:w-[300px]
                overflow-hidden rounded-3xl
                border border-white/10
                bg-white/10 backdrop-blur-xl
                shadow-2xl"
              >
                <img
                  src={section.imageUrl}
                  className="h-full w-full object-cover"
                  alt={section.title}
                />
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}