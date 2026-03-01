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
      position: "top-right"
    },
    {
      id: "q2",
      x: "negative",
      y: "positive",
      xLabel: data.xAxis.negative,
      yLabel: data.yAxis.positive,
      words: [...data.xAxis.negativeWords.slice(0, 3), ...data.yAxis.positiveWords.slice(0, 3)].slice(0, 4),
      position: "top-left"
    },
    {
      id: "q3",
      x: "negative",
      y: "negative",
      xLabel: data.xAxis.negative,
      yLabel: data.yAxis.negative,
      words: [...data.xAxis.negativeWords.slice(0, 3), ...data.yAxis.negativeWords.slice(0, 3)].slice(0, 4),
      position: "bottom-left"
    },
    {
      id: "q4",
      x: "positive",
      y: "negative",
      xLabel: data.xAxis.positive,
      yLabel: data.yAxis.negative,
      words: [...data.xAxis.positiveWords.slice(0, 3), ...data.yAxis.negativeWords.slice(0, 3)].slice(0, 4),
      position: "bottom-right"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        {data.name}
      </h3>

      {/* Quadrant Grid */}
      <div className="relative aspect-square max-w-lg mx-auto mb-6">
        {/* Y-axis label */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {data.yAxis.name}
        </div>

        {/* X-axis label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {data.xAxis.name}
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full border border-gray-300 dark:border-gray-700">
          {quadrants.map((q) => (
            <div
              key={q.id}
              className={`relative p-4 flex flex-col items-center justify-center transition cursor-pointer ${
                hoveredQuadrant === q.id
                  ? "bg-blue-100 dark:bg-blue-900/30"
                  : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onMouseEnter={() => setHoveredQuadrant(q.id)}
              onMouseLeave={() => setHoveredQuadrant(null)}
            >
              {hoveredQuadrant === q.id ? (
                <div className="text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {q.xLabel} × {q.yLabel}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {q.words.map((word: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-white dark:bg-gray-900 rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600" />
              )}
            </div>
          ))}
        </div>

        {/* Axis labels */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pr-8 text-xs text-gray-500">
          {data.yAxis.positive}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pr-8 text-xs text-gray-500">
          {data.yAxis.negative}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-xs text-gray-500">
          {data.xAxis.positive}
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-gray-500">
          {data.xAxis.negative}
        </div>
      </div>

      {/* Gradient words */}
      <div className="text-center mb-8">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">灰度中间词</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {data.gradientWords.map((word: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
              {word}
            </span>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
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
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        {data.name}
      </h3>

      {/* Nine Grid */}
      <div className="max-w-md mx-auto mb-6">
        {/* Row labels */}
        <div className="grid grid-cols-4 gap-1 mb-2 text-center text-xs text-gray-500">
          <div></div>
          <div>{data.axes[1].values[0]}</div>
          <div>{data.axes[1].values[1]}</div>
          <div>{data.axes[1].values[2]}</div>
        </div>

        <div className="grid grid-cols-4 gap-1">
          {data.grid.map((row: string[], rowIndex: number) => (
            <>
              <div className="flex items-center justify-center text-xs text-gray-500">
                {data.axes[0].values[rowIndex]}
              </div>
              {row.map((cell: string, cellIndex: number) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  className={`aspect-square flex items-center justify-center text-sm transition cursor-pointer ${
                    hoveredCell === rowIndex * 3 + cellIndex
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onMouseEnter={() => setHoveredCell(rowIndex * 3 + cellIndex)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {hoveredCell === rowIndex * 3 + cellIndex ? cell : "·"}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
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
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">认知透镜</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          超越二元对立，用多维透镜观察世界
        </p>
      </div>

      {/* Concept Intro */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">为什么需要多维透镜？</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <div className="font-medium text-blue-600 dark:text-blue-400 mb-2">二元对立</div>
            <p>「高/低」「冷/热」是最基础的认知框架，但现实往往不是非此即彼。</p>
          </div>
          <div>
            <div className="font-medium text-purple-600 dark:text-purple-400 mb-2">灰度边界</div>
            <p>「温」「中等」「普通」这些词提醒我们，世界存在大量中间状态。</p>
          </div>
          <div>
            <div className="font-medium text-green-600 dark:text-green-400 mb-2">多维视角</div>
            <p>用二维象限或九宫格，可以同时观察两个维度，避免「二极管思维」。</p>
          </div>
        </div>
      </div>

      {/* Dimension Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {dimensionsData.dimensions.map((dim, index) => (
          <button
            key={dim.id}
            onClick={() => setSelectedDimension(index)}
            className={`px-5 py-2 rounded-full transition ${
              selectedDimension === index
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {dim.name}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="mb-12">
        {currentDimension.type === "quadrant" ? (
          <QuadrantLens data={currentDimension} />
        ) : (
          <NineGridLens data={currentDimension} />
        )}
      </div>

      {/* Gradient Words Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
        <button
          onClick={() => setShowGradientWords(!showGradientWords)}
          className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <span className="text-gray-700 dark:text-gray-300">
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
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {gradientWordsData.gradientWords.map((word, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-medium text-purple-600 dark:text-purple-400">
                    {word.word}
                  </span>
                  <span className="text-xs text-gray-400">{word.pinyin}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {word.description}
                </p>
                <div className="text-xs text-gray-500">
                  介于:{" "}
                  {word.between.map((w: string) => (
                    <span key={w} className="mx-1">
                      「{w}」
                    </span>
                  ))}
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
