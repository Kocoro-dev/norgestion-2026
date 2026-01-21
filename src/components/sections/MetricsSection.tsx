'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Metric {
  value: string
  unit?: string
  title: string
  description: string
}

interface MetricsSectionProps {
  label: string
  title: string
  description: string
  metrics: Metric[]
}

export function MetricsSection({ label, title, description, metrics }: MetricsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const metricsContainer = metricsRef.current
    const chart = chartRef.current
    const circle = circleRef.current

    if (!section) return

    // Header animation
    if (header) {
      const elements = header.querySelectorAll(':scope > *')
      gsap.set(elements, { opacity: 0, y: 25 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(elements, {
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

    // Metrics cards animation
    if (metricsContainer) {
      const cards = metricsContainer.querySelectorAll(':scope > *')
      gsap.set(cards, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: metricsContainer,
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

    // Chart animation
    if (chart) {
      gsap.set(chart, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: chart,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(chart, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
          })

          // Animate circle
          if (circle) {
            const circumference = 2 * Math.PI * 40
            gsap.fromTo(circle,
              { strokeDasharray: `0 ${circumference}` },
              {
                strokeDasharray: `${65 * 2.51} ${100 * 2.51}`,
                duration: 1.2,
                delay: 0.5,
                ease: 'power2.out',
              }
            )
          }
        },
        once: true,
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="metricas" className="py-20 md:py-28 bg-[#F5F5F7]">
      <div className="max-w-[1120px] mx-auto px-6">
        <div ref={headerRef} className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#016936] mb-3 block">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#11191C] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl">
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={metricsRef} className="space-y-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white p-6 flex gap-6 items-start">
                <div className="flex-shrink-0 text-right min-w-[100px]">
                  <span className="text-4xl font-semibold text-[#016936]">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-lg text-[#016936] ml-1">
                      {metric.unit}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-[#11191C] mb-2">
                    {metric.title}
                  </h4>
                  <p className="text-sm text-[#666666]">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div ref={chartRef} className="bg-white p-5 md:p-8">
            <h4 className="font-medium text-[#11191C] mb-4 md:mb-6">
              Origen del tráfico
            </h4>
            <div className="flex items-center justify-center h-[140px] md:h-[200px] mb-4 md:mb-6">
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="20"
                  />
                  <circle
                    ref={circleRef}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#016936"
                    strokeWidth="20"
                    strokeDasharray={`0 ${100 * 2.51}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-semibold text-[#11191C]">65%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#016936] flex-shrink-0" />
                <span className="text-xs md:text-sm text-[#666666]">Buscan soluciones (65%)</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#E5E5E5] flex-shrink-0" />
                <span className="text-xs md:text-sm text-[#666666]">Buscan "Norgestion" (35%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
