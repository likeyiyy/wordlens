"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Simple inline icons - Vercel style
const Icons = {
  logo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  ),
  home: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  scales: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v18" />
      <path d="M6 6l12 12" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
    </svg>
  ),
  compound: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  lens: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
  github: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { href: "/", label: "首页", icon: "home" },
  { href: "/antonyms", label: "反义词库", icon: "scales" },
  { href: "/compounds", label: "双字词", icon: "compound" },
  { href: "/lens", label: "认知透镜", icon: "lens" },
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="app-sidebar" role="navigation">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2" aria-label="WordLens">
            <div className="text-white">
              <Icons.logo />
            </div>
            <span className="font-semibold text-sm">WordLens</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="px-3">
            {/* Section label */}
            <div className="mb-2 px-3">
              <span className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                导航
              </span>
            </div>

            {/* Nav items */}
            <div className="space-y-0.5">
              {NAV_ITEMS.map(({ href, label, icon }) => {
                const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                const IconComponent = Icons[icon as keyof typeof Icons];

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-md text-sm transition-all ${
                      isActive
                        ? "text-white bg-white/10 font-medium"
                        : "text-[var(--muted-foreground)] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="opacity-80">
                      <IconComponent />
                    </span>
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)]">
          <a
            href="https://github.com/likeyiyy/wordlens"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-white transition-colors"
          >
            <span className="opacity-80">
              <Icons.github />
            </span>
            <span>GitHub</span>
          </a>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          const IconComponent = Icons[icon as keyof typeof Icons];

          return (
            <Link
              key={href}
              href={href}
              className={`mobile-nav-item ${isActive ? "active" : ""}`}
            >
              <span className="opacity-80">
                <IconComponent />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
