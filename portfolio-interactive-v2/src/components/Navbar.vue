<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const email = "hello@kodev.ai";

gsap.registerPlugin(ScrollTrigger);

const isMenuOpen = ref(false);
const navbar = ref<HTMLElement | null>(null);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
    // Navbar Scroll Animation (Hide on down, Show on up)
    if (navbar.value) {
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // Determine scroll direction
                const direction = self.direction;
                // If scrolling down and not at the very top, hide navbar
                if (direction === 1 && self.scroll() > 50) {
                    gsap.to(navbar.value, { y: -100, duration: 0.3, ease: 'power2.out' });
                } else {
                    // If scrolling up or at the top, show navbar
                    gsap.to(navbar.value, { y: 0, duration: 0.3, ease: 'power2.out' });
                }
            }
        });
    }
});
</script>

<template>
    <nav ref="navbar"
        class="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-transform duration-300">
        <!-- Mobile Navigation Overlay -->
        <div class="fixed inset-0 z-40 flex flex-col items-center justify-start pt-28 bg-cream transition-transform duration-300 md:hidden"
            :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'">
            <div class="flex flex-col items-center gap-8 text-2xl font-bold text-ink">
                <router-link :to="{ name: 'Home' }" @click="toggleMenu"
                    class="font-primary hover:text-matcha-dark transition-colors">Home</router-link>
                <router-link :to="{ name: 'About' }" @click="toggleMenu"
                    class="font-primary hover:text-matcha-dark transition-colors">About</router-link>
                <router-link :to="{ name: 'Work' }" @click="toggleMenu"
                    class="font-primary hover:text-matcha-dark transition-colors">Work</router-link>
                <router-link :to="{ name: 'Contact' }" @click="toggleMenu"
                    class="font-primary hover:text-matcha-dark transition-colors">Contact</router-link>

                <a :href="`mailto:${email}`"
                    class="font-primary mt-4 flex items-center gap-2 rounded-full bg-background-dark px-6 py-3 text-base text-white transition-all hover:bg-primary hover:text-ink">
                    <span>Let's Talk</span>
                    <span class="material-symbols-outlined">arrow_forward</span>
                </a>
            </div>
        </div>

        <div
            class="glass-panel relative z-50 flex items-center justify-between gap-8 rounded-full border border-white/40 bg-white/60 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-[0_8px_32px_rgba(117,236,19,0.15)] max-w-2xl w-full">
            <!-- Logo -->
            <router-link :to="{ name: 'Home' }" class="flex items-center gap-2 group z-50" @click="isMenuOpen = false">
                <div
                    class="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-background-dark text-white transition-transform group-hover:rotate-12">
                    <span class="material-symbols-outlined text-[18px]">terminal</span>
                </div>
                <span class="font-primary font-bold tracking-tight text-ink">KODev.AI</span>
            </router-link>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-8">
                <router-link :to="{ name: 'About' }"
                    class="font-primary text-sm font-medium text-ink/70 hover:text-ink hover:underline decoration-primary decoration-2 underline-offset-4 transition-colors">About</router-link>
                <router-link :to="{ name: 'Work' }"
                    class="font-primary text-sm font-medium text-ink/70 hover:text-ink hover:underline decoration-primary decoration-2 underline-offset-4 transition-colors">Work</router-link>
                <router-link :to="{ name: 'Contact' }"
                    class="font-primary text-sm font-medium text-ink/70 hover:text-ink hover:underline decoration-primary decoration-2 underline-offset-4 transition-colors">Contact</router-link>
            </div>

            <!-- CTA Button (Desktop) -->
            <a :href="`mailto:${email}`"
                class="font-primary hidden md:flex group h-9 items-center gap-2 rounded-full bg-background-dark px-4 text-sm font-bold text-white transition-all hover:bg-primary hover:text-ink">
                <span>Let's Talk</span>
                <span
                    class="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>

            <!-- Mobile Menu Button -->
            <button @click="toggleMenu" class="group flex md:hidden flex-col gap-1.5 p-2 z-50">
                <span class="block h-0.5 w-6 bg-ink transition-transform duration-300"
                    :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
                <span class="block h-0.5 w-4 bg-ink transition-opacity duration-300 ml-auto group-hover:w-6"
                    :class="{ 'opacity-0': isMenuOpen }"></span>
                <span class="block h-0.5 w-6 bg-ink transition-transform duration-300"
                    :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
            </button>


        </div>
    </nav>
</template>