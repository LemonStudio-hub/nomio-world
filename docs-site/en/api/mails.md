# Mails API

## Get Mail List

Get mail list.

### Request

```
GET /mails
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | ❌ | Page number, default 1 |
| limit | number | ❌ | Items per page, default 20 |
| search | string | ❌ | Search keyword |
| status | string | ❌ | Status filter |
| sort_by | string | ❌ | Sort field |
| sort_order | string | ❌ | Sort direction |
| has_attachments | boolean | ❌ | Has attachments |

### Status Filter

| Value | Description |
|-------|-------------|
| all | All |
| unread | Unread |
| read | Read |
| starred | Starred |

### Sort Fields

| Value | Description |
|-------|-------------|
| received_at | Time |
| size | Size |
| from_address | Sender |
| subject | Subject |

### Example

```bash
curl "https://nomio-api.pages.dev/mails?page=1&limit=20&status=unread" \
  -H "Authorization: Bearer <your-token>"
```

### Response

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

## Get Mail Detail

Get detailed information of a single mail.

### Request

```
GET /mails/:id
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl https://nomio-api.pages.dev/mails/1 \
  -H "Authorization: Bearer <your-token>"
```

### Response

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

## Register Email

Register email address.

### Request

```
POST /mails/register
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| forwardEmail | string | ❌ | Forward email |

### Example

```bash
curl -X POST https://nomio-api.pages.dev/mails/register \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "forwardEmail": "alice@gmail.com"
  }'
```

### Response

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

## Mark as Read

Mark mail as read.

### Request

```
PUT /mails/:id/read
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl -X PUT https://nomio-api.pages.dev/mails/1/read \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true
}
```

## Mark as Unread

Mark mail as unread.

### Request

```
PUT /mails/:id/unread
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl -X PUT https://nomio-api.pages.dev/mails/1/unread \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true
}
```

## Toggle Star

Toggle mail star status.

### Request

```
PUT /mails/:id/star
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl -X PUT https://nomio-api.pages.dev/mails/1/star \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true,
  "data": {
    "is_starred": true
  }
}
```

## Delete Mail

Delete a single mail.

### Request

```
DELETE /mails/:id
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl -X DELETE https://nomio-api.pages.dev/mails/1 \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true
}
```

## Batch Delete Mails

Batch delete multiple mails.

### Request

```
POST /mails
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | number[] | ✅ | Mail ID list |

### Example

```bash
curl -X POST https://nomio-api.pages.dev/mails \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [1, 2, 3]
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "deleted": 3
  }
}
```

## Batch Mark as Read

Batch mark multiple mails as read.

### Request

```
PUT /mails/read
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | number[] | ✅ | Mail ID list |

### Example

```bash
curl -X PUT https://nomio-api.pages.dev/mails/read \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [1, 2, 3]
  }'
```

### Response

```json
{
  "success": true
}
```

## Batch Mark as Unread

Batch mark multiple mails as unread.

### Request

```
PUT /mails/unread
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | number[] | ✅ | Mail ID list |

### Example

```bash
curl -X PUT https://nomio-api.pages.dev/mails/unread \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [1, 2, 3]
  }'
```

### Response

```json
{
  "success": true
}
```

## Get Mail Statistics

Get mail statistics.

### Request

```
GET /mails/stats
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl https://nomio-api.pages.dev/mails/stats \
  -H "Authorization: Bearer <your-token>"
```

### Response

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
