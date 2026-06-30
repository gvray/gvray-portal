# GVRAY Portal

> GVRay 技术探索空间 — 开源项目 3D 星云导航门户

[gvray.com](https://gvray.com)

## 技术栈

- **Framework** — Next.js 16 (App Router, Static Export)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 + CSS Variables (Design Tokens)
- **3D** — Three.js + 原生 Canvas (节点图)
- **Particles** — tsparticles (星云背景)
- **Icons** — Lucide React
- **Variants** — CVA + clsx + tailwind-merge

## 架构

```
src/
  app/                 # 路由 & 全局样式
  components/
    business/          # 页面级业务组件
    ui/                # 原子组件 (CVA 驱动)
  providers/           # Context Providers
  lib/                 # 工具 & 数据
  styles/              # 动画层
```

分层：业务 page → 业务组件 → 基础组件 (Variants) → Tailwind → Design Tokens

## 特性

- 暗色 / 亮色双主题（自动保存偏好）
- 暗色主题：3D 交互式项目星云图（Three.js）
- 亮色主题：卡片式项目列表
- 全站语义化 className（DevTools 可识别组件边界）

## 本地开发

```bash
pnpm install
pnpm dev
pnpm build    # 静态导出到 out/
```
