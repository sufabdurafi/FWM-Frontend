<template>
  <header
    class="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-lg border-b border-slate-200"
  >
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Left Section - Logo & Menu -->
      <div class="flex items-center gap-3">
        <button
          @click="toggleSidebar()"
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-all duration-200 active:scale-95"
          aria-label="Toggle sidebar"
        >
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <router-link to="/" class="flex items-center gap-2 group">
          <div
            class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200"
          >
            <span class="text-white font-bold text-sm">FW</span>
          </div>
          <div class="flex flex-col">
            <span
              class="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors"
              >ADMIN</span
            >
            <span class="text-xs text-slate-500 hidden sm:block">Dashboard</span>
          </div>
        </router-link>
      </div>

      <!-- Right Section - User & Actions -->
      <div class="flex items-center gap-3">
        <!-- Notifications -->
        <button
          class="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
        >
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >3</span
          >
        </button>

        <!-- Search (Hidden on small screens) -->
        <div
          class="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 min-w-[200px]"
        >
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            class="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none flex-1"
          />
        </div>

        <!-- User Profile -->
        <div class="flex items-center gap-2">
          <div
            class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <span class="text-white font-semibold text-sm">AD</span>
          </div>
          <div class="hidden sm:block">
            <p class="text-sm font-semibold text-slate-800">Admin User</p>
            <p class="text-xs text-slate-500">Administrator</p>
          </div>
        </div>

        <!-- Settings -->
        <button
          class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
        >
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Search Bar (Expandable) -->
    <div class="md:hidden border-t border-slate-200 px-4 py-3">
      <div class="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2">
        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search anything..."
          class="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none flex-1"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
const toggleSidebar = () => {}
</script>
