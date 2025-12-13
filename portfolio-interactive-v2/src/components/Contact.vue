<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const email = "hello@kodev.ai";
const isCopied = ref(false);

const headerRef = ref<HTMLElement | null>(null);
const leftPanel = ref<HTMLElement | null>(null);
const rightPanel = ref<HTMLElement | null>(null);

const copyEmail = () => {
    navigator.clipboard.writeText(email);
    isCopied.value = true;
    setTimeout(() => {
        isCopied.value = false;
    }, 2000);
};

const socials = [
    { name: 'LinkedIn', icon: 'business_center', url: '#', color: 'bg-[#0077b5]' },
    { name: 'GitHub', icon: 'code', url: '#', color: 'bg-[#333]' },
    // { name: 'Twitter / X', icon: 'chat', url: '#', color: 'bg-[#000]' },
    // { name: 'Instagram', icon: 'photo_camera', url: '#', color: 'bg-[#E1306C]' }
];

onMounted(() => {
    const tl = gsap.timeline();

    // Header Reveal
    if (headerRef.value) {
        tl.from(headerRef.value.querySelectorAll('h1, p'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // Panels Reveal
    if (leftPanel.value && rightPanel.value) {
        tl.from([leftPanel.value, rightPanel.value], {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5");

        // Stagger form inputs inside right panel
        const inputs = rightPanel.value.querySelectorAll('input, select, textarea');
        tl.from(inputs, {
            x: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power1.out"
        }, "-=0.4");
    }
});
</script>

<template>
    <div class="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div class="mx-auto max-w-[1400px]">

            <!-- Header -->
            <header ref="headerRef" class="mb-20 text-center md:text-left">
                <h1 class="font-display text-6xl font-bold leading-[0.9] text-ink md:text-8xl lg:text-[9rem]">
                    Let's start a <br />
                    <span class="text-matcha ml-0 md:ml-12 lg:ml-24 block mt-2">Conversation.</span>
                </h1>
                <p class="mt-8 text-xl text-matcha-dark max-w-2xl md:ml-2">
                    Have a project in mind or just want to discuss the future of AI in web dev?
                    I'm always open to new ideas and collaborations.
                </p>
            </header>

            <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                <!-- Contact Options -->
                <div ref="leftPanel" class="flex flex-col gap-8">
                    <!-- Email Card -->
                    <div class="group relative overflow-hidden rounded-3xl bg-background-dark p-8 md:p-12 transition-transform hover:-translate-y-2"
                        @click="copyEmail">
                        <div class="absolute top-0 right-0 p-8 opacity-0 transition-opacity group-hover:opacity-100">
                            <span class="material-symbols-outlined text-white/50 text-4xl">content_copy</span>
                        </div>

                        <h3 class="text-sm font-bold uppercase tracking-widest text-primary mb-4">Email Me</h3>
                        <p class="font-display text-4xl md:text-5xl font-bold text-white break-all">{{ email }}</p>

                        <div class="mt-8 flex items-center gap-2 text-white/60">
                            <span class="material-symbols-outlined text-lg">
                                {{ isCopied ? 'check_circle' : 'touch_app' }}
                            </span>
                            <span class="text-sm font-medium">
                                {{ isCopied ? 'Copied to clipboard!' : 'Click to copy' }}
                            </span>
                        </div>
                    </div>

                    <!-- Social Grid -->
                    <div class="grid grid-cols-2 gap-4">
                        <a v-for="social in socials" :key="social.name" :href="social.url"
                            class="group flex h-40 flex-col justify-between rounded-3xl bg-white border border-matcha-light p-6 transition-all hover:bg-cream hover:border-primary hover:shadow-lg">
                            <div class="flex justify-between items-start">
                                <span
                                    class="material-symbols-outlined text-2xl text-ink group-hover:text-matcha-dark transition-colors">{{
                                        social.icon }}</span>
                                <span
                                    class="material-symbols-outlined text-xl text-matcha-light opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">arrow_outward</span>
                            </div>
                            <span class="font-bold text-ink text-lg">{{ social.name }}</span>
                        </a>
                    </div>
                </div>

                <!-- Simple Form Mockup -->
                <div ref="rightPanel" class="rounded-3xl border border-matcha-light bg-white p-8 md:p-12">
                    <h3 class="text-2xl font-bold text-ink mb-8">Send a Message</h3>
                    <form class="flex flex-col gap-6" @submit.prevent>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-bold text-matcha-dark uppercase">Name</label>
                                <input type="text" placeholder="John Doe"
                                    class="w-full rounded-xl bg-cream border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all p-4 outline-hidden placeholder:text-matcha/40" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-bold text-matcha-dark uppercase">Email</label>
                                <input type="email" placeholder="john@example.com"
                                    class="w-full rounded-xl bg-cream border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all p-4 outline-hidden placeholder:text-matcha/40" />
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-bold text-matcha-dark uppercase">Subject</label>
                            <select
                                class="w-full rounded-xl bg-cream border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all p-4 outline-hidden text-ink">
                                <option>Project Inquiry</option>
                                <option>Collaboration</option>
                                <option>Just saying hi</option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-bold text-matcha-dark uppercase">Message</label>
                            <textarea rows="4" placeholder="Tell me about your project..."
                                class="w-full rounded-xl bg-cream border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all p-4 outline-hidden placeholder:text-matcha/40 resize-none"></textarea>
                        </div>

                        <button
                            class="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-ink text-white font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            <span>Send Message</span>
                            <span class="material-symbols-outlined">send</span>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>