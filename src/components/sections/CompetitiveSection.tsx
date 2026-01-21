'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface CompetitiveSectionProps {
  label: string
  title: string
  subtitle: string
}

const insightsData = [
  { title: 'Estrategia de Verticalización (Caso Baker Tilly)', insight: 'Se detecta en competidores como Baker Tilly la creación de ecosistemas web satélites para competir en Tech M&A. Frente a la integración, optan por segregar tráfico, posiblemente por limitaciones de agilidad corporativa. A su vez, se observa un mimetismo en su estrategia de LinkedIn (Quotes), validando nuestra línea editorial.' },
  { title: 'Penalización Técnica (Caso Albia)', insight: 'Competidores como Albia han desplegado páginas sectoriales con intención SEO. Sin embargo, su pérdida de visibilidad sugiere una penalización por Experiencia de Usuario (Core Web Vitals). La relevancia semántica no sostiene el ranking si la estructura técnica falla.' },
  { title: 'Inercia Estructural (Big Four / Banca)', insight: 'Actores tradicionales (Big Four) muestran dificultades de adaptación. A pesar de su inmensa autoridad de marca offline y actualizaciones de contenido, su rigidez estructural limita su reacción en los resultados de búsqueda, cediendo terreno en términos transaccionales.' },
]

const strengthsData = [
  { title: 'Autoridad de dominio consolidada', description: 'La trayectoria de NORGESTION a lo largo de los años con una presencia digital de marca sistemática y cuidada le otorga una autoridad que se refleja, por ejemplo, en la capacidad de posicionar páginas de tercer nivel (ej: M&A Software) por encima de portales verticales exclusivos de la competencia.' },
  { title: 'Agilidad Full Stack', description: 'El control total del ciclo (Estrategia, Diseño, Código, Contenido) por parte del equipo NORGESTION + kingseo elimina la fricción entre proveedores y departamentos, permitiendo una aplicación ágil de la estrategia y adaptación a las necesidades.' },
  { title: 'Visión Largoplacista', description: 'Construcción de activos digitales basada en calidad técnica (Compound Effect), premiando la calidad frente a la cantidad y evitando tácticas de Quick-Win que penalizan a largo plazo. La solidez actual es fruto de la acumulación de acciones coherentes.' },
]

export function CompetitiveSection({
  label,
  title,
  subtitle,
}: CompetitiveSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const insightsRef = useRef<HTMLDivElement>(null)
  const featureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const insightsContainer = insightsRef.current
    const feature = featureRef.current

    // Header animation
    if (header) {
      const elements = header.querySelectorAll(':scope > *')
      gsap.set(elements, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
          })
        },
        once: true,
      })
    }

    // Insights animation
    if (insightsContainer) {
      const cards = insightsContainer.querySelectorAll('.insight-card')
      gsap.set(cards, { opacity: 0, y: 35 })

      ScrollTrigger.create({
        trigger: insightsContainer,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
          })
        },
        once: true,
      })
    }

    // Feature block animation
    if (feature) {
      gsap.set(feature, { opacity: 0, y: 40 })

      ScrollTrigger.create({
        trigger: feature,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(feature, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
          })

          // Animate strength items
          const items = feature.querySelectorAll('.strength-item')
          gsap.set(items, { opacity: 0, x: 20 })
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            delay: 0.3,
            ease: 'power2.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section id="competitivo" className="py-24 md:py-32 bg-[#0d1214]">
      <div className="max-w-[1176px] mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="text-[13px] font-medium uppercase tracking-[0.2em] text-emerald-500 mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[52px] font-semibold text-white leading-[1.1] tracking-tight mb-5">
            {title}
          </h2>
          <p className="text-[18px] text-white/50 max-w-[800px] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Block A: Radar de Movimientos */}
        <div ref={insightsRef} className="mb-16 md:mb-20">
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {insightsData.map((item, index) => (
              <div
                key={index}
                className="insight-card relative border border-white/10 bg-white/[0.02] p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.04] transition-colors duration-300"
              >
                <h4 className="text-[15px] font-medium text-white mb-4">
                  {item.title}
                </h4>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  {item.insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Block B: La Fortaleza de NORGESTION */}
        <div ref={featureRef} className="border border-white/10 bg-white/[0.02]">
          <div className="p-8 md:p-12">
            <h3 className="text-[22px] md:text-[26px] font-semibold text-white mb-8 md:mb-10">
              Ventaja competitiva: el modelo unificado
            </h3>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <p className="text-[16px] md:text-[17px] text-white/70 leading-relaxed">
                  Frente a la fragmentación (microsites externos) y la deuda técnica de la competencia, NORGESTION opera bajo un modelo centralizado que integra estrategia, tecnología y narrativa.
                </p>
              </div>

              <div className="space-y-6">
                {strengthsData.map((item, index) => (
                  <div key={index} className="strength-item flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[15px] font-medium text-white mb-1">
                        {item.title}
                      </div>
                      <div className="text-[14px] text-white/50 leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
