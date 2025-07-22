<template>
  <template v-if="routePath !== '/user/orders' && !routePath.startsWith('/user/portfolio/')">
    <MainHeader />
  </template>
  <div class="min-h-screen flex flex-col items-center justify-start">
    <template v-if="routePath === '/user' || routePath === '/user/dashboard'">
      <div
        id="beranda"
        class="relative w-full h-[80vh] flex items-center justify-center"
        data-aos="fade-down"
      >
        <!-- Background Gambar Dinamis -->
        <img :src="slides[current].image" alt="Banner" class="w-full h-full object-cover shadow" />
        <!-- Overlay gelap -->
        <div class="absolute inset-0 bg-black/40"></div>
        <!-- Overlay Teks Dinamis -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 class="text-lg font-light mb-2 tracking-wide text-gray-200">
            {{ slides[current].subtitle }}
          </h2>
          <h1 class="text-4xl md:text-6xl font-bold mb-2" v-html="slides[current].title"></h1>
          <p class="text-2xl mb-8">{{ slides[current].description }}</p>
          <div class="flex gap-4 justify-center">
            <button
              class="flex items-center gap-2 px-6 py-2 rounded-full border border-white text-white font-medium hover:bg-white/10 transition"
            >
              Lihat Paket
              <span class="ml-1">&gt;</span>
            </button>
            <button
              class="flex items-center gap-2 px-6 py-2 rounded-full border border-white text-white font-medium hover:bg-white/10 transition"
            >
              Pesan Sekarang
              <span class="ml-1">&gt;</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Section Layanan/Paket -->
      <section
        id="layanan"
        class="w-full py-16 bg-gray-100 flex flex-col items-center"
        data-aos="fade-up"
      >
        <h2 class="text-4xl font-bold mb-4 text-center">Pilih Paket Layanan Kami</h2>
        <p class="text-lg text-gray-500 mb-12 text-center">
          Paket jasa drone, fotografi, dan videografi profesional untuk kebutuhan Anda
        </p>

        <!-- Loading State -->
        <div
          v-if="loadingPackages"
          class="flex flex-col md:flex-row gap-10 justify-center w-full max-w-7xl h-full"
        >
          <div
            v-for="n in 3"
            :key="n"
            class="bg-white rounded-2xl shadow-xl p-12 flex flex-col min-h-[420px] h-full items-center border border-gray-200 animate-pulse relative"
          >
            <span
              class="absolute -top-5 right-6 bg-gray-200 text-white text-sm px-4 py-1 rounded-full font-bold h-6 w-24"
            ></span>
            <div class="h-8 w-40 bg-gray-200 rounded mb-4"></div>
            <div class="h-4 w-56 bg-gray-100 rounded mb-6"></div>
            <div class="h-10 w-32 bg-gray-200 rounded mb-4"></div>
            <ul class="w-full mb-8 space-y-3 text-left">
              <li v-for="i in 4" :key="i" class="h-4 w-48 bg-gray-100 rounded"></li>
            </ul>
            <div class="w-full h-12 bg-gray-200 rounded-full mt-auto"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="errorPackages" class="text-center py-20">
          <div class="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-red-800 mb-2">Terjadi Kesalahan</h3>
            <p class="text-red-600">{{ errorPackages }}</p>
          </div>
        </div>

        <!-- Packages Grid -->
        <div v-else class="flex flex-col md:flex-row gap-10 justify-center w-full max-w-7xl h-full">
          <div
            v-for="(packageItem, index) in packages"
            :key="packageItem.id"
            class="bg-white rounded-2xl shadow-xl p-12 flex flex-col min-h-[420px] h-full items-center border relative"
            :class="[packageItem.is_popular ? 'border-4 border-blue-500' : 'border-gray-200']"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <!-- Popular Badge -->
            <span
              v-if="packageItem.is_popular"
              class="absolute -top-5 right-6 bg-gray-700 text-white text-sm px-4 py-1 rounded-full font-bold"
            >
              Paling Populer
            </span>

            <!-- Package Title -->
            <h3 class="text-2xl font-semibold mb-4">{{ packageItem.name }}</h3>

            <!-- Package Description -->
            <p class="text-base text-gray-500 mb-6 text-center">
              {{ packageItem.description }}
            </p>

            <!-- Package Price -->
            <div class="text-4xl font-bold mb-4">{{ formatRupiah(packageItem.price) }}</div>

            <!-- Package Features -->
            <ul class="text-base text-gray-700 mb-8 space-y-3 text-left">
              <li v-for="feature in parseFeatures(packageItem.features)" :key="feature">
                ✔ {{ feature }}
              </li>
            </ul>

            <!-- Package Button -->
            <button
              class="w-full py-3 rounded-full text-lg text-white font-semibold hover:opacity-90 transition mt-auto"
              :class="[
                packageItem.is_popular
                  ? 'bg-gray-700 hover:bg-gray-800'
                  : 'bg-gray-600 hover:bg-gray-700',
              ]"
              @click="selectPackage(packageItem)"
            >
              {{ packageItem.button_text || 'Pilih Paket' }}
            </button>
          </div>
        </div>
      </section>
      <!-- Section Keunggulan -->
      <section class="w-full py-16 bg-gray-100 flex flex-col items-center" data-aos="fade-up">
        <h2 class="text-4xl font-bold text-gray-800 mb-8 text-center">Kenapa Memilih Kami?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          <!-- Card Keunggulan 1 -->
          <div
            class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition"
            data-aos="zoom-in"
            :data-aos-delay="0"
          >
            <div class="mb-4">
              <UserCheckIcon class="w-12 h-12 text-gray-700" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Pilot Berpengalaman</h3>
            <p class="text-gray-500">
              Tim kami terdiri dari pilot drone bersertifikat dan profesional di bidangnya.
            </p>
          </div>
          <!-- Card Keunggulan 2 -->
          <div
            class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition"
            data-aos="zoom-in"
            :data-aos-delay="100"
          >
            <div class="mb-4">
              <CameraIcon class="w-12 h-12 text-gray-700" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Hasil Berkualitas Tinggi</h3>
            <p class="text-gray-500">
              Foto dan video aerial dengan resolusi tinggi, detail tajam, dan warna memukau.
            </p>
          </div>
          <!-- Card Keunggulan 3 -->
          <div
            class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition"
            data-aos="zoom-in"
            :data-aos-delay="200"
          >
            <div class="mb-4">
              <RocketIcon class="w-12 h-12 text-gray-700" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Teknologi Drone Terbaru</h3>
            <p class="text-gray-500">
              Menggunakan drone dan peralatan terbaru untuk hasil maksimal di setiap project.
            </p>
          </div>
          <!-- Card Keunggulan 4 -->
          <div
            class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition"
            data-aos="zoom-in"
            :data-aos-delay="300"
          >
            <div class="mb-4">
              <HeadphonesIcon class="w-12 h-12 text-gray-700" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Layanan Ramah & Responsif</h3>
            <p class="text-gray-500">
              Konsultasi gratis, fast response, dan support penuh selama proses pemesanan.
            </p>
          </div>
        </div>
      </section>
      <!-- Section Portfolio/Galeri -->
      <section
        id="portfolio"
        class="w-full py-20 bg-gray-100 relative overflow-hidden"
        data-aos="fade-up"
      >
        <!-- Background decorative elements -->
        <!-- Dihapus: elemen blur biru/ungu -->
        <div class="container mx-auto px-4 relative z-10">
          <!-- Header Section -->
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-4xl font-bold text-gray-800 mb-6">Portfolio & Galeri</h2>
            <div class="w-24 h-1 bg-gray-700 mx-auto mb-6 rounded-full"></div>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beberapa hasil dokumentasi udara terbaik dari project yang telah kami kerjakan. Gambar
              akan berganti otomatis jika lebih dari satu.
            </p>
          </div>

          <!-- Loading State -->
          <div
            v-if="loadingPortfolio"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            <div v-for="n in 6" :key="n" class="group cursor-pointer animate-pulse">
              <div
                class="relative bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500 border border-gray-100"
              >
                <div class="relative h-80 overflow-hidden bg-gray-200"></div>
                <div class="p-6">
                  <div class="flex items-start justify-between mb-3">
                    <div class="h-6 w-32 bg-gray-200 rounded"></div>
                    <div class="ml-3 w-2 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div class="h-4 w-40 bg-gray-100 rounded mb-4"></div>
                  <div class="flex items-center justify-between mt-6">
                    <div class="h-4 w-20 bg-gray-100 rounded"></div>
                    <div class="h-8 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="errorPortfolio" class="text-center py-20">
            <div class="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-red-800 mb-2">Terjadi Kesalahan</h3>
              <p class="text-red-600">{{ errorPortfolio }}</p>
            </div>
          </div>

          <!-- Portfolio Grid -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            <div
              v-for="item in portfolios"
              :key="item.id"
              class="group cursor-pointer transform transition-all duration-500 hover:scale-105"
              @click="openPortfolio(item)"
              data-aos="fade-up"
              :data-aos-delay="0"
            >
              <!-- Modern Card Design -->
              <div
                class="relative bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500 border border-gray-100"
              >
                <!-- Main Image -->
                <div class="relative h-80 overflow-hidden">
                  <img
                    :src="optimizeCloudinary(item.images[activeImage[item.id] || 0]?.image_url)"
                    :alt="item.title || 'Portfolio Drone'"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  <!-- Floating Badge -->
                  <div class="absolute top-4 left-4">
                    <div
                      class="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-semibold"
                    >
                      Portfolio
                    </div>
                  </div>

                  <!-- Image Counter -->
                  <div
                    v-if="item.images.length > 1"
                    class="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg"
                  >
                    {{ (activeImage[item.id] || 0) + 1 }} / {{ item.images.length }}
                  </div>

                  <!-- Hover Overlay -->
                  <div
                    class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                  >
                    <div
                      class="rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300"
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-6">
                  <!-- Title & Category -->
                  <div class="flex items-start justify-between mb-3">
                    <h3 class="text-xl font-bold text-gray-800 line-clamp-1 flex-1">
                      {{ item.title || 'Portfolio' }}
                    </h3>
                    <div class="ml-3">
                      <div class="w-2 h-2 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {{
                      item.description ||
                      'Dokumentasi aerial berkualitas tinggi dengan teknologi drone terbaru.'
                    }}
                  </p>

                  <!-- Action Button -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center text-sm text-gray-500">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>{{ item.images?.length || 0 }} foto</span>
                    </div>

                    <button
                      class="flex items-center text-gray-700 hover:text-gray-800 font-medium text-sm transition-colors"
                    >
                      <span>Lihat Detail</span>
                      <svg
                        class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Section Testimonial -->
      <section
        id="testimoni"
        class="w-full bg-gray-100 py-20 flex flex-col items-center"
        data-aos="fade-up"
      >
        <TestimonialCarousel />
      </section>

      <!-- FAQ Section -->
      <section
        id="faq"
        class="w-full bg-gray-100 py-20 flex flex-col items-center"
        data-aos="fade-up"
      >
        <FAQAccordion />
      </section>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
  <MainFooter />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, computed, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AOS from 'aos'
