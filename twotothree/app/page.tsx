"use client";

import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { LandingNav } from "@/components/landing-nav";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

const faqs = [
  {
    id: "item-1",
    question: "What does ModernizePy do?",
    answer: "ModernizePy helps convert Python 2 code into Python 3-compatible code."
  },
  {
    id: "item-2",
    question: "Do I need to install anything?",
    answer: "No. Paste your code into the workspace and start the conversion."
  },
  {
    id: "item-3",
    question: "Can I edit the converted code?",
    answer: "Yes. The converted output is provided so you can review, modify, and use it in your project."
  },
  {
    id: "item-4",
    question: "Does ModernizePy support large files?",
    answer: "ModernizePy is designed for code migration, but very large or complex projects may require additional manual review after conversion."
  },
  {
    id: "item-5",
    question: "Is the conversion automatic?",
    answer: "The conversion is automated, but generated code should always be reviewed before being used in production."
  }
];

export default function Home() {

  return (
    <div className="min-h-screen bg-[#050608] text-zinc-100 font-sans selection:bg-emerald-500/30 flex flex-col">
      <LandingNav />
      <Hero />

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 flex flex-col max-w-7xl mx-auto w-full px-6 py-24 border-t border-white/5">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 text-white">
            Three steps.
          </h2>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            One modern codebase.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">01 — Paste your code</h3>
            <p className="text-neutral-400 leading-relaxed">Drop your existing Python 2 code into the editor. No setup required.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">02 — Convert</h3>
            <p className="text-neutral-400 leading-relaxed">ModernizePy analyzes your code and applies the changes needed for Python 3.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">03 — Review &amp; use</h3>
            <p className="text-neutral-400 leading-relaxed">Review the converted code, copy it, and continue building with Python 3.</p>
          </div>
        </div>
      </section>

      {/* Why ModernizePy */}
      <section className="relative z-10 flex flex-col max-w-7xl mx-auto w-full px-6 py-24 border-t border-white/5">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
            Legacy code shouldn't slow you down.
          </h2>
          <p className="text-lg text-neutral-400">
            Python 2 is old. Your code doesn't have to stay that way.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3">Less manual work</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Skip repetitive syntax changes and focus on the parts of your code that actually matter.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3">Clear conversions</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">See your original and modernized code side by side.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3">Built for developers</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">A focused workspace with nothing getting in the way of the migration.</p>
          </div>
        </div>
      </section>

      {/* Conversion Section Visual */}
      <section className="relative z-10 flex flex-col max-w-7xl mx-auto w-full px-6 py-24 border-t border-white/5 text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 text-neutral-500">
            From legacy.
          </h2>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            To modern.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="text-left space-y-2 p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl w-full md:w-80">
            <h3 className="text-xl font-bold text-white mb-4">Python 2</h3>
            <p className="text-neutral-400">Old syntax.</p>
            <p className="text-neutral-400">Old dependencies.</p>
            <p className="text-neutral-400">Old assumptions.</p>
          </div>
          <div className="text-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 md:rotate-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
          <div className="text-left space-y-2 p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl w-full md:w-80 shadow-[0_0_30px_rgba(52,211,153,0.1)]">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4">Python 3</h3>
            <p className="text-emerald-100/70">Modern syntax.</p>
            <p className="text-emerald-100/70">Cleaner code.</p>
            <p className="text-emerald-100/70">Ready for what comes next.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="relative z-10 w-full border-t border-white/5 bg-[#050608]">
        <Faq 
          badge="Frequently asked questions"
          title="Questions before you convert."
          faqs={faqs}
        />
      </div>


      
      <Footer />
    </div>
  );
}
