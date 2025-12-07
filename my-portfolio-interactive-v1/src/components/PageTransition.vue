<template>
    <Teleport to="body">
        <!-- Simple Overlay (Lime Color) -->
        <div ref="simpleOverlay" class="fixed inset-0 z-[9998] bg-[#BFFF00] pointer-events-none" 
             style="opacity: 0; visibility: hidden;" />

        <!-- Overlay Curtains (Left & Right) -->
        <div v-show="isTransitioning && currentType !== 'simple'" class="fixed inset-0 z-[9998] pointer-events-none">
            <!-- Left Curtain -->
            <div ref="curtainLeft" class="absolute top-0 left-0 bottom-0 w-1/2 bg-[#111111] origin-left"
                style="transform: scaleX(0);" />

            <!-- Right Curtain -->
            <div ref="curtainRight" class="absolute top-0 right-0 bottom-0 w-1/2 bg-[#111111] origin-right"
                style="transform: scaleX(0);" />

            <!-- Animated Bars -->
            <div class="absolute inset-0 flex">
                <div v-for="i in 5" :key="i" :ref="el => setBarRef(el as HTMLElement, i)" class="flex-1 bg-[#BFFF00]"
                    :style="{ transform: 'translateY(-100%)' }" />
            </div>

            <!-- Center Content -->
            <div class="absolute inset-0 flex items-center justify-center">
                <div ref="centerContent" class="text-center" style="opacity: 0;">
                    <!-- Rotating Square -->
                    <div class="relative w-24 h-24 mx-auto mb-6">
                        <div ref="rotatingSquare" class="absolute inset-0 border-4 border-[#BFFF00] rounded-sm"
                            style="transform-origin: center;" />
                    </div>

                    <!-- Page Title -->
                    <h2 ref="pageTitle" class="text-[#BFFF00] text-4xl md:text-6xl font-light tracking-tight mb-2">
                        {{ currentPageName }}
                    </h2>

                    <!-- Subtitle -->
                    <p ref="pageSubtitle" class="text-[#F5F5F5]/60 uppercase tracking-[0.3em] text-sm">
                        Loading...
                    </p>
                </div>
            </div>

            <!-- Corner Accents -->
            <div ref="cornerTL" class="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#BFFF00]"
                style="opacity: 0;" />
            <div ref="cornerTR" class="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#BFFF00]"
                style="opacity: 0;" />
            <div ref="cornerBL" class="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#BFFF00]"
                style="opacity: 0;" />
            <div ref="cornerBR" class="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#BFFF00]"
                style="opacity: 0;" />

            <!-- Circular Reveal Mask -->
            <div ref="circleMask"
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-[#111111] pointer-events-none"
                style="transform: translate(-50%, -50%) scale(0);" />
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import gsap from 'gsap'

interface TransitionOptions {
    type?: 'curtain' | 'bars' | 'circle' | 'bounce' | 'simple'
    pageName?: string
    duration?: number
}

const isTransitioning = ref(false)
const currentType = ref('curtain')
const currentPageName = ref('Home')

// Refs
const simpleOverlay = ref<HTMLElement | null>(null)
const curtainLeft = ref<HTMLElement | null>(null)
const curtainRight = ref<HTMLElement | null>(null)
const centerContent = ref<HTMLElement | null>(null)
const rotatingSquare = ref<HTMLElement | null>(null)
const pageTitle = ref<HTMLElement | null>(null)
const pageSubtitle = ref<HTMLElement | null>(null)
const circleMask = ref<HTMLElement | null>(null)

const cornerTL = ref<HTMLElement | null>(null)
const cornerTR = ref<HTMLElement | null>(null)
const cornerBL = ref<HTMLElement | null>(null)
const cornerBR = ref<HTMLElement | null>(null)

const barRefs = ref<HTMLElement[]>([])

const setBarRef = (el: HTMLElement | null, index: number) => {
    if (el) barRefs.value[index - 1] = el
}

let currentTimeline: gsap.core.Timeline | null = null

// Simple Transition (Solid Wipe)
const simpleTransition = (_pageName: string, duration: number) => {
    const tl = gsap.timeline()
    
    // Ensure visibility
    gsap.set(simpleOverlay.value, { visibility: 'visible' })

    // Enter: Fade in/Slide in
    tl.fromTo(simpleOverlay.value, 
        { scaleY: 0, transformOrigin: 'bottom' },
        { 
            scaleY: 1, 
            opacity: 1,
            duration: duration * 0.4, 
            ease: 'power4.inOut' 
        }
    )

    // Wait a bit (simulate loading)
    tl.to({}, { duration: 0.2 })

    // Exit: Slide out to top
    tl.to(simpleOverlay.value, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: duration * 0.4,
        ease: 'power4.inOut'
    })

    return tl
}

