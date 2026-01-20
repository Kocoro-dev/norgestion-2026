'use client'

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
}

export function HeroSection({
  badge,
  title,
  lead,
  variant = 'light',
  executiveSummary
}: HeroSectionProps) {
  const hasExecutiveSummary = executiveSummary && executiveSummary.length > 0

  return (
    <header className={cn(
      "pt-32 pb-16 md:pt-40 md:pb-24",
      variant === 'light' && "bg-white",
      variant === 'dark' && "bg-[#1d1d1f]",
      variant === 'green' && "bg-[#016936]"
    )}>
      <div className="max-w-[1176px] mx-auto px-6">
        <div className={cn(
          hasExecutiveSummary ? "grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start" : ""
        )}>
          {/* Left column - Title */}
          <div>
            {badge && (
              <div className={cn(
                "inline-block text-[11px] font-medium uppercase tracking-[0.15em] px-3 py-1.5 mb-8",
                variant === 'light'
                  ? "bg-[#016936] text-white"
                  : "bg-white/20 text-white"
              )}>
                {badge}
              </div>
            )}

            <h1 className={cn(
              "text-[40px] md:text-[52px] lg:text-[60px] font-semibold leading-[1.1] tracking-tight mb-6",
              variant === 'light' ? "text-[#1d1d1f]" : "text-white",
              "[&_em]:font-normal [&_em]:italic [&_em]:text-[#016936]",
              variant !== 'light' && "[&_em]:text-white/70"
            )}>
              {title}
            </h1>

            <p className={cn(
              "text-[18px] md:text-[22px] leading-relaxed max-w-[500px]",
              variant === 'light' ? "text-[#6e6e73]" : "text-white/60"
            )}>
              {lead}
            </p>
          </div>

          {/* Right column - Executive Summary */}
          {hasExecutiveSummary && (
            <div className="bg-[#f5f5f7] p-8 border-t-[3px] border-[#016936]">
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-8">
                Resumen Ejecutivo
              </h2>

              <div className="space-y-6">
                {executiveSummary.map((item, index) => (
                  <div key={index} className="flex gap-4">
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
