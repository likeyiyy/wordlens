"use client";

import { useState } from "react";
import dimensionsData from "@/data/dimensions.json";
import gradientWordsData from "@/data/gradient-words.json";

// Quadrant Component
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
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">{data.name}</h3>
        <p className="text-sm text-[var(--muted-foreground)]">{data.description}</p>
      </div>

      {/* Quadrant Grid */}
      <div className="relative aspect-square max-w-lg mx-auto mb-8">
        {/* Axis labels */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
          {data.yAxis.name}
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
          {data.xAxis.name}
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
          {quadrants.map((q) => (
            <div
              key={q.id}
              className={`relative rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer bg-white/5 border border-white/10 ${
                hoveredQuadrant === q.id ? "scale-105 bg-white/10" : ""
              }`}
              onMouseEnter={() => setHoveredQuadrant(q.id)}
              onMouseLeave={() => setHoveredQuadrant(null)}
            >
              {hoveredQuadrant === q.id ? (
                <div className="text-center">
                  <div className="text-xs text-[var(--muted-foreground)] mb-4">
                    {q.xLabel} × {q.yLabel}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {q.words.map((word: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-white/10 rounded-md text-xs text-white">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/30" />
              )}
            </div>
          ))}
        </div>

        {/* Axis endpoint labels */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-xs text-[var(--muted-foreground)]">
          {data.yAxis.positive}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-xs text-[var(--muted-foreground)]">
          {data.yAxis.negative}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-xs text-[var(--muted-foreground)]">
          {data.xAxis.positive}
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-[var(--muted-foreground)]">
          {data.xAxis.negative}
        </div>
      </div>

      {/* Gradient words */}
      <div className="card p-5">
        <div className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-4">灰度中间词</div>
        <div className="flex flex-wrap gap-2">
          {data.gradientWords.map((word: string, index: number) => (
            <span key={index} className="badge">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Nine Grid Component
function NineGridLens({ data }: { data: any }) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">{data.name}</h3>
        <p className="text-sm text-[var(--muted-foreground)]">{data.description}</p>
      </div>

      {/* Nine Grid */}
      <div className="max-w-md mx-auto mb-8">
        <div className="grid grid-cols-4 gap-1">
          {/* Column headers */}
          <div></div>
          {data.axes[1].values.map((val: string, i: number) => (
            <div key={i} className="text-center text-xs text-[var(--muted-foreground)] py-3">
              {val}
            </div>
          ))}

          {data.grid.map((row: string[], rowIndex: number) => (
            <>
              <div className="flex items-center justify-center text-xs text-[var(--muted-foreground)]">
                {data.axes[0].values[rowIndex]}
              </div>
              {row.map((cell: string, cellIndex: number) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  className={`aspect-square rounded-md flex items-center justify-center text-xs transition-all duration-300 cursor-pointer bg-white/5 border border-white/10 ${
                    hoveredCell === rowIndex * 3 + cellIndex ? "scale-105 bg-white/10" : ""
                  }`}
                  onMouseEnter={() => setHoveredCell(rowIndex * 3 + cellIndex)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {hoveredCell === rowIndex * 3 + cellIndex ? (
                    <span className="text-white">{cell}</span>
                  ) : (
                    <div className="w-1 h-1 rounded-full bg-white/40" />
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
      <div className="border-b border-[var(--border)]">
        <div className="container section">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gradient">
            认知透镜
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl text-lg">
            超越二元对立，用多维透镜观察世界
          </p>
        </div>
      </div>

      {/* Dimension Selector */}
      <div className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/80 backdrop-blur-sm z-30">
        <div className="container py-4">
          <div className="flex flex-wrap gap-1.5">
            {dimensionsData.dimensions.map((dim, index) => (
              <button
                key={dim.id}
                onClick={() => setSelectedDimension(index)}
                className={`h-9 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedDimension === index
                    ? "bg-white text-black"
                    : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                }`}
              >
                {dim.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="container section">
        <div key={selectedDimension} className="animate-fade-in">
          {currentDimension.type === "quadrant" ? (
            <QuadrantLens data={currentDimension} />
          ) : (
            <NineGridLens data={currentDimension} />
          )}
        </div>
      </div>

      {/* Gradient Words Section */}
      <div className="border-t border-[var(--border)]">
        <div className="container section">
          <button
            onClick={() => setShowGradientWords(!showGradientWords)}
            className="w-full card p-5 flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
          >
            <span className="font-medium text-white">
              {showGradientWords ? "隐藏" : "查看"}灰度中间词库
            </span>
            <svg
              className={`w-4 h-4 text-[var(--muted-foreground)] transition-transform ${
                showGradientWords ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showGradientWords && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 animate-slide-up">
              {gradientWordsData.gradientWords.map((word, index) => (
                <div key={index} className="card card-hover p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-semibold text-white">{word.word}</span>
                    <span className="text-xs text-[var(--muted-foreground)] font-mono">{word.pinyin}</span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mb-5 leading-relaxed">
                    {word.description}
                  </p>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    介于:{" "}
                    {word.between.map((w: string, i: number) => (
                      <span key={w} className="text-white/80">
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
