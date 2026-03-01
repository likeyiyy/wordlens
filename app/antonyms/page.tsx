"use client";

import { useState, useMemo } from "react";
import antonymsData from "@/data/antonyms-classified.json";

// 二级分类体系
const CATEGORY_SYSTEM = {
  "动作行为": {
    icon: "👆",
    description: "各种对立的动作和行为",
    color: "from-blue-500/20 to-cyan-500/20",
    subcategories: ["动作", "升降", "取舍", "拿放", "增减", "收付", "动止", "建毁", "聚散", "推拉", "来去", "进出", "开关", "借贷", "修剪", "给受", "买卖交易", "帮助", "装卸", "发声", "读写", "攻退", "按压", "烹饪", "奖罚", "涂抹", "劝导", "救助", "呼吸", "声响", "挖掘", "顺从", "洗涤", "观看", "命令", "创造", "抓捕", "包裹", "办理", "伸缩", "吞吐", "囚禁", "争斗", "躲避", "施受", "出行", "浇灌", "测量", "申诉", "索取", "更替"],
  },
  "品质评价": {
    icon: "⭐",
    description: "事物性质和评价的对立",
    color: "from-yellow-500/20 to-amber-500/20",
    subcategories: ["善恶", "真假", "好坏", "地位", "美丑", "正邪", "荣辱", "忠奸", "优劣", "新旧", "清洁", "雅俗", "俭奢", "贫富", "品德", "谦虚", "文武", "技艺", "廉洁", "庄重", "杰出", "智愚", "诚信", "贞洁"],
  },
  "状态性质": {
    icon: "🔄",
    description: "事物状态的对立",
    color: "from-purple-500/20 to-pink-500/20",
    subcategories: ["状态", "浓度", "质地", "生熟", "速度", "明暗", "醒睡", "强弱", "温度", "形态", "健康", "勤懒", "秩序", "胆怯", "干湿", "忙闲", "变化", "记忆", "同异", "味道", "隐显", "形状", "觉察", "敏钝", "难易", "清晰", "荣枯", "肥沃", "轻重", "精神", "饥饱", "专博", "确定", "重复", "寿命", "刚柔", "公开", "居住", "屈伸", "寻常", "克制", "旱涝", "日照", "水势", "快慢", "渗透", "通畅", "感觉", "胖瘦", "动静"],
  },
  "关系情态": {
    icon: "🔗",
    description: "各种关系和情感状态的对立",
    color: "from-indigo-500/20 to-violet-500/20",
    subcategories: ["兴亡", "吉凶", "是非", "情绪", "爱恨", "安危", "自然", "得失", "利害", "身份", "生死", "神圣", "敌友", "主从", "人称", "公私", "有无", "因果", "允许", "必然", "敬重", "阴阳", "攻防", "好恶", "转折", "亲疏", "夫妻", "婚嫁", "适宜", "合法", "师生", "体用", "心身", "怜悯", "手足", "褒贬", "良毒", "评价", "指代"],
  },
  "时空方位": {
    icon: "📍",
    description: "时间、空间、方向的对立",
    color: "from-emerald-500/20 to-green-500/20",
    subcategories: ["时间", "方位", "古今", "始终", "前后", "地形", "早晚", "内外", "时长", "城乡", "上下", "高低", "方向", "倾斜", "深浅", "远近", "凹凸", "左右", "国家", "凸凹"],
  },
  "数量程度": {
    icon: "📊",
    description: "数量和程度的对立",
    color: "from-teal-500/20 to-cyan-500/20",
    subcategories: ["多少", "程度", "盈亏", "大小", "全半", "疏密", "奇偶", "宽窄", "限度", "数量", "厚薄", "主次", "价值", "分合"],
  },
} as const;

type Category1 = keyof typeof CATEGORY_SYSTEM;

// 获取分类统计
function getCategoryCounts(data: typeof antonymsData.antonyms) {
  const counts: Record<string, number> = {};
  const subCounts: Record<string, Record<string, number>> = {};

  data.forEach(item => {
    const cat1 = item.category1 || "关系情态";
    const cat2 = item.category2 || "其他";

    counts[cat1] = (counts[cat1] || 0) + 1;

    if (!subCounts[cat1]) subCounts[cat1] = {};
    subCounts[cat1][cat2] = (subCounts[cat1][cat2] || 0) + 1;
  });

  return { counts, subCounts };
}

