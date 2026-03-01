import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Vercel style */}
      <section className="relative border-b border-[var(--border)]">
        <div className="container section">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-[var(--muted-foreground)] mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>探索中文认知框架</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 animate-slide-up">
              <span className="text-gradient">以语言为镜，</span>
              <br />
              <span className="text-gradient">映照认知边界</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mb-10 animate-slide-up delay-100">
              从反义词到多维透镜，探索人类从二元对立到复杂认知的思维演进路径。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-up delay-200">
              <Link href="/antonyms" className="btn btn-primary">
                开始探索
                <svg className="w-4 h-4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/lens" className="btn btn-secondary">
                查看演示
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-white/3 rounded-full blur-[80px]" />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="section">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">核心模块</h2>
            <span className="text-sm text-[var(--muted-foreground)]">3 个板块</span>
          </div>

          <div className="bento-grid">
            {/* 反义词库 - Large card */}
            <Link
              href="/antonyms"
              className="bento-item group cursor-pointer hover:bg-white/[0.02] transition-colors md:row-span-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-2xl">⚖️</span>
                </div>
                <svg className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">反义词库</h3>
              <p className="text-[var(--muted-foreground)] text-sm mb-6 max-w-sm">
                融合《反义词大全》PDF 与 GLM-5 AI 判定，共 1,715 对中文反义词
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge">上下</span>
                <span className="badge">冷热</span>
                <span className="badge">多少</span>
                <span className="badge">是非</span>
                <span className="badge">AI判定</span>
              </div>
            </Link>

            {/* 双字词 */}
            <Link
              href="/compounds"
              className="bento-item group cursor-pointer hover:bg-white/[0.02] transition-colors md:row-span-2"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <span className="text-xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">词语拓展</h3>
              <p className="text-[var(--muted-foreground)] text-sm mb-6">
                从单字到双字词的语义拓展
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[var(--muted-foreground)]">高</span>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                  <span className="text-white">高级</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[var(--muted-foreground)]">低</span>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                  <span className="text-white">低级</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[var(--muted-foreground)]">新</span>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                  <span className="text-white">新颖</span>
                </div>
              </div>
            </Link>

            {/* 认知透镜 */}
            <Link
              href="/lens"
              className="bento-item group cursor-pointer hover:bg-white/[0.02] transition-colors md:col-span-2"
            >
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-xl">🔮</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">多维认知透镜</h3>
                  <p className="text-[var(--muted-foreground)] text-sm">
                    二维象限、九宫格可视化，超越二元对立
                  </p>
                </div>
                <div className="hidden sm:flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-white/30" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-white/40" />
                </div>
              </div>
            </Link>

            {/* Stats */}
            <div className="bento-item">
              <div className="text-4xl font-semibold text-gradient mb-1">1,715</div>
              <div className="text-sm text-[var(--muted-foreground)]">反义词对</div>
            </div>

            <div className="bento-item">
              <div className="text-4xl font-semibold text-gradient mb-1">4</div>
              <div className="text-sm text-[var(--muted-foreground)]">认知维度</div>
            </div>

            <div className="bento-item">
              <div className="text-4xl font-semibold text-gradient mb-1">200+</div>
              <div className="text-sm text-[var(--muted-foreground)]">拓展词语</div>
            </div>

            <div className="bento-item">
              <div className="text-4xl font-semibold text-gradient mb-1">∞</div>
              <div className="text-sm text-[var(--muted-foreground)]">认知可能</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gradient">
              认知的三重境界
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg">
              从最朴素的二元区分，到发现灰色地带，再到多维视角的建立
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "二元对立",
                description: "人类认识世界的起点是区分：高低、上下、冷热、明暗。这些反义词凝结了最朴素的认知框架，帮助我们建立最初的世界模型。",
              },
              {
                number: "02",
                title: "灰色边界",
                description: "现实并非总是非此即彼。「温」、「中等」、「普通」这些中间态词语提醒我们，认知存在模糊地带，真理往往在两极之间。",
              },
              {
                number: "03",
                title: "多维透镜",
                description: "从二元到多维：二维象限、九宫格等模型是观察世界的更精细工具。避免「二极管思维」，拥抱复杂性，建立更立体的认知框架。",
              },
            ].map((item, index) => (
              <div key={index} className="card card-hover p-8">
                <div className="text-5xl font-semibold text-white/10 mb-6">{item.number}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section border-t border-[var(--border)]">
        <div className="container">
          <div className="card p-12 md:p-16 text-center glow">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gradient">
              准备好探索认知的边界了吗？
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-xl mx-auto text-lg">
              从 1,715 对反义词开始，逐步建立起更复杂的认知框架
            </p>
            <Link href="/antonyms" className="btn btn-primary">
              开始探索
              <svg className="w-4 h-4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
