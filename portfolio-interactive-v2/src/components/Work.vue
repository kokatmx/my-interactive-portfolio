<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { projects } from '../data/projects'; // Import centralized data

gsap.registerPlugin(ScrollTrigger);

const projectsGrid = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);

onMounted(() => {
    // Header Reveal
    if (headerRef.value) {
        gsap.from(headerRef.value.querySelectorAll('h1, p'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // Projects Grid Reveal
    if (projectsGrid.value) {
        gsap.from(projectsGrid.value.children, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: projectsGrid.value,
                start: "top 80%"
            }
        });
    }
});
</script>

<template>
    <!-- Header -->
    <header ref="headerRef" class="relative flex w-full flex-col justify-center pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div class="mx-auto w-full max-w-[1400px]">
            <h1 class="font-display text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-8xl">
                Featured <br />
                <span class="text-matcha">Projects.</span>
            </h1>
            <p class="mt-6 max-w-xl text-lg text-matcha-dark sm:text-xl">
                A curated selection of my work in web development and AI integration.
                Exploring the intersection of design, code, and intelligence.
            </p>
        </div>
    </header>

    <!-- Projects Grid -->
    <section class="pb-24 px-6 md:px-12 lg:px-20">
        <div class="mx-auto max-w-[1400px]">
            <!-- Masonry-like Grid using CSS Grid -->
            <div ref="projectsGrid"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">

                <router-link v-for="project in projects" :key="project.id"
                    :to="{ name: 'ProjectDetail', params: { slug: project.slug } }"
                    class="group relative overflow-hidden rounded-[2.5rem] bg-cream cursor-pointer block" :class="{
                        'md:col-span-2 aspect-16/10 md:aspect-auto': project.size === 'large',
                        'md:row-span-2 min-h-[500px]': project.size === 'tall',
                        'min-h-[350px]': project.size === 'normal'
                    }">

                    <!-- Image -->
                    <img :src="project.image" :alt="project.title"
                        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

                    <!-- Overlay -->
                    <div
                        class="absolute inset-0 bg-linear-to-t from-background-dark/90 via-background-dark/20 to-transparent opacity-80 transition-opacity duration-300">
                    </div>

                    <!-- Content -->
                    <div
                        class="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                        <div class="flex items-end justify-between">
                            <div>
                                <p class="text-primary font-bold text-sm uppercase tracking-wider mb-2">{{
                                    project.category }}</p>
                                <h3 class="text-3xl font-bold text-white mb-3 md:text-4xl">{{ project.title }}</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="t in project.tech" :key="t"
                                        class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                                        {{ t }}
                                    </span>
                                </div>
                            </div>

                            <!-- Arrow Button -->
                            <div
                                class="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-ink opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                                <span class="material-symbols-outlined">arrow_outward</span>
                            </div>
                        </div>
                    </div>
                </router-link>

                <!-- "More Coming Soon" Card -->
                <div
                    class="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-dashed border-matcha-light bg-cream/50 min-h-[350px]">
                    <div
                        class="rounded-full bg-matcha-light/20 p-6 text-matcha-dark mb-4 group-hover:bg-primary group-hover:text-ink transition-colors duration-300">
                        <span class="material-symbols-outlined text-4xl">construction</span>
                    </div>
                    <h3 class="text-xl font-bold text-ink">More in development</h3>
                    <p class="text-matcha-dark mt-2">Cooking up new ideas...</p>
                </div>

            </div>
        </div>
    </section>
</template>