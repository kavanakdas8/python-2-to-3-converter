"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoIcon } from "./hero/logo-icon";

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
        className="pointer-events-auto flex w-full items-center justify-between bg-transparent px-6 py-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <LogoIcon className="w-7 h-7 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
            ModernizePy
          </span>
        </div>



        <Link
          href="/convert"
          className="group flex items-center gap-3 rounded-full bg-white hover:bg-neutral-200 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-black transition-all active:scale-[0.96]"
        >
          Try it now
          <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
      </motion.nav>
    </div>
  );
}
