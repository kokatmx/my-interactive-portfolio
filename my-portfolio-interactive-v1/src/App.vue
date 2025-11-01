<template>
  <div v-if="isLoading" class="fixed inset-0 bg-[#111111] flex items-center justify-center z-50">
    <div ref="loadingContentRef" class="text-center">
      <!-- Loading Animation -->
      <div ref="loadingCircleRef" class="relative">
        <div 
          ref="outerCircleRef"
          class="w-20 h-20 border-2 border-[#BFFF00] rounded-full"
        />
        <div 
          ref="innerCircleRef"
          class="absolute inset-0 w-20 h-20 border-t-2 border-[#BFFF00] rounded-full"
        />
      </div>
      <p 
        ref="loadingTextRef"
        class="text-[#F5F5F5] mt-8 uppercase tracking-[0.3em]"
        style="font-size: 0.875rem;"
      >
        Loading Experience
      </p>
    </div>
  </div>

  <div v-else class="relative bg-[#111111]">
    <!-- Scroll Progress Bar -->
    <div
      class="fixed top-0 left-0 right-0 h-1 bg-[#BFFF00] origin-left z-100"
      :style="{ scaleX: scrollProgress }"
    />

    <!-- Custom Cursor (Desktop only) -->
    <div
      v-if="isDesktop"
      ref="cursorRef"
      class="fixed w-5 h-5 border-2 border-[#BFFF00] rounded-full pointer-events-none z-99 mix-blend-difference"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    />

    <!-- Main Content -->
    <Header />
    
    <main>
      <HeroSection />
      <FeaturedProjects />
      <AboutSection />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'
import Header from './components/Header.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturedProjects from './components/FeaturedProjects.vue'
import AboutSection from './components/AboutSection.vue'
import Footer from './components/Footer.vue'

// State
const isLoading = ref(true)
const scrollProgress = ref(0)
const cursorX = ref(-100)
const cursorY = ref(-100)
const isDesktop = computed(() => window.innerWidth >= 768)

// Refs for DOM elements
const loadingContentRef = ref(null)
const loadingCircleRef = ref(null)
const outerCircleRef = ref(null)
const innerCircleRef = ref(null)
const loadingTextRef = ref(null)
const cursorRef = ref(null)

// Animation on mount
onMounted(() => {
  // Initial loading simulation
  const loadTimer = setTimeout(() => {
    isLoading.value = false
    // Cleanup loading animation refs if needed
  }, 1500)

  // Set smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth'

  // Scroll progress handler
  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = scrollHeight > 0 ? scrollPosition / scrollHeight : 0
  }
  window.addEventListener('scroll', handleScroll)

  // Cursor movement handler
  const handleMouseMove = (e) => {
    cursorX.value = e.clientX - 10
    cursorY.value = e.clientY - 10
  }
  window.addEventListener('mousemove', handleMouseMove)

  // Cleanup functions
  onUnmounted(() => {
    clearTimeout(loadTimer)
    document.documentElement.style.scrollBehavior = 'auto'
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('mousemove', handleMouseMove)
  })

  // Animate loading elements after DOM is updated
  if (!isLoading.value) {
    gsap.fromTo(loadingContentRef.value, 
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
    gsap.fromTo(loadingCircleRef.value, 
      { scale: 0 },
      { scale: 1, duration: 0.5, ease: "power2.out" }
    )
    gsap.to(outerCircleRef.value, 
      { rotation: 360, duration: 1, repeat: -1, ease: "linear", transformOrigin: "center" }
    )
    gsap.to(innerCircleRef.value, 
      { rotation: -360, duration: 1.5, repeat: -1, ease: "linear", transformOrigin: "center" }
    )
    gsap.fromTo(loadingTextRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
    )
  }
})
</script>

<style scoped>
@media (min-width: 768px) {
  * {
    cursor: none !important;
  }
}
</style>