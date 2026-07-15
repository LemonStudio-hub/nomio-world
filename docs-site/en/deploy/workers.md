# Workers Deployment

This chapter introduces how to deploy Cloudflare Workers.

## API Worker

### Configuration File

`workers/api/wrangler.toml`:

```toml
name = "nomio-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "nomio-db"
database_id = "<your-database-id>"

[vars]
JWT_SECRET = "<your-jwt-secret>"
ALLOWED_ORIGINS = "*"
```

### Deploy Command

```bash
cd workers/api
npm install
wrangler deploy
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| JWT_SECRET | JWT secret | ✅ |
| ALLOWED_ORIGINS | Allowed origins | ❌ |

## Gateway Worker

### Configuration File

`workers/gateway/wrangler.toml`:

```toml
name = "nomio-gateway"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "nomio-db"
database_id = "<your-database-id>"
```

### Deploy Command

```bash
cd workers/gateway
npm install
wrangler deploy
```

## Email Worker

### Configuration File

`workers/email/wrangler.toml`:

```toml
name = "nomio-email"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "nomio-db"
database_id = "<your-database-id>"

[vars]
MAX_MAIL_SIZE = "5242880"
RATE_LIMIT_COUNT = "3"
RATE_LIMIT_WINDOW = "300"
```

### Deploy Command

```bash
cd workers/email
npm install
wrangler deploy
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MAX_MAIL_SIZE | Maximum mail size (bytes) | 5242880 (5MB) |
| RATE_LIMIT_COUNT | Rate limit count | 3 |
| RATE_LIMIT_WINDOW | Rate limit window (seconds) | 300 |

## Database

### Create Database

```bash
wrangler d1 create nomio-db
```

### Get Database ID

After creation, the database ID will be displayed. Update it in `wrangler.toml`.

### Initialize Table Structure

```bash
wrangler d1 execute nomio-db --file=../schema.sql
```

### View Database

```bash
wrangler d1 execute nomio-db --command "SELECT * FROM users"
```

## Testing

### Run Tests

```bash
# API Worker
cd workers/api && npm test

# Gateway Worker
cd ../gateway && npm test

# Email Worker
cd ../email && npm test
```

### Test Coverage

```bash
npm test -- --coverage
```

## Common Questions

### Deployment Failed

Check:
- Cloudflare account permissions
- wrangler.toml configuration
- Network connection

### Database Connection Failed

Check:
- database_id is correct
- Database exists
- Binding name is correct

### Environment Variables Not Working

Check:
- Configuration in wrangler.toml
- Whether redeployment is needed
