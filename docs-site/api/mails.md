# 邮箱 API

## 获取邮件列表

获取邮件列表。

### 请求

```
GET /api/mails
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | ❌ | 页码，默认 1 |
| limit | number | ❌ | 每页数量，默认 20，最大 100 |
| status | string | ❌ | 状态筛选 |
| search | string | ❌ | 搜索关键词 |
| sort_by | string | ❌ | 排序字段 |
| sort_order | string | ❌ | 排序方向 |

### 状态筛选

| 值 | 说明 |
|------|------|
| all | 全部（默认） |
| unread | 未读 |
| read | 已读 |
| starred | 星标 |

### 排序字段

| 值 | 说明 |
|------|------|
| received_at | 时间（默认） |
| size | 大小 |
| from_address | 发件人 |
| subject | 主题 |

### 示例

```bash
curl "https://nomio-api.pages.dev/mails?page=1&limit=20&status=unread&sort_by=received_at&sort_order=desc" \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "mails": [
      {
        "id": 1,
        "from_address": "sender@example.com",
        "to_address": "alice@nomio.world",
        "subject": "Hello",
        "received_at": "2026-01-15T12:00:00Z",
        "size": 1024,
        "is_read": false,
        "is_starred": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

## 获取邮件统计

获取邮件统计信息。

### 请求

```
GET /api/mails/stats
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl https://nomio-api.pages.dev/mails/stats \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "total": 100,
    "unread": 10,
    "starred": 5,
    "total_size": 10485760
  }
}
```

### 响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| total | number | 邮件总数 |
| unread | number | 未读邮件数 |
| starred | number | 星标邮件数 |
| total_size | number | 邮件总大小（字节） |

## 获取邮件详情

获取单封邮件的详细信息。

### 请求

```
GET /api/mails/:id
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl https://nomio-api.pages.dev/mails/1 \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "id": 1,
    "from_address": "sender@example.com",
    "to_address": "alice@nomio.world",
    "subject": "Hello",
    "received_at": "2026-01-15T12:00:00Z",
    "size": 1024,
    "is_read": true,
    "is_starred": false,
    "body": "Hello, how are you?",
    "html_body": "<p>Hello, how are you?</p>"
  }
}
```

::: tip 注意
获取邮件详情会自动标记为已读。
:::

## 注册邮箱

注册邮箱地址。

### 请求

```
POST /api/mails/register
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| forwardEmail | string | ❌ | 转发邮箱 |

### 示例

```bash
curl -X POST https://nomio-api.pages.dev/mails/register \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "forwardEmail": "alice@gmail.com"
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "email": "alice@nomio.world",
    "forwardEmail": "alice@gmail.com",
    "emailEnabled": true
  }
}
```

## 标记已读

标记邮件为已读。

### 请求

```
PUT /api/mails/:id/read
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl -X PUT https://nomio-api.pages.dev/mails/1/read \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "message": "已标记为已读"
  }
}
```

## 标记未读

标记邮件为未读。

### 请求

```
PUT /api/mails/:id/unread
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl -X PUT https://nomio-api.pages.dev/mails/1/unread \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "message": "已标记为未读"
  }
}
```

## 切换星标

切换邮件的星标状态。

### 请求

```
PUT /api/mails/:id/star
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl -X PUT https://nomio-api.pages.dev/mails/1/star \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "is_starred": true
  }
}
```

## 删除邮件

删除单封邮件。

### 请求

```
DELETE /api/mails/:id
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 示例

```bash
curl -X DELETE https://nomio-api.pages.dev/mails/1 \
  -H "Authorization: Bearer <your-token>"
```

### 响应

```json
{
  "success": true,
  "data": {
    "message": "邮件已删除"
  }
}
```

## 批量删除邮件

批量删除多封邮件。

### 请求

```
DELETE /api/mails
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ids | number[] | ✅ | 邮件 ID 列表 |

### 示例

```bash
curl -X DELETE https://nomio-api.pages.dev/mails \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [1, 2, 3]
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "deleted": 3
  }
}
```

## 批量标记已读

批量标记多封邮件为已读。

### 请求

```
PUT /api/mails/read
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ids | number[] | ✅ | 邮件 ID 列表 |

### 示例

```bash
curl -X PUT https://nomio-api.pages.dev/mails/read \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [1, 2, 3]
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "message": "已批量标记为已读"
  }
}
```

## 批量标记未读

批量标记多封邮件为未读。

### 请求

```
PUT /api/mails/unread
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 请求体

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ids | number[] | ✅ | 邮件 ID 列表 |

### 示例

```bash
curl -X PUT https://nomio-api.pages.dev/mails/unread \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [1, 2, 3]
  }'
```

### 响应

```json
{
  "success": true,
  "data": {
    "message": "已批量标记为未读"
  }
}
```
