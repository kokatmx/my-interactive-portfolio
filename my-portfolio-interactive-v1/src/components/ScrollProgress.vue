<!-- src/components/ScrollProgress.vue -->
<template>
    <div class="fixed top-0 left-0 right-0 h-1 bg-[#BFFF00] origin-left z-[100]"
        :style="{ transform: `scaleX(${progress})` }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    progress.value = scrollable > 0 ? window.scrollY / scrollable : 0
}

onMounted(() => {
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
})
</script>
