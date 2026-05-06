'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Interfaces
interface AnimatedHeroProps {
  title: string;
  description: string;
  ctaButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryCta?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  },
};

export const AnimatedHero = ({
  title,
  description,
  ctaButton,
  secondaryCta,
  className,
}: AnimatedHeroProps) => {
  const glassButtonClassName =
    "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors";

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background",
        className
      )}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src="/src/assets/video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-start justify-center text-left px-6 md:px-12 max-w-4xl w-full text-white"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/80"
        >
          {description}
        </motion.p>

        {(ctaButton || secondaryCta) && (
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center gap-x-4"
          >
            {ctaButton && (
              <Button
                onClick={ctaButton.onClick}
                size="lg"
                className={glassButtonClassName}
              >
                {ctaButton.text}
              </Button>
            )}

            {secondaryCta && (
              <Button
                onClick={secondaryCta.onClick}
                size="lg"
                className={glassButtonClassName}
              >
                {secondaryCta.text}
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};