"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { projects, categoryColors, categoryColorsLight } from "@/lib/projects";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

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
    <div className="project-list relative z-10 flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            as="a"
            interactive
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
                {project.name}
              </h3>
              <Badge color={colors[project.category]}>
                {categoryLabels[project.category]}
              </Badge>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
              {project.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
