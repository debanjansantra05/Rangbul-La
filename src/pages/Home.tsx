import Navbar from "@/components/Navbar";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { Button } from "@/components/ui/button";
import { MountainIcon } from "lucide-react";

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
    </>
  );
}