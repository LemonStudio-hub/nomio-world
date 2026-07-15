# Dashboard Deployment

This chapter introduces how to deploy the Dashboard frontend.

## Build

### Install Dependencies

```bash
cd dashboard
npm install
```

### Build Project

```bash
npm run build
```

Build output is in the `dist` directory.

## Deploy to Cloudflare Pages

### Create Project

```bash
wrangler pages project create nomio-dashboard
```

### Deploy

```bash
wrangler pages deploy dist --project-name=nomio-dashboard
```

### View Deployment

After deployment, the access URL will be displayed:
```
https://nomio-dashboard.pages.dev
```

## Custom Domain

### Add Custom Domain

1. Go to Cloudflare Dashboard → Pages
2. Select project
3. Click "Custom domains"
4. Add domain

### Configure DNS

Add CNAME record:
```
docs.nomio.world  CNAME  nomio-dashboard.pages.dev
```

## Environment Variables

### Configure API URL

Configure API URL in Dashboard:

```typescript
// src/api/request.ts
const API_BASE = 'https://nomio-api.pages.dev';
```

### Build-time Variables

Can inject environment variables at build time:

```bash
VITE_API_URL=https://nomio-api.pages.dev npm run build
```

## Local Development

### Start Development Server

```bash
npm run dev
```

Visit http://localhost:5173

### Configure Proxy

Configure proxy in `vite.config.ts`:

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

## Common Questions

### Build Failed

Check:
- Node.js version
- Dependencies installed
- TypeScript type errors

### Blank Page

Check:
- API URL is correct
- Network connection
- Browser console errors

### Style Issues

Check:
- CSS variables defined
- Dark mode working
- Responsive layout

## Optimization

### Code Splitting

Vite supports code splitting by default, no additional configuration needed.

### Resource Optimization

- Image compression
- Font optimization
- Code compression

### Cache Strategy

Cloudflare Pages automatically configures caching:
- HTML: no-cache
- Static assets: max-age=31536000

## Monitoring

### View Analytics

In Cloudflare Dashboard → Pages → Analytics:
- Page views
- Traffic sources
- Performance metrics

### Error Monitoring

Recommend integrating error monitoring services:
- Sentry
- LogRocket
- Bugsnag
