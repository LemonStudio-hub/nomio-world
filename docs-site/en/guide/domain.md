# Configure Domain

This chapter introduces how to configure and manage your subdomain.

## Register Domain

### 1. Go to Domain Management Page

After logging in, click "Domains" in the left navigation bar.

### 2. Fill in Origin Information

| Field | Description | Required |
|-------|-------------|----------|
| Origin URL | Your actual website address | ✅ |
| Origin Host | Custom Host header | ❌ |

### 3. Submit Registration

Click the "Register Domain" button to complete registration.

## Origin URL

The origin URL is your actual website hosting address.

### Requirements
- Must start with `https://`
- IP addresses are not supported
- Origin must respond to HTTPS requests

### Examples

| Origin URL | Status |
|------------|--------|
| https://myapp.vercel.app | ✅ Valid |
| https://example.com | ✅ Valid |
| http://example.com | ❌ HTTP not supported |
| http://192.168.1.1 | ❌ IP not supported |

### Common Origin Platforms

#### Vercel
```
https://your-project.vercel.app
```

#### Netlify
```
https://your-site.netlify.app
```

#### GitHub Pages
```
https://your-username.github.io
```

#### Cloudflare Pages
```
https://your-project.pages.dev
```

## Origin Host

The Origin Host header will be replaced with the value you enter.

### Use Cases
- Origin has a custom domain bound
- Origin requires a specific Host header

### Example

Assuming origin URL is `https://myapp.vercel.app` and origin host is `example.com`:

1. User visits `alice.nomio.world`
2. Request forwarded to `https://myapp.vercel.app`
3. Host header set to `example.com`

### Leave Empty

If left empty, Host header will use the origin URL domain:
- Origin URL: `https://myapp.vercel.app`
- Host header: `myapp.vercel.app`

## Domain Verification

After registering a domain, you need to verify origin ownership.

### Verification Steps

1. View verification file path and content on domain management page
2. Create a file on your origin: `/.well-known/nomio-verify.txt`
3. File content is the verification token shown on the page
4. Click the "Verify Origin" button

### Verification File Example

File path: `https://myapp.vercel.app/.well-known/nomio-verify.txt`

File content:
```
nomio-verify=abc123def456
```

### Verification Failure Reasons

- File doesn't exist
- File content doesn't match
- File not accessible via HTTPS
- Origin redirects the path

## Modify Origin

Registered domains can modify the origin URL.

### Modification Steps

1. Go to domain management page
2. Modify origin URL
3. Click "Save" button
4. Re-verify origin

::: warning Note
After modifying origin, re-verification is required.
:::

## Delete Domain

Currently, domain deletion is not supported. Please contact the administrator if needed.

## Common Questions

### How long does it take for the domain to be effective?

The domain is immediately effective after successful registration. Cloudflare DNS global propagation usually completes within minutes.

### What origins are supported?

Any origin that supports HTTPS is supported, including Vercel, Netlify, GitHub Pages, and self-hosted servers. IP addresses are not supported.

### Can the domain be customized?

Currently only `*.nomio.world` subdomains are supported. Custom domain support is planned for future versions.

### How to check domain status?

Domain verification status can be viewed on the domain management page.

## Next Steps

- [Using Email](/en/guide/email) - Register and use email
- [Origin Verification](/en/guide/verification) - Learn about verification details
