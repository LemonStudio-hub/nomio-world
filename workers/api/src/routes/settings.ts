/**
 * 邮箱设置路由（需 JWT 认证）
 * GET /settings/email  获取邮箱设置
 * PUT /settings/email  更新邮箱设置
 */

import { Hono } from 'hono';
import { success, fail } from '../utils/response';
import type { Env } from '../index';

export const settingsRoutes = new Hono<{ Bindings: Env }>();

function getUsername(c: any): string {
  const payload = c.get('jwtPayload') as { sub: string };
  return payload.sub;
}

// GET /api/settings/email
settingsRoutes.get('/email', async (c) => {
  const username = getUsername(c);

  const user = await c.env.DB.prepare(
    'SELECT username, email_enabled, total_mail_size FROM users WHERE username = ?',
  )
    .bind(username)
    .first();

  if (!user) {
    return fail(c, 'NOT_FOUND', '用户不存在', 404);
  }

  return success(c, {
    email: `${username}@nomio.world`,
    emailEnabled: !!user.email_enabled,
    totalMailSize: user.total_mail_size,
    quota: 100 * 1024 * 1024, // 100MB
  });
});

// PUT /api/settings/email
// Body: { emailEnabled?: boolean }
settingsRoutes.put('/email', async (c) => {
  const username = getUsername(c);

  let body: { emailEnabled?: boolean };
  try {
    body = await c.req.json();
  } catch {
    return fail(c, 'INVALID_JSON', '请求体格式无效', 400);
  }

  if (body.emailEnabled === undefined) {
    return fail(c, 'INVALID_INPUT', '没有需要更新的字段', 400);
  }

  await c.env.DB.prepare(
    'UPDATE users SET email_enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE username = ?',
  )
    .bind(body.emailEnabled ? 1 : 0, username)
    .run();

  return success(c, {
    email: `${username}@nomio.world`,
    emailEnabled: body.emailEnabled,
  });
});
