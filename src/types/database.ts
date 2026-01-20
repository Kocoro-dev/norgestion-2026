export interface Page {
  id: string
  slug: 'informe' | 'propuesta'
  title: string
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface Section {
  id: string
  page_id: string
  type: string
  title: string | null
  content: Record<string, unknown>
  order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Keyword {
  id: string
  term: string
  position: number
  category: string | null
  is_highlighted: boolean
  is_tech: boolean
  is_international: boolean
  geo_city: string | null
  created_at: string
}

export interface Media {
  id: string
  name: string
  url: string
  alt_text: string | null
  type: string | null
  created_at: string
}

export interface Setting {
  key: string
  value: Record<string, unknown>
  updated_at: string
}

// Section content types for each section type
export interface HeroContent {
  badge: string
  title: string
  titleHighlight: string
  lead: string
}

export interface ContextContent {
  title: string
  cards: Array<{
    stat: string
    text: string
  }>
  insight: string
}

export interface MetricsContent {
  title: string
  subtitle: string
  metrics: Array<{
    number: string
    unit: string
    title: string
    description: string
  }>
}

export interface KeywordsContent {
  title: string
  subtitle: string
  stats: Array<{
    number: string
    label: string
  }>
}

export interface ImpactContent {
  title: string
  subtitle: string
  mainNumber: string
  mainLabel: string
  leadTypes: Array<{
    title: string
    description: string
    count: string
  }>
}

export interface ComparisonContent {
  title: string
  subtitle: string
  traditional: {
    title: string
    subtitle: string
    items: string[]
  }
  norgestion: {
    title: string
    subtitle: string
    items: string[]
  }
  conclusion: string
}

export interface StrategyContent {
  title: string
  subtitle: string
  strategies: Array<{
    number: string
    title: string
    description: string
    details: Array<{
      title: string
      text: string
    }>
    objective: string
  }>
}

export interface RoadmapContent {
  title: string
  subtitle: string
  quarters: Array<{
    label: string
    months: string
    items: string[]
  }>
}

export interface PricingContent {
  title: string
  subtitle: string
  price: string
  features: Array<{
    title: string
    description: string
  }>
  notes: Array<{
    title: string
    text: string
  }>
}
