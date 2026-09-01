import { defineConfig } from 'vite';

// Vibe Coding UI 组件词典 — Vite 构建配置
//
// 目标：
// 1. 关注点分离：HTML(index.html) / 样式(src/style.css) / 行为(src/app.js) 各自独立。
// 2. 浏览器缓存：构建产物使用「内容哈希文件名」（内容不变 → 文件名不变 → 命中浏览器缓存）。
//    首次访问下载 index.html + style.css + app.js；之后若只改 HTML，CSS/JS 直接命中本地缓存。
// 3. 并行下载：构建后 HTML 内同时出现 <link rel="stylesheet"> 与 <script type=module>，
//    浏览器在解析 HTML 时并行发起 CSS/JS 请求，互不阻塞。
//
// 部署提示：静态服务器/ CDN 应对带哈希的 assets/* 设置长效缓存
//   Cache-Control: public, max-age=31536000, immutable
// 并对 index.html 设置较短缓存（或 no-cache），保证内容更新可被及时拉取。
export default defineConfig({
  // 相对 base：产物可部署到任意子路径 / 静态托管根目录
  base: './',
  build: {
    target: 'es2018',
    cssCodeSplit: true, // 保证 CSS 独立成文件，便于单独缓存
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 内容哈希：未变动的资源文件名不变，命中浏览器缓存
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
});
