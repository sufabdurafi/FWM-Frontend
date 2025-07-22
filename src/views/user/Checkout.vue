<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Progress Steps and Back Button -->
      <div class="flex items-center justify-start gap-30 mb-10">
        <button
          @click="router.go(-1)"
          class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <!-- Form Data User -->
          <div class="lg:col-span-2 p-6 lg:p-8">
            <div class="border-b border-gray-200 pb-6 mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Informasi Pemesanan</h2>
              <p class="mt-1 text-sm text-gray-500">Mohon isi data dengan lengkap dan benar</p>
            </div>

            <form @submit.prevent="submitOrder" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">No. WhatsApp</label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <span class="text-gray-500">+62</span>
                    </div>
                    <input
                      v-model="form.contact"
                      type="tel"
                      class="pl-12 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="812-3456-7890"
                      pattern="[0-9]*"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5"
                    >Tanggal Pemotretan</label
                  >
                  <div class="relative">
                    <input
                      v-model="form.date"
                      type="date"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      :min="new Date().toISOString().split('T')[0]"
                      required
                    />
                    <div
                      class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                    >
                      <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1.5"
                    >Lokasi Pemotretan</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="form.location"
                      type="text"
                      class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Alamat lengkap lokasi pemotretan"
                      required
                    />
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1.5"
                    >Catatan Tambahan</label
                  >
                  <textarea
                    v-model="form.notes"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows="3"
                    placeholder="Contoh: Konsep foto, waktu yang diinginkan, akses lokasi, dll."
                  ></textarea>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:opacity-90 transform hover:scale-[1.01] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                  :disabled="loading"
                  :class="{ 'opacity-70 cursor-not-allowed': loading }"
                >
                  <svg
                    v-if="!loading"
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{{ loading ? 'Memproses...' : 'Konfirmasi & Lanjutkan Pembayaran' }}</span>
                </button>
                <p class="mt-3 text-xs text-center text-gray-500">
                  Dengan melanjutkan, Anda menyetujui
                  <a href="#" class="text-blue-600 hover:underline">Syarat & Ketentuan</a> kami
                </p>
              </div>
            </form>

            <div v-if="success" class="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-green-600 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 class="text-green-800 font-semibold">Pesanan Berhasil Dibuat!</h3>
                  <p class="text-green-700 text-sm">
                    Silakan cek WhatsApp/email untuk informasi pembayaran.
                  </p>
                </div>
              </div>
            </div>

            <div v-if="submitError" class="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-red-600 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <h3 class="text-red-800 font-semibold">Terjadi Kesalahan</h3>
                  <p class="text-red-700 text-sm">{{ submitError }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Ringkasan Paket -->
          <div class="bg-gray-50 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200">
            <div class="sticky top-8">
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">Ringkasan Paket</h3>
                <div v-if="loading" class="text-center py-8">Memuat data paket...</div>
                <div v-else-if="error" class="text-center text-red-600 py-8">{{ error }}</div>
                <div v-else>
                  <div class="bg-white p-5 rounded-xl shadow-sm mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h4>
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0">
                        <div
                          class="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center"
                        >
                          <svg
                            class="w-8 h-8 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-gray-900 truncate">
                          {{ packageItem?.name }}
                        </h3>
                        <p class="text-sm text-gray-500 mt-1 line-clamp-2">
                          {{ packageItem?.description }}
                        </p>
                        <div class="mt-2">
                          <span
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {{ packageItem?.duration }} Jam
                          </span>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-lg font-bold text-gray-900">
                          {{ formatRupiah(packageItem?.price) }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <h5 class="text-sm font-medium text-gray-700 mb-2">Fitur Utama:</h5>
                      <ul class="space-y-2">
                        <li
                          v-for="feature in parseFeatures(packageItem?.features)"
                          :key="feature"
                          class="flex items-start text-gray-700"
                        >
                          <svg
                            class="flex-shrink-0 w-5 h-5 text-green-500 mr-2 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span class="text-gray-700">{{ feature }}</span>
                        </li>
                      </ul>
                    </div>

                    <div v-if="packageItem?.additionalInfo" class="bg-blue-50 p-3 rounded-lg">
                      <div class="flex">
                        <svg
                          class="h-5 w-5 text-blue-400 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p class="text-sm text-blue-700">{{ packageItem.additionalInfo }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-600">Subtotal</span>
                      <span class="font-medium text-gray-900">{{
                        formatRupiah(packageItem?.price)
                      }}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-500">PPN (10%)</span>
                      <span class="text-gray-500">{{
                        formatRupiah(packageItem?.price * 0.1 || 0)
                      }}</span>
                    </div>
                    <div class="border-t border-gray-200 my-2"></div>
                    <div class="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span class="text-2xl text-blue-700">{{
                        formatRupiah(packageItem?.price * 1.1 || 0)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-10 text-xs text-gray-500 text-center">
                <svg
                  class="w-5 h-5 inline-block mr-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 8v-2"
                  />
                </svg>
                Data Anda aman dan terenkripsi. Pembayaran akan diproses setelah konfirmasi pesanan.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api'
import UserNavbar from '@/components/UserNavbar.vue'

const router = useRouter()
const route = useRoute()
const packageId = route.params.packageId
const packageItem = ref<any>(null)
const loading = ref(true)
const error = ref('')
const snapToken = ref<string | null>(null)

const form = ref({
  name: '',
  contact: '',
  date: '',
  location: '',
  notes: '',
})
const success = ref(false)
const submitError = ref('')

function formatRupiah(price: number | string): string {
  if (!price) return ''
  const num = typeof price === 'string' ? parseFloat(price) : price
  return 'Rp ' + num.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function parseFeatures(features: string[] | string | undefined): string[] {
  if (!features) return []
  if (Array.isArray(features)) return features
  if (typeof features === 'string') {
    try {
      const parsed = JSON.parse(features)
      if (Array.isArray(parsed)) return parsed
    } catch (e) {
      return features
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f.length > 0)
    }
    return features
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0)
  }
  return []
}

async function fetchPackage() {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get(`/packages/${packageId}`)
    packageItem.value = res.data
  } catch (e: any) {
    error.value = 'Gagal memuat data paket.'
  } finally {
    loading.value = false
  }
}

