'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface PhilosophySectionProps {
  label: string
  title: string
}

// Elegant AI Visual Component
function AIVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[340px]">
      {/* Animated radial gradient background - outer */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(1, 105, 54, 0.2) 0%, rgba(1, 105, 54, 0.08) 40%, transparent 70%)',
          animation: 'breathe 3s ease-in-out infinite',
        }}
      />

      {/* Secondary glow layer with offset animation */}
      <div
        className="absolute inset-6 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(1, 105, 54, 0.25) 0%, rgba(1, 105, 54, 0.1) 50%, transparent 80%)',
          animation: 'breathe 3s ease-in-out infinite 0.5s',
        }}
      />

      {/* Inner core glow */}
      <div
        className="absolute inset-12 rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(1, 105, 54, 0.3) 0%, rgba(1, 105, 54, 0.12) 60%, transparent 100%)',
          animation: 'breathe 3s ease-in-out infinite 1s',
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Soft ambient glow behind text */}
          <div
            className="absolute inset-0 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(1, 105, 54, 0.5) 0%, transparent 60%)',
              animation: 'glow 2.5s ease-in-out infinite',
            }}
          />

          {/* AI Text */}
          <div className="relative">
            <span className="text-[72px] md:text-[88px] lg:text-[100px] font-bold tracking-[-0.04em] bg-gradient-to-b from-[#016936] to-[#014d28] bg-clip-text text-transparent select-none">
              AI
            </span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.4;
          }
        }
        @keyframes glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(2);
          }
          50% {
            opacity: 1;
            transform: scale(2.8);
          }
        }
      `}</style>
    </div>
  )
}

export function PhilosophySection({
  label,
  title,
}: PhilosophySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    const visual = visualRef.current

    if (content) {
      const elements = content.querySelectorAll('.philosophy-animate')
      gsap.set(elements, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: content,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }

    if (visual) {
      gsap.set(visual, { opacity: 0, scale: 0.9 })

      ScrollTrigger.create({
        trigger: visual,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(visual, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section id="filosofia" ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-white to-white" />

      <div className="relative max-w-[1176px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            {/* Label */}
            <div className="philosophy-animate text-[12px] font-semibold uppercase tracking-[0.25em] text-[#016936] mb-5">
              {label}
            </div>

            {/* Title */}
            <h2 className="philosophy-animate text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.02em] mb-8">
              {title}
            </h2>

            {/* Large quote/statement */}
            <p className="philosophy-animate text-[18px] md:text-[22px] lg:text-[24px] text-[#1d1d1f] leading-[1.4] tracking-[-0.01em] font-normal mb-6">
              Mantenemos una filosofía cauta de construcción sólida. Rechazamos la automatización masiva de contenidos generados por IA sin supervisión.
            </p>

            {/* Supporting text */}
            <p className="philosophy-animate text-[15px] md:text-[17px] text-[#86868b] leading-[1.6]">
              Nuestra estrategia integra los modelos de inteligencia artificial más potentes del mercado con curiosidad técnica, pero siempre bajo una dirección humana experta. Utilizamos la tecnología para potenciar el análisis, la creatividad y las capacidades del equipo, no para sustituirlas.
            </p>

            {/* Decorative element */}
            <div className="philosophy-animate mt-10 flex items-center gap-2">
              <div className="w-10 h-[2px] bg-[#016936]" />
              <div className="w-2 h-[2px] bg-[#016936]/50" />
            </div>
          </div>

          {/* AI Visual */}
          <div ref={visualRef} className="flex items-center justify-center">
            <AIVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
