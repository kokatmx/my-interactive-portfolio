<template>
  <!-- Global Intro Loader (First Load Only) -->
  <LoadingScreen v-if="showLoader" @done="handleLoaded" />

  <!-- Main App Content (after intro finishes) -->
  <transition v-else name="fade" mode="out-in">
    <div>
      <ScrollProgress />
      <CustomCursor v-if="isDesktop" />
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </transition>

  <!-- Global Page Transition Overlay -->
  <PageTransition ref="pageTransition" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import LoadingScreen from './components/LoadingScreen.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import CustomCursor from './components/CustomCursor1.vue'
import PageTransition from './components/PageTransition.vue'
import { registerPageTransition } from './router/index'

const showLoader = ref(true)
const pageTransition = ref()

// Use VueUse for reactive media query - auto-updates on resize
const isDesktop = useMediaQuery('(min-width: 768px)')

// Register page transition instance with router
onMounted(() => {
  registerPageTransition(pageTransition.value)
})

// Loader finished (after GSAP animation from LoadingScreen)
const handleLoaded = () => {
  setTimeout(() => (showLoader.value = false), 200)
}
</script>

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

