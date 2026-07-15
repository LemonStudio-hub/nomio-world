# Domains API

## Get Domain Info

Get current user's domain information.

### Request

```
GET /api/domains
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>"
```

### Response

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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| username | string | Username |
| origin_url | string | Origin URL |
| origin_host | string | Origin Host |
| verify_status | string | Verify status |
| has_domain | boolean | Has domain registered |
| created_at | string | Created time |

## Register Domain

Register subdomain.

### Request

```
POST /api/domains/register
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| originUrl | string | ✅ | Origin URL |
| originHost | string | ❌ | Origin Host |

### Example

```bash
curl -X POST https://nomio-api.pages.dev/domains/register \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "originUrl": "https://myapp.vercel.app"
  }'
```

### Response

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

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Domain already registered"
  }
}
```

## Update Domain

Update domain configuration.

### Request

```
PUT /api/domains
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| originUrl | string | ✅ | Origin URL |
| originHost | string | ❌ | Origin Host |

### Example

```bash
curl -X PUT https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "originUrl": "https://new-origin.vercel.app",
    "originHost": "example.com"
  }'
```

### Response

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

## Delete Domain

Delete domain (soft delete).

### Request

```
DELETE /api/domains
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Example

```bash
curl -X DELETE https://nomio-api.pages.dev/domains \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true,
  "data": {
    "message": "Domain deleted"
  }
}
```

## Verify Origin

Verify origin ownership.

### Request

```
POST /api/domains/verify
```

### Request Header

```
Authorization: Bearer <your-token>
```

### Verification Mechanism

1. Request `origin_url/.well-known/nomio-verify.txt`
2. File content must exactly match `nomio-verify={token}`
3. Timeout: 10 seconds

### Example

```bash
curl -X POST https://nomio-api.pages.dev/domains/verify \
  -H "Authorization: Bearer <your-token>"
```

### Response

```json
{
  "success": true,
  "data": {
    "verifyStatus": "verified"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VERIFY_FAILED",
    "message": "Verification file content does not match"
  }
}
```

## Verify Status

| Status | Description |
|--------|-------------|
| pending | Pending verification |
| verified | Verified |
| failed | Verification failed |
