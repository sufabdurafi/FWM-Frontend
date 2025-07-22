<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-4">Tambah Order Baru</h2>
      <form @submit.prevent="submitOrder" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kontak</label>
          <input
            v-model="form.contact"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
          <input v-model="form.date" type="date" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
          <input
            v-model="form.location"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="form.status" class="w-full border rounded px-3 py-2" required>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
          <select v-model="form.payment_status" class="w-full border rounded px-3 py-2" required>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partial</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Total</label>
          <input
            v-model.number="form.total_price"
            type="number"
            class="w-full border rounded px-3 py-2"
            required
            min="0"
          />
        </div>
        <div class="flex justify-end space-x-2 pt-2">
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
        <div v-if="submitError" class="text-red-600 text-sm mt-2">{{ submitError }}</div>
        <div v-if="success" class="text-green-600 text-sm mt-2">Order berhasil ditambahkan!</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api'

const form = ref({
  name: '',
  contact: '',
  date: '',
  location: '',
  status: 'pending',
  payment_status: 'unpaid',
  total_price: 0,
})
const submitError = ref('')
const success = ref(false)

async function submitOrder() {
  submitError.value = ''
  success.value = false
  try {
    await api.post('/orders', form.value)
    success.value = true
    // Reset form
    form.value = {
      name: '',
      contact: '',
      date: '',
      location: '',
      status: 'pending',
      payment_status: 'unpaid',
      total_price: 0,
    }
  } catch (e: any) {
    submitError.value = e?.response?.data?.message || 'Gagal menambah order.'
  }
}
</script>
