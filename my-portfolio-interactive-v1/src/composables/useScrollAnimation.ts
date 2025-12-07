import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useThrottleFn } from '@vueuse/core'

export interface ScrollAnimationOptions {
  trigger?: string | Element | Ref<Element | null>
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  once?: boolean
  onEnter?: () => void
  onLeave?: () => void
}

/**
 * Creates scroll-triggered reveal animations with proper cleanup.
 * Uses GSAP ScrollTrigger for performant scroll-based animations.
 * 
 * @example
 * const { reveal, parallax } = useScrollAnimation()
 * 
 * onMounted(() => {
 *   reveal(sectionRef.value, { y: 50, opacity: 0 })
 * })
 */
export function useScrollAnimation() {
  const triggers: ScrollTrigger[] = []
  const ctx = gsap.context(() => {})

  /**
   * Reveal animation that plays when element enters viewport
   */
  const reveal = (
    target: gsap.TweenTarget,
    fromVars: gsap.TweenVars = { y: 50, opacity: 0 },
    options: ScrollAnimationOptions = {}
  ) => {
    ctx.add(() => {
      const trigger = ScrollTrigger.create({
        trigger: (options.trigger as Element) || (target as Element),
        start: options.start || 'top 80%',
        once: options.once ?? true,
        onEnter: () => {
          gsap.fromTo(target, fromVars, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            ...options.onEnter,
          })
        },
      })
      triggers.push(trigger)
    })
  }

  /**
   * Staggered reveal for multiple elements
   */
  const revealStagger = (
    targets: gsap.TweenTarget,
    fromVars: gsap.TweenVars = { y: 50, opacity: 0 },
    stagger: number = 0.1,
    options: ScrollAnimationOptions = {}
  ) => {
    ctx.add(() => {
      const trigger = ScrollTrigger.create({
        trigger: options.trigger as Element,
        start: options.start || 'top 80%',
        once: options.once ?? true,
        onEnter: () => {
          gsap.fromTo(targets, fromVars, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger,
            ease: 'power3.out',
          })
        },
      })
      triggers.push(trigger)
    })
  }

  /**
   * Parallax effect tied to scroll position
   */
  const parallax = (
    target: gsap.TweenTarget,
    yPercent: number = -20,
    options: ScrollAnimationOptions = {}
  ) => {
    ctx.add(() => {
      gsap.to(target, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: (options.trigger as Element) || (target as Element),
          start: options.start || 'top bottom',
          end: options.end || 'bottom top',
          scrub: options.scrub ?? true,
        },
      })
    })
  }

  onUnmounted(() => {
    triggers.forEach((t) => t.kill())
    ctx.revert()
  })

  return {
    reveal,
    revealStagger,
    parallax,
  }
}

/**
 * Throttled mouse position tracking for parallax effects
 */
export function useMouseParallax(throttleMs: number = 16) {
  const x = { value: 0 }
  const y = { value: 0 }

  const updatePosition = useThrottleFn((e: MouseEvent) => {
    x.value = (e.clientX / window.innerWidth - 0.5) * 20
    y.value = (e.clientY / window.innerHeight - 0.5) * 20
  }, throttleMs)

  onMounted(() => {
    window.addEventListener('mousemove', updatePosition)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition)
  })

  return { x, y }
}
