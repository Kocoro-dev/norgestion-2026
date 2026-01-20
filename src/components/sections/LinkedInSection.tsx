'use client'

import { useEffect, useState, useRef } from 'react'

interface LinkedInSectionProps {
  label: string
  title: string
  subtitle: string
  disclaimer?: string
}

// Animated Counter
function AnimatedCounter({
  value,
  duration = 2000,
  decimals = 0,
}: {
  value: number
  duration?: number
  decimals?: number
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
            setDisplayValue(value * easeOut)

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

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals).replace('.', ',')
    : Math.floor(displayValue).toLocaleString('es-ES')

  return <span ref={ref}>{formatted}</span>
}

// Premium KPI Card - Light Version
function KPICard({
  title,
  total,
  perPost,
  target,
  isAchieved,
  decimalsTotal = 0,
  decimalsPerPost = 0,
  decimalsTarget = 0,
  delay = 0,
}: {
  title: string
  total: number
  perPost: number
  target: number
  isAchieved: boolean
  decimalsTotal?: number
  decimalsPerPost?: number
  decimalsTarget?: number
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

  const formatNumber = (num: number, decimals: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals).replace('.', ',')
    }
    return num.toLocaleString('es-ES')
  }

  return (
    <div
      ref={ref}
      className={`relative bg-white border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 transition-all duration-500 ease-out hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-slate-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="mb-6">
        <h4 className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#6e6e73]">
          {title}
        </h4>
      </div>

      {/* Total - Primary */}
      <div className="mb-6">
        <div className="text-[48px] md:text-[56px] font-extralight text-[#1d1d1f] leading-none tracking-tight tabular-nums">
          <AnimatedCounter value={total} decimals={decimalsTotal} />
        </div>
        <div className="text-[13px] text-[#6e6e73] mt-2">Total trimestral</div>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-100">
        <div>
          <div className={`text-[20px] font-medium tabular-nums ${isAchieved ? 'text-[#016936]' : 'text-[#1d1d1f]'}`}>
            {formatNumber(perPost, decimalsPerPost)}
          </div>
          <div className="text-[11px] text-[#6e6e73] uppercase tracking-wider mt-1">Media/Post</div>
        </div>
        <div>
          <div className="text-[20px] font-light text-[#94a3b8] tabular-nums">
            {formatNumber(target, decimalsTarget)}
          </div>
          <div className="text-[11px] text-[#6e6e73] uppercase tracking-wider mt-1">Objetivo</div>
        </div>
      </div>
    </div>
  )
}

// Insight Card - Light Version
function InsightCard({
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
      className={`bg-white border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 transition-all duration-500 ease-out hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-slate-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h4 className="text-[16px] font-semibold text-[#1d1d1f] mb-3">
        {title}
      </h4>
      <p className="text-[15px] text-[#6e6e73] leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export function LinkedInSection({
  label,
  title,
  subtitle,
  disclaimer,
}: LinkedInSectionProps) {
  return (
    <section id="linkedin" className="py-20 md:py-32 bg-[#f8fafc]">
      <div className="max-w-[1176px] mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <KPICard
            title="Impresiones"
            total={45180}
            perPost={3227}
            target={2233}
            isAchieved={true}
            delay={0}
          />
          <KPICard
            title="Clics"
            total={3455}
            perPost={247}
            target={285}
            isAchieved={false}
            delay={100}
          />
          <KPICard
            title="Recomendaciones"
            total={475}
            perPost={34}
            target={25.8}
            decimalsTarget={1}
            isAchieved={true}
            delay={200}
          />
          <KPICard
            title="Veces Compartido"
            total={32}
            perPost={2.29}
            target={3.5}
            decimalsPerPost={2}
            decimalsTarget={1}
            isAchieved={false}
            delay={300}
          />
        </div>

        {/* Insights Section */}
        <div className="mb-12">
          <h3 className="text-[22px] md:text-[26px] font-medium text-[#1d1d1f] mb-6">
            Análisis Estratégico
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <InsightCard
              title="Efectividad del Aumento de Frecuencia"
              description="El incremento en la cadencia de publicación ha resultado en un crecimiento neto del alcance acumulado. Lejos de saturar, la suma de las publicaciones habituales más el nuevo contenido editorial ha mejorado el rendimiento medio por post."
              delay={0}
            />
            <InsightCard
              title="Comportamiento por Formato"
              description="Se observa una variación en la respuesta según el tipo de contenido. Las publicaciones visuales (Quotes) maximizan el Brand Awareness, mientras que el contenido técnico tracciona el clic, sugiriendo una segmentación algorítmica de la audiencia."
              delay={100}
            />
            <InsightCard
              title="Correlación Web-Social"
              description="La visibilidad de los socios en LinkedIn mantiene una coherencia con los patrones de navegación web, donde las páginas de perfil del equipo directivo figuran entre las más visitadas. El canal social actúa como catalizador de la marca personal."
              delay={200}
            />
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
