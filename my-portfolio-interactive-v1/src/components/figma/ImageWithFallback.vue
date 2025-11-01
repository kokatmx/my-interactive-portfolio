<template>
    <!-- Tampilkan gambar fallback jika gagal, atau gambar utama jika berhasil -->
    <img :src="currentSrc" :alt="alt" :class="className" :style="style" v-bind="restProps" @error="handleError"
        @load="handleLoad"
    />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// URL gambar fallback online (Anda bisa ganti dengan URL lain jika diinginkan)
const DEFAULT_FALLBACK_SRC = 'https://placehold.co/600x400?text=Image+Not+Found&font=roboto'; // Contoh placeholder dari placehold.co

interface Props {
    src?: string;
    alt?: string;
    style?: Record<string, any>;
    className?: string;
    fallbackSrc?: string; // Tambahkan prop untuk fallback src opsional
    [key: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
    alt: '',
    style: () => ({}),
    className: '',
    // fallbackSrc akan menggunakan gambar online jika tidak disediakan
});

const currentSrc = ref(props.src); // Gunakan ref untuk src yang sedang aktif
const isErrored = ref(false); // State untuk menandai error

// Tentukan sumber fallback (dari props atau dari URL online default)
const fallbackSrc = computed(() => props.fallbackSrc || DEFAULT_FALLBACK_SRC);

// Pisahkan props yang akan digunakan secara spesifik dari yang lainnya
const { src, alt, style, className, fallbackSrc: _, ...restProps } = props;

// Fungsi handler error
const handleError = () => {
    if (!isErrored.value) { // Cegah loop jika fallback juga gagal (jarang, tapi baik untuk diantisipasi)
        currentSrc.value = fallbackSrc.value;
        isErrored.value = true;
    }
};

// Fungsi handler load (opsional)
const handleLoad = () => {
    // Jika gambar berhasil dimuat, pastikan kita tidak menampilkan fallback
    // Ini berguna jika komponen digunakan ulang dengan src baru
    if (currentSrc.value !== fallbackSrc.value) {
        isErrored.value = false;
    }
};

// Jika props.src berubah, reset src aktif dan status error
watch(() => props.src, (newSrc) => {
    currentSrc.value = newSrc;
    isErrored.value = false; // Reset error saat src berubah
});
</script>