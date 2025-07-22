<template>
  <MainHeader />
</template>

<script setup>
import MainHeader from '@/components/ui/MainHeader.vue'
</script>

<style scoped>
.navbar-gradient {
  background: linear-gradient(90deg, #232136 0%, #2a273f 100%);
}
.nav-link {
  color: #fff;
  font-weight: 300;
  font-size: 1rem;
  transition: color 0.2s;
  position: relative;
  padding: 0.25rem 0.5rem;
}
.nav-link.router-link-active,
.nav-link:hover {
  color: var(--color-primary);
}
.icon-btn {
  color: #fff;
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-btn:hover {
  background: rgba(124, 58, 237, 0.1);
  color: var(--color-primary);
}
.buy-btn {
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1.25rem;
  transition: background 0.2s;
  box-shadow: 0 2px 8px 0 rgba(124, 58, 237, 0.1);
}
.buy-btn:hover {
  background: var(--color-primary-hover);
}
</style>
