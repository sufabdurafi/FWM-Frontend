﻿<template>
    <div>
        <div
            class="relative rounded-t-md bg-primary-light bg-[url('/assets/images/knowledge/pattern.png')] bg-contain bg-left-top bg-no-repeat px-5 py-10 dark:bg-black md:px-10"
        >
            <div class="absolute -bottom-1 -end-6 hidden text-[#DBE7FF] rtl:rotate-y-180 dark:text-[#1B2E4B] lg:block xl:end-0">
                <img
                    :src="store.theme === 'dark' || store.isDarkMode ? '/assets/images/faq/faq-dark.svg' : '/assets/images/faq/faq-light.svg'"
                    alt="faqs"
                    class="w-56 object-cover xl:w-80"
                />
            </div>
            <div class="relative">
                <div class="flex flex-col items-center justify-center sm:-ms-32 sm:flex-row xl:-ms-60">
                    <div class="mb-2 flex gap-1 text-end text-base leading-5 sm:flex-col xl:text-xl">
                        <span>It's free </span>
                        <span>For everyone</span>
                    </div>
                    <div class="me-4 ms-2 hidden sm:block text-[#0E1726] dark:text-white rtl:rotate-y-180">
                        <icon-arrow-wave-left-up class="w-16 xl:w-28" />
                    </div>
                    <div class="mb-2 text-center text-2xl font-bold dark:text-white md:text-5xl">FAQs</div>
                </div>
                <p class="mb-9 text-center text-base font-semibold">Search instant answers & questions asked by popular users</p>
                <form action="" method="" class="mb-6">
                    <div class="relative mx-auto max-w-[580px]">
                        <input type="text" placeholder="Ask a question" class="form-input py-3 ltr:pr-[100px] rtl:pl-[100px]" />
                        <button type="button" class="btn btn-primary absolute top-1 shadow-none ltr:right-1 rtl:left-1">Search</button>
                    </div>
                </form>
                <div class="flex flex-wrap items-center justify-center gap-2 font-semibold text-[#2196F3] sm:gap-5">
                    <div class="whitespace-nowrap font-medium text-black dark:text-white">Popular topics :</div>
                    <div class="flex items-center justify-center gap-2 sm:gap-5">
                        <a href="javascript:;" class="duration-300 hover:underline"> Sales</a>
                        <a href="javascript:;" class="duration-300 hover:underline"> Charts</a>
                        <a href="javascript:;" class="duration-300 hover:underline"> Finance</a>
                        <a href="javascript:;" class="duration-300 hover:underline"> Trending</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-12 flex items-center rounded-b-md bg-[#DBE7FF] dark:bg-[#141F31]">
            <ul class="mx-auto flex items-center gap-5 overflow-auto whitespace-nowrap px-3 py-4.5 xl:gap-8">
                <li
                    class="group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]"
                    :class="{ 'bg-white text-primary dark:bg-[#1B2E4B]': activeTab === 'general' }"
                    @click="activeTab = 'general'"
                >
                    <icon-desktop :fill="true" />

                    <h5 class="font-bold text-black dark:text-white">General</h5>
                </li>
                <li
                    class="group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]"
                    :class="{ 'bg-white text-primary dark:bg-[#1B2E4B]': activeTab === 'quick-support' }"
                    @click="activeTab = 'quick-support'"
                >
                    <icon-user :fill="true" class="w-8 h-8" />

                    <h5 class="font-bold text-black dark:text-white">Quick Support</h5>
                </li>
                <li
                    class="group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]"
                    :class="{ 'bg-white text-primary dark:bg-[#1B2E4B]': activeTab === 'free-updates' }"
                    @click="activeTab = 'free-updates'"
                >
                    <icon-box :fill="true" />

                    <h5 class="font-bold text-black dark:text-white">Free Updates</h5>
                </li>
                <li
                    class="group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]"
                    :class="{ 'bg-white text-primary dark:bg-[#1B2E4B]': activeTab === 'pricing' }"
                    @click="activeTab = 'pricing'"
                >
                    <icon-dollar-sign-circle :fill="true" />

                    <h5 class="font-bold text-black dark:text-white">Pricing</h5>
                </li>
                <li
                    class="group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]"
                    :class="{ 'bg-white text-primary dark:bg-[#1B2E4B]': activeTab === 'hosting' }"
                    @click="activeTab = 'hosting'"
                >
                    <icon-router :fill="true" />

                    <h5 class="font-bold text-black dark:text-white">Hosting</h5>
                </li>
            </ul>
        </div>
        <h3 class="mb-8 text-center text-xl font-semibold md:text-2xl">Frequently asked <span class="text-primary">questions</span></h3>
        <div class="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div class="rounded-md bg-white dark:bg-black">
                <div class="border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white">General topics?</div>
                <div class="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                    <div>
                        <div
                            class="flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary"
                            :class="{ 'bg-primary-light dark:bg-[#1B2E4B] !text-primary': active1 === 1 }"
                            @click="active1 === 1 ? (active1 = null) : (active1 = 1)"
                        >
                            <span>How to install VRISTO Admin</span>
                            <span v-if="active1 !== 1" class="shrink-0">
                                <icon-plus-circle :duotone="false" />
                            </span>

                            <span v-if="active1 === 1" class="shrink-0">
                                <icon-minus-circle :fill="true" />
                            </span>
                        </div>
                        <vue-collapsible :isOpen="active1 === 1">
                            <div class="px-1 py-3 font-semibold text-white-dark">
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                    put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </p>
                            </div>
                        </vue-collapsible>
                    </div>
                    <div>
                        <div
                            class="flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary"
                            :class="{ 'bg-primary-light dark:bg-[#1B2E4B] !text-primary': active1 === 2 }"
                            @click="active1 === 2 ? (active1 = null) : (active1 = 2)"
                        >
                            <span> Where can I subscribe to your newsletter?</span>
                            <span v-if="active1 !== 2" class="shrink-0">
                                <icon-plus-circle :duotone="false" />
                            </span>

                            <span v-if="active1 === 2" class="shrink-0">
                                <icon-minus-circle :fill="true" />
                            </span>
                        </div>
                        <vue-collapsible :isOpen="active1 === 2">
                            <div class="px-1 py-3 font-semibold text-white-dark">
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                    put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </p>
                            </div>
                        </vue-collapsible>
                    </div>
                    <div>
                        <div
                            class="flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary"
                            :class="{ 'bg-primary-light dark:bg-[#1B2E4B] !text-primary': active1 === 3 }"
                            @click="active1 === 3 ? (active1 = null) : (active1 = 3)"
                        >
                            <span>How to install VRISTO Admin</span>
                            <span v-if="active1 !== 3" class="shrink-0">
                                <icon-plus-circle :duotone="false" />
                            </span>

                            <span v-if="active1 === 3" class="shrink-0">
                                <icon-minus-circle :fill="true" />
                            </span>
                        </div>
                        <vue-collapsible :isOpen="active1 === 3">
                            <div class="px-1 py-3 font-semibold text-white-dark">
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                    put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </p>
                            </div>
                        </vue-collapsible>
                    </div>
                    <div>
                        <div
                            class="flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary"
                            :class="{ 'bg-primary-light dark:bg-[#1B2E4B] !text-primary': active1 === 5 }"
                            @click="active1 === 5 ? (active1 = null) : (active1 = 5)"
                        >
                            <span>How to install VRISTO Admin</span>
                            <span v-if="active1 !== 5" class="shrink-0">
                                <icon-plus-circle :duotone="false" />
                            </span>

                            <span v-if="active1 === 5" class="shrink-0">
                                <icon-minus-circle :fill="true" />
                            </span>
                        </div>
                        <vue-collapsible :isOpen="active1 === 5">
                            <div class="px-1 py-3 font-semibold text-white-dark">
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                    put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </p>
                            </div>
                        </vue-collapsible>
                    </div>
                </div>
            </div>
            <div class="rounded-md bg-white dark:bg-black">
                <div class="border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white">Quick support & Free update</div>
                <div class="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                    <div>
                        <div
                            class="flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary"
                            :class="{ 'bg-primary-light dark:bg-[#1B2E4B] !text-primary': active2 === 1 }"
                            @click="active2 === 1 ? (active2 = null) : (active2 = 1)"
                        >
                            <span>How to use Browser Sync</span>
                            <span v-if="active2 !== 1" class="shrink-0">
                                <icon-plus-circle :duotone="false" />
                            </span>

                            <span v-if="active2 === 1" class="shrink-0">
                                <icon-minus-circle :fill="true" />
                            </span>
                        </div>
                        <vue-collapsible :isOpen="active2 === 1">
                            <div class="px-1 py-3 font-semibold text-white-dark">
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                    put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </p>
                            </div>
                        </vue-collapsible>
                    </div>
                    <div>
                        <div
                            class="flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary"
                            :class="{ 'bg-primary-light dark:bg-[#1B2E4B] !text-primary': active2 === 2 }"
                            @click="active2 === 2 ? (active2 = null) : (active2 = 2)"
                        >
                            <span> Sidebar not rendering CSS</span>
                            <span v-if="active2 !== 2" class="shrink-0">
                                <icon-plus-circle :duotone="false" />
                            </span>

                            <span v-if="active2 === 2" class="shrink-0">
                                <icon-minus-circle :fill="true" />
                            </span>
                        </div>
                        <vue-collapsible :isOpen="active2 === 2">
                            <div class="px-1 py-3 font-semibold text-white-dark">
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                    put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </p>
                            </div>
                        </vue-collapsible>
                    </div>
                    <div>
                        <div
                            class="flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary"
                            :class="{ 'bg-primary-light dark:bg-[#1B2E4B] !text-primary': active2 === 3 }"
                            @click="active2 === 3 ? (active2 = null) : (active2 = 3)"
                        >
                            <span>Connect with us Personally</span>
                            <span v-if="active2 !== 3" class="shrink-0">
                                <icon-plus-circle :duotone="false" />
                            </span>

                            <span v-if="active2 === 3" class="shrink-0">
                                <icon-minus-circle :fill="true" />
                            </span>
                        </div>
                        <vue-collapsible :isOpen="active2 === 3">
                            <div class="px-1 py-3 font-semibold text-white-dark">
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                    put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </p>
                            </div>
                        </vue-collapsible>
                    </div>
                    <div>
                        <div
                            class="flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary"
                            :class="{ 'bg-primary-light dark:bg-[#1B2E4B] !text-primary': active2 === 5 }"
                            @click="active2 === 5 ? (active2 = null) : (active2 = 5)"
                        >
                            <span>Compilation Issue</span>
                            <span v-if="active2 !== 5" class="shrink-0">
                                <icon-plus-circle :duotone="false" />
                            </span>

                            <span v-if="active2 === 5" class="shrink-0">
                                <icon-minus-circle :fill="true" />
                            </span>
                        </div>
                        <vue-collapsible :isOpen="active2 === 5">
                            <div class="px-1 py-3 font-semibold text-white-dark">
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                                    put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </p>
                            </div>
                        </vue-collapsible>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel mt-10 text-center md:mt-20">
            <h3 class="mb-2 text-xl font-bold dark:text-white md:text-2xl">Still need help?</h3>
            <div class="text-lg font-medium text-white-dark">
                Our specialists are always happy to help. Contact us during standard business hours or email us24/7 and we'll get back to you.
            </div>
            <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <button type="button" class="btn btn-primary">Contact Us</button>
                <button type="button" class="btn btn-primary">Visit our community</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import VueCollapsible from 'vue-height-collapsible/vue3';
    import { useMeta } from '@/composables/use-meta';
    import { useAppStore } from '@/stores/index';

    import IconArrowWaveLeftUp from '@/components/icon/icon-arrow-wave-left-up.vue';
    import IconDesktop from '@/components/icon/icon-desktop.vue';
    import IconUser from '@/components/icon/icon-user.vue';
    import IconBox from '@/components/icon/icon-box.vue';
    import IconDollarSignCircle from '@/components/icon/icon-dollar-sign-circle.vue';
    import IconRouter from '@/components/icon/icon-router.vue';
    import IconPlusCircle from '@/components/icon/icon-plus-circle.vue';
    import IconMinusCircle from '@/components/icon/icon-minus-circle.vue';

    const store = useAppStore();
    useMeta({ title: 'FAQ' });

    const activeTab: any = ref('general');
    const active1: any = ref(1);
    const active2: any = ref(1);
</script>
