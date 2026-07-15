# 源站验证

本章介绍源站验证的详细信息。

## 为什么需要验证？

为防止恶意用户将域名指向他人网站，注册后需要验证源站所有权。

## 验证流程

### 1. 获取验证信息

在域名管理页面查看：
- **验证文件路径** - 需要创建的文件位置
- **验证文件内容** - 需要写入的内容

### 2. 创建验证文件

在源站创建文件：`/.well-known/nomio-verify.txt`

文件内容为页面显示的验证 Token。

### 3. 验证源站

点击"验证源站"按钮完成验证。

## 验证文件

### 文件路径

```
https://your-origin.com/.well-known/nomio-verify.txt
```

### 文件内容

```
nomio-verify=your-verify-token
```

### 创建示例

#### Vercel

在项目根目录创建：
```
public/.well-known/nomio-verify.txt
```

#### Netlify

在项目根目录创建：
```
static/.well-known/nomio-verify.txt
```

#### GitHub Pages

在项目根目录创建：
```
.well-known/nomio-verify.txt
```

#### Nginx

```nginx
location /.well-known/nomio-verify.txt {
    alias /path/to/nomio-verify.txt;
}
```

## 验证状态

| 状态 | 说明 |
|------|------|
| 待验证 | 尚未验证 |
| 已验证 | 验证通过 |
| 验证失败 | 验证未通过 |

## 验证失败原因

### 文件不存在

确保文件已创建并可通过 HTTPS 访问。

### 文件内容不匹配

确保文件内容完全匹配，包括：
- 没有多余的空格
- 没有多余的换行
- 没有 BOM 头

### 无法访问

确保文件可通过 HTTPS 访问：
- 源站支持 HTTPS
- SSL 证书有效
- 没有重定向

### 重定向问题

确保源站没有重定向该路径：
- 检查 Nginx/Apache 配置
- 检查应用路由配置

## 验证工具

### 浏览器验证

直接访问验证文件 URL，查看是否能正常显示内容。

```bash
curl https://your-origin.com/.well-known/nomio-verify.txt
```

### 命令行验证

```bash
curl -I https://your-origin.com/.well-known/nomio-verify.txt
```

检查返回状态码是否为 200。

## 重新验证

如果验证失败，可以：
1. 修复验证文件
2. 点击"验证源站"按钮重新验证

## 常见问题

### 验证文件需要保留吗？

验证文件可以保留，不影响网站运行。建议保留以便后续验证。

### 验证有时间限制吗？

验证没有时间限制。但建议尽快完成验证以使用域名。

### 多久可以重新验证？

可以随时重新验证，没有次数限制。

### 验证失败怎么办？

1. 检查文件是否存在
2. 检查文件内容是否正确
3. 检查文件是否可访问
4. 检查是否有重定向

## 下一步

- [邮件转发](/guide/forwarding) - 了解转发配置
- [安全设置](/guide/security) - 了解安全配置