// Curtain Transition (Default Awwwards Style)
const curtainTransition = (_pageName: string, duration: number) => {
    const tl = gsap.timeline()

    tl.set([curtainLeft.value, curtainRight.value], { scaleX: 0 })

    // Enter: Curtains close
    tl.to([curtainLeft.value, curtainRight.value], {
        scaleX: 1,
        duration: duration * 0.4,
        ease: 'power4.inOut',
        stagger: 0.1
    })

    // Show content
    tl.to(centerContent.value, {
        opacity: 1,
        scale: 1,
        duration: duration * 0.3,
        ease: 'back.out(1.7)'
    }, `-=${duration * 0.1}`)

    // Rotate square
    tl.to(rotatingSquare.value, {
        rotation: 360,
        duration: duration * 0.6,
        ease: 'power2.inOut'
    }, `-=${duration * 0.3}`)

    // Show corners
    tl.to([cornerTL.value, cornerTR.value, cornerBL.value, cornerBR.value], {
        opacity: 1,
        duration: duration * 0.2,
        stagger: 0.05
    }, `-=${duration * 0.4}`)

    // Exit: Curtains open
    tl.to(centerContent.value, {
        opacity: 0,
        scale: 0.8,
        duration: duration * 0.3,
        ease: 'back.in(1.7)'
    }, `+=${duration * 0.3}`)

    tl.to([cornerTL.value, cornerTR.value, cornerBL.value, cornerBR.value], {
        opacity: 0,
        duration: duration * 0.2
    }, `-=${duration * 0.2}`)

    tl.to([curtainLeft.value, curtainRight.value], {
        scaleX: 0,
        duration: duration * 0.4,
        ease: 'power4.inOut',
        stagger: 0.1
    })

    return tl
}

// Bars Transition (Vertical Bars)
const barsTransition = (_pageName: string, duration: number) => {
    const tl = gsap.timeline()

    // Enter: Bars slide down
    tl.to(barRefs.value, {
        y: '0%',
        duration: duration * 0.5,
        ease: 'power4.inOut',
        stagger: 0.08
    })

    // Show content
    tl.to(centerContent.value, {
        opacity: 1,
        y: 0,
        duration: duration * 0.3,
        ease: 'power3.out'
    }, `-=${duration * 0.2}`)

    tl.to(rotatingSquare.value, {
        rotation: 180,
        duration: duration * 0.4,
        ease: 'power2.inOut'
    }, `-=${duration * 0.3}`)

    // Exit: Bars slide up
    tl.to(centerContent.value, {
        opacity: 0,
        y: -20,
        duration: duration * 0.3,
        ease: 'power3.in'
    }, `+=${duration * 0.2}`)

    tl.to(barRefs.value, {
        y: '100%',
        duration: duration * 0.5,
        ease: 'power4.inOut',
        stagger: 0.08
    }, `-=${duration * 0.2}`)

    return tl
}

// Circle Transition (Circular Reveal)
const circleTransition = (_pageName: string, duration: number) => {
    const tl = gsap.timeline()

    // Enter: Circle expands
    tl.to(circleMask.value, {
        scale: 30,
        duration: duration * 0.6,
        ease: 'power4.inOut'
    })

    // Show content
    tl.to(centerContent.value, {
        opacity: 1,
        scale: 1,
        duration: duration * 0.3,
        ease: 'elastic.out(1, 0.6)'
    }, `-=${duration * 0.3}`)

    tl.to(rotatingSquare.value, {
        rotation: 360,
        duration: duration * 0.5,
        ease: 'power2.inOut'
    }, `-=${duration * 0.3}`)

    // Exit: Circle shrinks
    tl.to(centerContent.value, {
        opacity: 0,
        scale: 0.5,
        duration: duration * 0.3,
        ease: 'back.in(2)'
    }, `+=${duration * 0.2}`)

    tl.to(circleMask.value, {
        scale: 0,
        duration: duration * 0.6,
        ease: 'power4.inOut'
    })

    return tl
}

