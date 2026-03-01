"use client";

import { useState } from "react";
import dimensionsData from "@/data/dimensions.json";
import gradientWordsData from "@/data/gradient-words.json";

// 二维象限组件
function QuadrantLens({ data }: { data: any }) {
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  const quadrants = [
    {
      id: "q1",
      x: "positive",
      y: "positive",
      xLabel: data.xAxis.positive,
      yLabel: data.yAxis.positive,
      words: [...data.xAxis.positiveWords.slice(0, 3), ...data.yAxis.positiveWords.slice(0, 3)].slice(0, 4),
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      id: "q2",
      x: "negative",
      y: "positive",
      xLabel: data.xAxis.negative,
      yLabel: data.yAxis.positive,
      words: [...data.xAxis.negativeWords.slice(0, 3), ...data.yAxis.positiveWords.slice(0, 3)].slice(0, 4),
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      id: "q3",
      x: "negative",
      y: "negative",
      xLabel: data.xAxis.negative,
      yLabel: data.yAxis.negative,
      words: [...data.xAxis.negativeWords.slice(0, 3), ...data.yAxis.negativeWords.slice(0, 3)].slice(0, 4),
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      id: "q4",
      x: "positive",
      y: "negative",
      xLabel: data.xAxis.positive,
      yLabel: data.yAxis.negative,
      words: [...data.xAxis.positiveWords.slice(0, 3), ...data.yAxis.negativeWords.slice(0, 3)].slice(0, 4),
      color: "from-green-500/20 to-teal-500/20",
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{data.name}</h3>
        <p className="text-sm text-[var(--text-tertiary)]">{data.description}</p>
      </div>

      {/* 象限图 */}
      <div className="relative aspect-square max-w-lg mx-auto mb-8">
        {/* 轴标签 */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
          {data.yAxis.name}
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
          {data.xAxis.name}
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
          {quadrants.map((q) => (
            <div
              key={q.id}
              className={`relative rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer card ${
                hoveredQuadrant === q.id ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredQuadrant(q.id)}
              onMouseLeave={() => setHoveredQuadrant(null)}
            >
              {hoveredQuadrant === q.id ? (
                <div className="text-center">
                  <div className="text-xs text-[var(--text-tertiary)] mb-3">
                    {q.xLabel} × {q.yLabel}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {q.words.map((word: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
              )}
            </div>
          ))}
        </div>

        {/* 轴端标签 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-xs text-[var(--text-tertiary)]">
          {data.yAxis.positive}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-xs text-[var(--text-tertiary)]">
          {data.yAxis.negative}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-xs text-[var(--text-tertiary)]">
          {data.xAxis.positive}
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-[var(--text-tertiary)]">
          {data.xAxis.negative}
        </div>
      </div>

      {/* 灰度词 */}
      <div className="card p-4">
        <div className="text-xs text-[var(--text-tertiary)] mb-3 uppercase tracking-wider">灰度中间词</div>
        <div className="flex flex-wrap gap-2">
          {data.gradientWords.map((word: string, index: number) => (
            <span key={index} className="tag tag-gray">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 九宫格组件
function NineGridLens({ data }: { data: any }) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{data.name}</h3>
        <p className="text-sm text-[var(--text-tertiary)]">{data.description}</p>
      </div>

      {/* 九宫格 */}
      <div className="max-w-md mx-auto mb-8">
        <div className="grid grid-cols-4 gap-2">
          {/* 列标题 */}
          <div></div>
          {data.axes[1].values.map((val: string, i: number) => (
            <div key={i} className="text-center text-xs text-[var(--text-tertiary)] py-2">
              {val}
            </div>
          ))}

          {data.grid.map((row: string[], rowIndex: number) => (
            <>
              <div className="flex items-center justify-center text-xs text-[var(--text-tertiary)]">
                {data.axes[0].values[rowIndex]}
              </div>
              {row.map((cell: string, cellIndex: number) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs transition-all duration-300 cursor-pointer card ${
                    hoveredCell === rowIndex * 3 + cellIndex ? "scale-105" : ""
                  }`}
                  onMouseEnter={() => setHoveredCell(rowIndex * 3 + cellIndex)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {hoveredCell === rowIndex * 3 + cellIndex ? (
                    <span className="text-[var(--text-primary)]">{cell}</span>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LensPage() {
  const [selectedDimension, setSelectedDimension] = useState(0);
  const [showGradientWords, setShowGradientWords] = useState(false);
  const currentDimension = dimensionsData.dimensions[selectedDimension];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            认知透镜
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            超越二元对立，用多维透镜观察世界
          </p>
        </div>
      </div>

      {/* 维度选择器 */}
      <div className="border-b border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {dimensionsData.dimensions.map((dim, index) => (
              <button
                key={dim.id}
                onClick={() => setSelectedDimension(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDimension === index
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {dim.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 可视化区域 */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div key={selectedDimension} className="animate-fade-in">
          {currentDimension.type === "quadrant" ? (
            <QuadrantLens data={currentDimension} />
          ) : (
            <NineGridLens data={currentDimension} />
          )}
        </div>
      </div>

      {/* 灰度词库 */}
      <div className="border-t border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <button
            onClick={() => setShowGradientWords(!showGradientWords)}
            className="w-full card p-4 flex items-center justify-center gap-3 hover:bg-[var(--bg-secondary)] transition-all"
          >
            <span className="font-medium text-[var(--text-primary)]">
              {showGradientWords ? "隐藏" : "查看"}灰度中间词库
            </span>
            <svg
              className={`w-4 h-4 text-[var(--text-tertiary)] transition-transform ${
                showGradientWords ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showGradientWords && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 animate-slide-up">
              {gradientWordsData.gradientWords.map((word, index) => (
                <div key={index} className="card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold gradient-text">{word.word}</span>
                    <span className="text-xs text-[var(--text-tertiary)] font-mono">{word.pinyin}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    {word.description}
                  </p>
                  <div className="text-xs text-[var(--text-tertiary)]">
                    介于:{" "}
                    {word.between.map((w: string, i: number) => (
                      <span key={w} className="text-[var(--accent)]">
                        「{w}」{i < word.between.length - 1 && " / "}
                      </span>
                    ))}{" "}
                    之间
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
