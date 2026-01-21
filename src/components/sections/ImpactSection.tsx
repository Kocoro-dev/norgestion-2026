'use client'

import { useEffect, useState, useRef } from 'react'

// Animated Counter
function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: number
  duration?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 4)
            setDisplayValue(Math.floor(value * easeOut))

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplayValue(value)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={ref}>{displayValue}</span>
}

// Contact Category Card
function CategoryCard({
  value,
  descriptor,
  subtext,
  isHighlighted = false,
  delay = 0,
}: {
  value: number
  descriptor: string
  subtext: string
  isHighlighted?: boolean
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* The number */}
      <div className={`mb-4 ${isHighlighted ? 'text-[#016936]' : 'text-[#1d1d1f]'}`}>
        <span className={`text-[72px] md:text-[96px] font-extralight leading-none tracking-tight tabular-nums ${
          isHighlighted ? 'font-light' : ''
        }`}>
          <AnimatedCounter value={value} />
        </span>
      </div>

      {/* Descriptor */}
      <div className={`text-[15px] font-medium mb-1 ${
        isHighlighted ? 'text-[#016936]' : 'text-[#1d1d1f]'
      }`}>
        {descriptor}
      </div>

      {/* Subtext */}
      <div className="text-[13px] text-[#86868b]">
        {subtext}
      </div>
    </div>
  )
}

// Insight Item
function InsightItem({
  title,
  description,
  delay = 0,
}: {
  title: string
  description: string
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h4 className="text-[15px] font-medium text-[#1d1d1f] mb-2">
        {title}
      </h4>
      <p className="text-[15px] text-[#6e6e73] leading-relaxed">
        {description}
      </p>
    </div>
  )
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
  return (
    <section id="impacto" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1176px] mx-auto px-6">

        {/* Header - Minimal */}
        <div className="mb-20 md:mb-24">
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

        {/* Block A: The Mix - Contact Breakdown */}
        <div className="mb-20 md:mb-28">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {/* Category 1: Commercial - Highlighted */}
            <CategoryCard
              value={61}
              descriptor="Contactos de Negocio"
              subtext="M&A, Inversores, Consultas Servicios"
              isHighlighted={true}
              delay={0}
            />

            {/* Category 2: Talent */}
            <CategoryCard
              value={50}
              descriptor="Captación de Talento"
              subtext="Candidatos de empleo y prácticas"
              delay={150}
            />

            {/* Category 3: Senior Talent */}
            <CategoryCard
              value={18}
              descriptor="Interim Pool"
              subtext="Solicitudes de adhesión al equipo"
              delay={300}
            />
          </div>
        </div>

        {/* Block B: Qualitative Analysis - Insights */}
        <div className="pt-12 border-t border-[#d2d2d7]/60">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <InsightItem
              title="Cambio de tendencia"
              description="Inversión de la polaridad del tráfico. Por primera vez, el volumen de consultas con intención comercial supera al flujo de candidatos y talento, validando la web como herramienta de soporte a la originación."
              delay={0}
            />
            <InsightItem
              title="Tracción vertical"
              description="Validación de especialización. La vertical de M&A Software ha generado contactos específicos del sector, demostrando que el contenido de nicho atrae a una contraparte cualificada."
              delay={100}
            />
            <InsightItem
              title="Alcance cross-border"
              description="Originación Internacional. Se registran entradas de contacto procedentes de mercados exteriores, correlacionando con el aumento de tráfico internacional observado en la analítica web."
              delay={200}
            />
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
