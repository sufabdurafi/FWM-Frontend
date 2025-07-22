<template>
  <section class="w-full py-20 bg-gray-100 text-gray-900">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-bold mb-12">Frequently Asked Questions (FAQ)</h2>
      <div class="divide-y divide-gray-200">
        <div
          v-for="(item, idx) in faqs"
          :key="idx"
          class="py-6"
          data-aos="fade-up"
          :data-aos-delay="idx * 100"
        >
          <button
            class="w-full flex justify-between items-center text-left focus:outline-none group"
            @click="toggle(idx)"
          >
            <span class="text-lg">{{ item.q }}</span>
            <span>
              <svg
                v-if="openIdx === idx"
                class="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 12H6"
                />
              </svg>
              <svg
                v-else
                class="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </span>
          </button>
          <transition name="fade">
            <div v-if="openIdx === idx" class="mt-2 text-gray-500">
              {{ item.a }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const faqs = [
  {
    q: 'Apa saja layanan yang ditawarkan?',
    a: 'Kami menyediakan jasa videografi udara, fotografi udara, serta sewa drone dan pilot profesional untuk berbagai kebutuhan seperti event, promosi, pemetaan, dan inspeksi.',
  },
  {
    q: 'Bagaimana cara memesan layanan?',
    a: 'Anda dapat memesan layanan secara langsung melalui website ini. Pilih layanan yang diinginkan, lakukan pemesanan, dan selesaikan pembayaran secara online tanpa perlu menghubungi WhatsApp atau mengisi form kontak.',
  },
  {
    q: 'Apakah pilot drone yang digunakan bersertifikat?',
    a: 'Ya, semua pilot kami sudah bersertifikat resmi dan berpengalaman di bidangnya untuk menjamin keamanan dan kualitas hasil.',
  },
  {
    q: 'Apakah hasil foto dan video bisa diedit sesuai permintaan?',
    a: 'Tentu, kami menyediakan layanan editing sesuai kebutuhan dan revisi sesuai paket yang dipilih.',
  },
  {
    q: 'Di area mana saja layanan tersedia?',
    a: 'Kami melayani area Yogyakarta dan sekitarnya. Untuk area lain, silakan konsultasikan dengan tim kami.',
  },
]

const openIdx = ref<number | null>(0)
function toggle(idx: number) {
  openIdx.value = openIdx.value === idx ? null : idx
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
