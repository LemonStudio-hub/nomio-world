# 更新日志

## v1.0.0 (2026-07-14)

### 🎉 首次发布

#### 核心功能
- 用户注册和登录（PBKDF2 密码哈希）
- 二级域名注册和管理
- 邮箱注册和管理
- 邮件接收和存储

#### 域名功能
- 免费二级域名 `*.nomio.world`
- 自定义源站指向
- 源站验证（/.well-known/nomio-verify.txt）
- HTTPS 强制回源

#### 邮箱功能
- 免费邮箱 `*@nomio.world`
- 邮件接收和存储
- 邮件转发设置
- 100MB 存储空间
- 邮件搜索和筛选
- 星标和已读/未读状态
- 批量操作

#### 安全特性
- 强制 HTTPS
- JWT 认证（24小时有效期）
- PBKDF2 密码哈希
- 速率限制
- CORS 保护
- 安全头（X-Content-Type-Options, X-Frame-Options, X-XSS-Protection）
- HTML 邮件净化（DOMPurify）

#### 技术架构
- Cloudflare Workers（边缘计算）
- Cloudflare D1（边缘数据库）
- Cloudflare Pages（前端部署）
- Cloudflare KV（缓存和限速，可选）
- Vue 3 + Vite + TypeScript（前端）
- Hono + TypeScript（后端）

#### UI/UX
- 现代简洁设计
- 暗色模式支持
- 响应式布局
- 流畅动画效果
- 中英双语支持
- 移动端适配

#### 测试
- 193 项测试全部通过
- 80%+ 代码覆盖率（后端）
- 70%+ 代码覆盖率（前端）

#### 文档
- 完整的用户文档
- API 文档
- 部署指南
- 中英双语文档站

#### 开源
- AGPL-3.0 开源协议
- 完全开源透明
