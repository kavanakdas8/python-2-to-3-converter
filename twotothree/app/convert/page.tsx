"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, ArrowRight } from "lucide-react";
import { LogoIcon } from "@/components/hero/logo-icon";

const DEMO_CODE = `print "Welcome to Python 2"

for i in xrange(5):
    result = i / 2
    print "Result is:", result
`;

function detectChanges(oldCode: string, newCode: string) {
  const changes = [];
  if (oldCode.match(/print\s+["'].*["']/) && newCode.includes('print(')) {
    changes.push({ name: "print statement", old: "Python 2", new: "Python 3" });
  }
  if (oldCode.includes("xrange(") && newCode.includes("range(")) {
    changes.push({ name: "xrange()", old: "xrange()", new: "range()" });
  }
  if (oldCode.includes("raw_input(") && newCode.includes("input(")) {
    changes.push({ name: "raw_input()", old: "raw_input()", new: "input()" });
  }
  if (oldCode.includes(".iteritems()") && newCode.includes(".items()")) {
    changes.push({ name: "dict iteration", old: ".iteritems()", new: ".items()" });
  }
  if (oldCode.match(/\s+\/\s+/) && newCode.match(/\s+\/\/\s+/)) {
    changes.push({ name: "integer division", old: "/", new: "//" });
  }
  return changes;
}

export default function ConvertPage() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [changes, setChanges] = useState<{name: string, old: string, new: string}[]>([]);

  const handleConvert = async () => {
    if (!inputCode.trim()) {
      setError("Please enter some Python 2 code.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputCode("");
    setChanges([]);

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
      setChanges(detectChanges(inputCode, data.converted_code));
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
    setChanges([]);
  };

  const clearInput = () => {
    setInputCode("");
    setOutputCode("");
    setError(null);
    setChanges([]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans flex flex-col selection:bg-white/20 relative">
      {/* Subtle Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <video
          src="/mixkit-snow-overlay-of-snow-falling-softly-8468-hd-ready.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.03] motion-reduce:hidden"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center gap-6 px-6 py-4 border-b border-white/[0.06] bg-[#050505]/90 backdrop-blur-md">
        
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>

        <div className="flex items-center gap-3 border-l border-white/[0.08] pl-6">
          <Link href="/" className="flex items-center gap-2 group">
            <LogoIcon className="w-6 h-6 text-white group-hover:text-neutral-300 transition-colors" />
            <span className="text-sm font-bold tracking-tight text-white hidden sm:block">
              ModernizePy
            </span>
          </Link>
          <span className="text-neutral-600 hidden sm:inline">/</span>
          <span className="text-sm text-neutral-400 font-medium">Converter</span>
        </div>

      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col max-w-[1400px] mx-auto w-full p-6">
        
        {/* Header */}
        <div className="mb-8 pt-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono mb-3 block">
            Python Migration
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-tight">
            Modernize your code.
          </h1>
          <p className="text-sm text-neutral-400">
            Paste your Python 2 code and we'll handle the upgrade.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-500/5 border border-red-500/20 text-red-400 p-3 rounded-md text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400/70 hover:text-red-400 transition-colors">
              ✕
            </button>
          </div>
        )}

        {/* Workspace */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 flex-1 min-h-[500px]">
          
          {/* Python 2 Editor */}
          <div className="flex-1 w-full flex flex-col min-w-0 border border-white/[0.08] rounded-xl overflow-hidden bg-[#0A0A0A]">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04] bg-[#090909]">
              <span className="text-[11px] font-mono tracking-wide text-neutral-400">PYTHON 2</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={loadDemo}
                  className="text-[10px] font-mono uppercase px-2 py-1 text-neutral-500 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] rounded transition-all"
                >
                  Load demo
                </button>
                <button
                  onClick={clearInput}
                  className="text-[10px] font-mono uppercase px-2 py-1 text-neutral-500 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] rounded transition-all"
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
              className="flex-1 w-full p-5 text-[13px] font-mono text-neutral-300 bg-transparent placeholder:text-neutral-700 focus:outline-none resize-none leading-relaxed whitespace-pre"
              spellCheck="false"
            />
          </div>

          {/* Convert Action */}
          <div className="flex items-center justify-center shrink-0">
            <button
              onClick={handleConvert}
              disabled={isLoading || !inputCode.trim()}
              className="group bg-white hover:bg-neutral-200 text-black font-medium text-sm px-5 py-3 lg:px-4 lg:py-2.5 rounded-md shadow-2xl flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
            >
              {isLoading ? (
                <span className="text-neutral-600">Converting...</span>
              ) : outputCode ? (
                <>Converted <Check className="w-3.5 h-3.5" /></>
              ) : (
                <>Convert <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></>
              )}
            </button>
          </div>

          {/* Python 3 Editor */}
          <div className="flex-1 w-full flex flex-col min-w-0 border border-white/[0.08] rounded-xl overflow-hidden bg-[#070707]">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04] bg-[#070707]">
              <span className="text-[11px] font-mono tracking-wide text-neutral-400">PYTHON 3</span>
              <button
                onClick={handleCopy}
                disabled={!outputCode}
                className="text-[10px] font-mono uppercase px-2 py-1 text-neutral-500 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy code
                  </>
                )}
              </button>
            </div>
            <textarea
              readOnly
              value={outputCode}
              placeholder={isLoading ? "Converting..." : "Your modernized code will appear here..."}
              className="flex-1 w-full p-5 text-[13px] font-mono text-white bg-transparent placeholder:text-neutral-700 focus:outline-none resize-none leading-relaxed whitespace-pre"
              spellCheck="false"
            />
          </div>

        </div>

        {/* Status / Changes Section */}
        {outputCode && (
          <div className="mt-8 flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
              <Check className="w-4 h-4 text-neutral-400" />
              <span>Conversion complete</span>
              {changes.length > 0 && <span className="text-neutral-600">· {changes.length} detected changes</span>}
            </div>

            {changes.length > 0 && (
              <div className="max-w-md border border-white/[0.06] rounded-xl p-5 bg-white/[0.01]">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.1em] text-neutral-500 mb-4">Changes made</h3>
                <div className="flex flex-col gap-4">
                  {changes.map((c, i) => (
                    <div key={i} className="flex flex-col gap-1.5 text-sm">
                      <span className="text-white font-medium text-sm">{c.name}</span>
                      <div className="flex items-center gap-2 text-neutral-500 font-mono text-[11px]">
                        <span>{c.old}</span>
                        <ArrowRight className="w-3 h-3 text-neutral-600" />
                        <span className="text-neutral-300">{c.new}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
