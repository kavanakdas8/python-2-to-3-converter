"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";

export function Hero() {


  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 28, stiffness: 80, mass: 1.4, delay: 0.35 },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 22, stiffness: 110, delay: 0.65 },
    },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92, y: 10 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 140, delay: 0.85 },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#050608] overflow-hidden text-neutral-50 font-sans selection:bg-emerald-500/30">
      {/* Background Aurora Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[70%] rounded-full bg-emerald-500/10 blur-[150px] opacity-70" />
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[60%] rounded-full bg-blue-500/10 blur-[150px] opacity-60" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] rounded-full bg-violet-500/10 blur-[150px] opacity-70" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">

        {/* Hero Main Content */}
        <div className="flex flex-1 items-center justify-center px-6 pb-16 sm:pb-24">
          <div className="flex max-w-4xl flex-col items-center text-center">

            {/* Title: majestic slow rise */}
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="leading-[1.1] font-extrabold tracking-tight mb-6 max-w-4xl"
              style={{ textWrap: 'balance' }}
            >
              <span className="block text-[48px] sm:text-[64px] text-white mb-2">
                Modernize your Python
              </span>
              <span className="block text-[40px] sm:text-[54px] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 via-blue-500 to-violet-500">
                Without rewriting it by hand
              </span>
            </motion.h1>

            {/* Subtitle: lighter, quicker */}
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="text-[18px] sm:text-[20px] leading-relaxed text-neutral-400 max-w-2xl mx-auto mb-10"
              style={{ textWrap: 'pretty' }}
            >
              Convert legacy Python 2 code into modern Python 3 code in seconds.
            </motion.p>

            {/* CTA: scales into place */}
            <motion.div
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-6 w-full sm:w-auto"
            >
              <Link
                href="/convert"
                className="group flex min-h-12 items-center gap-2 rounded-full bg-white/10 px-8 text-base font-bold text-white shadow-[inset_2px_2px_0_-0.5px_rgba(255,255,255,0.1),inset_-2px_-2px_0_-0.5px_rgba(255,255,255,0.1),0_0_20px_rgba(52,211,153,0.2)] backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-[inset_2px_2px_0_-0.5px_rgba(255,255,255,0.2),inset_-2px_-2px_0_-0.5px_rgba(255,255,255,0.2),0_0_40px_rgba(52,211,153,0.4)] active:scale-[0.96]"
              >
                Start converting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="text-neutral-400 text-sm space-y-1.5">
                <p>No setup. Just paste, convert, and move forward.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
