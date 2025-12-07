<template>
    <Header />
    <main class="bg-[#F5F5F5] min-h-screen pt-32 pb-20 overflow-hidden">
        <div class="max-w-[1800px] mx-auto px-8 md:px-16">
            <!-- Page Header -->
            <div class="mb-40">
                <TextReveal text="Selected Works" tag="h1" class-name="text-[#111111] text-[12vw] leading-none tracking-tighter font-light mb-8" />
                <div class="flex flex-col md:flex-row justify-between items-start gap-8">
                    <TextReveal text="A curated selection of projects designed to" tag="p" class-name="text-[#111111]/60 text-xl md:text-2xl max-w-xl" :delay="0.2" />
                    <TextReveal text="push digital boundaries." tag="p" class-name="text-[#111111]/60 text-xl md:text-2xl max-w-xl" :delay="0.3" />
                </div>
            </div>

            <!-- Asymmetrical Projects List -->
            <div class="flex flex-col gap-32 md:gap-40" ref="listRef">
                <div v-for="(project, index) in projects" :key="project.id" ref="projectRefs"
                    class="flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
                    
                    <!-- Image Wrapper (Alternating Order) -->
                    <div class="w-full md:w-7/12 relative" :class="{ 'md:order-last': index % 2 !== 0 }">
                        <div class="parallax-wrapper relative h-[50vh] md:h-[70vh] w-full overflow-hidden bg-[#E5E5E5] rounded-sm">
                            <img :src="project.image" 
                                class="absolute top-0 left-0 w-full h-[120%] object-cover transition-transform duration-700 hover:scale-105"
                                style="will-change: transform"
                                ref="imageRefs" />
                            
                            <!-- Overlay on hover -->
                            <div class="absolute inset-0 bg-[#BFFF00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply pointer-events-none" />
                        </div>
                    </div>

                    <!-- Content Wrapper -->
                    <div class="w-full md:w-5/12 flex flex-col justify-center">
                        <div class="mb-6 flex items-center gap-4">
                            <span class="text-[#111111]/40 text-sm uppercase tracking-[0.2em]">{{ String(index + 1).padStart(2, '0') }}</span>
                            <div class="h-[1px] w-12 bg-[#111111]/20" />
                            <span class="text-[#BFFF00] text-sm uppercase tracking-[0.2em]">{{ project.category }}</span>
                        </div>
                        
                        <h2 class="text-4xl md:text-6xl font-light text-[#111111] leading-tight mb-8 group-hover:text-[#111111]/60 transition-colors duration-300">
                            {{ project.title }}
                        </h2>
                        
                        <p class="text-[#111111]/60 text-lg md:text-xl mb-10 max-w-md">
                            {{ project.desc }}
                        </p>

                        <button class="self-start text-[#111111] uppercase tracking-[0.2em] text-sm border-b border-[#111111]/20 pb-2 group-hover:border-[#BFFF00] group-hover:text-[#BFFF00] transition-colors duration-300">
                            View Case Study
                        </button>
                    </div>

                </div>
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
import TextReveal from '../components/TextReveal.vue'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        id: 1,
        title: 'Architectural Vision',
        category: 'Web Design',
        year: '2025',
        desc: 'An immersive digital experience aimed at showcasing modern architectural marvels with fluid transitions.',
        image: 'https://images.unsplash.com/photo-1681216868987-b7268753b81c?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Minimal Space',
        category: 'Brand Identity',
        year: '2025',
        desc: 'A complete rebrand focusing on negative space and minimalist typography for a high-end furniture line.',
        image: 'https://images.unsplash.com/photo-1568108499813-b04341f126b2?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'Geometric Forms',
        category: 'Interactive',
        year: '2024',
        desc: 'WebGL-powered interactive installation allowing users to manipulate 3D geometric shapes in real-time.',
        image: 'https://images.unsplash.com/photo-1653164521873-d4409facdf9f?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Contemporary Art',
        category: 'Installation',
        year: '2024',
        desc: 'Digital companion app for a major contemporary art exhibition, featuring AR guide capabilities.',
        image: 'https://images.unsplash.com/photo-1630305374919-06e00e8446cd?q=80&w=1000&auto=format&fit=crop',
    }
]

const listRef = ref<HTMLElement | null>(null)
const projectRefs = ref<HTMLElement[]>([])
const imageRefs = ref<HTMLElement[]>([])

onMounted(() => {
    // Parallax Effect for Images
    imageRefs.value.forEach((img) => {
        gsap.fromTo(img,
            { y: '-10%' },
            {
                y: '10%',
                ease: 'none',
                scrollTrigger: {
                    trigger: img.parentElement, // Trigger based on the wrapper
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        )
    })

    // Fade Up Animation for Projects
    projectRefs.value.forEach((proj) => {
        gsap.fromTo(proj,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: proj,
                    start: 'top 85%',
                    once: true
                }
            }
        )
    })
})
</script>