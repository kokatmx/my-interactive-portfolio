<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projects } from '../data/projects';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const router = useRouter();
const project = computed(() => projects.find(p => p.slug === route.params.slug));

const containerRef = ref<HTMLElement | null>(null);
const heroImageRef = ref<HTMLElement | null>(null);
const nextProjectRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

// Find next project for the "Next Project" functionality
const nextProject = computed(() => {
    if (!project.value) return null;
    const currentIndex = projects.findIndex(p => p.slug === project.value!.slug);
    const nextIndex = (currentIndex + 1) % projects.length; // Loop back to start
    return projects[nextIndex];
});

const navigateToNext = () => {
    if (nextProject.value) {
        router.push({ name: 'ProjectDetail', params: { slug: nextProject.value.slug } });
    }
};

const goBack = () => {
    router.push({ name: 'Work' });
};

// Animation Logic
const initAnimations = () => {
    if (!containerRef.value) return;

    ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // Hero Text Reveal
        tl.from(".hero-text-reveal", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.2
        });

        // Image Reveal
        tl.from(heroImageRef.value, {
            scale: 1.1,
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: "power3.out"
        }, "-=0.8");

        // Content Reveal (ScrollTrigger)
        const contentSections = gsap.utils.toArray('.content-reveal');
        contentSections.forEach((section: any) => {
            gsap.from(section, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Next Project Hover Effect
        if (nextProjectRef.value) {
            gsap.set(".next-project-bg", { scaleY: 0, transformOrigin: "bottom" });
            const nextLink = nextProjectRef.value;

            nextLink.addEventListener("mouseenter", () => {
                gsap.to(".next-project-bg", { scaleY: 1, duration: 0.4, ease: "power2.out" });
                gsap.to(".next-project-text", { color: "#FCF8F4", duration: 0.3 });
            });

            nextLink.addEventListener("mouseleave", () => {
                gsap.to(".next-project-bg", { scaleY: 0, duration: 0.4, ease: "power2.in" });
                gsap.to(".next-project-text", { color: "#141b0d", duration: 0.3 });
            });
        }
    }, containerRef.value);
};

onMounted(() => {
    // Scroll to top initially
    window.scrollTo(0, 0);
    initAnimations();
});

// Re-run animations when route changes (same component re-use)
watch(
    () => route.params.id,
    () => {
        ctx?.revert();
        window.scrollTo(0, 0);
        // Small delay to allow DOM update
        setTimeout(initAnimations, 100);
    }
);

onUnmounted(() => {
    ctx?.revert();
});
</script>

<template>
    <div ref="containerRef"
        class="min-h-screen bg-cream text-ink pt-32 pb-20 px-6 md:px-12 lg:px-20 selection:bg-primary selection:text-ink">
        <div v-if="project" class="mx-auto max-w-[1400px]">

            <!-- Back Button -->
            <button @click="goBack" class="group flex items-center gap-2 mb-12 hover:text-primary transition-colors">
                <span
                    class="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                <span class="font-bold uppercase tracking-widest text-sm">Back to Work</span>
            </button>

            <!-- Header -->
            <header class="mb-16 md:mb-24">
                <div class="overflow-hidden">
                    <p class="hero-text-reveal text-primary font-bold uppercase tracking-widest mb-4">{{
                        project.category }}</p>
                </div>
                <div class="overflow-hidden">
                    <h1
                        class="hero-text-reveal font-display text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.9]">
                        {{ project.title }}
                    </h1>
                </div>
            </header>

            <!-- Hero Image -->
            <div class="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-20 md:mb-32">
                <div ref="heroImageRef" class="w-full h-full">
                    <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-black/10"></div>
                </div>
            </div>

            <!-- Project Details Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 mb-32">

                <!-- Sidebar Info -->
                <div class="lg:col-span-4 flex flex-col gap-12 content-reveal">
                    <div>
                        <h3 class="text-sm font-bold uppercase tracking-widest text-matcha-dark mb-2">Role</h3>
                        <p class="text-xl font-medium">{{ project.role }}</p>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold uppercase tracking-widest text-matcha-dark mb-2">Year</h3>
                        <p class="text-xl font-medium">{{ project.year }}</p>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold uppercase tracking-widest text-matcha-dark mb-2">Tech Stack</h3>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span v-for="t in project.tech" :key="t"
                                class="border border-matcha-dark/20 rounded-full px-4 py-2 text-sm font-medium">
                                {{ t }}
                            </span>
                        </div>
                    </div>
                    <div v-if="project.link !== '#'">
                        <a :href="project.link" target="_blank"
                            class="inline-flex items-center gap-2 bg-ink text-white px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-ink transition-colors group">
                            Live Project
                            <span
                                class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_outward</span>
                        </a>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:col-span-8 flex flex-col gap-20">
                    <div class="content-reveal">
                        <h2 class="text-3xl md:text-4xl font-bold mb-8">Overview</h2>
                        <p class="text-lg md:text-xl leading-relaxed text-matcha-dark/90">{{ project.description }}</p>
                    </div>

                    <div class="content-reveal bg-white p-8 md:p-12 rounded-3xl border border-matcha-light">
                        <h2 class="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                            <span class="material-symbols-outlined text-primary">psychology_alt</span>
                            The Challenge
                        </h2>
                        <p class="text-lg leading-relaxed text-matcha-dark">{{ project.challenge }}</p>
                    </div>

                    <div class="content-reveal bg-background-dark text-cream p-8 md:p-12 rounded-3xl">
                        <h2 class="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-primary">
                            <span class="material-symbols-outlined">lightbulb</span>
                            The Solution
                        </h2>
                        <p class="text-lg leading-relaxed opacity-90">{{ project.solution }}</p>
                    </div>
                </div>
            </div>

            <!-- Next Project Navigation -->
            <div v-if="nextProject" class="border-t border-matcha-light pt-20">
                <p class="text-center text-matcha-dark uppercase tracking-widest font-bold mb-8">Next Project</p>
                <div ref="nextProjectRef" @click="navigateToNext"
                    class="relative block group cursor-pointer overflow-hidden rounded-3xl border border-ink/10">
                    <div class="next-project-bg absolute inset-0 bg-ink z-0"></div> <!-- Background fill -->

                    <div class="relative z-10 p-12 md:p-24 text-center transition-colors">
                        <h2 class="next-project-text font-display text-5xl md:text-8xl font-bold transition-colors">
                            {{ nextProject.title }}
                        </h2>
                        <div
                            class="next-project-text mt-6 flex items-center justify-center gap-2 text-xl font-medium transition-colors opacity-60">
                            <span>View Case Study</span>
                            <span class="material-symbols-outlined">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Not Found State -->
        <div v-else class="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <h1 class="text-4xl font-bold mb-4">Project Not Found</h1>
            <button @click="goBack" class="text-primary hover:underline">Return to Work</button>
        </div>
    </div>
</template>
