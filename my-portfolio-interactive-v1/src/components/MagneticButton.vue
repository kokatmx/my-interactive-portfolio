<template>
    <div ref="containerRef" class="inline-block"
        :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        >
        <!-- Slot untuk konten anak -->
        <slot />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

// Props
const props = defineProps({
    strength: {
        type: Number,
        default: 0.3,
    },
    // Tidak ada className di sini karena akan diterapkan ke elemen anak, bukan container
})

// State
const position = ref({ x: 0, y: 0 })
const targetPosition = ref({ x: 0, y: 0 }) // Posisi target untuk GSAP tween

// Ref
const containerRef = ref(null)

// Event Handlers
const handleMouseMove = (e) => {
    if (!containerRef.value) return;
    const rect = containerRef.value.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Setel posisi target
    targetPosition.value = {
        x: distanceX * props.strength,
        y: distanceY * props.strength,
    }
};

const handleMouseLeave = () => {
    // Reset posisi target ke (0, 0)
    targetPosition.value = { x: 0, y: 0 };
};

// GSAP Tween untuk efek spring
onMounted(() => {
    const tween = gsap.to(position.value, {
        x: targetPosition.value.x,
        y: targetPosition.value.y,
        duration: 1, // Durasi cukup panjang untuk efek spring
        ease: "elastic.out(1, 0.3)", // Alternatif: "back.out(1.7)", "power1.out" dengan damping manual
        // Untuk efek spring yang lebih akurat seperti Framer Motion,
        // kita bisa menggunakan onUpdate untuk terus memperbarui nilai
        // atau GSAP 3+ PhysicsPropsPlugin (plugin premium)
        // Sebagai gantinya, kita gunakan ease elastis atau back
        onUpdate: () => {
            // onUpdate akan dipanggil setiap kali tween diperbarui
            // Karena position.value adalah reaktif, perubahan nilainya akan memicu render ulang
        }
    });

    // Perbarui target setiap kali targetPosition berubah
    // Kita bisa gunakan watch dari Vue untuk ini
    // Tapi karena ini interaktif, lebih baik gunakan event listener
    // Secara manual, kita perbarui target tween setiap kali mouse bergerak
    // Dengan cara ini, GSAP akan menyesuaikan animasi ke arah target baru
    // Kita gunakan fungsi helper untuk meng-update target
    const updateTween = () => {
        tween.invalidate().progress(0).to({
            x: targetPosition.value.x,
            y: targetPosition.value.y,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
    };

    // Kita tidak bisa menggunakan watch efektif di sini karena targetPosition adalah objek
    // dan kita ingin merespons setiap perubahan x/y secara individual
    // Solusi: Gunakan event listener mouse dan perbarui tween secara manual
    // Kita buat fungsi yang selalu dipanggil saat handleMouseMove atau handleMouseLeave
    // Tapi untuk efisiensi, kita gunakan invalidate dan progress(0) hanya jika diperlukan
    // Sebenarnya, GSAP tween.to() akan otomatis menyesuaikan jika dipanggil ulang
    // Jadi kita cukup panggil tween.to() setiap kali target berubah

    // Untuk memastikan tween selalu mengikuti target, kita gunakan invalidate dan progress(0)
    const updateTweenOnTargetChange = () => {
        // Panggil ini setiap kali targetPosition berubah
        tween.invalidate().progress(0).to({
            x: targetPosition.value.x,
            y: targetPosition.value.y,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
    }

    // Kita gunakan event listener mouse untuk memperbarui target
    // Dan panggil updateTweenOnTargetChange
    // Tapi kita sudah mengaturnya di handleMouseMove dan handleMouseLeave
    // Jadi, kita cukup atur tween awal di sini dan biarkan invalidate dipanggil saat event terjadi

    // Kita gunakan event listener pada containerRef untuk memperbarui target
    // Tapi kita tidak bisa memanggil updateTweenOnTargetChange secara langsung dari event listener
    // Karena scope-nya berbeda
    // Sebaiknya kita integrasikan logika update ke dalam handleMouseMove dan handleMouseLeave

    // Modifikasi handleMouseMove dan handleMouseLeave untuk memperbarui tween
    // Kita gunakan closure atau bind fungsi updateTween ke dalam event handler
    // Atau kita definisikan ulang handleMouseMove dan handleMouseLeave di sini
    // dengan akses ke tween

    // Solusi terbaik: Definisikan ulang handler di dalam onMounted agar bisa mengakses tween
    const container = containerRef.value;
    if (!container) return;

    const internalHandleMouseMove = (e) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        targetPosition.value = {
            x: distanceX * props.strength,
            y: distanceY * props.strength,
        };

        // Perbarui tween ke target baru
        tween.invalidate().progress(0).to({
            x: targetPosition.value.x,
            y: targetPosition.value.y,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
    };

    const internalHandleMouseLeave = () => {
        targetPosition.value = { x: 0, y: 0 };

        // Perbarui tween ke target baru (0, 0)
        tween.invalidate().progress(0).to({
            x: targetPosition.value.x,
            y: targetPosition.value.y,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
    };

    container.addEventListener('mousemove', internalHandleMouseMove);
    container.addEventListener('mouseleave', internalHandleMouseLeave);

    // Jangan lupa hapus event listener saat unmount
    // Kita tidak menggunakan onUnmounted di setup script secara langsung
    // Tapi kita bisa mengembalikan fungsi cleanup dari onMounted
    // Atau gunakan watchEffect dengan stop
    return () => {
        container.removeEventListener('mousemove', internalHandleMouseMove);
        container.removeEventListener('mouseleave', internalHandleMouseLeave);
        tween.kill(); // Hentikan GSAP tween
    };
})
</script>