import MainHeader from '@/components/ui/MainHeader.vue'
import MainFooter from '@/components/ui/MainFooter.vue'
import {
  UserCheck as UserCheckIcon,
  Camera as CameraIcon,
  Rocket as RocketIcon,
  Headphones as HeadphonesIcon,
} from 'lucide-vue-next'
import api from '@/api'
import TestimonialCarousel from '@/components/ui/TestimonialCarousel.vue'
import FAQAccordion from '@/components/ui/FAQAccordion.vue'

import banner1 from '@/assets/banner1.jpg'
import banner2 from '@/assets/banner2.jpeg'
import banner3 from '@/assets/banner3.jpg'

const slides = [
  {
    image: banner1,
    subtitle: 'Jasa Videografi Udara',
    title: 'Videografi <span class="font-light">Aerial Profesional</span>',
    description: 'Rekam momen spesial dan event dari sudut pandang spektakuler dengan drone kami.',
  },
  {
    image: banner2,
    subtitle: 'Jasa Fotografi Udara',
    title: 'Fotografi <span class="font-light">Aerial Berkualitas</span>',
    description: 'Abadikan setiap detik berharga dengan hasil foto udara yang tajam dan memukau.',
  },
  {
    image: banner3,
    subtitle: 'Sewa Drone & Pilot Berpengalaman',
    title: 'Layanan <span class="font-light">Drone Terbaik</span>',
    description:
      'Solusi kebutuhan pemetaan, dokumentasi, dan inspeksi dengan teknologi drone terbaru.',
  },
]

