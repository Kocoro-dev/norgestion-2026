'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface NextStepsSectionProps {
  label: string
  title: string
}

const steps = [
  {
    period: 'Febrero 2026',
    title: 'Definición del cronograma',
    description: 'Establecimiento del plan de acción anual detallado y continuidad de las líneas de trabajo actuales.',
  },
  {
    period: 'Marzo 2026 — Marzo 2027',
    title: 'Ejecución del plan',
    description: 'Implementación de la estrategia establecida con revisiones generales de analítica cuatrimestrales.',
  },
]

export function NextStepsSection({
  label,
  title,
}: NextStepsSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const stepsContainer = stepsRef.current

    if (header) {
      const elements = header.querySelectorAll(':scope > *')
      gsap.set(elements, { opacity: 0, y: 40 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }

    if (stepsContainer) {
      const items = stepsContainer.querySelectorAll('.step-item')
      gsap.set(items, { opacity: 0, x: -30 })

      ScrollTrigger.create({
        trigger: stepsContainer,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section id="siguientes-pasos" className="py-24 md:py-32 bg-[#11191C]">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#2a9d5c] mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-white leading-[1.08] tracking-[-0.02em]">
            {title}
          </h2>
        </div>

        {/* Timeline */}
        <div ref={stepsRef} className="max-w-[800px]">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-[#2a9d5c]/20" />

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="step-item relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#11191C] border-[3px] border-[#2a9d5c]" />

                  {/* Content */}
                  <div>
                    <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#2a9d5c] block mb-2">
                      {step.period}
                    </span>
                    <h3 className="text-[20px] md:text-[24px] font-semibold text-white mb-3 tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="text-[15px] md:text-[16px] text-white/60 leading-[1.6]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
