'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  logo: React.ReactNode;
  navLinks: NavLink[];
  topRightAction?: React.ReactNode;
}

export default function Navbar({
  logo,
  navLinks,
  topRightAction,
}: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-0 z-50 flex h-20 w-full items-center justify-between px-6 md:px-12 text-white"
      >
        <div className="flex items-center gap-2">{logo}</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">{topRightAction}</div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setOpen(!open)}
        >
          <MenuToggleIcon open={open} className="size-8" />
        </button>
      </motion.header>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 md:hidden flex items-center justify-center
          bg-white/10 backdrop-blur-xl text-white"
        >
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative z-50 flex flex-col items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-2xl font-semibold tracking-wide hover:scale-110 transition-transform"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {topRightAction && (
              <div className="mt-6">
                {topRightAction}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}