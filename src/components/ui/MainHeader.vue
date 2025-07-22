<template>
  <!-- <div style="position: fixed; top: 0; right: 0; z-index: 9999; background: #fff">
    {{ activeSection }}
  </div> -->
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow' : 'bg-transparent',
    ]"
  >
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8 transition-colors duration-300"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5 flex items-center gap-2">
          <img
            :src="isScrolled ? logoBlack : logoWhite"
            alt="FlyWithUs Logo"
            class="h-12 w-auto transition-all duration-300"
          />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          :class="isScrolled ? 'text-gray-700' : 'text-white'"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon
            class="size-6 transition-colors duration-300"
            :class="isScrolled ? 'text-gray-700' : 'text-white'"
            aria-hidden="true"
          />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-8">
        <a
          href="#beranda"
          @click.prevent="scrollToSection('beranda')"
          :class="[
            isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200',
            'text-sm font-medium transition-colors duration-300',
            activeSection === 'beranda' ? 'border-b-2 border-blue-500' : '',
          ]"
          >Beranda</a
        >
        <a
          href="#layanan"
          @click.prevent="scrollToSection('layanan')"
          :class="[
            isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200',
            'text-sm font-medium transition-colors duration-300',
            activeSection === 'layanan' ? 'border-b-2 border-blue-500' : '',
          ]"
          >Layanan</a
        >
        <a
          href="#portfolio"
          @click.prevent="scrollToSection('portfolio')"
          :class="[
            isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200',
            'text-sm font-medium transition-colors duration-300',
            activeSection === 'portfolio' ? 'border-b-2 border-blue-500' : '',
          ]"
          >Portfolio</a
        >
        <a
          href="#testimoni"
          @click.prevent="scrollToSection('testimoni')"
          :class="[
            isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200',
            'text-sm font-medium transition-colors duration-300',
            activeSection === 'testimoni' ? 'border-b-2 border-blue-500' : '',
          ]"
          >Testimoni</a
        >
        <a
          href="#faq"
          @click.prevent="scrollToSection('faq')"
          :class="[
            isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200',
            'text-sm font-medium transition-colors duration-300',
            activeSection === 'faq' ? 'border-b-2 border-blue-500' : '',
          ]"
          >FAQ</a
        >
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
        <template v-if="isAuthenticated">
          <!-- User dropdown menu -->
          <Menu as="div" class="relative">
            <MenuButton class="flex items-center gap-2 outline-none">
              <div
                v-if="userData && userData.avatar"
                class="w-8 h-8 rounded-full bg-cover bg-center"
                :style="{ backgroundImage: `url(${userData.avatar})` }"
              ></div>
              <div
                v-else
                class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold"
              >
                {{ userInitial }}
              </div>
              <span
                :class="[
                  isScrolled ? 'text-gray-900' : 'text-white',
                  'text-sm font-semibold transition-colors duration-300',
                ]"
              >
                {{ (userData && userData.name) || 'My Account' }}
              </span>
              <ChevronDownIcon
                :class="[
                  isScrolled ? 'text-gray-500' : 'text-white',
                  'w-4 h-4 transition-colors duration-300',
                ]"
                aria-hidden="true"
              />
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="userData && userData.role === 'admin' ? '/admin' : '/user/dashboard'"
                      :class="[
                        active ? 'bg-blue-50 text-blue-900' : 'text-gray-700',
                        'group flex w-full items-center px-4 py-2 text-sm rounded-md',
                      ]"
                    >
                      <Home class="mr-3 h-5 w-5 text-gray-500" />
                      Dashboard
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <router-link
                      v-if="userData && userData.role === 'user'"
                      to="/user/orders"
                      :class="[
                        active ? 'bg-blue-50 text-blue-900' : 'text-gray-700',
                        'group flex w-full items-center px-4 py-2 text-sm rounded-md',
                      ]"
                    >
                      <ListChecks class="mr-3 h-5 w-5 text-gray-500" />
                      Riwayat Pesanan
                    </router-link>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="handleLogout"
                      :class="[
                        active ? 'bg-red-50 text-red-900' : 'text-red-600',
                        'group flex w-full items-center px-4 py-2 text-sm rounded-md',
                      ]"
                    >
                      <LogOut class="mr-3 h-5 w-5" />
                      Logout
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </template>
        <template v-else>
          <router-link
            :to="{ name: 'login', query: { redirect: route.fullPath } }"
            :class="[
              isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200',
              'text-sm font-semibold transition-colors duration-300',
            ]"
          >
            Login / Daftar <span aria-hidden="true">&rarr;</span>
          </router-link>
        </template>
      </div>
    </nav>
    <!-- Mobile menu -->
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="-m-1.5 p-1.5 flex items-center gap-2"
            @click="mobileMenuOpen = false"
          >
            <img :src="logoBlack" alt="FlyWithUs" class="h-8 w-auto" />
          </router-link>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link
                to="/"
                @click="mobileMenuOpen = false"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Home</router-link
              >
              <a
                href="#services"
                @click="mobileMenuOpen = false"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Layanan</a
              >
              <router-link
                to="/portfolios"
                @click="mobileMenuOpen = false"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Portfolio</router-link
              >
              <a
                href="#testimonials"
                @click="mobileMenuOpen = false"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Testimoni</a
              >
              <a
                href="#faq"
                @click="mobileMenuOpen = false"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >FAQ</a
              >
              <a
                href="#contact"
                @click="mobileMenuOpen = false"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Kontak</a
              >
            </div>
            <div class="py-6">
              <template v-if="isAuthenticated">
                <router-link
                  :to="userData && userData.role === 'admin' ? '/admin' : '/user/dashboard'"
                  @click="mobileMenuOpen = false"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Dashboard
                </router-link>
                <router-link
                  v-if="userData && userData.role === 'user'"
                  to="/user/orders"
                  @click="mobileMenuOpen = false"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Riwayat Pesanan
                </router-link>
                <router-link
                  to="/user/profile"
                  @click="mobileMenuOpen = false"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </router-link>
                <button
                  @click="handleLogoutAndCloseMenu"
                  class="w-full text-left -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </template>
              <template v-else>
                <router-link
                  :to="{ name: 'login', query: { redirect: route.fullPath } }"
                  @click="mobileMenuOpen = false"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Login
                </router-link>
                <router-link
                  to="/register"
                  @click="mobileMenuOpen = false"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-600 hover:bg-blue-50"
                >
                  Daftar Sekarang
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/plugins/axios'
import logoWhite from '@/assets/flywithus.png'
import logoBlack from '@/assets/flywithus2.png'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'
import { Home, ListChecks, User, LogOut } from 'lucide-vue-next'

