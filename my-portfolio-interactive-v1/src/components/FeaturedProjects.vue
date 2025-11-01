<template>
    <section ref="sectionRef" class="relative min-h-screen px-8 md:px-16 py-32 bg-[#F5F5F5]"
        @mousemove="handleMouseMove">
        <div class="max-w-[1800px] mx-auto">
            <!-- Section Title -->
            <div ref="titleRef" class="mb-24">
                <span class="text-[#111111]/40 uppercase tracking-[0.3em]" style="font-size: 0.875rem;">
                    Selected Work
                </span>
                <h2 class="text-[#111111] mt-4" :style="{
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    lineHeight: '1',
                    letterSpacing: '-0.02em',
                }">
                    Featured Projects
                </h2>
            </div>

            <!-- Projects List -->
            <div class="space-y-0">
                <div v-for="(project, index) in projects" :key="project.id" ref="projectItemRefs"
                    class="border-t border-[#111111]/10 py-12 cursor-pointer group"
                    @mouseenter="handleMouseEnter(project.id)" @mouseleave="handleMouseLeave">
                    <div class="flex justify-between items-center">
                        <!-- Left Side - Title -->
                        <div class="flex-1">
                            <h3 ref="titleTextRefs"
                                class="text-[#111111] group-hover:text-[#BFFF00] transition-colors duration-300" :style="{
                                    fontSize: 'clamp(2rem, 4vw, 4rem)',
                                    lineHeight: '1.1',
                                    letterSpacing: '-0.02em',
                                }">
                                {{ project.title }}
                            </h3>
                        </div>

                        <!-- Right Side - Metadata -->
                        <div class="flex gap-16 text-[#111111]/60">
                            <div>
                                <div class="uppercase tracking-[0.2em] mb-2" style="font-size: 0.75rem;">
                                    Category
                                </div>
                                <div>{{ project.category }}</div>
                            </div>
                            <div>
                                <div class="uppercase tracking-[0.2em] mb-2" style="font-size: 0.75rem;">
                                    Year
                                </div>
                                <div>{{ project.year }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Number -->
                    <div class="absolute left-8 text-[#111111]/20" :style="{
                        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                        fontVariantNumeric: 'tabular-nums',
                    }">
                        {{ String(index + 1).padStart(2, '0') }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Cursor Following Image -->
        <transition name="fade-scale" appear>
            <div v-if="hoveredProject !== null" class="fixed pointer-events-none z-50" :style="{
                left: mousePosition.x + 'px',
                top: mousePosition.y + 'px',
            }">
                <div class="relative overflow-hidden rounded-lg shadow-2xl" :style="{
                    width: '400px',
                    height: '500px',
                    transform: 'translate(-50%, -50%)',
                }">
                    <ImageWithFallback :src="currentProjectImage" :alt="currentProjectTitle"
                        class="w-full h-full object-cover" :fallback-src="optionalCustomFallbackUrl"
                        /> <!-- Accent Border -->
                        <div class="absolute inset-0 border-2 border-[#BFFF00] rounded-lg" />
                </div>
            </div>
        </transition>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { useElementVisibility } from '@vueuse/core' // Gunakan VueUse untuk visibility
import ImageWithFallback from './figma/ImageWithFallback.vue' // Pastikan path benar

// Data
const projects = [
    {
        id: 1,
        title: 'Architectural Vision',
        category: 'Web Design',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1681216868987-b7268753b81c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzYxODk5NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 2,
        title: 'Minimal Space',
        category: 'Brand Identity',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1568108499813-b04341f126b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBzcGFjZXxlbnwxfHx8fDE3NjE5MDIwODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 3,
        title: 'Geometric Forms',
        category: 'Interactive Experience',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1653164521873-d4409facdf9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHNoYXBlc3xlbnwxfHx8fDE3NjE5MDM5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 4,
        title: 'Contemporary Art',
        category: 'Digital Installation',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1630305374919-06e00e8446cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzYxODkyMjg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
];

// State
const hoveredProject = ref(null)
const mousePosition = ref({ x: 0, y: 0 })
const sectionInView = ref(false)

// Refs
const sectionRef = ref(null)
const titleRef = ref(null)
const projectItemRefs = ref([]) // Array untuk item proyek
const titleTextRefs = ref([]) // Array untuk teks judul proyek

// Computed untuk data gambar dan judul yang sedang di-hover
const currentProject = computed(() => {
    if (hoveredProject.value === null) return null
    return projects.find(p => p.id === hoveredProject.value)
})

const currentProjectImage = computed(() => currentProject.value?.image || '')
const currentProjectTitle = computed(() => currentProject.value?.title || '')

// Event Handlers
const handleMouseMove = (e) => {
    mousePosition.value = {
        x: e.clientX,
        y: e.clientY,
    }
}

const handleMouseEnter = (id) => {
    hoveredProject.value = id
}

const handleMouseLeave = () => {
    hoveredProject.value = null
}

// Gunakan Intersection Observer
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sectionInView.value = true
                observer.disconnect() // Hanya sekali
            }
        })
    }, { threshold: 0.2 })

    if (sectionRef.value) {
        observer.observe(sectionRef.value)
    }

    // Animasi setelah state inView berubah
    // Kita gunakan watch effect atau cukup kondisi if di dalam mounted
    // Karena sectionInView reaktif, kita bisa memicu animasi berdasarkan nilainya
    // Namun, karena animasi biasanya hanya sekali, kita simulasikan dengan setTimeout
    setTimeout(() => {
        if (sectionInView.value) {
            // Animasi judul bagian
            if (titleRef.value) {
                gsap.fromTo(titleRef.value,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
                )
            }

            // Animasi item proyek
            if (projectItemRefs.value && projectItemRefs.value.length > 0) {
                gsap.fromTo(projectItemRefs.value,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power4.out"
                    }
                )
            }

            // Animasi teks judul proyek saat hover (inisialisasi efek)
            // Efek aktual akan dipicu oleh perubahan hoveredProject
        }
    }, 100) // Delay kecil untuk memastikan observer bekerja

    // Animasi teks judul saat hover (inisialisasi GSAP)
    // Kita gunakan watch effect untuk mengikuti perubahan hoveredProject
    // Atau cukup gunakan binding style langsung seperti di React sebelumnya
    // Di sini, kita gunakan binding style langsung untuk efisiensi.
})
</script>

<style>
/* Definisikan transisi untuk gambar mengikuti kursor */
.fade-scale-enter-active,
.fade-scale-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
    opacity: 0;
    transform: translate(var(--mouse-x, 0), var(--mouse-y, 0)) scale(0.8);
}

/* Kita tidak bisa menggunakan CSS var langsung untuk posisi di sini,
   jadi transisi scale dan opacity saja yang ditangani oleh Vue Transition */
</style>