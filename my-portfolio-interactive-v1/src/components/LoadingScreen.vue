<template>
    <Teleport to="body">
        <transition name="fade">
            <div v-if="visible"
                class="fixed inset-0 bg-[#111111] flex flex-col items-center justify-center z-[9999] overflow-hidden">

                <!-- Animated Background Grid -->
                <div class="absolute inset-0 opacity-10">
                    <div v-for="i in 20" :key="`h-${i}`" :ref="el => setGridLineRef(el as HTMLElement, `h-${i}`)"
                        class="absolute w-full h-[1px] bg-[#BFFF00]" :style="{ top: `${i * 5}%` }" />
                    <div v-for="i in 20" :key="`v-${i}`" :ref="el => setGridLineRef(el as HTMLElement, `v-${i}`)"
                        class="absolute h-full w-[1px] bg-[#BFFF00]" :style="{ left: `${i * 5}%` }" />
                </div>

                <!-- Glowing Orb -->
                <div class="absolute w-[600px] h-[600px] rounded-full bg-[#BFFF00]/10 blur-[120px]" ref="glowOrb" />

                <!-- Main Content -->
                <div ref="content" class="text-center relative z-10">
                    <!-- Logo/Brand Name with Split Text Animation -->
                    <div ref="logoContainer" class="mb-12 overflow-hidden">
                        <h1 class="text-[#F5F5F5] text-6xl md:text-7xl font-light tracking-tight">
                            <span v-for="(char, index) in logoChars" :key="index"
                                :ref="el => setCharRef(el as HTMLElement, index)" class="inline-block"
                                :style="{ opacity: 0 }">
                                {{ char === ' ' ? '\u00A0' : char }}
                            </span>
                        </h1>
                    </div>

                    <!-- Geometric Loader -->
                    <div class="relative w-32 h-32 mx-auto mb-8">
                        <!-- Outer rotating square -->
                        <div ref="square1" class="absolute inset-0 border-2 border-[#BFFF00]/40 rounded-sm"
                            style="transform-origin: center;" />

                        <!-- Middle rotating square -->
                        <div ref="square2" class="absolute inset-4 border-2 border-[#BFFF00]/60 rounded-sm"
                            style="transform-origin: center;" />

                        <!-- Inner rotating square -->
                        <div ref="square3" class="absolute inset-8 border-2 border-[#BFFF00] rounded-sm"
                            style="transform-origin: center;" />

                        <!-- Center dot -->
                        <div ref="centerDot"
                            class="absolute top-1/2 left-1/2 w-3 h-3 bg-[#BFFF00] rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>

                    <!-- Progress Bar -->
                    <div class="w-64 h-[2px] bg-[#F5F5F5]/10 mx-auto mb-6 overflow-hidden rounded-full">
                        <div ref="progressBar" class="h-full bg-gradient-to-r from-[#BFFF00] to-[#7FFF00] rounded-full"
                            style="width: 0%;" />
                    </div>

                    <!-- Loading Text -->
                    <div class="flex items-center justify-center gap-3">
                        <p ref="loadingText" class="text-[#F5F5F5]/80 uppercase tracking-[0.3em] text-sm font-light">
                            Loading
                        </p>
                        <div class="flex gap-1">
                            <span v-for="i in 3" :key="i" :ref="el => setDotRef(el as HTMLElement, i)"
                                class="w-1.5 h-1.5 bg-[#BFFF00] rounded-full" />
                        </div>
                    </div>

                    <!-- Percentage Counter -->
                    <p ref="percentage" class="text-[#BFFF00] text-2xl font-light mt-4 tabular-nums">
                        0%
                    </p>
                </div>

                <!-- Animated Lines -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none" ref="svgLines">
                    <line ref="line1" x1="0" y1="0" x2="100%" y2="100%" stroke="#BFFF00" stroke-width="1"
                        opacity="0.2" />
                    <line ref="line2" x1="100%" y1="0" x2="0" y2="100%" stroke="#BFFF00" stroke-width="1"
                        opacity="0.2" />
                </svg>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits<{ done: [] }>()
const visible = ref(true)

// Logo text
const logoText = 'PORTFOLIO'
const logoChars = logoText.split('')

