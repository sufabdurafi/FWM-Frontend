﻿<template>
    <div class="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
            class="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20"
        >
            <img
                :src="store.theme === 'dark' || store.isDarkMode ? '/assets/images/error/maintenence-dark.svg' : '/assets/images/error/maintenence-light.svg'"
                alt="maintenence"
                class="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-20 md:max-w-lg"
            />
            <div class="-mt-8 font-semibold dark:text-white">
                <h2 class="mb-5 text-3xl font-bold text-primary md:text-5xl">Under Maintenance</h2>
                <h4 class="mb-7 text-xl sm:text-2xl">Thank you for visiting us.</h4>
                <p class="text-base">
                    We are currently working on making some improvements <br class="hidden sm:block" />to give you better user experience. <br />
                    <br />Please visit us again shortly.
                </p>
            </div>
            <router-link to="/" class="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none">Home</router-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { useMeta } from '@/composables/use-meta';
    import { useAppStore } from '@/stores/index';
    const store = useAppStore();
    useMeta({ title: 'Maintenence' });
</script>
