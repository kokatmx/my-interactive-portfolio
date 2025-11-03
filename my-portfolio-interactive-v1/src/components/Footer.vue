<template>
    <footer ref="footerRef" class="relative px-8 md:px-16 py-16 bg-[#111111] border-t border-[#F5F5F5]/10">
        <div class="max-w-[1800px] mx-auto">
            <!-- Main Footer Content -->
            <div class="grid md:grid-cols-3 gap-12 mb-16">
                <!-- Left - Brand -->
                <div ref="brandRef">
                    <h3 class="text-[#F5F5F5] mb-4 uppercase tracking-tight">Suko Dwi Atmodjo</h3>
                    <p class="text-[#F5F5F5]/60" style="font-size: 0.875rem">
                        Fullstack Developer
                        <br />
                        Based in Indonesia, East Java
                    </p>
                </div>

                <!-- Middle - Email -->
                <div ref="emailRef" class="flex flex-col justify-center">
                    <span class="text-[#F5F5F5]/40 uppercase tracking-[0.2em] mb-3" style="font-size: 0.75rem">
                        Get In Touch
                    </span>
                    <a href="mailto:hello@alexcarter.com"
                        class="text-[#F5F5F5] hover:text-[#BFFF00] transition-colors duration-300"
                        :style="{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }">
                        hello@sukodwiatmodjo.com
                    </a>
                </div>

                <!-- Right - Social Links -->
                <div ref="socialRef" class="flex flex-col justify-center items-start md:items-end">
                    <span class="text-[#F5F5F5]/40 uppercase tracking-[0.2em] mb-4" style="font-size: 0.75rem">
                        Follow
                    </span>
                    <div class="flex gap-6">
                        <component :is="social.component" v-for="(social, index) in socialLinks" :key="social.name"
                            ref="socialIconRefs" :href="social.url"
                            class="text-[#F5F5F5]/60 hover:text-[#BFFF00] transition-colors duration-300"
                            :aria-label="social.name" :style="{ width: '24px', height: '24px' }" />
                    </div>
                </div>
            </div>

            <!-- Bottom - Copyright & Year -->
            <div ref="copyrightRef"
                class="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#F5F5F5]/10">
                <p class="text-[#F5F5F5]/40" style="font-size: 0.875rem">
                    © 2025 Suko Dwi A. All rights reserved.
                </p>

                <!-- Designed Badge -->
                <div class="flex items-center gap-2">
                    <span class="text-[#F5F5F5]/40" style="font-size: 0.875rem">
                        Designed & Developed with
                    </span>
                    <span ref="heartRef" class="text-[#BFFF00]"> ♥ </span>
                </div>
            </div>

            <!-- Decorative Year Text -->
            <div ref="yearTextRef" class="absolute bottom-4 right-8 text-[#F5F5F5] pointer-events-none select-none"
                :style="{
                    fontSize: 'clamp(4rem, 10vw, 12rem)',
                    lineHeight: '1',
                    letterSpacing: '-0.05em',
                    opacity: yearTextOpacity,
                    transform: `scale(${yearTextScale})`,
                }">
                2025
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { Linkedin, Github, Dribbble } from 'lucide-vue-next' // Ikon Vue 3 dari lucide

// Tipe data untuk link sosial
type SocialLink = {
    name: string
    component: any // Komponen Vue (ikon)
    url: string
}

// Data link sosial
const socialLinks: SocialLink[] = [
    { name: 'LinkedIn', component: Linkedin, url: '#' },
    { name: 'GitHub', component: Github, url: '#' },
    // { name: 'Dribbble', component: Dribbble, url: '#' },
]

// State untuk animasi
const yearTextOpacity = ref(0)
const yearTextScale = ref(0.8)

// Refs ke elemen DOM
const footerRef = ref<HTMLElement | null>(null)
const brandRef = ref<HTMLElement | null>(null)
const emailRef = ref<HTMLElement | null>(null)
const socialRef = ref<HTMLElement | null>(null)
const socialIconRefs = ref<HTMLElement[]>([]) // Array untuk ikon sosial
const copyrightRef = ref<HTMLElement | null>(null)
const heartRef = ref<HTMLElement | null>(null)
const yearTextRef = ref<HTMLElement | null>(null)

// Fungsi animasi footer
const animateFooter = () => {
    // Animasi brand (kiri)
    if (brandRef.value) {
        gsap.fromTo(
            brandRef.value,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 0.8, ease: 'power4.out',
                scrollTrigger: {
                    trigger: brandRef.value,
                    start: 'top 80%',
                    once: true,
                    // end: 'bottom 20%',
                    // toggleActions: 'play none none reverse'
                }
            }
        )
    }

    // Animasi email (tengah)
    if (emailRef.value) {
        gsap.fromTo(
            emailRef.value,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power4.out',
                scrollTrigger: {
                    trigger: brandRef.value,
                    start: 'top 80%',
                    once: true,
                    // end: 'bottom 20%',
                    // toggleActions: 'play none none reverse'
                }
            }
        )
    }

    // Animasi social (kanan)
    if (socialRef.value) {
        gsap.fromTo(
            socialRef.value,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power4.out',
                scrollTrigger: {
                    trigger: socialRef.value,
                    start: 'top 80%',
                    once: true,
                    // end: 'bottom 20%',
                    // toggleActions: 'play none none reverse'
                }
            }
        )
    }

    // Animasi ikon sosial (dengan stagger)
    if (socialIconRefs.value.length > 0) {
        gsap.fromTo(
            socialIconRefs.value,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1, // Delay antar ikon
                delay: 0.3,
            }
        )
    }

    // Animasi copyright
    if (copyrightRef.value) {
        gsap.fromTo(
            copyrightRef.value,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, delay: 0.4, ease: 'power4.out' }
        )
    }

    // Animasi teks tahun (reaktif)
    gsap.to(yearTextOpacity, {
        value: 0.03,
        duration: 1.2,
        delay: 0.3,
        ease: 'power4.out',
    })
    gsap.to(yearTextScale, {
        value: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power4.out',
    })

    // Animasi ikon hati (berdetak)
    if (heartRef.value) {
        gsap.to(heartRef.value, {
            scale: 1.2,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        })
    }
}

// Intersection Observer untuk trigger animasi
onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateFooter()
                    observer.disconnect() // Hanya sekali
                }
            })
        },
        { threshold: 0.5 } // Trigger saat 50% footer terlihat
    )

    if (footerRef.value) {
        observer.observe(footerRef.value)
    }

    // Cleanup saat unmount
    onUnmounted(() => {
        observer.disconnect()
    })
})
</script>