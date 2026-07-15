/**
 * 路由配置
 * Nomio.World 前端路由表
 */

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// 路由元信息类型
declare module 'vue-router' {
  interface RouteMeta {
    guest?: boolean;
    requiresAuth?: boolean;
    title?: string;
    description?: string;
    icon?: string;
    showInNav?: boolean;
    transition?: string;
  }
}

// 公开页面路由
const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/LandingView.vue'),
    meta: {
      guest: true,
      title: '首页',
      description: 'Nomio.World - 免费域名和邮箱服务',
      showInNav: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      guest: true,
      title: '登录',
      description: '登录你的 Nomio.World 账号',
      showInNav: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      guest: true,
      title: '注册',
      description: '创建你的 Nomio.World 账号',
      showInNav: false,
    },
  },
];

// 认证页面路由
const authRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      requiresAuth: true,
      title: '仪表盘',
      description: '查看你的域名和邮箱状态',
      icon: 'dashboard',
      showInNav: true,
      transition: 'fade-slide',
    },
  },
  {
    path: '/domain',
    name: 'Domain',
    component: () => import('@/views/DomainView.vue'),
    meta: {
      requiresAuth: true,
      title: '域名管理',
      description: '管理你的二级域名和源站配置',
      icon: 'domain',
      showInNav: true,
      transition: 'fade-slide',
    },
  },
  {
    path: '/mailbox',
    name: 'Mailbox',
    component: () => import('@/views/MailboxView.vue'),
    meta: {
      requiresAuth: true,
      title: '邮箱',
      description: '查看和管理你的邮件',
      icon: 'mailbox',
      showInNav: true,
      transition: 'fade-slide',
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: {
      requiresAuth: true,
      title: '设置',
      description: '管理你的账号设置',
      icon: 'settings',
      showInNav: true,
      transition: 'fade-slide',
    },
  },
];

// 公共页面路由（无需认证，但不是首页）
const sharedRoutes: RouteRecordRaw[] = [
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('@/views/DocsView.vue'),
    meta: {
      title: '帮助文档',
      description: '了解如何使用 Nomio.World',
      showInNav: false,
      transition: 'fade-slide',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: '关于',
      description: '了解 Nomio.World 项目',
      showInNav: false,
      transition: 'fade-slide',
    },
  },
];

// 404 路由
const fallbackRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '页面不存在',
      description: '你访问的页面不存在',
      showInNav: false,
    },
  },
];

// 合并所有路由
const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...authRoutes,
  ...sharedRoutes,
  ...fallbackRoutes,
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，恢复到该位置
    if (savedPosition) {
      return savedPosition;
    }

    // 如果有锚点，滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      };
    }

    // 如果是同一个页面的不同查询参数，不滚动
    if (to.path === from.path) {
      return false;
    }

    // 否则滚动到顶部
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

// 路由守卫
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();

  // 更新页面标题
  const title = to.meta.title ? `${to.meta.title} - Nomio.World` : 'Nomio.World';
  document.title = title;

  // 更新 meta 描述
  const description = to.meta.description || 'Nomio.World - 免费域名和邮箱服务';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }

  // 认证检查
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    // 需要认证但未登录，跳转到登录页
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else if (to.meta.guest && auth.isLoggedIn && to.name !== 'Home') {
    // 已登录用户访问登录/注册页，跳转到仪表盘
    next('/dashboard');
  } else {
    next();
  }
});

// 路由后置守卫
router.afterEach((to, from) => {
  // 页面切换时的处理
  if (to.path !== from.path) {
    // 可以在这里添加页面切换动画、统计等
  }
});

// 导出路由实例和工具函数
export default router;

// 导出路由配置供其他组件使用
export { publicRoutes, authRoutes, sharedRoutes };

// 获取导航菜单项
export function getNavItems() {
  return authRoutes.filter((route) => route.meta?.showInNav);
}

// 获取底部导航项
export function getBottomNavItems() {
  return sharedRoutes.filter((route) => route.meta?.showInNav !== false);
}

// 面包屑导航
export function getBreadcrumbs(path: string) {
  const matched = router.resolve(path).matched;
  return matched
    .filter((record) => record.meta?.title)
    .map((record) => ({
      path: record.path,
      title: record.meta.title as string,
    }));
}
