# 域名 API

## 获取域名信息

获取当前用户的域名信息。

### 请求

```
GET /domains
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
    "origin_host": "",
    "verify_status": "verified",
    "created_at": "2024-01-01T00:00:00Z"
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
| created_at | string | 创建时间 |

## 注册域名

注册二级域名。

### 请求

```
POST /domains/register
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
    "originUrl": "https://myapp.vercel.app",
    "originHost": ""
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "originUrl": "https://myapp.vercel.app",
    "originHost": "",
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
    "code": 409,
    "message": "Domain already registered"
  }
}
```

## 更新域名

更新域名配置。

### 请求

```
PUT /domains
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

删除域名。

### 请求

```
DELETE /domains
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
  "success": true
}
```

## 验证源站

验证源站所有权。

### 请求

```
POST /domains/verify
```

### 请求头

```
Authorization: Bearer <your-token>
```

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
    "code": 400,
    "message": "Verification failed"
  }
}
```

## 验证状态

| 状态 | 说明 |
|------|------|
| pending | 待验证 |
| verified | 已验证 |
| failed | 验证失败 |
