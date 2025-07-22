<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar class="w-64 hidden lg:block fixed lg:relative" />
    <div class="flex-1 lg:ml-24 p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-slate-900 mb-2">Dashboard Admin</h1>
          <p class="text-slate-500 text-lg">Statistik, grafik, dan notifikasi sistem</p>
        </div>

        <!-- Statistik Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div
            class="bg-white rounded-2xl p-6 shadow border border-gray-100 flex items-center gap-4"
          >
            <div class="p-3 bg-emerald-100 rounded-full">
              <Users class="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p class="text-gray-600 text-sm font-medium">Total User</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total_users }}</p>
            </div>
          </div>
          <div
            class="bg-white rounded-2xl p-6 shadow border border-gray-100 flex items-center gap-4"
          >
            <div class="p-3 bg-blue-100 rounded-full">
              <ShoppingCart class="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Order</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total_orders }}</p>
            </div>
          </div>
          <div
            class="bg-white rounded-2xl p-6 shadow border border-gray-100 flex items-center gap-4"
          >
            <div class="p-3 bg-yellow-100 rounded-full">
              <Package class="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Paket</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total_packages }}</p>
            </div>
          </div>
          <div
            class="bg-white rounded-2xl p-6 shadow border border-gray-100 flex items-center gap-4"
          >
            <div class="p-3 bg-purple-100 rounded-full">
              <Image class="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Portofolio</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total_portfolios }}</p>
            </div>
          </div>
        </div>

        <!-- Grafik & Notifikasi -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <!-- Grafik -->
          <div class="bg-white rounded-2xl p-6 shadow border border-gray-100 col-span-2">
            <h2 class="text-lg font-bold text-slate-800 mb-4">Grafik Order per Bulan</h2>
            <div class="h-64 flex items-center justify-center text-gray-400">
              <div v-if="chartLoading">Loading grafik...</div>
              <Line v-else :data="chartData" :options="chartOptions" />
            </div>
          </div>
          <!-- Notifikasi -->
          <div class="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h2 class="text-lg font-bold text-slate-800 mb-4">Notifikasi</h2>
            <ul class="space-y-3">
              <li v-for="(notif, i) in stats.notifications" :key="i" class="flex items-start gap-3">
                <span
                  :class="[
                    'w-3 h-3 rounded-full mt-1',
                    notif.type === 'order'
                      ? 'bg-emerald-500'
                      : notif.type === 'user'
                        ? 'bg-blue-500'
                        : 'bg-yellow-500',
                  ]"
                ></span>
                <div>
                  <p class="text-sm text-gray-800 font-semibold">{{ notif.message }}</p>
                  <p class="text-xs text-gray-500">{{ notif.time }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Data Terbaru -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div class="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h2 class="text-lg font-bold text-slate-800 mb-4">Order Terbaru</h2>
            <ul class="divide-y divide-gray-100">
              <li
                v-for="order in stats.latest_orders"
                :key="order.id"
                class="py-3 flex items-center justify-between"
              >
                <div>
                  <p class="font-semibold text-gray-800">Order #{{ order.id }}</p>
                  <p class="text-xs text-gray-500">
                    {{ order.package_id ? 'Paket #' + order.package_id : '-' }} &bull;
                    {{
                      order.created_at
                        ? new Date(order.created_at.replace(' ', 'T')).toLocaleDateString('id-ID')
                        : '-'
                    }}
                  </p>
                </div>
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700"
                  >{{ order.payment_status || 'Paid' }}</span
                >
              </li>
            </ul>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow border border-gray-100">
            <h2 class="text-lg font-bold text-slate-800 mb-4">User Terbaru</h2>
            <ul class="divide-y divide-gray-100">
              <li
                v-for="user in stats.latest_users"
                :key="user.id"
                class="py-3 flex items-center justify-between"
              >
                <div>
                  <p class="font-semibold text-gray-800">{{ user.name }}</p>
                  <p class="text-xs text-gray-500">{{ user.email }}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                  >Baru</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import api from '@/api'
import { Users, ShoppingCart, Package, Image } from 'lucide-vue-next'
import Sidebar from './components/layout/Sidebar.vue'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Notification {
  type: string
  message: string
  time: string
}
interface Order {
  id: number
  package_id: number
  created_at: string
  payment_status: string
  // tambahkan field lain jika ada
}
interface User {
  id: number
  name: string
  email: string
  created_at: string
  role: string
}
const stats = ref<{
  total_users: number
  total_orders: number
  total_packages: number
  total_portfolios: number
  latest_orders: Order[]
  latest_users: User[]
  notifications: Notification[]
}>({
  total_users: 0,
  total_orders: 0,
  total_packages: 0,
  total_portfolios: 0,
  latest_orders: [],
  latest_users: [],
  notifications: [],
})
const statsLoading = ref(true)

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Order',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: '#10b981',
      borderWidth: 3,
      data: [],
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
    },
  ],
})
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 5 },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false,
      },
    },
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false,
      },
    },
  },
  elements: {
    point: {
      hoverBackgroundColor: '#10b981',
    },
  },
}
const chartLoading = ref(true)

onMounted(async () => {
  statsLoading.value = true
  chartLoading.value = true
  try {
    const [statsRes, chartRes] = await Promise.all([
      api.get('/dashboard-stats'),
      api.get('/orders-per-month'),
    ])
    stats.value = statsRes.data
    chartData.value.labels = chartRes.data.labels
    chartData.value.datasets[0].data = chartRes.data.data
  } catch (e) {
    stats.value = {
      total_users: 0,
      total_orders: 0,
      total_packages: 0,
      total_portfolios: 0,
      latest_orders: [],
      latest_users: [],
      notifications: [],
    }
    chartData.value.labels = []
    chartData.value.datasets[0].data = []
  } finally {
    statsLoading.value = false
    chartLoading.value = false
  }
})
</script>
