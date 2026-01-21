'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ExecutiveSummaryItem {
  number: string
  title: string
  description: string
}

interface HeroSectionProps {
  badge?: string
  title: React.ReactNode
  lead: string
  variant?: 'light' | 'dark' | 'green'
  executiveSummary?: ExecutiveSummaryItem[]
  backgroundImage?: string
}

export function HeroSection({
  badge,
  title,
  lead,
  variant = 'light',
  executiveSummary,
  backgroundImage
}: HeroSectionProps) {
  const hasExecutiveSummary = executiveSummary && executiveSummary.length > 0
  const headerRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const hasBackground = !!backgroundImage

  useEffect(() => {
    const header = headerRef.current
    const summary = summaryRef.current

    if (header) {
      const badge = header.querySelector('.hero-badge')
      const title = header.querySelector('.hero-title')
      const lead = header.querySelector('.hero-lead')

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      if (badge) {
        gsap.set(badge, { opacity: 0, y: 15 })
        tl.to(badge, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      }

      if (title) {
        gsap.set(title, { opacity: 0, y: 30 })
        tl.to(title, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      }

      if (lead) {
        gsap.set(lead, { opacity: 0, y: 20 })
        tl.to(lead, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
      }
    }

    if (summary) {
      gsap.set(summary, { opacity: 0, y: 40 })
      gsap.to(summary, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.5,
        ease: 'power2.out',
      })

      const items = summary.querySelectorAll('.summary-item')
      gsap.set(items, { opacity: 0, x: -15 })
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.8,
        ease: 'power2.out',
      })
    }
  }, [])

  return (
    <header className={cn(
      "relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden",
      !hasBackground && variant === 'light' && "bg-white",
      !hasBackground && variant === 'dark' && "bg-[#1d1d1f]",
      !hasBackground && variant === 'green' && "bg-[#016936]"
    )}>
      {/* Background Image */}
      {hasBackground && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay for contrast */}
          <div className={cn(
            "absolute inset-0",
            variant === 'light' && "bg-white/35",
            variant === 'dark' && "bg-[#1d1d1f]/75",
            variant === 'green' && "bg-[#016936]/35"
          )} />
        </>
      )}

      <div className="relative max-w-[1176px] mx-auto px-6">
        <div className={cn(
          hasExecutiveSummary ? "grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start" : ""
        )}>
          {/* Left column - Title */}
          <div ref={headerRef}>
            {badge && (
              <div className={cn(
                "hero-badge inline-block text-[11px] font-medium uppercase tracking-[0.15em] px-3 py-1.5 mb-8",
                variant === 'light'
                  ? "bg-[#016936] text-white"
                  : "bg-white/20 text-white"
              )}>
                {badge}
              </div>
            )}

            <h1 className={cn(
              "hero-title text-[40px] md:text-[52px] lg:text-[60px] font-semibold leading-[1.1] tracking-tight mb-6",
              variant === 'light' ? "text-[#1d1d1f]" : "text-white",
              "[&_em]:font-normal [&_em]:italic [&_em]:text-[#2a9d5c]"
            )}>
              {title}
            </h1>

            <p className={cn(
              "hero-lead text-[18px] md:text-[22px] leading-relaxed max-w-[500px]",
              variant === 'light' ? "text-[#6e6e73]" : "text-white/60"
            )}>
              {lead}
            </p>
          </div>

          {/* Right column - Executive Summary */}
          {hasExecutiveSummary && (
            <div ref={summaryRef} className="bg-[#f5f5f7] p-8 border-t-[3px] border-[#016936]">
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-8">
                Resumen ejecutivo
              </h2>

              <div className="space-y-6">
                {executiveSummary.map((item, index) => (
                  <div key={index} className="summary-item flex gap-4">
                    <span className="text-[18px] font-normal text-[#016936] flex-shrink-0">
                      {item.number}.
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-[#6e6e73] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
