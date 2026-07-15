# Changelog

## v1.0.0 (2026-07-14)

### 🎉 Initial Release

#### Core Features
- User registration and login (PBKDF2 password hashing)
- Subdomain registration and management
- Email registration and management
- Email receiving and storage

#### Domain Features
- Free subdomain `*.nomio.world`
- Custom origin pointing
- Origin verification (/.well-known/nomio-verify.txt)
- Forced HTTPS origin

#### Email Features
- Free email `*@nomio.world`
- Email receiving and storage
- Email forwarding settings
- 100MB storage space
- Email search and filtering
- Star and read/unread status
- Batch operations

#### Security Features
- Forced HTTPS
- JWT authentication (24-hour validity)
- PBKDF2 password hashing
- Rate limiting
- CORS protection
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- HTML email sanitization (DOMPurify)

#### Technical Architecture
- Cloudflare Workers (edge computing)
- Cloudflare D1 (edge database)
- Cloudflare Pages (frontend deployment)
- Cloudflare KV (cache and rate limiting, optional)
- Vue 3 + Vite + TypeScript (frontend)
- Hono + TypeScript (backend)

#### UI/UX
- Modern clean design
- Dark mode support
- Responsive layout
- Smooth animation effects
- Chinese and English bilingual support
- Mobile adaptation

#### Testing
- 193 tests all passed
- 80%+ code coverage (backend)
- 70%+ code coverage (frontend)

#### Documentation
- Complete user documentation
- API documentation
- Deployment guide
- Chinese and English bilingual documentation site

#### Open Source
- AGPL-3.0 open source license
- Completely open source and transparent
