<template>
    <Header />
    <main class="max-w-screen-xl mx-auto">
        <HeroSection />
        <FeaturedProjects />
        <AboutSection />
    </main>
    <Footer />
</template>



<script setup lang="ts">
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturedProjects from '../components/FeaturedProjects.vue'
import AboutSection from '../components/AboutSection.vue'
import Footer from '../components/Footer.vue'
</script>