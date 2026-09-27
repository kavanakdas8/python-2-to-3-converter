"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

export default function Home() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  // Line counting logic
  const inputLineCount = inputCode.split("\n").length;
  const outputLineCount = outputCode.split("\n").length;

  const handleConvert = async () => {
    if (!inputCode.trim()) {
      setError("Please enter some Python 2 code.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setExecutionTime(null);
    const startTime = performance.now();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: inputCode }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Conversion failed with status ${response.status}.`);
      }

      const data = await response.json();
      setOutputCode(data.converted_code || "");
      setExecutionTime(Math.round(performance.now() - startTime));
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      const newValue = inputCode.substring(0, start) + "    " + inputCode.substring(end);
      setInputCode(newValue);
      
      // Setup focus and cursor position after React re-renders
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = inputRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleConvert();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [inputCode, handleConvert]);

  const loadSample = () => {
    setInputCode(`import urllib2\n\nprint "Fetching data..."\nresponse = urllib2.urlopen('http://example.com')\nhtml = response.read()\n\nfor i in xrange(5):\n    try:\n        print "Item", i\n    except Exception, e:\n        print "Error:", e`);
    setOutputCode("");
    setError(null);
    setExecutionTime(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputCode) return;
    const blob = new Blob([outputCode], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "migrated_py3.py";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderLineNumbers = (count: number) => (
    <div className="flex flex-col text-right pr-4 py-4 text-zinc-500 select-none bg-zinc-950 font-mono text-sm min-w-[3rem] border-r border-zinc-800">
      {Array.from({ length: count }, (_, i) => (
        <div key={i + 1} className="leading-6 h-6">{i + 1}</div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-300 font-sans overflow-hidden">
      {/* Top Toolbar */}
      <header className="flex-none h-12 flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            PyMigrate
          </h1>
          <div className="h-4 w-px bg-zinc-700" />
          <div className="flex items-center gap-2 text-xs font-mono px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            gemini-3.6-flash
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadSample}
            className="text-xs px-3 py-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-colors"
          >
            Load Sample
          </button>
          <button
            onClick={handleConvert}
            disabled={isLoading || !inputCode.trim()}
            className="flex items-center gap-2 text-xs font-medium px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
            Migrate Code <span className="opacity-70 font-normal hidden sm:inline">(Ctrl + Enter)</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Pane - Input */}
        <section className="flex-1 flex flex-col min-w-0 border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="flex-none h-10 flex items-center justify-between px-3 bg-zinc-900 border-b border-zinc-800">
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-t-sm border-t border-x border-zinc-700/50 -mb-[1px] text-xs text-zinc-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-yellow-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                legacy.py <span className="text-zinc-500 ml-1">(Python 2.7)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-mono">{inputLineCount} lines</span>
              <button
                onClick={() => setInputCode("")}
                className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                Clear
              </button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden bg-zinc-950">
            {renderLineNumbers(inputLineCount)}
            <textarea
              ref={inputRef}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`# Paste your Python 2 code here...\nprint 'Hello World'\nfor i in xrange(10):\n    pass`}
              className="flex-1 w-full bg-transparent py-4 pl-4 pr-4 text-sm font-mono text-zinc-200 focus:outline-none resize-none leading-6 whitespace-pre"
              spellCheck="false"
            />
          </div>
        </section>

        {/* Right Pane - Output */}
        <section className="flex-1 flex flex-col min-w-0 bg-zinc-950">
          <div className="flex-none h-10 flex items-center justify-between px-3 bg-zinc-900 border-b border-zinc-800">
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-t-sm border-t border-x border-zinc-700/50 -mb-[1px] text-xs text-zinc-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                modernized.py <span className="text-zinc-500 ml-1">(Python 3.12)</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-mono">{outputCode ? outputLineCount : 0} lines</span>
              <div className="flex items-center gap-1 border-l border-zinc-700 pl-3 ml-1">
                <button
                  onClick={handleCopy}
                  disabled={!outputCode}
                  className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed group relative"
                  title="Copy Code"
                >
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  )}
                  {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-xs text-zinc-200 rounded whitespace-nowrap">Copied!</span>}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!outputCode}
                  className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Download .py"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden bg-zinc-950 relative">
             {isLoading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm z-10">
                 <div className="flex flex-col items-center gap-3">
                   <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                   <span className="text-xs text-emerald-400 font-mono animate-pulse">Analyzing and migrating AST...</span>
                 </div>
               </div>
             )}
            
            {outputCode ? (
              <>
                {renderLineNumbers(outputLineCount)}
                <textarea
                  ref={outputRef}
                  value={outputCode}
                  readOnly
                  className="flex-1 w-full bg-transparent py-4 pl-4 pr-4 text-sm font-mono text-zinc-300 focus:outline-none resize-none leading-6 whitespace-pre"
                  spellCheck="false"
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-600 text-sm font-mono">
                {error ? "Awaiting input correction..." : "Ready for migration"}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer / Status Bar */}
      <footer className="flex-none h-8 flex items-center justify-between px-3 border-t border-zinc-800 bg-zinc-900 text-xs font-mono">
        <div className="flex items-center gap-4">
          {error ? (
            <div className="flex items-center gap-1.5 text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              <span>{error}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <span>System Ready</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-zinc-500">
          {executionTime !== null && (
            <span>Execution: {executionTime}ms</span>
          )}
          <span>UTF-8</span>
          <span>Python Language Server v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