// Bounce Transition (Playful Bounce Effect)
const bounceTransition = (_pageName: string, duration: number) => {
    const tl = gsap.timeline()

    tl.set([curtainLeft.value, curtainRight.value], { scaleX: 0 })

    // Enter with bounce
    tl.to([curtainLeft.value, curtainRight.value], {
        scaleX: 1,
        duration: duration * 0.5,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.1
    })

    // Content bounces in
    tl.fromTo(centerContent.value,
        { opacity: 0, scale: 0, y: -100 },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: duration * 0.4,
            ease: 'bounce.out'
        }, `-=${duration * 0.2}`)

    // Square spins multiple times
    tl.to(rotatingSquare.value, {
        rotation: 720,
        duration: duration * 0.6,
        ease: 'elastic.out(1, 0.4)'
    }, `-=${duration * 0.4}`)

    // Corners pop in
    tl.fromTo([cornerTL.value, cornerTR.value, cornerBL.value, cornerBR.value],
        { scale: 0, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: duration * 0.3,
            ease: 'back.out(3)',
            stagger: 0.05
        }, `-=${duration * 0.3}`)

    // Exit with bounce
    tl.to(centerContent.value, {
        opacity: 0,
        scale: 0,
        y: 100,
        duration: duration * 0.4,
        ease: 'back.in(2)'
    }, `+=${duration * 0.3}`)

    tl.to([cornerTL.value, cornerTR.value, cornerBL.value, cornerBR.value], {
        scale: 0,
        opacity: 0,
        duration: duration * 0.2,
        stagger: 0.03
    }, `-=${duration * 0.3}`)

    tl.to([curtainLeft.value, curtainRight.value], {
        scaleX: 0,
        duration: duration * 0.5,
        ease: 'elastic.in(1, 0.5)',
        stagger: 0.1
    }, `-=${duration * 0.1}`)

    return tl
}

// Main transition function
const playTransition = (options: TransitionOptions = {}): Promise<void> => {
    return new Promise((resolve) => {
        const {
            type = 'curtain',
            pageName = 'Page',
            duration = 1.8
        } = options

        isTransitioning.value = true
        currentType.value = type
        currentPageName.value = pageName

        // Kill previous timeline if exists
        if (currentTimeline) {
            currentTimeline.kill()
        }

        // Reset all elements
        gsap.set([centerContent.value, rotatingSquare.value], {
            opacity: 0,
            scale: 0.8,
            rotation: 0
        })
        gsap.set([cornerTL.value, cornerTR.value, cornerBL.value, cornerBR.value], {
            opacity: 0,
            scale: 1
        })
        gsap.set(barRefs.value, { y: '-100%' })
        gsap.set(circleMask.value, { scale: 0 })
        gsap.set(simpleOverlay.value, { opacity: 0, visibility: 'hidden' })

        // Choose transition type
        let timeline: gsap.core.Timeline

        switch (type) {
            case 'simple':
                timeline = simpleTransition(pageName, duration)
                break
            case 'bars':
                timeline = barsTransition(pageName, duration)
                break
            case 'circle':
                timeline = circleTransition(pageName, duration)
                break
            case 'bounce':
                timeline = bounceTransition(pageName, duration)
                break
            default:
                timeline = curtainTransition(pageName, duration)
        }

        currentTimeline = timeline

        timeline.eventCallback('onComplete', () => {
            isTransitioning.value = false
            currentTimeline = null
            resolve()
        })
    })
}

// Expose function to parent components
defineExpose({
    playTransition
})

onUnmounted(() => {
    if (currentTimeline) {
        currentTimeline.kill()
    }
    gsap.killTweensOf('*')
})
</script>

<style scoped>
/* Additional styles if needed */
</style>