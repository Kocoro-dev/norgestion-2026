'use client'

interface Metric {
  value: string
  unit?: string
  title: string
  description: string
}

interface MetricsSectionProps {
  label: string
  title: string
  description: string
  metrics: Metric[]
}

export function MetricsSection({ label, title, description, metrics }: MetricsSectionProps) {
  return (
    <section id="metricas" className="py-20 md:py-28 bg-[#F5F5F7]">
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

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white p-6 flex gap-6 items-start">
                <div className="flex-shrink-0 text-right min-w-[100px]">
                  <span className="text-4xl font-semibold text-[#016936]">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-lg text-[#016936] ml-1">
                      {metric.unit}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-[#11191C] mb-2">
                    {metric.title}
                  </h4>
                  <p className="text-sm text-[#666666]">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8">
            <h4 className="font-semibold text-[#11191C] mb-6">
              Origen del tráfico
            </h4>
            <div className="flex items-center justify-center h-[200px] mb-6">
              {/* Simple visual representation */}
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#016936"
                    strokeWidth="20"
                    strokeDasharray={`${65 * 2.51} ${100 * 2.51}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-[#11191C]">65%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#016936]" />
                <span className="text-sm text-[#666666]">Buscan soluciones (65%)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#E5E5E5]" />
                <span className="text-sm text-[#666666]">Buscan "Norgestion" (35%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
