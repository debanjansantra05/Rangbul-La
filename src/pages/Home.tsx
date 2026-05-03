import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { Button } from "@/components/ui/button";
import { MountainIcon } from "lucide-react";

export default function Home() {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Overview", href: "#" },
    { label: "Rooms & Suites", href: "#" },
    { label: "Experience", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <AnimatedHero
      logo={
        <>
          <MountainIcon className="h-6 w-6 text-primary-foreground" />
          <span className="font-semibold text-primary-foreground">
            Rangbul La
          </span>
        </>
      }
      navLinks={navLinks}
      topRightAction={
        <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground hover:bg-white/20">
          Book Now
        </Button>
      }
      title="Boutique Sustainable Homestay in Darjeeling"
      description="A forest garden retreat in Darjeeling offering slow, artisanal meals, immersive nature walks, and rich birdlife—crafted for mindful, soulful escapes."
    />
  );
}