<template>
    <section ref="sectionRef" class="relative px-8 md:px-16 py-32 bg-[#111111]">
        <div class="max-w-[1800px] mx-auto">
            <!-- Section Title -->
            <div ref="titleRef" class="mb-16">
                <span class="text-[#BFFF00] uppercase tracking-[0.3em]" style="font-size: 0.875rem;">
                    About
                </span>
            </div>

            <!-- Two Column Layout -->
            <div class="grid md:grid-cols-2 gap-16 md:gap-24">
                <!-- Left Column - Description -->
                <div ref="leftColRef">
                    <h2 class="text-[#F5F5F5] mb-8" :style="{
                        fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                        lineHeight: '1.2',
                        letterSpacing: '-0.02em',
                    }">
                        Blending Code & Creativity
                    </h2>
                    <p class="text-[#F5F5F5]/70 leading-relaxed mb-6"
                        :style="{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }">
                        I'm a creative developer specializing in award-winning web experiences. My work
                        focuses on the intersection of motion design, interactive storytelling, and
                        cutting-edge web technologies.
                    </p>
                    <p class="text-[#F5F5F5]/70 leading-relaxed" :style="{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }">
                        With expertise in GSAP, Three.js, and modern frameworks, I transform design visions
                        into fluid, engaging digital products that push boundaries.
                    </p>

                    <!-- Skills Tags -->
                    <div ref="skillsRef" class="flex flex-wrap gap-3 mt-12">
                        <span v-for="skill in skills" :key="skill"
                            class="px-4 py-2 border border-[#BFFF00]/30 text-[#BFFF00] rounded-full uppercase tracking-wider"
                            :style="{ fontSize: '0.75rem' }">
                            {{ skill }}
                        </span>
                    </div>
                </div>

                <!-- Right Column - CTA -->
                <div ref="rightColRef" class="flex flex-col justify-center items-start md:items-center">
                    <div class="text-center">
                        <p class="text-[#F5F5F5]/60 mb-8" :style="{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)' }">
                            Interested in working together?
                        </p>

                        <!-- Magnetic CTA Button -->
                        <MagneticButton :strength="0.4">
                            <button ref="ctaButtonRef"
                                class="group relative px-12 py-6 bg-[#BFFF00] text-[#111111] rounded-full overflow-hidden">
                                <span class="relative z-10 flex items-center gap-3 uppercase tracking-[0.2em]">
                                    View My CV
                                    <ArrowUpRight
                                        class="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                                </span>

                                <!-- Hover Effect Background -->
                                <div ref="hoverEffectRef" class="absolute inset-0 bg-[#F5F5F5]" :style="{
                                    transform: `scale(${hoverEffectScale})`,
                                    borderRadius: `${hoverEffectBorderRadius}`,
                                    transformOrigin: 'center',
                                }" />
                            </button>
                        </MagneticButton>

                        <!-- Secondary Link -->
                        <div ref="secondaryLinkRef" class="mt-8">
                            <a href="#contact"
                                class="text-[#F5F5F5]/60 hover:text-[#BFFF00] transition-colors duration-300 uppercase tracking-[0.2em] inline-flex items-center gap-2 group"
                                :style="{ fontSize: '0.875rem' }">
                                Or Send a Message
                                <span class="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Decorative Line -->
            <div ref="lineRef" class="h-1px bg-[#BFFF00]/20 mt-32 origin-left"
                :style="{ transform: `scaleX(${lineScale})`, transformOrigin: 'left' }" />
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import MagneticButton from './MagneticButton.vue' // Pastikan path benar
import { ArrowUpRight } from 'lucide-vue-next' // Gunakan versi Vue dari lucide

// Data
const skills = ['GSAP', 'React', 'WebGL', 'Motion Design', 'TypeScript']

// State untuk efek hover
const hoverEffectScale = ref(0)
const hoverEffectBorderRadius = ref('100%')
const lineScale = ref(0)

// Refs untuk elemen DOM
const sectionRef = ref(null)
const titleRef = ref(null)
const leftColRef = ref(null)
const rightColRef = ref(null)
const skillsRef = ref(null)
const ctaButtonRef = ref(null)
const hoverEffectRef = ref(null)
const secondaryLinkRef = ref(null)
const lineRef = ref(null)

// Intersection Observer
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animations
                animateSection()
                observer.disconnect() // Hanya sekali
            }
        })
    }, { threshold: 0.3 })

    if (sectionRef.value) {
        observer.observe(sectionRef.value)
    }

    // Setup hover effect on CTA button
    if (ctaButtonRef.value) {
        ctaButtonRef.value.addEventListener('mouseenter', () => {
            gsap.to(hoverEffectScale, { value: 2, duration: 0.5, ease: "power4.out" })
            gsap.to(hoverEffectBorderRadius, { value: '0%', duration: 0.5, ease: "power4.out" })
        })

        ctaButtonRef.value.addEventListener('mouseleave', () => {
            gsap.to(hoverEffectScale, { value: 0, duration: 0.5, ease: "power4.out" })
            gsap.to(hoverEffectBorderRadius, { value: '100%', duration: 0.5, ease: "power4.out" })
        })
    }

    // Cleanup jika perlu
    // onUnmounted(() => { observer.disconnect(); }) // Jika diperlukan
})

const animateSection = () => {
    // Animasi judul bagian
    if (titleRef.value) {
        gsap.fromTo(titleRef.value,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
        )
    }

    // Animasi kolom kiri
    if (leftColRef.value) {
        gsap.fromTo(leftColRef.value,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power4.out" }
        )
    }

    // Animasi kolom kanan
    if (rightColRef.value) {
        gsap.fromTo(rightColRef.value,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power4.out" }
        )
    }

    // Animasi skill tags
    if (skillsRef.value) {
        gsap.fromTo(skillsRef.value,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power4.out" }
        )
    }

    // Animasi link sekunder
    if (secondaryLinkRef.value) {
        gsap.fromTo(secondaryLinkRef.value,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, delay: 0.6 }
        )
    }

    // Animasi garis dekoratif (menggunakan reaktivitas)
    gsap.to(lineScale, {
        value: 1,
        duration: 1.2,
        delay: 0.5,
        ease: "power4.out"
    })
}
</script>