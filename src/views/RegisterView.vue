<template>
  <div class="min-h-screen flex items-center justify-center bg-[#232136] px-2 py-8">
    <div
      class="w-full max-w-4xl bg-[#2a273f] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[520px]"
    >
      <!-- Left Side: Image & Text -->
      <div class="hidden md:flex flex-col justify-between w-1/2 bg-[#232136] p-8 relative flex-1">
        <img
          src="@/assets/login.jpg"
          alt="Register"
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
      <!-- Right Side: Register Form -->
      <div class="w-full md:w-1/2 bg-[#2a273f] p-8 flex flex-col justify-center flex-1 py-16">
        <h2 class="text-2xl font-bold text-white mb-2">Create an account</h2>
        <p class="text-sm text-white/60 mb-6">
          Already have an account?
          <router-link to="/login" class="text-purple-400 hover:underline">Sign in</router-link>
        </p>
        <form @submit.prevent="register" class="space-y-4">
          <div class="flex space-x-2">
            <input
              v-model="firstName"
              type="text"
              placeholder="First name"
              required
              class="w-1/2 bg-[#232136] text-white border border-[#393552] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              v-model="lastName"
              type="text"
              placeholder="Last name"
              required
              class="w-1/2 bg-[#232136] text-white border border-[#393552] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
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
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            class="w-full bg-[#232136] text-white border border-[#393552] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div class="flex items-center">
            <input id="terms" type="checkbox" class="accent-purple-500 mr-2" required />
            <label for="terms" class="text-xs text-white/70"
              >I agree to the
              <span class="underline cursor-pointer">Terms & Conditions</span></label
            >
          </div>
          <button
            type="submit"
            class="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Create account
          </button>
        </form>
        <div v-if="error" class="text-red-400 mt-4 text-center">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()

const register = async () => {
  error.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    const res = await api.post('/register', {
      name: `${firstName.value} ${lastName.value}`.trim(),
      email: email.value,
      password: password.value,
    })
    // Tampilkan modal sukses
    window.alert('Pendaftaran berhasil! Silakan login untuk melanjutkan.')
    router.push('/login')
  } catch (e: any) {
    // Tampilkan error validasi backend jika ada
    if (e.response?.data?.errors) {
      error.value = Object.values(e.response.data.errors).flat().join(', ')
    } else {
      error.value = e.response?.data?.error || 'Registration failed'
    }
  }
}
</script>
