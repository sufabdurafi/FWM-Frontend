<script setup lang="ts"></script>

<template>
  <main class="pt-16 relative min-h-screen bg-black">
    <!-- Background Gambar -->
    <div
      class="absolute inset-0 w-full h-[80vh] -z-10 bg-cover bg-center"
      style="background-image: url('/src/assets/login.jpg')"
    ></div>
    <!-- Overlay gelap -->
    <div class="absolute inset-0 w-full h-[80vh] -z-10 bg-black/40"></div>
    <!-- Konten Hero -->
    <section class="flex flex-col items-center justify-center h-[80vh] text-white text-center">
      <h2 class="text-lg font-light mb-2 tracking-wide text-gray-200">
        Dual-Camera Drone for Travel Photography
      </h2>
      <h1 class="text-5xl md:text-7xl font-bold mb-2">
        DJI AIR <span class="font-light">3S</span>
      </h1>
      <p class="text-2xl font-semibold mb-8">Chase the View</p>
      <div class="flex gap-4 justify-center">
        <button
          class="flex items-center gap-2 px-6 py-2 rounded-full border border-white text-white font-medium hover:bg-white/10 transition"
        >
          Learn More
          <span class="ml-1">&gt;</span>
        </button>
        <button
          class="flex items-center gap-2 px-6 py-2 rounded-full border border-white text-white font-medium hover:bg-white/10 transition"
        >
          Buy Now
          <span class="ml-1">&gt;</span>
        </button>
      </div>
    </section>
  </main>
</template>
