<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const username = ref('');
const password = ref('');
const agreedToTerms = ref(false);
const error = ref('');

async function handleSubmit() {
  error.value = '';
  if (!username.value || !password.value) {
    error.value = '请填写用户名和密码';
    return;
  }
  if (!agreedToTerms.value) {
    error.value = '请阅读并同意隐私政策和使用条款';
    return;
  }
  try {
    await auth.login(username.value, password.value);
  } catch (e: any) {
    error.value = e?.data?.error?.message || '登录失败，请检查用户名和密码';
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="logo"><span>Nomio</span>.World</div>
      <p class="subtitle">登录你的账号</p>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit" class="stagger">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="输入你的用户名"
            autocomplete="username"
            class="focus-ring"
          />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="输入密码"
            autocomplete="current-password"
            class="focus-ring"
          />
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input
              v-model="agreedToTerms"
              type="checkbox"
              class="checkbox-input"
            />
            <span class="checkbox-text">
              我已阅读并同意
              <router-link to="/privacy" target="_blank" class="policy-link">隐私政策</router-link>
              和
              <router-link to="/terms" target="_blank" class="policy-link">使用条款</router-link>
            </span>
          </label>
        </div>

        <button class="btn btn-primary btn-block" type="submit" :disabled="auth.loading || !agreedToTerms">
          <span v-if="auth.loading" class="spinner"></span>
          <span v-else>登录</span>
        </button>
      </form>

      <div class="auth-link">
        还没有账号？<router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.5;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--color-primary);
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-text {
  color: var(--color-text-secondary);
}

.policy-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.policy-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}
</style>
