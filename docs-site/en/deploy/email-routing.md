# Email Routing Configuration

This chapter introduces how to configure Cloudflare Email Routing.

## What is Email Routing?

Email Routing is a Cloudflare email routing service that can forward emails to Workers.

## Configuration Steps

### 1. Enable Email Routing

1. Go to Cloudflare Dashboard
2. Select your domain
3. Click "Email" → "Email Routing"
4. Click "Get started"

### 2. Configure Catch-all

1. Find "Catch-all" in "Routing Rules"
2. Click "Edit"
3. Select "Send to a Worker"
4. Select your Email Worker
5. Click "Save"

### 3. Verify Configuration

After configuration, the system will automatically add required DNS records:
- MX record
- TXT record (SPF)

## DNS Records

### Auto-added Records

| Type | Name | Content |
|------|------|---------|
| MX | @ | route.mx.cloudflare.net |
| TXT | @ | v=spf1 include:_spf.mx.cloudflare.net ~all |

### Manual Records

If auto-add fails, add manually:

```bash
# MX Record
nomio.world  MX  route.mx.cloudflare.net  10

# SPF Record
nomio.world  TXT  "v=spf1 include:_spf.mx.cloudflare.net ~all"
```

## Worker Configuration

### Receive Emails

Receive emails in Email Worker:

```typescript
export default {
  async email(message, env, ctx) {
    // Process email
    const to = message.to; // Recipient
    const from = message.from; // Sender
    const subject = message.headers.get('subject');
    
    // Store email
    await storeMail(message, env);
    
    // Forward email
    await forwardMail(message, env);
  },
};
```

### Email Limits

Cloudflare Email Routing limits:
- Maximum 1000 emails per day
- Maximum 25MB per email
- Does not support sending emails

## Testing

### Send Test Email

Use another email to send to `test@nomio.world`

### Check Reception

Check if email is received in Dashboard

### Check Forwarding

Check if forwarding email received the email

## Common Questions

### Emails Not Received

Check:
- Email Routing enabled
- Catch-all configured
- Worker deployed
- DNS records correct

### Email Delay

Usually no delay, if delayed check:
- Worker execution time
- Network connection
- Cloudflare status

### Emails Rejected

Check:
- SPF record correct
- Sender not restricted
- Rate limiting

### Forwarding Failed

Check:
- Forwarding email address correct
- Forwarding email rejecting
- Worker executing normally

## Advanced Configuration

### Custom Routing

Can configure custom routing rules:

```toml
# wrangler.toml
[vars]
CATCH_ALL_ENABLED = "true"
ALLOWED_DOMAINS = "nomio.world"
```

### Rate Limiting

Implement rate limiting in Worker:

```typescript
const RATE_LIMIT = 3; // Max per window
const RATE_WINDOW = 300; // Window size (seconds)

async function checkRateLimit(from, env) {
  const key = `rate:${from}`;
  const count = await env.DB.get(key);
  
  if (count && parseInt(count) >= RATE_LIMIT) {
    throw new Error('Rate limit exceeded');
  }
  
  await env.DB.put(key, (parseInt(count || '0') + 1).toString(), {
    expirationTtl: RATE_WINDOW,
  });
}
```

### Email Filtering

Implement email filtering in Worker:

```typescript
async function shouldReject(message, env) {
  // Check sender
  if (isBlacklisted(message.from)) {
    return true;
  }
  
  // Check subject
  if (isSpamSubject(message.headers.get('subject'))) {
    return true;
  }
  
  // Check size
  if (message.size > MAX_MAIL_SIZE) {
    return true;
  }
  
  return false;
}
```

## Monitoring

### View Logs

View email processing logs in Cloudflare Dashboard → Workers → Logs.

### View Analytics

View in Cloudflare Dashboard → Email → Analytics:
- Received email count
- Forwarded email count
- Error count
