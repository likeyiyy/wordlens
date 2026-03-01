import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "认知透镜 | 中文反义词与认知框架",
  description: "以反义词为起点，探索人类从二元对立到多维认知的思维路径",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen">
        <nav className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                  认知透镜
                </a>
              </div>
              <div className="flex items-center space-x-8">
                <a href="/antonyms" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                  反义词库
                </a>
                <a href="/compounds" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                  双字词
                </a>
                <a href="/lens" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                  认知透镜
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
            <p>以语言为镜，映照认知的边界</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
