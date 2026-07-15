# 部署概览

本章介绍如何自部署 Nomio.World。

## 架构说明

Nomio.World 由以下组件组成：

| 组件 | 说明 | 部署方式 |
|------|------|----------|
| API Worker | API 服务 | Cloudflare Workers |
| Gateway Worker | 域名转发 | Cloudflare Workers |
| Email Worker | 邮件接收 | Cloudflare Workers |
| Dashboard | 前端界面 | Cloudflare Pages |
| Database | 数据库 | Cloudflare D1 |
| Cache/Rate Limit | 缓存和限速 | Cloudflare KV（可选） |

## 前置要求

### Cloudflare 账户

需要 Cloudflare 账户和以下权限：
- Workers
- D1
- Pages
- Email Routing
- KV（可选，用于缓存和速率限制）

### 开发环境

- Node.js >= 18
- npm 或 yarn
- Git
- Wrangler CLI

## 部署步骤

### 1. 克隆仓库

```bash
git clone https://github.com/LemonStudio-hub/nomio-world.git
cd nomio-world
```

### 2. 安装依赖

```bash
# API Worker
cd workers/api && npm install

# Gateway Worker
cd ../gateway && npm install

# Email Worker
cd ../email && npm install

# Dashboard
cd ../../dashboard && npm install
```

### 3. 创建数据库

```bash
wrangler d1 create nomio-db
```

### 4. 配置环境变量

更新 `workers/*/wrangler.toml` 中的配置：
- `database_id` - D1 数据库 ID

设置 JWT_SECRET：
```bash
cd workers/api
wrangler secret put JWT_SECRET
```

### 5. 初始化数据库

```bash
wrangler d1 execute nomio-db --file=../../schema.sql
```

### 6. 部署 Workers

```bash
# API Worker
cd workers/api && wrangler deploy

# Gateway Worker
cd ../gateway && wrangler deploy

# Email Worker
cd ../email && wrangler deploy
```

### 7. 部署 Dashboard

```bash
cd dashboard
npm run build
wrangler pages deploy dist --project-name=nomio-dashboard
```

## 使用部署脚本

项目提供了一键部署脚本：

```bash
# 完整部署
./deploy.sh all

# 仅部署数据库
./deploy.sh db

# 仅部署 API Worker
./deploy.sh api

# 仅部署 Gateway Worker
./deploy.sh gateway

# 仅部署 Email Worker
./deploy.sh email

# 仅部署 Dashboard
./deploy.sh dashboard

# 运行测试
./deploy.sh test
```

## 配置说明

### DNS 配置

| 类型 | 名称 | 内容 | 代理状态 |
|------|------|------|----------|
| A | *.nomio.world | 192.0.2.1 | 已代理 |
| A | nomio.world | 192.0.2.1 | 已代理 |
| MX | nomio.world | route.mx.cloudflare.net | DNS only |

### Email Routing

1. 进入 Cloudflare Dashboard → Email
2. 启用 Email Routing
3. 配置 Catch-all 规则 → 路由到 Email Worker

### KV 命名空间（可选）

用于缓存和速率限制：

```bash
# 创建 KV 命名空间
wrangler kv namespace create RATE_LIMIT_KV
wrangler kv namespace create CACHE_KV

# 更新 wrangler.toml
[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "<your-kv-id>"

[[kv_namespaces]]
binding = "CACHE_KV"
id = "<your-kv-id>"
```

## 环境变量

### API Worker

| 变量 | 说明 | 必填 |
|------|------|------|
| JWT_SECRET | JWT 密钥 | ✅ |
| ALLOWED_ORIGINS | 允许的来源（逗号分隔） | ✅ |

### Email Worker

| 变量 | 说明 | 默认值 |
|------|------|--------|
| MAX_MAIL_SIZE | 最大邮件大小（字节） | 5242880 (5MB) |
| RATE_LIMIT_COUNT | 频率限制次数 | 3 |
| RATE_LIMIT_WINDOW | 频率限制窗口（秒） | 300 |

## 下一步

- [Workers 部署](/deploy/workers) - 了解 Workers 部署详情
- [Dashboard 部署](/deploy/dashboard) - 了解 Dashboard 部署详情
- [DNS 配置](/deploy/dns) - 了解 DNS 配置
- [Email Routing](/deploy/email-routing) - 了解 Email Routing 配置
