// Composition root - the "edit": orders sections in the LOCKED conversion-optimized scroll order.
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/ui/Nav";
import { HeroHeader } from "@/components/sections/HeroHeader";
import { Concept } from "@/components/sections/Concept";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MatchShowcase } from "@/components/sections/MatchShowcase";
import { PrizePool } from "@/components/sections/PrizePool";
import { Standings } from "@/components/sections/Standings";
import { SponsorValue } from "@/components/sections/SponsorValue";
import { Traction } from "@/components/sections/Traction";
import { Lineage } from "@/components/sections/Lineage";
import { SponsorCTA } from "@/components/sections/SponsorCTA";
import { Footer } from "@/components/sections/Footer";

// Server Component. SmoothScroll is a "use client" behavior wrapper (no DOM box)
// that early-returns to native scroll under reduced motion; mounting it once at
// the root is correct. Sections own their own Reveal/ScrollParallax - no
// animation logic lives here.
export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <HeroHeader />
        <Concept />
        <HowItWorks />
        <MatchShowcase />
        <PrizePool />
        <Standings />
        <SponsorValue />
        <Traction />
        <Lineage />
        <SponsorCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
