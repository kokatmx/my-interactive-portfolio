<template>
    <header ref="headerRef" class="fixed top-0 left-0 right-0 z-50 px-8 py-6 md:px-16"
        :style="{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(17, 17, 17, 0.5)' }">
        <nav class="flex justify-between items-center max-w-[1800px] mx-auto">
            <!-- Logo -->
            <div ref="logoRef" class="tracking-tight text-[#F5F5F5]">
                <span class="uppercase">Suko Dwi Atmodjo</span>
            </div>

            <!-- Navigation Links -->
            <div class="flex gap-12">
                <div v-for="(link, index) in navLinks" :key="link" ref="navItemRefs" class="relative cursor-pointer"
                    @mouseenter="handleMouseEnter(link, index)" @mouseleave="handleMouseLeave(index)">
                    <span class="text-[#F5F5F5] hover:text-[#BFFF00] transition-colors duration-300">
                        {{ link }}
                    </span>

                    <!-- Animated Underline -->
                    <div :ref="el => setUnderlineRef(el as HTMLElement, index)"
                        class="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#BFFF00]"
                        style="transform: scaleX(0); transform-origin: left;" />
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

// Daftar link navigasi
const navLinks = ['Work', 'About', 'Contact'] as const

// Link yang sedang di-hover
const hoveredLink = ref<string | null>(null)

// Refs untuk elemen DOM
const headerRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
const navItemRefs = ref<HTMLElement[]>([]) // Array untuk menampung ref tiap item nav
const underlineRefs = ref<(HTMLElement | null)[]>([]) // Array untuk underline

// Fungsi untuk menyimpan ref underline berdasarkan index
const setUnderlineRef = (el: HTMLElement | null, index: number) => {
    if (el) underlineRefs.value[index] = el
}

// Event handler saat mouse masuk ke link
const handleMouseEnter = (link: string, index: number) => {
    hoveredLink.value = link
    
    // Animasi underline dengan GSAP
    const underline = underlineRefs.value[index]
    if (underline) {
        gsap.to(underline, {
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out'
        })
    }
}

// Event handler saat mouse keluar dari link
const handleMouseLeave = (index: number) => {
    hoveredLink.value = null
    
    // Animasi underline kembali ke 0
    const underline = underlineRefs.value[index]
    if (underline) {
        gsap.to(underline, {
            scaleX: 0,
            duration: 0.3,
            ease: 'power2.in'
        })
    }
}

// Animasi saat komponen dimount
onMounted(() => {
    // Animasi header masuk dari atas
    gsap.fromTo(
        headerRef.value,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
    )

    // Animasi logo fade-in
    gsap.fromTo(
        logoRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.2 }
    )

    // Animasi nav item dengan stagger (efek bertahap)
    if (navItemRefs.value.length > 0) {
        gsap.fromTo(
            navItemRefs.value,
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1, // Delay antar item
                delay: 0.3
            }
        )
    }
})
</script>