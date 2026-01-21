'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ImpactSectionProps {
  label: string
  title: string
  subtitle: string
  disclaimer?: string
}

export function ImpactSection({
  label,
  title,
  subtitle,
  disclaimer,
}: ImpactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const insightsRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  const categories = [
    { value: 61, descriptor: 'Contactos de Negocio', subtext: 'M&A, Inversores, Consultas Servicios', isHighlighted: true },
    { value: 50, descriptor: 'Captación de Talento', subtext: 'Candidatos de empleo y prácticas', isHighlighted: false },
    { value: 18, descriptor: 'Interim Pool', subtext: 'Solicitudes de adhesión al equipo', isHighlighted: false },
  ]

  const insights = [
    { title: 'Cualificación del flujo', description: 'En 2025 se ha aumentado significativamente el volumen de consultas con intención comercial, asemejándose ya al volumen de captación de talento, lo que valida la web como herramienta de soporte a la originación.' },
    { title: 'Tracción vertical', description: 'Validación de especialización. La vertical de M&A Software ha generado contactos específicos del sector, demostrando que el contenido de nicho atrae a una contraparte cualificada.' },
    { title: 'Alcance cross-border', description: 'Originación Internacional. Se registran entradas de contacto procedentes de mercados exteriores, correlacionando con el aumento de tráfico internacional observado en la analítica web.' },
  ]

  useEffect(() => {
    const header = headerRef.current
    const categoriesContainer = categoriesRef.current
    const insightsContainer = insightsRef.current

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

    // Categories animation with counter
    if (categoriesContainer) {
      const cards = categoriesContainer.querySelectorAll('.category-card')
      gsap.set(cards, { opacity: 0, y: 40 })

      ScrollTrigger.create({
        trigger: categoriesContainer,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power2.out',
          })

          // Animate counters
          counterRefs.current.forEach((counter, index) => {
            if (counter) {
              const endValue = categories[index].value
              gsap.fromTo(counter,
                { textContent: 0 },
                {
                  textContent: endValue,
                  duration: 1.5,
                  delay: 0.3 + (index * 0.15),
                  ease: 'power2.out',
                  snap: { textContent: 1 },
                  onUpdate: function() {
                    counter.textContent = Math.round(parseFloat(counter.textContent || '0')).toString()
                  },
                }
              )
            }
          })
        },
        once: true,
      })
    }

    // Insights animation
    if (insightsContainer) {
      const items = insightsContainer.querySelectorAll('.insight-item')
      gsap.set(items, { opacity: 0, y: 25 })

      ScrollTrigger.create({
        trigger: insightsContainer,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="impacto" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1176px] mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-20 md:mb-24">
          <div className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#016936] mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[52px] font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight mb-5">
            {title}
          </h2>
          <p className="text-[18px] text-[#6e6e73] max-w-[800px] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Categories */}
        <div ref={categoriesRef} className="mb-20 md:mb-28">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {categories.map((cat, index) => (
              <div key={index} className="category-card">
                <div className={`mb-4 ${cat.isHighlighted ? 'text-[#016936]' : 'text-[#1d1d1f]'}`}>
                  <span
                    ref={el => { counterRefs.current[index] = el }}
                    className={`text-[72px] md:text-[96px] font-extralight leading-none tracking-tight tabular-nums ${
                      cat.isHighlighted ? 'font-light' : ''
                    }`}
                  >
                    0
                  </span>
                </div>
                <div className={`text-[15px] font-medium mb-1 ${
                  cat.isHighlighted ? 'text-[#016936]' : 'text-[#1d1d1f]'
                }`}>
                  {cat.descriptor}
                </div>
                <div className="text-[13px] text-[#86868b]">
                  {cat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div ref={insightsRef} className="pt-12 border-t border-[#d2d2d7]/60">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {insights.map((insight, index) => (
              <div key={index} className="insight-item">
                <h4 className="text-[15px] font-medium text-[#1d1d1f] mb-2">
                  {insight.title}
                </h4>
                <p className="text-[15px] text-[#6e6e73] leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        {disclaimer && (
          <div className="pt-10 mt-12 border-t border-[#d2d2d7]/40">
            <p className="text-[13px] text-[#94a3b8] leading-relaxed italic">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
