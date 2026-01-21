'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedProps {
  children: ReactNode
  className?: string
  delay?: number
}

// Fade in from bottom - for sections and large elements
export function FadeIn({ children, className = '', delay = 0 }: AnimatedProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 40 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power2.out',
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [delay])

  return <div ref={ref} className={className}>{children}</div>
}

// Fade in from bottom with slight scale - for cards and smaller elements
export function FadeInScale({ children, className = '', delay = 0 }: AnimatedProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 30, scale: 0.98 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay,
          ease: 'power2.out',
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [delay])

  return <div ref={ref} className={className}>{children}</div>
}

// Stagger children animation - for grids and lists
export function StaggerChildren({
  children,
  className = '',
  stagger = 0.08,
  childSelector = ':scope > *'
}: AnimatedProps & { stagger?: number; childSelector?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = el.querySelectorAll(childSelector)

    gsap.set(items, { opacity: 0, y: 25 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger,
          ease: 'power2.out',
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [stagger, childSelector])

  return <div ref={ref} className={className}>{children}</div>
}

// Text reveal - for headings
export function TextReveal({ children, className = '', delay = 0 }: AnimatedProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 20 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power2.out',
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [delay])

  return <div ref={ref} className={className}>{children}</div>
}

// Counter animation for stats
export function CountUp({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 1.5
}: {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(el,
          { textContent: 0 },
          {
            textContent: value,
            duration,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              const current = Math.round(parseFloat(el.textContent || '0'))
              el.textContent = prefix + current.toLocaleString('es-ES') + suffix
            },
          }
        )
      },
      once: true,
    })

    return () => trigger.kill()
  }, [value, suffix, prefix, duration])

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}

// Progress bar animation
export function AnimatedBar({
  percentage,
  className = '',
  barClassName = '',
  delay = 0
}: {
  percentage: number
  className?: string
  barClassName?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    const bar = barRef.current
    if (!container || !bar) return

    gsap.set(bar, { width: '0%' })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(bar, {
          width: `${percentage}%`,
          duration: 1,
          delay,
          ease: 'power2.out',
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [percentage, delay])

  return (
    <div ref={ref} className={className}>
      <div ref={barRef} className={barClassName} />
    </div>
  )
}

// Subtle parallax effect
export function Parallax({
  children,
  className = '',
  speed = 0.1
}: AnimatedProps & { speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    })
  }, [speed])

  return <div ref={ref} className={className}>{children}</div>
}

// Section wrapper with standard animation
export function AnimatedSection({
  children,
  className = '',
  id,
}: AnimatedProps & { id?: string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Find header elements to animate
    const header = el.querySelector('.section-header')
    const content = el.querySelector('.section-content')

    if (header) {
      gsap.set(header, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          })
        },
        once: true,
      })
    }

    if (content) {
      gsap.set(content, { opacity: 0, y: 40 })

      ScrollTrigger.create({
        trigger: content,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.15,
            ease: 'power2.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return <section ref={ref} id={id} className={className}>{children}</section>
}
