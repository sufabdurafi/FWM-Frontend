<template>
  <nav
    class="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-30 shadow px-4 py-3 flex items-center justify-between backdrop-blur-md"
  >
    <div class="flex items-center space-x-4">
      <RouterLink to="/" class="font-bold text-lg text-blue-600 flex items-center space-x-1">
        <Home class="w-5 h-5 mr-1" />
        <span>DroneApp</span>
      </RouterLink>
      <RouterLink to="/" class="hover:text-blue-600 flex items-center space-x-1">
        <Home class="w-5 h-5 mr-1" />
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/about" class="hover:text-blue-600 flex items-center space-x-1">
        <Info class="w-5 h-5 mr-1" />
        <span>About</span>
      </RouterLink>
      <RouterLink to="/login" class="hover:text-blue-600 flex items-center space-x-1">
        <LogIn class="w-5 h-5 mr-1" />
        <span>Login</span>
      </RouterLink>
      <RouterLink to="/register" class="hover:text-blue-600 flex items-center space-x-1">
        <UserPlus class="w-5 h-5 mr-1" />
        <span>Register</span>
      </RouterLink>
      <RouterLink to="/logout" class="hover:text-blue-600 flex items-center space-x-1">
        <LogOut class="w-5 h-5 mr-1" />
        <span>Logout</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Home, Info, LogIn, UserPlus, LogOut } from 'lucide-vue-next'
</script>
