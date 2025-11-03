<template>
  <!-- Loading Screen - Shown during initial load -->
  <LoadingScreen v-if="showLoader" @done="handleLoaded" />

  <!-- Main Content -->
  <transition v-else name="fade">
    <div>
      <ScrollProgress />
      <CustomCursor v-if="isDesktop" />
      <Home />
    </div>
  </transition>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import CustomCursor from './components/CustomCursor1.vue'
import Home from './views/HomePage.vue'

const showLoader = ref(true)
const isDesktop = ref(window.innerWidth >= 768)

const handleLoaded = () => {
  setTimeout(() => (showLoader.value = false), 200)
}

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>


<!-- Styles that hide the default cursor on desktop devices -->

<style scoped>
@media (min-width: 768px) {
  * {
    cursor: none !important;
  }
}

.fade-enter-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
