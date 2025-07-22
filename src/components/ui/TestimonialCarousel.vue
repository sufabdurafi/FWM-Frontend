<template>
  <section class="relative w-full py-20 bg-gray-100 text-gray-900 overflow-hidden">
    <div class="mx-auto max-w-6xl px-4">
      <h2 class="text-4xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Apa Kata Klien Kami?
      </h2>
      <div class="relative overflow-hidden">
        <div class="flex space-x-8 infinite-carousel">
          <div
            v-for="(testimonial, idx) in [...testimonials, ...testimonials]"
            :key="idx"
            class="flex-shrink-0 w-80 bg-white rounded-2xl p-8 border border-gray-200 transition-transform hover:scale-105 duration-300 flex flex-col relative"
            data-aos="fade-up"
            :data-aos-delay="(idx % testimonials.length) * 100"
          >
            <svg
              class="w-8 h-8 text-blue-100 absolute top-6 right-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.17 15A3.001 3.001 0 0 1 4 12c0-2.21 1.79-4 4-4V5C4.69 5 2 7.69 2 11c0 2.97 2.16 5.43 5 5.92V15zm10 0A3.001 3.001 0 0 1 14 12c0-2.21 1.79-4 4-4V5c-3.31 0-6 2.69-6 6 0 2.97 2.16 5.43 5 5.92V15z"
              />
            </svg>
            <div class="mb-4">
              <div class="font-bold text-gray-900 text-lg">{{ testimonial.name }}</div>
              <div class="text-sm text-gray-500">{{ testimonial.role }}</div>
            </div>
            <p class="text-gray-700 italic text-base leading-relaxed flex-1 mt-2">
              "{{ testimonial.text }}"
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Andi Pratama',
    role: 'Klien Wedding',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Hasil foto dan video drone untuk acara pernikahan kami sangat memuaskan! Tim sangat profesional dan ramah dalam melayani.',
  },
  {
    name: 'Siti Rahma',
    role: 'Event Organizer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Pelayanan cepat, hasil gambar jernih, dan pengambilan gambar sangat kreatif. Sangat puas dengan hasilnya!',
  },
  {
    name: 'Budi Santoso',
    role: 'Developer Properti',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    text: 'Sangat membantu untuk promosi properti kami. Hasil video drone sangat profesional dan menarik perhatian calon pembeli.',
  },
  {
    name: 'Dewi Lestari',
    role: 'Marketing Manager',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'Rekomendasi terbaik untuk jasa drone! Komunikasi mudah dan hasil memuaskan. Akan pakai lagi nanti.',
  },
  {
    name: 'Rizky Hidayat',
    role: 'Travel Blogger',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    text: 'Footage drone membuat konten saya jauh lebih menarik. Sudah pakai beberapa kali dan selalu puas dengan hasilnya!',
  },
  {
    name: 'Nina Safitri',
    role: 'Pemilik Hotel',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    text: 'Video drone untuk promosi hotel kami sangat bagus! Sudah banyak tamu yang tertarik setelah lihat video tersebut.',
  },
  {
    name: 'Ahmad Fauzi',
    role: 'Pemilik Restoran',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    text: 'Foto drone untuk restoran kami sangat keren! Sudah diposting di Instagram dan banyak yang like. Terima kasih tim!',
  },
]
</script>

<style scoped>
@keyframes infinite-carousel {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.infinite-carousel {
  animation: infinite-carousel 30s linear infinite;
  will-change: transform;
}
</style>
