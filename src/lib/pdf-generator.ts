'use client'

import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

interface PDFGeneratorOptions {
  filename?: string
  onProgress?: (progress: number) => void
}

/**
 * Generate a visual PDF that replicates the exact web design
 */
export async function generateVisualPDF(
  elementId: string,
  options: PDFGeneratorOptions = {}
): Promise<void> {
  const { filename = 'NORGESTION-Informe-2025.pdf', onProgress } = options

  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`)
  }

  onProgress?.(10)

  // Store original styles
  const originalOverflow = document.body.style.overflow

  try {
    document.body.style.overflow = 'visible'

    onProgress?.(20)

    // Capture the entire element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 1200,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId)
        if (clonedElement) {
          // Remove interactive navigation elements
          const navButtons = clonedElement.querySelectorAll('button[aria-label*="Previous"], button[aria-label*="Next"], button[aria-label*="slide"], button[aria-label*="Close"]')
          navButtons.forEach((btn) => {
            ;(btn as HTMLElement).style.display = 'none'
          })

          // Remove lightbox
          const lightbox = clonedElement.querySelector('[class*="fixed inset-0 z-50"]')
          if (lightbox) lightbox.remove()

          // Show table content without scroll
          const scrollContainers = clonedElement.querySelectorAll('[class*="max-h-"]')
          scrollContainers.forEach((container) => {
            ;(container as HTMLElement).style.maxHeight = 'none'
            ;(container as HTMLElement).style.overflow = 'visible'
          })

          // Hide slider navigation dots and progress
          const navDots = clonedElement.querySelectorAll('.slider-nav-dots')
          navDots.forEach((dots) => {
            ;(dots as HTMLElement).style.display = 'none'
          })

          const progressBars = clonedElement.querySelectorAll('.slider-progress')
          progressBars.forEach((bar) => {
            ;(bar as HTMLElement).style.display = 'none'
          })

          // Hide CTA/Download PDF section (last section with download buttons)
          const allSections = clonedElement.querySelectorAll('section')
          const lastSection = allSections[allSections.length - 1]
          if (lastSection && lastSection.querySelector('button')) {
            ;(lastSection as HTMLElement).style.display = 'none'
          }
        }
      },
    })

    onProgress?.(70)

    // Calculate PDF dimensions (A4 portrait)
    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    let heightLeft = imgHeight
    let position = 0
    const imgData = canvas.toDataURL('image/jpeg', 0.95)

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Additional pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    onProgress?.(90)

    pdf.save(filename)

    onProgress?.(100)
  } finally {
    document.body.style.overflow = originalOverflow
  }
}

/**
 * Generate an editorial text-based PDF with the report content
 */
export async function generateEditorialPDF(
  options: PDFGeneratorOptions = {}
): Promise<void> {
  const { filename = 'NORGESTION-Informe-Texto-2025.pdf', onProgress } = options

  onProgress?.(10)

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = margin

  // Helper functions
  const addPage = () => {
    pdf.addPage()
    y = margin
  }

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      addPage()
    }
  }

  const setFont = (style: 'title' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label') => {
    switch (style) {
      case 'title':
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(28)
        pdf.setTextColor(29, 29, 31)
        break
      case 'h1':
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(22)
        pdf.setTextColor(29, 29, 31)
        break
      case 'h2':
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(16)
        pdf.setTextColor(29, 29, 31)
        break
      case 'h3':
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(13)
        pdf.setTextColor(29, 29, 31)
        break
      case 'body':
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(11)
        pdf.setTextColor(80, 80, 80)
        break
      case 'small':
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        pdf.setTextColor(120, 120, 120)
        break
      case 'label':
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(10)
        pdf.setTextColor(1, 105, 54)
        break
    }
  }

  const addText = (text: string, style: 'title' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label', lineHeight: number = 7) => {
    setFont(style)
    const lines = pdf.splitTextToSize(text, contentWidth)
    const totalHeight = lines.length * lineHeight
    checkPageBreak(totalHeight)
    pdf.text(lines, margin, y)
    y += totalHeight
  }

  const addSpacer = (height: number) => {
    y += height
  }

  const addHorizontalLine = () => {
    checkPageBreak(10)
    pdf.setDrawColor(220, 220, 220)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 8
  }

  const addStat = (value: string, label: string) => {
    checkPageBreak(20)
    setFont('h1')
    pdf.text(value, margin, y)
    y += 6
    setFont('small')
    pdf.text(label.toUpperCase(), margin, y)
    y += 10
  }

  // ============================================
  // COVER PAGE
  // ============================================

  // Logo area
  pdf.setFillColor(1, 105, 54)
  pdf.rect(margin, y, 8, 8, 'F')
  y += 20

  addText('NORGESTION', 'label')
  addSpacer(5)

  addText('Análisis del', 'title')
  addText('Ecosistema Digital', 'title')
  addText('2025', 'title')
  addSpacer(10)

  addText('Evaluación del rendimiento de la estrategia digital y el posicionamiento de NORGESTION en el mercado de M&A y Corporate Finance.', 'body', 6)

  addSpacer(20)
  addHorizontalLine()

  // Executive Summary
  addText('Resumen ejecutivo', 'h2')
  addSpacer(8)

  const summaryPoints = [
    { num: '01', title: 'Liderazgo digital', desc: 'Dominio en búsquedas de alto valor en Google y creciente presencia en resultados de IA generativa.' },
    { num: '02', title: 'Validación de originación', desc: 'Aumento sostenido de contactos comerciales orgánicos generados a través del canal digital.' },
    { num: '03', title: 'Proyección internacional', desc: 'La web actúa como escaparate para inversores extranjeros interesados en el middle market español.' },
  ]

  summaryPoints.forEach((point) => {
    checkPageBreak(25)
    setFont('label')
    pdf.text(point.num, margin, y)
    setFont('h3')
    pdf.text(point.title, margin + 12, y)
    y += 6
    setFont('body')
    const descLines = pdf.splitTextToSize(point.desc, contentWidth - 12)
    pdf.text(descLines, margin + 12, y)
    y += descLines.length * 5 + 8
  })

  onProgress?.(30)

  // ============================================
  // PAGE 2: ANALYSIS
  // ============================================
  addPage()

  addText('01 — Vista general de datos', 'label')
  addSpacer(5)
  addText('Salud del ecosistema digital', 'h1')
  addSpacer(5)
  addText('Análisis del rendimiento web y los indicadores clave que demuestran la calidad del tráfico y el posicionamiento de NORGESTION.', 'body', 6)
  addSpacer(15)

  // Stats grid
  const analysisStats = [
    { value: '5.800+', label: 'Impresiones en Google', desc: 'Número de veces que NORGESTION aparece en resultados de búsqueda.' },
    { value: '2:30', label: 'Tiempo medio en sitio', desc: 'Los visitantes dedican tiempo real a explorar el contenido.' },
    { value: '65%', label: 'Independencia de marca', desc: 'Visitas que llegan buscando soluciones, no "Norgestion".' },
    { value: '53%', label: 'Engagement rate', desc: 'Más de la mitad interactúa activamente con el contenido.' },
  ]

  analysisStats.forEach((stat) => {
    checkPageBreak(30)
    addStat(stat.value, stat.label)
    addText(stat.desc, 'body', 5)
    addSpacer(8)
  })

  addSpacer(10)
  setFont('small')
  const disclaimer1 = 'Datos obtenidos de Google Analytics y Google Search Console. Representan datos acumulados de los últimos 3 meses.'
  const disclaimerLines = pdf.splitTextToSize(disclaimer1, contentWidth)
  pdf.text(disclaimerLines, margin, y)
  y += disclaimerLines.length * 4

  onProgress?.(50)

  // ============================================
  // PAGE 3: LEADERSHIP
  // ============================================
  addPage()

  addText('02 — Posicionamiento', 'label')
  addSpacer(5)
  addText('Liderazgo en buscadores', 'h1')
  addSpacer(5)
  addText('El 90% de los clics en Google van a los primeros 5 resultados. NORGESTION domina las búsquedas estratégicas del sector.', 'body', 6)
  addSpacer(15)

  // Main stats
  const leadershipStats = [
    { value: '100+', label: 'Keywords en Top 5' },
    { value: '57', label: 'Keywords en #1' },
    { value: '0€', label: 'Inversión en Google Ads' },
  ]

  leadershipStats.forEach((stat) => {
    addStat(stat.value, stat.label)
  })

  addSpacer(10)
  addText('Keywords destacadas donde NORGESTION ocupa posiciones de liderazgo:', 'h3')
  addSpacer(8)

  const keywordExamples = [
    'consultora m&a (#1)', 'asesores m&a (#1)', 'corporate finance españa (#1)',
    'venta de empresas (#1)', 'compra de empresas (#2)', 'fusiones y adquisiciones (#1)',
    'due diligence (#3)', 'valoración de empresas (#2)', 'interim management (#1)',
  ]

  setFont('body')
  const kwText = keywordExamples.join('  •  ')
  const kwLines = pdf.splitTextToSize(kwText, contentWidth)
  checkPageBreak(kwLines.length * 5)
  pdf.text(kwLines, margin, y)
  y += kwLines.length * 5 + 10

  addText('Presencia en IA generativa', 'h2')
  addSpacer(5)
  addText('NORGESTION aparece de forma destacada en los resultados de inteligencia artificial generativa (ChatGPT, Perplexity, Claude y Gemini), tanto en búsquedas transaccionales como en consultas específicas sobre asesores boutique y especialistas en middle market.', 'body', 6)

  onProgress?.(70)

  // ============================================
  // PAGE 4: IMPACT
  // ============================================
  addPage()

  addText('03 — Impacto', 'label')
  addSpacer(5)
  addText('Generación de negocio', 'h1')
  addSpacer(5)
  addText('El canal digital como herramienta de originación de operaciones.', 'body', 6)
  addSpacer(15)

  addText('Contactos cualificados recibidos en 2025', 'h2')
  addSpacer(10)

  const leadTypes = [
    { title: 'Venta de empresa', desc: 'Empresarios interesados en vender su compañía' },
    { title: 'Búsqueda de adquisiciones', desc: 'Inversores buscando oportunidades de compra' },
    { title: 'Captación de talento', desc: 'Profesionales interesados en unirse al equipo' },
    { title: 'Otras consultas', desc: 'Servicios específicos, colaboraciones' },
  ]

  leadTypes.forEach((lead) => {
    checkPageBreak(20)
    addText(lead.title, 'h3')
    addText(lead.desc, 'body', 5)
    addSpacer(8)
  })

  addSpacer(10)
  addText('Alcance internacional', 'h2')
  addSpacer(5)
  addText('Contactos recibidos desde España, EE.UU., Alemania, Latam y otros mercados. La web actúa como escaparate para inversores extranjeros interesados en el mercado español.', 'body', 6)

  onProgress?.(85)

  // ============================================
  // PAGE 5: COMPARISON
  // ============================================
  addPage()

  addText('04 — Ventaja competitiva', 'label')
  addSpacer(5)
  addText('El modelo Full Stack', 'h1')
  addSpacer(5)
  addText('Por qué NORGESTION tiene una ventaja difícil de replicar.', 'body', 6)
  addSpacer(15)

  addText('Modelo tradicional (competencia)', 'h2')
  addSpacer(8)
  const negativePoints = [
    'Fragmentado: 3-4 proveedores que no se coordinan',
    'Lento: Cualquier cambio requiere semanas',
    'Genérico: Webs plantilla sin personalidad',
    'Vulnerable: Sin capacidad de reacción ante cambios',
  ]
  negativePoints.forEach((point) => {
    addText('• ' + point, 'body', 6)
  })

  addSpacer(15)
  addText('Modelo NORGESTION', 'h2')
  addSpacer(8)
  const positivePoints = [
    'Centralizado: Todo el conocimiento en un único equipo',
    'Ágil: Cambios implementados en horas',
    'Premium: Diseño boutique que refleja posicionamiento',
    'Preparado: Anticipación a cambios tecnológicos',
  ]
  positivePoints.forEach((point) => {
    addText('• ' + point, 'body', 6)
  })

  addSpacer(15)
  addHorizontalLine()
  addText('Esta ventaja estructural es difícil de replicar. Un competidor necesitaría años de trabajo consistente y una inversión significativa para igualar la posición de NORGESTION.', 'body', 6)

  // Footer
  addSpacer(20)
  setFont('small')
  pdf.text('NORGESTION © 2025 - Informe de Ecosistema Digital', margin, pageHeight - 15)

  onProgress?.(95)

  pdf.save(filename)

  onProgress?.(100)
}

/**
 * Generate an editorial text-based PDF with the proposal content
 */
export async function generatePropuestaEditorialPDF(
  options: PDFGeneratorOptions = {}
): Promise<void> {
  const { filename = 'NORGESTION-Propuesta-2026.pdf', onProgress } = options

  onProgress?.(10)

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = margin

  // Helper functions
  const addPage = () => {
    pdf.addPage()
    y = margin
  }

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      addPage()
    }
  }

  const setFont = (style: 'title' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label') => {
    switch (style) {
      case 'title':
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(28)
        pdf.setTextColor(29, 29, 31)
        break
      case 'h1':
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(22)
        pdf.setTextColor(29, 29, 31)
        break
      case 'h2':
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(16)
        pdf.setTextColor(29, 29, 31)
        break
      case 'h3':
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(13)
        pdf.setTextColor(29, 29, 31)
        break
      case 'body':
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(11)
        pdf.setTextColor(80, 80, 80)
        break
      case 'small':
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        pdf.setTextColor(120, 120, 120)
        break
      case 'label':
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(10)
        pdf.setTextColor(1, 105, 54)
        break
    }
  }

  const addText = (text: string, style: 'title' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label', lineHeight: number = 7) => {
    setFont(style)
    const lines = pdf.splitTextToSize(text, contentWidth)
    const totalHeight = lines.length * lineHeight
    checkPageBreak(totalHeight)
    pdf.text(lines, margin, y)
    y += totalHeight
  }

  const addSpacer = (height: number) => {
    y += height
  }

  const addHorizontalLine = () => {
    checkPageBreak(10)
    pdf.setDrawColor(220, 220, 220)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 8
  }

  // ============================================
  // COVER PAGE
  // ============================================

  // Logo area
  pdf.setFillColor(1, 105, 54)
  pdf.rect(margin, y, 8, 8, 'F')
  y += 20

  addText('NORGESTION', 'label')
  addSpacer(5)

  addText('Propuesta estratégica:', 'title', 12)
  addText('consolidación y expansión', 'title', 12)
  addText('2026', 'title', 12)
  addSpacer(10)

  addText('Plan de trabajo para mantener el liderazgo actual y expandir el alcance hacia nuevos mercados, verticales, modelos de inteligencia (GEO) y reputación de marca.', 'body', 6)

  addSpacer(20)
  addHorizontalLine()

  onProgress?.(20)

  // ============================================
  // PAGE 2: OBJETIVOS ESTRATÉGICOS
  // ============================================
  addPage()

  addText('Objetivos', 'label')
  addSpacer(5)
  addText('Objetivos estratégicos', 'h1')
  addSpacer(5)
  addText('Cuatro ejes para consolidar el liderazgo y expandir el alcance.', 'body', 6)
  addSpacer(15)

  const objetivos = [
    {
      number: '01',
      title: 'Defensa del liderazgo',
      description: 'Sostener la hegemonía actual mediante una micro-gestión de keywords y un refuerzo semántico específico para cada área de práctica, ejecutando un blindaje geográfico en plazas clave.',
    },
    {
      number: '02',
      title: 'Expansión de fronteras',
      description: 'Escalar la estrategia de verticales sectoriales (validada como activo) y desplegar la internacionalización, aprovechando que la arquitectura web ya está preparada y nuestra capacidad de posicionamiento internacional validada.',
    },
    {
      number: '03',
      title: 'Consolidación del canal social',
      description: 'Mantener la frecuencia y tipología de contenidos en LinkedIn, profundizando en los insights de los socios como motor de confianza y autoridad de marca.',
    },
    {
      number: '04',
      title: 'Inteligencia de flujo',
      description: 'Implementar un panel de control ad-hoc para monitorizar no solo tráfico, sino eventos de negocio (copias de teléfono, clics en email) y optimizar la tasa de conversión mediante mejoras narrativas (CRO).',
    },
  ]

  objetivos.forEach((obj) => {
    checkPageBreak(35)
    setFont('label')
    pdf.text(obj.number, margin, y)
    setFont('h2')
    pdf.text(obj.title, margin + 12, y)
    y += 8

    setFont('body')
    const descLines = pdf.splitTextToSize(obj.description, contentWidth)
    pdf.text(descLines, margin, y)
    y += descLines.length * 5 + 10
  })

  onProgress?.(35)

  // ============================================
  // PAGE 3: LÍNEAS DE ACTUACIÓN
  // ============================================
  addPage()

  addText('Actuación', 'label')
  addSpacer(5)
  addText('Líneas de actuación', 'h1')
  addSpacer(5)
  addText('Seis tácticas complementarias para alcanzar los objetivos.', 'body', 6)
  addSpacer(15)

  const acciones = [
    {
      number: '01',
      title: 'Profundización sectorial',
      description: 'Desarrollo de nuevas verticales especializadas (ej: Energía, Industria, Agrobio, Cine/Audiovisual, etc.) para captar tráfico de nicho cualificado.',
    },
    {
      number: '02',
      title: 'Despliegue geográfico',
      description: 'Creación de páginas optimizadas para búsquedas locales estratégicas, asegurando la relevancia en las principales plazas de la firma.',
    },
    {
      number: '03',
      title: 'Internacionalización selectiva',
      description: 'Traducción estratégica de contenidos clave y verticales de sector para capturar tráfico cross-border de alta intención.',
    },
    {
      number: '04',
      title: 'Ampliación semántica (SEO content)',
      description: 'Profundización semántica en las páginas de servicio actuales y expansión del blog corporativo mediante contenidos SEO basados en clústeres temáticos.',
    },
    {
      number: '05',
      title: 'Analítica de negocio (BI)',
      description: 'Desarrollo e implementación de un panel de Business Intelligence propio para la analítica digital y seguimiento del funnel de conversión.',
    },
    {
      number: '06',
      title: 'Autoridad de marca y preparación IA',
      description: 'Estrategia de linkbuilding y PR digital enfocada en conseguir enlaces en medios relevantes.',
    },
  ]

  acciones.forEach((accion) => {
    checkPageBreak(30)
    setFont('label')
    pdf.text(accion.number, margin, y)
    setFont('h3')
    pdf.text(accion.title, margin + 12, y)
    y += 7

    setFont('body')
    const descLines = pdf.splitTextToSize(accion.description, contentWidth)
    pdf.text(descLines, margin, y)
    y += descLines.length * 5 + 8
  })

  addSpacer(5)
  addHorizontalLine()
  addText('Hipótesis estratégica', 'h3')
  addSpacer(3)
  addText('Anticipamos que la autoridad de dominio en Google, sumada a la presencia en fuentes externas, será el factor determinante para ser citado como referencia por los futuros modelos de IA generativa.', 'body', 6)

  onProgress?.(50)

  // ============================================
  // PAGE 4: PROPUESTA ECONÓMICA
  // ============================================
  addPage()

  addText('Inversión', 'label')
  addSpacer(5)
  addText('Propuesta económica', 'h1')
  addSpacer(15)

  addText('Desglose de servicios recurrentes', 'h2')
  addSpacer(10)

  const services = [
    { title: 'Dirección y acompañamiento', concepto: 'Dirección de cuenta y estrategia.', detalle: 'Planificación anual, acompañamiento semanal y supervisión mensual de KPIs de negocio.' },
    { title: 'Diseño y desarrollo web', concepto: 'Desarrollo y gestión en Webflow.', detalle: 'Diseño UI/UX de nuevas landing pages, desarrollo evolutivo del site, gestiones del día a día y optimización técnica continua.' },
    { title: 'SEO técnico y de contenidos (On-page)', concepto: 'Crecimiento orgánico.', detalle: 'Optimización semántica continua, enlazado interno y redacción técnica de contenidos para blog y servicios.' },
    { title: 'Estrategia LinkedIn y diseño visual', concepto: 'Editorial y diseño gráfico.', detalle: 'Diseño gráfico de piezas visuales, redacción editorial de posts, gestión integral del calendario y curación de insights de los socios.' },
    { title: 'Autoridad y difusión (Off-page)', concepto: 'Reputación digital.', detalle: 'Estrategia de linkbuilding y búsqueda activa de oportunidades de aparición en medios externos con enlaces hacia nuestra página para reforzar la autoridad.' },
    { title: 'Infraestructura tecnológica (IA)', concepto: 'Capa de inteligencia.', detalle: 'Acceso y computación de modelos de lenguaje de vanguardia para análisis de datos, toma de decisiones, comprensión del contexto, redacción y enfoque de contenidos.' },
  ]

  services.forEach((service) => {
    checkPageBreak(25)
    addText(service.title, 'h3')
    setFont('small')
    pdf.text(service.concepto, margin, y)
    y += 5
    setFont('body')
    const detLines = pdf.splitTextToSize(service.detalle, contentWidth)
    pdf.text(detLines, margin, y)
    y += detLines.length * 5 + 8
  })

  addSpacer(5)
  addHorizontalLine()

  setFont('h2')
  pdf.text('Inversión mensual', margin, y)
  setFont('h1')
  pdf.text('7.950 €', pageWidth - margin - 30, y)
  y += 15

  setFont('small')
  pdf.setFont('helvetica', 'italic')
  const disclaimer = 'Condiciones exclusivas para NORGESTION. Estos términos no constituyen una oferta pública y no deben tomarse como precios de referencia.'
  const discLines = pdf.splitTextToSize(disclaimer, contentWidth)
  pdf.text(discLines, margin, y)
  y += discLines.length * 4

  onProgress?.(70)

  // ============================================
  // PAGE 5: CALENDARIO Y FILOSOFÍA
  // ============================================
  addPage()

  addText('Siguientes pasos', 'label')
  addSpacer(5)
  addText('Calendario de activación', 'h1')
  addSpacer(15)

  const pasos = [
    { periodo: 'Febrero 2026', titulo: 'Definición del cronograma', desc: 'Establecimiento del plan de acción anual detallado y continuidad de las líneas de trabajo actuales.' },
    { periodo: 'Marzo 2026 — Marzo 2027', titulo: 'Ejecución del plan', desc: 'Implementación de la estrategia establecida con revisiones generales de analítica cuatrimestrales.' },
  ]

  pasos.forEach((paso) => {
    checkPageBreak(25)
    setFont('label')
    pdf.text(paso.periodo.toUpperCase(), margin, y)
    y += 6
    addText(paso.titulo, 'h2')
    addText(paso.desc, 'body', 5)
    addSpacer(12)
  })

  addSpacer(10)
  addHorizontalLine()

  addText('Filosofía', 'label')
  addSpacer(5)
  addText('Nuestra posición ante la tecnología', 'h1')
  addSpacer(10)

  addText('Mantenemos una filosofía cauta de construcción sólida. Rechazamos la automatización masiva de contenidos generados por IA sin supervisión.', 'h3')
  addSpacer(8)

  addText('Nuestra estrategia integra los modelos de inteligencia artificial más potentes del mercado con curiosidad técnica, pero siempre bajo una dirección humana experta. Utilizamos la tecnología para potenciar el análisis, la creatividad y las capacidades del equipo, no para sustituirlas.', 'body', 6)

  // Footer
  addSpacer(20)
  setFont('small')
  pdf.text('NORGESTION © 2026 - Propuesta Estratégica', margin, pageHeight - 15)

  onProgress?.(95)

  pdf.save(filename)

  onProgress?.(100)
}

// Legacy export for backwards compatibility
export const generatePDF = generateVisualPDF
