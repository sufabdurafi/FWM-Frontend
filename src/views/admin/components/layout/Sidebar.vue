<template>
  <div>
    <!-- Header for Mobile/Tablet -->
    <header
      class="lg:hidden fixed top-0 left-0 right-0 z-50 shadow-lg border-b"
      style="background: var(--color-bg-card); border-color: var(--color-border)"
    >
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-3">
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200"
            style="background: var(--color-bg-main)"
            @click="toggleSidebar()"
            aria-label="Toggle sidebar"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <router-link to="/" class="flex items-center gap-2">
            <!-- <img
              src="/src/assets/flywithus.png"
              alt="FlyWithUs Logo"
              class="h-8 w-8 object-contain"
            /> -->
            <span class="text-xl font-bold" style="color: var(--color-text-main)">ADMIN</span>
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm hidden sm:block" style="color: var(--color-text-secondary)"
            >Dashboard Panel</span
          >
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center"
              style="background: var(--color-primary)"
            >
              <span class="text-white font-semibold text-xs">AD</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar -->
    <nav
      class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[280px] shadow-xl z-50 transition-all duration-300"
      :style="{
        background: 'var(--color-bg-main)',
        color: 'var(--color-text-main)',
      }"
      :class="[
        store.sidebar ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0',
        'lg:block',
        'block',
      ]"
    >
      <div class="h-full flex flex-col">
        <!-- Header Section -->
        <div
          class="flex items-center justify-between px-6 py-6 border-b"
          style="border-color: var(--color-border); background: var(--color-bg-card)"
        >
          <router-link to="/" class="flex items-center gap-3 group">
            <div class="relative">
              <img
                src="/src/assets/flywithus.png"
                alt="FlyWithUs Logo"
                class="h-20 w-auto object-contain rounded-lg p-2 shadow-md group-hover:scale-105 transition-transform duration-200"
              />
              <div
                class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2"
                style="background: var(--color-primary); border-color: var(--color-bg-main)"
              ></div>
            </div>
          </router-link>
        </div>

        <!-- Navigation Menu -->
        <div class="flex-1 px-4 py-6">
          <div class="mb-6">
            <h3
              class="text-xs font-semibold uppercase tracking-wider mb-3 px-3"
              style="color: var(--color-text-secondary)"
            >
              Main Menu
            </h3>
            <ul class="space-y-2">
              <li>
                <router-link
                  to="/admin/dashboard"
                  :exact="true"
                  class="group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105"
                  :style="{
                    color:
                      route.path === '/admin/dashboard' ? 'white' : 'var(--color-text-secondary)',
                    background:
                      route.path === '/admin/dashboard' ? 'var(--color-primary)' : 'transparent',
                  }"
                  @click="handleSidebarClick"
                  @mouseover="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/dashboard'
                          ? 'var(--color-primary-hover)'
                          : 'var(--color-bg-card)'
                    }
                  "
                  @mouseleave="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/dashboard' ? 'var(--color-primary)' : 'transparent'
                    }
                  "
                >
                  <LayoutDashboard class="w-5 h-5 mr-2" />
                  <span class="font-medium">Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/orders"
                  class="group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105"
                  :style="{
                    color: route.path === '/admin/orders' ? 'white' : 'var(--color-text-secondary)',
                    background:
                      route.path === '/admin/orders' ? 'var(--color-primary)' : 'transparent',
                  }"
                  @click="handleSidebarClick"
                  @mouseover="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/orders'
                          ? 'var(--color-primary-hover)'
                          : 'var(--color-bg-card)'
                    }
                  "
                  @mouseleave="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/orders' ? 'var(--color-primary)' : 'transparent'
                    }
                  "
                >
                  <ShoppingCart class="w-5 h-5 mr-2" />
                  <span class="font-medium">Pesanan</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/portfolios"
                  class="group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105"
                  :style="{
                    color:
                      route.path === '/admin/portfolios' ? 'white' : 'var(--color-text-secondary)',
                    background:
                      route.path === '/admin/portfolios' ? 'var(--color-primary)' : 'transparent',
                  }"
                  @click="handleSidebarClick"
                  @mouseover="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/portfolios'
                          ? 'var(--color-primary-hover)'
                          : 'var(--color-bg-card)'
                    }
                  "
                  @mouseleave="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/portfolios' ? 'var(--color-primary)' : 'transparent'
                    }
                  "
                >
                  <Image class="w-5 h-5 mr-2" />
                  <span class="font-medium">Portfolio</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/users"
                  class="group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105"
                  :style="{
                    color: route.path === '/admin/users' ? 'white' : 'var(--color-text-secondary)',
                    background:
                      route.path === '/admin/users' ? 'var(--color-primary)' : 'transparent',
                  }"
                  @click="handleSidebarClick"
                  @mouseover="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/users'
                          ? 'var(--color-primary-hover)'
                          : 'var(--color-bg-card)'
                    }
                  "
                  @mouseleave="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/users' ? 'var(--color-primary)' : 'transparent'
                    }
                  "
                >
                  <Users class="w-5 h-5 mr-2" />
                  <span class="font-medium">Pengguna</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/packages"
                  class="group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105"
                  :style="{
                    color:
                      route.path === '/admin/packages' ? 'white' : 'var(--color-text-secondary)',
                    background:
                      route.path === '/admin/packages' ? 'var(--color-primary)' : 'transparent',
                  }"
                  @click="handleSidebarClick"
                  @mouseover="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/packages'
                          ? 'var(--color-primary-hover)'
                          : 'var(--color-bg-card)'
                    }
                  "
                  @mouseleave="
                    if ($event.target && 'style' in $event.target) {
                      ;($event.target as HTMLElement).style.background =
                        route.path === '/admin/packages' ? 'var(--color-primary)' : 'transparent'
                    }
                  "
                >
                  <Package class="w-5 h-5 mr-2" />
                  <span class="font-medium">Paket Layanan</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Footer Section -->
        <div class="p-4 border-t" style="border-color: var(--color-border)">
          <div
            class="flex items-center gap-3 p-3 rounded-lg"
            style="background: var(--color-bg-card)"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center"
              style="background: var(--color-primary)"
            >
              <span class="text-white font-semibold text-sm">{{
                userData?.name ? userData.name.charAt(0).toUpperCase() : 'AD'
              }}</span>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium" style="color: var(--color-text-main)">
                {{ userData?.name || 'Admin' }}
              </p>
              <p class="text-xs" style="color: var(--color-text-secondary)">
                {{ userData?.email || '-' }}
              </p>
            </div>
            <button
              class="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
              style="color: var(--color-text-secondary)"
              @click="handleLogout"
              @mouseover="
                if ($event.target && 'style' in $event.target) {
                  ;($event.target as HTMLElement).style.background = 'var(--color-bg-main)'
                }
              "
              @mouseleave="
                if ($event.target && 'style' in $event.target) {
                  ;($event.target as HTMLElement).style.background = 'transparent'
                }
              "
            >
              <LogOut class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import api from '@/api'
import { ref, onMounted } from 'vue'
// Import icon lucide
import {
  LayoutDashboard,
  ShoppingCart,
  Image,
  Users,
  Package,
  BarChart,
  LogOut,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const store = useCounterStore()
const toggleSidebar = () => {
  store.sidebar = !store.sidebar
}

function handleSidebarClick() {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) store.sidebar = false
}

const userData = ref<{ name: string; email: string } | null>(null)

defineExpose({ userData })

onMounted(() => {
  // Ambil dari localStorage key 'user_data' (bukan 'user')
  const userStr = localStorage.getItem('user_data')
  if (userStr) {
    try {
      userData.value = JSON.parse(userStr)
    } catch {}
  }
})

const handleLogout = async () => {
  try {
    await api.post('/logout')
  } catch (e) {
    // ignore error
  }
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
