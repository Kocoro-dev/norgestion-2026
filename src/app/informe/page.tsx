import { Navbar, Footer } from '@/components/layout'
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
  { label: 'Vista general', href: '#analisis' },
  { label: 'Posicionamiento y Rankings', href: '#liderazgo' },
  { label: 'LinkedIn Corporativo', href: '#linkedin' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Entorno competitivo', href: '#competitivo' },
]

export default function InformePage() {
  // Get all keywords in Top 5 positions
  const allKeywords = getSortedKeywords()

  return (
    <>
      <Navbar items={navItems} />

      <main id="pdf-content">
        {/* Hero */}
        <HeroSection
          badge="Informe de resultados"
          title={<>Análisis del<br /><em>Ecosistema Digital</em><br />2025</>}
          lead="Evaluación del rendimiento de la estrategia digital y el posicionamiento de NORGESTION en los mercados de Corporate Finance, Interim Management y Asesoramiento Jurídico-Fiscal."
          variant="light"
          executiveSummary={[
            {
              number: '01',
              title: 'Liderazgo Digital',
              description: 'Dominio en búsquedas de alto valor en Google y creciente presencia en resultados de IA generativa.',
            },
            {
              number: '02',
              title: 'Validación de Originación',
              description: 'Aumento sostenido de contactos comerciales orgánicos generados a través del canal digital.',
            },
            {
              number: '03',
              title: 'Proyección Internacional',
              description: 'La web actúa como escaparate para inversores extranjeros interesados en el middle market español.',
            },
          ]}
        />

        {/* Analysis */}
        <AnalysisSection
          label="01 — Vista general de datos"
          title="Salud del ecosistema digital"
          subtitle="Análisis del rendimiento web y los indicadores clave que demuestran la calidad del tráfico y el posicionamiento de NORGESTION."
          disclaimer="Todos los datos han sido obtenidos de Google Analytics y Google Search Console. Representan datos acumulados de los últimos 3 meses. Las comparativas con el sector son aproximadas y se basan en benchmarks de servicios profesionales B2B."
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
          disclaimer="Los datos de posicionamiento se han obtenido de SEMrush y Google Search Console para garantizar la solidez de los resultados. No obstante, los resultados actuales podrían diferir de los aquí mostrados."
        />

        {/* Ranking por Página */}
        <RankingSection
          label="02.1 — Tráfico Real"
          title="Ranking por Página: Interés del Usuario"
          subtitle="Las páginas más visitadas dentro del ecosistema digital de NORGESTION."
          variant="pages"
          data={pageRankings.map(p => ({ name: p.title, value: p.views }))}
          insights={pageRankingInsights}
          disclaimer="Datos obtenidos de Google Analytics. Representan el volumen de visitas acumulado en los últimos 3 meses."
        />

        {/* Ranking de Visibilidad SEO */}
        <RankingSection
          label="02.2 — Visibilidad SEO"
          title="Ranking de Visibilidad en Google"
          subtitle="Páginas con mayor volumen de impresiones (visualizaciones) en los resultados de búsqueda de Google."
          variant="visibility"
          data={visibilityRankings.map(v => ({ name: v.page, value: v.impressions }))}
          insights={visibilityRankingInsights}
          disclaimer="Datos obtenidos de Google Search Console. Las impresiones representan el número de veces que la página apareció en resultados de búsqueda en los últimos 3 meses."
        />

        {/* LinkedIn */}
        <LinkedInSection
          label="03 — LinkedIn Corporativo"
          title="Ecosistema Social"
          subtitle="Rendimiento del canal corporativo y validación de la estrategia de Thought Leadership."
          disclaimer="Datos obtenidos de LinkedIn Analytics. Representan métricas acumuladas del último trimestre."
        />

        {/* Impact */}
        <ImpactSection
          label="04 — Impacto en Negocio"
          title="Activación de la Originación Digital"
          subtitle="Evolución del canal web: de portal corporativo a fuente activa de contactos comerciales y captación de talento."
          disclaimer="Datos agregados del formulario de contacto web durante 2025. La categorización se realiza en base al contenido del mensaje recibido. La información se analiza respetando la privacidad de datos y con fines exclusivamente analíticos; ningún dato personal es almacenado por nosotros."
        />

        {/* Competitive Environment */}
        <CompetitiveSection
          label="05 — Entorno Competitivo"
          title="Entorno Competitivo"
          subtitle="Análisis de la respuesta del mercado y evaluación de la ventaja estructural frente a competidores directos."
        />

        {/* CTA - PDF Download */}
        <CTASection
          title="Descargar Informe"
          description="Genera un PDF con el contenido de este informe."
          buttonText="Descargar PDF Visual"
          mode="pdf"
          pdfTargetId="pdf-content"
          pdfFilename="NORGESTION-Informe-Ecosistema-Digital-2025.pdf"
          variant="light"
        />
      </main>

      <Footer />
    </>
  )
}