// Refs
const content = ref<HTMLElement | null>(null)
const logoContainer = ref<HTMLElement | null>(null)
const loadingText = ref<HTMLElement | null>(null)
const percentage = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)
const glowOrb = ref<HTMLElement | null>(null)
const svgLines = ref<SVGElement | null>(null)

const square1 = ref<HTMLElement | null>(null)
const square2 = ref<HTMLElement | null>(null)
const square3 = ref<HTMLElement | null>(null)
const centerDot = ref<HTMLElement | null>(null)

const charRefs = ref<HTMLElement[]>([])
const dotRefs = ref<HTMLElement[]>([])
const gridLineRefs = ref<{ [key: string]: HTMLElement }>({})

const setCharRef = (el: HTMLElement | null, index: number) => {
    if (el) charRefs.value[index] = el
}

const setDotRef = (el: HTMLElement | null, index: number) => {
    if (el) dotRefs.value[index] = el
}

const setGridLineRef = (el: HTMLElement | null, key: string) => {
    if (el) gridLineRefs.value[key] = el
}

let animations: gsap.core.Tween[] = []

onMounted(() => {
    const masterTl = gsap.timeline()

    // 1. Animate grid lines
    Object.values(gridLineRefs.value).forEach((line, index) => {
        gsap.fromTo(line,
            { scaleX: 0, scaleY: 0 },
            {
                scaleX: 1,
                scaleY: 1,
                duration: 1.5,
                delay: index * 0.01,
                ease: 'power2.out'
            }
        )
    })

    // 2. Animate glowing orb
    gsap.fromTo(glowOrb.value,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
    )
    animations.push(
        gsap.to(glowOrb.value, {
            scale: 1.2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        })
    )

    // 3. Animate logo characters with stagger
    masterTl.to(charRefs.value, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, 0.5)

    // 4. Animate geometric loader
    animations.push(
        gsap.to(square1.value, {
            rotation: 360,
            duration: 4,
            repeat: -1,
            ease: 'none'
        })
    )
    animations.push(
        gsap.to(square2.value, {
            rotation: -360,
            duration: 3,
            repeat: -1,
            ease: 'none'
        })
    )
    animations.push(
        gsap.to(square3.value, {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: 'none'
        })
    )

    // Center dot pulse
    animations.push(
        gsap.to(centerDot.value, {
            scale: 1.5,
            opacity: 0.5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        })
    )

    // 5. Animate loading dots
    dotRefs.value.forEach((dot, index) => {
        animations.push(
            gsap.to(dot, {
                y: -5,
                duration: 0.6,
                repeat: -1,
                yoyo: true,
                delay: index * 0.2,
                ease: 'sine.inOut'
            })
        )
    })

    // 6. Animate SVG lines
    animations.push(
        gsap.fromTo([svgLines.value?.children[0], svgLines.value?.children[1]],
            { drawSVG: '0%' },
            {
                drawSVG: '100%',
                duration: 2,
                repeat: -1,
                ease: 'power1.inOut',
                stagger: 0.5
            }
        )
    )

    // 7. Progress bar and percentage animation
    gsap.to({}, {
        duration: 2.5,
        onUpdate: function () {
            const progress = this.progress() * 100
            if (progressBar.value) {
                progressBar.value.style.width = `${progress}%`
            }
            if (percentage.value) {
                percentage.value.textContent = `${Math.round(progress)}%`
            }
        },
        ease: 'power2.inOut'
    })

    // 8. Exit animation
    gsap.delayedCall(3, () => {
        const exitTl = gsap.timeline({
            onComplete: () => {
                visible.value = false
                emit('done')
            }
        })

        exitTl
            .to(charRefs.value, {
                y: -50,
                opacity: 0,
                stagger: 0.03,
                duration: 0.5,
                ease: 'back.in(1.7)'
            })
            .to([square1.value, square2.value, square3.value, centerDot.value], {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: 'back.in(2)'
            }, '-=0.3')
            .to([progressBar.value, loadingText.value, percentage.value], {
                opacity: 0,
                y: 20,
                duration: 0.4
            }, '-=0.4')
            .to(content.value, {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.in'
            }, '-=0.2')
    })
})

onUnmounted(() => {
    animations.forEach(anim => anim.kill())
    gsap.killTweensOf('*')
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>