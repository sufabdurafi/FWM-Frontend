﻿<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Elements</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Buttons</span>
            </li>
        </ul>
        <div class="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="panel">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Default</h5>
                    <a class="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" href="javascript:;" @click="toggleCode('code1')">
                        <span class="flex items-center">
                            <icon-code class="me-2" />
                            Code
                        </span>
                    </a>
                </div>
                <div class="mb-5">
                    <div class="flex w-full">
                        <div class="flex items-center justify-center w-1/2">
                            <button type="button" class="btn btn-primary">Primary</button>
                        </div>
                        <div class="flex items-center justify-center w-1/2">
                            <button type="button" class="btn btn-outline-primary">Primary</button>
                        </div>
                    </div>
                </div>
                <template v-if="codeArr.includes('code1')">
                    <highlight>
                        <pre>
&lt;!-- default --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;Primary&lt;/button&gt;

&lt;!-- outline --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-primary&quot;&gt;Primary&lt;/button&gt;
</pre
                        >
                    </highlight>
                </template>
            </div>

            <div class="panel">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Rounded</h5>
                    <a class="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" href="javascript:;" @click="toggleCode('code2')">
                        <span class="flex items-center">
                            <icon-code class="me-2" />
                            Code
                        </span>
                    </a>
                </div>
                <div class="mb-5">
                    <div class="flex w-full">
                        <div class="flex items-center justify-center w-1/2">
                            <button type="button" class="btn btn-primary rounded-full">Primary</button>
                        </div>
                        <div class="flex items-center justify-center w-1/2">
                            <button type="button" class="btn btn-outline-primary rounded-full">Primary</button>
                        </div>
                    </div>
                </div>
                <template v-if="codeArr.includes('code2')">
                    <highlight>
                        <pre>
&lt;!-- default circle--&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary rounded-full&quot;&gt;Primary&lt;/button&gt;

&lt;!-- outline circle --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-primary rounded-full&quot;&gt;Primary&lt;/button&gt;
</pre
                        >
                    </highlight>
                </template>
            </div>

            <div class="panel">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Solid</h5>
                    <a class="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" href="javascript:;" @click="toggleCode('code3')">
                        <span class="flex items-center">
                            <icon-code class="me-2" />
                            Code
                        </span>
                    </a>
                </div>
                <div class="mb-5">
                    <div class="flex flex-wrap items-center justify-center gap-2">
                        <button type="button" class="btn btn-primary">Primary</button>
                        <button type="button" class="btn btn-info">Info</button>
                        <button type="button" class="btn btn-success">Success</button>
                        <button type="button" class="btn btn-warning">Warning</button>
                        <button type="button" class="btn btn-danger">Danger</button>
                        <button type="button" class="btn btn-secondary">Secondary</button>
                        <button type="button" class="btn btn-dark">Dark</button>
                    </div>
                </div>
                <template v-if="codeArr.includes('code3')">
                    <highlight>
                        <pre>
&lt;!-- primary --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;Primary&lt;/button&gt;

&lt;!-- info --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-info&quot;&gt;Info&lt;/button&gt;

&lt;!-- success --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-success&quot;&gt;Success&lt;/button&gt;

&lt;!-- warning --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-warning&quot;&gt;Warning&lt;/button&gt;

&lt;!-- danger --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot;&gt;Danger&lt;/button&gt;

&lt;!-- secondary --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-secondary&quot;&gt;Secondary&lt;/button&gt;

&lt;!-- dark --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-dark&quot;&gt;Dark&lt;/button&gt;
</pre
                        >
                    </highlight>
                </template>
            </div>

            <div class="panel">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Outline</h5>
                    <a class="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" href="javascript:;" @click="toggleCode('code4')">
                        <span class="flex items-center">
                            <icon-code class="me-2" />
                            Code
                        </span>
                    </a>
                </div>
                <div class="mb-5">
                    <div class="flex flex-wrap items-center justify-center gap-2">
                        <button type="button" class="btn btn-outline-primary">Primary</button>
                        <button type="button" class="btn btn-outline-info">Info</button>
                        <button type="button" class="btn btn-outline-success">Success</button>
                        <button type="button" class="btn btn-outline-warning">Warning</button>
                        <button type="button" class="btn btn-outline-danger">Danger</button>
                        <button type="button" class="btn btn-outline-secondary">Secondary</button>
                        <button type="button" class="btn btn-outline-dark">Dark</button>
                    </div>
                </div>
                <template v-if="codeArr.includes('code4')">
                    <highlight>
                        <pre>
