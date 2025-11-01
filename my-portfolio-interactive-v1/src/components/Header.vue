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
                    @mouseenter="handleMouseEnter(link)" @mouseleave="handleMouseLeave">
                    <span class="text-[#F5F5F5] hover:text-[#BFFF00] transition-colors duration-300">
                        {{ link }}
                    </span>

                    <!-- Animated Underline -->
                    <div :ref="el => setUnderlineRef(el, index)"
                        class="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#BFFF00]"
                        :style="{ transform: `scaleX(${getUnderlineScale(link)})`, transformOrigin: 'left' }" />
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const navLinks = ['Work', 'About', 'Contact']
const hoveredLink = ref(null)

// Refs untuk elemen DOM
const headerRef = ref(null)
const logoRef = ref(null)
const navItemRefs = ref([]) // Gunakan array untuk ref pada loop
const underlineRefs = ref([])

// Fungsi untuk mengatur ref underline
const setUnderlineRef = (el, index) => {
    if (el) underlineRefs.value[index] = el
}

// Fungsi untuk menghitung skala underline
const getUnderlineScale = (link) => {
    return hoveredLink.value === link ? 1 : 0
}

// Fungsi event handler
const handleMouseEnter = (link) => {
    hoveredLink.value = link
}

const handleMouseLeave = () => {
    hoveredLink.value = null
}

onMounted(() => {
    // Animasi header saat mount
    gsap.fromTo(headerRef.value,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
    )

    // Animasi logo
    gsap.fromTo(logoRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.2 }
    )

    // Animasi item navigasi
    if (navItemRefs.value && navItemRefs.value.length > 0) {
        gsap.fromTo(navItemRefs.value,
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1, // Delay bertahap antar item
                delay: 0.3   // Delay awal sebelum animasi stagger
            }
        )
    }

    // Animasi underline saat hover state berubah
    // Kita bisa menggunakan watch effect jika perlu animasi yang lebih kompleks
    // Namun untuk animasi CSS sederhana seperti ini, binding style sudah cukup.
    // Jika ingin efek GSAP, bisa tambahkan watchEffect di bawah.
})
</script>