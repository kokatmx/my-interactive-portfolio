<template>
    <div ref="containerRef" class="inline-block" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
        @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <!-- Slot untuk konten anak -->
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

// Props dengan TypeScript
const props = defineProps < {
    strength?: number // Besar efek magnet (opsional, default 0.3)
} > ()

// State posisi elemen (reaktif)
const position = ref({ x: 0, y: 0 })

// Ref ke elemen DOM
const containerRef = ref < HTMLElement | null > (null)

// GSAP tween (disimpan agar bisa di-update atau dihentikan)
let tween: gsap.core.Tween | null = null

// Event handler saat mouse bergerak
const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.value) return

    // Dapatkan posisi dan ukuran elemen
    const rect = containerRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Hitung jarak mouse dari pusat elemen
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Sesuaikan dengan kekuatan magnet (strength)
    const targetX = distanceX * (props.strength ?? 0.3)
    const targetY = distanceY * (props.strength ?? 0.3)

    // Update tween ke posisi baru
    if (tween) {
        tween.invalidate().kill() // Hentikan tween lama
    }

    tween = gsap.to(position.value, {
        x: targetX,
        y: targetY,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
    })
}

// Event handler saat mouse keluar dari elemen
const handleMouseLeave = () => {
    // Reset posisi ke (0, 0)
    if (tween) {
        tween.invalidate().kill()
    }

    tween = gsap.to(position.value, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
    })
}

// Setup saat komponen dimount
onMounted(() => {
    // Tidak perlu setup khusus di sini karena event handler sudah terpasang di template
})

// Bersihkan saat komponen di-unmount
onUnmounted(() => {
    if (tween) {
        tween.kill() // Hentikan animasi untuk hindari memory leak
    }
})
</script>