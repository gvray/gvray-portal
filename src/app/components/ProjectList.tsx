"use client";

import { useTheme } from "./ThemeProvider";
import { projects, categoryColors, categoryColorsLight } from "../lib/projects";

const categoryLabels: Record<string, string> = {
  frontend: "前端",
  backend: "后端",
  tool: "工具",
  ai: "AI",
  other: "其他",
};

export default function ProjectList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const colors = isDark ? categoryColors : categoryColorsLight;

  return (
    <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col rounded-2xl border border-border/50 bg-bg-card/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:bg-bg-card/80 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
                {project.name}
              </h3>
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${colors[project.category]}15`,
                  color: colors[project.category],
                }}
              >
                {categoryLabels[project.category]}
              </span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
