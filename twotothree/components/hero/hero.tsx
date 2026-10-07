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
    <div className="relative min-h-[70vh] flex flex-col bg-transparent overflow-hidden text-neutral-50 font-sans selection:bg-white/20">

      <div className="relative z-10 flex min-h-[70vh] flex-col">

        {/* Hero Main Content */}
        <div className="flex flex-1 items-center justify-center px-6 pb-16 sm:pb-24">
          <div className="flex max-w-4xl flex-col items-center text-center mt-16 sm:mt-24">

            {/* Title: majestic slow rise */}
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="leading-[1.1] mb-8 max-w-5xl"
              style={{ textWrap: 'balance' }}
            >
              <span className="block text-[56px] sm:text-[84px] font-bold text-white mb-0 tracking-tight">
                Modernize your Python
              </span>
              <span className="block text-[56px] sm:text-[84px] font-bold text-white mb-0 tracking-tight">
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
                className="group flex min-h-14 items-center gap-4 rounded-full bg-white hover:bg-neutral-200 pl-8 pr-2 py-2 text-lg font-semibold text-black transition-all active:scale-[0.96]"
              >
                Start converting
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <div className="text-neutral-500 text-sm space-y-1.5 font-medium">
                <p>No setup. Just paste, convert, and move forward.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
