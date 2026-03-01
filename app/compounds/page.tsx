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
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">双字词拓展</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          从单字反义词到常用双字词，看词语如何承载更丰富的语义
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar - Word List */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              选择反义词对
            </h2>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {compoundsData.compounds.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedIndex === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
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
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
            {/* Opposite Words Header */}
            <div className="flex items-center justify-center gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {currentData.baseWord}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">基础字</div>
              </div>
              <div className="text-4xl text-gray-300 dark:text-gray-600">VS</div>
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 dark:text-red-400 mb-2">
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
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Opposite Word Compounds */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
                  「{currentData.opposite}」的拓展词
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentData.words[1].compounds.map((word, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Semantic Analysis */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                语义拓展观察
              </h3>
              <div className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                <p>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {currentData.baseWord}
                  </span>
                  字的拓展词往往带有{" "}
                  <span className="font-medium">积极、向上、扩张</span> 的语义倾向
                </p>
                <p>
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    {currentData.opposite}
                  </span>
                  字的拓展词往往带有{" "}
                  <span className="font-medium">消极、向下、收缩</span> 的语义倾向
                </p>
                <p className="text-gray-500 dark:text-gray-500 italic mt-4">
                  这种语义倾向反映了语言中的价值判断，但也存在例外和语境差异。
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              ← 上一组
            </button>
            <button
              onClick={() => setSelectedIndex(Math.min(compoundsData.compounds.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === compoundsData.compounds.length - 1}
              className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              下一组 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