&lt;!-- outline-primary --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-primary&quot;&gt;Primary&lt;/button&gt;

&lt;!-- outline-info --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-info&quot;&gt;Info&lt;/button&gt;

&lt;!-- outline-success --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-success&quot;&gt;Success&lt;/button&gt;

&lt;!-- outline-warning --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-warning&quot;&gt;Warning&lt;/button&gt;

&lt;!-- outline-danger --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-danger&quot;&gt;Danger&lt;/button&gt;

&lt;!-- outline-secondary --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-secondary&quot;&gt;Secondary&lt;/button&gt;

&lt;!-- outline-dark --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-outline-dark&quot;&gt;Dark&lt;/button&gt;
</pre
                        >
                    </highlight>
                </template>
            </div>

            <div class="panel">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Button Sizes</h5>
                    <a class="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" href="javascript:;" @click="toggleCode('code5')">
                        <span class="flex items-center">
                            <icon-code class="me-2" />
                            Code
                        </span>
                    </a>
                </div>
                <div class="mb-5">
                    <div class="flex flex-wrap items-center justify-center gap-2">
                        <button type="button" class="btn btn-primary btn-lg">Primary</button>
                        <button type="button" class="btn btn-info">Info</button>
                        <button type="button" class="btn btn-success btn-sm">Success</button>
                        <button type="button" class="btn btn-warning btn-sm">Warning</button>
                    </div>
                </div>
                <template v-if="codeArr.includes('code5')">
                    <highlight>
                        <pre>
&lt;!-- large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-lg&quot;&gt;Primary&lt;/button&gt;

&lt;!-- default --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-info&quot;&gt;Info&lt;/button&gt;

&lt;!-- small success --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-success btn-sm&quot;&gt;Success&lt;/button&gt;

&lt;!-- small warning --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-warning btn-sm&quot;&gt;Warning&lt;/button&gt;
</pre
                        >
                    </highlight>
                </template>
            </div>

            <div class="panel">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Button with Icons</h5>
                    <a class="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" href="javascript:;" @click="toggleCode('code6')"
                        ><span class="flex items-center">
                            <icon-code class="me-2" />
                            Code
                        </span></a
                    >
                </div>
                <div class="mb-5">
                    <div class="flex flex-wrap items-center justify-center gap-2">
                        <button type="button" class="btn btn-primary">
                            <icon-settings class="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                            Left
                        </button>
                        <button type="button" class="btn btn-warning rounded-full">
                            Right
                            <icon-pencil class="w-5 h-5 ltr:ml-1.5 rtl:mr-1.5 shrink-0"/>
                        </button>
                        <button type="button" class="btn btn-danger">
                            <icon-download />
                        </button>
                        <button type="button" class="btn btn-dark w-10 h-10 p-0 rounded-full">
                            <icon-sun />
                        </button>
                    </div>
                </div>
                <template v-if="codeArr.includes('code6')">
                    <highlight>
                        <pre>
&lt;!-- left icon --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;
    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;w-5 h-5 ltr:mr-1.5 rtl:ml-1.5&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;
        &lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;3&quot;&gt;&lt;/circle&gt;
        &lt;path d=&quot;M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z&quot;&gt;&lt;/path&gt;
    &lt;/svg&gt; Left
&lt;/button&gt;

&lt;!-- right icon --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-warning rounded-full&quot;&gt;
    Right
    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;w-5 h-5 ltr:ml-1.5 rtl:mr-1.5&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;
        &lt;path d=&quot;M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z&quot;&gt;&lt;/path&gt;
    &lt;/svg&gt;
