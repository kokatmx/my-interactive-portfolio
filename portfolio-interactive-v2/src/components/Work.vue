<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsGrid = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);

const projects = [
    {
        id: 1,
        title: "Synapse AI",
        category: "Web Application",
        tech: ["React", "Stable Diffusion", "Node.js"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY-pyxv8PMm5V8vFpvu6hKw5PIHW2cQmrszQ9qON-pIJnhqWhj7riHGBVXRO9laVutuB6wUtIFIYvtZkhmAroI0onEO5tbfXFgqdVpHmq1FA47RKJfNlKuK6XQaw99fZY0JforzoTdIgCYGxIgKPTvsmzqxq4Oi3G2z14Vb2Xf__-9k0XO4X8Myel1RGg2uNBa1cIwshKNzYomZgiJCNOKUIHWqKZt5c0XlJ4H9m34WdgNuC_GzGzF4qxHwsMrBseKdFkgNkZ6bg",
        size: "large" // spans 2 cols
    },
    {
        id: 2,
        title: "EcoMarket",
        category: "E-Commerce Platform",
        tech: ["Shopify Headless", "Next.js", "Tailwind"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd9twZg62mr6IWbwJq4H9t6Mx7uldtrdFk2GcglY5IB2PfybZo32asVaz_T65N3uCmJDiMtqtDZdww1T_Zghdon4OkwsHxp7146ibDcb3Aju3aP4XmsQNhBDBt_t7xA7uFgwfu2SRmskndWKeyXFEEiVelGVm9BMgRbqJR8n3uwNaaljcOpGi5vM3C2XZNCnXgcJo7uWa-c3daI-KZS6aeeM1jVtKpcAkQcVWrLg86l4j8VjPVFJhSKv85M2NqISemqf-P1dEYzg",
        size: "normal"
    },
    {
        id: 3,
        title: "DataViz Pro",
        category: "Analytics Dashboard",
        tech: ["D3.js", "Vue 3", "Firebase"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1xhvEnd7AudSAF-ZEzerdYAW0f6AQkhy96MS_yx_TAJVgQqz-o7Ni_ZBoiaKxx4Jj6_8yitPGGWX5H8r7fb21F-PdMeqIXNrEjla4URrJjVMre3GXiGwfA7vpbVCK3VM5RzOtaQbBgyP9hGQPkxhT5YA_q0PgLr96naIh_WiBqUSituGCpCWgkWl-X9hyd30VeGD8wxMFE51u35-4EeJ6Ha3KTaeZsvoxlSkbUWl3tzTIU-VjDw8Qc37W0yu-E10G-kCnqmFN2A",
        size: "tall" // vertical span
    },
    {
        id: 4,
        title: "Portfolio V1",
        category: "Personal Website",
        tech: ["HTML5", "SCSS", "Vanilla JS"],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDfACwubrucnWSBTNHMGFstlYcw3MKTQ0HelfH6-m3WET-mN0FumQOs5GAVhDwcmUctUPsiuiFuNl6eVI5UpkpXtDDcqcMzIwaBrHcmu-cqwNhAU9VFm5gAvc6YC4ljOBB1A-T0j0h0nXZvsDHkREucGqDxB11Hedi8DlHZS8NU6rzxgWlbAUFR-Dfh3XS1igm5T7XUe2IcTpaVTva-qB4_gf4wF9kRzES1_YBYKQ4Kcq5DyuWMBDqBPfARun0PRJeOPhfEUpQxA",
        size: "normal"
    },
    {
        id: 5,
        title: "Lumina UI",
        category: "Design System",
        tech: ["Figma", "React", "Storybook"],
        image: "https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        size: "normal"
    }
]

onMounted(() => {
    // Header Reveal
    if (headerRef.value) {
        gsap.from(headerRef.value.querySelectorAll('h1, p'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // Projects Grid Reveal
    if (projectsGrid.value) {
        gsap.from(projectsGrid.value.children, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: projectsGrid.value,
                start: "top 80%"
            }
        });
    }
});
</script>

<template>
    <!-- Header -->
    <header ref="headerRef" class="relative flex w-full flex-col justify-center pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div class="mx-auto w-full max-w-[1400px]">
            <h1 class="font-display text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-8xl">
                Featured <br />
                <span class="text-matcha">Projects.</span>
            </h1>
            <p class="mt-6 max-w-xl text-lg text-matcha-dark sm:text-xl">
                A curated selection of my work in web development and AI integration.
                Exploring the intersection of design, code, and intelligence.
            </p>
        </div>
    </header>

    <!-- Projects Grid -->
    <section class="pb-24 px-6 md:px-12 lg:px-20">
        <div class="mx-auto max-w-[1400px]">
            <!-- Masonry-like Grid using CSS Grid -->
            <div ref="projectsGrid"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">

                <div v-for="project in projects" :key="project.id"
                    class="group relative overflow-hidden rounded-[2.5rem] bg-cream cursor-pointer" :class="{
                        'md:col-span-2 aspect-16/10 md:aspect-auto': project.size === 'large',
                        'md:row-span-2 min-h-[500px]': project.size === 'tall',
                        'min-h-[350px]': project.size === 'normal'
                    }">

                    <!-- Image -->
                    <img :src="project.image" :alt="project.title"
                        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

                    <!-- Overlay -->
                    <div
                        class="absolute inset-0 bg-linear-to-t from-background-dark/90 via-background-dark/20 to-transparent opacity-80 transition-opacity duration-300">
                    </div>

                    <!-- Content -->
                    <div
                        class="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                        <div class="flex items-end justify-between">
                            <div>
                                <p class="text-primary font-bold text-sm uppercase tracking-wider mb-2">{{
                                    project.category }}</p>
                                <h3 class="text-3xl font-bold text-white mb-3 md:text-4xl">{{ project.title }}</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="t in project.tech" :key="t"
                                        class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                                        {{ t }}
                                    </span>
                                </div>
                            </div>

                            <!-- Arrow Button -->
                            <div
                                class="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-ink opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                                <span class="material-symbols-outlined">arrow_outward</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- "More Coming Soon" Card -->
                <div
                    class="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-dashed border-matcha-light bg-cream/50 min-h-[350px]">
                    <div
                        class="rounded-full bg-matcha-light/20 p-6 text-matcha-dark mb-4 group-hover:bg-primary group-hover:text-ink transition-colors duration-300">
                        <span class="material-symbols-outlined text-4xl">construction</span>
                    </div>
                    <h3 class="text-xl font-bold text-ink">More in development</h3>
                    <p class="text-matcha-dark mt-2">Cooking up new ideas...</p>
                </div>

            </div>
        </div>
    </section>
</template>