export default function AntonymsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAntonym, setSelectedAntonym] = useState<typeof antonymsData.antonyms[0] | null>(null);
  const [selectedCategory1, setSelectedCategory1] = useState<string | null>(null);
  const [selectedCategory2, setSelectedCategory2] = useState<string | null>(null);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  const { counts, subCounts } = getCategoryCounts(antonymsData.antonyms);

  const filteredAntonyms = useMemo(() => {
    let results = antonymsData.antonyms;

    if (selectedCategory1) {
      results = results.filter(a => a.category1 === selectedCategory1);
    }

    if (selectedCategory2) {
      results = results.filter(a => a.category2 === selectedCategory2);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      // 搜索时只显示匹配的结果
      results = results.filter(a =>
        a.char1.includes(q) || a.char2.includes(q) || a.pair.includes(q)
      );
    }

    return results;
  }, [searchQuery, selectedCategory1, selectedCategory2]);

  // 可用的二级分类
  const availableSubcategories = selectedCategory1 && subCounts[selectedCategory1]
    ? Object.keys(subCounts[selectedCategory1]).sort()
    : [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/80 backdrop-blur-sm z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold">反义词库</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
                {antonymsData.antonyms.length.toLocaleString()} 对反义词 · 6 大类 · 198 小类
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

            {/* Filter toggle button - mobile only */}
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[var(--muted-foreground)] hover:text-white hover:bg-white/5 transition-all md:hidden"
            >
              <svg className={`w-4 h-4 transition-transform ${isFiltersExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span>筛选</span>
              {(selectedCategory1 || selectedCategory2) && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
            </button>
          </div>

          {/* Category filters - collapsible */}
          <div className={`${isFiltersExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-200`}>
            <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedCategory1(null); setSelectedCategory2(null); }}
              className={`h-9 px-4 rounded-md text-sm font-medium transition-all ${
                !selectedCategory1 && !selectedCategory2
                  ? "bg-white text-black"
                  : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
              }`}
            >
              全部 ({antonymsData.antonyms.length})
            </button>
            {Object.entries(CATEGORY_SYSTEM).map(([cat1, info]) => {
              const count = counts[cat1] || 0;
              const isActive = selectedCategory1 === cat1;
              return (
                <button
                  key={cat1}
                  onClick={() => { setSelectedCategory1(cat1); setSelectedCategory2(null); }}
                  className={`h-9 px-3 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white text-black"
                      : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{info.icon}</span>
                  <span>{cat1}</span>
                  <span className="text-xs opacity-60">({count})</span>
                </button>
              );
            })}
            </div>

            {/* Subcategory filters */}
            {selectedCategory1 && (
              <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setSelectedCategory2(null)}
                className={`h-8 px-3 rounded-md text-xs font-medium transition-all ${
                  !selectedCategory2
                    ? "bg-white/20 text-white"
                    : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                }`}
              >
                全部
              </button>
              {availableSubcategories.map(cat2 => {
                const count = subCounts[selectedCategory1]?.[cat2] || 0;
                const isActive = selectedCategory2 === cat2;
                return (
                  <button
                    key={cat2}
                    onClick={() => setSelectedCategory2(cat2)}
                    className={`h-8 px-3 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? "bg-white text-black"
                        : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat2} ({count})
                  </button>
                );
              })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Description */}
      {selectedCategory1 && !selectedCategory2 && (
        <div className="border-b border-[var(--border)] bg-white/5">
          <div className="container py-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{(CATEGORY_SYSTEM as any)[selectedCategory1]?.icon}</span>
              <div>
                <span className="font-medium text-white">{selectedCategory1}</span>
                <span className="text-[var(--muted-foreground)] mx-2">·</span>
                <span className="text-sm text-[var(--muted-foreground)]">{(CATEGORY_SYSTEM as any)[selectedCategory1]?.description}</span>
                <span className="text-[var(--muted-foreground)] mx-2">·</span>
                <span className="text-sm text-[var(--muted-foreground)]">{(subCounts[selectedCategory1] ? Object.keys(subCounts[selectedCategory1]).length : 0)} 个子类</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subcategory Description */}
      {selectedCategory1 && selectedCategory2 && (
        <div className="border-b border-[var(--border)] bg-white/5">
          <div className="container py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{(CATEGORY_SYSTEM as any)[selectedCategory1]?.icon}</span>
              <div>
                <span className="text-sm font-medium text-white">{selectedCategory1}</span>
                <span className="text-[var(--muted-foreground)] mx-2">/</span>
                <span className="text-sm text-white">{selectedCategory2}</span>
                <span className="text-[var(--muted-foreground)] mx-2">·</span>
                <span className="text-xs text-[var(--muted-foreground)]">{subCounts[selectedCategory1]?.[selectedCategory2] || 0} 对</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar List - Mobile: horizontal scroll / Desktop: fixed width */}
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3 px-1">
              词条列表
              {filteredAntonyms.length > 0 && (
                <span className="ml-2 text-[var(--muted-foreground)]/60">
                  {filteredAntonyms.length.toLocaleString()}
                </span>
              )}
            </div>
            {/* Mobile: horizontal scrollable pills */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
              {filteredAntonyms.slice(0, 50).map((antonym, index) => {
                const isActive = selectedAntonym?.pair === antonym.pair;
                const cat1Info = CATEGORY_SYSTEM[antonym.category1 as Category1];

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedAntonym(antonym);
                      setTimeout(() => {
                        document.getElementById('detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-all snap-start ${
                      isActive
                        ? "bg-white text-black font-medium"
                        : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5 border border-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <span className="opacity-70 text-xs">{cat1Info?.icon}</span>
                      <span>{antonym.pair}</span>
                    </span>
                  </button>
                );
              })}
              {filteredAntonyms.length > 50 && (
                <div className="flex-shrink-0 text-xs text-[var(--muted-foreground)] px-2 py-1.5 flex items-center">
                  +{filteredAntonyms.length - 50}
                </div>
              )}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden md:block max-h-[calc(100vh-240px)] overflow-y-auto space-y-0.5 pr-2">
              {filteredAntonyms.slice(0, 200).map((antonym, index) => {
                const isActive = selectedAntonym?.pair === antonym.pair;
                const cat1Info = CATEGORY_SYSTEM[antonym.category1 as Category1];

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedAntonym(antonym)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                      isActive
                        ? "bg-white text-black font-medium"
                        : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <span className="opacity-70">{cat1Info?.icon}</span>
                      <span>{antonym.pair}</span>
                    </span>
                  </button>
                );
              })}
              {filteredAntonyms.length > 200 && (
                <div className="text-xs text-[var(--muted-foreground)] py-3 px-1">
                  还有 {filteredAntonyms.length - 200} 对...
                </div>
              )}
            </div>

            {filteredAntonyms.length === 0 && (
              <div className="text-sm text-[var(--muted-foreground)] py-8 text-center">
                未找到匹配的反义词
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div id="detail-panel" className="flex-1 min-w-0">
            {selectedAntonym ? (
              <div className="animate-fade-in">
                {/* Large word display */}
                <div className="flex items-center justify-center gap-4 md:gap-12 mb-8 md:mb-16 py-4 md:py-8">
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">
                      {selectedAntonym.char1}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-2 tracking-wider uppercase">字 A</div>
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-[var(--muted-foreground)] text-xl md:text-2xl">↔</span>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600">
                      {selectedAntonym.char2}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-2 tracking-wider uppercase">字 B</div>
                  </div>
                </div>

                {/* Category badges */}
                <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8 flex-wrap">
                  {selectedAntonym.category1 && (() => {
                    const cat1Info = CATEGORY_SYSTEM[selectedAntonym.category1 as Category1];
                    return cat1Info ? (
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${cat1Info.color} border border-white/10`}>
                        <span className="text-lg">{cat1Info.icon}</span>
                        <span className="text-sm font-medium text-white">{selectedAntonym.category1}</span>
                      </div>
                    ) : null;
                  })()}
                  {selectedAntonym.category2 && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                      <span className="text-sm text-white">{selectedAntonym.category2}</span>
                    </div>
                  )}
                </div>

                {/* Info card */}
                <div className="card p-5 mb-6">
                  <h3 className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
                    拼音
                  </h3>
                  <p className="text-sm font-mono text-[var(--muted-foreground)]">
                    {selectedAntonym.char1} / {selectedAntonym.char2}
                  </p>
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
                      .filter(a => a.pair !== selectedAntonym.pair && a.category2 === selectedAntonym.category2)
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
