<template>
  <div>
    <h1>Logout</h1>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../api'
import { useRouter } from 'vue-router'

const message = ref('')
const router = useRouter()

const logout = async () => {
  try {
    await api.post('/logout')
    localStorage.removeItem('token')
    message.value = 'Logout berhasil!'
    router.push('/login') // Redirect ke halaman login
  } catch (e) {
    message.value = 'Logout gagal!'
    router.push('/login') // Tetap redirect ke login walau gagal
  }
}

onMounted(() => {
  logout()
})
</script>
