'use client';

import Navbar from "@/components/Navbar";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { Button } from "@/components/ui/button";
import { MountainIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Footer from "@/components/Footer";

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
      <TestimonialSection />
      <Footer />
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


// TESTIMONIAL SECTION

function TestimonialSection() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      title: "Stayed with family • Kolkata",
      description:
        "Rangbul-La felt like a hidden Himalayan sanctuary. The forest views, warm hospitality, and peaceful atmosphere made our stay unforgettable.",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    },

    {
      name: "Priya Mehta",
      title: "Solo Traveller • Mumbai",
      description:
        "The rooms were elegant, cozy, and deeply connected with nature. Every morning felt magical with the mountain mist and birdsong.",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    },

    {
      name: "Rahul Verma",
      title: "Couple Retreat • Bangalore",
      description:
        "From the soulful food to the breathtaking surroundings, everything at Rangbul-La was crafted with love and authenticity.",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  const socialIcons = [
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaTwitter, label: "Twitter" },
    { icon: FaYoutube, label: "Youtube" },
    { icon: FaLinkedin, label: "LinkedIn" },
  ];

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-semibold">
            Guest Experiences
          </h2>

          <p className="text-white/60 mt-6 max-w-2xl mx-auto leading-7">
            Stories, memories, and moments shared by guests who
            experienced the peaceful charm of Rangbul-La.
          </p>
        </div>

        <div className="hidden lg:flex relative items-center justify-center">
          <div className="w-[460px] h-[540px] rounded-[32px] overflow-hidden flex-shrink-0 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentTestimonial.imageUrl}
                src={currentTestimonial.imageUrl}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </AnimatePresence>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 ml-[-90px] z-10 max-w-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <h3 className="text-3xl font-semibold">
                  {currentTestimonial.name}
                </h3>

                <p className="text-white/60 mt-2">
                  {currentTestimonial.title}
                </p>

                <p className="text-lg leading-8 text-white/80 mt-8">
                  {currentTestimonial.description}
                </p>

                <div className="flex gap-4 mt-10">
                  {socialIcons.map(({ icon: Icon, label }, index) => (
                    <button
                      key={index}
                      className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:hidden max-w-sm mx-auto">
          <div className="aspect-square rounded-[28px] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentTestimonial.imageUrl}
                src={currentTestimonial.imageUrl}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </AnimatePresence>
          </div>

          <div className="mt-8 text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <h3 className="text-2xl font-semibold">
                  {currentTestimonial.name}
                </h3>

                <p className="text-white/60 mt-2">
                  {currentTestimonial.title}
                </p>

                <p className="text-white/80 leading-7 mt-6">
                  {currentTestimonial.description}
                </p>

                <div className="flex justify-center gap-4 mt-8">
                  {socialIcons.map(({ icon: Icon, label }, index) => (
                    <button
                      key={index}
                      className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            onClick={handlePrevious}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white scale-125"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}