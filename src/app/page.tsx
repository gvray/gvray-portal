"use client";

import HeroSection from "./components/HeroSection";
import ProjectGraph from "./components/ProjectGraph";
import ProjectList from "./components/ProjectList";
import StarfieldBackground from "./components/StarfieldBackground";
import { useTheme } from "./components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div className="relative shrink-0">
        <StarfieldBackground />
        <HeroSection />
      </div>

      {isDark ? <ProjectGraph /> : <ProjectList />}

      <footer className="relative z-10 shrink-0 py-1.5 text-center">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-text-secondary/30 hover:text-accent"
        >
          京ICP备2026038034号-1
        </a>
      </footer>
    </div>
  );
}
