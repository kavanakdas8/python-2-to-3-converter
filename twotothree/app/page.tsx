"use client";

import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { LandingNav } from "@/components/landing-nav";
import { Footer } from "@/components/footer";
import { Features } from "@/components/features";
import { motion, type Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.6, bounce: 0 },
  },
};


export default function Home() {

  return (
    <div className="relative min-h-screen bg-transparent text-zinc-100 font-sans selection:bg-white/20 flex flex-col">
      {/* Cinematic Video Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <video
          src="/mixkit-snow-overlay-of-snow-falling-softly-8468-hd-ready.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.45] motion-reduce:hidden"
        />
      </div>

      {/* Dark Overlay & Subtle Glow Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center bg-gradient-to-b from-black/0 via-black/40 to-black/90">
        <div className="absolute top-[0%] w-[70%] h-[60%] rounded-full bg-white/[0.04] blur-[150px]" />
      </div>
      <LandingNav />
      <Hero />

      <Features />




      <Footer />
    </div>
  );
}
