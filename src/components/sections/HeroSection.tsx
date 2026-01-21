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
  layout?: 'default' | 'centered'
  subtitle?: string
}

export function HeroSection({
  badge,
  title,
  lead,
  variant = 'light',
  executiveSummary,
  backgroundImage,
  layout = 'default',
  subtitle
}: HeroSectionProps) {
  const hasExecutiveSummary = executiveSummary && executiveSummary.length > 0
  const headerRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const hasBackground = !!backgroundImage
  const isCentered = layout === 'centered'

  useEffect(() => {
    const header = headerRef.current
    const summary = summaryRef.current

    if (header) {
      const badge = header.querySelector('.hero-badge')
      const titleEl = header.querySelector('.hero-title')
      const subtitleEl = header.querySelector('.hero-subtitle')
      const leadEl = header.querySelector('.hero-lead')
      const decorator = header.querySelector('.hero-decorator')

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      if (badge) {
        gsap.set(badge, { opacity: 0, y: 15 })
        tl.to(badge, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      }

      if (decorator) {
        gsap.set(decorator, { scaleX: 0 })
        tl.to(decorator, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 0.2)
      }

      if (titleEl) {
        gsap.set(titleEl, { opacity: 0, y: 30 })
        tl.to(titleEl, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
      }

      if (subtitleEl) {
        gsap.set(subtitleEl, { opacity: 0, y: 20 })
        tl.to(subtitleEl, { opacity: 1, y: 0, duration: 0.7 }, 0.5)
      }

      if (leadEl) {
        gsap.set(leadEl, { opacity: 0, y: 20 })
        tl.to(leadEl, { opacity: 1, y: 0, duration: 0.7 }, 0.6)
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

  // Centered editorial layout
  if (isCentered) {
    return (
      <header className={cn(
        "relative min-h-[85vh] flex items-center justify-center overflow-hidden",
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
            {/* Gradient overlay for editorial depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </>
        )}

        <div ref={headerRef} className="relative max-w-[1176px] mx-auto px-6 text-center py-20">
          {/* Badge */}
          {badge && (
            <div className="hero-badge inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 mb-10">
              {badge}
            </div>
          )}

          {/* Decorative line */}
          <div className="hero-decorator w-16 h-[2px] bg-[#2a9d5c] mx-auto mb-10 origin-center" />

          {/* Main Title - Large editorial style */}
          <h1 className={cn(
            "hero-title text-[48px] md:text-[64px] lg:text-[80px] font-light leading-[1.05] tracking-tight mb-6",
            "text-white",
            "[&_em]:font-normal [&_em]:italic [&_em]:text-[#2a9d5c]"
          )}>
            {title}
          </h1>

          {/* Subtitle if provided */}
          {subtitle && (
            <p className="hero-subtitle text-[20px] md:text-[24px] font-light text-white/80 tracking-wide mb-8">
              {subtitle}
            </p>
          )}

          {/* Lead text */}
          <p className="hero-lead text-[17px] md:text-[19px] leading-relaxed text-white/50 max-w-[600px] mx-auto">
            {lead}
          </p>

          {/* Bottom decorative element */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#2a9d5c]/60" />
            <div className="w-2 h-2 rounded-full bg-[#2a9d5c]/40" />
            <div className="w-2 h-2 rounded-full bg-[#2a9d5c]/20" />
          </div>
        </div>
      </header>
    )
  }

  // Default layout
  return (
    <header className={cn(
      "relative overflow-hidden",
      hasExecutiveSummary
        ? "pt-32 pb-16 md:pt-40 md:pb-24"
        : "min-h-[90vh] flex items-center py-32 md:py-40",
      !hasBackground && variant === 'light' && "bg-white",
      !hasBackground && variant === 'dark' && "bg-[#0a0a0a]",
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
          {/* Premium gradient overlay */}
          <div className={cn(
            "absolute inset-0",
            variant === 'light' && "bg-gradient-to-r from-white/90 via-white/70 to-white/40",
            variant === 'dark' && "bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]/50",
            variant === 'green' && "bg-gradient-to-r from-[#016936]/90 via-[#016936]/70 to-[#016936]/40"
          )} />
        </>
      )}

      <div className="relative w-full max-w-[1176px] mx-auto px-6">
        <div className={cn(
          hasExecutiveSummary ? "grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start" : "w-[75%]"
        )}>
          {/* Left column - Title */}
          <div ref={headerRef}>
            {badge && (
              <div className={cn(
                "hero-badge inline-block text-[11px] font-medium uppercase tracking-[0.2em] px-4 py-2 mb-10",
                variant === 'light'
                  ? "bg-[#016936] text-white"
                  : "bg-white/10 text-white/80 backdrop-blur-sm border border-white/10"
              )}>
                {badge}
              </div>
            )}

            <h1 className={cn(
              "hero-title text-[44px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.08] tracking-[-0.02em] mb-8",
              variant === 'light' ? "text-[#1d1d1f]" : "text-white",
              "[&_em]:font-normal [&_em]:italic [&_em]:text-[#2a9d5c]"
            )}>
              {title}
            </h1>

            <p className={cn(
              "hero-lead text-[19px] md:text-[21px] leading-[1.5] font-normal",
              hasExecutiveSummary ? "max-w-[520px]" : "max-w-[580px]",
              variant === 'light' ? "text-[#6e6e73]" : "text-white/60"
            )}>
              {lead}
            </p>
          </div>

          {/* Right column - Executive Summary */}
          {hasExecutiveSummary && (
            <div ref={summaryRef} className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/50">
              <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-8 tracking-[-0.01em]">
                Resumen ejecutivo
              </h2>

              <div className="space-y-6">
                {executiveSummary.map((item, index) => (
                  <div key={index} className="summary-item flex gap-4">
                    <span className="text-[17px] font-medium text-[#016936] flex-shrink-0">
                      {item.number}.
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-1 tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <p className="text-[14px] text-[#6e6e73] leading-[1.5]">
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
