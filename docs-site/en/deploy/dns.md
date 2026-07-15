# DNS Configuration

This chapter introduces how to configure DNS.

## DNS Records

### Main Domain

| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| A | nomio.world | 192.0.2.1 | Proxied |

### Wildcard Domain

| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| A | *.nomio.world | 192.0.2.1 | Proxied |

### Mail Records

| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| MX | nomio.world | route.mx.cloudflare.net | DNS only |

## Configuration Steps

### 1. Add A Record

1. Go to Cloudflare Dashboard → DNS
2. Click "Add record"
3. Select type A
4. Fill in name and content
5. Enable proxy (orange cloud)

### 2. Add Wildcard Record

1. Click "Add record"
2. Select type A
3. Name: `*`
4. Content: `192.0.2.1`
5. Enable proxy (orange cloud)

### 3. Add MX Record

1. Click "Add record"
2. Select type MX
3. Name: empty or `@`
4. Content: `route.mx.cloudflare.net`
5. Priority: `10`
6. Disable proxy (gray cloud)

## Proxy Status

### Proxied (Orange Cloud)

- Traffic goes through Cloudflare
- CDN acceleration enabled
- DDoS protection enabled
- SSL enabled

### DNS Only (Gray Cloud)

- Traffic goes directly to origin
- Not through Cloudflare
- Used for email services

## Verify Configuration

### Check A Record

```bash
dig nomio.world A
dig alice.nomio.world A
```

### Check MX Record

```bash
dig nomio.world MX
```

### Check Propagation

```bash
dig @8.8.8.8 nomio.world A
```

## Common Questions

### Domain Not Working

Check:
- DNS records correct
- Proxy enabled
- DNS propagation complete

### Cannot Receive Emails

Check:
- MX record correct
- Proxy disabled
- Email Routing configured

### SSL Certificate Error

Check:
- Proxy enabled
- SSL mode correct
- Certificate valid

## Advanced Configuration

### Custom Domain

To support custom domains:

1. User adds CNAME record
2. Point to `nomio-gateway.pages.dev`
3. Handle in Gateway Worker

### DNSSEC

Recommend enabling DNSSEC for enhanced security.

### CAA Record

To restrict certificate issuance:

```
nomio.world  CAA  0 issue "letsencrypt.org"
```
