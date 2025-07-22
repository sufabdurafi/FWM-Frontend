<template>
  <div class="min-h-screen flex items-center justify-center bg-[#232136] px-2 py-8">
    <div
      class="w-full max-w-4xl bg-[#2a273f] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[520px]"
    >
      <!-- Left Side: Image & Text -->
      <div class="hidden md:flex flex-col justify-between w-1/2 bg-[#232136] p-8 relative flex-1">
        <img
          src="@/assets/login.jpg"
          alt="Login"
          class="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div class="relative z-10 flex flex-col h-full justify-between">
          <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold tracking-widest">FLYWITHUS</span>
          </div>
          <div class="flex-1 flex flex-col justify-center items-center">
            <h2 class="text-white text-2xl font-semibold mb-2 text-center drop-shadow">
              Capturing Moments,<br />Creating Memories
            </h2>
          </div>
        </div>
      </div>
      <!-- Right Side: Login Form -->
      <div class="w-full md:w-1/2 bg-[#2a273f] p-8 flex flex-col justify-between flex-1 py-16">
        <div>
          <h2 class="text-3xl font-bold text-white mb-6">Welcome back</h2>
          <p class="text-sm text-white/60 mb-10">
            Don't have an account?
            <router-link to="/register" class="text-purple-400 hover:underline"
              >Sign up</router-link
            >
          </p>
        </div>
        <form @submit.prevent="login" class="space-y-4 flex-1 flex flex-col justify-center">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full bg-[#232136] text-white border border-[#393552] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
            class="w-full bg-[#232136] text-white border border-[#393552] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember" type="checkbox" class="accent-purple-500 mr-2" />
              <label for="remember" class="text-xs text-white/70">Remember me</label>
            </div>
            <a href="#" class="text-xs text-purple-400 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            class="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition mt-8 flex items-center justify-center"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Loading...
            </span>
            <span v-else>Sign in</span>
          </button>
          <div v-if="error" class="text-red-400 mt-4 text-center">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/plugins/axios'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const route = useRoute()

const login = async () => {
  error.value = ''
  loading.value = true

  try {
    // Login request
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    })

    // Simpan token ke localStorage
    const token = response.data.token
    localStorage.setItem('token', token)

    // Fetch user data
    const userRes = await api.get('/me')
    localStorage.setItem('user_data', JSON.stringify(userRes.data))

    // Redirect berdasarkan role atau halaman sebelumnya
    let redirectPath = route.query.redirect as string
    if (!redirectPath) {
      if (userRes.data.role === 'admin') {
        redirectPath = '/admin'
      } else if (userRes.data.role === 'user') {
        redirectPath = '/user/dashboard'
      } else {
        redirectPath = '/'
      }
    }
    router.push(redirectPath)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>
