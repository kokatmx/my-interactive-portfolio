import { ref, onMounted } from 'vue';
import { useEventListener } from '@vueuse/core';

export function useCursor() {
    const cursorX = ref(0);
    const cursorY = ref(0);
    const isHovering = ref(false);
    const cursorText = ref('');

    const updateCursorPosition = (e: MouseEvent) => {
        cursorX.value = e.clientX;
        cursorY.value = e.clientY;
    };

    onMounted(() => {
        useEventListener(window, 'mousemove', updateCursorPosition);
    });

    const setHovering = (hovering: boolean, text: string = '') => {
        isHovering.value = hovering;
        cursorText.value = text;
    };

    return {
        cursorX,
        cursorY,
        isHovering,
        cursorText,
        setHovering,
    };
}