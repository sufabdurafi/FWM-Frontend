<template>
  <div class="min-h-screen py-4 px-1 sm:px-2">
    <!-- Header Full Width -->
    <header
      class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm px-2 sm:px-6 py-4 sticky top-0 z-10 w-full"
    >
      <div class="flex items-center gap-4">
        <FileText class="w-10 h-10 text-emerald-600" />
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Riwayat Pesanan</h1>
          <p class="text-gray-600 text-sm sm:text-base">
            Lacak dan kelola semua pesanan layanan Anda dengan mudah.
          </p>
        </div>
      </div>
      <router-link
        to="/user/dashboard"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        Kembali ke Dashboard
      </router-link>
    </header>

    <section
      class="mb-4 flex flex-wrap items-center justify-between gap-4 bg-white p-2 sm:p-4 w-full border-b border-gray-100"
    >
      <div class="flex items-center gap-2">
        <label for="status-filter" class="text-sm font-medium text-gray-600">Filter Status:</label>
        <select
          id="status-filter"
          v-model="filterStatus"
          class="rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="all">Semua Pesanan</option>
          <option value="pending">Menunggu Konfirmasi</option>
          <option value="completed">Selesai</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
      </div>
      <div class="flex items-center gap-4 text-sm text-gray-600">
        <span
          >Total: <span class="font-semibold">{{ filteredOrders.length }}</span> pesanan</span
        >
      </div>
    </section>

    <div class="w-full px-2 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full min-h-[320px]">
        <template v-if="filteredOrders.length > 0">
          <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full p-6 min-h-[320px]"
          >
            <div
              v-if="order.id === filteredOrders[0].id && filterStatus === 'all'"
              class="absolute -left-2 top-4 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-r-lg shadow-md z-10"
            >
              Terbaru
            </div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <div class="flex items-center gap-3">
                <FileText class="w-6 h-6 text-emerald-600" />
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ order.package?.name || 'Paket Tidak Diketahui' }}
                </h3>
              </div>
              <span :class="orderStatusClass(order.status)" class="flex-shrink-0">
                <Check v-if="order.status === 'completed'" class="w-4 h-4" />
                <Clock v-else-if="order.status === 'pending'" class="w-4 h-4" />
                <XCircle v-else-if="order.status === 'cancelled'" class="w-4 h-4" />
                {{ getStatusText(order.status) }}
              </span>
            </div>
            <div class="space-y-2 text-sm text-gray-600 mb-4">
              <div class="flex items-center gap-2"></div>
              <div class="flex items-center gap-2">
                <MapPin class="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span
                  >Lokasi: <span class="font-medium">{{ order.location }}</span></span
                >
              </div>
              <div class="flex items-center gap-2">
                <StickyNote class="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span
                  >Catatan:
                  <span class="font-medium">{{
                    order.notes || 'Tidak ada catatan khusus.'
                  }}</span></span
                >
              </div>
            </div>
            <div class="mt-auto">
              <div class="flex items-center gap-2 mb-2">
                <IconCashBanknotes class="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span class="text-lg font-bold text-gray-900"
                  >Rp {{ formatPrice(order.total_price) }}</span
                >
              </div>
              <span :class="paymentStatusClass(order.payment_status)" class="mb-3 block">
                <Check v-if="order.payment_status === 'paid'" class="w-4 h-4" />
                <Clock v-else-if="order.payment_status === 'pending'" class="w-4 h-4" />
                <XCircle v-else class="w-4 h-4" />
                {{ getPaymentStatusText(order.payment_status) }}
              </span>
              <div class="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  v-if="order.payment_status === 'pending'"
                  class="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  Bayar Sekarang
                </button>
                <button
                  v-if="order.status === 'pending'"
                  class="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Batalkan
                </button>
                <button
                  class="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
          <!-- Dummy grid item jika jumlah order < 3 agar grid tetap stabil -->
          <div
            v-for="n in (3 - (filteredOrders.length % 3)) % 3"
            :key="'dummy-' + n"
            class="hidden md:block"
          ></div>
        </template>
        <template v-else>
          <div
            class="flex flex-col items-center justify-center py-20 bg-white w-full col-span-1 md:col-span-3 border border-dashed border-gray-200 rounded-xl shadow min-h-[320px]"
          >
            <FileText class="w-16 h-16 text-gray-300 mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{
                filterStatus === 'all'
                  ? 'Belum Ada Pesanan'
                  : `Tidak Ada Pesanan Berstatus \"${getStatusText(filterStatus)}\"`
              }}
            </h3>
            <p class="text-gray-600 mb-6 text-center max-w-md">
              {{
                filterStatus === 'all'
                  ? 'Mulai pesan layanan kami untuk melihat riwayat pesanan Anda di sini.'
                  : 'Coba ubah filter status untuk menemukan pesanan lainnya.'
              }}
            </p>
            <router-link
              to="/user/services"
              class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              <Plus class="w-5 h-5" />
              Pesan Layanan Sekarang
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/api'
import {
  FileText,
  Check,
  Clock,
  XCircle,
  Plus,
  MapPin,
  StickyNote,
  ArrowLeft,
} from 'lucide-vue-next'
import IconCashBanknotes from '@/views/admin/components/icon/icon-cash-banknotes.vue'

