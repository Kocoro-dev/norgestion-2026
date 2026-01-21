'use client'

import { Navbar, Footer } from '@/components/layout'
import { PasswordProtection } from '@/components/PasswordProtection'
import {
  HeroSection,
  AnalysisSection,
  LeadershipSection,
  RankingSection,
  LinkedInSection,
  ImpactSection,
  CompetitiveSection,
  CTASection,
} from '@/components/sections'
import {
  getSortedKeywords,
  generalKeywords,
  techKeywords,
  geoKeywords,
  internationalKeywords,
} from '@/data/keywords'
import {
  pageRankings,
  visibilityRankings,
  pageRankingInsights,
  visibilityRankingInsights,
} from '@/data/rankings'

const navItems = [
  { label: 'General', href: '#analisis' },
  { label: 'Posicionamiento', href: '#liderazgo' },
  { label: 'LinkedIn', href: '#linkedin' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Competencia', href: '#competitivo' },
]

export default function InformePage() {
  // Get all keywords in Top 5 positions
  const allKeywords = getSortedKeywords()

  return (
    <PasswordProtection
      storageKey="norgestion-informe-access"
      password="NOR2026"
      backgroundImage="/images/hero-bg-2-hd.png"
    >
      <Navbar items={navItems} />

      <main id="pdf-content">
        {/* Hero */}
        <HeroSection
          badge="Informe de resultados"
          title={<>Análisis de la<br /><em>Estrategia Digital</em><br />2025</>}
          lead="Evaluación del rendimiento de la estrategia digital y el posicionamiento de NORGESTION en los mercados de Corporate Finance, M&A, Advisory & Interim Management y Asesoramiento Jurídico-Fiscal."
          variant="dark"
          backgroundImage="/images/hero-bg-2-hd.png"
          executiveSummary={[
            {
              number: '01',
              title: 'Liderazgo digital',
              description: 'Dominio en búsquedas de alto valor en Google y creciente presencia en resultados de IA generativa.',
            },
            {
              number: '02',
              title: 'Validación de originación',
              description: 'Aumento sostenido de contactos comerciales orgánicos generados a través del canal digital.',
            },
            {
              number: '03',
              title: 'Proyección internacional',
              description: 'La web actúa como escaparate para personas extranjeras interesadas en el middle market español.',
            },
          ]}
        />

        {/* Analysis */}
        <AnalysisSection
          label="01 — Vista general de datos"
          title="Análisis del tráfico web"
          subtitle="Análisis del rendimiento web y los indicadores clave que demuestran la calidad del tráfico y el posicionamiento de NORGESTION."
          disclaimer="Todos los datos han sido obtenidos de Google Analytics y Google Search Console. Representan datos acumulados de los últimos 3 meses."
        />

        {/* Leadership */}
        <LeadershipSection
          label="02 — Posicionamiento"
          title="Liderazgo en buscadores"
          description="El 90% de los clics en Google van a los primeros 5 resultados. NORGESTION domina las búsquedas estratégicas del sector."
          stats={[
            { value: '50+', label: 'Keywords en #1' },
            { value: '130+', label: 'Keywords en Top 5' },
            { value: '0€', label: 'Inversión en Google Ads' },
          ]}
          generalKeywords={generalKeywords}
          techKeywords={techKeywords}
          geoKeywords={geoKeywords}
          internationalKeywords={internationalKeywords}
          allKeywords={allKeywords}
          disclaimer="Datos absolutos de SEMrush cruzados con posiciones medias oficiales ofrecidas por Google Search Console para garantizar la solidez de los resultados. No obstante, los resultados actuales podrían diferir de los aquí mostrados."
        />

        {/* Ranking por Página */}
        <RankingSection
          label="02.1 — Tráfico real"
          title="Ranking por páginas: interés del usuario"
          subtitle="Las páginas más visitadas dentro de la web de NORGESTION."
          variant="pages"
          data={pageRankings.map(p => ({ name: p.title, value: p.views }))}
          insights={pageRankingInsights}
          disclaimer="Datos obtenidos de Google Analytics. Representan el volumen de visitas acumulado en los últimos 3 meses."
        />

        {/* Ranking de Visibilidad SEO */}
        <RankingSection
          label="02.2 — Visibilidad SEO"
          title="Ranking de visibilidad en Google"
          subtitle="Páginas con mayor volumen de impresiones (visualizaciones) en los resultados de búsqueda de Google."
          variant="visibility"
          data={visibilityRankings.map(v => ({ name: v.page, value: v.impressions }))}
          insights={visibilityRankingInsights}
          disclaimer="Datos obtenidos de Google Search Console. Las impresiones representan el número de veces que la página apareció en resultados de búsqueda en los últimos 3 meses."
        />

        {/* LinkedIn */}
        <LinkedInSection
          label="03 — LinkedIn corporativo"
          title="Escaparate social"
          subtitle="Rendimiento del canal corporativo y validación de la estrategia de contenidos."
          disclaimer="Datos obtenidos de LinkedIn Analytics. Representan métricas acumuladas del último trimestre."
        />

        {/* Impact */}
        <ImpactSection
          label="04 — Impacto en negocio"
          title="Activación de la originación digital"
          subtitle="Evolución del canal web: Aumento significativo en la generación activa de contactos comerciales en 2025."
          disclaimer="Datos agregados del formulario de contacto web durante 2025. La categorización se realiza en base al contenido del mensaje recibido. La información se analiza respetando la privacidad de datos y con fines exclusivamente analíticos; ningún dato personal es almacenado por nosotros."
        />

        {/* Competitive Environment */}
        <CompetitiveSection
          label="05 — Entorno competitivo"
          title="Respuesta del mercado"
          subtitle="Análisis de la reacción de los competidores y evaluación de la ventaja estructural."
        />

        {/* CTA - PDF Download (hidden in PDF) */}
        <div className="pdf-hide">
          <CTASection
            title="Descargar informe"
            description="Genera un PDF con el contenido de este informe."
            buttonText="Descargar PDF Visual"
            mode="pdf"
            pdfTargetId="pdf-content"
            pdfFilename="NORGESTION-Informe-Ecosistema-Digital-2025.pdf"
            variant="light"
          />
        </div>
      </main>

      <Footer />
    </PasswordProtection>
  )
}
