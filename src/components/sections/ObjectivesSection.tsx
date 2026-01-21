'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Crown, Compass, Network, Activity } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Objective {
  icon: React.ElementType
  number: string
  title: string
  description: string
}

interface ObjectivesSectionProps {
  label: string
  title: string
  subtitle?: string
}

const objectives: Objective[] = [
  {
    icon: Crown,
    number: '01',
    title: 'Defensa del liderazgo',
    description: 'Sostener la hegemonía actual mediante una micro-gestión de keywords y un refuerzo semántico específico para cada área de práctica, ejecutando un blindaje geográfico en plazas clave.',
  },
  {
    icon: Compass,
    number: '02',
    title: 'Expansión de fronteras',
    description: 'Escalar la estrategia de verticales sectoriales (validada como activo) y desplegar la internacionalización, aprovechando que la arquitectura web ya está preparada y nuestra capacidad de posicionamiento internacional validada.',
  },
  {
    icon: Network,
    number: '03',
    title: 'Consolidación del canal social',
    description: 'Mantener la frecuencia y tipología de contenidos en LinkedIn, profundizando en los insights de los socios como motor de confianza y autoridad de marca.',
  },
  {
    icon: Activity,
    number: '04',
    title: 'Inteligencia de flujo',
    description: 'Implementar un panel de control ad-hoc para monitorizar no solo tráfico, sino eventos de negocio (copias de teléfono, clics en email) y optimizar la tasa de conversión mediante mejoras narrativas (CRO).',
  },
]

export function ObjectivesSection({
  label,
  title,
  subtitle,
}: ObjectivesSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const cardsContainer = cardsRef.current

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

    if (cardsContainer) {
      const cards = cardsContainer.querySelectorAll('.objective-card')
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.98 })

      ScrollTrigger.create({
        trigger: cardsContainer,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section id="objetivos" className="py-24 md:py-32 bg-[#fafafa]">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#016936] mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.02em] mb-5">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[18px] md:text-[20px] text-[#86868b] max-w-[600px] leading-[1.5] font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {objectives.map((objective) => {
            const Icon = objective.icon
            return (
              <div
                key={objective.number}
                className="objective-card group relative bg-white rounded-3xl p-10 lg:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#016936]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                <div className="relative">
                  {/* Icon and Number */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#016936]/10 to-[#016936]/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-[#016936]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[48px] font-bold text-[#f5f5f7] tracking-tight select-none">
                      {objective.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-[22px] lg:text-[24px] font-semibold text-[#1d1d1f] mb-4 tracking-[-0.01em]">
                    {objective.title}
                  </h3>
                  <p className="text-[16px] lg:text-[17px] text-[#6e6e73] leading-[1.6]">
                    {objective.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
