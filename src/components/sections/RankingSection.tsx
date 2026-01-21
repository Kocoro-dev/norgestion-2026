'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Insight {
  title: string
  description: string
}

interface RankingSectionProps {
  label: string
  title: string
  subtitle: string
  variant: 'pages' | 'visibility'
  data: Array<{
    name: string
    value: number
  }>
  insights: Insight[]
  disclaimer?: string
}

function formatNumber(num: number): string {
  return num.toLocaleString('es-ES')
}

function LightbulbIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#2a9d5c] flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 2a6 6 0 00-6 6c0 1.887.872 3.569 2.234 4.668.312.252.566.602.698 1.012l.147.456c.205.64.785 1.094 1.461 1.094h2.92c.676 0 1.256-.454 1.461-1.094l.147-.456c.132-.41.386-.76.698-1.012A5.993 5.993 0 0016 8a6 6 0 00-6-6zm-1.5 14a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm.5 1.5a.5.5 0 000 1h2a.5.5 0 000-1h-2z"/>
    </svg>
  )
}

function InsightCard({ title, description }: Insight) {
  return (
    <div className="insight-card bg-[#0d1214] border border-white/[0.06] p-6 hover:border-[#016936]/30 transition-colors duration-300">
      <h4 className="flex items-center gap-2 text-[16px] font-medium text-white mb-3">
        <LightbulbIcon />
        {title}
      </h4>
      <p
        className="text-[15px] text-white/60 leading-relaxed [&_strong]:text-[#2a9d5c] [&_strong]:font-medium"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}

export function RankingSection({
  label,
  title,
  subtitle,
  variant,
  data,
  insights,
  disclaimer,
}: RankingSectionProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  const columnHeaders = variant === 'pages'
    ? { name: 'Página', value: 'Visitas' }
    : { name: 'Landing Page', value: 'Impresiones' }

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const insightsRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const header = headerRef.current
    const table = tableRef.current
    const insightsContainer = insightsRef.current

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

    // Table animation
    if (table) {
      gsap.set(table, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: table,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(table, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          })

          // Animate bars
          barsRef.current.forEach((bar, index) => {
            if (bar) {
              const percentage = (data[index].value / maxValue) * 100
              gsap.fromTo(bar,
                { width: '0%' },
                {
                  width: `${percentage}%`,
                  duration: 0.8,
                  delay: 0.3 + (index * 0.05),
                  ease: 'power2.out',
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
  }, [data, maxValue])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#11191C]">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <div className="text-[14px] font-medium uppercase tracking-[0.15em] text-[#86868b] mb-4">
            {label}
          </div>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-white leading-tight mb-3">
            {title}
          </h2>
          <p className="text-[20px] text-white/60 max-w-[700px]">
            {subtitle}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
          {/* Left Column - Table */}
          <div ref={tableRef} className="relative">
            <div className="lg:absolute lg:inset-0 border border-white/[0.06] overflow-y-scroll scrollbar-visible" data-lenis-prevent>
              <Table>
                <TableHeader className="sticky top-0 bg-[#11191C] z-10">
                  <TableRow className="border-white/[0.06] hover:bg-transparent">
                    <TableHead className="text-white/40 text-[13px] font-medium uppercase tracking-wider py-4 pl-6">
                      {columnHeaders.name}
                    </TableHead>
                    <TableHead className="text-white/40 text-[13px] font-medium uppercase tracking-wider py-4 pr-6 text-right">
                      {columnHeaders.value}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow
                      key={index}
                      className="border-white/[0.06] hover:bg-[#016936]/[0.08] transition-colors duration-300"
                    >
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <span className="text-[12px] font-medium text-[#2a9d5c] bg-[#0d3d2a] px-2 py-0.5 flex-shrink-0">
                            #{index + 1}
                          </span>
                          <span className="text-white/70 text-[15px]">
                            {item.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 pr-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              ref={el => { barsRef.current[index] = el }}
                              className="h-full bg-gradient-to-r from-[#016936] to-[#2a9d5c] rounded-full"
                              style={{ width: '0%' }}
                            />
                          </div>
                          <span className="text-[14px] text-white/70 font-medium tabular-nums w-20 text-right">
                            {formatNumber(item.value)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Right Column - Insights */}
          <div ref={insightsRef}>
            <h3 className="text-[22px] md:text-[26px] font-medium text-white mb-6">
              Hallazgos clave
            </h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        {disclaimer && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-[14px] text-white/30 leading-relaxed italic">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
