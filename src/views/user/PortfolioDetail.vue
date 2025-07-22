<template>
  <div class="min-h-screen">
    <!-- Hero Section with Back Button -->
    <div class="relative pt-8 pb-12">
      <div class="absolute inset-0"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RouterLink
          to="/user"
          class="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 text-gray-700 hover:bg-white/90 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <div
            class="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <span class="font-medium">Kembali ke Dashboard</span>
        </RouterLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
      >
        <!-- Header Skeleton -->
        <div class="relative h-80 bg-gray-700 animate-pulse">
          <div class="absolute inset-0 bg-gray-700"></div>
          <div class="absolute bottom-8 left-8 right-8">
            <div class="h-12 bg-white/30 rounded-2xl animate-pulse mb-4"></div>
            <div class="h-6 bg-white/30 rounded-xl animate-pulse w-64"></div>
          </div>
        </div>

        <!-- Content Skeleton -->
        <div class="p-8">
          <div class="grid lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-6">
              <div class="h-8 bg-gray-200 rounded-xl animate-pulse w-48"></div>
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="h-6 bg-gray-200 rounded-lg animate-pulse w-32"></div>
              <div class="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="bg-red-50 rounded-3xl p-12 text-center border border-red-100 shadow-2xl">
        <div
          class="w-20 h-20 bg-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Oops! Terjadi Kesalahan</h3>
        <p class="text-gray-600 mb-8 text-lg">{{ error }}</p>
        <RouterLink
          to="/user"
          class="inline-flex items-center gap-3 px-8 py-4 bg-gray-700 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Kembali ke Dashboard</span>
        </RouterLink>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
      >
        <!-- Hero Header -->
        <div class="relative h-80 bg-gray-700 overflow-hidden">
          <div class="absolute inset-0 bg-gray-700"></div>

          <div class="relative h-full flex items-end p-8">
            <div class="max-w-4xl">
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30"
                >
                  <svg
                    class="w-8 h-8 text-white"
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
                <div class="flex items-center gap-3">
                  <div
                    class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                  >
                    <span class="text-white/90 text-sm font-medium">Portfolio</span>
                  </div>
                  <div class="w-2 h-2 bg-white/60 rounded-full"></div>
                  <span class="text-white/80 text-sm">Project Detail</span>
                </div>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {{ portfolio.title }}
              </h1>
              <p class="text-white/90 text-lg leading-relaxed max-w-2xl">
                Jelajahi detail lengkap dari project yang telah dikerjakan dengan penuh dedikasi dan
                keahlian.
              </p>
            </div>
          </div>
        </div>

        <!-- Content Grid -->
        <div class="p-8">
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Description Section -->
              <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-800">Deskripsi Project</h2>
                </div>
                <div class="prose prose-gray max-w-none">
                  <p class="text-gray-700 leading-relaxed text-lg">{{ portfolio.description }}</p>
                </div>
              </div>

              <!-- Images Gallery -->
              <div
                v-if="portfolio.images && portfolio.images.length"
                class="bg-gray-50 rounded-3xl p-8 border border-gray-100"
              >
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                    <svg
                      class="w-5 h-5 text-white"
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
                  <h2 class="text-2xl font-bold text-gray-800">Galeri Foto</h2>
                  <div
                    class="ml-auto px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {{ portfolio.images.length }} Foto
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div
                    v-for="(img, index) in portfolio.images"
                    :key="img.id"
                    class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    @click="openLightbox(index)"
                  >
                    <img
                      :src="optimizeCloudinary(img.image_url)"
                      class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      :alt="portfolio.title + ' - Foto ' + (index + 1)"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                    <div
                      class="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg
                        class="w-4 h-4 text-white"
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
                    </div>
                    <div
                      class="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                    >
                      Foto {{ index + 1 }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Videos Section -->
              <div
                v-if="portfolio.videos && portfolio.videos.length"
                class="bg-gray-50 rounded-3xl p-8 border border-gray-100"
              >
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                    <svg
                      class="w-5 h-5 text-white"
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
                  <h2 class="text-2xl font-bold text-gray-800">Video Portfolio</h2>
                  <div
                    class="ml-auto px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {{ portfolio.videos.length }} Video
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div
                    v-for="(vid, index) in portfolio.videos"
                    :key="vid.id"
                    class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-900"
                  >
                    <video
                      :src="vid.video_url"
                      class="w-full h-80 object-cover rounded-2xl"
                      controls
                      preload="metadata"
                      :poster="optimizeCloudinary(portfolio.images?.[0]?.image_url || '')"
                    />
                    <div
                      class="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                    >
                      Video {{ index + 1 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Project Info Card -->
              <div class="bg-gray-50 rounded-3xl p-6 border border-gray-100 sticky top-8">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-800">Info Project</h3>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <span class="text-gray-600 font-medium">Total Foto</span>
                    <span class="text-gray-700 font-bold">{{ portfolio.images?.length || 0 }}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <span class="text-gray-600 font-medium">Total Video</span>
                    <span class="text-gray-700 font-bold">{{ portfolio.videos?.length || 0 }}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <span class="text-gray-600 font-medium">Status</span>
                    <span
                      class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      Selesai
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-6 space-y-3">
                  <button
                    @click="sharePortfolio"
                    class="w-full py-3 px-4 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      <span>Bagikan</span>
                    </div>
                  </button>
                  <button
                    @click="toggleFavorite"
                    :class="[
                      'w-full py-3 px-4 rounded-xl transition-all duration-300 font-medium',
                      isFavorite
                        ? 'bg-red-500 text-white shadow-lg hover:shadow-xl hover:bg-red-600'
                        : 'bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50',
                    ]"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{{ isFavorite ? 'Favorit' : 'Tambah Favorit' }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      @click="closeLightbox"
    >
      <div class="relative max-w-4xl max-h-[90vh] mx-4">
        <button
          @click="closeLightbox"
          class="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
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
        <img
          :src="optimizeCloudinary(portfolio.images?.[currentImageIndex]?.image_url || '')"
          class="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
          :alt="portfolio.title + ' - Foto ' + (currentImageIndex + 1)"
        />
        <div
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2"
        >
          <button
            @click="previousImage"
            class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span class="text-white text-sm font-medium">
            {{ currentImageIndex + 1 }} / {{ portfolio.images?.length }}
          </span>
          <button
            @click="nextImage"
            class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import MainFooter from '@/components/ui/MainFooter.vue'
import { RouterLink } from 'vue-router'
import api from '@/api'

const route = useRoute()
interface Portfolio {
  id?: number
  title?: string
  description?: string
  images?: Array<{ id: number; image_url: string }>
  videos?: Array<{ id: number; video_url: string }>
}

const portfolio = ref<Portfolio>({})
const loading = ref(true)
const error = ref('')
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)
const isFavorite = ref(false)

function optimizeCloudinary(url: string) {
  if (!url) return ''
  return url.includes('/upload/')
    ? url.replace('/upload/', '/upload/w_600,h_400,c_fill,q_auto,f_auto/')
    : url
}

function openLightbox(index: number) {
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.classList.add('overflow-hidden')
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

function nextImage() {
  if (portfolio.value.images && currentImageIndex.value < portfolio.value.images.length - 1) {
    currentImageIndex.value++
  }
}

function previousImage() {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

function sharePortfolio() {
  if (navigator.share) {
    navigator.share({
      title: portfolio.value.title,
      text: portfolio.value.description,
      url: window.location.href,
    })
  } else {
    // Fallback untuk browser yang tidak mendukung Web Share API
    navigator.clipboard.writeText(window.location.href)
    alert('Link portfolio telah disalin ke clipboard!')
  }
}

function toggleFavorite() {
  isFavorite.value = !isFavorite.value
  // Di sini bisa ditambahkan logic untuk menyimpan ke localStorage atau API
  if (isFavorite.value) {
    alert('Portfolio ditambahkan ke favorit!')
  } else {
    alert('Portfolio dihapus dari favorit!')
  }
}

const fetchPortfolio = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get(`/portfolios/${route.params.id}`)
    portfolio.value = res.data.data || res.data
  } catch {
    error.value = 'Gagal memuat detail portfolio. Silakan coba lagi nanti.'
    portfolio.value = {}
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPortfolio()
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})
</script>