async function submitOrder() {
  submitError.value = ''
  success.value = false
  try {
    // 1. Buat order
    const orderRes = await api.post('/orders', {
      package_id: packageId,
      ...form.value,
      total_price: packageItem.value.price,
    })
    const orderId = orderRes.data.id
    // 2. Ambil Snap Token
    const snapRes = await api.post(`/orders/${orderId}/midtrans-token`)
    snapToken.value = snapRes.data.token
    success.value = true
    // 3. Tampilkan Snap popup
    showSnap()
  } catch (e: any) {
    submitError.value = e?.response?.data?.message || 'Gagal membuat pesanan.'
  }
}

function showSnap() {
  if (!snapToken.value) return
  // Pastikan Snap JS sudah ada
  if (!window.snap) {
    alert('Midtrans Snap belum termuat. Coba refresh halaman.')
    return
  }
  window.snap.pay(snapToken.value, {
    onSuccess: function (result: any) {
      alert('Pembayaran berhasil!')
      router.push('/user/orders')
    },
    onPending: function (result: any) {
      alert('Transaksi belum selesai. Silakan cek riwayat pesanan untuk update status.')
      router.push('/user/orders')
    },
    onError: function (result: any) {
      alert('Terjadi error pada pembayaran.')
    },
    onClose: function () {
      // User menutup popup
    },
  })
}

// Load Snap JS saat mount
onMounted(() => {
  fetchPackage()
  if (!document.getElementById('midtrans-snap')) {
    const script = document.createElement('script')
    script.id = 'midtrans-snap'
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '')
    document.body.appendChild(script)
  }
})

// Tambahkan deklarasi global agar window.snap dikenali
declare global {
  interface Window {
    snap: any
  }
}
</script>
