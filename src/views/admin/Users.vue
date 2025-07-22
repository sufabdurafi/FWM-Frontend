<template>
  <div class="flex min-h-screen">
    <Sidebar class="w-64 hidden lg:block" />
    <div class="flex-1 lg:pl-20 lg:pt-10 lg:pr-20">
      <div class="min-h-screen p-4 font-sans">
        <div class="max-w-8xl mx-auto">
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-slate-900 mb-2">Manajemen User</h1>
            <p class="text-slate-500 text-lg">Kelola pengguna sistem dengan mudah</p>
          </div>
          <!-- Loading State -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-20">
            <div class="relative">
              <div
                class="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
              ></div>
              <div
                class="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin animate-reverse"
              ></div>
            </div>
            <p class="mt-6 text-gray-600 font-medium">Memuat data pengguna...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-20">
            <div
              class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p class="text-red-600 font-medium">{{ error }}</p>
            <button
              @click="fetchUsers"
              class="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              Coba Lagi
            </button>
          </div>

          <!-- Users Table -->
          <div
            v-else
            class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
          >
            <!-- Search and Filter Bar -->
            <div
              class="p-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/50"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="relative flex-1 max-w-md">
                  <svg
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Cari pengguna..."
                    class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div class="flex items-center space-x-3">
                  <select
                    v-model="filterRole"
                    class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  >
                    <option value="">Semua Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                      <div class="flex items-center space-x-2">
                        <span>ID</span>
                        <svg
                          class="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </div>
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                      Pengguna
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                      Tanggal Dibuat
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      class="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-for="user in filteredUsers"
                    :key="user.id"
                    class="group hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      #{{ user.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold"
                        >
                          {{ user.name.charAt(0).toUpperCase() }}
                        </div>
                        <div>
                          <p class="text-sm font-semibold text-gray-900">{{ user.name }}</p>
                          <p class="text-sm text-gray-500">{{ user.email }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                        :class="
                          user.role === 'admin'
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        "
                      >
                        <span
                          class="w-2 h-2 rounded-full mr-2"
                          :class="user.role === 'admin' ? 'bg-emerald-500' : 'bg-emerald-500'"
                        ></span>
                        {{ user.role === 'admin' ? 'Administrator' : 'Pengguna' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ formatDate(user.created_at) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200"
                      >
                        <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                        Aktif
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div
                        class="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <button
                          @click="openEditModal(user)"
                          class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                          title="Edit pengguna"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          @click="confirmDelete(user)"
                          class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          title="Hapus pengguna"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty State -->
            <div v-if="filteredUsers.length === 0 && !loading" class="text-center py-20">
              <div
                class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p class="text-gray-600 font-medium">Tidak ada pengguna yang ditemukan</p>
              <p class="text-gray-400 text-sm mt-1">Coba ubah filter atau tambah pengguna baru</p>
            </div>
          </div>
        </div>

        <!-- Modal Tambah User -->
        <div
          v-if="showAddModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
        >
          <div
            class="bg-white rounded-2xl shadow-2xl w-full max-w-full sm:max-w-md transform transition-all duration-300 scale-100"
          >
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-gray-900">Tambah Pengguna Baru</h3>
                <button
                  @click="showAddModal = false"
                  class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form @submit.prevent="submitAddUser" class="p-6 space-y-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    v-model="addForm.name"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                  <input
                    v-model="addForm.email"
                    type="email"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="nama@domain.com"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
                  <input
                    v-model="addForm.password"
                    type="password"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Minimal 6 karakter"
                    required
                    minlength="6"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2"
                    >Role Pengguna</label
                  >
                  <select
                    v-model="addForm.role"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="user">Pengguna</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showAddModal = false"
                  class="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Modal Edit User -->
        <div
          v-if="showEditModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
        >
          <div
            class="bg-white rounded-2xl shadow-2xl w-full max-w-full sm:max-w-md transform transition-all duration-300 scale-100"
          >
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-gray-900">Edit Pengguna</h3>
                <button
                  @click="showEditModal = false"
                  class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form @submit.prevent="submitEditUser" class="p-6 space-y-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    v-model="editForm.name"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                  <input
                    v-model="editForm.email"
                    type="email"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Kata Sandi
                    <span class="text-gray-400 text-xs">(kosongkan jika tidak diubah)</span>
                  </label>
                  <input
                    v-model="editForm.password"
                    type="password"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Biarkan kosong jika tidak diubah"
                    minlength="6"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2"
                    >Role Pengguna</label
                  >
                  <select
                    v-model="editForm.role"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="user">Pengguna</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showEditModal = false"
                  class="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Modal Konfirmasi Hapus -->
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            class="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100"
          >
            <div class="p-6 text-center">
              <div
                class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Penghapusan</h3>
              <p class="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus pengguna
                <span class="font-semibold text-gray-900">{{ deleteTarget?.name }}</span
                >?
                <br />
                <span class="text-sm text-red-600">Tindakan ini tidak dapat dibatalkan.</span>
              </p>

              <div class="flex justify-center space-x-3">
                <button
                  @click="showDeleteModal = false"
                  class="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  @click="deleteUser"
                  class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/api'
import Sidebar from './components/layout/Sidebar.vue'

interface User {
  id: number
  name: string
  email: string
  role: string
  created_at: string
  password?: string
}
const users = ref<User[]>([])
const loading = ref(true)
const error = ref('')
const searchTerm = ref('')
const filterRole = ref('')

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const deleteTarget = ref<any>(null)

const addForm = ref({ name: '', email: '', password: '', role: 'user' })
const editForm = ref({ id: '', name: '', email: '', password: '', role: 'user' })

const filteredUsers = computed(() => {
  let filtered = users.value

  if (searchTerm.value) {
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
  }

  if (filterRole.value) {
    filtered = filtered.filter((user) => user.role === filterRole.value)
  }

  return filtered
})

function formatDate(date: string) {
  if (!date) return '-'
  const safeDate = date.replace(' ', 'T')
  const d = new Date(safeDate)
  if (isNaN(d.getTime())) return '-'
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function fetchUsers() {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get('/users')
    users.value = res.data
  } catch (e) {
    error.value = 'Gagal memuat data pengguna. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

async function submitAddUser() {
  try {
    await api.post('/users', addForm.value)
    showAddModal.value = false
    addForm.value = { name: '', email: '', password: '', role: 'user' }
    fetchUsers()
  } catch (e: any) {
    alert(e?.response?.data?.message || 'Gagal menambahkan pengguna')
  }
}

function openEditModal(user: any) {
  editForm.value = { ...user, password: '' }
  showEditModal.value = true
}

async function submitEditUser() {
  try {
    const payload = { ...editForm.value }
    if (!payload.password && 'password' in payload) {
      // @ts-ignore
      delete payload.password
    }
    await api.put(`/users/${editForm.value.id}`, payload)
    showEditModal.value = false
    fetchUsers()
  } catch (e: any) {
    alert(e?.response?.data?.message || 'Gagal memperbarui pengguna')
  }
}

function confirmDelete(user: any) {
  deleteTarget.value = user
  showDeleteModal.value = true
}

async function deleteUser() {
  if (!deleteTarget.value) return
  try {
    await api.delete(`/users/${deleteTarget.value.id}`)
    showDeleteModal.value = false
    fetchUsers()
  } catch (e: any) {
    alert(e?.response?.data?.message || 'Gagal menghapus pengguna')
  }
}
</script>

<style scoped>
@keyframes reverse-spin {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-reverse {
  animation: reverse-spin 1s linear infinite;
}
</style>
