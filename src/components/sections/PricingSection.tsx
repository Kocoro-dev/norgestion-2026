'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cpu } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface PricingSectionProps {
  label: string
  title: string
}

const services = [
  {
    title: 'Dirección y acompañamiento',
    concepto: 'Dirección de cuenta y estrategia.',
    detalle: 'Planificación anual, acompañamiento semanal y supervisión mensual de KPIs de negocio.',
    highlighted: false,
  },
  {
    title: 'Diseño y desarrollo web',
    concepto: 'Desarrollo y gestión en Webflow.',
    detalle: 'Diseño UI/UX de nuevas landing pages, desarrollo evolutivo del site, gestiones del día a día y optimización técnica continua.',
    highlighted: false,
  },
  {
    title: 'SEO técnico y de contenidos (On-page)',
    concepto: 'Crecimiento orgánico.',
    detalle: 'Optimización semántica continua, enlazado interno y redacción técnica de contenidos para blog y servicios.',
    highlighted: false,
  },
  {
    title: 'Estrategia LinkedIn y diseño visual',
    concepto: 'Editorial y diseño gráfico.',
    detalle: 'Diseño gráfico de piezas visuales, redacción editorial de posts, gestión integral del calendario y curación de insights de los socios.',
    highlighted: false,
  },
  {
    title: 'Autoridad y difusión (Off-page)',
    concepto: 'Reputación digital.',
    detalle: 'Estrategia de linkbuilding y búsqueda activa de oportunidades de aparición en medios externos con enlaces hacia nuestra página para reforzar la autoridad.',
    highlighted: false,
  },
  {
    title: 'Infraestructura tecnológica (IA)',
    concepto: 'Capa de inteligencia.',
    detalle: 'Acceso y computación de modelos de lenguaje de vanguardia para análisis de datos, toma de decisiones, comprensión del contexto, redacción y enfoque de contenidos.',
    highlighted: true,
  },
]

export function PricingSection({
  label,
  title,
}: PricingSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const card = cardRef.current

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

    if (card) {
      gsap.set(card, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section id="inversion" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <div className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#016936] mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-[#1d1d1f] leading-[1.08] tracking-[-0.02em]">
            {title}
          </h2>
        </div>

        {/* Term Sheet Card - Light Minimal */}
        <div ref={cardRef} className="max-w-[900px]">
          <div className="bg-[#fafafa] border border-[#e5e5e5] rounded-2xl overflow-hidden">
            {/* Card Header */}
            <div className="px-8 md:px-10 py-5 border-b border-[#e5e5e5]">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#86868b]">
                Desglose de servicios recurrentes
              </span>
            </div>

            {/* Service Rows */}
            <div className="divide-y divide-[#e5e5e5]">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`px-8 md:px-10 py-7 ${
                    service.highlighted ? 'bg-[#016936]/[0.04]' : ''
                  }`}
                >
                  {/* Title Row */}
                  <div className="flex items-center gap-3 mb-3">
                    {service.highlighted && (
                      <Cpu className="w-4 h-4 text-[#016936]" strokeWidth={1.5} />
                    )}
                    <h3 className="text-[15px] md:text-[16px] font-medium text-[#1d1d1f] tracking-[-0.01em]">
                      {service.title}
                    </h3>
                  </div>

                  {/* Concepto + Detalle */}
                  <div className="space-y-1">
                    <p className="text-[13px] text-[#6e6e73] font-medium">
                      {service.concepto}
                    </p>
                    <p className="text-[13px] md:text-[14px] text-[#86868b] leading-[1.6]">
                      {service.detalle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer: Total */}
            <div className="px-8 md:px-10 py-7 border-t-2 border-[#e5e5e5] bg-white">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#86868b] uppercase tracking-[0.15em]">
                  Inversión mensual
                </span>
                <span className="text-[24px] md:text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em]">
                  7.950 €
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#86868b] mt-2 flex-shrink-0" />
            <p className="text-[13px] text-[#86868b] leading-[1.6] italic">
              Condiciones exclusivas para NORGESTION. Estos términos no constituyen una oferta pública y no deben tomarse como precios de referencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
