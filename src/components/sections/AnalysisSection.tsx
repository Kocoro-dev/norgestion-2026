'use client'

import { useEffect, useState, useRef } from 'react'
import { Clock, Activity, Globe, TrendingUp } from 'lucide-react'

// ============================================
// TYPES
// ============================================

interface TrafficSource {
  name: string
  percentage: number
  color: string
}

interface CountryData {
  country: string
  percentage: number
  sessions: number
}

interface AnalysisSectionProps {
  label: string
  title: string
  subtitle?: string
  disclaimer?: string
}

// ============================================
// ANIMATED COUNTER - Premium with easing
// ============================================

function AnimatedCounter({
  value,
  duration = 2000,
  suffix = '',
  formatter = (n: number) => n.toLocaleString('es-ES')
}: {
  value: number
  duration?: number
  suffix?: string
  formatter?: (n: number) => string
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

            // Premium easing: cubic-bezier for smooth deceleration
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

  return (
    <span ref={ref}>
      {formatter(displayValue)}{suffix}
    </span>
  )
}

// ============================================
// LARGE STAT - Massive counter with label
// ============================================

function LargeStat({
  value,
  label,
  sublabel,
  delay = 0
}: {
  value: number
  label: string
  sublabel?: string
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
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-[56px] md:text-[72px] font-extralight text-[#1d1d1f] leading-none tracking-tight tabular-nums">
        <AnimatedCounter value={value} duration={2200} />
      </div>
      <div className="mt-3 text-[16px] text-[#1d1d1f] font-medium">
        {label}
      </div>
      {sublabel && (
        <div className="mt-1 text-[14px] text-[#6e6e73]">
          {sublabel}
        </div>
      )}
    </div>
  )
}

// ============================================
// SOLID METRIC CARD - Premium card with icon
// ============================================

function SolidMetricCard({
  icon: Icon,
  value,
  label,
  description,
  benchmark,
  delay = 0
}: {
  icon: React.ElementType
  value: string
  label: string
  description: string
  benchmark?: string
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
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-[#016936]/[0.08] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#016936]" strokeWidth={1.5} />
        </div>
        {benchmark && (
          <div className="text-[12px] text-[#6e6e73] bg-slate-100/80 px-2 py-1">
            Sector: {benchmark}
          </div>
        )}
      </div>
      <div className="text-[32px] font-light text-[#1d1d1f] leading-none mb-2">
        {value}
      </div>
      <div className="text-[15px] font-medium text-[#1d1d1f] mb-2">
        {label}
      </div>
      <p className="text-[14px] text-[#6e6e73] leading-relaxed">
        {description}
      </p>
    </div>
  )
}

// ============================================
// PREMIUM DONUT CHART - Animated segments
// ============================================

function PremiumDonutChart({
  data,
  centerValue,
  centerLabel
}: {
  data: TrafficSource[]
  centerValue: string
  centerLabel: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const total = data.reduce((sum, item) => sum + item.percentage, 0)
  let cumulative = 0
  const radius = 15.91549430918954
  const circumference = 2 * Math.PI * radius

  return (
    <div ref={ref} className="relative">
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth="3"
          />

          {/* Data segments */}
          {data.map((item, index) => {
            const dashArray = (item.percentage / total) * 100
            const dashOffset = 100 - cumulative
            cumulative += dashArray

            return (
              <circle
                key={index}
                cx="21"
                cy="21"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth="3"
                strokeDasharray={`${isVisible ? dashArray : 0} ${100 - (isVisible ? dashArray : 0)}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 200}ms` }}
              />
            )
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className={`text-[28px] font-light text-[#1d1d1f] block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {centerValue}
            </span>
            <span className={`text-[12px] text-[#6e6e73] uppercase tracking-wider transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {centerLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[13px] text-[#6e6e73]">{item.name}</span>
            </div>
            <span className="text-[13px] font-medium text-[#1d1d1f] tabular-nums">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// DISCOVERY BLOCK - Insight highlight
// ============================================

function DiscoveryBlock({
  value,
  title,
  description,
  delay = 0
}: {
  value: string
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
      className={`bg-[#016936]/[0.04] border border-[#016936]/10 p-5 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-[28px] font-light text-[#016936] leading-none">
          {value}
        </div>
        <div>
          <div className="text-[14px] font-medium text-[#1d1d1f] mb-1">
            {title}
          </div>
          <p className="text-[13px] text-[#6e6e73] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// COUNTRY BAR - Horizontal progress bar
// ============================================

function CountryBar({
  country,
  percentage,
  sessions,
  maxPercentage,
  delay = 0
}: {
  country: string
  percentage: number
  sessions: number
  maxPercentage: number
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

  const barWidth = (percentage / maxPercentage) * 100

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] text-[#1d1d1f] group-hover:text-[#016936] transition-colors">
          {country}
        </span>
        <span className="text-[13px] text-[#6e6e73] tabular-nums">
          {sessions.toLocaleString('es-ES')} sesiones
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#016936] to-[#2a9d5c] rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${barWidth}%` : '0%' }}
        />
      </div>
    </div>
  )
}

// ============================================
// INTERNATIONAL EXPOSURE - Full width section
// ============================================

function InternationalExposure({
  percentage,
  countries
}: {
  percentage: number
  countries: CountryData[]
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const maxPercentage = Math.max(...countries.map(c => c.percentage))

  return (
    <div
      ref={ref}
      className={`bg-white border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
        {/* Left: Main stat */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#016936]/[0.08] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#016936]" strokeWidth={1.5} />
            </div>
            <span className="text-[13px] font-medium uppercase tracking-wider text-[#6e6e73]">
              Exposición internacional
            </span>
          </div>
          <div className="text-[64px] font-extralight text-[#1d1d1f] leading-none mb-3">
            {percentage}%
          </div>
          <p className="text-[15px] text-[#6e6e73] leading-relaxed">
            Del tráfico total proviene de fuera de España. La web actúa como escaparate para usuarios extranjeros interesados en el middle market español.
          </p>
        </div>

        {/* Right: Country breakdown */}
        <div>
          <div className="text-[13px] font-medium uppercase tracking-wider text-[#6e6e73] mb-6">
            Distribución por país
          </div>
          <div className="space-y-5">
            {countries.map((country, index) => (
              <CountryBar
                key={country.country}
                country={country.country}
                percentage={country.percentage}
                sessions={country.sessions}
                maxPercentage={maxPercentage}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function AnalysisSection({
  label,
  title,
  subtitle,
  disclaimer
}: AnalysisSectionProps) {
  const trafficSources: TrafficSource[] = [
    { name: 'Búsqueda orgánica', percentage: 61, color: '#016936' },
    { name: 'Tráfico directo', percentage: 31.1, color: '#64748b' },
    { name: 'Referencias', percentage: 7.9, color: '#cbd5e1' },
  ]

  const countryData: CountryData[] = [
    { country: 'España', percentage: 68, sessions: 10668 },
    { country: 'Estados Unidos', percentage: 14.7, sessions: 2316 },
    { country: 'China', percentage: 3.3, sessions: 518 },
    { country: 'Alemania', percentage: 2, sessions: 310 },
    { country: 'Francia', percentage: 1.5, sessions: 239 },
    { country: 'Reino Unido', percentage: 1.3, sessions: 200 },
  ]

  return (
    <section id="analisis" className="py-20 md:py-32 bg-[#f8fafc]">
      <div className="max-w-[1176px] mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <div className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#016936] mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[52px] font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight mb-5">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[18px] text-[#6e6e73] max-w-[700px] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* 3-Column Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">

          {/* Column 1: Volume & Reach */}
          <div className="bg-white border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-4 h-4 text-[#016936]" strokeWidth={1.5} />
              <span className="text-[12px] font-medium uppercase tracking-wider text-[#6e6e73]">
                Volumen y alcance
              </span>
            </div>
            <div className="space-y-10">
              <LargeStat
                value={15760}
                label="Sesiones"
                sublabel="Últimos 3 meses"
                delay={0}
              />
              <LargeStat
                value={308715}
                label="Impresiones en Google"
                sublabel="Visualizaciones en resultados"
                delay={200}
              />
            </div>
          </div>

          {/* Column 2: User Behavior */}
          <div className="bg-white border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8">
            <div className="flex items-center gap-2 mb-8">
              <Activity className="w-4 h-4 text-[#016936]" strokeWidth={1.5} />
              <span className="text-[12px] font-medium uppercase tracking-wider text-[#6e6e73]">
                Comportamiento de los usuarios
              </span>
            </div>
            <div className="space-y-8">
              {/* Time metric */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#016936]" strokeWidth={1.5} />
                  <span className="text-[32px] font-light text-[#1d1d1f] leading-none">2:26</span>
                </div>
                <div className="text-[15px] font-medium text-[#1d1d1f] mb-1">Tiempo medio de sesión</div>
                <p className="text-[14px] text-[#6e6e73] leading-relaxed">
                  Los visitantes dedican más de 2 minutos explorando el contenido, indicando interés real.
                </p>
              </div>
              {/* Engagement metric */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-[#016936]" strokeWidth={1.5} />
                  <span className="text-[32px] font-light text-[#1d1d1f] leading-none">53%</span>
                </div>
                <div className="text-[15px] font-medium text-[#1d1d1f] mb-1">Ratio de engagement</div>
                <p className="text-[14px] text-[#6e6e73] leading-relaxed">
                  Más de la mitad de los visitantes interactúan activamente con la web.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Acquisition Structure */}
          <div className="bg-white border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8">
            <div className="text-[12px] font-medium uppercase tracking-wider text-[#6e6e73] mb-6">
              Estructura de adquisición
            </div>
            <PremiumDonutChart
              data={trafficSources}
              centerValue="61%"
              centerLabel="Orgánico"
            />
            <div className="mt-6">
              <DiscoveryBlock
                value="65%"
                title="Descubrimiento sin marca"
                description="De las búsquedas orgánicas, el 65% no incluye 'NORGESTION'. Son potenciales clientes que no conocían la firma."
                delay={400}
              />
            </div>
          </div>
        </div>

        {/* Full Width: International Exposure */}
        <InternationalExposure
          percentage={32}
          countries={countryData}
        />

        {/* Disclaimer */}
        {disclaimer && (
          <div className="mt-12 pt-8 border-t border-slate-200/60">
            <p className="text-[13px] text-[#94a3b8] leading-relaxed italic">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
