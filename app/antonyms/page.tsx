"use client";

import { useState, useMemo } from "react";
import antonymsData from "@/data/antonyms-merged.json";

// 反义词分类定义
const CATEGORIES = [
  {
    id: "position",
    name: "方位空间",
    icon: "📍",
    description: "上下、左右、前后、内外等空间方向",
    keywords: ["上下", "左右", "前后", "内外", "东西", "南北", "方位", "位置", "空间", "顶底", "进出", "旁"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "quantity",
    name: "数量程度",
    icon: "🔢",
    description: "多少、大小、深浅、增减等数量关系",
    keywords: ["多少", "大小", "增减", "深浅", "厚薄", "浓淡", "数量", "程度", "盈亏", "多寡", "繁简", "疏密"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "time",
    name: "时间时序",
    icon: "⏰",
    description: "古今、早晚、先后、新旧等时间概念",
    keywords: ["古今", "早晚", "先后", "新旧", "始终", "长短", "时间", "时序", "过去", "未来", "现在", "永恒"],
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "motion",
    name: "动静状态",
    icon: "🔄",
    description: "动静、快慢、开关、进退等运动变化",
    keywords: ["动静", "快慢", "开关", "进退", "起落", "升降", "浮沉", "运动", "静止", "动作", "往返", "来去"],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "appearance",
    name: "美丑相貌",
    icon: "✨",
    description: "美丑、俊陋、妍媸等外貌特征",
    keywords: ["美丑", "俊丑", "俊陋", "妍媸", "丽陋", "相貌", "外貌", "长相"],
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "moral",
    name: "善恶品质",
    icon: "⚖️",
    description: "好坏、善恶、真假、优劣等品质判断",
    keywords: ["好坏", "善恶", "优劣", "真假", "对错", "是非", "正邪", "忠奸", "品质", "正误", "诚实", "虚伪"],
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    id: "life",
    name: "生死存亡",
    icon: "🌸",
    description: "生死、存亡、兴衰、荣辱等命运变化",
    keywords: ["生死", "存亡", "兴衰", "盛衰", "荣辱", "成败", "兴废", "兴亡", "命运", "苏醒", "腐烂"],
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: "gain",
    name: "得失利益",
    icon: "💰",
    description: "得失、买卖、收支、贫富等利益关系",
    keywords: ["得失", "买卖", "收支", "收付", "贫富", "贵贱", "赢输", "借贷", "财富", "利益", "损益", "取舍", "财务"],
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    id: "safety",
    name: "安危吉凶",
    icon: "🛡️",
    description: "安危、吉凶、福祸等运势状态",
    keywords: ["安危", "吉凶", "福祸", "险夷", "祥瑞", "灾祸", "平安", "危险", "运气", "福气"],
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    id: "status",
    name: "尊卑地位",
    icon: "👑",
    description: "尊卑、主仆、贵贱等社会地位",
    keywords: ["尊卑", "贵贱", "主仆", "君臣", "地位", "高官", "平民", "上司", "下属"],
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    id: "emotion",
    name: "情感态度",
    icon: "❤️",
    description: "喜怒、爱恨、乐忧、恩仇等情感表达",
    keywords: ["喜怒", "爱恨", "乐忧", "恩仇", "悲喜", "哀乐", "亲仇", "情感", "情绪", "憎爱", "敌友", "苦乐"],
    color: "from-red-500/20 to-pink-500/20",
  },
  {
    id: "truth",
    name: "是非真伪",
    icon: "🔍",
    description: "是非、真伪、曲直等判断标准",
    keywords: ["是非", "真伪", "曲直", "虚实", "对错", "正误", "判断", "肯定", "否定"],
    color: "from-slate-500/20 to-gray-500/20",
  },
  {
    id: "physical",
    name: "物理属性",
    icon: "🌡️",
    description: "冷热、干湿、软硬、明暗等物理性质",
    keywords: ["冷热", "干湿", "软硬", "明暗", "刚柔", "清浊", "黑白", "颜色", "温度", "光暗", "洁净", "浑浊"],
    color: "from-cyan-500/20 to-blue-500/20",
  },
] as const;

// 根据反义词对推断分类
function getCategory(antonym: { char1: string; char2: string; pair: string; reason?: string }): string {
  const { char1, char2, pair, reason } = antonym;
  const text = `${pair}${reason || ""}`;

  // 方位空间
  if (
    text.includes("上") || text.includes("下") ||
    text.includes("左") || text.includes("右") ||
    text.includes("前") || text.includes("后") ||
    text.includes("内") || text.includes("外") ||
    text.includes("东") || text.includes("西") ||
    text.includes("南") || text.includes("北") ||
    text.includes("顶") || text.includes("底") ||
    text.includes("旁") || text.includes("中") ||
    text.includes("边") ||
    (reason && (reason.includes("方位") || reason.includes("位置") || reason.includes("空间") || reason.includes("方向")))
  ) {
    return "position";
  }

  // 数量程度
  if (
    text.includes("多") || text.includes("少") ||
    text.includes("大") || text.includes("小") ||
    text.includes("增") || text.includes("减") ||
    text.includes("深") || text.includes("浅") ||
    text.includes("厚") || text.includes("薄") ||
    text.includes("浓") || text.includes("淡") ||
    text.includes("盈") || text.includes("亏") ||
    text.includes("繁") || text.includes("简") ||
    text.includes("疏") || text.includes("密") ||
    (reason && (reason.includes("数量") || reason.includes("程度") || reason.includes("多少")))
  ) {
    return "quantity";
  }

  // 时间时序
  if (
    text.includes("古") || text.includes("今") ||
    text.includes("早") || text.includes("晚") ||
    text.includes("先") || text.includes("后") ||
    text.includes("新") || text.includes("旧") ||
    text.includes("始") || text.includes("终") ||
    text.includes("长") || text.includes("短") ||
    text.includes("昔") || text.includes("永") ||
    text.includes("暂") || text.includes("旦") || text.includes("暮") ||
    (reason && (reason.includes("时间") || reason.includes("时序") || reason.includes("古今") || reason.includes("早晚")))
  ) {
    return "time";
  }

  // 动静状态
  if (
    text.includes("动") || text.includes("静") ||
    text.includes("快") || text.includes("慢") ||
    text.includes("开") || text.includes("关") ||
    text.includes("进") || text.includes("退") ||
    text.includes("起") || text.includes("落") ||
    text.includes("升") || text.includes("降") ||
    text.includes("浮") || text.includes("沉") ||
    text.includes("行") || text.includes("止") ||
    text.includes("来") || text.includes("去") ||
    (reason && (reason.includes("运动") || reason.includes("静止") || reason.includes("动作") || reason.includes("状态")))
  ) {
    return "motion";
  }

  // 美丑相貌
  if (
    text.includes("美") || text.includes("丑") ||
    text.includes("俊") || text.includes("陋") ||
    text.includes("丽") || text.includes("妍") ||
    text.includes("媸") || text.includes("貌") ||
    text.includes("相") ||
    (reason && (reason.includes("美丑") || reason.includes("相貌") || reason.includes("外貌")))
  ) {
    return "appearance";
  }

  // 善恶品质
  if (
    text.includes("好") || text.includes("坏") ||
    text.includes("善") || text.includes("恶") ||
    text.includes("优") || text.includes("劣") ||
    text.includes("真") || text.includes("假") ||
    text.includes("正") || text.includes("邪") ||
    text.includes("忠") || text.includes("奸") ||
    text.includes("诚") || text.includes("伪") ||
    text.includes("良") || text.includes("莠") ||
    (reason && (reason.includes("善恶") || reason.includes("品质") || reason.includes("真伪") || reason.includes("正邪")))
  ) {
    return "moral";
  }

  // 生死存亡
  if (
    text.includes("生") || text.includes("死") ||
    text.includes("存") || text.includes("亡") ||
    text.includes("兴") || text.includes("衰") ||
    text.includes("盛") || text.includes("败") ||
    text.includes("荣") || text.includes("辱") ||
    text.includes("苏") || text.includes("腐") ||
    (reason && (reason.includes("生死") || reason.includes("存亡") || reason.includes("兴衰")))
  ) {
    return "life";
  }

  // 得失利益
  if (
    text.includes("得") || text.includes("失") ||
    text.includes("买") || text.includes("卖") ||
    text.includes("收") || text.includes("付") ||
    text.includes("贫") || text.includes("富") ||
    text.includes("贵") || text.includes("贱") ||
    text.includes("赢") || text.includes("输") ||
    text.includes("借") || text.includes("贷") ||
    text.includes("取") || text.includes("舍") ||
    (reason && (reason.includes("得失") || reason.includes("利益") || reason.includes("财务") || reason.includes("收支")))
  ) {
    return "gain";
  }

  // 安危吉凶
  if (
    text.includes("安") || text.includes("危") ||
    text.includes("吉") || text.includes("凶") ||
    text.includes("福") || text.includes("祸") ||
    text.includes("祥") || text.includes("瑞") ||
    text.includes("险") || text.includes("夷") ||
    (reason && (reason.includes("安危") || reason.includes("吉凶") || reason.includes("福祸")))
  ) {
    return "safety";
  }

  // 尊卑地位
  if (
    text.includes("尊") || text.includes("卑") ||
    text.includes("主") || text.includes("仆") ||
    text.includes("君") || text.includes("臣") ||
    text.includes("官") || text.includes("民") ||
    (reason && (reason.includes("尊卑") || reason.includes("贵贱") || reason.includes("地位")))
  ) {
    return "status";
  }

  // 情感态度
  if (
    text.includes("喜") || text.includes("怒") ||
    text.includes("爱") || text.includes("恨") ||
    text.includes("乐") || text.includes("忧") ||
    text.includes("恩") || text.includes("仇") ||
    text.includes("悲") || text.includes("哀") ||
    text.includes("亲") || text.includes("敌") ||
    text.includes("憎") || text.includes("友") ||
    (reason && (reason.includes("情感") || reason.includes("情绪") || reason.includes("爱恨")))
  ) {
    return "emotion";
  }

  // 是非真伪
  if (
    text.includes("是") || text.includes("非") ||
    text.includes("对") || text.includes("错") ||
    text.includes("曲") || text.includes("直") ||
    text.includes("虚") || text.includes("实") ||
    (reason && (reason.includes("是非") || reason.includes("真伪") || reason.includes("对错")))
  ) {
    return "truth";
  }

  // 物理属性
  if (
    text.includes("冷") || text.includes("热") ||
    text.includes("干") || text.includes("湿") ||
    text.includes("软") || text.includes("硬") ||
    text.includes("明") || text.includes("暗") ||
    text.includes("刚") || text.includes("柔") ||
    text.includes("清") || text.includes("浊") ||
    text.includes("黑") || text.includes("白") ||
    text.includes("温") || text.includes("凉") ||
    (reason && (reason.includes("温度") || reason.includes("颜色") || reason.includes("物理")))
  ) {
    return "physical";
  }

  // 默认归入善恶品质
  return "moral";
}

export default function AntonymsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAntonym, setSelectedAntonym] = useState<typeof antonymsData.antonyms[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 为所有反义词添加分类
  const antonymsWithCategory = useMemo(() => {
    return antonymsData.antonyms.map(a => ({
      ...a,
      category: getCategory(a),
    }));
  }, []);

  const filteredAntonyms = useMemo(() => {
    let results = antonymsWithCategory;
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

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    antonymsWithCategory.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
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
                {antonymsData.antonyms.length.toLocaleString()} 对反义词 · 按语义范畴分类
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
                    const cat = CATEGORIES.find(c => c.id === getCategory(selectedAntonym));
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
                    {antonymsWithCategory
                      .filter(a => a.pair !== selectedAntonym.pair && a.category === getCategory(selectedAntonym))
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