interface UserData {
  avatar?: string
  name?: string
  role?: string
}

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const userData = ref<UserData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()
const route = useRoute()
const activeSection = inject('activeSection', ref('beranda'))

// Computed properties
const isAuthenticated = computed(() => {
  return !!localStorage.getItem('token')
})

const userInitial = computed(() => {
  if (!userData.value?.name) return '?'
  return userData.value.name.charAt(0).toUpperCase()
})

// Methods
async function fetchUserData() {
  if (!isAuthenticated.value) return

  try {
    loading.value = true
    const response = await api.get('/me')
    userData.value = response.data
    localStorage.setItem('user_data', JSON.stringify(response.data))
  } catch (err) {
    if (err instanceof Error) {
      error.value =
        (err as any)?.response?.data?.message || err.message || 'Gagal memuat data user.'
    } else {
      error.value = 'Gagal memuat data user.'
    }
  } finally {
    loading.value = false
  }
}

function updateUserData() {
  try {
    const storedData = localStorage.getItem('user_data')
    userData.value = storedData ? JSON.parse(storedData) : null
  } catch (e) {
    console.error('Error parsing user data:', e)
    userData.value = null
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

async function handleLogout() {
  try {
    await api.post('/logout')
  } catch (err) {
    console.error('Logout error:', err)
  } finally {
    // Clear auth data regardless of API call success
    localStorage.removeItem('token')
    localStorage.removeItem('user_data')
    userData.value = null

    // Redirect to login with redirect back if needed
    const currentPath = route.fullPath
    if (currentPath !== '/login' && currentPath !== '/register') {
      router.push({ name: 'login', query: { redirect: currentPath } })
    } else {
      router.push('/login')
    }
  }
}

// Helper function for mobile menu logout
async function handleLogoutAndCloseMenu() {
  await handleLogout()
  mobileMenuOpen.value = false
}

function scrollToSection(sectionId: string) {
  // Ganti '/user/dashboard' sesuai path dashboard user Anda
  if (route.path === '/user/dashboard' || route.path === '/') {
    nextTick(() => {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
  } else {
    router.push({ path: '/user/dashboard', hash: `#${sectionId}` })
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('storage', updateUserData)
  handleScroll()
  updateUserData()

  // Fetch fresh user data if authenticated
  if (isAuthenticated.value) {
    fetchUserData()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('storage', updateUserData)
})
</script>
