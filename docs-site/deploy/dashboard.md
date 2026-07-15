# Dashboard 部署

本章介绍如何部署 Dashboard 前端。

## 构建

### 安装依赖

```bash
cd dashboard
npm install
```

### 构建项目

```bash
npm run build
```

构建产物在 `dist` 目录。

## 部署到 Cloudflare Pages

### 创建项目

```bash
wrangler pages project create nomio-dashboard
```

### 部署

```bash
wrangler pages deploy dist --project-name=nomio-dashboard
```

### 查看部署

部署完成后会显示访问地址：
```
https://nomio-dashboard.pages.dev
```

## 自定义域名

### 添加自定义域名

1. 进入 Cloudflare Dashboard → Pages
2. 选择项目
3. 点击"Custom domains"
4. 添加域名

### 配置 DNS

添加 CNAME 记录：
```
docs.nomio.world  CNAME  nomio-dashboard.pages.dev
```

## 环境变量

### 配置 API 地址

在 Dashboard 中配置 API 地址：

```typescript
// src/api/request.ts
const API_BASE = 'https://nomio-api.pages.dev';
```

### 构建时变量

可以在构建时注入环境变量：

```bash
VITE_API_URL=https://nomio-api.pages.dev npm run build
```

## 本地开发

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 配置代理

在 `vite.config.ts` 中配置代理：

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://nomio-api.pages.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

## 常见问题

### 构建失败

检查：
- Node.js 版本
- 依赖是否安装完整
- TypeScript 类型错误

### 页面空白

检查：
- API 地址是否正确
- 网络连接是否正常
- 浏览器控制台错误

### 样式异常

检查：
- CSS 变量是否正确定义
- 暗色模式是否正常
- 响应式布局是否正常

## 优化

### 代码分割

Vite 默认支持代码分割，无需额外配置。

### 资源优化

- 图片压缩
- 字体优化
- 代码压缩

### 缓存策略

Cloudflare Pages 自动配置缓存：
- HTML：no-cache
- 静态资源：max-age=31536000

## 监控

### 查看分析

在 Cloudflare Dashboard → Pages → Analytics 查看：
- 页面浏览量
- 访问来源
- 性能指标

### 错误监控

建议集成错误监控服务：
- Sentry
- LogRocket
- Bugsnag
