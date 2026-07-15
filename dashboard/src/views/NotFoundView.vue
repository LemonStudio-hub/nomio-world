<script setup lang="ts">
import { ref, onMounted } from 'vue';

const visible = ref(false);
onMounted(() => { requestAnimationFrame(() => { visible.value = true; }); });
</script>

<template>
  <div class="not-found" :class="{ visible }">
    <div class="nf-bg">
      <div class="nf-orb"></div>
    </div>
    <div class="nf-content">
      <div class="nf-code">404</div>
      <h1>页面不存在</h1>
      <p>你访问的页面可能已被移除或地址有误。</p>
      <div class="nf-actions">
        <router-link to="/" class="btn btn-primary">返回首页</router-link>
        <router-link to="/dashboard" class="btn btn-outline">进入控制台</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.not-found.visible { opacity: 1; }

.nf-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.nf-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  animation: nfPulse 6s ease-in-out infinite;
}
@keyframes nfPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
}

.nf-content {
  text-align: center;
  position: relative;
  z-index: 1;
}
.nf-code {
  font-size: 8rem;
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
  background: linear-gradient(135deg, var(--color-primary) 0%, #7c3aed 50%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: nfGradient 6s ease-in-out infinite, nfFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  margin-bottom: 16px;
}
@keyframes nfGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes nfFadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
}

.nf-content h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
  animation: nfFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
.nf-content p {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  animation: nfFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}
.nf-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  animation: nfFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}
</style>
