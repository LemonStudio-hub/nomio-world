# DNS 配置

本章介绍如何配置 DNS。

## DNS 记录

### 主域名

| 类型 | 名称 | 内容 | 代理状态 |
|------|------|------|----------|
| A | nomio.world | 192.0.2.1 | 已代理 |

### 通配符域名

| 类型 | 名称 | 内容 | 代理状态 |
|------|------|------|----------|
| A | *.nomio.world | 192.0.2.1 | 已代理 |

### 邮件记录

| 类型 | 名称 | 内容 | 代理状态 |
|------|------|------|----------|
| MX | nomio.world | route.mx.cloudflare.net | DNS only |

## 配置步骤

### 1. 添加 A 记录

1. 进入 Cloudflare Dashboard → DNS
2. 点击"Add record"
3. 选择类型 A
4. 填写名称和内容
5. 启用代理（橙色云）

### 2. 添加通配符记录

1. 点击"Add record"
2. 选择类型 A
3. 名称填写 `*`
4. 内容填写 `192.0.2.1`
5. 启用代理（橙色云）

### 3. 添加 MX 记录

1. 点击"Add record"
2. 选择类型 MX
3. 名称留空或填写 `@`
4. 内容填写 `route.mx.cloudflare.net`
5. 优先级填写 `10`
6. 禁用代理（灰色云）

## 代理状态

### 已代理（橙色云）

- 流量经过 Cloudflare
- 启用 CDN 加速
- 启用 DDoS 防护
- 启用 SSL

### DNS only（灰色云）

- 流量直接到源站
- 不经过 Cloudflare
- 用于邮件等服务

## 验证配置

### 检查 A 记录

```bash
dig nomio.world A
dig alice.nomio.world A
```

### 检查 MX 记录

```bash
dig nomio.world MX
```

### 检查传播

```bash
dig @8.8.8.8 nomio.world A
```

## 常见问题

### 域名未生效

检查：
- DNS 记录是否正确
- 代理是否启用
- DNS 传播是否完成

### 邮件无法接收

检查：
- MX 记录是否正确
- 代理是否禁用
- Email Routing 是否配置

### SSL 证书错误

检查：
- 代理是否启用
- SSL 模式是否正确
- 证书是否有效

## 高级配置

### 自定义域名

如需支持自定义域名：

1. 用户添加 CNAME 记录
2. 指向 `nomio-gateway.pages.dev`
3. 在 Gateway Worker 中处理

### DNSSEC

建议启用 DNSSEC 以增强安全性。

### CAA 记录

如需限制证书颁发：

```
nomio.world  CAA  0 issue "letsencrypt.org"
```
