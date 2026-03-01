import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 animate-fade-in-up">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 blur-xl animate-pulse-soft"></div>
          <h1 className="relative text-6xl md:text-7xl font-bold gradient-text animate-gradient">
            认知透镜
          </h1>
        </div>
        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 animate-fade-in-up animation-delay-100">
          中文反义词与认知框架
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          以反义词为起点，探索人类从二元对立到多维认知的思维路径
        </p>
      </section>

      {/* Concept Cards */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <Link
          href="/antonyms"
          className="group glass-card rounded-2xl p-8 hover-lift animate-fade-in-up animation-delay-300"
        >
          <div className="text-4xl mb-4 animate-float">⚖️</div>
          <h2 className="text-xl font-semibold mb-3 gradient-text">二元对立</h2>
          <p className="text-gray-600 dark:text-gray-400">
            高低、冷热、多少... 探索语言中最基础的认知框架
          </p>
          <div className="mt-4 flex items-center text-blue-500 dark:text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            探索 →
          </div>
        </Link>

        <Link
          href="/compounds"
          className="group glass-card rounded-2xl p-8 hover-lift animate-fade-in-up animation-delay-400"
        >
          <div className="text-4xl mb-4 animate-float" style={{ animationDelay: "0.5s" }}>🔗</div>
          <h2 className="text-xl font-semibold mb-3 gradient-text-secondary">词语拓展</h2>
          <p className="text-gray-600 dark:text-gray-400">
            从单字到双字，看词语如何承载更丰富的语义
          </p>
          <div className="mt-4 flex items-center text-orange-500 dark:text-orange-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            探索 →
          </div>
        </Link>

        <Link
          href="/lens"
          className="group glass-card rounded-2xl p-8 hover-lift animate-fade-in-up animation-delay-500"
        >
          <div className="text-4xl mb-4 animate-float" style={{ animationDelay: "1s" }}>🔮</div>
          <h2 className="text-xl font-semibold mb-3 gradient-text">多维透镜</h2>
          <p className="text-gray-600 dark:text-gray-400">
            超越二分法，用二维象限和九宫格观察世界
          </p>
          <div className="mt-4 flex items-center text-blue-500 dark:text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            探索 →
          </div>
        </Link>
      </section>

      {/* Philosophy Section */}
      <section className="glass-card rounded-2xl p-8 mb-16 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-8 text-center gradient-text">核心理念</h2>

        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold glow">
              1
            </div>
            <div className="flex-1 glass-card rounded-xl p-5 hover-lift">
              <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">认知起点：二元对立</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                人类认识世界的起点是区分：高低、上下、冷热、明暗。这些反义词凝结了最朴素的认知框架。
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="flex-1 glass-card rounded-xl p-5 hover-lift">
              <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">认知挑战：灰色边界</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                现实并非总是非此即彼。"温"、"中等"、"普通" 这些中间态词语，提醒我们认知的模糊地带。
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold glow-secondary">
              3
            </div>
            <div className="flex-1 glass-card rounded-xl p-5 hover-lift">
              <h3 className="font-semibold mb-2 text-orange-600 dark:text-orange-400">认知进化：多维透镜</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                从二元到多维：二维象限、九宫格等模型，是观察世界的更精细工具。避免"二极管思维"，拥抱复杂性。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
        <div className="glass-card rounded-2xl p-6 text-center hover-lift">
          <div className="text-4xl font-bold gradient-text mb-2">50+</div>
          <div className="text-gray-600 dark:text-gray-400">反义词对</div>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center hover-lift">
          <div className="text-4xl font-bold gradient-text-secondary mb-2">4</div>
          <div className="text-gray-600 dark:text-gray-400">认知维度</div>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center hover-lift">
          <div className="text-4xl font-bold gradient-text mb-2">200+</div>
          <div className="text-gray-600 dark:text-gray-400">拓展词语</div>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center hover-lift">
          <div className="text-4xl font-bold gradient-text-secondary mb-2">∞</div>
          <div className="text-gray-600 dark:text-gray-400">认知可能</div>
        </div>
      </section>
    </div>
  );
}
