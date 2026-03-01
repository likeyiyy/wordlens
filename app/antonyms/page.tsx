"use client";

import { useState, useMemo } from "react";
import antonymsData from "@/data/antonyms-merged.json";

// 按拼音首字母分组
const GROUPS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"
];

export default function AntonymsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAntonym, setSelectedAntonym] = useState<typeof antonymsData.antonyms[0] | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // 过滤和搜索
  const filteredAntonyms = useMemo(() => {
    let results = antonymsData.antonyms;

    // 按首字母分组过滤
    if (selectedGroup) {
      results = results.filter(a => {
        const first = a.char1;
        const pinyin = getPinyin(first);
        return pinyin.startsWith(selectedGroup.toLowerCase());
      });
    }

    // 搜索过滤
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(a =>
        a.char1.includes(q) || a.char2.includes(q) || a.pair.includes(q)
      );
    }

    return results;
  }, [searchQuery, selectedGroup]);

  // 获取拼音首字母
  function getPinyin(char: string): string {
    // 简化的拼音映射
    const map: Record<string, string> = {
      '上': 's', '下': 'x', '左': 'z', '右': 'y', '前': 'q', '后': 'h',
      '东': 'd', '西': 'x', '南': 'n', '北': 'b', '中': 'z', '内': 'n',
      '外': 'w', '大': 'd', '小': 'x', '多': 'd', '少': 's', '长': 'c',
      '短': 'd', '高': 'g', '低': 'd', '冷': 'l', '热': 'r', '好': 'h',
      '坏': 'h', '真': 'z', '假': 'j', '是': 's', '否': 'f', '有': 'y',
      '无': 'w', '开': 'k', '关': 'g', '进': 'j', '退': 't', '买': 'm',
      '卖': 'm', '男': 'n', '女': 'n', '老': 'l', '新': 'x',
      '旧': 'j', '动': 'd', '静': 'j', '快': 'k',
      '慢': 'm', '强': 'q', '弱': 'r', '兴': 'x', '衰': 's',
      '败': 'b', '增': 'z', '减': 'j', '古': 'g', '今': 'j', '早': 'z',
      '晚': 'w', '春': 'c', '夏': 'x', '秋': 'q', '冬': 'd'
    };
    return map[char] || 'z';
  }

  // 统计各分组的数量
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    antonymsData.antonyms.forEach(a => {
      const first = a.char1;
      const pinyin = getPinyin(first);
      const group = pinyin[0].toUpperCase();
      counts[group] = (counts[group] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="flex h-screen bg-[var(--bg-primary)]">
      {/* 左侧边栏 */}
      <aside className="w-72 flex-shrink-0 border-r border-[var(--border-color)] flex flex-col">
        {/* Logo区域 */}
        <div className="p-6 border-b border-[var(--border-color)]">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">反义词大全</h1>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            共 {antonymsData.antonyms.length.toLocaleString()} 对
          </p>
        </div>

        {/* 搜索框 */}
        <div className="p-4 border-b border-[var(--border-color)]">
          <input
            type="text"
            placeholder="搜索反义词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        {/* 分组导航 */}
        <div className="p-4 border-b border-[var(--border-color)]">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${
              selectedGroup === null
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
            }`}
          >
            全部 ({antonymsData.antonyms.length})
          </button>
          <div className="grid grid-cols-6 gap-1">
            {GROUPS.map(group => {
              const count = groupCounts[group] || 0;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  disabled={count === 0}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    selectedGroup === group
                      ? "bg-[var(--accent)] text-white"
                      : count > 0
                      ? "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                      : "text-[var(--text-tertiary)] cursor-not-allowed"
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* 反义词列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {filteredAntonyms.slice(0, 100).map((antonym, index) => (
              <button
                key={index}
                onClick={() => setSelectedAntonym(antonym)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedAntonym?.pair === antonym.pair
                    ? "bg-[var(--accent)] text-white"
                    : "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{antonym.pair}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    antonym.source.includes('PDF') && antonym.source.includes('GLM')
                      ? "bg-purple-500/20 text-purple-400"
                      : antonym.source.includes('PDF')
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-green-500/20 text-green-400"
                  }`}>
                    {antonym.source.replace('GLM-5', 'GLM')}
                  </span>
                </div>
              </button>
            ))}
            {filteredAntonyms.length > 100 && (
              <div className="text-center text-sm text-[var(--text-tertiary)] py-4">
                还有 {filteredAntonyms.length - 100} 对...
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 右侧内容区 */}
      <main className="flex-1 overflow-y-auto">
        {selectedAntonym ? (
          <div className="max-w-4xl mx-auto p-12">
            {/* 大字展示 */}
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-9xl font-bold text-blue-400 mb-4">{selectedAntonym.char1}</div>
                <div className="text-sm text-[var(--text-tertiary)]">字A</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-2">
                  <span className="text-2xl text-[var(--text-tertiary)]">VS</span>
                </div>
                <span className="text-xs text-[var(--text-tertiary)]">对立</span>
              </div>
              <div className="text-center">
                <div className="text-9xl font-bold text-orange-400 mb-4">{selectedAntonym.char2}</div>
                <div className="text-sm text-[var(--text-tertiary)]">字B</div>
              </div>
            </div>

            {/* 信息卡片 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card p-6">
                <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
                  数据来源
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedAntonym.source.split('+').map((s, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        s === 'PDF'
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {s === 'GLM' ? 'GLM-5 AI' : s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
                  拼音
                </h3>
                <div className="text-lg text-[var(--text-primary)]">
                  {selectedAntonym.char1} / {selectedAntonym.char2}
                </div>
              </div>
            </div>

            {'reason' in selectedAntonym && (
              <div className="card p-6 mb-8">
                <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
                  语义说明
                </h3>
                <p className="text-[var(--text-secondary)]">{selectedAntonym.reason}</p>
              </div>
            )}

            {/* 相关反义词 */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
                相关反义词
              </h3>
              <div className="flex flex-wrap gap-2">
                {antonymsData.antonyms
                  .filter(a =>
                    a.pair !== selectedAntonym.pair && (
                      a.char1 === selectedAntonym.char1 ||
                      a.char1 === selectedAntonym.char2 ||
                      a.char2 === selectedAntonym.char1 ||
                      a.char2 === selectedAntonym.char2
                    )
                  )
                  .slice(0, 12)
                  .map((a, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAntonym(a)}
                      className="px-4 py-2 bg-[var(--bg-secondary)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-white transition-all"
                    >
                      {a.pair}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-[var(--text-tertiary)] mb-4">Aa</div>
              <p className="text-[var(--text-tertiary)]">选择左侧的反义词对查看详情</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
