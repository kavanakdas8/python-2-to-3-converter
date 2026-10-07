"use client";

import { ArrowUpRight, Zap, GitCommit, Search } from "lucide-react";

export function Features() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center w-full px-6 py-24 sm:py-32">
      {/* Eyebrow */}
      <div className="text-center mb-16 max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
          Everything you need to modernize Python
        </h2>
        
        {/* Supporting text */}
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Turn legacy Python 2 code into clean, modern Python 3 without the tedious manual rewriting.
        </p>
      </div>

      {/* 3-Column Unified Container */}
      <div className="max-w-6xl w-full mx-auto relative">
        {/* Outer border & subtle background */}
        <div className="absolute inset-0 bg-white/[0.01] border border-white/[0.06] rounded-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          
          {/* Feature 01 */}
          <div className="group flex-1 p-8 sm:p-10 transition-colors duration-500 hover:bg-white/[0.02] rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl relative cursor-default">
            
            <div className="mb-14">
              <h3 className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors duration-500 mb-3">
                Instant Conversion
              </h3>
              <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-500 leading-relaxed">
                Paste your legacy Python 2 code and convert it into modern Python 3 in seconds.
              </p>
            </div>
            
          </div>

          {/* Feature 02 */}
          <div className="group flex-1 p-8 sm:p-10 transition-colors duration-500 hover:bg-white/[0.02] relative cursor-default">
            
            <div className="mb-14">
              <h3 className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors duration-500 mb-3">
                Smart Transformations
              </h3>
              <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-500 leading-relaxed">
                Automatically modernize outdated syntax and common Python 2 patterns while preserving your original code structure.
              </p>
            </div>
            
          </div>

          {/* Feature 03 */}
          <div className="group flex-1 p-8 sm:p-10 transition-colors duration-500 hover:bg-white/[0.02] rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl relative cursor-default">
            
            <div className="mb-14">
              <h3 className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors duration-500 mb-3">
                Change Visibility
              </h3>
              <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-500 leading-relaxed">
                See exactly what ModernizePy changed so you can review every transformation with confidence.
              </p>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
