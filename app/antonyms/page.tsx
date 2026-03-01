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

    if (selectedCategory !== "all") {
      result = result.filter(cat => cat.id === selectedCategory);
    }

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

  const totalCount = categories.reduce((sum, cat) => sum + cat.pairs.length, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              反义词库
            </h1>
            <p className="text-[var(--text-secondary)]">
              {totalCount} 对基础反义词，按空间、状态、程度、逻辑四大维度分类
            </p>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="border-b border-[var(--border-color)] sticky top-16 z-40 bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索反义词..."
                className="input w-full pl-10"
              />
            </div>

            {/* 分类筛选 */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`tag transition-all ${
                  selectedCategory === "all"
                    ? "tag-blue"
                    : "tag-gray hover:bg-[var(--bg-tertiary)]"
                }`}
              >
                全部 ({totalCount})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`tag transition-all ${
                    selectedCategory === cat.id
                      ? "tag-blue"
                      : "tag-gray hover:bg-[var(--bg-tertiary)]"
                  }`}
                >
                  {cat.name} ({cat.pairs.length})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 反义词列表 */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {filteredData.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-[var(--text-secondary)]">没有找到匹配的反义词</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredData.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    {category.name}
                  </h2>
                  <span className="text-sm text-[var(--text-tertiary)]">
                    {category.pairs.length} 对
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {category.pairs.map((pair, index) => (
                    <div
                      key={`${category.id}-${index}`}
                      className="card card-hover p-4 group"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform inline-block">
                            {pair.word1}
                          </span>
                        </div>
                        <div className="text-[var(--text-tertiary)] flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </div>
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform inline-block">
                            {pair.word2}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[var(--border-color)] text-center">
                        <span className="text-xs text-[var(--text-tertiary)] font-mono">
                          {pair.pinyin}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
