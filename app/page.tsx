import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>探索中文认知框架</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
              <span className="text-[var(--text-primary)]">以语言为镜，</span>
              <br />
              <span className="gradient-text">映照认知边界</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mb-10 animate-slide-up animation-delay-100">
              从反义词到多维透镜，探索人类从二元对立到复杂认知的思维演进路径。
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-200">
              <Link
                href="/antonyms"
                className="btn-primary inline-flex items-center gap-2"
              >
                开始探索
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/lens"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-all duration-200"
              >
                查看演示
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid 展示区 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">核心模块</h2>
          <span className="text-sm text-[var(--text-tertiary)]">3 个板块</span>
        </div>

        <div className="bento-grid">
          {/* 反义词库 - 大卡片 */}
          <Link
            href="/antonyms"
            className="card card-hover p-6 bento-col-span-2 bento-row-span-2 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <span className="text-2xl">⚖️</span>
              </div>
              <svg className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">反义词库</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              融合《反义词大全》PDF 与 GLM-5 AI 判定，共 1,715 对中文反义词
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="tag tag-blue">上下</span>
              <span className="tag tag-blue">冷热</span>
              <span className="tag tag-blue">多少</span>
              <span className="tag tag-blue">是非</span>
              <span className="tag tag-purple">AI判定</span>
            </div>
          </Link>

          {/* 双字词 - 竖长卡片 */}
          <Link
            href="/compounds"
            className="card card-hover p-6 bento-row-span-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-4">
              <span className="text-xl">🔗</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">词语拓展</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              从单字到双字词的语义拓展
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[var(--text-tertiary)]">高</span>
                <div className="flex-1 h-px bg-[var(--border-color)]" />
                <span className="text-blue-400">高级</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[var(--text-tertiary)]">低</span>
                <div className="flex-1 h-px bg-[var(--border-color)]" />
                <span className="text-orange-400">低级</span>
              </div>
            </div>
          </Link>

          {/* 认知透镜 - 横长卡片 */}
          <Link
            href="/lens"
            className="card card-hover p-6 bento-col-span-2 group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-xl">🔮</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">多维认知透镜</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  二维象限、九宫格可视化，超越二元对立
                </p>
              </div>
              <div className="hidden sm:flex gap-1">
                <div className="w-3 h-3 rounded bg-[var(--bg-tertiary)]" />
                <div className="w-3 h-3 rounded bg-[var(--bg-tertiary)]" />
                <div className="w-3 h-3 rounded bg-[var(--bg-tertiary)]" />
              </div>
            </div>
          </Link>

          {/* 数据统计卡片 */}
          <div className="card p-6">
            <div className="text-3xl font-bold gradient-text mb-1">1715</div>
            <div className="text-sm text-[var(--text-tertiary)]">反义词对</div>
          </div>

          <div className="card p-6">
            <div className="text-3xl font-bold gradient-text mb-1">4</div>
            <div className="text-sm text-[var(--text-tertiary)]">认知维度</div>
          </div>

          <div className="card p-6">
            <div className="text-3xl font-bold gradient-text mb-1">200+</div>
            <div className="text-sm text-[var(--text-tertiary)]">拓展词语</div>
          </div>

          <div className="card p-6">
            <div className="text-3xl font-bold gradient-text mb-1">∞</div>
            <div className="text-sm text-[var(--text-tertiary)]">认知可能</div>
          </div>
        </div>
      </section>

      {/* 理念说明区 */}
      <section className="border-t border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
              认知的三重境界
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              从最朴素的二元区分，到发现灰色地带，再到多维视角的建立
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                二元对立
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                人类认识世界的起点是区分：高低、上下、冷热、明暗。这些反义词凝结了最朴素的认知框架，帮助我们建立最初的世界模型。
              </p>
            </div>

            <div className="card p-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                灰色边界
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                现实并非总是非此即彼。"温"、"中等"、"普通" 这些中间态词语提醒我们，认知存在模糊地带，真理往往在两极之间。
              </p>
            </div>

            <div className="card p-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                多维透镜
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                从二元到多维：二维象限、九宫格等模型是观察世界的更精细工具。避免"二极管思维"，拥抱复杂性，建立更立体的认知框架。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="card p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
              准备好探索认知的边界了吗？
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              从 1,715 对反义词开始，逐步建立起更复杂的认知框架
            </p>
            <Link href="/antonyms" className="btn-primary inline-flex items-center gap-2">
              开始探索
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
