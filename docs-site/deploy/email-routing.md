# Email Routing 配置

本章介绍如何配置 Cloudflare Email Routing。

## 什么是 Email Routing？

Email Routing 是 Cloudflare 提供的邮件路由服务，可以将邮件转发到 Workers。

## 配置步骤

### 1. 启用 Email Routing

1. 进入 Cloudflare Dashboard
2. 选择你的域名
3. 点击"Email" → "Email Routing"
4. 点击"Get started"

### 2. 配置 Catch-all

1. 在"Routing Rules"中找到"Catch-all"
2. 点击"Edit"
3. 选择"Send to a Worker"
4. 选择你的 Email Worker
5. 点击"Save"

### 3. 验证配置

配置完成后，系统会自动添加所需的 DNS 记录：
- MX 记录
- TXT 记录（SPF）

## DNS 记录

### 自动添加的记录

| 类型 | 名称 | 内容 |
|------|------|------|
| MX | @ | route.mx.cloudflare.net |
| TXT | @ | v=spf1 include:_spf.mx.cloudflare.net ~all |

### 手动添加的记录

如果自动添加失败，手动添加：

```bash
# MX 记录
nomio.world  MX  route.mx.cloudflare.net  10

# SPF 记录
nomio.world  TXT  "v=spf1 include:_spf.mx.cloudflare.net ~all"
```

## Worker 配置

### 接收邮件

在 Email Worker 中接收邮件：

```typescript
export default {
  async email(message, env, ctx) {
    // 处理邮件
    const to = message.to; // 收件人
    const from = message.from; // 发件人
    const subject = message.headers.get('subject');
    
    // 存储邮件
    await storeMail(message, env);
    
    // 转发邮件
    await forwardMail(message, env);
  },
};
```

### 邮件限制

Cloudflare Email Routing 限制：
- 每天最多 1000 封邮件
- 单封邮件最大 25MB
- 不支持发送邮件

## 测试

### 发送测试邮件

使用其他邮箱发送邮件到 `test@nomio.world`

### 检查接收

在 Dashboard 中查看是否收到邮件

### 检查转发

检查转发邮箱是否收到邮件

## 常见问题

### 邮件未接收

检查：
- Email Routing 是否启用
- Catch-all 是否配置
- Worker 是否部署
- DNS 记录是否正确

### 邮件延迟

通常没有延迟，如有延迟检查：
- Worker 执行时间
- 网络连接
- Cloudflare 状态

### 邮件被拒绝

检查：
- SPF 记录是否正确
- 发件人是否被限制
- 频率限制

### 转发失败

检查：
- 转发邮箱地址是否正确
- 转发邮箱是否拒收
- Worker 是否正常执行

## 高级配置

### 自定义路由

可以配置自定义路由规则：

```toml
# wrangler.toml
[vars]
CATCH_ALL_ENABLED = "true"
ALLOWED_DOMAINS = "nomio.world"
```

### 频率限制

在 Worker 中实现频率限制：

```typescript
const RATE_LIMIT = 3; // 每窗口最大次数
const RATE_WINDOW = 300; // 窗口大小（秒）

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

### 邮件过滤

在 Worker 中实现邮件过滤：

```typescript
async function shouldReject(message, env) {
  // 检查发件人
  if (isBlacklisted(message.from)) {
    return true;
  }
  
  // 检查主题
  if (isSpamSubject(message.headers.get('subject'))) {
    return true;
  }
  
  // 检查大小
  if (message.size > MAX_MAIL_SIZE) {
    return true;
  }
  
  return false;
}
```

## 监控

### 查看日志

在 Cloudflare Dashboard → Workers → Logs 查看邮件处理日志。

### 查看分析

在 Cloudflare Dashboard → Email → Analytics 查看：
- 接收邮件数量
- 转发邮件数量
- 错误数量
