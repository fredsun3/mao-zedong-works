# 项目上下文

### 项目概述

毛泽东著作诗词录 - 收录毛泽东同志各历史时期的言论、文章、诗词，按八个历史阶段详尽呈现伟人思想轨迹与文学成就。

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **配色**: 中国红/金为主色调，暖色系

## 目录结构

```
├── public/
│   └── hero-bg.jpeg           # 首页 Hero 背景图（水墨山水风格）
├── scripts/                    # 构建与启动脚本
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局（中文 lang、自定义 metadata）
│   │   ├── page.tsx            # 首页（Hero、时期列表、经典诗词、语录）
│   │   ├── globals.css         # 全局样式（自定义红金配色、诗词排版、动画）
│   │   └── period/
│   │       └── [id]/
│   │           ├── page.tsx    # 阶段详情页（概述、诗词、文章、语录、上下时期导航）
│   │           └── poem/
│   │               └── [poemId]/
│   │                   └── page.tsx  # 诗词详情页（原文、创作背景、上下首导航）
│   ├── components/ui/          # Shadcn UI 组件库
│   ├── hooks/
│   ├── lib/
│   │   ├── utils.ts            # 通用工具函数 (cn)
│   │   └── data.ts             # 核心数据层（8个历史时期、诗词、文章、语录、查询函数）
│   └── server.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 数据结构

核心数据定义在 `src/lib/data.ts`，包含：

- **Period**: 历史时期（id, name, years, description, poems, articles, quotes, color）
- **Poem**: 诗词（id, title, year, content, background）
- **Article**: 文章/讲话（id, title, year, summary, type: article/speech/letter/directive）
- **Quote**: 语录（id, content, source, year）

### 八个历史时期

1. 少年求学时期 (1893-1918)
2. 五四运动与大革命时期 (1919-1927)
3. 土地革命时期 (1927-1937)
4. 抗日战争时期 (1937-1945)
5. 解放战争时期 (1945-1949)
6. 新中国建设时期 (1949-1957)
7. 社会主义探索时期 (1957-1966)
8. 晚年时期 (1966-1976)

### 查询函数

- `getPeriodById(id)` - 按 ID 获取时期
- `getPoemById(periodId, poemId)` - 获取具体诗词
- `getAllPoems()` / `getAllQuotes()` / `getAllArticles()` - 全局查询

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**
