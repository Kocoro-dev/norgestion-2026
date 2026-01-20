interface Quarter {
  label: string
  months: string
  items: string[]
}

interface RoadmapSectionProps {
  label: string
  title: string
  description: string
  quarters: Quarter[]
}

export function RoadmapSection({ label, title, description, quarters }: RoadmapSectionProps) {
  return (
    <section id="roadmap" className="py-20 md:py-28 bg-[#11191C]">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#016936] mb-3 block">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quarters.map((quarter, index) => (
            <div key={index} className="bg-white/5 p-6">
              <div className="mb-6">
                <span className="text-2xl font-semibold text-[#016936] block">
                  {quarter.label}
                </span>
                <span className="text-sm text-white/60">
                  {quarter.months}
                </span>
              </div>
              <ul className="space-y-3">
                {quarter.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-white/80 flex items-start gap-2">
                    <span className="text-[#016936] mt-1">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
