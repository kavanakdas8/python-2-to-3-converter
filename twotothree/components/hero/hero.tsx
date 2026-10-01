"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { LogoIcon } from "./logo-icon";
import React from "react";

export function Hero() {


  const trustedBrands = ["Python", "FastAPI", "Gemini", "Next.js"];

  return (
    <div className="relative min-h-screen flex flex-col bg-neutral-950 overflow-hidden text-neutral-50 font-sans selection:bg-emerald-500/30">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <header className="relative z-10 pt-6">
        <div className="w-full px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <LogoIcon className="w-8 h-8 text-white" />
            </div>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xl font-bold tracking-tight text-white"
            >
              ModernizePy
            </motion.span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Home</Link>
            <Link href="#about" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">About</Link>
            <Link href="#faq" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">FAQ</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="#converter"
              className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              Try Now
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16 max-w-7xl mx-auto w-full text-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          <span className="block text-white mb-2">Modernize Legacy Python</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Seamless Python 3 Conversion
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10"
        >
          Instantly refactor deprecated syntax, unicode changes, standard library renames, and division semantics using Google Gemini.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="#converter"
            className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
          >
            Launch Converter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="http://localhost:8000/docs"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-colors"
          >
            View API Docs
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-white/10 w-full"
        >
          <p className="text-sm font-medium text-neutral-500 mb-6 tracking-wide uppercase">
            Optimized for Standard Library &amp; Syntax Upgrades
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-neutral-400">
            {trustedBrands.map((brand) => (
              <div key={brand} className="flex items-center gap-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <span className="font-bold text-lg">{brand}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
