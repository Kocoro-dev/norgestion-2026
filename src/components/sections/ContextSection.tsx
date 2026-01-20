'use client'

interface Stat {
  value: string
  label: string
}

interface ContextSectionProps {
  label: string
  title: string
  stats: Stat[]
  callout: {
    text: string
    highlight?: string
  }
}

export function ContextSection({
  label,
  title,
  stats,
  callout
}: ContextSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-[#f5f5f7]">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Label */}
        <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#016936] mb-4">
          {label}
        </div>

        {/* Title */}
        <h2 className="text-[28px] md:text-[36px] font-semibold text-[#1d1d1f] leading-tight mb-12">
          {title}
        </h2>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-[48px] md:text-[64px] font-extralight text-[#1d1d1f] leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[13px] text-[#6e6e73] leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Callout Box */}
        <div className="border-l-[3px] border-[#016936] bg-white py-6 px-8">
          <p className="text-[14px] md:text-[15px] text-[#1d1d1f] leading-relaxed">
            {callout.text}
            {callout.highlight && (
              <strong className="font-semibold"> {callout.highlight}</strong>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
