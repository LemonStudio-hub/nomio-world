# Settings API

## Get Email Settings

Get current user's email settings.

### Request

```
GET /settings/email
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl https://nomio-api.pages.dev/settings/email \
  -H "Authorization: Bearer <your-token>"
```

### Response

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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| email | string | Email address |
| forwardEmail | string | Forward email |
| emailEnabled | boolean | Email enabled |
| totalMailSize | number | Total mail size (bytes) |
| quota | number | Storage quota (bytes) |

## Update Email Settings

Update email settings.

### Request

```
PUT /settings/email
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| forwardEmail | string | ❌ | Forward email |
| emailEnabled | boolean | ❌ | Email enabled |

### Example

```bash
curl -X PUT https://nomio-api.pages.dev/settings/email \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "forwardEmail": "new-email@gmail.com",
    "emailEnabled": true
  }'
```

### Response

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

## Settings Notes

### Forward Email

- After setting forwarding email, received emails will be automatically forwarded to that email
- Leave empty to disable forwarding
- Supports any email address

### Enable Email

- Enable: Receive emails normally
- Disable: Stop receiving emails

### Storage Quota

- Each user has 100MB storage quota
- After exceeding quota, oldest emails are automatically deleted
- Can view usage on settings page
