"use client";

import { useState, useMemo } from "react";
import antonymsData from "@/data/antonyms-merged.json";

const GROUPS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"
];

function getPinyin(char: string): string {
  const map: Record<string, string> = {
    '上': 's', '下': 'x', '左': 'z', '右': 'y', '前': 'q', '后': 'h',
    '东': 'd', '西': 'x', '南': 'n', '北': 'b', '中': 'z', '内': 'n',
    '外': 'w', '大': 'd', '小': 'x', '多': 'd', '少': 's', '长': 'c',
    '短': 'd', '高': 'g', '低': 'd', '冷': 'l', '热': 'r', '好': 'h',
    '坏': 'h', '真': 'z', '假': 'j', '是': 's', '否': 'f', '有': 'y',
    '无': 'w', '开': 'k', '关': 'g', '进': 'j', '退': 't', '买': 'm',
    '卖': 'm', '男': 'n', '女': 'n', '老': 'l', '新': 'x',
    '旧': 'j', '动': 'd', '静': 'j', '快': 'k', '慢': 'm', '强': 'q', '弱': 'r',
    '兴': 'x', '衰': 's', '败': 'b', '增': 'z', '减': 'j', '古': 'g', '今': 'j',
    '早': 'z', '晚': 'w', '春': 'c', '夏': 'x', '秋': 'q', '冬': 'd'
  };
  return map[char] || 'z';
}

export default function AntonymsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAntonym, setSelectedAntonym] = useState<typeof antonymsData.antonyms[0] | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredAntonyms = useMemo(() => {
    let results = antonymsData.antonyms;
    if (selectedGroup) {
      results = results.filter(a => {
        const pinyin = getPinyin(a.char1);
        return pinyin.startsWith(selectedGroup.toLowerCase());
      });
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(a =>
        a.char1.includes(q) || a.char2.includes(q) || a.pair.includes(q)
      );
    }
    return results;
  }, [searchQuery, selectedGroup]);

  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    antonymsData.antonyms.forEach(a => {
      const group = getPinyin(a.char1)[0].toUpperCase();
      counts[group] = (counts[group] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/80 backdrop-blur-sm z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold">反义词库</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
                {antonymsData.antonyms.length.toLocaleString()} 对反义词
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

          {/* Group filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedGroup(null)}
              className={`h-8 px-3 rounded-md text-sm font-medium transition-all ${
                selectedGroup === null
                  ? "bg-white text-black"
                  : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
              }`}
            >
              全部
            </button>
            <div className="w-px h-5 bg-[var(--border)] mx-1" />
            {GROUPS.map(group => {
              const count = groupCounts[group] || 0;
              const isEmpty = count === 0;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  disabled={isEmpty}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-all ${
                    selectedGroup === group
                      ? "bg-white text-black"
                      : isEmpty
                      ? "text-[var(--muted-foreground)]/30 cursor-not-allowed"
                      : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>
      </div>

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
                      <span className="truncate">{antonym.pair}</span>
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
                    相关反义词
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {antonymsData.antonyms
                      .filter(a => a.pair !== selectedAntonym.pair && (
                        a.char1 === selectedAntonym.char1 || a.char1 === selectedAntonym.char2 ||
                        a.char2 === selectedAntonym.char1 || a.char2 === selectedAntonym.char2
                      ))
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