const current = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

// Portfolio API
interface Portfolio {
  id: number
  title: string
  description: string
  images: Array<{ id: number; image_url: string }>
}
const portfolios = ref<Portfolio[]>([])
const loadingPortfolio = ref(true)
const errorPortfolio = ref('')

const fetchPortfolios = async () => {
  loadingPortfolio.value = true
  errorPortfolio.value = ''
  try {
    const res = await api.get('/portfolios')
    portfolios.value = res.data.data || res.data
  } catch {
    errorPortfolio.value = 'Gagal memuat portfolio.'
    portfolios.value = []
  } finally {
    loadingPortfolio.value = false
  }
}

// Packages API
interface Package {
  id: number
  name: string
  description: string
  price: number
  features: string[] | string
  is_popular?: boolean
  button_text?: string
}
const packages = ref<Package[]>([])
const loadingPackages = ref(true)
const errorPackages = ref('')

const fetchPackages = async () => {
  loadingPackages.value = true
  errorPackages.value = ''
  try {
    const res = await api.get('/packages')
    packages.value = res.data.data || res.data
  } catch {
    errorPackages.value = 'Gagal memuat paket layanan.'
    packages.value = []
  } finally {
    loadingPackages.value = false
    nextTick(() => {
      AOS.refresh()
    })
  }
}

