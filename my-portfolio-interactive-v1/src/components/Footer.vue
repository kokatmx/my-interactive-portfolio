<template>
    <footer ref="footerRef" class="relative px-8 md:px-16 py-16 bg-[#111111] border-t border-[#F5F5F5]/10">
        <div class="max-w-[1800px] mx-auto">
            <!-- Main Footer Content -->
            <div class="grid md:grid-cols-3 gap-12 mb-16">
                <!-- Left - Brand -->
                <div ref="brandRef">
                    <h3 class="text-[#F5F5F5] mb-4 uppercase tracking-tight">Alex Carter</h3>
                    <p class="text-[#F5F5F5]/60" style="font-size: 0.875rem;">
                        Creative Developer
                        <br />
                        Based in San Francisco
                    </p>
                </div>

                <!-- Middle - Email -->
                <div ref="emailRef" class="flex flex-col justify-center">
                    <span class="text-[#F5F5F5]/40 uppercase tracking-[0.2em] mb-3" style="font-size: 0.75rem;">
                        Get In Touch
                    </span>
                    <a href="mailto:hello@alexcarter.com"
                        class="text-[#F5F5F5] hover:text-[#BFFF00] transition-colors duration-300"
                        :style="{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }">
                        hello@alexcarter.com
                    </a>
                </div>

                <!-- Right - Social Links -->
                <div ref="socialRef" class="flex flex-col justify-center items-start md:items-end">
                    <span class="text-[#F5F5F5]/40 uppercase tracking-[0.2em] mb-4" style="font-size: 0.75rem;">
                        Follow
                    </span>
                    <div class="flex gap-6">
                        <component :is="social.component" v-for="(social, index) in socialLinks" :key="social.name"
                            ref="socialIconRefs" :href="social.url"
                            class="text-[#F5F5F5]/60 hover:text-[#BFFF00] transition-colors duration-300"
                            :aria-label="social.name" :style="{ width: '24px', height: '24px' }"
                            />
                    </div>
                </div>
            </div>

            <!-- Bottom - Copyright & Year -->
            <div ref="copyrightRef"
                class="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#F5F5F5]/10">
                <p class="text-[#F5F5F5]/40" style="font-size: 0.875rem;">
                    © 2025 Alex Carter. All rights reserved.
                </p>

                <!-- Designed Badge -->
                <div class="flex items-center gap-2">
                    <span class="text-[#F5F5F5]/40" style="font-size: 0.875rem;">
                        Designed & Developed with
                    </span>
                    <span ref="heartRef" class="text-[#BFFF00]">
                        ♥
                    </span>
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

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { Linkedin, Github, Dribbble } from 'lucide-vue-next' // Gunakan versi Vue

// Data
const socialLinks = [
    { name: 'LinkedIn', component: Linkedin, url: '#' },
    { name: 'GitHub', component: Github, url: '#' },
    { name: 'Dribbble', component: Dribbble, url: '#' },
];

// State untuk elemen yang beranimasi
const yearTextOpacity = ref(0)
const yearTextScale = ref(0.8)
const heartScale = ref(1)

// Refs untuk elemen DOM
const footerRef = ref(null)
const brandRef = ref(null)
const emailRef = ref(null)
const socialRef = ref(null)
const socialIconRefs = ref([]) // Array untuk ikon sosial
const copyrightRef = ref(null)
const heartRef = ref(null)
const yearTextRef = ref(null)

// Intersection Observer
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFooter()
                observer.disconnect() // Hanya sekali
            }
        })
    }, { threshold: 0.5 })

    if (footerRef.value) {
        observer.observe(footerRef.value)
    }
})

const animateFooter = () => {
    // Animasi Brand
    if (brandRef.value) {
        gsap.fromTo(brandRef.value,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
        )
    }

    // Animasi Email
    if (emailRef.value) {
        gsap.fromTo(emailRef.value,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power4.out" }
        )
    }

    // Animasi Social
    if (socialRef.value) {
        gsap.fromTo(socialRef.value,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power4.out" }
        )
    }

    // Animasi Ikon Sosial (dengan stagger)
    if (socialIconRefs.value && socialIconRefs.value.length > 0) {
        gsap.fromTo(socialIconRefs.value,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.3,
                // Animasi hover/tap bisa ditambahkan dengan event listener jika diperlukan
                // Secara sederhana, efek CSS transition bisa tetap digunakan untuk hover/tap
            }
        )
    }

    // Animasi Copyright
    if (copyrightRef.value) {
        gsap.fromTo(copyrightRef.value,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, delay: 0.4, ease: "power4.out" }
        )
    }

    // Animasi Teks Tahun (reaktif)
    gsap.to(yearTextOpacity, {
        value: 0.03,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out"
    })
    gsap.to(yearTextScale, {
        value: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out"
    })

    // Animasi Heart
    if (heartRef.value) {
        gsap.to(heartScale, {
            value: [1, 1.2, 1],
            duration: 1.5,
            repeat: -1, // Infinity
            yoyo: true, // repeatType: 'reverse'
            ease: "power1.inOut"
        })
        // Terapkan skala ke elemen heart
        gsap.to(heartRef.value, {
            scale: heartScale,
            duration: 0, // Gunakan durasi 0 untuk menerapkan nilai langsung dari animasi scale
            onUpdate: () => {
                // Jika perlu, Anda bisa mengatur transform secara manual di sini
                // heartRef.value.style.transform = `scale(${heartScale.value})`
            }
        })
    }
}
</script>