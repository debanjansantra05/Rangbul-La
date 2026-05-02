import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { Button } from "@/components/ui/button";
import { MountainIcon } from "lucide-react";

export default function Home() {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <AnimatedHero
      backgroundImageUrl="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600"
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
      title="Take Charge of your Generation Now"
      description="Lead with purpose, build boldly, and shape the future—your generation's moment is now."
    />
  );
}