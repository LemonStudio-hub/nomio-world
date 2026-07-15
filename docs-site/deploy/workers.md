# Workers 部署

本章介绍如何部署 Cloudflare Workers。

## API Worker

### 配置文件

`workers/api/wrangler.toml`：

```toml
name = "nomio-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "nomio-db"
database_id = "<your-database-id>"

[vars]
JWT_SECRET = "<your-jwt-secret>"
ALLOWED_ORIGINS = "*"
```

### 部署命令

```bash
cd workers/api
npm install
wrangler deploy
```

### 环境变量

| 变量 | 说明 | 必填 |
|------|------|------|
| JWT_SECRET | JWT 密钥 | ✅ |
| ALLOWED_ORIGINS | 允许的来源 | ❌ |

## Gateway Worker

### 配置文件

`workers/gateway/wrangler.toml`：

```toml
name = "nomio-gateway"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "nomio-db"
database_id = "<your-database-id>"
```

### 部署命令

```bash
cd workers/gateway
npm install
wrangler deploy
```

## Email Worker

### 配置文件

`workers/email/wrangler.toml`：

```toml
name = "nomio-email"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "nomio-db"
database_id = "<your-database-id>"

[vars]
MAX_MAIL_SIZE = "5242880"
RATE_LIMIT_COUNT = "3"
RATE_LIMIT_WINDOW = "300"
```

### 部署命令

```bash
cd workers/email
npm install
wrangler deploy
```

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| MAX_MAIL_SIZE | 最大邮件大小（字节） | 5242880 (5MB) |
| RATE_LIMIT_COUNT | 频率限制次数 | 3 |
| RATE_LIMIT_WINDOW | 频率限制窗口（秒） | 300 |

## 数据库

### 创建数据库

```bash
wrangler d1 create nomio-db
```

### 获取数据库 ID

创建后会显示数据库 ID，需要更新到 `wrangler.toml` 中。

### 初始化表结构

```bash
wrangler d1 execute nomio-db --file=../schema.sql
```

### 查看数据库

```bash
wrangler d1 execute nomio-db --command "SELECT * FROM users"
```

## 测试

### 运行测试

```bash
# API Worker
cd workers/api && npm test

# Gateway Worker
cd ../gateway && npm test

# Email Worker
cd ../email && npm test
```

### 测试覆盖率

```bash
npm test -- --coverage
```

## 常见问题

### 部署失败

检查：
- Cloudflare 账户权限
- wrangler.toml 配置
- 网络连接

### 数据库连接失败

检查：
- database_id 是否正确
- 数据库是否存在
- 绑定名称是否正确

### 环境变量未生效

检查：
- wrangler.toml 中的配置
- 是否需要重新部署
