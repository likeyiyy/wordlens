"use client";

import { useState } from "react";
import compoundsData from "@/data/compound-words.json";

export default function CompoundsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentData = compoundsData.compounds[selectedIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-secondary">双字词拓展</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          从单字反义词到常用双字词，看词语如何承载更丰富的语义
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar - Word List */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4 gradient-text-secondary px-2">
              选择反义词对
            </h2>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {compoundsData.compounds.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    selectedIndex === index
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg glow-secondary"
                      : "glass-card text-gray-800 dark:text-gray-200 hover:bg-white/30"
                  }`}
                >
                  <span className="text-xl font-medium">
                    {item.baseWord} / {item.opposite}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-8 animate-fade-in-up">
            {/* Opposite Words Header */}
            <div className="flex items-center justify-center gap-8 mb-10 pb-8 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <div className="text-7xl font-bold gradient-text mb-2">
                  {currentData.baseWord}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">基础字</div>
              </div>
              <div className="text-4xl text-gray-300 dark:text-gray-600 font-light">VS</div>
              <div className="text-center">
                <div className="text-7xl font-bold gradient-text-secondary mb-2">
                  {currentData.opposite}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">对立字</div>
              </div>
            </div>

            {/* Compound Words */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Base Word Compounds */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  「{currentData.baseWord}」的拓展词
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentData.words[0].compounds.map((word, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 text-blue-700 dark:text-blue-300 rounded-full text-sm border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform cursor-default"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Opposite Word Compounds */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-orange-500 dark:text-orange-400">
                  「{currentData.opposite}」的拓展词
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentData.words[1].compounds.map((word, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20 text-orange-700 dark:text-orange-300 rounded-full text-sm border border-orange-200 dark:border-orange-800 hover:scale-105 transition-transform cursor-default"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Semantic Analysis */}
            <div className="mt-10 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 gradient-text">
                语义拓展观察
              </h3>
              <div className="space-y-3">
                <div className="glass-card rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {currentData.baseWord}
                    </span>
                    <span className="mx-2">·</span>
                    字的拓展词往往带有{" "}
                    <span className="text-blue-600 dark:text-blue-400">积极、向上、扩张</span> 的语义倾向
                  </p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="text-orange-500 dark:text-orange-400 font-bold">
                      {currentData.opposite}
                    </span>
                    <span className="mx-2">·</span>
                    字的拓展词往往带有{" "}
                    <span className="text-orange-500 dark:text-orange-400">消极、向下、收缩</span> 的语义倾向
                  </p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-4 italic">
                这种语义倾向反映了语言中的价值判断，但也存在例外和语境差异。
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="px-6 py-3 rounded-xl glass-card hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              上一组
            </button>
            <button
              onClick={() => setSelectedIndex(Math.min(compoundsData.compounds.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === compoundsData.compounds.length - 1}
              className="px-6 py-3 rounded-xl glass-card hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              下一组
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
