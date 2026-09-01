// Cloudflare Workers 入口：托管 Vite 构建产物 dist/，并补上浏览器缓存头。
//
// 为什么用代码设头：Cloudflare Workers Static Assets 不会自动读取项目里的
// `public/_headers` 文件；缓存策略必须在这里用代码设置。
//   - 带内容哈希的 /assets/* ：长效缓存（内容不变 → 文件名不变 → 命中浏览器缓存）
//   - index.html 等         ：不缓存，保证内容更新能被及时拉取
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    const headers = new Headers(response.headers);
    if (url.pathname.startsWith('/assets/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      headers.set('Cache-Control', 'no-cache');
    }
    return new Response(response.body, {
      status: response.status,
      headers,
    });
  },
};
