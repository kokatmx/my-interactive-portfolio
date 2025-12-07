<template>
    <Header />
    <main class="bg-[#F5F5F5] min-h-screen pt-32 pb-20 flex flex-col justify-between">
        <div class="max-w-[1800px] mx-auto px-8 md:px-16 w-full flex-1 flex flex-col justify-center">
            
            <!-- Giant Hover Title -->
            <div class="relative group cursor-pointer" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                <!-- Default State -->
                <h1 class="text-[15vw] leading-[0.8] tracking-tighter font-medium text-[#111111] transition-opacity duration-500"
                    :class="{ 'opacity-10': isHovered }">
                    LET'S<br>TALK
                </h1>

                <!-- Hover Reveal State (Absolute Centered) -->
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference"
                     :class="{ 'opacity-0': !isHovered, 'opacity-100': isHovered }">
                    <a href="mailto:hello@sukodwiatmodjo.com" 
                       class="text-[5vw] text-[#BFFF00] pointer-events-auto hover:scale-105 transition-transform duration-300">
                        hello@sukodwiatmodjo.com →
                    </a>
                </div>
            </div>

            <div class="mt-20 flex justify-between items-end border-t border-[#111111]/10 pt-8">
                <div class="flex gap-12">
                     <div>
                        <span class="block text-[#111111]/40 uppercase tracking-widest text-xs mb-2">Socials</span>
                        <div class="flex flex-col gap-1 text-lg">
                            <a href="#" class="hover:text-[#BFFF00] transition-colors">LinkedIn</a>
                            <a href="#" class="hover:text-[#BFFF00] transition-colors">Instagram</a>
                        </div>
                     </div>
                     <div>
                        <span class="block text-[#111111]/40 uppercase tracking-widest text-xs mb-2">Location</span>
                        <p class="text-lg">Malang, Indonesia</p>
                     </div>
                </div>

                <div class="hidden md:block text-right">
                    <p class="text-[10rem] leading-none text-[#111111]/5 font-bold select-none">
                        2025
                    </p>
                </div>
            </div>

        </div>
    </main>
    <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const isHovered = ref(false)
</script>