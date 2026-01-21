// Ranking por Página - Top 25 páginas más visitadas
export interface PageRanking {
  title: string
  url: string
  views: number
}

export const pageRankings: PageRanking[] = [
  { title: 'Home', url: 'www.norgestion.com/', views: 7481 },
  { title: 'Corporate Finance', url: 'www.norgestion.com/corporate-finance', views: 2595 },
  { title: 'Nuestra Firma', url: 'www.norgestion.com/nuestra-firma', views: 2494 },
  { title: 'Home (EN)', url: 'www.norgestion.com/en', views: 1028 },
  { title: 'Jurídico Fiscal', url: 'www.norgestion.com/juridico-fiscal', views: 983 },
  { title: 'Contacto', url: 'www.norgestion.com/contacto', views: 855 },
  { title: 'Advisory & Interim Management', url: 'www.norgestion.com/advisory-interim-management', views: 611 },
  { title: 'Noticias y Conocimiento', url: 'www.norgestion.com/noticias-conocimiento', views: 606 },
  { title: 'Home (sin www)', url: 'norgestion.com/', views: 500 },
  { title: 'Corporate Finance (EN)', url: 'www.norgestion.com/en/corporate-finance', views: 451 },
  { title: 'Our Firm (EN)', url: 'www.norgestion.com/en/our-firm', views: 344 },
  { title: 'M&A', url: 'www.norgestion.com/m-a', views: 299 },
  { title: 'Informes', url: 'www.norgestion.com/informes', views: 272 },
  { title: 'José Antonio Barrena', url: 'www.norgestion.com/miembros-del-equipo/jose-antonio-barrena', views: 208 },
  { title: 'Igor Gorostiaga', url: 'www.norgestion.com/miembros-del-equipo/igor-gorostiaga', views: 182 },
  { title: 'Yon Arratibel', url: 'www.norgestion.com/miembros-del-equipo/yon-arratibel', views: 175 },
  { title: 'Iñigo Garmendia', url: 'www.norgestion.com/miembros-del-equipo/inigo-garmendia', views: 169 },
  { title: 'Marta Vera', url: 'www.norgestion.com/miembros-del-equipo/marta-vera', views: 166 },
  { title: 'Contact (EN)', url: 'www.norgestion.com/en/contact', views: 165 },
  { title: 'Publicaciones Corporate', url: 'www.norgestion.com/publicaciones-corporate', views: 150 },
  { title: 'Jorge Sirodey', url: 'www.norgestion.com/miembros-del-equipo/jorge-sirodey', views: 146 },
  { title: 'Noticia: Pomona adquiere DIL', url: 'www.norgestion.com/actualidad/el-grupo-pomona-continua-su-expansion-en-espana-con-la-adquisicion-de-congelados-dil', views: 138 },
  { title: 'Luis Ignacio Lizarraga', url: 'www.norgestion.com/miembros-del-equipo/luis-ignacio-lizarraga', views: 138 },
  { title: 'Oscar Sánchez', url: 'www.norgestion.com/miembros-del-equipo/oscar-sanchez', views: 134 },
  { title: 'Home (CA)', url: 'www.norgestion.com/ca', views: 133 },
]

// Ranking de Visibilidad SEO - Top 25 impresiones en Google
export interface VisibilityRanking {
  page: string
  impressions: number
}

export const visibilityRankings: VisibilityRanking[] = [
  { page: 'Executive Interim Management', impressions: 13975 },
  { page: 'Corporate Finance', impressions: 12886 },
  { page: 'M&A', impressions: 12005 },
  { page: 'Home', impressions: 10852 },
  { page: 'Reestructuraciones Financieras', impressions: 10431 },
  { page: 'Artículo: Qué es un MBO', impressions: 9339 },
  { page: 'Nuestra Firma', impressions: 7144 },
  { page: 'Contacto', impressions: 6141 },
  { page: 'Artículo: Deberes de los Consejeros', impressions: 5948 },
  { page: 'M&A Software (EN)', impressions: 5231 },
  { page: 'Corporate Finance (EN)', impressions: 5051 },
  { page: 'Informes', impressions: 4743 },
  { page: 'Advisory Interim Management', impressions: 4382 },
  { page: 'Artículo: MARF para PYMEs', impressions: 4287 },
  { page: 'Información Legal', impressions: 3991 },
  { page: 'Financial Interim Management (EN)', impressions: 3850 },
  { page: 'M&A (EN)', impressions: 3695 },
  { page: 'Financial Interim Management', impressions: 3527 },
  { page: 'M&A Software', impressions: 3434 },
  { page: 'Artículo: Advisory Interim Management', impressions: 3028 },
  { page: 'Jurídico Fiscal', impressions: 2932 },
  { page: 'Home (EN)', impressions: 2685 },
  { page: 'Asesoramiento Jurídico Concursal', impressions: 2591 },
  { page: 'Interim CEO', impressions: 2589 },
  { page: 'Noticia: Lacor-Ibili adquiere Jay', impressions: 2545 },
]

// Insights para Ranking por Página
export interface Insight {
  title: string
  description: string
}

export const pageRankingInsights: Insight[] = [
  {
    title: 'Tracción internacional',
    description: 'La versión en inglés (/en) ocupa la <strong>4ª posición global</strong> en visitas, superando a la mayoría de páginas de servicios locales. El tráfico multilingüe es un vector de crecimiento.',
  },
  {
    title: 'Jerarquía de interés',
    description: 'El área corporativa y <strong>Nuestra Firma</strong> lideran el interés, seguidos de Jurídico-Fiscal y M&A, reflejando un interés transversal en los diferentes servicios de la firma.',
  },
  {
    title: 'Marca personal y liderazgo',
    description: 'Existe una correlación directa entre la jerarquía corporativa y el interés de la audiencia. Los perfiles del Equipo Directivo (Socios y Presidente) acumulan el mayor volumen de tráfico en la sección de equipo, validando la relevancia de la marca personal en la generación de confianza.',
  },
]

// Insights para Ranking de Visibilidad
export const visibilityRankingInsights: Insight[] = [
  {
    title: 'Hegemonía en Corporate Finance',
    description: 'Aunque Interim Management lidera individualmente, las verticales de <strong>Corporate Finance</strong> y <strong>M&A</strong> sumadas dominan el volumen total. El mercado identifica claramente a la firma con operaciones corporativas.',
  },
  {
    title: 'Servicios especializados vs. Home',
    description: 'Dato crítico: Las páginas de servicios técnicos (<strong>Reestructuraciones, M&A, Interim</strong>) superan en visibilidad orgánica a la propia Home. El usuario llega buscando soluciones específicas (\'Pain-point SEO\') antes que la marca genérica.',
  },
  {
    title: 'El activo estratégico "Software"',
    description: 'La página de sector M&A Software (versión Inglés) genera <strong>~5.200 impresiones</strong>, casi el 50% del volumen de la Home en español. Sumada a la versión española (<strong>~3.400</strong>), esta vertical se ha convertido en un activo crítico de entrada para captación internacional y posicionamiento sectorial.',
  },
]
