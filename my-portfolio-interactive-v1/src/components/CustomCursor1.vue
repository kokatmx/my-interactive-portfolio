<!-- src/components/CustomCursor.vue -->
<template>
    <Teleport to="body">
        <div ref="cursor"
            class="fixed w-5 h-5 border-2 border-[#BFFF00] rounded-full pointer-events-none z-[99] mix-blend-difference"
            :style="{ left: x + 'px', top: y + 'px' }" />
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(-100)
const y = ref(-100)
const cursor = ref<HTMLDivElement | null>(null)

const move = (e: MouseEvent) => {
    x.value = e.clientX - 10
    y.value = e.clientY - 10
}

onMounted(() => {
    if (window.innerWidth >= 768) {
        document.body.classList.add('cursor-none')
        window.addEventListener('mousemove', move)
    }
})
onUnmounted(() => {
    document.body.classList.remove('cursor-none')
    window.removeEventListener('mousemove', move)
})
</script>

<style>
.cursor-none * {
    cursor: none !important;
}
</style>