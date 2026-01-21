'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lightbulb } from 'lucide-react'
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

function InsightCard({ title, description }: Insight) {
  return (
    <div className="insight-card bg-[#0d1214] border border-white/[0.06] p-6 hover:border-[#016936]/30 transition-colors duration-300">
      <div className="flex items-start gap-4 mb-3">
        <div className="w-10 h-10 bg-[#016936]/20 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-[#2a9d5c]" strokeWidth={1.5} />
        </div>
        <h4 className="text-[16px] font-medium text-white pt-2">
          {title}
        </h4>
      </div>
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
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16">
          {/* Left Column - Table */}
          <div ref={tableRef} className="relative">
            <div className="lg:absolute lg:inset-0 border border-white/[0.06] max-h-[60vh] lg:max-h-none overflow-auto table-scroll-container" data-lenis-prevent>
              <Table>
                <TableHeader className="sticky top-0 bg-[#11191C] z-10">
                  <TableRow className="border-white/[0.06] hover:bg-transparent">
                    <TableHead className="text-white/40 text-[11px] md:text-[13px] font-medium uppercase tracking-wider py-3 md:py-4 pl-3 md:pl-6 sticky left-0 bg-[#11191C] z-20">
                      {columnHeaders.name}
                    </TableHead>
                    <TableHead className="text-white/40 text-[11px] md:text-[13px] font-medium uppercase tracking-wider py-3 md:py-4 pr-3 md:pr-6 text-right min-w-[180px] md:min-w-[220px]">
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
                      <TableCell className="py-3 md:py-4 pl-3 md:pl-6 sticky left-0 bg-[#11191C] z-10">
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-[10px] md:text-[12px] font-medium text-[#2a9d5c] bg-[#0d3d2a] px-1.5 md:px-2 py-0.5 flex-shrink-0">
                            #{index + 1}
                          </span>
                          <span className="text-white/70 text-[13px] md:text-[15px]">
                            {item.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 md:py-4 pr-3 md:pr-6">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="flex-1 h-1.5 md:h-2 bg-white/[0.06] rounded-full overflow-hidden min-w-[60px]">
                            <div
                              ref={el => { barsRef.current[index] = el }}
                              className="h-full bg-gradient-to-r from-[#016936] to-[#2a9d5c] rounded-full"
                              style={{ width: '0%' }}
                            />
                          </div>
                          <span className="text-[12px] md:text-[14px] text-white/70 font-medium tabular-nums w-14 md:w-20 text-right flex-shrink-0">
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
