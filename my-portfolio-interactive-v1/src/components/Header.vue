<template>
    <header ref="headerRef" class="fixed top-0 left-0 right-0 z-50 px-8 py-6 md:px-16"
        :style="{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(17, 17, 17, 0.5)' }">
        <nav class="flex justify-between items-center max-w-[1800px] mx-auto">
            <!-- Logo -->
            <router-link to="/" ref="logoRef" class="tracking-tight text-[#F5F5F5] hover:text-[#BFFF00] transition-colors duration-300">
                <span class="uppercase">Suko Dwi Atmodjo</span>
            </router-link>

            <!-- Navigation Links -->
            <div class="flex gap-12">
                <router-link 
                    v-for="(link, index) in navLinks" 
                    :key="link.name"
                    :to="link.path"
                    ref="navItemRefs"
                    class="relative cursor-pointer group"
                    @mouseenter="handleMouseEnter(index)"
                    @mouseleave="handleMouseLeave(index)"
                >
                    <span class="text-[#F5F5F5] group-hover:text-[#BFFF00] transition-colors duration-300">
                        {{ link.name }}
                    </span>

                    <!-- Animated Underline -->
                    <div 
                        :ref="el => setUnderlineRef(el as HTMLElement, index)"
                        class="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#BFFF00]"
                        style="transform: scaleX(0); transform-origin: left;" 
                    />
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

interface NavLink {
    name: string
    path: string
}

const navLinks: NavLink[] = [
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
]

// Refs
const headerRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
const navItemRefs = ref<HTMLElement[]>([])
const underlineRefs = ref<(HTMLElement | null)[]>([])

// GSAP context for cleanup
let ctx: gsap.Context

const setUnderlineRef = (el: HTMLElement | null, index: number) => {
    if (el) underlineRefs.value[index] = el
}

const handleMouseEnter = (index: number) => {
    const underline = underlineRefs.value[index]
    if (underline) {
        gsap.to(underline, {
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out'
        })
    }
}

const handleMouseLeave = (index: number) => {
    const underline = underlineRefs.value[index]
    if (underline) {
        gsap.to(underline, {
            scaleX: 0,
            duration: 0.3,
            ease: 'power2.in'
        })
    }
}

onMounted(() => {
    ctx = gsap.context(() => {
        // Header entrance animation
        gsap.fromTo(
            headerRef.value,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
        )

        // Logo fade-in
        gsap.fromTo(
            logoRef.value,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, delay: 0.2 }
        )

        // Nav items stagger
        if (navItemRefs.value.length > 0) {
            gsap.fromTo(
                navItemRefs.value,
                { opacity: 0, y: -20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    delay: 0.3
                }
            )
        }
    })
})

onUnmounted(() => {
    ctx?.revert()
})
</script>
