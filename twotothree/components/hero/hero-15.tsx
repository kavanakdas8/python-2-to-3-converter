"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, FileCode2 } from "lucide-react";
import { LogoIcon } from "./logo-icon";

interface Hero15Props {
  brandName?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function Hero15({
  brandName = "ModernizePy",
  headingLine1 = "Modernize Legacy Python",
  headingLine2 = "Seamlessly to Python 3",
  description = "Effortlessly convert legacy Python 2 scripts, syntax, and deprecated modules into modern, idiomatic Python 3 using Google Gemini.",
  primaryCtaLabel = "Get Started",
  primaryCtaHref = "#converter",
  secondaryCtaLabel = "View API Docs",
  secondaryCtaHref = "http://localhost:8000/docs",
}: Hero15Props) {
  return (
    <section className="relative w-full overflow-hidden bg-[#09090b] pt-12 pb-24 md:pt-24 md:pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <LogoIcon className="w-10 h-10 text-white" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
            {brandName}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl text-white mb-4"
        >
          {headingLine1}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            {headingLine2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={primaryCtaHref}
            className="group flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-200"
          >
            {primaryCtaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={secondaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-6 py-3 text-sm font-semibold text-zinc-300 backdrop-blur-md transition-all hover:bg-white/10"
          >
            <FileCode2 className="h-4 w-4" />
            {secondaryCtaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
