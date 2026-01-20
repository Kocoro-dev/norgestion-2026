import Link from 'next/link'

interface PricingFeature {
  title: string
  description: string
}

interface PricingNote {
  title: string
  description: string
}

interface PricingSectionProps {
  label: string
  title: string
  description: string
  price: {
    type: string
    value: string
    period: string
  }
  features: PricingFeature[]
  notes: PricingNote[]
  ctaText: string
  ctaHref: string
}

export function PricingSection({
  label,
  title,
  description,
  price,
  features,
  notes,
  ctaText,
  ctaHref,
}: PricingSectionProps) {
  return (
    <section id="inversion" className="py-20 md:py-28">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#016936] mb-3 block">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#11191C] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main pricing card */}
          <div className="lg:col-span-2 bg-[#F5F5F7] p-8">
            {/* Price header */}
            <div className="text-center mb-8 pb-8 border-b border-[#E5E5E5]">
              <span className="text-sm text-[#666666] block mb-2">
                {price.type}
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl text-[#666666]">€</span>
                <span className="text-6xl font-semibold text-[#11191C]">
                  {price.value}
                </span>
              </div>
              <span className="text-sm text-[#666666]">
                {price.period}
              </span>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index}>
                  <strong className="text-[#11191C] block mb-1">
                    {feature.title}
                  </strong>
                  <p className="text-sm text-[#666666]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={ctaHref}
              className="block w-full bg-[#016936] text-white text-center py-4 font-semibold text-sm hover:bg-[#015a2d] transition-colors"
            >
              {ctaText}
            </Link>
          </div>

          {/* Notes */}
          <div className="space-y-6">
            {notes.map((note, index) => (
              <div key={index} className="bg-white border border-[#E5E5E5] p-6">
                <h4 className="font-semibold text-[#11191C] mb-2">
                  {note.title}
                </h4>
                <p className="text-sm text-[#666666]">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
