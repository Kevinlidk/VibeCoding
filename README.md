# Vibe Coding · UI 组件精准描述词典

把脑子里的样子写成标准名称，再交给模型。

本仓库是一个单文件、零依赖的前端词典站：收录了大量 UI 组件的中文名、英文名、别名、适用场景，以及可直接交给 AI 生成同款组件的英文 / 中文 Prompt。所有组件卡片样式一致，每个组件上方是一个可交互的示例，下方是可一键复制的 Prompt。

## 在线访问

https://vibecoding.kevinlidk.cn

## 功能特性

- **组件词典**：按钮、输入、选择、滑块、日期时间、菜单、导航、卡片、数据展示、标签、折叠、浮层、反馈、加载、空状态、布局、智能应用、树、移动端、桌面端等分类。
- **可交互示例**：每个组件卡片内置一个真实可点的迷你 Demo，直观呈现交互与状态。
- **精准 Prompt**：每张卡片提供英文与中文 Prompt，按 `名称 + 变体 + 结构 + 交互 + 状态 + 动效` 的约定描述，模型可直接复现。
- **即时筛选**：支持按中文名、英文名或别名搜索，按分类快速过滤。
- **双主题**：内置深色 / 浅色两套配色，一键切换。
- **移动端适配**：针对手机端做了响应式优化，各类屏幕尺寸下布局合理、可读且交互正常。

## 技术说明

- **Vite 工程化**：结构（HTML）、样式（CSS）、行为（JS）三者分离，便于团队协作与维护。
  - `index.html` — 页面结构（入口，引用 `/src/main.js`）。
  - `src/style.css` — 全部样式。
  - `src/app.js` — 全部交互逻辑（原内联脚本提取而来）。
  - `src/main.js` — 装配入口，引入样式与行为。
- **零运行时依赖**：页面本身不依赖任何第三方库，构建后仍是纯静态资源。
- **构建产物可缓存**：`npm run build` 输出的 `style.css` / `app.js` 使用内容哈希文件名，可长期缓存在用户浏览器；后续访问仅重新下载体积很小的 `index.html`。

## 本地预览

```bash
# 开发模式（热更新）
npm install
npm run dev

# 生产构建（输出到 dist/）
npm run build

# 本地预览构建产物
npm run preview
```

也可不构建直接查看源码结构：用任意静态服务器打开仓库根目录即可。

## 构建与缓存策略

- **内容哈希命名**：构建产物形如 `assets/index.a1b2c3.css` / `assets/index.d4e5f6.js`。内容不变 → 文件名不变 → 命中浏览器缓存。
- **并行下载**：构建后 `index.html` 内同时出现 `<link rel="stylesheet">` 与 `<script type="module">`，浏览器解析 HTML 时并行请求 CSS 与 JS，互不阻塞。
- **部署建议（缓存头）**：静态服务器 / CDN 对带哈希的 `assets/*` 设置长效缓存
  `Cache-Control: public, max-age=31536000, immutable`；
  对 `index.html` 设置较短缓存或 `no-cache`，保证内容更新可被及时拉取。

## 项目结构

```
VibeCoding/
├── index.html        # 页面结构（入口，引用 /src/main.js）
├── package.json      # 依赖与脚本（dev / build / preview）
├── vite.config.js    # Vite 配置（内容哈希、CSS 代码分割、相对 base）
├── src/
│   ├── main.js       # 装配入口：引入 style.css 与 app.js
│   ├── style.css     # 全部样式
│   └── app.js        # 全部交互逻辑（原内联脚本）
├── dist/             # 生产构建产物（npm run build 生成，已 gitignore）
└── README.md         # 本文件
```

## 许可证

本项目仅供学习与交流使用。
