'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface LinkedInSectionProps {
  label: string
  title: string
  subtitle: string
  disclaimer?: string
}

const kpiData = [
  { title: 'Impresiones', total: 45180, perPost: 3227, target: 2233, isAchieved: true, decimalsPerPost: 0, decimalsTarget: 0 },
  { title: 'Clics', total: 3455, perPost: 247, target: 285, isAchieved: false, decimalsPerPost: 0, decimalsTarget: 0 },
  { title: 'Recomendaciones', total: 475, perPost: 34, target: 25.8, isAchieved: true, decimalsPerPost: 0, decimalsTarget: 1 },
  { title: 'Veces Compartido', total: 32, perPost: 2.29, target: 3.5, isAchieved: false, decimalsPerPost: 2, decimalsTarget: 1 },
]

const insightsData = [
  { title: 'Efectividad del aumento de frecuencia', description: 'El incremento en la cadencia de publicación ha resultado en un crecimiento neto del alcance acumulado. Lejos de saturar, la suma de las publicaciones habituales más el nuevo contenido editorial ha mejorado el rendimiento medio por post.' },
  { title: 'Dualidad de formatos', description: 'Las publicaciones visuales (Quotes) son clave para maximizar la visibilidad y reacciones de marca (Brand Awareness), mientras que las galerías y artículos técnicos concentran la generación de clics.' },
  { title: 'Coherencia omnicanal', description: 'El interés de los usuarios en la web (visitas a perfiles de Socios) se alinea con la estrategia de humanización en LinkedIn (Quotes y entrevistas), reforzando la confianza digital.' },
]

export function LinkedInSection({
  label,
  title,
  subtitle,
  disclaimer,
}: LinkedInSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const kpiRef = useRef<HTMLDivElement>(null)
  const insightsRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const header = headerRef.current
    const kpiContainer = kpiRef.current
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

    // KPI cards animation
    if (kpiContainer) {
      const cards = kpiContainer.querySelectorAll('.kpi-card')
      gsap.set(cards, { opacity: 0, y: 35 })

      ScrollTrigger.create({
        trigger: kpiContainer,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          })

          // Animate counters
          counterRefs.current.forEach((counter, index) => {
            if (counter) {
              const endValue = kpiData[index].total
              gsap.fromTo(counter,
                { textContent: 0 },
                {
                  textContent: endValue,
                  duration: 1.5,
                  delay: 0.3 + (index * 0.1),
                  ease: 'power2.out',
                  snap: { textContent: 1 },
                  onUpdate: function() {
                    counter.textContent = Math.round(parseFloat(counter.textContent || '0')).toLocaleString('es-ES')
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
      const cards = insightsContainer.querySelectorAll('.insight-card')
      gsap.set(cards, { opacity: 0, y: 25 })

      ScrollTrigger.create({
        trigger: insightsContainer,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(cards, {
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

  const formatNumber = (num: number, decimals: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals).replace('.', ',')
    }
    return num.toLocaleString('es-ES')
  }

  return (
    <section id="linkedin" className="py-20 md:py-32 bg-[#f8fafc]">
      <div className="max-w-[1176px] mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#016936] mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[52px] font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight mb-5">
            {title}
          </h2>
          <p className="text-[18px] text-[#6e6e73] max-w-[700px] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div ref={kpiRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className="kpi-card relative bg-white border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-shadow duration-300"
            >
              {/* Header */}
              <div className="mb-6">
                <h4 className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#6e6e73]">
                  {kpi.title}
                </h4>
              </div>

              {/* Total - Primary */}
              <div className="mb-6">
                <span
                  ref={el => { counterRefs.current[index] = el }}
                  className="text-[48px] md:text-[56px] font-extralight text-[#1d1d1f] leading-none tracking-tight tabular-nums"
                >
                  0
                </span>
                <div className="text-[13px] text-[#6e6e73] mt-2">Total trimestral</div>
              </div>

              {/* Secondary metrics */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-100">
                <div>
                  <div className={`text-[20px] font-medium tabular-nums ${kpi.isAchieved ? 'text-[#016936]' : 'text-[#1d1d1f]'}`}>
                    {formatNumber(kpi.perPost, kpi.decimalsPerPost)}
                  </div>
                  <div className="text-[11px] text-[#6e6e73] uppercase tracking-wider mt-1">Media/Post</div>
                </div>
                <div>
                  <div className="text-[20px] font-light text-[#94a3b8] tabular-nums">
                    {formatNumber(kpi.target, kpi.decimalsTarget)}
                  </div>
                  <div className="text-[11px] text-[#6e6e73] uppercase tracking-wider mt-1">Objetivo</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insights Section */}
        <div ref={insightsRef} className="mb-12">
          <h3 className="text-[22px] md:text-[26px] font-medium text-[#1d1d1f] mb-6">
            Análisis estratégico
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {insightsData.map((insight, index) => (
              <div
                key={index}
                className="insight-card bg-white border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-shadow duration-300"
              >
                <h4 className="text-[16px] font-medium text-[#1d1d1f] mb-3">
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
          <div className="pt-8 border-t border-slate-200/60">
            <p className="text-[13px] text-[#94a3b8] leading-relaxed italic">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
