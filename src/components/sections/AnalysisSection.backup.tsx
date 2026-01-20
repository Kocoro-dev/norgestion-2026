'use client'

interface StatCard {
  value: string
  label: string
}

interface TrafficSource {
  name: string
  percentage: number
  color: string
}

interface CountryData {
  country: string
  sessions: number
}

interface AnalysisSectionProps {
  label: string
  title: string
  subtitle?: string
  disclaimer?: string
}

function DonutChart({ data }: { data: TrafficSource[] }) {
  // Calculate the stroke-dasharray for each segment
  const total = data.reduce((sum, item) => sum + item.percentage, 0)
  let cumulative = 0

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#1d1d1f"
          strokeWidth="3"
        />
        {data.map((item, index) => {
          const dashArray = (item.percentage / total) * 100
          const dashOffset = 100 - cumulative
          cumulative += dashArray

          return (
            <circle
              key={index}
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke={item.color}
              strokeWidth="3"
              strokeDasharray={`${dashArray} ${100 - dashArray}`}
              strokeDashoffset={dashOffset}
              className="transition-all duration-500"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-[28px] font-light text-[#1d1d1f]">61%</span>
          <span className="block text-[12px] text-[#6e6e73]">Google</span>
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-[14px] text-[#6e6e73]">{label}</span>
        <span className="text-[14px] font-medium text-[#1d1d1f]">{value}%</span>
      </div>
      <div className="h-2 bg-[#d2d2d7] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#016936] rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function AnalysisSection({
  label,
  title,
  subtitle,
  disclaimer
}: AnalysisSectionProps) {
  const trafficSources: TrafficSource[] = [
    { name: 'Organic Search', percentage: 61, color: '#016936' },
    { name: 'Direct', percentage: 31.1, color: '#2a9d5c' },
    { name: 'Referral', percentage: 4, color: '#6e6e73' },
    { name: 'Social', percentage: 2, color: '#86868b' },
    { name: 'Otros', percentage: 1.9, color: '#d2d2d7' },
  ]

  const countryData: CountryData[] = [
    { country: 'España', sessions: 10668 },
    { country: 'Estados Unidos', sessions: 2316 },
    { country: 'China', sessions: 518 },
    { country: 'Alemania', sessions: 310 },
    { country: 'Francia', sessions: 239 },
    { country: 'Reino Unido', sessions: 200 },
  ]

  return (
    <section id="analisis" className="py-16 md:py-24 bg-[#EFF2F2]">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="text-[14px] font-medium uppercase tracking-[0.15em] text-[#016936] mb-4">
            {label}
          </div>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-[#1d1d1f] leading-tight mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[20px] text-[#6e6e73] max-w-[700px]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Block 1: Volumen de tráfico */}
        <div className="mb-20 pb-20 border-b border-[#d2d2d7]">
          <div className="grid md:grid-cols-[1fr_400px] gap-12 items-start">
            <div>
              <h3 className="text-[22px] md:text-[26px] font-medium text-[#1d1d1f] mb-3">
                Volumen de tráfico y visibilidad
              </h3>
              <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-8">
                El ecosistema digital de NORGESTION ha generado un volumen significativo de tráfico cualificado durante 2025,
                consolidando su presencia en el mercado de M&A y Corporate Finance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 border-l-[3px] border-[#016936]">
                <div className="text-[36px] md:text-[42px] font-light text-[#1d1d1f] leading-none mb-2">
                  15.760
                </div>
                <div className="text-[14px] text-[#6e6e73]">
                  Sesiones en la web
                </div>
              </div>
              <div className="bg-white p-6 border-l-[3px] border-[#016936]">
                <div className="text-[36px] md:text-[42px] font-light text-[#1d1d1f] leading-none mb-2">
                  308.715
                </div>
                <div className="text-[14px] text-[#6e6e73]">
                  Impresiones en Google
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2: Calidad del tráfico */}
        <div className="mb-20 pb-20 border-b border-[#d2d2d7]">
          <div className="grid md:grid-cols-[1fr_400px] gap-12 items-start">
            <div>
              <h3 className="text-[22px] md:text-[26px] font-medium text-[#1d1d1f] mb-3">
                Calidad del tráfico
              </h3>
              <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-6">
                Los indicadores de comportamiento confirman que estamos llegando al público adecuado
                y ofreciéndoles una experiencia web efectiva. El tiempo de permanencia y el nivel de
                interacción superan ampliamente las medias del sector.
              </p>
              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-[32px] font-light text-[#1d1d1f]">2:26</span>
                    <span className="text-[16px] font-medium text-[#1d1d1f]">Tiempo medio de sesión</span>
                  </div>
                  <p className="text-[15px] text-[#6e6e73]">
                    Los visitantes dedican más de 2 minutos explorando el contenido, lo que indica interés real.
                    <span className="text-[#86868b]"> La media del sector se sitúa aproximadamente en 45-60 segundos.</span>
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-[32px] font-light text-[#1d1d1f]">53%</span>
                    <span className="text-[16px] font-medium text-[#1d1d1f]">Ratio de engagement</span>
                  </div>
                  <p className="text-[15px] text-[#6e6e73]">
                    Más de la mitad de los visitantes interactúan activamente: navegan, exploran servicios, hacen clic.
                    <span className="text-[#86868b]"> La media del sector ronda el 30-40%.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8">
              <h4 className="text-[14px] font-medium text-[#6e6e73] uppercase tracking-wider mb-6">
                Comparativa con el sector
              </h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[14px] text-[#1d1d1f]">Tiempo en sitio</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-[#EFF2F2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#016936] rounded-full" style={{ width: '85%' }} />
                    </div>
                    <span className="text-[14px] font-medium text-[#016936] w-16 text-right">2:26</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 h-3 bg-[#EFF2F2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#d2d2d7] rounded-full" style={{ width: '30%' }} />
                    </div>
                    <span className="text-[14px] text-[#86868b] w-16 text-right">~0:50</span>
                  </div>
                  <div className="flex justify-between mt-1 text-[12px] text-[#86868b]">
                    <span>NORGESTION</span>
                    <span>Media sector*</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[14px] text-[#1d1d1f]">Engagement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-[#EFF2F2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#016936] rounded-full" style={{ width: '53%' }} />
                    </div>
                    <span className="text-[14px] font-medium text-[#016936] w-16 text-right">53%</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 h-3 bg-[#EFF2F2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#d2d2d7] rounded-full" style={{ width: '35%' }} />
                    </div>
                    <span className="text-[14px] text-[#86868b] w-16 text-right">~35%</span>
                  </div>
                  <div className="flex justify-between mt-1 text-[12px] text-[#86868b]">
                    <span>NORGESTION</span>
                    <span>Media sector*</span>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-[#86868b] mt-6">
                *Medias aproximadas del sector servicios profesionales B2B
              </p>
            </div>
          </div>
        </div>

        {/* Block 3: Fuentes de tráfico */}
        <div className="mb-20 pb-20 border-b border-[#d2d2d7]">
          <div className="grid md:grid-cols-[1fr_400px] gap-12 items-start">
            <div>
              <h3 className="text-[22px] md:text-[26px] font-medium text-[#1d1d1f] mb-3">
                Fuentes de tráfico
              </h3>
              <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-8">
                El análisis de las fuentes de tráfico revela la fortaleza del posicionamiento orgánico
                y la capacidad de captación de nuevos clientes potenciales.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-[28px] font-light text-[#016936] leading-none">61%</div>
                  <div>
                    <div className="text-[16px] font-medium text-[#1d1d1f] mb-1">Tráfico desde Google</div>
                    <p className="text-[15px] text-[#6e6e73]">
                      La mayoría de visitantes llegan a través de búsquedas en Google,
                      validando la inversión en posicionamiento SEO.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-[28px] font-light text-[#016936] leading-none">65%</div>
                  <div>
                    <div className="text-[16px] font-medium text-[#1d1d1f] mb-1">Búsquedas sin marca</div>
                    <p className="text-[15px] text-[#6e6e73]">
                      Del tráfico de Google, el 65% proviene de consultas que no incluyen "NORGESTION".
                      Son usuarios nuevos buscando soluciones de M&A.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-[28px] font-light text-[#016936] leading-none">1/3</div>
                  <div>
                    <div className="text-[16px] font-medium text-[#1d1d1f] mb-1">Captación de nuevos clientes</div>
                    <p className="text-[15px] text-[#6e6e73]">
                      1 de cada 3 visitantes llega desde Google sin buscar la marca.
                      Son potenciales clientes que no conocían NORGESTION.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8">
              <h4 className="text-[14px] font-medium text-[#6e6e73] uppercase tracking-wider mb-6">
                Distribución por canal
              </h4>
              <DonutChart data={trafficSources} />
              <div className="mt-8 space-y-3">
                {trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-[14px] text-[#6e6e73]">{source.name}</span>
                    </div>
                    <span className="text-[14px] font-medium text-[#1d1d1f]">{source.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Block 4: Internacional */}
        <div className="mb-8">
          <div className="grid md:grid-cols-[1fr_400px] gap-12 items-start">
            <div>
              <h3 className="text-[22px] md:text-[26px] font-medium text-[#1d1d1f] mb-3">
                Alcance internacional
              </h3>
              <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-6">
                La web de NORGESTION atrae tráfico significativo desde mercados internacionales,
                actuando como escaparate para inversores extranjeros interesados en el mercado español.
              </p>
              <div className="flex items-start gap-4">
                <div className="text-[28px] font-light text-[#016936] leading-none">+20%</div>
                <div>
                  <div className="text-[16px] font-medium text-[#1d1d1f] mb-1">Tráfico internacional</div>
                  <p className="text-[15px] text-[#6e6e73]">
                    Más del 20% de las sesiones provienen de fuera de España, principalmente de
                    Estados Unidos, Alemania, Francia y Reino Unido — mercados clave para operaciones cross-border.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8">
              <h4 className="text-[14px] font-medium text-[#6e6e73] uppercase tracking-wider mb-6">
                Sesiones por país
              </h4>
              <div className="space-y-0">
                {countryData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-3 ${index > 0 ? 'border-t border-[#EFF2F2]' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] text-[#86868b] w-5">{index + 1}.</span>
                      <span className="text-[15px] text-[#1d1d1f]">{item.country}</span>
                    </div>
                    <span className="text-[15px] font-medium text-[#1d1d1f]">
                      {item.sessions.toLocaleString('es-ES')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#d2d2d7]">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#6e6e73]">Tráfico internacional</span>
                  <span className="text-[15px] font-medium text-[#016936]">32%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        {disclaimer && (
          <div className="mt-12 pt-8 border-t border-[#d2d2d7]">
            <p className="text-[14px] text-[#86868b] leading-relaxed">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
