export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  category: "frontend" | "backend" | "tool" | "ai" | "other";
}

export const projects: Project[] = [
  {
    id: "gvray-react",
    name: "gvray-react",
    description:
      "Enterprise React + Umi + Ant Design RBAC Admin Dashboard",
    githubUrl: "https://github.com/gvray/gvray-react",
    category: "frontend",
  },
  {
    id: "gvray-admin",
    name: "gvray-admin",
    description:
      "Enterprise Admin API & Permission System built with NestJS + Prisma + MySQL",
    githubUrl: "https://github.com/gvray/gvray-admin",
    category: "backend",
  },
  {
    id: "request",
    name: "request",
    description:
      "Unified request standard and wrapper for Web & cross-platform apps",
    githubUrl: "https://github.com/gvray/request",
    category: "tool",
  },
  {
    id: "storetify",
    name: "storetify",
    description: "Easier localStorage state management utility",
    githubUrl: "https://github.com/gvray/storetify",
    category: "tool",
  },
  {
    id: "toolkit",
    name: "toolkit",
    description:
      "TypeScript-friendly modular utility library (domkit, eskit, etc.)",
    githubUrl: "https://github.com/gvray/toolkit",
    category: "tool",
  },
  {
    id: "lavy",
    name: "lavy",
    description:
      "CodeLint CLI for engineering standards and workflow enforcement",
    githubUrl: "https://github.com/gvray/lavy",
    category: "tool",
  },
  {
    id: "swiftlet",
    name: "swiftlet",
    description: "Build tool experiments for modern Web development",
    githubUrl: "https://github.com/gvray/swiftlet",
    category: "tool",
  },
  {
    id: "gvray-portal",
    name: "gvray-portal",
    description: "GVRay 技术官网 — 3D 星云项目导航门户",
    githubUrl: "https://github.com/gvray/gvray-portal",
    category: "frontend",
  },
  {
    id: "logger",
    name: "logger",
    description: "Lightweight, structured logging utility for browser & Node.js",
    githubUrl: "https://github.com/gvray/logger",
    category: "tool",
  },
  {
    id: "gvray-vue",
    name: "gvray-vue",
    description: "Enterprise Vue 3 + Vite + Element Plus admin dashboard",
    githubUrl: "https://github.com/gvray/gvray-vue",
    category: "frontend",
  },
  {
    id: "fe-interview",
    name: "fe-interview",
    description: "Frontend interview questions & answers collection",
    githubUrl: "https://github.com/gvray/fe-interview",
    category: "other",
  },
  {
    id: "hooks",
    name: "hooks",
    description: "Practical React hooks collection for everyday development",
    githubUrl: "https://github.com/gvray/hooks",
    category: "frontend",
  },
];

// Category colors for 3D graph — dark theme
export const categoryColors: Record<Project["category"], string> = {
  frontend: "#00f0ff",
  backend: "#00ff88",
  tool: "#ffcc00",
  ai: "#ff006e",
  other: "#a855f7",
};

// Category colors for light theme — darker / more saturated for contrast
export const categoryColorsLight: Record<Project["category"], string> = {
  frontend: "#0066ff",
  backend: "#009944",
  tool: "#cc8800",
  ai: "#cc0055",
  other: "#7c3aed",
};

// Build links between projects sharing the same category
export function buildLinks(projects: Project[]) {
  const links: { source: string; target: string }[] = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      if (projects[i].category === projects[j].category) {
        links.push({
          source: projects[i].id,
          target: projects[j].id,
        });
      }
    }
  }
  return links;
}
