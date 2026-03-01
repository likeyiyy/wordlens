import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

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
      <body>
        {/* Global Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="app-main-with-sidebar">{children}</main>

        {/* Footer */}
        <footer className="app-main-with-sidebar border-t border-[var(--border)] py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <p className="text-sm text-[var(--muted-foreground)]">
                  以语言为镜，映照认知的边界
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
                <a href="https://github.com/likeyiyy/wordlens" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
                <span>© 2026 WordLens</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
