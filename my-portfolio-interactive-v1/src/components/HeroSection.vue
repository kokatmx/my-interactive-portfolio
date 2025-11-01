<template>
    <section class="relative min-h-screen flex items-center justify-center px-8 md:px-16 overflow-hidden bg-[#111111]">
        <!-- Background Grid -->
        <div class="absolute inset-0 opacity-[0.03]" :style="{
            backgroundImage: 'linear-gradient(#BFFF00 1px, transparent 1px), linear-gradient(90deg, #BFFF00 1px, transparent 1px)',
            backgroundSize: '100px 100px',
        }" />

        <!-- Main Content -->
        <div class="relative z-10 max-w-[1800px] w-full">
            <!-- Eyebrow Text -->
            <div ref="eyebrowRef" class="mb-8 text-[#BFFF00] uppercase tracking-[0.3em]">
                Portfolio 2025
            </div>

            <!-- Main Title -->
            <h1 ref="titleRef" class="relative mb-4">
                <div class="flex flex-wrap gap-x-6">
                    <span v-for="(word, wordIndex) in titleWords" :key="wordIndex" class="inline-block">
                        <span v-for="(letter, letterIndex) in word.split('')" :key="`${wordIndex}-${letterIndex}`"
                            ref="letterRefs" class="inline-block text-[#F5F5F5]" :style="{
                                fontSize: 'clamp(3rem, 12vw, 12rem)',
                                lineHeight: '0.9',
                                letterSpacing: '-0.02em',
                            }">
                            {{ letter }}
                        </span>
                    </span>
                </div>
            </h1>

            <!-- Subtitle with Parallax -->
            <div ref="subtitleRef" class="text-[#F5F5F5]/60 tracking-[0.1em] mt-8" :style="{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            }">
                {{ subtitle }}
            </div>

            <!-- Accent Line -->
            <div ref="accentLineRef" class="h-[3px] bg-[#BFFF00] mt-16 origin-left"
                :style="{ width: '300px', transform: `scaleX(${accentLineScale})` }" />

            <!-- Scroll Indicator -->
            <div ref="scrollIndicatorRef" class="absolute bottom-12 left-1/2 -translate-x-1/2">
                <div class="flex flex-col items-center gap-2">
                    <span class="text-[#F5F5F5]/40 uppercase tracking-[0.2em]" style="font-size: 0.75rem;">
                        Scroll
                    </span>
                    <div class="w-1px h-16 bg-[#BFFF00]/40" />
                </div>
            </div>
        </div>

        <!-- Decorative Element -->
        <div ref="decorativeElementRef"
            class="absolute top-1/4 right-[10%] w-[200px] h-[200px] border border-[#BFFF00]/20 rounded-full" :style="{
                transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px) scale(${decorativeElementScale}) rotate(${decorativeElementRotation}deg)`,
            }" />
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const title = 'Fullstack Developer'
const subtitle = 'Crafting Digital Experiences'
const titleWords = title.split(' ')

// State
const mousePosition = ref({ x: 0, y: 0 })
const accentLineScale = ref(0)
const decorativeElementScale = ref(0)
const decorativeElementRotation = ref(-180)

// Refs untuk elemen DOM
const eyebrowRef = ref(null)
const titleRef = ref(null)
const letterRefs = ref([])
const subtitleRef = ref(null)
const accentLineRef = ref(null)
const scrollIndicatorRef = ref(null)
const decorativeElementRef = ref(null)

// Mouse move handler
const handleMouseMove = (e) => {
    mousePosition.value = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
    }
}

onMounted(() => {
    // Tambahkan event listener mouse
    window.addEventListener('mousemove', handleMouseMove)

    // Animasi elemen-elemen setelah mount
    // 1. Eyebrow Text
    gsap.fromTo(eyebrowRef.value,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: "power4.out" }
    )

    // 2. Letter-by-letter animation for title
    if (letterRefs.value && letterRefs.value.length > 0) {
        gsap.fromTo(letterRefs.value,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.08, // Ini berfungsi seperti staggerChildren
                delay: 0.38,   // Delay sesuai delayChildren
                ease: "back.out(1.7)", // GSAP spring-like effect
                // Damping dan stiffness lebih mudah diatur dengan GSAP timeline jika kompleks
            }
        )
    }

    // 3. Subtitle
    gsap.fromTo(subtitleRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.2 }
    )

    // 4. Accent Line (menggunakan reaktivitas untuk scaleX)
    gsap.to(accentLineScale, {
        value: 1,
        duration: 1.2,
        delay: 0.8,
        ease: "power4.out"
    })

    // 5. Scroll Indicator
    gsap.fromTo(scrollIndicatorRef.value,
        { opacity: 0, y: -20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.5,
            repeat: -1, // Infinity
            yoyo: true, // repeatType: 'reverse'
            repeatDelay: 0.5,
        }
    )

    // 6. Decorative Element (menggunakan reaktivitas untuk scale dan rotate)
    gsap.to(decorativeElementScale, {
        value: 1,
        duration: 1.2,
        delay: 0.5,
        ease: "power4.out"
    })
    gsap.to(decorativeElementRotation, {
        value: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power4.out"
    })

    // Hapus event listener saat unmount
    onUnmounted(() => {
        window.removeEventListener('mousemove', handleMouseMove)
    })
})
</script>