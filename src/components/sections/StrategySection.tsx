interface VerticalItem {
  title: string
  description: string
}

interface StrategyCard {
  number: string
  title: string
  description: string
  details: React.ReactNode
  objective: string
}

interface StrategySectionProps {
  label: string
  title: string
  description: string
  strategies: StrategyCard[]
}

export function StrategySection({ label, title, description, strategies }: StrategySectionProps) {
  return (
    <section id="estrategia" className="py-20 md:py-28">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#016936] mb-3 block">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#11191C] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-[#F5F5F7] p-8">
              <span className="text-xs font-semibold text-[#016936] mb-4 block">
                {strategy.number}
              </span>
              <h3 className="text-xl font-semibold text-[#11191C] mb-2">
                {strategy.title}
              </h3>
              <p className="text-[#666666] mb-6">
                {strategy.description}
              </p>
              <div className="mb-6 text-sm">
                {strategy.details}
              </div>
              <p className="text-sm text-[#666666] border-t border-[#E5E5E5] pt-4">
                <strong className="text-[#11191C]">Objetivo:</strong> {strategy.objective}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Helper component for vertical items
export function VerticalList({ items }: { items: VerticalItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index}>
          <strong className="text-[#11191C]">{item.title}</strong>
          <p className="text-[#666666]">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

// Helper component for list items
export function StrategyList({ intro, items }: { intro?: string; items: string[] }) {
  return (
    <div>
      {intro && <p className="text-[#666666] mb-3">{intro}</p>}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-[#666666]">
            <span className="text-[#016936]">+</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
