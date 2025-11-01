<template>
    <div class="cursor-container" v-if="!isMobile">
        <div class="cursor-dot" :style="{ transform: `translate(${cursorX}px, ${cursorY}px)` }"></div>
        <div class="cursor-outline" :class="{ 'is-hovering': isHovering }"
            :style="{ transform: `translate(${cursorX}px, ${cursorY}px)` }">
            <span v-if="cursorText" class="cursor-text">{{ cursorText }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCursor } from '../composables/useCursor.ts';

const { cursorX, cursorY, isHovering, cursorText } = useCursor();
const isMobile = ref(false);

onMounted(() => {
    isMobile.value = window.matchMedia('(pointer: coarse)').matches;
});
</script>

<style scoped>
.cursor-container {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}

.cursor-dot {
    width: 8px;
    height: 8px;
    background: #FF6B35;
    border-radius: 50%;
    position: fixed;
    top: -4px;
    left: -4px;
    pointer-events: none;
    transition: opacity 0.2s ease;
}

.cursor-outline {
    width: 32px;
    height: 32px;
    border: 2px solid #FF6B35;
    border-radius: 50%;
    position: fixed;
    top: -16px;
    left: -16px;
    pointer-events: none;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cursor-outline.is-hovering {
    width: 64px;
    height: 64px;
    top: -32px;
    left: -32px;
    background: rgba(255, 107, 53, 0.1);
    border-color: #FF6B35;
}

.cursor-text {
    font-size: 10px;
    font-weight: 500;
    color: #FF6B35;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
</style>