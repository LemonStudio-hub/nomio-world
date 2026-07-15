# 配置域名

本章介绍如何配置和管理你的二级域名。

## 注册域名

### 1. 进入域名管理页面

登录后，点击左侧导航栏的"域名管理"。

### 2. 填写源站信息

| 字段 | 说明 | 必填 |
|------|------|------|
| 源站地址 | 你的网站实际地址 | ✅ |
| 回源 Host | 自定义 Host 头 | ❌ |

### 3. 提交注册

点击"注册域名"按钮完成注册。

## 源站地址

源站地址是你网站的实际托管地址。

### 要求
- 必须以 `https://` 开头
- 不支持 IP 地址
- 源站必须有效响应 HTTPS 请求

### 示例

| 源站地址 | 状态 |
|----------|------|
| https://myapp.vercel.app | ✅ 有效 |
| https://example.com | ✅ 有效 |
| http://example.com | ❌ 不支持 HTTP |
| http://192.168.1.1 | ❌ 不支持 IP |

### 常见源站平台

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

## 回源 Host

回源 Host 头会替换为你填写的值。

### 使用场景
- 源站绑定了自定义域名
- 源站需要特定的 Host 头

### 示例

假设源站地址是 `https://myapp.vercel.app`，回源 Host 是 `example.com`：

1. 用户访问 `alice.nomio.world`
2. 请求转发到 `https://myapp.vercel.app`
3. Host 头设置为 `example.com`

### 留空情况

如果留空，Host 头将使用源站地址的域名：
- 源站地址：`https://myapp.vercel.app`
- Host 头：`myapp.vercel.app`

## 域名验证

注册域名后，需要验证源站所有权。

### 验证步骤

1. 在域名管理页面查看验证文件路径和内容
2. 在源站创建文件：`/.well-known/nomio-verify.txt`
3. 文件内容为页面显示的验证 Token
4. 点击"验证源站"按钮

### 验证文件示例

文件路径：`https://myapp.vercel.app/.well-known/nomio-verify.txt`

文件内容：
```
nomio-verify=abc123def456
```

### 验证失败原因

- 文件不存在
- 文件内容不匹配
- 文件无法通过 HTTPS 访问
- 源站重定向了该路径

## 修改源站

已注册的域名可以修改源站地址。

### 修改步骤

1. 进入域名管理页面
2. 修改源站地址
3. 点击"保存"按钮
4. 重新验证源站

::: warning 注意
修改源站后需要重新验证。
:::

## 删除域名

在域名管理页面可以删除域名（软删除）。

::: warning 注意
删除域名后，所有关联的邮件也将被删除。
:::

## 常见问题

### 域名多久生效？

注册成功后域名立即生效。Cloudflare DNS 全球传播通常在几分钟内完成。

### 支持哪些源站？

支持任何支持 HTTPS 的源站，包括 Vercel、Netlify、GitHub Pages、自有服务器等。不支持 IP 地址。

### 域名可以自定义吗？

当前仅支持 `*.nomio.world` 子域名。自定义域名支持计划在未来版本中提供。

### 如何查看域名状态？

在域名管理页面可以查看域名的验证状态。

## 下一步

- [使用邮箱](/guide/email) - 注册和使用邮箱
- [源站验证](/guide/verification) - 了解验证详情
