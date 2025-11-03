<template>
    <section ref="sectionRef" class="relative min-h-screen px-8 md:px-16 py-32 bg-[#F5F5F5]"
        @mousemove="handleMouseMove">
        <div class="max-w-[1800px] mx-auto">
            <!-- Section Title -->
            <div ref="titleRef" class="mb-24">
                <span class="text-[#111111]/40 uppercase tracking-[0.3em] text-[0.875rem]">
                    Selected Work
                </span>
                <h2 class="text-[#111111] mt-4" style="
            font-size: clamp(2.5rem, 6vw, 6rem);
            line-height: 1;
            letter-spacing: -0.02em;
          ">
                    Featured Projects
                </h2>
            </div>

            <!-- Projects List -->
            <div class="space-y-0">
                <div v-for="(project, index) in projects" :key="project.id" ref="projectRefs"
                    class="border-t border-[#111111]/10 py-12 cursor-pointer group"
                    @mouseenter="hoveredProject = project.id" @mouseleave="hoveredProject = null">
                    <div class="flex justify-between items-center">
                        <!-- Left Side - Title -->
                        <div class="flex-1">
                            <h3 :ref="el => titleRefs[index] = el as HTMLElement"
                                class="text-[#111111] group-hover:text-[#BFFF00] transition-colors duration-300"
                                :style="{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }">
                                {{ project.title }}
                            </h3>
                        </div>

                        <!-- Right Side - Metadata (text aligned to the right) -->
                        <div class="flex gap-16 text-[#111111]/60 text-right">
                            <div>
                                <div class="uppercase tracking-[0.2em] mb-2 text-[0.75rem]">
                                    Category
                                </div>
                                <div>{{ project.category }}</div>
                            </div>
                            <div>
                                <div class="uppercase tracking-[0.2em] mb-2 text-[0.75rem]">
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
        <div v-if="hoveredProject !== null" ref="cursorImageRef" class="fixed pointer-events-none z-50" :style="{
            left: mousePosition.x + 'px',
            top: mousePosition.y + 'px',
        }">
            <div class="relative overflow-hidden rounded-lg shadow-2xl" style="
          width: 400px;
          height: 500px;
          transform: translate(-50%, -50%);
        ">
                <img :src="hoveredProjectData?.image" :alt="hoveredProjectData?.title"
                    class="w-full h-full object-cover" @error="handleImageError" />
                <!-- Accent Border -->
                <div class="absolute inset-0 border-2 border-[#BFFF00] rounded-lg" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import gsap, { clamp } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    image: string;
}

const projects: Project[] = [
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

const sectionRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const projectRefs = ref<HTMLElement[]>([]);
const titleRefs = ref<HTMLElement[]>([]);
const cursorImageRef = ref<HTMLElement | null>(null);


const hoveredProject = ref<number | null>(null);
const mousePosition = ref({ x: 0, y: 0 });

const hoveredProjectData = computed(() => {
    return projects.find(p => p.id === hoveredProject.value);
});

const handleMouseMove = (e: MouseEvent) => {
    mousePosition.value = {
        x: e.clientX,
        y: e.clientY,
    };
};

const handleImageError = (e: Event) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/400x500?text=Image+Not+Available';
};

onMounted(() => {
    // Animate title
    if (titleRef.value) {
        gsap.fromTo(
            titleRef.value,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.value,
                    start: 'top 80%',
                    // end: 'bottom 20%',
                    // toggleActions: 'play none none reverse'
                    once: true,
                }
            }
        );
    }

    // Animate projects
    projectRefs.value.forEach((el, index) => {
        if (el) {
            gsap.fromTo(
                el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: projectRefs.value,
                        start: 'top 80%',
                        // end: 'bottom 20%',
                        // toggleActions: 'play none none reverse'
                        once: true,
                    }
                }
            );
        }
    });
});

// Animate cursor image on hover
watch(hoveredProject, async (newVal, oldVal) => {
    if (newVal !== null && oldVal === null) {
        await nextTick();
        if (cursorImageRef.value) {
            gsap.fromTo(
                cursorImageRef.value,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
            );
        }
    }
});

// Animate title hover
watch(hoveredProject, (newVal) => {
    titleRefs.value.forEach((el, index) => {
        if (el && projects[index]) {
            if (projects[index].id === newVal) {
                gsap.to(el, { x: 20, duration: 0.4, ease: 'power3.out' });
            } else {
                gsap.to(el, { x: 0, duration: 0.4, ease: 'power3.out' });
            }
        }
    });
});
</script>

<style scoped>
/* Additional styles if needed */
</style>