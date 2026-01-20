'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Insight {
  title: string
  description: string
}

interface RankingSectionProps {
  label: string
  title: string
  subtitle: string
  variant: 'pages' | 'visibility'
  data: Array<{
    name: string
    value: number
  }>
  insights: Insight[]
  disclaimer?: string
}

// Format large numbers with dots
function formatNumber(num: number): string {
  return num.toLocaleString('es-ES')
}

// Insight Card Component
function InsightCard({ title, description }: Insight) {
  return (
    <div className="bg-[#0d1214] border border-white/[0.06] p-6 hover:border-[#016936]/30 transition-all duration-300">
      <h4 className="text-[16px] font-semibold text-white mb-3">
        {title}
      </h4>
      <p
        className="text-[15px] text-white/60 leading-relaxed [&_strong]:text-[#2a9d5c] [&_strong]:font-medium"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}

// Comparison Bar for visual representation
function ComparisonBar({ value, maxValue }: { value: number; maxValue: number }) {
  const percentage = (value / maxValue) * 100
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#016936] to-[#2a9d5c] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[14px] text-white/70 font-medium tabular-nums w-20 text-right">
        {formatNumber(value)}
      </span>
    </div>
  )
}

export function RankingSection({
  label,
  title,
  subtitle,
  variant,
  data,
  insights,
  disclaimer,
}: RankingSectionProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  const columnHeaders = variant === 'pages'
    ? { name: 'Página', value: 'Visitas' }
    : { name: 'Landing Page', value: 'Impresiones' }

  return (
    <section className="py-16 md:py-24 bg-[#11191C]">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[14px] font-medium uppercase tracking-[0.15em] text-[#86868b] mb-4">
            {label}
          </div>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-white leading-tight mb-3">
            {title}
          </h2>
          <p className="text-[20px] text-white/60 max-w-[700px]">
            {subtitle}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
          {/* Left Column - Table */}
          <div>
            <div className="border border-white/[0.06] max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-[#11191C] z-10">
                  <TableRow className="border-white/[0.06] hover:bg-transparent">
                    <TableHead className="text-white/40 text-[13px] font-medium uppercase tracking-wider py-4 pl-6">
                      {columnHeaders.name}
                    </TableHead>
                    <TableHead className="text-white/40 text-[13px] font-medium uppercase tracking-wider py-4 pr-6 text-right">
                      {columnHeaders.value}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow
                      key={index}
                      className="border-white/[0.06] hover:bg-[#016936]/[0.08] transition-all duration-300"
                    >
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <span className="text-[12px] font-medium text-[#2a9d5c] bg-[#0d3d2a] px-2 py-0.5 flex-shrink-0">
                            #{index + 1}
                          </span>
                          <span className="text-white/70 text-[15px]">
                            {item.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 pr-6">
                        <ComparisonBar value={item.value} maxValue={maxValue} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Right Column - Insights */}
          <div>
            <h3 className="text-[22px] md:text-[26px] font-medium text-white mb-6">
              Hallazgos Clave
            </h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        {disclaimer && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-[14px] text-white/30 leading-relaxed italic">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
