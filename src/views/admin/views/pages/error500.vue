﻿<template>
    <div class="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
            class="ppx-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20"
        >
            <div class="relative">
                <img
                    :src="store.theme === 'dark' || store.isDarkMode ? '/assets/images/error/500-dark.svg' : '/assets/images/error/500-light.svg'"
                    alt="500"
                    class="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"
                />
                <p class="mt-5 text-base dark:text-white">Internal server error!</p>
                <router-link to="/" class="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none">Home</router-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { useMeta } from '@/composables/use-meta';
    import { useAppStore } from '@/stores/index';
    const store = useAppStore();
    useMeta({ title: 'Error 500' });
</script>
