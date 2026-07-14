<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const route = useRoute();
const auth = useAuthStore();

const isPublicPage = computed(() => route.meta.guest === true);

const navItems = [
  { path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4', label: '仪表盘' },
  { path: '/domain', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', label: '域名管理' },
  { path: '/mailbox', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: '邮箱' },
];
</script>

<template>
  <div v-if="isPublicPage">
    <router-view />
  </div>

  <div v-else class="app-layout">
    <aside class="app-sidebar">
      <div class="logo"><span>Nomio</span>.World</div>
      <nav>
        <router-link v-for="item in navItems" :key="item.path" :to="item.path">
          <span class="nav-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path :d="item.icon" />
            </svg>
          </span>
          {{ item.label }}
        </router-link>
      </nav>
      <div class="user-section">
        <div class="user-info">
          <div class="user-avatar">{{ auth.username.charAt(0).toUpperCase() }}</div>
          <span class="username">{{ auth.username }}</span>
        </div>
        <button class="btn btn-outline btn-sm" @click="auth.logout()">退出</button>
      </div>
    </aside>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>
