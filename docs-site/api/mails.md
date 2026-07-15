# 邮箱 API

## 获取邮件列表

获取邮件列表。

### 请求

```
GET /mails
```

### 请求头

```
Authorization: Bearer <your-token>
```

### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | ❌ | 页码，默认 1 |
| limit | number | ❌ | 每页数量，默认 20 |
| search | string | ❌ | 搜索关键词 |
| status | string | ❌ | 状态筛选 |
| sort_by | string | ❌ | 排序字段 |
| sort_order | string | ❌ | 排序方向 |
| has_attachments | boolean | ❌ | 是否有附件 |

### 状态筛选

| 值 | 说明 |
|------|------|
| all | 全部 |
| unread | 未读 |
| read | 已读 |
| starred | 星标 |

### 排序字段

| 值 | 说明 |
|------|------|
| received_at | 时间 |
| size | 大小 |
| from_address | 发件人 |
| subject | 主题 |

### 示例

```bash
curl "https://nomio-api.pages.dev/mails?page=1&limit=20&status=unread" \
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
        "received_at": "2024-01-15T12:00:00Z",
        "size": 1024,
        "is_read": false,
        "is_starred": false,
        "has_attachments": false,
        "preview": "Hello, how are you?"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    },
    "stats": {
      "total": 100,
      "unread": 10,
      "starred": 5,
      "with_attachments": 20,
      "total_size": 10485760
    }
  }
}
```

## 获取邮件详情

获取单封邮件的详细信息。

### 请求

```
GET /mails/:id
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
    "received_at": "2024-01-15T12:00:00Z",
    "size": 1024,
    "is_read": true,
    "is_starred": false,
    "has_attachments": true,
    "preview": "Hello, how are you?",
    "body": "Hello, how are you?",
    "html_body": "<p>Hello, how are you?</p>",
    "text_body": "Hello, how are you?",
    "message_id": "<abc123@example.com>",
    "in_reply_to": null,
    "references": [],
    "user_id": 1,
    "attachments": [
      {
        "filename": "document.pdf",
        "content_type": "application/pdf",
        "size": 102400,
        "content_id": null
      }
    ],
    "headers": {
      "From": "sender@example.com",
      "To": "alice@nomio.world",
      "Subject": "Hello"
    }
  }
}
```

## 注册邮箱

注册邮箱地址。

### 请求

```
POST /mails/register
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
PUT /mails/:id/read
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
  "success": true
}
```

## 标记未读

标记邮件为未读。

### 请求

```
PUT /mails/:id/unread
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
  "success": true
}
```

## 切换星标

切换邮件的星标状态。

### 请求

```
PUT /mails/:id/star
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
DELETE /mails/:id
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
  "success": true
}
```

## 批量删除邮件

批量删除多封邮件。

### 请求

```
POST /mails
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
curl -X POST https://nomio-api.pages.dev/mails \
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
PUT /mails/read
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
  "success": true
}
```

## 批量标记未读

批量标记多封邮件为未读。

### 请求

```
PUT /mails/unread
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
  "success": true
}
```

## 获取邮件统计

获取邮件统计信息。

### 请求

```
GET /mails/stats
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
    "with_attachments": 20,
    "total_size": 10485760,
    "by_date": [
      { "date": "2024-01-15", "count": 10 },
      { "date": "2024-01-14", "count": 8 }
    ],
    "top_senders": [
      { "address": "sender@example.com", "count": 15 },
      { "address": "other@example.com", "count": 10 }
    ]
  }
}
```
