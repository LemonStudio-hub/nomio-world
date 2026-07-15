# 认证 API

## 注册账号

注册新用户。

### 请求

```
POST /api/auth/register
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | ✅ | 用户名（3-32字符，小写字母、数字、连字符） |
| password | string | ✅ | 密码（8-128字符） |

### 示例

```bash
curl -X POST https://nomio-api.pages.dev/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "alice",
      "hasDomain": false,
      "hasEmail": false
    }
  }
}
```

### 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| token | string | JWT Token（有效期 24 小时） |
| user.username | string | 用户名 |
| user.hasDomain | boolean | 是否已注册域名 |
| user.hasEmail | boolean | 是否已注册邮箱 |

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "USERNAME_TAKEN",
    "message": "该用户名已被注册"
  }
}
```

### 速率限制

- 每小时 3 次/IP

## 登录

用户登录。

### 请求

```
POST /api/auth/login
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | ✅ | 用户名 |
| password | string | ✅ | 密码 |

### 示例

```bash
curl -X POST https://nomio-api.pages.dev/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "alice",
      "hasDomain": true,
      "hasEmail": true
    }
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "用户名或密码错误"
  }
}
```

### 速率限制

- 每分钟 5 次/IP

## 退出

用户退出。

### 请求

```
POST /api/auth/logout
```

### 示例

```bash
curl -X POST https://nomio-api.pages.dev/auth/logout \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "message": "已退出登录"
  }
}
```

::: tip 说明
退出接口仅作语义占位，实际退出需要客户端清除 Token。
:::

## 获取用户信息

获取当前登录用户的详细信息。

### 请求

```
GET /api/auth/me
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl https://nomio-api.pages.dev/auth/me \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "username": "alice",
    "origin_url": "https://myapp.vercel.app",
    "origin_host": "myapp.vercel.app",
    "has_domain": true,
    "has_email": true,
    "forward_email": "alice@gmail.com",
    "email_enabled": true,
    "status": "active",
    "verify_status": "verified",
    "created_at": "2026-01-01T00:00:00Z",
    "last_login_at": "2026-01-15T12:00:00Z",
    "total_mail_size": 1048576
  }
}
```

### 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| username | string | 用户名 |
| origin_url | string | 源站地址 |
| origin_host | string | 回源 Host |
| has_domain | boolean | 是否注册域名 |
| has_email | boolean | 是否注册邮箱 |
| forward_email | string | 转发邮箱 |
| email_enabled | boolean | 邮箱是否启用 |
| status | string | 账号状态 |
| verify_status | string | 验证状态 |
| created_at | string | 注册时间 |
| last_login_at | string | 最后登录时间 |
| total_mail_size | number | 邮件总大小（字节） |

## 用户名规则

- 长度：3-32 字符
- 允许字符：小写字母、数字、连字符
- 不能以连字符开头或结尾
- 不能包含连续的连字符
- 不能使用保留词（如 admin、api、www 等）

## 安全说明

- 密码使用 PBKDF2 算法哈希（SHA-256，100,000 次迭代）
- JWT Token 有效期 24 小时
- 登录和注册有速率限制保护
