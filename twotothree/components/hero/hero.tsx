"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { LogoIcon } from "./logo-icon";
import React from "react";

export function Hero() {
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Converter", href: "#converter" },
    { label: "Docs", href: "http://localhost:8000/docs" },
  ];

  const trustedBrands = ["Python", "FastAPI", "Gemini", "Next.js"];

  return (
    <div className="relative min-h-screen flex flex-col bg-neutral-950 overflow-hidden text-neutral-50 font-sans selection:bg-emerald-500/30">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-neutral-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <LogoIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ModernizePy</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-400 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#converter"
              className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              Start Converting
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16 max-w-7xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-emerald-300 mb-8"
        >
          <Terminal className="w-4 h-4" />
          <span>Python 2.7 End of Life was January 1, 2020</span>
        </motion.div>

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
