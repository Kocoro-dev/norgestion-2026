'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation configuration - Apple-style subtle animations
export const ANIMATION_CONFIG = {
  // Durations
  duration: {
    fast: 0.4,
    normal: 0.8,
    slow: 1.2,
  },
  // Easing - Apple uses custom cubic-bezier, this is close
  ease: {
    smooth: 'power2.out',
    smoothInOut: 'power2.inOut',
    bounce: 'back.out(1.2)',
  },
  // Distances
  distance: {
    small: 20,
    medium: 40,
    large: 60,
  },
}

// Hook for fade-in animation on scroll
export function useFadeIn(options?: {
  y?: number
  delay?: number
  duration?: number
  start?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    gsap.set(element, {
      opacity: 0,
      y: options?.y ?? ANIMATION_CONFIG.distance.medium,
    })

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options?.start ?? 'top 85%',
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? ANIMATION_CONFIG.duration.normal,
          delay: options?.delay ?? 0,
          ease: ANIMATION_CONFIG.ease.smooth,
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [options?.y, options?.delay, options?.duration, options?.start])

  return ref
}

// Hook for staggered children animation
export function useStaggerChildren(options?: {
  stagger?: number
  y?: number
  delay?: number
  childSelector?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const children = element.querySelectorAll(options?.childSelector ?? ':scope > *')

    gsap.set(children, {
      opacity: 0,
      y: options?.y ?? ANIMATION_CONFIG.distance.small,
    })

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: ANIMATION_CONFIG.duration.normal,
          delay: options?.delay ?? 0,
          stagger: options?.stagger ?? 0.1,
          ease: ANIMATION_CONFIG.ease.smooth,
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [options?.stagger, options?.y, options?.delay, options?.childSelector])

  return ref
}

// Hook for parallax effect
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    gsap.to(element, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [speed])

  return ref
}

// Hook for counter animation
export function useCountUp(options?: {
  duration?: number
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const endValue = parseFloat(element.textContent?.replace(/[^0-9.]/g, '') || '0')
    const suffix = element.textContent?.replace(/[0-9.]/g, '') || ''

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(element,
          { textContent: '0' },
          {
            textContent: endValue,
            duration: options?.duration ?? ANIMATION_CONFIG.duration.slow,
            delay: options?.delay ?? 0,
            ease: ANIMATION_CONFIG.ease.smoothInOut,
            snap: { textContent: 1 },
            onUpdate: function() {
              const current = Math.round(parseFloat(element.textContent || '0'))
              element.textContent = current + suffix
            },
          }
        )
      },
      once: true,
    })

    return () => trigger.kill()
  }, [options?.duration, options?.delay])

  return ref
}

// Provider component that initializes GSAP with Lenis
export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sync ScrollTrigger with Lenis
    const lenis = (window as unknown as { lenis?: { on: (event: string, callback: () => void) => void } }).lenis

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
    }

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
