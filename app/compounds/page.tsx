"use client";

import { useState } from "react";
import compoundsData from "@/data/compound-words.json";

export default function CompoundsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentData = compoundsData.compounds[selectedIndex];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            双字词拓展
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            从单字反义词到常用双字词，观察词语如何承载更丰富的语义内涵
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* 侧边栏列表 */}
          <div className="lg:col-span-4">
            <div className="card p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4 px-2">
                选择词对 ({compoundsData.compounds.length})
              </h3>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
                {compoundsData.compounds.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedIndex === index
                        ? "bg-[var(--accent)] text-white"
                        : "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                    }`}
                  >
                    <span className="font-medium">
                      {item.baseWord}
                    </span>
                    <span className="mx-2 text-[var(--text-tertiary)]">/</span>
                    <span className="font-medium">
                      {item.opposite}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-8">
            {/* 对比展示 */}
            <div className="card p-8 mb-6">
              <div className="flex items-center justify-center gap-8 pb-8 border-b border-[var(--border-color)]">
                <div className="text-center flex-1">
                  <div className="text-6xl md:text-7xl font-bold text-blue-400 mb-2">
                    {currentData.baseWord}
                  </div>
                  <div className="text-sm text-[var(--text-tertiary)]">基础字</div>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                    <span className="text-lg font-bold text-[var(--text-tertiary)]">VS</span>
                  </div>
                </div>

                <div className="text-center flex-1">
                  <div className="text-6xl md:text-7xl font-bold text-orange-400 mb-2">
                    {currentData.opposite}
                  </div>
                  <div className="text-sm text-[var(--text-tertiary)]">对立字</div>
                </div>
              </div>

              {/* 拓展词 */}
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                {/* 基础字拓展 */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold">{currentData.baseWord}</span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)]">拓展词</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentData.words[0].compounds.map((word, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-[var(--bg-secondary)] text-blue-300 rounded-lg text-sm border border-blue-500/20"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 对立字拓展 */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-400 font-bold">{currentData.opposite}</span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)]">拓展词</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentData.words[1].compounds.map((word, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-[var(--bg-secondary)] text-orange-300 rounded-lg text-sm border border-orange-500/20"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 语义分析 */}
            <div className="card p-6 mb-6">
              <h4 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                语义倾向分析
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                  <div className="text-blue-400 font-semibold mb-2">{currentData.baseWord}</div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    拓展词多带有<span className="text-blue-400">积极、向上、扩张</span>的语义倾向
                  </p>
                </div>
                <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                  <div className="text-orange-400 font-semibold mb-2">{currentData.opposite}</div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    拓展词多带有<span className="text-orange-400">消极、向下、收缩</span>的语义倾向
                  </p>
                </div>
              </div>
            </div>

            {/* 导航按钮 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                disabled={selectedIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一组
              </button>
              <span className="text-sm text-[var(--text-tertiary)]">
                {selectedIndex + 1} / {compoundsData.compounds.length}
              </span>
              <button
                onClick={() => setSelectedIndex(Math.min(compoundsData.compounds.length - 1, selectedIndex + 1))}
                disabled={selectedIndex === compoundsData.compounds.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                下一组
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
