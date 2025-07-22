<template>
  <div class="flex min-h-screen">
    <Sidebar class="w-64 hidden lg:block fixed lg:relative" />
    <div class="flex-1 lg:ml-29 p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-4xl font-bold text-slate-900 mb-2">Orders</h1>
          <p class="text-slate-500">Kelola dan pantau semua pesanan Anda</p>
        </div>
        <button
          @click="
            editingOrder = {
              id: '',
              name: '',
              contact: '',
              package_name: '',
              package: { name: '' },
              date: '',
              location: '',
              status: '',
              payment_status: '',
              total_price: 0,
            }
          "
          class="group relative px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambahkan Pesanan
          </span>
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Orders</p>
              <p class="text-2xl font-bold text-gray-900">{{ orders.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-bold text-gray-900">{{ completedOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-gray-900">{{ pendingOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900">Rp{{ totalRevenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div class="relative">
              <svg
                class="absolute left-3 top-3 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari nama, kontak, atau paket..."
                class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="sm:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="statusFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="confirmed">Dikonfirmasi</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>

          <div class="sm:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment</label>
            <select
              v-model="paymentFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Payment</option>
              <option value="paid">Lunas</option>
              <option value="unpaid">Belum Lunas</option>
              <option value="partial">Bayar Sebagian</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Orders Table/Cards -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Daftar Orders</h2>
        </div>

        <div v-if="loading" class="p-6">
          <div class="space-y-4">
            <div v-for="n in 5" :key="n" class="animate-pulse">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div class="w-24 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredOrders.length === 0" class="p-12 text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada orders</h3>
          <p class="mt-1 text-sm text-gray-500">
            Belum ada orders yang ditemukan dengan filter yang dipilih.
          </p>
        </div>

        <div v-else>
          <!-- Mobile View -->
          <div class="block lg:hidden">
            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="border-b border-gray-200 last:border-b-0"
            >
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <span class="text-blue-600 font-medium text-sm">{{
                        order.name?.charAt(0)?.toUpperCase()
                      }}</span>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900">{{ order.name }}</h3>
                      <p class="text-sm text-gray-600">{{ order.contact }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span
                      :class="[
                        'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                        {
                          'bg-yellow-100 text-yellow-700': order.status === 'pending',
                          'bg-blue-100 text-blue-700': order.status === 'confirmed',
                          'bg-green-100 text-green-700': order.status === 'completed',
                          'bg-red-100 text-red-700': order.status === 'cancelled',
                        },
                      ]"
                    >
                      {{ translateStatus(order.status) }}
                    </span>
                  </div>
                </div>

                <div class="space-y-2 mb-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Paket:</span>
                    <span class="text-sm font-medium">{{
                      order.package_name || order.package?.name || '-'
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Tanggal:</span>
                    <span class="text-sm font-medium">{{ formatDate(order.date) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Lokasi:</span>
                    <span class="text-sm font-medium">{{ order.location }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Payment:</span>
                    <span
                      :class="[
                        'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                        {
                          'bg-green-100 text-green-700': order.payment_status === 'paid',
                          'bg-red-100 text-red-700': order.payment_status === 'unpaid',
                          'bg-yellow-100 text-yellow-700': order.payment_status === 'partial',
                        },
                      ]"
                    >
                      {{ translatePaymentStatus(order.payment_status) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Total:</span>
                    <span class="text-sm font-bold text-gray-900"
                      >Rp{{ Number(order.total_price).toLocaleString() }}</span
                    >
                  </div>
                </div>

                <div class="flex space-x-2">
                  <button
                    @click="viewOrder(order)"
                    class="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Detail
                  </button>
                  <button
                    @click="editOrder(order)"
                    class="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDeleteOrder(order)"
                    class="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
                <!-- Tambahkan penutup div di sini untuk flex tombol -->
              </div>
            </div>
          </div>

          <!-- Desktop View -->
          <div class="hidden lg:block overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Paket
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Lokasi
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="order in filteredOrders"
                  :key="order.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                      >
                        <span class="text-blue-600 font-medium text-sm">{{
                          order.name?.charAt(0)?.toUpperCase()
                        }}</span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ order.name }}</div>
                        <div class="text-sm text-gray-500">{{ order.contact }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ order.package_name || (order.package && order.package.name) || '-' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatDate(order.date) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ order.location }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                        {
                          'bg-yellow-100 text-yellow-700': order.status === 'pending',
                          'bg-blue-100 text-blue-700': order.status === 'confirmed',
                          'bg-green-100 text-green-700': order.status === 'completed',
                          'bg-red-100 text-red-700': order.status === 'cancelled',
                        },
                      ]"
                    >
                      {{ translateStatus(order.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                        {
                          'bg-green-100 text-green-700': order.payment_status === 'paid',
                          'bg-red-100 text-red-700': order.payment_status === 'unpaid',
                          'bg-yellow-100 text-yellow-700': order.payment_status === 'partial',
                        },
                      ]"
                    >
                      {{ translatePaymentStatus(order.payment_status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      Rp{{ Number(order.total_price).toLocaleString() }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        @click="viewOrder(order)"
                        class="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Detail
                      </button>
                      <button
                        @click="editOrder(order)"
                        class="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        @click="confirmDeleteOrder(order)"
                        class="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Detail Modal -->
  <div
    v-if="selectedOrder"
    class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Detail Order</h3>
          <button @click="selectedOrder = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium text-gray-900 mb-4">Informasi Customer</h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nama</label>
                <p class="text-sm text-gray-900">{{ selectedOrder.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Kontak</label>
                <p class="text-sm text-gray-900">{{ selectedOrder.contact }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Lokasi</label>
                <p class="text-sm text-gray-900">{{ selectedOrder.location }}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-4">Informasi Order</h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">Paket</label>
                <p class="text-sm text-gray-900">
                  {{
                    selectedOrder.package_name ||
                    (selectedOrder.package && selectedOrder.package.name) ||
                    '-'
                  }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Tanggal</label>
                <p class="text-sm text-gray-900">{{ formatDate(selectedOrder.date) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <span
                  :class="[
                    'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                    {
                      'bg-yellow-100 text-yellow-700': selectedOrder.status === 'pending',
                      'bg-blue-100 text-blue-700': selectedOrder.status === 'confirmed',
                      'bg-green-100 text-green-700': selectedOrder.status === 'completed',
                      'bg-red-100 text-red-700': selectedOrder.status === 'cancelled',
                    },
                  ]"
                >
                  {{ translateStatus(selectedOrder.status) }}
                </span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Payment Status</label>
                <span
                  :class="[
                    'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                    {
                      'bg-green-100 text-green-700': selectedOrder.payment_status === 'paid',
                      'bg-red-100 text-red-700': selectedOrder.payment_status === 'unpaid',
                      'bg-yellow-100 text-yellow-700': selectedOrder.payment_status === 'partial',
                    },
                  ]"
                >
                  {{ translatePaymentStatus(selectedOrder.payment_status) }}
                </span>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Total</label>
                <p class="text-lg font-bold text-gray-900">
                  Rp{{ Number(selectedOrder.total_price).toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          @click="selectedOrder = null"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Tutup
        </button>
        <button
          @click="editOrder(selectedOrder)"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Edit Order
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Edit Order -->
  <div
    v-if="editingOrder"
    class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
  >
    <div class="bg-white rounded-lg max-w-full w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900">Edit Order</h3>
        <button @click="editingOrder = null" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form @submit.prevent="submitEdit">
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nama</label>
            <input v-model="editForm.name" class="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Kontak</label>
            <input v-model="editForm.contact" class="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Tanggal</label>
            <input
              v-model="editForm.date"
              type="date"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Lokasi</label>
            <input v-model="editForm.location" class="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select v-model="editForm.status" class="w-full border rounded px-3 py-2">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Payment Status</label>
            <select v-model="editForm.payment_status" class="w-full border rounded px-3 py-2">
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="partial">Partial</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Total</label>
            <input
              v-model.number="editForm.total_price"
              type="number"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            @click="editingOrder = null"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/api'
import Sidebar from './components/layout/Sidebar.vue'

interface Order {
  id: string
  name: string
  contact: string
  package_name?: string
  package?: { name: string }
  date: string
  location: string
  status: string
  payment_status: string
  total_price: number
}

const orders = ref<Order[]>([])
const loading = ref(true)
const selectedOrder = ref<Order | null>(null)
const searchQuery = ref('')
const statusFilter = ref('')
const paymentFilter = ref('')

// Tambahkan state untuk edit
const editingOrder = ref<Order | null>(null)
const editForm = ref({
  name: '',
  contact: '',
  date: '',
  location: '',
  status: '',
  payment_status: '',
  total_price: 0,
})

const filteredOrders = computed(() => {
  let filtered = orders.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (order) =>
        order.name.toLowerCase().includes(query) ||
        order.contact.toLowerCase().includes(query) ||
        (order.package_name && order.package_name.toLowerCase().includes(query)) ||
        (order.package?.name && order.package.name.toLowerCase().includes(query)),
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value)
  }

  if (paymentFilter.value) {
    filtered = filtered.filter((order) => order.payment_status === paymentFilter.value)
  }

  // Jangan urutkan lagi di frontend, biarkan urutan dari backend
  return filtered
})

const completedOrders = computed(
  () => orders.value.filter((order) => order.status === 'completed').length,
)

const pendingOrders = computed(
  () => orders.value.filter((order) => order.status === 'pending').length,
)

const totalRevenue = computed(() =>
  orders.value.reduce((sum, order) => sum + Number(order.total_price), 0),
)

const deletingOrder = ref<Order | null>(null)
const deleteLoading = ref(false)

// Fungsi untuk menerjemahkan status ke bahasa Indonesia
function translateStatus(status: string) {
  const statusMap: { [key: string]: string } = {
    pending: 'Menunggu',
    confirmed: 'Dikonfirmasi',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  }
  return statusMap[status] || status
}

// Fungsi untuk menerjemahkan payment status ke bahasa Indonesia
function translatePaymentStatus(status: string) {
  const paymentMap: { [key: string]: string } = {
    paid: 'Lunas',
    unpaid: 'Belum Lunas',
    partial: 'Bayar Sebagian',
  }
  return paymentMap[status] || status
}

onMounted(async () => {
  try {
    const res = await api.get('/orders')
    // Ambil urutan dari backend saja
    const data = res.data.data || res.data
    orders.value = data
  } catch (e) {
    console.error('Gagal memuat data orders:', e)
    // Bisa tambahkan toast notification di sini
  } finally {
    loading.value = false
  }
})

function viewOrder(order: Order) {
  selectedOrder.value = order
}

function editOrder(order: Order) {
  editingOrder.value = { ...order }
  editForm.value = {
    name: order.name,
    contact: order.contact,
    date: order.date,
    location: order.location,
    status: order.status,
    payment_status: order.payment_status,
    total_price: order.total_price,
  }
}

async function submitEdit() {
  if (!editingOrder.value) return
  try {
    await api.put(`/orders/${editingOrder.value.id}`, editForm.value)
    // Update data di frontend
    const idx = orders.value.findIndex((o) => o.id === editingOrder.value?.id)
    if (idx !== -1 && editingOrder.value) {
      orders.value[idx] = { ...orders.value[idx], ...editForm.value }
    }
    editingOrder.value = null
    // Optional: tampilkan notifikasi sukses
  } catch (e) {
    alert('Gagal update order')
  }
}

function confirmDeleteOrder(order: Order) {
  if (confirm(`Yakin ingin menghapus order atas nama ${order.name}?`)) {
    deleteOrder(order)
  }
}

async function deleteOrder(order: Order) {
  deleteLoading.value = true
  try {
    await api.delete(`/orders/${order.id}`)
    orders.value = orders.value.filter((o) => o.id !== order.id)
    // Optional: tampilkan notifikasi sukses
    alert('Order berhasil dihapus')
  } catch (e) {
    alert('Gagal menghapus order')
  } finally {
    deleteLoading.value = false
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getStatusClass(status: string) {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

function getPaymentClass(status: string) {
  const classes = {
    paid: 'text-green-600',
    unpaid: 'text-red-600',
    partial: 'text-yellow-600',
  }
  return classes[status as keyof typeof classes] || 'text-gray-600'
}
</script>
