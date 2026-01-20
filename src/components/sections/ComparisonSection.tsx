'use client'

interface ComparisonItem {
  label: string
  description: string
}

interface ComparisonSectionProps {
  label: string
  title: string
  description: string
  negative: {
    title: string
    subtitle: string
    items: ComparisonItem[]
  }
  positive: {
    title: string
    subtitle: string
    items: ComparisonItem[]
  }
  conclusion: React.ReactNode
}

export function ComparisonSection({
  label,
  title,
  description,
  negative,
  positive,
  conclusion,
}: ComparisonSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-[#f5f5f7]">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[14px] font-medium uppercase tracking-[0.15em] text-[#016936] mb-4">
            {label}
          </div>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-[#1d1d1f] leading-tight mb-3">
            {title}
          </h2>
          <p className="text-[20px] text-[#6e6e73] max-w-[700px]">
            {description}
          </p>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {/* Negative - Traditional model */}
          <div className="bg-white">
            <div className="h-1 bg-[#86868b]" />
            <div className="p-6 md:p-8">
              <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-1">
                {negative.title}
              </h3>
              <p className="text-[15px] text-[#6e6e73] mb-6">
                {negative.subtitle}
              </p>
              <ul className="space-y-4">
                {negative.items.map((item, index) => (
                  <li key={index}>
                    <div className="text-[15px] font-medium text-[#1d1d1f] mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[15px] text-[#6e6e73]">
                      {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Positive - NORGESTION model */}
          <div className="bg-white">
            <div className="h-1 bg-[#016936]" />
            <div className="p-6 md:p-8">
              <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-1">
                {positive.title}
              </h3>
              <p className="text-[15px] text-[#6e6e73] mb-6">
                {positive.subtitle}
              </p>
              <ul className="space-y-4">
                {positive.items.map((item, index) => (
                  <li key={index}>
                    <div className="text-[15px] font-medium text-[#016936] mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[15px] text-[#6e6e73]">
                      {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <p className="text-[16px] text-[#6e6e73] leading-relaxed max-w-[700px] [&_strong]:text-[#1d1d1f] [&_strong]:font-semibold">
          {conclusion}
        </p>
      </div>
    </section>
  )
}