// Define the Order interface for type safety
interface Order {
  id: number
  package?: { name: string } // Optional package object with a name
  date: string
  location: string
  notes: string
  payment_status: 'paid' | 'unpaid' | 'pending'
  status: 'pending' | 'completed' | 'cancelled'
  total_price: number
}

// Reactive variables for component state
const orders = ref<Order[]>([])
const loading = ref(true)
const error = ref('')
const filterStatus = ref<'all' | 'pending' | 'completed' | 'cancelled'>('all') // Strict typing for filter status

// Computed property to filter orders based on selected status
const filteredOrders = computed(() => {
  if (filterStatus.value === 'all') {
    return orders.value
  }
  return orders.value.filter((order) => order.status === filterStatus.value)
})

// Hapus totalValue jika tidak digunakan

// Function to fetch orders from the API
async function fetchOrders() {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get('/orders')
    // Ensure data is an array, handle different API response structures
    orders.value = Array.isArray(res.data.data) ? res.data.data : res.data
  } catch (e: unknown) {
    console.error('Error fetching orders:', e)
    if (typeof e === 'object' && e !== null && 'response' in e) {
      // @ts-expect-error: e.response bisa jadi dari axios
      error.value = e.response?.data?.message || 'Gagal memuat data pesanan. Silakan coba lagi.'
    } else {
      error.value = 'Gagal memuat data pesanan. Silakan coba lagi.'
    }
  } finally {
    loading.value = false
  }
}

// Lifecycle hook to fetch data when the component is mounted
onMounted(() => {
  fetchOrders()
})

// Hapus formatDate jika tidak digunakan

// Utility function to format price numbers to IDR currency format
function formatPrice(price: number) {
  // Format as IDR, no decimals, with dot separator
  return price.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// Returns dynamic CSS classes for payment status badges
function paymentStatusClass(status: Order['payment_status']) {
  const baseClass = 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold'
  switch (status) {
    case 'paid':
      return `${baseClass} bg-emerald-100 text-emerald-700`
    case 'unpaid':
      return `${baseClass} bg-red-100 text-red-600`
    case 'pending':
      return `${baseClass} bg-yellow-100 text-yellow-700`
    default:
      return `${baseClass} bg-gray-100 text-gray-600`
  }
}

// Returns dynamic CSS classes for order status badges
function orderStatusClass(status: Order['status']) {
  const baseClass = 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold'
  switch (status) {
    case 'completed':
      return `${baseClass} bg-emerald-100 text-emerald-700`
    case 'pending':
      return `${baseClass} bg-yellow-100 text-yellow-700`
    case 'cancelled':
      return `${baseClass} bg-red-100 text-red-600`
    default:
      return `${baseClass} bg-gray-100 text-gray-600`
  }
}

// Maps order status keys to user-friendly text
function getStatusText(status: Order['status'] | 'all') {
  const statusMap: Record<Order['status'] | 'all', string> = {
    all: 'Semua',
    completed: 'Selesai',
    pending: 'Menunggu Konfirmasi',
    cancelled: 'Dibatalkan',
  }
  return statusMap[status] || status
}

// Maps payment status keys to user-friendly text
function getPaymentStatusText(status: Order['payment_status']) {
  const statusMap: Record<Order['payment_status'], string> = {
    paid: 'Lunas',
    unpaid: 'Belum Bayar',
    pending: 'Menunggu Pembayaran',
  }
  return statusMap[status] || status
}
</script>

<style scoped>
/* Add any specific styles here if needed, though TailwindCSS handles most */
</style>