&lt;/button&gt;

&lt;!-- icon --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot;&gt;
    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;w-5 h-5&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;
        &lt;path d=&quot;M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4&quot;&gt;&lt;/path&gt;
        &lt;polyline points=&quot;7 10 12 15 17 10&quot;&gt;&lt;/polyline&gt;
        &lt;line x1=&quot;12&quot; y1=&quot;15&quot; x2=&quot;12&quot; y2=&quot;3&quot;&gt;&lt;/line&gt;
    &lt;/svg&gt;
&lt;/button&gt;

&lt;!-- circle icon --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-dark w-10 h-10 p-0 rounded-full&quot;&gt;
&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;w-5 h-5&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;
    &lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;5&quot;&gt;&lt;/circle&gt;
    &lt;line x1=&quot;12&quot; y1=&quot;1&quot; x2=&quot;12&quot; y2=&quot;3&quot;&gt;&lt;/line&gt;
    &lt;line x1=&quot;12&quot; y1=&quot;21&quot; x2=&quot;12&quot; y2=&quot;23&quot;&gt;&lt;/line&gt;
    &lt;line x1=&quot;4.22&quot; y1=&quot;4.22&quot; x2=&quot;5.64&quot; y2=&quot;5.64&quot;&gt;&lt;/line&gt;
    &lt;line x1=&quot;18.36&quot; y1=&quot;18.36&quot; x2=&quot;19.78&quot; y2=&quot;19.78&quot;&gt;&lt;/line&gt;
    &lt;line x1=&quot;1&quot; y1=&quot;12&quot; x2=&quot;3&quot; y2=&quot;12&quot;&gt;&lt;/line&gt;
    &lt;line x1=&quot;21&quot; y1=&quot;12&quot; x2=&quot;23&quot; y2=&quot;12&quot;&gt;&lt;/line&gt;
    &lt;line x1=&quot;4.22&quot; y1=&quot;19.78&quot; x2=&quot;5.64&quot; y2=&quot;18.36&quot;&gt;&lt;/line&gt;
    &lt;line x1=&quot;18.36&quot; y1=&quot;5.64&quot; x2=&quot;19.78&quot; y2=&quot;4.22&quot;&gt;&lt;/line&gt;
&lt;/svg&gt;
&lt;/button&gt;
</pre
                        >
                    </highlight>
                </template>
            </div>

            <div class="panel">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Block Buttons</h5>
                    <a class="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600" href="javascript:;" @click="toggleCode('code7')"
                        ><span class="flex items-center">
                            <icon-code class="me-2" />
                            Code
                        </span>
                    </a>
                </div>
                <div class="mb-5">
                    <div class="flex flex-col gap-4">
                        <button type="button" class="btn btn-primary w-full">Button</button>
                        <button type="button" class="btn btn-info w-full">Button</button>
                        <button type="button" class="btn btn-success w-full">Button</button>
                    </div>
                </div>
                <template v-if="codeArr.includes('code7')">
                    <highlight>
                        <pre>
&lt;!-- primary --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary w-full&quot;&gt;Button&lt;/button&gt;

&lt;!-- info --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-info w-full&quot;&gt;Button&lt;/button&gt;

&lt;!-- success --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-success w-full&quot;&gt;Button&lt;/button&gt;
</pre
                        >
                    </highlight>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import highlight from '@/components/plugins/highlight.vue';
    import codePreview from '@/composables/codePreview';
    import { useMeta } from '@/composables/use-meta';

    import IconCode from '@/components/icon/icon-code.vue';
    import IconSettings from '@/components/icon/icon-settings.vue';
    import IconPencil from '@/components/icon/icon-pencil.vue';
    import IconDownload from '@/components/icon/icon-download.vue';
    import IconSun from '@/components/icon/icon-sun.vue';

    useMeta({ title: 'buttons' });

    const { codeArr, toggleCode } = codePreview();
</script>
