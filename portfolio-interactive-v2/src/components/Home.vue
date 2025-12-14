<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Refs for animation
const heroTitle = ref<HTMLElement | null>(null);
const heroSubtitle = ref<HTMLElement | null>(null);
const heroImage = ref<HTMLElement | null>(null);
const techSection = ref<HTMLElement | null>(null);
const workSection = ref<HTMLElement | null>(null);

onMounted(() => {
    // GSAP ScrollTrigger Integration
    const tl = gsap.timeline();

    // 1. Text Reveal
    if (heroTitle.value) {
        const spans = heroTitle.value.querySelectorAll('span.reveal-text');
        tl.fromTo(spans,
            { y: 100, opacity: 0, rotate: 5 },
            { y: 0, opacity: 1, rotate: 0, duration: 1, stagger: 0.2, ease: 'power4.out' }
        );
    }

    // 2. Subtitle Fade
    if (heroSubtitle.value) {
        tl.fromTo(heroSubtitle.value,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.5'
        );
    }

    // 3. Hero Image Parallax & Reveal
    if (heroImage.value) {
        // Initial Reveal
        tl.fromTo(heroImage.value,
            { scale: 1.2, opacity: 0, filter: 'blur(10px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' },
            '-=1'
        );

        // Parallax on Scroll
        gsap.to(heroImage.value, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: heroImage.value.parentElement, // Trigger on the container
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // --- Technical Expertise Section ---
    if (techSection.value) {
        const cards = techSection.value.querySelectorAll('.group');
        gsap.fromTo(cards,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: techSection.value,
                    start: 'top 80%',
                }
            }
        );

        const title = techSection.value.querySelector('h2');
        if (title) {
            gsap.fromTo(title,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: title, start: 'top 85%' } }
            );
        }
    }

    // --- Selected Works Section ---
    if (workSection.value) {
        const projects = workSection.value.querySelectorAll('.group');
        gsap.fromTo(projects,
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: workSection.value,
                    start: 'top 75%',
                }
            }
        );
    }

    // Lenis cleanup is handled globally in App.vue
});
</script>

