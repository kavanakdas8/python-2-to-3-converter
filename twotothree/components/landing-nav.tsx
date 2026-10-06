"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoIcon } from "./hero/logo-icon";
import { ContinuousTabs } from "./continuoustab";
import React from "react";

export function LandingNav() {
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -24, filter: 'blur(8px)', scale: 0.97 },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
      transition: { type: 'spring', damping: 24, stiffness: 120, duration: 0.6 },
    },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="pointer-events-auto flex w-full items-center justify-between bg-transparent border-b border-white/10 px-6 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <LogoIcon className="w-7 h-7 text-white drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
            ModernizePy
          </span>
        </div>

        <div className="hidden md:block">
          <ContinuousTabs />
        </div>

        <Link
          href="/convert"
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-2 text-sm font-bold text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] active:scale-[0.96]"
        >
          Try it now <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.nav>
    </div>
  );
}
