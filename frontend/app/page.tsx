"use client";

import { useState } from "react";

export default function Home() {
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
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-purple-500/30 flex flex-col">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
              PyMigrate
            </h1>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Documentation
          </a>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-8">
        <div className="text-center mb-10 mt-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Modernize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Python</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Instantly translate legacy Python 2 scripts into clean, idiomatic Python 3 using advanced AI.
          </p>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[500px]">
          {/* Input Section */}
          <div className="flex-1 flex flex-col rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20">
            <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-4 justify-between">
              <span className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Python 2 (Legacy)
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
              placeholder="# Paste your Python 2 code here...\nprint 'Hello World'\nfor i in xrange(10):\n    pass"
              className="flex-1 w-full bg-transparent p-6 text-sm font-mono text-zinc-200 focus:outline-none resize-none placeholder:text-zinc-700"
              spellCheck="false"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col justify-center items-center gap-4 py-4 lg:py-0">
            <button
              onClick={handleConvert}
              disabled={isLoading || !inputCode.trim()}
              className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Convert Code"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 group-hover:translate-x-0.5 transition-transform"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="flex-1 flex flex-col rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20">
            <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-4 justify-between">
              <span className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Python 3 (Modern)
              </span>
              {outputCode && (
                <button
                  onClick={() => navigator.clipboard.writeText(outputCode)}
                  className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
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
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/20 backdrop-blur-sm z-10">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                  </div>
                  <p className="text-sm text-purple-300/80 font-medium animate-pulse">Upgrading your code...</p>
                </div>
              )}
              {error ? (
                <div className="p-6 text-sm text-red-400 font-mono flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" x2="12" y1="8" y2="12"/>
                    <line x1="12" x2="12.01" y1="16" y2="16"/>
                  </svg>
                  {error}
                </div>
              ) : (
                <textarea
                  readOnly
                  value={outputCode}
                  placeholder={isLoading ? "" : "Converted code will appear here..."}
                  className="w-full h-full bg-transparent p-6 text-sm font-mono text-zinc-200 focus:outline-none resize-none placeholder:text-zinc-700"
                />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="relative z-10 py-6 text-center text-sm text-zinc-600 border-t border-white/5 mt-8">
        <p>Powered by AI &bull; Python 2 to 3 Migration Tool</p>
      </footer>
    </div>
  );
}
