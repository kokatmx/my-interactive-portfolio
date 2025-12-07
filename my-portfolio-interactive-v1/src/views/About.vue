<template>
    <Header />
    <main class="bg-[#111111] min-h-screen pt-32 pb-0 text-[#F5F5F5] overflow-x-hidden">
        <!-- Hero Section -->
        <div class="px-8 md:px-16 mb-40">
            <h1 class="text-[14vw] leading-[0.85] font-light uppercase tracking-tighter text-[#F5F5F5] mix-blend-exclusion"
                style="word-spacing: 100vw;">
                <span ref="heroLines" class="block overflow-hidden">
                    <span class="block translate-y-full">I Build</span>
                </span>
                <span ref="heroLines" class="block overflow-hidden text-[#BFFF00]">
                    <span class="block translate-y-full">Digital</span>
                </span>
                <span ref="heroLines" class="block overflow-hidden">
                    <span class="block translate-y-full">Experiences</span>
                </span>
            </h1>
        </div>

        <!-- Sticky Bio Section -->
        <div class="px-8 md:px-16 pb-40 relative">
            <div class="flex flex-col md:flex-row gap-20">
                <!-- Sticky Left Side -->
                <div class="hidden md:block w-1/3 relative">
                    <div class="sticky top-40">
                        <div class="w-full h-[60vh] bg-[#222] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 rounded-sm">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                                class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <!-- Scrolling Right Side -->
                <div class="w-full md:w-2/3 space-y-32">
                    <div ref="bioSections">
                        <span class="text-[#BFFF00] uppercase tracking-widest text-sm mb-6 block">The Vision</span>
                        <p class="text-4xl md:text-6xl font-light leading-tight">
                            I believe the web should be an extension of reality—fluid, responsive, and alive. My work focuses on bridging the gap between functional design and technical excellence.
                        </p>
                    </div>

                    <div ref="bioSections">
                        <span class="text-[#BFFF00] uppercase tracking-widest text-sm mb-6 block">The Background</span>
                        <p class="text-2xl md:text-3xl text-[#F5F5F5]/60 leading-relaxed max-w-2xl">
                            Based in East Java, I've spent the last 4 years perfecting my craft in Fullstack Development. From architecture to animation, I obsess over every pixel and line of code ensuring the final output is nothing short of perfection.
                        </p>
                    </div>

                    <div ref="bioSections" class="grid grid-cols-2 gap-12">
                        <div>
                            <span class="block text-4xl font-light text-[#BFFF00] mb-2">4+</span>
                            <span class="text-[#F5F5F5]/40 uppercase tracking-widest text-sm">Years Experience</span>
                        </div>
                        <div>
                            <span class="block text-4xl font-light text-[#BFFF00] mb-2">50+</span>
                            <span class="text-[#F5F5F5]/40 uppercase tracking-widest text-sm">Projects Delivered</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Horizontal Scroll Skills (Marquee) -->
        <div class="py-32 border-t border-[#F5F5F5]/10 bg-[#BFFF00] text-[#111111] overflow-hidden">
            <div ref="marqueeRef" class="flex whitespace-nowrap text-[10vw] font-bold uppercase tracking-tight leading-none">
                <span class="px-8">Vue 3 • Nuxt • TypeScript • GSAP • WebGL • Node.js • Design Systems • </span>
                <span class="px-8">Vue 3 • Nuxt • TypeScript • GSAP • WebGL • Node.js • Design Systems • </span>
            </div>
        </div>
    </main>
    <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

gsap.registerPlugin(ScrollTrigger)

const heroLines = ref<HTMLElement[]>([])
const bioSections = ref<HTMLElement[]>([])
const marqueeRef = ref<HTMLElement | null>(null)

onMounted(() => {
    // 1. Hero Text Reveal
    if (heroLines.value.length) {
        // Target the inner spans
        const innerSpans = heroLines.value.map(line => line.children[0])
        gsap.to(innerSpans, {
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.5
        })
    }

    // 2. Bio Sections Fade Up
    bioSections.value.forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    once: true
                }
            }
        )
    })

    // 3. Marquee Infinite Scroll
    if (marqueeRef.value) {
        gsap.to(marqueeRef.value, {
            xPercent: -50,
            ease: 'none',
            duration: 20,
            repeat: -1
        })
    }
})
</script>