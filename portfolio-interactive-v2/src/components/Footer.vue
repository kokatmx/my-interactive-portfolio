<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const email = "hello@kodev.ai";

gsap.registerPlugin(ScrollTrigger);

const footerSection = ref<HTMLElement | null>(null);

onMounted(() => {
    if (footerSection.value) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerSection.value,
                start: "top 90%", // Start animation when top of footer hits 90% of viewport using standard 90%
                toggleActions: "play none none reverse"
            }
        });

        tl.from(footerSection.value.querySelectorAll('h2, p.tracking-widest'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        })
            .from(footerSection.value.querySelector('.cta-button'), { // CTA Button
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5")
            .from(footerSection.value.querySelectorAll('.grid > div'), {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.5");
    }
});
</script>

<template>
    <!-- Footer / Contact -->
    <footer ref="footerSection"
        class="relative overflow-hidden pt-20 pb-10 px-6 md:px-12 lg:px-20 bg-background-dark text-cream" id="contact">
        <!-- Abstract shape -->
        <div class="absolute top-[-50%] right-[-10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]"></div>
        <div class="mx-auto max-w-[1400px] relative z-10">
            <div class="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between mb-20">
                <div class="max-w-3xl">
                    <p class="mb-4 text-primary font-bold uppercase tracking-widest">What's Next?</p>
                    <h2 class="font-display text-5xl font-bold leading-[0.9] md:text-7xl lg:text-[7rem]">
                        Let's build something <br />
                        <span class="text-primary">extraordinary.</span>
                    </h2>
                </div>
                <div>
                    <a class="cta-button group flex h-24 w-24 items-center justify-center rounded-full bg-primary transition-transform hover:scale-110"
                        :href="`mailto:${email}`">
                        <span
                            class="material-symbols-outlined text-4xl text-ink transition-transform group-hover:-rotate-45">arrow_outward</span>
                    </a>
                </div>
            </div>
            <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-10">
                <div class="flex flex-col gap-4">
                    <h4 class="text-sm font-bold uppercase text-white/40">Contact</h4>
                    <a class="text-lg hover:text-primary transition-colors" :href="`mailto:${email}`">{{ email }}</a>
                    <p class="text-lg text-white/60">Based in Indonesia</p>
                </div>
                <div class="flex flex-col gap-4">
                    <h4 class="text-sm font-bold uppercase text-white/40">Socials</h4>
                    <div class="flex flex-col gap-2">
                        <a class="text-lg hover:text-primary transition-colors" href="#">LinkedIn</a>
                        <a class="text-lg hover:text-primary transition-colors" href="#">GitHub</a>
                        <!-- <a class="text-lg hover:text-primary transition-colors" href="#">Twitter / X</a> -->
                    </div>
                </div>
                <div class="flex flex-col gap-4">
                    <h4 class="text-sm font-bold uppercase text-white/40">Menu</h4>
                    <div class="flex flex-col gap-2">
                        <router-link :to="{ name: 'Work' }"
                            class="text-lg hover:text-primary transition-colors">Work</router-link>
                        <router-link :to="{ name: 'About' }"
                            class="text-lg hover:text-primary transition-colors">About</router-link>
                        <router-link :to="{ name: 'Contact' }"
                            class="text-lg hover:text-primary transition-colors">Contact</router-link>
                    </div>
                </div>
                <div class=" flex flex-col justify-between gap-4">
                    <p class="text-sm text-white/40">
                        Designed with <span class="text-primary scale-150">❤️</span> and
                        AI<br />
                        Built with Passion.
                    </p>
                    <p class="text-sm text-white/40">© 2025 KODev.AI</p>
                </div>
            </div>
            <!-- <div class="mt-20">
                <h1 class="font-display text-[12vw] font-bold leading-none text-white/5 select-none text-center">
                    CREATIVE DEV</h1>
            </div> -->
        </div>
    </footer>
</template>