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
    <div className="relative min-h-[70vh] flex flex-col bg-transparent overflow-hidden text-neutral-50 font-sans selection:bg-cyan-500/30">

      <div className="relative z-10 flex min-h-[70vh] flex-col">

        {/* Hero Main Content */}
        <div className="flex flex-1 items-center justify-center px-6 pb-16 sm:pb-24">
          <div className="flex max-w-4xl flex-col items-center text-center mt-16 sm:mt-24">

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
              <span className="block text-[40px] sm:text-[54px] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-violet-500">
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
                className="group flex min-h-12 items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 px-8 text-base font-medium text-neutral-950 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all active:scale-[0.96]"
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
