import ProjectGraph from "./components/ProjectGraph";
import StarfieldBackground from "./components/StarfieldBackground";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div className="relative shrink-0 pb-6">
        <StarfieldBackground />
        <HeroSection />
      </div>

      <ProjectGraph />

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
