import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          认知透镜
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4">
          中文反义词与认知框架
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
          以反义词为起点，探索人类从二元对立到多维认知的思维路径
        </p>
      </section>

      {/* Concept Cards */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <Link href="/antonyms" className="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition hover:shadow-lg">
          <div className="text-3xl mb-4">⚖️</div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">二元对立</h2>
          <p className="text-gray-600 dark:text-gray-400">
            高低、冷热、多少... 探索语言中最基础的认知框架
          </p>
        </Link>

        <Link href="/compounds" className="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition hover:shadow-lg">
          <div className="text-3xl mb-4">🔗</div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">词语拓展</h2>
          <p className="text-gray-600 dark:text-gray-400">
            从单字到双字，看词语如何承载更丰富的语义
          </p>
        </Link>

        <Link href="/lens" className="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition hover:shadow-lg">
          <div className="text-3xl mb-4">🔮</div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">多维透镜</h2>
          <p className="text-gray-600 dark:text-gray-400">
            超越二分法，用二维象限和九宫格观察世界
          </p>
        </Link>
      </section>

      {/* Philosophy Section */}
      <section className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">核心理念</h2>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">认知起点：二元对立</h3>
            <p className="text-gray-600 dark:text-gray-400">
              人类认识世界的起点是区分：高低、上下、冷热、明暗。这些反义词凝结了最朴素的认知框架。
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold mb-2">认知挑战：灰色边界</h3>
            <p className="text-gray-600 dark:text-gray-400">
              现实并非总是非此即彼。"温"、"中等"、"普通" 这些中间态词语，提醒我们认知的模糊地带。
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-2">认知进化：多维透镜</h3>
            <p className="text-gray-600 dark:text-gray-400">
              从二元到多维：二维象限、九宫格等模型，是观察世界的更精细工具。避免"二极管思维"，拥抱复杂性。
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
          <div className="text-gray-600 dark:text-gray-400">反义词对</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">4</div>
          <div className="text-gray-600 dark:text-gray-400">认知维度</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">200+</div>
          <div className="text-gray-600 dark:text-gray-400">拓展词语</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">∞</div>
          <div className="text-gray-600 dark:text-gray-400">认知可能</div>
        </div>
      </section>
    </div>
  );
}
