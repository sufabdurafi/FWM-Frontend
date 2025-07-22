<template>
  <div class="flex min-h-screen">
    <Sidebar class="w-64 hidden lg:block" />
    <div class="flex-1 lg:pl-20 lg:pt-10 lg:pr-20">
      <div class="min-h-screen sm:p-6 font-sans">
        <div class="max-w-8xl mx-auto">
          <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-4xl font-bold text-gray-800 mb-2">Portfolio</h1>
              <p class="text-gray-600 text-lg">Kelola portofolio hasil pekerjaan drone Anda</p>
            </div>
            <button
              @click="showAddModal = true"
              class="group relative px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 transition-transform group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Tambah Portofolio
              </span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-medium">Total Portofolio</p>
                  <p class="text-3xl font-bold text-gray-900">{{ portfolios.length }}</p>
                </div>
                <div class="p-3 bg-gray-100 rounded-full">
                  <svg
                    class="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-medium">Total Gambar</p>
                  <p class="text-3xl font-bold text-gray-900">{{ totalImages }}</p>
                </div>
                <div class="p-3 bg-gray-100 rounded-full">
                  <svg
                    class="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-medium">Total Video</p>
                  <p class="text-3xl font-bold text-gray-900">{{ totalVideos }}</p>
                </div>
                <div class="p-3 bg-gray-100 rounded-full">
                  <svg
                    class="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="animate-pulse">
              <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100 h-80">
                <div class="h-40 bg-gray-200 rounded-xl mb-4"></div>
                <div class="space-y-3">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="portfolios.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="portfolio in portfolios"
              :key="portfolio.id"
              class="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  v-if="portfolio.images && portfolio.images.length > 0"
                  :src="portfolio.images[0].image_url"
                  :alt="portfolio.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div v-else class="flex items-center justify-center h-full">
                  <svg
                    class="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div class="absolute top-4 right-4 flex gap-2">
                  <span
                    v-if="portfolio.images && portfolio.images.length > 0"
                    class="px-2 py-1 bg-black/60 text-white text-xs rounded-full"
                  >
                    {{ portfolio.images.length }} 📸
                  </span>
                  <span
                    v-if="portfolio.videos && portfolio.videos.length > 0"
                    class="px-2 py-1 bg-black/60 text-white text-xs rounded-full"
                  >
                    {{ portfolio.videos.length }} 🎥
                  </span>
                </div>
              </div>

              <div class="p-6">
                <h3
                  class="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-700 transition-colors"
                >
                  {{ portfolio.title }}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                  {{ portfolio.description || 'Tidak ada deskripsi' }}
                </p>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">
                    {{ formatDate(portfolio.created_at) }}
                  </span>
                  <div class="flex gap-2">
                    <button
                      @click="viewPortfolio(portfolio)"
                      class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      Detail
                    </button>
                    <button
                      @click="editPortfolio(portfolio)"
                      class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-16">
            <div class="max-w-md mx-auto">
              <div class="mb-6">
                <svg
                  class="w-24 h-24 text-gray-300 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Belum ada portofolio</h3>
              <p class="text-gray-600 mb-6">
                Mulai buat portofolio pertama Anda untuk menampilkan hasil pekerjaan drone
              </p>
              <button
                @click="showAddModal = true"
                class="px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                + Tambah Portofolio Pertama
              </button>
            </div>
          </div>

          <div
            v-if="showAddModal"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <div
              class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-xl font-bold text-gray-900">Tambah Portofolio Baru</h3>
                <button
                  @click="showAddModal = false"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
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

              <form @submit.prevent="submitAddPortfolio">
                <div class="p-6 space-y-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2"
                      >Judul Portofolio</label
                    >
                    <input
                      v-model="addForm.title"
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                      placeholder="Masukkan judul portofolio..."
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                    <textarea
                      v-model="addForm.description"
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-none"
                      rows="4"
                      placeholder="Jelaskan tentang portofolio ini..."
                    ></textarea>
                  </div>
                </div>

                <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="showAddModal = false"
                    class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all transform hover:scale-105"
                  >
                    Simpan Portofolio
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            v-if="showDetailModal && selectedPortfolio"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <div
              class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-xl font-bold text-gray-900">Detail Portofolio</h3>
                <button
                  @click="showDetailModal = false"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
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

              <div class="p-6 space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-1">Judul</label>
                      <p class="text-lg font-medium text-gray-900">{{ selectedPortfolio.title }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-1"
                        >Deskripsi</label
                      >
                      <p class="text-gray-700">
                        {{ selectedPortfolio.description || 'Tidak ada deskripsi' }}
                      </p>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-1"
                        >Tanggal Dibuat</label
                      >
                      <p class="text-gray-700">{{ formatDate(selectedPortfolio.created_at) }}</p>
                    </div>
                    <div class="flex gap-4">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-gray-600">
                          {{ selectedPortfolio.images?.length || 0 }}
                        </div>
                        <div class="text-sm text-gray-600">Gambar</div>
                      </div>
                      <div class="text-center">
                        <div class="text-2xl font-bold text-gray-600">
                          {{ selectedPortfolio.videos?.length || 0 }}
                        </div>
                        <div class="text-sm text-gray-600">Video</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-gray-900">Gambar</h4>
                    <form @submit.prevent="submitAddImage" class="flex gap-2">
                      <input
                        type="file"
                        @change="onImageFileChange"
                        accept="image/*"
                        class="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        required
                        :disabled="imageUploading"
                      />
                      <button
                        type="submit"
                        class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
                        :disabled="imageUploading"
                      >
                        <span v-if="imageUploading">
                          <svg class="animate-spin h-4 w-4 mr-1 inline-block" viewBox="0 0 24 24">
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                              fill="none"
                            />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Uploading...
                        </span>
                        <span v-else>Upload</span>
                      </button>
                    </form>
                  </div>

                  <div
                    v-if="selectedPortfolio.images && selectedPortfolio.images.length > 0"
                    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    <div
                      v-for="(img, i) in selectedPortfolio.images"
                      :key="i"
                      class="group relative"
                    >
                      <img
                        :src="img.image_url"
                        :alt="`Image ${i + 1}`"
                        class="w-full h-32 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow cursor-pointer"
                        @click="openImageModal(img.image_url)"
                      />
                      <div
                        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors"
                      ></div>
                    </div>
                  </div>
                  <div v-else class="text-center py-8 text-gray-500">
                    <svg
                      class="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>Belum ada gambar</p>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-gray-900">Video</h4>
                    <form @submit.prevent="submitAddVideo" class="flex gap-2">
                      <input
                        type="file"
                        @change="onVideoFileChange"
                        accept="video/*"
                        class="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        required
                        :disabled="videoUploading"
                      />
                      <button
                        type="submit"
                        class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
                        :disabled="videoUploading"
                      >
                        <span v-if="videoUploading">
                          <svg class="animate-spin h-4 w-4 mr-1 inline-block" viewBox="0 0 24 24">
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                              fill="none"
                            />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Uploading...
                        </span>
                        <span v-else>Upload</span>
                      </button>
                    </form>
                  </div>

                  <div
                    v-if="selectedPortfolio.videos && selectedPortfolio.videos.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div v-for="(vid, i) in selectedPortfolio.videos" :key="i">
                      <video
                        :src="vid.video_url"
                        controls
                        class="w-full h-48 rounded-xl shadow-md"
                        :poster="vid.thumbnail_url"
                      ></video>
                    </div>
                  </div>
                  <div v-else class="text-center py-8 text-gray-500">
                    <svg
                      class="w-16 h-16 mx-auto mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p>Belum ada video</p>
                  </div>
                </div>
              </div>

              <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                  @click="showDetailModal = false"
                  class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Tutup
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

interface Portfolio {
  id: number
  title: string
  description: string
  images: { image_url: string }[]
  videos: { video_url: string; thumbnail_url?: string }[]
  created_at: string
  // tambahkan field lain jika ada
}

const portfolios = ref<Portfolio[]>([])
const loading = ref(true)

// State untuk modal tambah
const showAddModal = ref(false)
const addForm = ref({
  title: '',
  description: '',
})

// State untuk modal detail
const selectedPortfolio = ref<Portfolio | null>(null)
const showDetailModal = ref(false)

// State form gambar/video
const imageFile = ref<File | null>(null)
const videoFile = ref<File | null>(null)

// State loading khusus untuk proses upload gambar
const imageUploading = ref(false)
const videoUploading = ref(false)

// Computed properties for stats
const totalImages = computed(() => {
  return portfolios.value.reduce((total, portfolio) => {
    return total + (portfolio.images?.length || 0)
  }, 0)
})

const totalVideos = computed(() => {
  return portfolios.value.reduce((total, portfolio) => {
    return total + (portfolio.videos?.length || 0)
  }, 0)
})

function onImageFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target && target.files) {
    imageFile.value = target.files[0]
  }
}

function onVideoFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target && target.files) {
    videoFile.value = target.files[0]
  }
}

onMounted(async () => {
  try {
    const res = await api.get('/portfolios')
    portfolios.value = res.data.data || res.data
  } catch (e) {
    console.error('Error loading portfolios:', e)
    // Anda mungkin ingin menampilkan notifikasi toast di sini
  } finally {
    loading.value = false
  }
})

async function submitAddPortfolio() {
  if (!addForm.value.title.trim()) {
    alert('Judul portofolio tidak boleh kosong')
    return
  }

  try {
    const res = await api.post('/portfolios', addForm.value)
    portfolios.value.unshift(res.data)
    showAddModal.value = false
    addForm.value = { title: '', description: '' }
    // Anda mungkin ingin menampilkan notifikasi sukses di sini
  } catch (e) {
    console.error('Error adding portfolio:', e)
    alert('Gagal menambah portofolio')
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function viewPortfolio(portfolio: Portfolio) {
  selectedPortfolio.value = portfolio
  showDetailModal.value = true
}

function editPortfolio(portfolio: Portfolio) {
  // TODO: Implementasi fungsionalitas edit
  console.log('Edit portfolio:', portfolio)
}

function openImageModal(imageUrl: string) {
  // TODO: Implementasi modal/lightbox gambar
  window.open(imageUrl, '_blank')
}

async function submitAddImage() {
  if (!imageFile.value) return
  imageUploading.value = true
  try {
    const formData = new FormData()
    formData.append('portfolio_id', selectedPortfolio.value?.id.toString() || '')
    formData.append('image', imageFile.value)

    const res = await api.post('/portfolio-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (selectedPortfolio.value) {
      selectedPortfolio.value.images = selectedPortfolio.value.images || []
      selectedPortfolio.value.images.push({ image_url: res.data.image_url })
    }

    // Reset form
    imageFile.value = null
    const fileInput = document.querySelector(
      'input[type="file"][accept="image/*"]',
    ) as HTMLInputElement
    if (fileInput) fileInput.value = ''
  } catch (e) {
    console.error('Error uploading image:', e)
    alert('Gagal upload gambar')
  } finally {
    imageUploading.value = false
  }
}

async function submitAddVideo() {
  if (!videoFile.value) return
  videoUploading.value = true
  try {
    const formData = new FormData()
    formData.append('portfolio_id', selectedPortfolio.value?.id.toString() || '')
    formData.append('video', videoFile.value)

    const res = await api.post('/portfolio-videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (selectedPortfolio.value) {
      selectedPortfolio.value.videos = selectedPortfolio.value.videos || []
      selectedPortfolio.value.videos.push({ video_url: res.data.video_url })
    }

    // Reset form
    videoFile.value = null
    const fileInput = document.querySelector(
      'input[type="file"][accept="video/*"]',
    ) as HTMLInputElement
    if (fileInput) fileInput.value = ''
  } catch (e) {
    console.error('Error uploading video:', e)
    alert('Gagal upload video')
  } finally {
    videoUploading.value = false
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
