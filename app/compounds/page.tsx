"use client";

import { useState } from "react";
import compoundsData from "@/data/compound-words.json";

export default function CompoundsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentData = compoundsData.compounds[selectedIndex];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)]">
        <div className="container section">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gradient">
            双字词拓展
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl text-lg">
            从单字反义词到常用双字词，观察词语如何承载更丰富的语义内涵
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar List */}
          <div className="lg:col-span-4">
            <div className="card p-4 sticky top-24">
              <h3 className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4 px-2">
                选择词对 ({compoundsData.compounds.length})
              </h3>
              <div className="space-y-0.5 max-h-[60vh] overflow-y-auto pr-2">
                {compoundsData.compounds.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-md transition-all text-left ${
                      selectedIndex === index
                        ? "bg-white text-black font-medium"
                        : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="font-medium">
                      {item.baseWord}
                    </span>
                    <span className="mx-2 text-[var(--muted-foreground)]/50">/</span>
                    <span className="font-medium">
                      {item.opposite}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Comparison Display */}
            <div className="card p-8 mb-6 glow">
              <div className="flex items-center justify-center gap-12 pb-10 border-b border-[var(--border)]">
                <div className="text-center flex-1">
                  <div className="text-7xl md:text-8xl font-semibold text-gradient mb-3">
                    {currentData.baseWord}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">基础字</div>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-[var(--muted-foreground)]">VS</span>
                  </div>
                </div>

                <div className="text-center flex-1">
                  <div className="text-7xl md:text-8xl font-semibold text-gradient mb-3">
                    {currentData.opposite}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">对立字</div>
                </div>
              </div>

              {/* Compound words */}
              <div className="grid md:grid-cols-2 gap-10 pt-10">
                {/* Base word compounds */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                      <span className="text-white font-bold">{currentData.baseWord}</span>
                    </div>
                    <h4 className="font-semibold text-white">拓展词</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentData.words[0].compounds.map((word, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/5 border border-white/10 text-[var(--muted-foreground)] rounded-md text-sm hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Opposite word compounds */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                      <span className="text-white font-bold">{currentData.opposite}</span>
                    </div>
                    <h4 className="font-semibold text-white">拓展词</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentData.words[1].compounds.map((word, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/5 border border-white/10 text-[var(--muted-foreground)] rounded-md text-sm hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Semantic Analysis */}
            <div className="card p-6 mb-6">
              <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                语义倾向分析
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white font-semibold mb-2">{currentData.baseWord}</div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    拓展词多带有<span className="text-white">积极、向上、扩张</span>的语义倾向
                  </p>
                </div>
                <div className="p-5 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white font-semibold mb-2">{currentData.opposite}</div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    拓展词多带有<span className="text-white">消极、向下、收缩</span>的语义倾向
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                disabled={selectedIndex === 0}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                上一组
              </button>
              <span className="text-sm text-[var(--muted-foreground)] font-mono">
                {selectedIndex + 1} / {compoundsData.compounds.length}
              </span>
              <button
                onClick={() => setSelectedIndex(Math.min(compoundsData.compounds.length - 1, selectedIndex + 1))}
                disabled={selectedIndex === compoundsData.compounds.length - 1}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一组
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
