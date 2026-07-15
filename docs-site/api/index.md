# API 概览

Nomio.World 提供 RESTful API 用于管理域名和邮箱。

## API 地址

```
https://nomio-api.pages.dev
```

## 认证方式

使用 JWT Token 进行认证：

```bash
Authorization: Bearer <your-token>
```

JWT Token 有效期为 **24 小时**，过期后需要重新登录。

## API 端点

### 认证

| 方法 | 端点 | 说明 | 认证 |
|------|------|------|------|
| POST | /auth/register | 注册账号 | ❌ |
| POST | /auth/login | 登录 | ❌ |
| POST | /auth/logout | 退出 | ❌ |
| GET | /auth/me | 获取用户信息 | ✅ |

### 域名

| 方法 | 端点 | 说明 | 认证 |
|------|------|------|------|
| GET | /domains | 获取域名信息 | ✅ |
| POST | /domains/register | 注册域名 | ✅ |
| PUT | /domains | 更新域名 | ✅ |
| DELETE | /domains | 删除域名 | ✅ |
| POST | /domains/verify | 验证源站 | ✅ |

### 邮箱

| 方法 | 端点 | 说明 | 认证 |
|------|------|------|------|
| GET | /mails | 获取邮件列表 | ✅ |
| GET | /mails/stats | 获取邮件统计 | ✅ |
| GET | /mails/:id | 获取邮件详情 | ✅ |
| POST | /mails/register | 注册邮箱 | ✅ |
| PUT | /mails/:id/read | 标记已读 | ✅ |
| PUT | /mails/:id/unread | 标记未读 | ✅ |
| PUT | /mails/:id/star | 切换星标 | ✅ |
| DELETE | /mails/:id | 删除邮件 | ✅ |
| DELETE | /mails | 批量删除邮件 | ✅ |
| PUT | /mails/read | 批量标记已读 | ✅ |
| PUT | /mails/unread | 批量标记未读 | ✅ |

### 设置

| 方法 | 端点 | 说明 | 认证 |
|------|------|------|------|
| GET | /settings/email | 获取邮箱设置 | ✅ |
| PUT | /settings/email | 更新邮箱设置 | ✅ |

### 健康检查

| 方法 | 端点 | 说明 | 认证 |
|------|------|------|------|
| GET | /health | 健康检查 | ❌ |

## 请求示例

### 注册账号

```bash
curl -X POST https://nomio-api.pages.dev/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

### 登录

```bash
curl -X POST https://nomio-api.pages.dev/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "password123"
  }'
```

### 获取域名信息

```bash
curl https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>"
```

## 响应格式

### 成功响应

```json
{
  "success": true,
  "data": {
    // 响应数据
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误信息"
  }
}
```

## 错误码

| 错误码 | 说明 |
|--------|------|
| UNAUTHORIZED | 未认证 |
| INVALID_TOKEN | 令牌无效 |
| TOKEN_EXPIRED | 令牌过期 |
| RATE_LIMITED | 请求过于频繁 |
| INVALID_INPUT | 输入无效 |
| INVALID_JSON | JSON 格式无效 |
| NOT_FOUND | 资源不存在 |
| CONFLICT | 资源冲突 |
| USERNAME_TAKEN | 用户名已存在 |
| VERIFY_FAILED | 验证失败 |
| INTERNAL_ERROR | 服务器内部错误 |

## 速率限制

API 有频率限制，超出限制会返回 429 状态码：

| 端点 | 限制 | 时间窗口 |
|------|------|----------|
| 登录 | 5 次 | 1 分钟 |
| 注册 | 3 次 | 1 小时 |
| API | 60 次 | 1 分钟 |
| 邮件 | 10 次 | 1 小时 |

响应头包含速率限制信息：
- `X-RateLimit-Limit`: 最大请求数
- `X-RateLimit-Remaining`: 剩余请求数
- `X-RateLimit-Reset`: 重置时间

## 安全头

所有 API 响应包含以下安全头：

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 下一步

- [认证 API](/api/auth) - 了解认证接口
- [域名 API](/api/domains) - 了解域名接口
- [邮箱 API](/api/mails) - 了解邮箱接口
- [设置 API](/api/settings) - 了解设置接口
