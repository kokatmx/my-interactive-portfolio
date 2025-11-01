import type { Directive } from 'vue';

export const vMagnetic: Directive<HTMLElement, number | undefined> = {
    mounted(el, binding) {
        const strength = typeof binding.value === 'number' ? binding.value : 0.25; // 0..1
        el.style.transition = 'transform 120ms ease';

        let rect: DOMRect | null = null;

        const onEnter = () => { rect = el.getBoundingClientRect(); };
        const onMove = (e: MouseEvent) => {
            if (!rect) return;
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        };
        const onLeave = () => {
            el.style.transform = 'translate(0, 0)';
            rect = null;
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);

        (el as any)._magneticCleanup = () => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    },
    unmounted(el) {
        (el as any)._magneticCleanup?.();
    },
};
