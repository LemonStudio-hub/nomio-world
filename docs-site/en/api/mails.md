# Mails API

## Get Mail List

Get mail list.

### Request

```
GET /api/mails
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | ❌ | Page number, default 1 |
| limit | number | ❌ | Items per page, default 20, max 100 |
| status | string | ❌ | Status filter |
| search | string | ❌ | Search keyword |
| sort_by | string | ❌ | Sort field |
| sort_order | string | ❌ | Sort direction |

### Status Filter

| Value | Description |
|-------|-------------|
| all | All (default) |
| unread | Unread |
| read | Read |
| starred | Starred |

### Sort Fields

| Value | Description |
|-------|-------------|
| received_at | Time (default) |
| size | Size |
| from_address | Sender |
| subject | Subject |

### Example

```bash
curl "https://nomio-api.pages.dev/mails?page=1&limit=20&status=unread&sort_by=received_at&sort_order=desc" \
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

## Get Mail Statistics

Get mail statistics.

### Request

```
GET /api/mails/stats
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
    "total_size": 10485760
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| total | number | Total mails |
| unread | number | Unread mails |
| starred | number | Starred mails |
| total_size | number | Total size (bytes) |

## Get Mail Detail

Get detailed information of a single mail.

### Request

```
GET /api/mails/:id
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
    "received_at": "2026-01-15T12:00:00Z",
    "size": 1024,
    "is_read": true,
    "is_starred": false,
    "body": "Hello, how are you?",
    "html_body": "<p>Hello, how are you?</p>"
  }
}
```

::: tip Note
Getting mail detail will automatically mark as read.
:::

## Register Email

Register email address.

### Request

```
POST /api/mails/register
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
PUT /api/mails/:id/read
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
  "success": true,
  "data": {
    "message": "Marked as read"
  }
}
```

## Mark as Unread

Mark mail as unread.

### Request

```
PUT /api/mails/:id/unread
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
  "success": true,
  "data": {
    "message": "Marked as unread"
  }
}
```

## Toggle Star

Toggle mail star status.

### Request

```
PUT /api/mails/:id/star
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
DELETE /api/mails/:id
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
  "success": true,
  "data": {
    "message": "Mail deleted"
  }
}
```

## Batch Delete Mails

Batch delete multiple mails.

### Request

```
DELETE /api/mails
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
curl -X DELETE https://nomio-api.pages.dev/mails \
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
PUT /api/mails/read
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
  "success": true,
  "data": {
    "message": "Batch marked as read"
  }
}
```

## Batch Mark as Unread

Batch mark multiple mails as unread.

### Request

```
PUT /api/mails/unread
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
  "success": true,
  "data": {
    "message": "Batch marked as unread"
  }
}
```
