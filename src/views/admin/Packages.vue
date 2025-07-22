<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar class="w-64 hidden lg:block fixed lg:relative" />
    <div class="flex-1 lg:ml-24 p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-slate-900 mb-2">Manajemen Paket</h1>
          <p class="text-slate-500 text-lg">Daftar paket layanan dan fitur yang tersedia</p>
        </div>
        <div class="flex items-center justify-between mb-6">
          <div></div>
          <button
            @click="openForm()"
            class="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
            Tambah Paket
          </button>
        </div>
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 3"
            :key="n"
            class="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col animate-pulse"
          >
            <div class="bg-emerald-600 px-5 py-3 flex items-center justify-between">
              <div>
                <div class="h-4 w-32 bg-emerald-400/60 rounded mb-2"></div>
                <div class="h-3 w-24 bg-emerald-400/40 rounded"></div>
              </div>
              <div class="flex gap-1">
                <div class="w-7 h-7 bg-emerald-400/30 rounded-full"></div>
                <div class="w-7 h-7 bg-emerald-400/30 rounded-full"></div>
              </div>
            </div>
            <div class="px-5 py-5 flex-1 flex flex-col justify-between">
              <div class="h-6 w-28 bg-slate-200 rounded mb-3"></div>
              <div class="h-3 w-20 bg-slate-200 rounded mb-2"></div>
              <ul class="space-y-2">
                <li v-for="i in 4" :key="i" class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-emerald-200 rounded-full"></div>
                  <div class="h-3 w-32 bg-slate-200 rounded"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="pkg in packages"
            :key="pkg.id"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col font-sans border border-slate-100"
          >
            <div class="bg-emerald-600 px-5 py-3 flex items-center justify-between">
              <div>
                <h3 class="text-base font-semibold text-white leading-tight">{{ pkg.name }}</h3>
                <p class="text-white/80 text-xs font-medium leading-snug">{{ pkg.description }}</p>
              </div>
              <div class="flex items-center gap-1">
                <button
                  @click="openForm(pkg)"
                  class="bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition"
                  title="Edit"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z"
                    />
                  </svg>
                </button>
                <button
                  @click="deletePackage(pkg.id)"
                  class="bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition"
                  title="Hapus"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2m5 4v6m4-6v6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="px-5 py-5 flex-1 flex flex-col justify-between">
              <div class="text-xl font-bold text-slate-900 mb-2">
                Rp {{ pkg.price.toLocaleString() }}
              </div>
              <div class="text-slate-700 text-xs mb-2 font-semibold flex items-center gap-2">
                <svg
                  class="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Fitur & Kelebihan
              </div>
              <ul class="text-slate-700 text-sm space-y-1 mb-2 font-medium">
                <li v-for="(f, i) in pkg.features" :key="i" class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {{ f }}
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="!packages.length && !loading"
            class="col-span-full text-center py-6 text-slate-400 font-medium"
          >
            Belum ada data package.
          </div>
        </div>
        <div
          v-if="showForm"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative font-sans">
            <button
              @click="closeForm"
              class="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h3 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Package</h3>
            <form @submit.prevent="savePackage">
              <div class="mb-3">
                <label class="block font-semibold mb-1">Nama Paket</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="block font-semibold mb-1">Deskripsi</label>
                <textarea
                  v-model="form.description"
                  class="w-full border rounded px-3 py-2"
                  rows="2"
                ></textarea>
              </div>
              <div class="mb-3">
                <label class="block font-semibold mb-1">Harga</label>
                <input
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  class="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="block font-semibold mb-1">Fitur/Kelebihan</label>
                <div v-for="(f, i) in form.features" :key="i" class="flex items-center gap-2 mb-2">
                  <input
                    v-model="form.features[i]"
                    type="text"
                    class="flex-1 border rounded px-3 py-2"
                    placeholder="Fitur..."
                  />
                  <button
                    type="button"
                    @click="removeFeature(i)"
                    class="text-red-500 hover:text-red-700 text-lg"
                  >
                    &times;
                  </button>
                </div>
                <button
                  type="button"
                  @click="addFeature"
                  class="text-emerald-600 hover:underline text-sm mt-1"
                >
                  + Tambah Fitur
                </button>
              </div>
              <div class="flex justify-end mt-6">
                <button
                  type="submit"
                  class="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'

const packages = ref([])
const loading = ref(true)
const error = ref('')
import Sidebar from '@/views/admin/components/layout/Sidebar.vue'

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get('/packages')
    packages.value = res.data.map((pkg) => {
      let features = []
      try {
        features = Array.isArray(pkg.features)
          ? pkg.features
          : pkg.features
            ? JSON.parse(pkg.features)
            : []
      } catch (e) {
        features = []
      }
      return {
        ...pkg,
        features,
        price: Number(pkg.price),
      }
    })
  } catch (e) {
    error.value = 'Gagal memuat data packages.'
  } finally {
    loading.value = false
  }
})

const showForm = ref(false)
const form = ref({ id: null, name: '', description: '', price: 0, features: [] })

function openForm(pkg = null) {
  if (pkg) {
    form.value = { ...pkg, features: [...pkg.features] }
  } else {
    form.value = { id: null, name: '', description: '', price: 0, features: [] }
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function addFeature() {
  form.value.features.push('')
}

function removeFeature(i) {
  form.value.features.splice(i, 1)
}

async function fetchPackages() {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get('/packages')
    packages.value = res.data.map((pkg) => {
      let features = []
      try {
        features = Array.isArray(pkg.features)
          ? pkg.features
          : pkg.features
            ? JSON.parse(pkg.features)
            : []
      } catch (e) {
        features = []
      }
      return {
        ...pkg,
        features,
        price: Number(pkg.price),
      }
    })
  } catch (e) {
    error.value = 'Gagal memuat data packages.'
  } finally {
    loading.value = false
  }
}

async function savePackage() {
  if (!form.value.name || !form.value.price) return
  try {
    if (form.value.id) {
      // Edit (PUT)
      await api.put(`/packages/${form.value.id}`, {
        name: form.value.name,
        description: form.value.description,
        price: form.value.price,
        features: JSON.stringify(form.value.features),
      })
    } else {
      // Tambah (POST)
      await api.post('/packages', {
        name: form.value.name,
        description: form.value.description,
        price: form.value.price,
        features: JSON.stringify(form.value.features),
      })
    }
    await fetchPackages()
    closeForm()
  } catch (e) {
    alert('Gagal menyimpan data package.')
  }
}

async function deletePackage(id) {
  if (confirm('Yakin hapus package ini?')) {
    try {
      await api.delete(`/packages/${id}`)
      await fetchPackages()
    } catch (e) {
      alert('Gagal menghapus package.')
    }
  }
}
</script>
