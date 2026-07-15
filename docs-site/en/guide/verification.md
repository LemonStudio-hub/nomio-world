# Origin Verification

This chapter introduces detailed information about origin verification.

## Why Verification is Needed?

To prevent malicious users from pointing domains to others websites, origin ownership must be verified after registration.

## Verification Process

### 1. Get Verification Information

View on domain management page:
- **Verification file path** - File location to create
- **Verification file content** - Content to write

### 2. Create Verification File

Create a file on your origin: `/.well-known/nomio-verify.txt`

File content is the verification token shown on the page.

### 3. Verify Origin

Click the "Verify Origin" button to complete verification.

## Verification File

### File Path

```
https://your-origin.com/.well-known/nomio-verify.txt
```

### File Content

```
nomio-verify=your-verify-token
```

### Creation Examples

#### Vercel

Create in project root:
```
public/.well-known/nomio-verify.txt
```

#### Netlify

Create in project root:
```
static/.well-known/nomio-verify.txt
```

#### GitHub Pages

Create in project root:
```
.well-known/nomio-verify.txt
```

#### Nginx

```nginx
location /.well-known/nomio-verify.txt {
    alias /path/to/nomio-verify.txt;
}
```

## Verification Status

| Status | Description |
|--------|-------------|
| Pending | Not yet verified |
| Verified | Verification passed |
| Failed | Verification failed |

## Verification Failure Reasons

### File Doesn't Exist

Ensure the file is created and accessible via HTTPS.

### File Content Doesn't Match

Ensure the file content matches exactly, including:
- No extra spaces
- No extra line breaks
- No BOM header

### Not Accessible

Ensure the file is accessible via HTTPS:
- Origin supports HTTPS
- SSL certificate is valid
- No redirects

### Redirect Issues

Ensure the origin doesn't redirect this path:
- Check Nginx/Apache configuration
- Check application routing configuration

## Verification Tools

### Browser Verification

Directly visit the verification file URL to see if it displays content normally.

```bash
curl https://your-origin.com/.well-known/nomio-verify.txt
```

### Command Line Verification

```bash
curl -I https://your-origin.com/.well-known/nomio-verify.txt
```

Check if the return status code is 200.

## Re-verification

If verification fails, you can:
1. Fix the verification file
2. Click "Verify Origin" button to re-verify

## Common Questions

### Does the verification file need to be kept?

The verification file can be kept and won't affect website operation. It's recommended to keep it for future verification.

### Is there a time limit for verification?

There's no time limit for verification. But it's recommended to complete verification as soon as possible to use the domain.

### How long before re-verification?

You can re-verify at any time, no limit on the number of times.

### What if verification fails?

1. Check if the file exists
2. Check if the file content is correct
3. Check if the file is accessible
4. Check if there are redirects

## Next Steps

- [Email Forwarding](/en/guide/forwarding) - Learn about forwarding configuration
- [Security Settings](/en/guide/security) - Learn about security configuration
