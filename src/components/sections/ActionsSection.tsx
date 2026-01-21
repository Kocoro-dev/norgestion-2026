'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ActionsSectionProps {
  label: string
  title: string
  subtitle?: string
}

const actions = [
  {
    number: '01',
    title: 'Profundización sectorial',
    description: 'Desarrollo de nuevas verticales especializadas (ej: Energía, Industria, Agrobio, Cine/Audiovisual, etc.) para captar tráfico de nicho cualificado.',
  },
  {
    number: '02',
    title: 'Despliegue geográfico',
    description: 'Creación de páginas optimizadas para búsquedas locales estratégicas, asegurando la relevancia en las principales plazas de la firma.',
  },
  {
    number: '03',
    title: 'Internacionalización selectiva',
    description: 'Traducción estratégica de contenidos clave y verticales de sector para capturar tráfico cross-border de alta intención.',
  },
  {
    number: '04',
    title: 'Ampliación semántica (SEO content)',
    description: 'Profundización semántica en las páginas de servicio actuales y expansión del blog corporativo mediante contenidos SEO basados en clústeres temáticos.',
  },
  {
    number: '05',
    title: 'Analítica de negocio (BI)',
    description: 'Desarrollo e implementación de un panel de Business Intelligence propio para la analítica digital y seguimiento del funnel de conversión.',
  },
  {
    number: '06',
    title: 'Autoridad de marca y preparación IA',
    description: 'Estrategia de linkbuilding y PR digital enfocada en conseguir enlaces en medios relevantes.',
  },
]

export function ActionsSection({
  label,
  title,
  subtitle,
}: ActionsSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const insightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const actionsContainer = actionsRef.current
    const insight = insightRef.current

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

    if (actionsContainer) {
      const items = actionsContainer.querySelectorAll('.action-card')
      gsap.set(items, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: actionsContainer,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }

    if (insight) {
      gsap.set(insight, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: insight,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(insight, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section id="actuacion" className="py-24 md:py-32 bg-[#11191C] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#016936]/5 to-transparent" />

      <div className="relative max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#2a9d5c] mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-5">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[18px] md:text-[20px] text-white/50 max-w-[600px] leading-[1.5] font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions Grid - 2x3 */}
        <div ref={actionsRef} className="grid md:grid-cols-2 gap-6 mb-12">
          {actions.map((action) => (
            <div key={action.number} className="action-card group">
              <div className="relative h-full bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500">
                {/* Number */}
                <div className="mb-6">
                  <span className="text-[42px] lg:text-[48px] font-bold text-[#2a9d5c] leading-none tracking-tight">
                    {action.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-[18px] lg:text-[20px] font-semibold text-white mb-4 tracking-[-0.01em]">
                  {action.title}
                </h3>
                <p className="text-[15px] text-white/60 leading-[1.6]">
                  {action.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2a9d5c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight Block */}
        <div ref={insightRef} className="border-l-[3px] border-[#2a9d5c] pl-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-[#2a9d5c] rounded-full" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#2a9d5c]">
              Hipótesis estratégica
            </span>
          </div>
          <h4 className="text-[22px] md:text-[26px] font-semibold text-white leading-[1.2] tracking-[-0.01em] mb-4">
            Preparación para la IA Generativa
          </h4>
          <p className="text-[16px] md:text-[17px] text-white/50 leading-[1.6] max-w-[720px]">
            Anticipamos que la autoridad de dominio en Google, sumada a la presencia en fuentes externas, será el factor determinante para ser citado como referencia por los futuros modelos de IA Generativa.
          </p>
        </div>
      </div>
    </section>
  )
}
