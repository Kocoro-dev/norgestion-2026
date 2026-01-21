'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Quarter {
  label: string
  months: string
  items: string[]
}

interface RoadmapSectionProps {
  label: string
  title: string
  description: string
  quarters?: Quarter[]
  note?: string
}

export function RoadmapSection({ label, title, description, quarters, note }: RoadmapSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const grid = gridRef.current
    const noteEl = noteRef.current

    if (header) {
      const elements = header.querySelectorAll(':scope > *')
      gsap.set(elements, { opacity: 0, y: 40 })

      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }

    if (grid) {
      const cards = grid.querySelectorAll('.roadmap-card')
      gsap.set(cards, { opacity: 0, y: 50 })

      ScrollTrigger.create({
        trigger: grid,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }

    if (noteEl) {
      gsap.set(noteEl, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: noteEl,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(noteEl, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    }
  }, [])

  return (
    <section id="roadmap" className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#016936]/5 to-transparent" />

      <div className="relative max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#2a9d5c] mb-5">
            {label}
          </div>
          <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-5">
            {title}
          </h2>
          <p className="text-[18px] md:text-[20px] text-white/50 max-w-[600px] leading-[1.5] font-normal">
            {description}
          </p>
        </div>

        {/* Quarters Grid */}
        {quarters && quarters.length > 0 && (
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {quarters.map((quarter, index) => (
              <div key={index} className="roadmap-card group">
                <div className="relative h-full bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500">
                  {/* Quarter label */}
                  <div className="mb-8">
                    <span className="text-[42px] lg:text-[48px] font-bold text-[#2a9d5c] leading-none tracking-tight">
                      {quarter.label}
                    </span>
                    <span className="block text-[13px] text-white/40 mt-2 tracking-wide">
                      {quarter.months}
                    </span>
                  </div>

                  {/* Items */}
                  <ul className="space-y-4">
                    {quarter.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2a9d5c] mt-2.5 flex-shrink-0" />
                        <span className="text-[15px] text-white/70 leading-[1.5]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2a9d5c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        {note && (
          <div ref={noteRef}>
            <p className="text-[15px] text-white/40 leading-[1.6] max-w-[600px]">
              {note}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
