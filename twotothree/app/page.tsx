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
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-emerald-500/10 blur-[130px]" />
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
              <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-sm font-medium text-neutral-300 mb-6">
                <span className="mr-2 text-emerald-400">•</span> Automated Migration
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                Three steps.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">One modern codebase.</span>
              </h2>
            </div>
            
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">01 — Paste your code</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Drop your existing Python 2 code into the editor. No setup required.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">02 — Convert</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">ModernizePy analyzes your code and applies the changes needed for Python 3.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">03 — Review &amp; use</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Review the converted code, copy it, and continue building with Python 3.</p>
              </div>
            </div>

            <div>
              <Link href="/convert" className="inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-sm font-medium text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
                Learn more
              </Link>
            </div>
          </motion.div>

          {/* Right Column (3 Visual Metric Cards - Desktop) */}
          <motion.div variants={riseItem} className="relative h-[600px] w-full hidden lg:block">
            {/* Card 1 (Top Left Card) */}
            <div className="absolute top-4 left-0 w-80 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm z-20">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Migration Score</div>
              <div className="text-5xl font-black text-white mb-3">100%</div>
              <div className="flex gap-2 mb-6">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">Python 3</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium">Syntax Valid</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Lines converted:</span>
                  <span className="text-white font-medium">120</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Errors fixed:</span>
                  <span className="text-white font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Speed:</span>
                  <span className="text-white font-medium">0.4s</span>
                </div>
              </div>
            </div>

            {/* Card 2 (Middle Floating / Overlapping Card on Right) */}
            <div className="absolute top-28 right-0 w-80 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm z-30 transform translate-x-4">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Changes Made</div>
              <div className="text-2xl font-bold text-white mb-4">3 rules upgraded</div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded-lg border border-white/5">
                  <span className="text-red-400">print "x"</span>
                  <span className="text-neutral-500">➔</span>
                  <span className="text-emerald-400">print("x")</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded-lg border border-white/5">
                  <span className="text-red-400">xrange()</span>
                  <span className="text-neutral-500">➔</span>
                  <span className="text-emerald-400">range()</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded-lg border border-white/5">
                  <span className="text-red-400">/</span>
                  <span className="text-neutral-500">➔</span>
                  <span className="text-emerald-400">// <span className="text-neutral-600 font-sans">(integer division)</span></span>
                </div>
              </div>
            </div>

            {/* Card 3 (Bottom Card) */}
            <div className="absolute bottom-16 left-12 w-72 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</div>
                <div className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Instant
                </div>
              </div>
              <div className="text-xl font-bold text-white mb-4 leading-tight">Zero manual fixes needed</div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 text-xs font-medium">Clean Code</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">Ready to Run</span>
              </div>
            </div>
          </motion.div>
          
          {/* Mobile Right Column */}
          <motion.div variants={riseItem} className="flex flex-col gap-6 lg:hidden">
            {/* Card 1 */}
            <div className="w-full bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Migration Score</div>
              <div className="text-5xl font-black text-white mb-3">100%</div>
              <div className="flex gap-2 mb-6">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">Python 3</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium">Syntax Valid</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Lines converted:</span>
                  <span className="text-white font-medium">120</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Errors fixed:</span>
                  <span className="text-white font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Speed:</span>
                  <span className="text-white font-medium">0.4s</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Changes Made</div>
              <div className="text-2xl font-bold text-white mb-4">3 rules upgraded</div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded-lg border border-white/5">
                  <span className="text-red-400">print "x"</span>
                  <span className="text-neutral-500">➔</span>
                  <span className="text-emerald-400">print("x")</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded-lg border border-white/5">
                  <span className="text-red-400">xrange()</span>
                  <span className="text-neutral-500">➔</span>
                  <span className="text-emerald-400">range()</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded-lg border border-white/5">
                  <span className="text-red-400">/</span>
                  <span className="text-neutral-500">➔</span>
                  <span className="text-emerald-400">// <span className="text-neutral-600 font-sans">(int div)</span></span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</div>
                <div className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Instant
                </div>
              </div>
              <div className="text-xl font-bold text-white mb-4 leading-tight">Zero manual fixes needed</div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 text-xs font-medium">Clean Code</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">Ready to Run</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>



      
      <Footer />
    </div>
  );
}
