# 域名 API

## 获取域名信息

获取当前用户的域名信息。

### 请求

```
GET /api/domains
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl https://nomio-api.pages.dev/domains \
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
    "verify_status": "verified",
    "has_domain": true,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

### 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| username | string | 用户名 |
| origin_url | string | 源站地址 |
| origin_host | string | 回源 Host |
| verify_status | string | 验证状态 |
| has_domain | boolean | 是否已注册域名 |
| created_at | string | 创建时间 |

## 注册域名

注册二级域名。

### 请求

```
POST /api/domains/register
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| originUrl | string | ✅ | 源站地址 |
| originHost | string | ❌ | 回源 Host |

### 示例

```bash
curl -X POST https://nomio-api.pages.dev/domains/register \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "originUrl": "https://myapp.vercel.app"
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "originUrl": "https://myapp.vercel.app",
    "originHost": "myapp.vercel.app",
    "verifyToken": "abc123def456",
    "verifyStatus": "pending"
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "域名已注册"
  }
}
```

## 更新域名

更新域名配置。

### 请求

```
PUT /api/domains
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| originUrl | string | ✅ | 源站地址 |
| originHost | string | ❌ | 回源 Host |

### 示例

```bash
curl -X PUT https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "originUrl": "https://new-origin.vercel.app",
    "originHost": "example.com"
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "originUrl": "https://new-origin.vercel.app",
    "originHost": "example.com",
    "verifyStatus": "pending"
  }
}
```

## 删除域名

删除域名（软删除）。

### 请求

```
DELETE /api/domains
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl -X DELETE https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "message": "域名已删除"
  }
}
```

## 验证源站

验证源站所有权。

### 请求

```
POST /api/domains/verify
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 验证机制

1. 请求 `origin_url/.well-known/nomio-verify.txt`
2. 文件内容需精确匹配 `nomio-verify={token}`
3. 超时时间：10 秒

### 示例

```bash
curl -X POST https://nomio-api.pages.dev/domains/verify \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "verifyStatus": "verified"
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "VERIFY_FAILED",
    "message": "验证文件内容不匹配"
  }
}
```

## 验证状态

| 状态 | 说明 |
|------|------|
| pending | 待验证 |
| verified | 已验证 |
| failed | 验证失败 |