<template>
    <!-- Hero Section -->
    <header class="relative flex min-h-screen w-full flex-col justify-center overflow-hidden pt-24 md:pt-0">
        <!-- Background decorative elements -->
        <div class="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-matcha-light/30 blur-[120px]">
        </div>
        <div class="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-primary/20 blur-[100px]">
        </div>
        <div
            class="layout-container relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col justify-center px-6 md:px-12 lg:px-20">
            <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <!-- Text Content -->
                <div class="flex-1 text-center lg:text-left">
                    <div
                        class="mb-6 inline-flex items-center gap-2 rounded-full border border-matcha-light bg-white/50 px-3 py-1 backdrop-blur-sm">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span class="text-xs font-medium uppercase tracking-wider text-matcha-dark">Open to work</span>
                    </div>
                    <h1 ref="heroTitle"
                        class="font-display text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-7xl lg:text-8xl xl:text-[6.5rem] overflow-hidden">

                        <span class="reveal-text inline-block">Building</span> <br />

                        <span class="reveal-text relative inline-block">
                            Digital
                            <svg class="absolute -bottom-2 left-0 w-full text-primary" fill="none" viewbox="0 0 200 9"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00025 6.99997C25.3336 2.66663 80.0003 -3.00003 198.001 5.99998"
                                    stroke="currentColor" stroke-linecap="round" stroke-width="3"></path>
                            </svg>
                        </span>

                        <span class="reveal-text text-matcha inline-block">Intelligence</span>
                    </h1>
                    <div ref="heroSubtitle" class="opacity-0"> <!-- Wrapper for animate target -->
                        <p class="mt-8 max-w-xl text-lg text-matcha-dark sm:text-xl lg:mx-0 mx-auto">
                            A fusion of creative frontend development and artificial intelligence. Crafting intuitive
                            web
                            experiences powered by next-gen algorithms.
                        </p>
                        <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
                            <a href="#selected-works"
                                class="flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-ink transition-transform hover:scale-105 active:scale-95">
                                View Selected Works
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Hero Image / Visual -->
                <div class="relative flex-1 w-full max-w-[600px] lg:max-w-none">
                    <div class="relative aspect-square md:aspect-4/3 w-full overflow-hidden rounded-3xl">
                        <div class="absolute inset-0 bg-background-dark/5 mix-blend-overlay z-10 pointer-events-none">
                        </div>
                        <img ref="heroImage" alt="Abstract Art" class="h-full w-full object-cover"
                            data-alt="Abstract fluid 3D shapes in cream and dark metallic tones representing AI complexity"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK4iV2AtYQJKd1TfMbNelZi-eKlE_HBzxW-tzV_ML4diT5Fpq4gT90cvS4qiF9aDgTFTxe1SbGgFWnLcY_DQzq_kWMuJFapkrffC3MUT160wQEG8UQyjgwHQW7PILms6S_WGrN_ZOFnLeQU1Va6dayQvVMgL1nFJAoAose--Nb3MJjGoSLX0vl4zQHAv3s7b7y_4Cbh8WIKi4YcbrUkfiYyM4QewvLavzRm6gilMR_OAsOUCzxo4hZSVIsvKFMYuKyFMhCBE3O-A" />
                        <!-- Floating Card -->
                        <div
                            class="absolute bottom-6 left-6 right-6 z-20 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl md:bottom-10 md:left-auto md:right-10 md:w-[280px]">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-ink">
                                    <span class="material-symbols-outlined">auto_awesome</span>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-white/80 uppercase tracking-wider">Latest
                                        Experiment</p>
                                    <p class="font-bold text-white">Generative UI System</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Infinite Marquee -->
    <div class="relative w-full overflow-hidden border-y border-matcha-light bg-white/30 py-6">
        <div class="flex w-max animate-scroll gap-12 items-center">
            <!-- Content duplicated for seamless loop -->
            <span class="text-4xl font-bold text-matcha-light/40 select-none">REACT</span>
            <span class="text-4xl font-bold text-matcha/80 select-none">PYTHON</span>
            <span class="text-4xl font-bold text-matcha-light/40 select-none">TENSORFLOW</span>
            <span class="text-4xl font-bold text-matcha/80 select-none">NEXT.JS</span>
            <span class="text-4xl font-bold text-matcha-light/40 select-none">OPENAI</span>
            <span class="text-4xl font-bold text-matcha/80 select-none">THREE.JS</span>
            <span class="text-4xl font-bold text-matcha-light/40 select-none">TAILWIND</span>
            <span class="text-4xl font-bold text-matcha/80 select-none">TYPESCRIPT</span>
            <span class="text-4xl font-bold text-matcha-light/40 select-none">REACT</span>
            <span class="text-4xl font-bold text-matcha/80 select-none">PYTHON</span>
            <span class="text-4xl font-bold text-matcha-light/40 select-none">TENSORFLOW</span>
            <span class="text-4xl font-bold text-matcha/80 select-none">NEXT.JS</span>
            <span class="text-4xl font-bold text-matcha-light/40 select-none">OPENAI</span>
            <span class="text-4xl font-bold text-matcha/80 select-none">THREE.JS</span>
            <span class="text-4xl font-bold text-matcha-light/40 select-none">TAILWIND</span>
            <span class="text-4xl font-bold text-matcha/80 select-none">TYPESCRIPT</span>
        </div>
    </div>
    <!-- Technical Expertise -->
    <section ref="techSection" class="py-24 px-6 md:px-12 lg:px-20">
        <div class="mx-auto max-w-[1400px]">
            <div class="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div class="max-w-2xl">
                    <h2 class="font-display text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
                        Technical <span class="text-matcha">Expertise</span>
                    </h2>
                    <p class="mt-4 text-lg text-matcha-dark">
                        Bridging the gap between functional logic and aesthetic fluidity. My toolkit is built for
                        modern, scalable, and intelligent web solutions.
                    </p>
                </div>
                <div class="hidden h-px flex-1 bg-matcha-light md:block md:mx-8"></div>
                <div class="shrink-0">
                    <span class="material-symbols-outlined text-6xl text-primary rotate-12">psychology</span>
                </div>
            </div>
            <div class="grid gap-6 md:grid-cols-3">
                <!-- Card 1 -->
                <div
                    class="group relative overflow-hidden rounded-2xl border border-matcha-light bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-matcha/10">
                    <div
                        class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 transition-transform group-hover:scale-150">
                    </div>
                    <div
                        class="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-ink">
                        <span class="material-symbols-outlined text-3xl">code_blocks</span>
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-ink">Frontend Architecture</h3>
                    <p class="text-matcha-dark">
                        Building responsive, accessible, and performant interfaces using React ecosystem.
                    </p>
                    <ul class="mt-6 flex flex-wrap gap-2">
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">Next.js 14</li>
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">TypeScript</li>
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">Tailwind</li>
                    </ul>
                </div>
                <!-- Card 2 -->
                <div
                    class="group relative overflow-hidden rounded-2xl border border-matcha-light bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-matcha/10">
                    <div
                        class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 transition-transform group-hover:scale-150">
                    </div>
                    <div
                        class="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-ink">
                        <span class="material-symbols-outlined text-3xl">smart_toy</span>
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-ink">AI Integration</h3>
                    <p class="text-matcha-dark">
                        Implementing LLMs and neural networks to create smarter web applications.
                    </p>
                    <ul class="mt-6 flex flex-wrap gap-2">
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">Python</li>
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">LangChain</li>
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">Hugging Face</li>
                    </ul>
                </div>
                <!-- Card 3 -->
                <div
                    class="group relative overflow-hidden rounded-2xl border border-matcha-light bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-matcha/10">
                    <div
                        class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 transition-transform group-hover:scale-150">
                    </div>
                    <div
                        class="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-ink">
                        <span class="material-symbols-outlined text-3xl">palette</span>
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-ink">Creative Coding</h3>
                    <p class="text-matcha-dark">
                        Crafting immersive web experiences with WebGL and advanced animations.
                    </p>
                    <ul class="mt-6 flex flex-wrap gap-2">
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">Three.js</li>
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">GSAP</li>
                        <li class="rounded-lg bg-cream px-3 py-1 text-xs font-bold text-matcha-dark">Canvas</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <!-- Selected Works (Asymmetrical Grid) -->
    <section ref="workSection" class="py-24 px-6 md:px-12 lg:px-20 bg-white" id="selected-works">
        <div class="mx-auto max-w-[1400px]">
            <div class="flex items-center justify-between mb-16">
                <h2 class="font-display text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
                    Selected <span class="text-matcha">Works</span>
                </h2>
                <router-link :to="{ name: 'Work' }"
                    class="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ink hover:text-primary transition-all group">
                    All Projects <span
                        class="material-symbols-outlined group-hover:-translate-y-1 transition-transform">arrow_outward</span>
                </router-link>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">
                <!-- Project 1: Large Span -->
                <div
                    class="group md:col-span-2 relative overflow-hidden rounded-3xl bg-cream aspect-16/10 md:aspect-auto">
                    <img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        data-alt="Abstract vibrant gradient mesh representing AI image generation"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY-pyxv8PMm5V8vFpvu6hKw5PIHW2cQmrszQ9qON-pIJnhqWhj7riHGBVXRO9laVutuB6wUtIFIYvtZkhmAroI0onEO5tbfXFgqdVpHmq1FA47RKJfNlKuK6XQaw99fZY0JforzoTdIgCYGxIgKPTvsmzqxq4Oi3G2z14Vb2Xf__-9k0XO4X8Myel1RGg2uNBa1cIwshKNzYomZgiJCNOKUIHWqKZt5c0XlJ4H9m34WdgNuC_GzGzF4qxHwsMrBseKdFkgNkZ6bg" />
                    <div
                        class="absolute inset-0 bg-linear-to-t from-background-dark/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80">
                    </div>
                    <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <div class="flex items-end justify-between">
                            <div>
                                <h3 class="text-3xl font-bold text-white mb-2 md:text-4xl">Synapse AI</h3>
                                <p class="text-white/80 font-medium">React • Stable Diffusion • Node.js</p>
                            </div>
                            <button
                                class="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-ink opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                <span class="material-symbols-outlined">arrow_outward</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Project 2: Tall Vertical -->
                <div class="group md:row-span-2 relative overflow-hidden rounded-3xl bg-cream min-h-[400px]">
                    <img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        data-alt="Clean minimal dashboard UI showing data analytics graphs"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1xhvEnd7AudSAF-ZEzerdYAW0f6AQkhy96MS_yx_TAJVgQqz-o7Ni_ZBoiaKxx4Jj6_8yitPGGWX5H8r7fb21F-PdMeqIXNrEjla4URrJjVMre3GXiGwfA7vpbVCK3VM5RzOtaQbBgyP9hGQPkxhT5YA_q0PgLr96naIh_WiBqUSituGCpCWgkWl-X9hyd30VeGD8wxMFE51u35-4EeJ6Ha3KTaeZsvoxlSkbUWl3tzTIU-VjDw8Qc37W0yu-E10G-kCnqmFN2A" />
                    <div
                        class="absolute inset-0 bg-linear-to-t from-background-dark/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80">
                    </div>
                    <div class="absolute bottom-0 left-0 p-8 w-full">
                        <h3 class="text-2xl font-bold text-white mb-2">DataViz Pro</h3>
                        <p class="text-white/80 font-medium">D3.js • Vue • Firebase</p>
                    </div>
                </div>
                <!-- Project 3 -->
                <div class="group relative overflow-hidden rounded-3xl bg-cream min-h-[300px]">
                    <img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        data-alt="E-commerce mobile app interface mockup on a table"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd9twZg62mr6IWbwJq4H9t6Mx7uldtrdFk2GcglY5IB2PfybZo32asVaz_T65N3uCmJDiMtqtDZdww1T_Zghdon4OkwsHxp7146ibDcb3Aju3aP4XmsQNhBDBt_t7xA7uFgwfu2SRmskndWKeyXFEEiVelGVm9BMgRbqJR8n3uwNaaljcOpGi5vM3C2XZNCnXgcJo7uWa-c3daI-KZS6aeeM1jVtKpcAkQcVWrLg86l4j8VjPVFJhSKv85M2NqISemqf-P1dEYzg" />
                    <div
                        class="absolute inset-0 bg-linear-to-t from-background-dark/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80">
                    </div>
                    <div class="absolute bottom-0 left-0 p-8 w-full">
                        <div class="flex items-end justify-between">
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-2">EcoMarket</h3>
                                <p class="text-white/80 font-medium">Shopify Headless • Next.js</p>
                            </div>
                            <button
                                class="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-ink opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                <span class="material-symbols-outlined text-sm">arrow_outward</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Project 4 -->
                <div class="group relative overflow-hidden rounded-3xl bg-cream min-h-[300px]">
                    <img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        data-alt="Retro computer monitor displaying code, creative portfolio vibe"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDfACwubrucnWSBTNHMGFstlYcw3MKTQ0HelfH6-m3WET-mN0FumQOs5GAVhDwcmUctUPsiuiFuNl6eVI5UpkpXtDDcqcMzIwaBrHcmu-cqwNhAU9VFm5gAvc6YC4ljOBB1A-T0j0h0nXZvsDHkREucGqDxB11Hedi8DlHZS8NU6rzxgWlbAUFR-Dfh3XS1igm5T7XUe2IcTpaVTva-qB4_gf4wF9kRzES1_YBYKQ4Kcq5DyuWMBDqBPfARun0PRJeOPhfEUpQxA" />
                    <div
                        class="absolute inset-0 bg-linear-to-t from-background-dark/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80">
                    </div>
                    <div class="absolute bottom-0 left-0 p-8 w-full">
                        <h3 class="text-2xl font-bold text-white mb-2">Portfolio V1</h3>
                        <p class="text-white/80 font-medium">HTML5 • SCSS • Vanilla JS</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Marquee Animation */
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-scroll {
    animation: scroll 20s linear infinite;
}
</style>