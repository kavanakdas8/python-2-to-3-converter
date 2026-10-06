"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy } from "lucide-react";

const DEMO_CODE = `print "Welcome to Python 2"

for i in xrange(5):
    result = i / 2
    print "Result is:", result
`;

export default function ConvertPage() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    if (!inputCode.trim()) {
      setError("Please enter some Python 2 code.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputCode("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: inputCode }),
      });

      if (!response.ok) {
        if (response.status === 503) {
           throw new Error("Service unavailable or rate limited. Please try again later.");
        }
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

  const handleCopy = async () => {
    if (!outputCode) return;
    await navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadDemo = () => {
    setInputCode(DEMO_CODE);
    setOutputCode("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 font-sans flex flex-col p-6 relative">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-gradient-to-tr from-cyan-500/15 via-violet-600/15 to-transparent blur-[140px]" />
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col min-h-screen pb-12">
        {/* Header / Nav */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ModernizePy
          </Link>
          

        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Modernize your code.
          </h1>
          <p className="text-slate-400">
            Paste Python 2. We'll handle the upgrade.
          </p>
        </div>
        
        {/* Error Banner */}
        {error && (
           <div className="mb-6 bg-rose-950/40 border border-rose-500/30 text-rose-200 backdrop-blur-md p-4 rounded-xl text-sm flex items-center justify-between shadow-2xl shadow-rose-900/20">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                 </div>
                 <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-300 p-1 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
           </div>
        )}

        {/* Workspace */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
          {/* Input Panel */}
          <div className="group flex-1 flex flex-col rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-cyan-950/20 overflow-hidden transition-all duration-200 focus-within:border-cyan-500/40 focus-within:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="bg-white/[0.02] border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></span>
                Python 2 Input
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={loadDemo}
                  className="bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] px-3.5 py-1.5 rounded-lg text-xs transition-all"
                >
                  Load Demo
                </button>
                <button
                  onClick={() => setInputCode("")}
                  className="bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] px-3.5 py-1.5 rounded-lg text-xs transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              disabled={isLoading}
              placeholder="Paste your Python 2 code here..."
              className="flex-1 w-full h-full bg-transparent p-6 text-sm font-mono text-slate-200 placeholder:text-slate-600 selection:bg-cyan-500/30 focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Convert Button Area */}
          <div className="flex flex-col justify-center items-center py-2 lg:py-0">
            <button
              onClick={handleConvert}
              disabled={isLoading || !inputCode.trim()}
              className="bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-semibold px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center min-w-[140px]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-neutral-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Modernizing...
                </span>
              ) : (
                "Convert Code"
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="group flex-1 flex flex-col rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-cyan-950/20 overflow-hidden transition-all duration-200 focus-within:border-cyan-500/40 focus-within:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="bg-white/[0.02] border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
                Python 3 Output
              </span>
              <button
                onClick={handleCopy}
                disabled={!outputCode}
                className="bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] px-3.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            
            <textarea
              readOnly
              value={outputCode}
              placeholder={isLoading ? "Modernizing your code..." : "Your modernized code will appear here..."}
              className="flex-1 w-full h-full bg-transparent p-6 text-sm font-mono text-cyan-200/90 selection:bg-violet-500/30 focus:outline-none resize-none leading-relaxed"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
