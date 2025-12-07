<template>
    <component :is="tag" :class="className" ref="textRef" class="opacity-0 translate-y-8">
        <span class="sr-only">{{ text }}</span>
        <span aria-hidden="true" v-html="processedText"></span>
    </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'p'
    },
    className: {
        type: String,
        default: ''
    },
    delay: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 1
    },
    stagger: {
        type: Number,
        default: 0.02
    },
    threshold: {
        type: Number,
        default: 0.8 // Start animation when 80% visible
    }
})

const textRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

// Split text into words for animation
const processedText = computed(() => {
    return props.text.split(' ').map(word => {
        return `<span class="inline-block reveal-word will-change-transform">${word}&nbsp;</span>`
    }).join('')
})

onMounted(() => {
    ctx = gsap.context(() => {
        if (!textRef.value) return

        // Set initial state for container
        gsap.set(textRef.value, { 
            opacity: 1, 
            y: 0 
        })

        // Select all words
        const words = textRef.value.querySelectorAll('.reveal-word')
        
        // Initial state for words
        gsap.set(words, { 
            y: 30, 
            opacity: 0,
            rotationX: 45 // Slight 3D rotation for style
        })

        ScrollTrigger.create({
            trigger: textRef.value,
            start: 'top 85%', // Trigger slightly earlier
            // markers: true,
            once: true, // Only animate once
            onEnter: () => {
                gsap.to(words, {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: props.duration,
                    stagger: props.stagger,
                    ease: 'power3.out',
                    delay: props.delay
                })
            }
        })
    })
})

onUnmounted(() => {
    ctx?.revert()
})
</script>

<style scoped>
.reveal-word {
    transform-style: preserve-3d;
}
</style>
