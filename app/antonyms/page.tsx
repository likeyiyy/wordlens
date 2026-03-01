"use client";

import { useState, useMemo } from "react";
import antonymsData from "@/data/antonyms-merged.json";

// 反义词分类定义
const CATEGORIES = [
  { id: "spatial", name: "方位类", icon: "📍", description: "位置、方向、空间相关", color: "from-blue-500/20 to-cyan-500/20" },
  { id: "state", name: "状态类", icon: "🔄", description: "事物状态、属性相关", color: "from-purple-500/20 to-pink-500/20" },
  { id: "degree", name: "程度类", icon: "📊", description: "程度、数量、规模相关", color: "from-green-500/20 to-emerald-500/20" },
  { id: "logic", name: "逻辑类", icon: "⚖️", description: "逻辑关系、价值判断相关", color: "from-indigo-500/20 to-violet-500/20" },
  { id: "time", name: "时间类", icon: "⏰", description: "时间、时序相关", color: "from-amber-500/20 to-orange-500/20" },
  { id: "quantity", name: "数量类", icon: "🔢", description: "数量相关", color: "from-teal-500/20 to-cyan-500/20" },
  { id: "nature", name: "自然类", icon: "🌿", description: "自然事物相关", color: "from-emerald-500/20 to-green-500/20" },
  { id: "action", name: "动作类", icon: "👆", description: "动作、行为相关", color: "from-rose-500/20 to-pink-500/20" },
] as const;

// 从数据中获取分类统计
function getCategoryCounts(data: typeof antonymsData.antonyms) {
  const counts: Record<string, number> = {};
  data.forEach(item => {
    const cat = item.category || "logic";
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return counts;
}

export default function AntonymsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAntonym, setSelectedAntonym] = useState<typeof antonymsData.antonyms[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryCounts = getCategoryCounts(antonymsData.antonyms);

  const filteredAntonyms = useMemo(() => {
    let results = antonymsData.antonyms;
    if (selectedCategory) {
      results = results.filter(a => a.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(a =>
        a.char1.includes(q) || a.char2.includes(q) || a.pair.includes(q)
      );
    }
    return results;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/80 backdrop-blur-sm z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold">反义词库</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
                {antonymsData.antonyms.length.toLocaleString()} 对反义词 · 8 个语义范畴
              </p>
            </div>
            <div className="relative" style={{ width: 280, maxWidth: '100%' }}>
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted-foreground)]"
                width="16" height="16"
                fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="搜索反义词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full"
                style={{ paddingLeft: 40 }}
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`h-9 px-4 rounded-md text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-white text-black"
                  : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
              }`}
            >
              全部 ({antonymsData.antonyms.length})
            </button>
            {CATEGORIES.map(cat => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`h-9 px-3 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white text-black"
                      : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="text-xs opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Description */}
      {selectedCategory && (
        <div className="border-b border-[var(--border)] bg-white/5">
          <div className="container py-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{CATEGORIES.find(c => c.id === selectedCategory)?.icon}</span>
              <div>
                <span className="font-medium text-white">{CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
                <span className="text-[var(--muted-foreground)] mx-2">·</span>
                <span className="text-sm text-[var(--muted-foreground)]">{CATEGORIES.find(c => c.id === selectedCategory)?.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container py-6">
        <div className="flex gap-6">
          {/* Sidebar List */}
          <div className="w-72 flex-shrink-0">
            <div className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3 px-1">
              词条列表
              {filteredAntonyms.length > 0 && (
                <span className="ml-2 text-[var(--muted-foreground)]/60">
                  {filteredAntonyms.length.toLocaleString()}
                </span>
              )}
            </div>
            <div className="max-h-[calc(100vh-240px)] overflow-y-auto space-y-0.5 pr-2">
              {filteredAntonyms.slice(0, 200).map((antonym, index) => {
                const isActive = selectedAntonym?.pair === antonym.pair;
                const isGLM = antonym.source.includes('GLM');
                const category = CATEGORIES.find(c => c.id === antonym.category);

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedAntonym(antonym)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all text-left ${
                      isActive
                        ? "bg-white text-black font-medium"
                        : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate flex items-center gap-1.5">
                        <span className="opacity-70">{category?.icon}</span>
                        <span>{antonym.pair}</span>
                      </span>
                      <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded ${
                        isActive ? "bg-black/10" :
                        isGLM ? "bg-purple-500/20 text-purple-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>
                        {isGLM ? 'AI' : 'PDF'}
                      </span>
                    </div>
                  </button>
                );
              })}
              {filteredAntonyms.length > 200 && (
                <div className="text-xs text-[var(--muted-foreground)] py-3 px-1">
                  还有 {filteredAntonyms.length - 200} 对...
                </div>
              )}
              {filteredAntonyms.length === 0 && (
                <div className="text-sm text-[var(--muted-foreground)] py-8 text-center">
                  未找到匹配的反义词
                </div>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="flex-1 min-w-0">
            {selectedAntonym ? (
              <div className="animate-fade-in">
                {/* Large word display */}
                <div className="flex items-center justify-center gap-12 mb-16 py-8">
                  <div className="text-center">
                    <div className="text-7xl md:text-9xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">
                      {selectedAntonym.char1}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-2 tracking-wider uppercase">字 A</div>
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-[var(--muted-foreground)] text-2xl">↔</span>
                  </div>
                  <div className="text-center">
                    <div className="text-7xl md:text-9xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600">
                      {selectedAntonym.char2}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-2 tracking-wider uppercase">字 B</div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  {(() => {
                    const cat = CATEGORIES.find(c => c.id === selectedAntonym.category);
                    return cat ? (
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} border border-white/10`}>
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-sm font-medium text-white">{cat.name}</span>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="card p-5">
                    <h3 className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
                      数据来源
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedAntonym.source.split('+').map((s, i) => (
                        <span key={i} className={`badge ${s === 'PDF' ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-purple-500/20 text-purple-400 border border-purple-500/30"}`}>
                          {s === 'GLM' ? 'GLM-5 AI' : s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="card p-5">
                    <h3 className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
                      拼音
                    </h3>
                    <p className="text-sm font-mono text-[var(--muted-foreground)]">
                      {selectedAntonym.char1} / {selectedAntonym.char2}
                    </p>
                  </div>
                </div>

                {/* Reason */}
                {'reason' in selectedAntonym && selectedAntonym.reason && (
                  <div className="card p-5 mb-6">
                    <h3 className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
                      语义说明
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {selectedAntonym.reason}
                    </p>
                  </div>
                )}

                {/* Related */}
                <div className="card p-5">
                  <h3 className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
                    同类反义词
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {antonymsData.antonyms
                      .filter(a => a.pair !== selectedAntonym.pair && a.category === selectedAntonym.category)
                      .slice(0, 16)
                      .map((a, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedAntonym(a)}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-[var(--muted-foreground)] hover:bg-white hover:text-black transition-colors"
                        >
                          {a.pair}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-[var(--muted-foreground)]">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <p className="text-[var(--muted-foreground)]">选择左侧词条查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
