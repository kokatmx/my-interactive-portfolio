<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroHeader = ref<HTMLElement | null>(null);
const storySection = ref<HTMLElement | null>(null);
const learningSection = ref<HTMLElement | null>(null);
const storyImage = ref<HTMLElement | null>(null);

onMounted(() => {
    // Hero Text Reveal
    if (heroHeader.value) {
        gsap.from(heroHeader.value.querySelectorAll('h1, p'), {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // Story Section Reveal
    if (storySection.value) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: storySection.value,
                start: "top 80%",
            }
        });

        // Image Parallax Effect
        if (storyImage.value) {
            gsap.to(storyImage.value.querySelector('img'), {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: storySection.value,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Text & Content Reveal
        tl.from(storySection.value.querySelector('.sticky'), {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        })
            .from(storySection.value.querySelectorAll('h2, .space-y-6 > p, .space-y-6 > ul > li'), {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.5");
    }

    // Learning Section Fade In
    if (learningSection.value) {
        gsap.from(learningSection.value, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: learningSection.value,
                start: "top 85%"
            }
        });
    }
});
</script>

<template>
    <!-- Hero Section -->
    <header ref="heroHeader"
        class="relative flex min-h-[60vh] w-full flex-col justify-center overflow-hidden pt-32 pb-10">
        <!-- Background decorative elements -->
        <div class="absolute top-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-matcha-light/30 blur-[100px]">
        </div>
        <div class="absolute bottom-[10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px]">
        </div>

        <div class="layout-container relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
            <h1 class="font-display text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-8xl">
                Beyond the <br />
                <span class="text-matcha">Syntax.</span>
            </h1>
            <p class="mt-8 max-w-2xl text-lg text-matcha-dark sm:text-xl">
                My journey from an IT graduate to exploring the frontiers of Web Development and Artificial
                Intelligence.
            </p>
        </div>
    </header>

    <!-- Content Section -->
    <section ref="storySection" class="py-12 md:py-20 px-6 md:px-12 lg:px-20">
        <div class="mx-auto max-w-[1400px]">
            <div class="grid gap-12 lg:grid-cols-2 lg:gap-24">
                <!-- Image/Visual Column -->
                <div class="relative order-2 lg:order-1">
                    <div ref="storyImage"
                        class="sticky top-32 overflow-hidden rounded-[2.5rem] bg-cream aspect-4/5 shadow-xl">
                        <img alt="Coding Setup"
                            class="h-full w-full object-cover transition-transform duration-[2s] hover:scale-105"
                            data-alt="A clean, modern desk setup with code on screen and AI visualizations"
                            src="https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

                        <!-- Overlay Tag -->
                        <div class="absolute bottom-6 left-6 right-6">
                            <div
                                class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
                                <span class="material-symbols-outlined text-primary">school</span>
                                <div>
                                    <p class="text-xs font-bold text-white/50 uppercase">Background</p>
                                    <p class="text-sm font-bold text-white">Fresh Graduate IT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Story Column -->
                <div class="flex flex-col justify-center order-1 lg:order-2">
                    <h2 class="font-display text-3xl font-bold text-ink mb-8 md:text-4xl">
                        The Story <span class="text-matcha">So Far</span>
                    </h2>

                    <div class="space-y-6 text-lg text-ink/80 leading-relaxed font-light">
                        <p>
                            Hello! I'm a fresh IT graduate with a burning passion for technology. My academic journey
                            gave me a solid foundation in computer science, but my true calling lies in the dynamic
                            world of <strong class="text-ink font-bold">Web Development</strong>.
                        </p>
                        <p>
                            I don't just build websites; I'm obsessively learning how to bridge the gap between
                            traditional software development and the emerging power of <strong
                                class="text-ink font-bold">Artificial Intelligence</strong>.
                        </p>
                        <p>
                            Currently, I am deep-diving into:
                        </p>
                        <ul class="space-y-4 my-6">
                            <li class="flex items-start gap-4">
                                <div
                                    class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-matcha-light/30 text-matcha-dark">
                                    <span class="material-symbols-outlined text-sm">code</span>
                                </div>
                                <div>
                                    <h4 class="font-bold text-ink">Modern Web Stack</h4>
                                    <p class="text-sm text-ink/60">Mastering Vue, React, and TypeScript to build
                                        scalable frontends.</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-ink">
                                    <span class="material-symbols-outlined text-sm">smart_toy</span>
                                </div>
                                <div>
                                    <h4 class="font-bold text-ink">AI Integration</h4>
                                    <p class="text-sm text-ink/60">Learning not just to use AI, but to integrate LLMs
                                        into applications for smarter user experiences.</p>
                                </div>
                            </li>
                        </ul>
                        <p>
                            I believe the future of development isn't just about writing code, but about orchestrating
                            intelligence. Every day is a new lesson, and I'm ready to turn these learnings into
                            impactful digital solutions.
                        </p>
                    </div>

                    <div class="mt-10">
                        <a href="mailto:your.email@example.com"
                            class="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-background-dark px-8 text-base font-bold text-white transition-all hover:bg-primary hover:text-ink">
                            <span>Connect with me</span>
                            <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Learning Path / Skills Marquee similar to Home but focused on what is being learned -->
    <section ref="learningSection" class="py-20 bg-cream">
        <div class="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 mb-10 text-center">
            <h3 class="font-display text-2xl font-bold text-ink opacity-60">My Learning Radar</h3>
        </div>
        <div class="relative w-full overflow-hidden border-y border-matcha-light/20 bg-white/30 py-8">
            <div class="flex w-max animate-scroll gap-16 items-center">
                <span class="text-2xl font-bold text-matcha-dark/60">System Integration</span>
                <span class="text-2xl font-bold text-ink">Prompt Engineering</span>
                <span class="text-2xl font-bold text-matcha-dark/60">UI/UX Principles</span>
                <span class="text-2xl font-bold text-ink">RAG Pipelines</span>
                <span class="text-2xl font-bold text-matcha-dark/60">Backend Architecture</span>
                <span class="text-2xl font-bold text-ink">Vector Databases</span>
                <!-- Duplicate -->
                <span class="text-2xl font-bold text-matcha-dark/60">System Integration</span>
                <span class="text-2xl font-bold text-ink">Prompt Engineering</span>
                <span class="text-2xl font-bold text-matcha-dark/60">UI/UX Principles</span>
                <span class="text-2xl font-bold text-ink">RAG Pipelines</span>
                <span class="text-2xl font-bold text-matcha-dark/60">Backend Architecture</span>
                <span class="text-2xl font-bold text-ink">Vector Databases</span>
            </div>
        </div>
    </section>

</template>

<style scoped>
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-scroll {
    animation: scroll 25s linear infinite;
}
</style>