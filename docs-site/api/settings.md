# 设置 API

## 获取邮箱设置

获取当前用户的邮箱设置。

### 请求

```
GET /api/settings/email
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl https://nomio-api.pages.dev/settings/email \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "email": "alice@nomio.world",
    "forwardEmail": "alice@gmail.com",
    "emailEnabled": true,
    "totalMailSize": 1048576,
    "quota": 104857600
  }
}
```

### 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| email | string | 邮箱地址 |
| forwardEmail | string | 转发邮箱 |
| emailEnabled | boolean | 是否启用邮箱 |
| totalMailSize | number | 邮件总大小（字节） |
| quota | number | 存储配额（字节，默认 100MB） |

## 更新邮箱设置

更新邮箱设置。

### 请求

```
PUT /api/settings/email
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| forwardEmail | string | ❌ | 转发邮箱 |
| emailEnabled | boolean | ❌ | 是否启用邮箱 |

### 示例

```bash
curl -X PUT https://nomio-api.pages.dev/settings/email \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "forwardEmail": "new-email@gmail.com",
    "emailEnabled": true
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "email": "alice@nomio.world",
    "forwardEmail": "new-email@gmail.com",
    "emailEnabled": true
  }
}
```

## 设置说明

### 转发邮箱

- 设置转发邮箱后，收到的邮件会自动转发到该邮箱
- 留空则不转发
- 支持任何邮箱地址

### 启用邮箱

- 启用：正常接收邮件
- 禁用：停止接收邮件

### 存储配额

- 每个用户有 100MB 的存储配额
- 超出配额后自动删除最早的邮件
- 可以在设置页面查看使用情况
