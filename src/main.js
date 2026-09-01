// 应用入口（装配层）：仅负责把「样式」与「行为」挂载到页面。
// 关注点分离：HTML 负责结构、style.css 负责样式、app.js 负责行为。
// Vite 会把本文件及其依赖打包，并将 CSS 提取为独立文件（可被浏览器单独缓存、与 JS 并行下载）。
import './style.css';
import './app.js';
