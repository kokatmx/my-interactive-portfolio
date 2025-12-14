<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { onMounted, onUnmounted, watch, nextTick } from 'vue';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SpeedInsights } from '@vercel/speed-insights/vue';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();

onMounted(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Watch for route changes to reset scroll
  watch(
    () => route.path,
    () => {
      // Immediate scroll to top
      lenis.scrollTo(0, { immediate: true });

      // Refresh ScrollTrigger after DOM update
      nextTick(() => {
        // Small delay to ensure new page content is fully rendered
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });
    }
  );

  onUnmounted(() => {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  });
});
</script>

<template>
  <div class="selection:bg-primary selection:text-ink overflow-x-hidden font-primary">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
  <SpeedInsights />
</template>

<style scoped></style>