// Tambahkan fungsi formatRupiah
function formatRupiah(price: number | string): string {
  const num = typeof price === 'string' ? parseFloat(price) : price
  return 'Rp ' + num.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// Select package function
const selectPackage = (packageItem: Package) => {
  router.push({ name: 'UserCheckout', params: { packageId: packageItem.id } })
}

function parseFeatures(features: string[] | string): string[] {
  if (Array.isArray(features)) return features
  if (typeof features === 'string') {
    // Try to parse as JSON array
    try {
      const parsed = JSON.parse(features)
      if (Array.isArray(parsed)) return parsed
    } catch {
      // Not a JSON array, fallback to comma split
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

// getPortfolioImage tidak digunakan, jadi dihapus
function optimizeCloudinary(url: string) {
  if (!url) return ''
  return url.includes('/upload/')
    ? url.replace('/upload/', '/upload/w_600,h_400,c_fill,q_auto,f_auto/')
    : url
}

const router = useRouter()
const route = useRoute()
const routePath = computed(() => route.path)
const activeImage = ref<Record<number, number>>({})

function openPortfolio(item: Portfolio) {
  router.push({ name: 'UserPortfolioDetail', params: { id: item.id } })
}

function scrollToHash() {
  if (route.hash) {
    const el = document.getElementById(route.hash.replace('#', ''))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const activeSection = ref('beranda')
provide('activeSection', activeSection)

onMounted(() => {
  interval = setInterval(() => {
    portfolios.value.forEach((item) => {
      const total = item.images?.length || 0
      if (total > 1) {
        activeImage.value[item.id] = ((activeImage.value[item.id] ?? 0) + 1) % total
      }
    })
    current.value = (current.value + 1) % slides.length
  }, 3000)

  fetchPortfolios()
  fetchPackages()
  nextTick(() => {
    scrollToHash()
  })

  const sectionIds = ['beranda', 'layanan', 'portfolio', 'testimoni', 'faq']
  const observers: IntersectionObserver[] = []
  sectionIds.forEach((id) => {
    nextTick(() => {
      const el = document.getElementById(id)
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              activeSection.value = id
            }
          },
          { threshold: 0.3 },
        )
        observer.observe(el)
        observers.push(observer)
      }
    })
  })
  onUnmounted(() => {
    observers.forEach((o) => o.disconnect())
  })
})

watch(
  () => route.hash,
  () => {
    nextTick(() => {
      scrollToHash()
    })
  },
)

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>
