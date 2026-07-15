# 认证 API

## 注册账号

注册新用户。

### 请求

```
POST /auth/register
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | ✅ | 用户名 |
| password | string | ✅ | 密码 |

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

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": 409,
    "message": "Username already exists"
  }
}
```

## 登录

用户登录。

### 请求

```
POST /auth/login
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

## 退出

用户退出。

### 请求

```
POST /auth/logout
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl -X POST https://nomio-api.pages.dev/auth/logout \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true
}
```

## 获取用户信息

获取当前登录用户的详细信息。

### 请求

```
GET /auth/me
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
    "origin_host": "",
    "forward_email": "alice@gmail.com",
    "email_enabled": true,
    "status": "active",
    "verify_status": "verified",
    "has_domain": true,
    "has_email": true,
    "created_at": "2024-01-01T00:00:00Z",
    "last_login_at": "2024-01-15T12:00:00Z",
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
| forward_email | string | 转发邮箱 |
| email_enabled | boolean | 邮箱是否启用 |
| status | string | 账号状态 |
| verify_status | string | 验证状态 |
| has_domain | boolean | 是否注册域名 |
| has_email | boolean | 是否注册邮箱 |
| created_at | string | 注册时间 |
| last_login_at | string | 最后登录时间 |
| total_mail_size | number | 邮件总大小（字节） |
