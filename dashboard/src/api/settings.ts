/**
 * 邮箱设置 API
 */

import request from './request';

export interface EmailSettings {
  email: string;
  emailEnabled: boolean;
  totalMailSize: number;
  quota: number;
}

export async function getEmailSettings() {
  return request<EmailSettings>('/settings/email');
}

export async function updateEmailSettings(params: {
  emailEnabled?: boolean;
}) {
  return request<{ email: string; emailEnabled: boolean }>(
    '/settings/email',
    { method: 'PUT', body: params },
  );
}
