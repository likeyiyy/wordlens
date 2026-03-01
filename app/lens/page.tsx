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
    },
    {
      id: "q2",
      x: "negative",
      y: "positive",
      xLabel: data.xAxis.negative,
      yLabel: data.yAxis.positive,
      words: [...data.xAxis.negativeWords.slice(0, 3), ...data.yAxis.positiveWords.slice(0, 3)].slice(0, 4),
    },
    {
      id: "q3",
      x: "negative",
      y: "negative",
      xLabel: data.xAxis.negative,
      yLabel: data.yAxis.negative,
      words: [...data.xAxis.negativeWords.slice(0, 3), ...data.yAxis.negativeWords.slice(0, 3)].slice(0, 4),
    },
    {
      id: "q4",
      x: "positive",
      y: "negative",
      xLabel: data.xAxis.positive,
      yLabel: data.yAxis.negative,
      words: [...data.xAxis.positiveWords.slice(0, 3), ...data.yAxis.negativeWords.slice(0, 3)].slice(0, 4),
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-8 text-center gradient-text">
        {data.name}
      </h3>

      {/* Quadrant Grid */}
      <div className="relative aspect-square max-w-lg mx-auto mb-8">
        {/* Y-axis label */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium">
          {data.yAxis.name}
        </div>

        {/* X-axis label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium">
          {data.xAxis.name}
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
          {quadrants.map((q, idx) => (
            <div
              key={q.id}
              className={`relative rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                hoveredQuadrant === q.id
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 glow scale-105"
                  : "glass-card hover:scale-[1.02]"
              }`}
              onMouseEnter={() => setHoveredQuadrant(q.id)}
              onMouseLeave={() => setHoveredQuadrant(null)}
            >
              {hoveredQuadrant === q.id ? (
                <div className="text-center animate-fade-in-up">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {q.xLabel} × {q.yLabel}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {q.words.map((word: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/80 dark:bg-gray-800/80 rounded-lg text-sm shadow-sm">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse-soft" />
              )}
            </div>
          ))}
        </div>

        {/* Axis labels */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pr-6 text-xs text-gray-400">
          {data.yAxis.positive}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pr-6 text-xs text-gray-400">
          {data.yAxis.negative}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-xs text-gray-400">
          {data.xAxis.positive}
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-gray-400">
          {data.xAxis.negative}
        </div>
      </div>

      {/* Gradient words */}
      <div className="text-center mb-8">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">灰度中间词</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {data.gradientWords.map((word: string, index: number) => (
            <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm border border-purple-200 dark:border-purple-800">
              {word}
            </span>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400 text-sm glass-card rounded-xl p-4">
        {data.description}
      </p>
    </div>
  );
}

// 九宫格组件
function NineGridLens({ data }: { data: any }) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-8 text-center gradient-text">
        {data.name}
      </h3>

      {/* Nine Grid */}
      <div className="max-w-md mx-auto mb-8">
        {/* Row labels */}
        <div className="grid grid-cols-4 gap-2 mb-2 text-center text-xs text-gray-500">
          <div></div>
          <div className="font-medium">{data.axes[1].values[0]}</div>
          <div className="font-medium">{data.axes[1].values[1]}</div>
          <div className="font-medium">{data.axes[1].values[2]}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {data.grid.map((row: string[], rowIndex: number) => (
            <>
              <div className="flex items-center justify-center text-xs text-gray-500 font-medium">
                {data.axes[0].values[rowIndex]}
              </div>
              {row.map((cell: string, cellIndex: number) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-300 cursor-pointer ${
                    hoveredCell === rowIndex * 3 + cellIndex
                      ? "bg-gradient-to-br from-orange-500/20 to-amber-500/20 glow-secondary scale-105"
                      : "glass-card hover:scale-[1.02]"
                  }`}
                  onMouseEnter={() => setHoveredCell(rowIndex * 3 + cellIndex)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {hoveredCell === rowIndex * 3 + cellIndex ? (
                    <span className="text-xs animate-fade-in-up">{cell}</span>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-orange-400 to-amber-500" />
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400 text-sm glass-card rounded-xl p-4">
        {data.description}
      </p>
    </div>
  );
}

export default function LensPage() {
  const [selectedDimension, setSelectedDimension] = useState(0);
  const [showGradientWords, setShowGradientWords] = useState(false);

  const currentDimension = dimensionsData.dimensions[selectedDimension];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">认知透镜</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          超越二元对立，用多维透镜观察世界
        </p>
      </div>

      {/* Concept Intro */}
      <div className="glass-card rounded-2xl p-8 mb-12">
        <h2 className="text-xl font-bold mb-6 gradient-text">为什么需要多维透镜？</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="glass-card rounded-xl p-5 hover-lift">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold mb-3 glow">
              1
            </div>
            <div className="font-medium text-blue-600 dark:text-blue-400 mb-2">二元对立</div>
            <p className="text-gray-600 dark:text-gray-400">
              「高/低」「冷/热」是最基础的认知框架，但现实往往不是非此即彼。
            </p>
          </div>
          <div className="glass-card rounded-xl p-5 hover-lift">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold mb-3">
              2
            </div>
            <div className="font-medium text-purple-600 dark:text-purple-400 mb-2">灰度边界</div>
            <p className="text-gray-600 dark:text-gray-400">
              「温」「中等」「普通」这些词提醒我们，世界存在大量中间状态。
            </p>
          </div>
          <div className="glass-card rounded-xl p-5 hover-lift">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold mb-3 glow-secondary">
              3
            </div>
            <div className="font-medium text-orange-600 dark:text-orange-400 mb-2">多维视角</div>
            <p className="text-gray-600 dark:text-gray-400">
              用二维象限或九宫格，可以同时观察两个维度，避免「二极管思维」。
            </p>
          </div>
        </div>
      </div>

      {/* Dimension Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {dimensionsData.dimensions.map((dim, index) => (
          <button
            key={dim.id}
            onClick={() => setSelectedDimension(index)}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              selectedDimension === index
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg glow"
                : "glass-card text-gray-700 dark:text-gray-300 hover:bg-white/30"
            }`}
          >
            {dim.name}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="mb-12 animate-fade-in-up" key={selectedDimension}>
        {currentDimension.type === "quadrant" ? (
          <QuadrantLens data={currentDimension} />
        ) : (
          <NineGridLens data={currentDimension} />
        )}
      </div>

      {/* Gradient Words Section */}
      <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-10">
        <button
          onClick={() => setShowGradientWords(!showGradientWords)}
          className="w-full max-w-md mx-auto glass-card rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-white/30 transition"
        >
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {showGradientWords ? "隐藏" : "查看"}灰度中间词库
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${showGradientWords ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showGradientWords && (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto animate-fade-in-up">
            {gradientWordsData.gradientWords.map((word, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-5 hover-lift"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold gradient-text-secondary">
                    {word.word}
                  </span>
                  <span className="text-xs text-gray-400">{word.pinyin}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {word.description}
                </p>
                <div className="text-xs text-gray-500 glass-card rounded-lg p-2 inline-block">
                  介于:{" "}
                  {word.between.map((w: string, i: number) => (
                    <span key={w} className="text-purple-600 dark:text-purple-400 font-medium">
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
  );
}
