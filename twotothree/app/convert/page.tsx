"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ConvertPage() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!inputCode.trim()) {
      setError("Please enter some Python 2 code.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputCode("");

    try {
      const response = await fetch("http://localhost:8000/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: inputCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Conversion failed.");
      }

      const data = await response.json();
      setOutputCode(data.converted_code);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 font-sans selection:bg-cyan-500/30 flex flex-col p-6">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-gradient-to-b from-cyan-500/20 via-violet-600/20 to-transparent blur-[140px]" />
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header / Nav */}
        <div className="flex items-center justify-between mb-16 pt-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ModernizePy
          </Link>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Modernize your code.
          </h1>
          <p className="text-neutral-400">
            Paste Python 2. We'll handle the upgrade.
          </p>
        </div>

        {/* Workspace */}
        <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
          {/* Input Panel */}
          <div className="group flex-1 flex flex-col rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-cyan-950/20 overflow-hidden transition-all duration-500 hover:border-white/[0.12]">
            <div className="h-12 border-b border-white/[0.08] bg-transparent flex items-center px-4 justify-between">
              <span className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Python 2
              </span>
              <button
                onClick={() => setInputCode("")}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your Python 2 code here..."
              className="flex-1 w-full bg-transparent p-6 text-sm font-mono text-zinc-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 resize-none placeholder:text-zinc-700 leading-relaxed border border-transparent"
              spellCheck="false"
            />
          </div>

          {/* Convert Button */}
          <div className="flex flex-col justify-center items-center py-4 lg:py-0">
            <button
              onClick={handleConvert}
              disabled={isLoading || !inputCode.trim()}
              className="relative flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-medium shadow-[0_0_20px_rgba(6,182,212,0.35)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden group"
              aria-label="Convert Code"
            >
              {isLoading ? (
                <>
                  <div className="absolute inset-0 bg-cyan-500 animate-[spin_3s_linear_infinite]" />
                  <div className="absolute inset-0.5 bg-[#07090e] rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                </>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="group flex-1 flex flex-col rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-cyan-950/20 overflow-hidden transition-all duration-500 hover:border-white/[0.12]">
            <div className="h-12 border-b border-white/[0.08] bg-transparent flex items-center px-4 justify-between">
              <span className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Python 3
              </span>
              {outputCode && (
                <button
                  onClick={() => navigator.clipboard.writeText(outputCode)}
                  className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] text-zinc-300 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  Copy
                </button>
              )}
            </div>
            <div className="flex-1 relative">
              {isLoading && !outputCode && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-md z-10 overflow-hidden rounded-b-2xl">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    <div className="w-[150px] h-[150px] bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500 rounded-full blur-[50px] animate-[spin_4s_linear_infinite]" />
                  </div>
                  <div className="relative z-10 flex gap-2">
                    <div className="w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-full animate-bounce" />
                  </div>
                  <p className="relative z-10 text-sm text-white/90 font-medium tracking-wide">Upgrading your code...</p>
                </div>
              )}
              {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/20 backdrop-blur-md z-10 p-6 text-center">
                   <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                   </div>
                   <p className="text-sm text-red-400 font-medium">{error}</p>
                   <button 
                     onClick={handleConvert}
                     className="px-4 py-2 mt-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors border border-white/10"
                   >
                     Try again
                   </button>
                </div>
              ) : (
                <textarea
                  readOnly
                  value={outputCode}
                  placeholder={isLoading ? "" : "Your modernized code will appear here..."}
                  className="w-full h-full bg-transparent p-6 text-sm font-mono text-cyan-200/90 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 resize-none placeholder:text-zinc-700 leading-relaxed border border-transparent"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
