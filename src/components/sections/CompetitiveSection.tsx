'use client'

import { useEffect, useState, useRef } from 'react'

// Strategic Insight Card
function InsightCard({
  title,
  insight,
  delay = 0,
}: {
  title: string
  insight: string
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
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`relative border border-white/10 bg-white/[0.02] p-6 md:p-8 transition-all duration-700 ease-out hover:border-white/20 hover:bg-white/[0.04] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <h4 className="text-[15px] font-semibold text-white mb-4">
        {title}
      </h4>
      <p className="text-[14px] text-white/60 leading-relaxed">
        {insight}
      </p>
    </div>
  )
}

// Strength Item with Check
function StrengthItem({
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
      className={`flex gap-4 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      {/* Check Icon */}
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
          {title}
        </div>
        <div className="text-[14px] text-white/50 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  )
}

interface CompetitiveSectionProps {
  label: string
  title: string
  subtitle: string
}

export function CompetitiveSection({
  label,
  title,
  subtitle,
}: CompetitiveSectionProps) {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="competitivo" className="py-24 md:py-32 bg-[#0d1214]">
      <div className="max-w-[1176px] mx-auto px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 md:mb-20 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
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

        {/* Block A: Radar de Movimientos - Competitor Analysis */}
        <div className="mb-16 md:mb-20">
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            <InsightCard
              title="Estrategia de verticalización externa"
              insight="Se detecta la creación de ecosistemas web satélites para competir en Tech M&A. Frente a la integración, el competidor opta por segregar tráfico, posiblemente por limitaciones de agilidad en su web corporativa. A su vez, se observa un mimetismo en la estrategia de LinkedIn (formato y frecuencia), validando la línea editorial de NORGESTION."
              delay={0}
            />
            <InsightCard
              title="Penalización por experiencia (UX)"
              insight="A pesar de generar contenido sectorial relevante (bien posicionado en IA), pierden visibilidad en Google. El diagnóstico sugiere una penalización algorítmica por Core Web Vitals (velocidad y usabilidad). La relevancia semántica no sostiene el ranking si la estructura técnica falla."
              delay={100}
            />
            <InsightCard
              title="Erosión de visibilidad orgánica"
              insight="Actores tradicionales (Big Four) y nuevos entrantes (Banca en Reestructuraciones) muestran dificultades de adaptación. A pesar de su autoridad de marca offline, su rigidez estructural limita su capacidad de reacción en las SERPs (Resultados de Búsqueda), cediendo terreno en términos transaccionales."
              delay={200}
            />
          </div>
        </div>

        {/* Block B: La Fortaleza de NORGESTION */}
        <div className="border border-white/10 bg-white/[0.02]">
          <div className="p-8 md:p-12">
            {/* Feature Block Title */}
            <h3 className="text-[22px] md:text-[26px] font-semibold text-white mb-8 md:mb-10">
              Ventaja competitiva: el modelo unificado
            </h3>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {/* Left Column - Main Text */}
              <div>
                <p className="text-[16px] md:text-[17px] text-white/70 leading-relaxed">
                  Frente a la fragmentación (microsites externos) y la deuda técnica de la competencia, NORGESTION opera bajo un modelo centralizado que integra estrategia, tecnología y narrativa.
                </p>
              </div>

              {/* Right Column - Strengths List */}
              <div className="space-y-6">
                <StrengthItem
                  title="Autoridad de dominio consolidada"
                  description="Capacidad de posicionar páginas de tercer nivel (ej: M&A Software) por encima de portales verticales exclusivos de la competencia."
                  delay={0}
                />
                <StrengthItem
                  title="Agilidad full-stack"
                  description="El control total del ciclo (diseño-código-contenido) elimina la fricción entre proveedores, permitiendo una adaptación inmediata a cambios de algoritmo y manteniendo una coherencia estética impecable."
                  delay={150}
                />
                <StrengthItem
                  title="Visión largoplacista"
                  description="Una construcción de activos digitales basada en la calidad técnica y semántica, evitando tácticas de quick-win que penalizan a largo plazo (como se observa en otros actores)."
                  delay={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
