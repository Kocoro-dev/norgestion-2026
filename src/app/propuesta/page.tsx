import { Navbar, Footer } from '@/components/layout'
import {
  HeroSection,
  StrategySection,
  VerticalList,
  StrategyList,
  RoadmapSection,
  PricingSection,
  CTASection,
} from '@/components/sections'

const navItems = [
  { label: 'Estrategia', href: '#estrategia' },
  { label: 'Hoja de Ruta', href: '#roadmap' },
  { label: 'Inversión', href: '#inversion' },
]

export default function PropuestaPage() {
  return (
    <>
      <Navbar items={navItems} />

      <main>
        <HeroSection
          badge="Propuesta Estratégica"
          title={<>Consolidación y<br /><em>Expansión</em><br />2026</>}
          lead="Plan de trabajo para mantener el liderazgo digital y expandir el alcance a nuevos mercados y verticales."
          variant="green"
        />

        <StrategySection
          label="Estrategia"
          title="Líneas de trabajo 2026"
          description="Cuatro ejes estratégicos para consolidar el liderazgo y expandir el alcance."
          strategies={[
            {
              number: '01',
              title: 'Verticales Sectoriales',
              description: 'Posicionarse como experto en sectores específicos de alto valor.',
              details: (
                <VerticalList
                  items={[
                    {
                      title: 'Energía',
                      description: 'Operaciones en renovables, oil&gas, utilities. Sector en transformación con alta actividad M&A.',
                    },
                    {
                      title: 'Industria',
                      description: 'Empresas manufactureras, automoción, componentes. Consolidación sectorial en curso.',
                    },
                    {
                      title: 'Agroalimentario',
                      description: 'Bodegas, cooperativas, empresas alimentarias. Interés creciente de fondos internacionales.',
                    },
                    {
                      title: 'Audiovisual',
                      description: 'Productoras, distribuidoras, contenido digital. Sector en expansión.',
                    },
                  ]}
                />
              ),
              objective: 'Captar operaciones de clientes que buscan asesores especializados en su sector.',
            },
            {
              number: '02',
              title: 'Blindaje Geográfico',
              description: 'Dominar las búsquedas locales en mercados estratégicos.',
              details: (
                <StrategyList
                  intro="Crear páginas específicas para búsquedas geográficas:"
                  items={[
                    'M&A Valencia',
                    'Corporate Finance Sevilla',
                    'Venta empresa País Vasco',
                    'Reestructuración Galicia',
                  ]}
                />
              ),
              objective: 'Ser la primera opción cuando un empresario busca asesoramiento en su ciudad.',
            },
            {
              number: '03',
              title: 'Expansión Internacional',
              description: 'Captar operaciones cross-border e inversores extranjeros.',
              details: (
                <StrategyList
                  intro="Desarrollar estructura web en inglés optimizada para:"
                  items={[
                    'M&A advisor Spain',
                    'Sell company Spain',
                    'Spanish market entry',
                    'Tech M&A Spain',
                  ]}
                />
              ),
              objective: 'Posicionar a NORGESTION como puerta de entrada al mercado español.',
            },
            {
              number: '04',
              title: 'Autoridad y Reputación',
              description: 'Reforzar la credibilidad offline que impulsa el posicionamiento online.',
              details: (
                <StrategyList
                  items={[
                    'Presencia en medios especializados',
                    'Artículos de opinión en publicaciones del sector',
                    'Menciones en rankings y directorios',
                    'Participación en eventos del sector',
                  ]}
                />
              ),
              objective: 'Que las menciones externas refuercen la autoridad web.',
            },
          ]}
        />

        <RoadmapSection
          label="Hoja de Ruta"
          title="Calendario de ejecución"
          description="Distribución del trabajo a lo largo del año."
          quarters={[
            {
              label: 'Q1',
              months: 'Enero — Marzo',
              items: [
                'Auditoría de posiciones actuales',
                'Definición de verticales prioritarias',
                'Estructura de landings sectoriales',
                'Inicio vertical Energía',
              ],
            },
            {
              label: 'Q2',
              months: 'Abril — Junio',
              items: [
                'Lanzamiento vertical Industria',
                'Blindaje geográfico: Valencia, Sevilla',
                'Optimización de posiciones existentes',
                'Campaña de autoridad en medios',
              ],
            },
            {
              label: 'Q3',
              months: 'Julio — Septiembre',
              items: [
                'Vertical Agroalimentario',
                'Estructura internacional (inglés)',
                'Blindaje geográfico: Galicia, Aragón',
                'Análisis de competencia',
              ],
            },
            {
              label: 'Q4',
              months: 'Octubre — Diciembre',
              items: [
                'Vertical Audiovisual',
                'Consolidación internacional',
                'Optimización general',
                'Informe anual y planificación 2027',
              ],
            },
          ]}
        />

        <PricingSection
          label="Inversión"
          title="Propuesta económica"
          description="Cuota integral que incluye todos los servicios necesarios para ejecutar la estrategia."
          price={{
            type: 'Cuota Mensual',
            value: '[X]',
            period: 'al mes',
          }}
          features={[
            {
              title: 'Dirección Estratégica',
              description: 'Reuniones periódicas, análisis de competencia, ajuste de prioridades según objetivos de negocio.',
            },
            {
              title: 'Diseño y Desarrollo Web',
              description: 'Nuevas páginas, mejoras de experiencia de usuario, adaptación continua a dispositivos.',
            },
            {
              title: 'Posicionamiento SEO',
              description: 'Optimización técnica, creación de contenido estratégico, mejora continua de posiciones.',
            },
            {
              title: 'Gestión LinkedIn',
              description: 'Publicaciones para perfil corporativo y socios, interacción, crecimiento de audiencia.',
            },
            {
              title: 'Estrategia Internacional',
              description: 'Contenido en inglés, optimización para mercados extranjeros, captación internacional.',
            },
            {
              title: 'Soporte Tecnológico',
              description: 'Mantenimiento, seguridad, implementación de nuevas funcionalidades.',
            },
          ]}
          notes={[
            {
              title: 'ROI Estimado',
              description: 'Con un fee medio de operación de [X]€, la inversión anual se recupera con [X] operaciones originadas digitalmente.',
            },
            {
              title: 'Comparativa',
              description: 'La alternativa sería contratar una agencia externa (sin conocimiento del sector) o un equipo interno (mayor coste fijo).',
            },
            {
              title: 'Compromiso',
              description: 'Facturación mensual. Revisión trimestral de resultados y ajuste de prioridades.',
            },
          ]}
          ctaText="Aprobar Propuesta"
          ctaHref="#contacto"
        />

        <CTASection
          title="¿Revisamos los resultados?"
          description="El informe completo de 2025 con métricas detalladas y posicionamiento."
          buttonText="Ver Informe 2025"
          buttonHref="/informe"
          variant="dark"
        />
      </main>

      <Footer />
    </>
  )
}
