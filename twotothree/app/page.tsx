"use client";

import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { LandingNav } from "@/components/landing-nav";
import { Footer } from "@/components/footer";
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
    <div className="relative min-h-screen bg-transparent text-zinc-100 font-sans selection:bg-cyan-500/30 flex flex-col">
      {/* Background Aurora Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-gradient-to-b from-cyan-500/20 via-violet-600/20 to-transparent blur-[140px]" />
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>
      <LandingNav />
      <Hero />

      {/* How it works (2-Column Layout) */}
      <motion.section
        id="how-it-works"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 flex flex-col max-w-7xl mx-auto w-full px-6 py-24 border-t border-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column (Content & Steps) */}
          <motion.div variants={riseItem} className="flex flex-col space-y-8">
            <div>

              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200 font-semibold tracking-tight text-4xl sm:text-5xl mb-2 leading-tight">
                Three steps,<br />One modern codebase.
              </h2>
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-cyan-400 font-mono font-medium mb-1">01 — Paste your code</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Drop your existing Python 2 code into the editor. No setup required.</p>
              </div>
              <div>
                <h3 className="text-cyan-400 font-mono font-medium mb-1">02 — Convert</h3>
                <p className="text-slate-400 text-sm leading-relaxed">ModernizePy analyzes your code and applies the changes needed for Python 3.</p>
              </div>
              <div>
                <h3 className="text-cyan-400 font-mono font-medium mb-1">03 — Review &amp; use</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Review the converted code, copy it, and continue building with Python 3.</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column (3 Visual Metric Cards - Desktop) */}
          <motion.div variants={riseItem} className="flex-col gap-6 w-full hidden lg:flex">
            {/* Card 1 (Top Left Card) */}
            <div className="self-start w-80 backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] shadow-2xl shadow-cyan-950/30 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300 z-20">
              <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Migration Score</div>
              <div className="text-white font-semibold text-3xl tracking-tight mb-3">100%</div>
              <ul className="list-disc list-inside text-xs font-medium text-slate-400 space-y-1">
                <li>Python 3</li>
                <li>Syntax Valid</li>
              </ul>
            </div>

            {/* Card 2 (Middle Right Card) */}
            <div className="self-end w-80 backdrop-blur-xl bg-white/[0.06] border border-white/[0.14] shadow-2xl shadow-cyan-900/40 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300 z-30">
              <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Changes Made</div>

              <div className="space-y-3 font-mono text-xs">
                <ul className="list-disc list-inside text-slate-400 space-y-1 mb-2">
                  <li>print "x" ➔ print("x")</li>
                  <li>xrange() ➔ range()</li>
                  <li>/ ➔ // (integer division)</li>
                </ul>
                <div className="text-center pt-1 text-slate-500 font-sans italic text-[11px]">
                  And much more...
                </div>
              </div>
            </div>

            {/* Card 3 (Bottom Card) */}
            <div className="self-start ml-8 w-72 backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] shadow-2xl shadow-cyan-950/30 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300 z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-400 text-xs font-mono uppercase tracking-wider">Status</div>
              </div>
              <div className="text-white font-medium text-base mb-4 leading-tight">Zero manual fixes needed</div>
              <ul className="list-disc list-inside text-xs font-medium text-slate-400 space-y-1">
                <li>Clean Code</li>
                <li>Ready to Run</li>
              </ul>
            </div>
          </motion.div>

          {/* Mobile Right Column */}
          <motion.div variants={riseItem} className="flex flex-col gap-6 lg:hidden">
            {/* Card 1 */}
            <div className="w-full backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] shadow-2xl shadow-cyan-950/30 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Migration Score</div>
              <div className="text-white font-semibold text-3xl tracking-tight mb-3">100%</div>
              <ul className="list-disc list-inside text-xs font-medium text-slate-400 space-y-1">
                <li>Python 3</li>
                <li>Syntax Valid</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="w-full backdrop-blur-xl bg-white/[0.06] border border-white/[0.14] shadow-2xl shadow-cyan-900/40 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Changes Made</div>

              <div className="space-y-3 font-mono text-xs">
                <ul className="list-disc list-inside text-slate-400 space-y-1 mb-2">
                  <li>print "x" ➔ print("x")</li>
                  <li>xrange() ➔ range()</li>
                  <li>/ ➔ // (integer division)</li>
                </ul>
                <div className="text-center pt-1 text-slate-500 font-sans italic text-[11px]">
                  And much more...
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] shadow-2xl shadow-cyan-950/30 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-400 text-xs font-mono uppercase tracking-wider">Status</div>

              </div>
              <div className="text-white font-medium text-base mb-4 leading-tight">Zero manual fixes needed</div>
              <ul className="list-disc list-inside text-xs font-medium text-slate-400 space-y-1">
                <li>Clean Code</li>
                <li>Ready to Run</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>




      <Footer />
    </div>
  );
}
