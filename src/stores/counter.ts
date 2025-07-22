import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  // Sidebar state
  const sidebar = ref(false)
  function toggleSidebar() {
    sidebar.value = !sidebar.value
  }

  return { count, doubleCount, increment, sidebar, toggleSidebar }
})
