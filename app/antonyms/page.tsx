"use client";

import { useState, useMemo } from "react";
import antonymsData from "@/data/antonyms.json";

const categories = antonymsData.categories;

export default function AntonymsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 获取所有唯一的字用于搜索提示
  const allChars = useMemo(() => {
    const chars = new Set<string>();
    categories.forEach(cat => {
      cat.pairs.forEach(pair => {
        chars.add(pair.word1);
        chars.add(pair.word2);
      });
    });
    return Array.from(chars).sort();
  }, []);

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
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">反义词库</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          探索中文中最基础的认知框架
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索汉字或拼音..."
            className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <svg
            className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
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
          className={`px-5 py-2 rounded-full transition ${
            selectedCategory === "all"
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          全部 ({categories.reduce((sum, cat) => sum + cat.pairs.length, 0)})
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2 rounded-full transition ${
              selectedCategory === category.id
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {category.name} ({category.pairs.length})
          </button>
        ))}
      </div>

      {/* Antonym Cards */}
      <div className="space-y-10">
        {filteredData.map((category) => (
          <div key={category.id}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {category.name}
              <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                {category.description}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.pairs.map((pair, index) => (
                <div
                  key={`${category.id}-${index}`}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-md transition bg-white dark:bg-gray-900"
                >
                  <div className="text-center flex-1">
                    <span className="text-2xl font-medium text-blue-600 dark:text-blue-400">
                      {pair.word1}
                    </span>
                  </div>
                  <div className="px-3 text-gray-400">—</div>
                  <div className="text-center flex-1">
                    <span className="text-2xl font-medium text-red-600 dark:text-red-400">
                      {pair.word2}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredData.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            没有找到匹配的反义词
          </p>
        </div>
      )}
    </div>
  );
}
