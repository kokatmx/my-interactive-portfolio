import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref(false)

    function start() {
        isLoading.value = true
    }

    function stop() {
        setTimeout(() => { isLoading.value = false }, 800) // kasih transisi halus
    }

    return { isLoading, start, stop }
})