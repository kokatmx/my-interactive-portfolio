import { onUnmounted } from 'vue'
import gsap from 'gsap'

/**
 * Provides a GSAP context with automatic cleanup on component unmount.
 * Prevents memory leaks and ensures all animations are reverted.
 * 
 * @example
 * const { ctx, animate, timeline } = useGsap()
 * 
 * onMounted(() => {
 *   ctx.add(() => {
 *     animate('.element', { opacity: 1, duration: 1 })
 *   })
 * })
 */
export function useGsap() {
  const ctx = gsap.context(() => {})

  const animate = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars
  ): gsap.core.Tween => {
    let tween: gsap.core.Tween
    ctx.add(() => {
      tween = gsap.to(target, vars)
    })
    return tween!
  }

  const animateFrom = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars
  ): gsap.core.Tween => {
    let tween: gsap.core.Tween
    ctx.add(() => {
      tween = gsap.from(target, vars)
    })
    return tween!
  }

  const animateFromTo = (
    target: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars
  ): gsap.core.Tween => {
    let tween: gsap.core.Tween
    ctx.add(() => {
      tween = gsap.fromTo(target, fromVars, toVars)
    })
    return tween!
  }

  const timeline = (vars?: gsap.TimelineVars): gsap.core.Timeline => {
    let tl: gsap.core.Timeline
    ctx.add(() => {
      tl = gsap.timeline(vars)
    })
    return tl!
  }

  // Auto cleanup on unmount
  onUnmounted(() => {
    ctx.revert()
  })

  return {
    ctx,
    animate,
    animateFrom,
    animateFromTo,
    timeline,
  }
}
