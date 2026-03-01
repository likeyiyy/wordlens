"use client";

import { useState, useMemo } from "react";
import antonymsData from "@/data/antonyms.json";

const categories = antonymsData.categories;

export default function AntonymsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 筛选后的数据
  const filteredData = useMemo(() => {
    let result = categories;

    // 按分类筛选
    if (selectedCategory !== "all") {
      result = result.filter(cat => cat.id === selectedCategory);
    }

    // 按搜索词筛选
    if (searchQuery.trim()) {
      result = result.map(cat => ({
        ...cat,
        pairs: cat.pairs.filter(pair =>
          pair.word1.includes(searchQuery) ||
          pair.word2.includes(searchQuery) ||
          pair.pinyin.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.pairs.length > 0);
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">反义词库</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          探索中文中最基础的认知框架
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索汉字或拼音..."
            className="w-full px-5 py-4 pl-12 glass-card rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white placeholder-gray-400"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
            selectedCategory === "all"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg glow"
              : "glass-card text-gray-700 dark:text-gray-300 hover:bg-white/30"
          }`}
        >
          全部 ({categories.reduce((sum, cat) => sum + cat.pairs.length, 0)})
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg glow"
                : "glass-card text-gray-700 dark:text-gray-300 hover:bg-white/30"
            }`}
          >
            {category.name} ({category.pairs.length})
          </button>
        ))}
      </div>

      {/* Antonym Cards */}
      <div className="space-y-10">
        {filteredData.map((category) => (
          <div key={category.id} className="animate-fade-in-up">
            <h2 className="text-2xl font-semibold mb-6 gradient-text">
              {category.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 -mt-4">
              {category.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.pairs.map((pair, index) => (
                <div
                  key={`${category.id}-${index}`}
                  className="glass-card rounded-xl p-5 hover-lift group cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 text-center">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform inline-block">
                        {pair.word1}
                      </span>
                    </div>
                    <div className="text-gray-300 dark:text-gray-600 text-xl">—</div>
                    <div className="flex-1 text-center">
                      <span className="text-3xl font-bold text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform inline-block">
                        {pair.word2}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
                    {pair.pinyin}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredData.length === 0 && (
        <div className="text-center py-20 glass-card rounded-2xl">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            没有找到匹配的反义词
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            试试其他关键词
          </p>
        </div>
      )}
    </div>
  );
}
