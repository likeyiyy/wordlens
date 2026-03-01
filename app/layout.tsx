import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "认知透镜 | 中文反义词与认知框架",
  description: "以反义词为起点，探索人类从二元对立到多维认知的思维路径",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-white/20"
    >
      {children}
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen">
        {/* 毛玻璃导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
              >
                <span className="text-2xl">🔮</span>
                <span>认知透镜</span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                <NavLink href="/antonyms">反义词库</NavLink>
                <NavLink href="/compounds">双字词</NavLink>
                <NavLink href="/lens">认知透镜</NavLink>
              </div>
              {/* 移动端菜单按钮 */}
              <button className="md:hidden p-2 rounded-lg hover:bg-white/20 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* 主内容区域 */}
        <main className="pt-20">{children}</main>

        {/* 页脚 */}
        <footer className="glass-card border-t border-white/10 mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">以语言为镜，映照认知的边界</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Made with 🔮 by{" "}
              <a href="https://github.com/likeyiyy/wordlens" className="hover:text-blue-500 transition" target="_blank" rel="noopener noreferrer">
                WordLens
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
