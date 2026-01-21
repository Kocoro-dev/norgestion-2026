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
    document.body.classList.add('pdf-generating')

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
        // Add pdf-generating class to cloned document body
        clonedDoc.body.classList.add('pdf-generating')

        const clonedElement = clonedDoc.getElementById(elementId)
        if (clonedElement) {
          // Hide elements marked with pdf-hide class
          const pdfHideElements = clonedElement.querySelectorAll('.pdf-hide')
          pdfHideElements.forEach((el) => {
            ;(el as HTMLElement).style.display = 'none'
          })

          // Remove interactive navigation elements
          const navButtons = clonedElement.querySelectorAll('button[aria-label*="Previous"], button[aria-label*="Next"], button[aria-label*="slide"], button[aria-label*="Close"]')
          navButtons.forEach((btn) => {
            ;(btn as HTMLElement).style.display = 'none'
          })

          // Remove lightbox
          const lightbox = clonedElement.querySelector('[class*="fixed inset-0 z-50"]')
          if (lightbox) lightbox.remove()

          // For tables: keep a reasonable max-height to prevent overflow
          // but still show more content than the scrollable view
          const tableContainers = clonedElement.querySelectorAll('.table-scroll-container')
          tableContainers.forEach((container) => {
            ;(container as HTMLElement).style.maxHeight = '800px'
            ;(container as HTMLElement).style.overflow = 'hidden'
          })

          // For other scroll containers, keep reasonable limits
          const scrollContainers = clonedElement.querySelectorAll('[class*="max-h-"]:not(.table-scroll-container)')
          scrollContainers.forEach((container) => {
            const el = container as HTMLElement
            // Only expand if it's not a table
            if (!el.querySelector('table')) {
              el.style.maxHeight = 'none'
              el.style.overflow = 'visible'
            }
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

          // === PAGE BREAK HANDLING ===
          // Calculate page height in pixels (A4 at 1200px width = ~1697px height)
          const pageHeightPx = 1697

          // Get all major sections that should ideally start on a new page
          const sections = clonedElement.querySelectorAll('section[id]')

          sections.forEach((section) => {
            const sectionEl = section as HTMLElement
            const rect = sectionEl.getBoundingClientRect()
            const sectionTop = rect.top + clonedDoc.documentElement.scrollTop

            // Calculate which page this section starts on
            const pageNumber = Math.floor(sectionTop / pageHeightPx)
            const positionOnPage = sectionTop - (pageNumber * pageHeightPx)

            // If the section starts in the bottom 15% of a page, push it to the next page
            // This prevents sections from starting too close to a page break
            const threshold = pageHeightPx * 0.85

            if (positionOnPage > threshold) {
              const paddingNeeded = pageHeightPx - positionOnPage + 40 // 40px extra spacing
              sectionEl.style.paddingTop = `${paddingNeeded}px`
            }
          })

          // Add extra padding to last section to fill page with dark background
          const lastSection = clonedElement.querySelector('#competitivo')
          if (lastSection) {
            ;(lastSection as HTMLElement).style.paddingBottom = '600px'
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

    // Calculate total pages needed (avoiding nearly-blank trailing pages)
    // If the last page would have less than 10% content, skip it
    const minContentThreshold = pageHeight * 0.1

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Additional pages (skip if remaining content is too small)
    while (heightLeft > minContentThreshold) {
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
    document.body.classList.remove('pdf-generating')
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

  addText('Análisis de la', 'title')
  addSpacer(4)
  addText('Estrategia Digital', 'title')
  addSpacer(4)
  addText('2025', 'title')
  addSpacer(12)

  addText('Evaluación del rendimiento de la estrategia digital y el posicionamiento de NORGESTION en los mercados de Corporate Finance, M&A, Advisory & Interim Management y Asesoramiento Jurídico-Fiscal.', 'body', 6)

  addSpacer(20)
  addHorizontalLine()

  // Executive Summary
  addText('Resumen ejecutivo', 'h2')
  addSpacer(8)

  const summaryPoints = [
    { num: '01', title: 'Liderazgo digital', desc: 'Dominio en búsquedas de alto valor en Google y creciente presencia en resultados de IA generativa.' },
    { num: '02', title: 'Validación de originación', desc: 'Aumento sostenido de contactos comerciales orgánicos generados a través del canal digital.' },
    { num: '03', title: 'Proyección internacional', desc: 'La web actúa como escaparate para personas extranjeras interesadas en el middle market español.' },
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
  addText('Análisis del tráfico web', 'h1')
  addSpacer(5)
  addText('Análisis del rendimiento web y los indicadores clave que demuestran la calidad del tráfico y el posicionamiento de NORGESTION.', 'body', 6)
  addSpacer(15)

  // Stats grid
  const analysisStats = [
    { value: '15.760', label: 'Sesiones', desc: 'Visitas totales en los últimos 3 meses.' },
    { value: '308.715', label: 'Impresiones en Google', desc: 'Número de veces que NORGESTION aparece en resultados de búsqueda.' },
    { value: '2:26', label: 'Tiempo medio de sesión', desc: 'Los visitantes dedican más de 2 minutos explorando el contenido.' },
    { value: '53%', label: 'Ratio de engagement', desc: 'Más de la mitad de los visitantes interactúan activamente con la web.' },
    { value: '65%', label: 'Descubrimiento sin marca', desc: 'De las búsquedas orgánicas, el 65% no incluye "NORGESTION". Son potenciales clientes que no conocían la firma.' },
    { value: '32%', label: 'Exposición internacional', desc: 'Del tráfico total proviene de fuera de España.' },
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
    { value: '50+', label: 'Keywords en #1' },
    { value: '130+', label: 'Keywords en Top 5' },
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
  // PAGE 4: LINKEDIN
  // ============================================
  addPage()

  addText('03 — LinkedIn corporativo', 'label')
  addSpacer(5)
  addText('Escaparate social', 'h1')
  addSpacer(5)
  addText('Rendimiento del canal corporativo y validación de la estrategia de contenidos.', 'body', 6)
  addSpacer(15)

  addText('Métricas trimestrales', 'h2')
  addSpacer(10)

  const linkedInStats = [
    { value: '45.180', label: 'Impresiones totales', desc: 'Alcance acumulado del contenido publicado.' },
    { value: '3.455', label: 'Clics totales', desc: 'Interacciones que generan tráfico.' },
    { value: '475', label: 'Recomendaciones', desc: 'Validación social del contenido.' },
    { value: '32', label: 'Veces compartido', desc: 'Amplificación orgánica del alcance.' },
  ]

  linkedInStats.forEach((stat) => {
    checkPageBreak(30)
    addStat(stat.value, stat.label)
    addText(stat.desc, 'body', 5)
    addSpacer(8)
  })

  addSpacer(10)
  addText('Análisis estratégico', 'h2')
  addSpacer(8)

  const linkedInInsights = [
    { title: 'Efectividad del aumento de frecuencia', desc: 'El incremento en la cadencia de publicación ha resultado en un crecimiento neto del alcance acumulado.' },
    { title: 'Dualidad de formatos', desc: 'Las publicaciones visuales son clave para maximizar la visibilidad, mientras que las galerías y artículos técnicos concentran la generación de clics.' },
    { title: 'Coherencia omnicanal', desc: 'El interés en la web se alinea con la estrategia de humanización en LinkedIn, reforzando la confianza digital.' },
  ]

  linkedInInsights.forEach((insight) => {
    checkPageBreak(20)
    addText(insight.title, 'h3')
    addText(insight.desc, 'body', 5)
    addSpacer(8)
  })

  onProgress?.(75)

  // ============================================
  // PAGE 5: IMPACT
  // ============================================
  addPage()

  addText('04 — Impacto en negocio', 'label')
  addSpacer(4)
  addText('Activación de la originación digital', 'h1')
  addSpacer(4)
  addText('Evolución del canal web: Aumento significativo en la generación activa de contactos comerciales en 2025.', 'body', 6)
  addSpacer(12)

  addText('Contactos recibidos en 2025', 'h2')
  addSpacer(8)

  const impactCategories = [
    { value: '61', label: 'Contactos de negocio', desc: 'M&A, Inversores, Consultas de servicios.' },
    { value: '50', label: 'Captación de talento', desc: 'Candidatos de empleo y prácticas.' },
    { value: '18', label: 'Interim Pool', desc: 'Solicitudes de adhesión al equipo.' },
  ]

  impactCategories.forEach((cat) => {
    checkPageBreak(25)
    addStat(cat.value, cat.label)
    addText(cat.desc, 'body', 5)
    addSpacer(6)
  })

  addSpacer(8)
  addText('Hallazgos clave', 'h2')
  addSpacer(6)

  const impactInsights = [
    { title: 'Cualificación del flujo', desc: 'En 2025 se ha aumentado significativamente el volumen de consultas con intención comercial, validando la web como herramienta de soporte a la originación.' },
    { title: 'Tracción vertical', desc: 'La vertical de M&A Software ha generado contactos específicos del sector, demostrando que el contenido de nicho atrae contrapartes cualificadas.' },
    { title: 'Alcance cross-border', desc: 'Se registran entradas de contacto procedentes de mercados exteriores, correlacionando con el aumento de tráfico internacional.' },
  ]

  impactInsights.forEach((insight) => {
    checkPageBreak(18)
    addText(insight.title, 'h3')
    addText(insight.desc, 'body', 5)
    addSpacer(5)
  })

  onProgress?.(85)

  // ============================================
  // PAGE 6: COMPETITIVE
  // ============================================
  addPage()

  addText('05 — Entorno competitivo', 'label')
  addSpacer(4)
  addText('Respuesta del mercado', 'h1')
  addSpacer(4)
  addText('Análisis de la reacción de los competidores y evaluación de la ventaja estructural.', 'body', 6)
  addSpacer(10)

  addText('Radar de movimientos', 'h2')
  addSpacer(6)

  const competitorInsights = [
    { title: 'Estrategia de verticalización (Baker Tilly)', desc: 'Se detecta la creación de ecosistemas web satélites para competir en Tech M&A. También se observa mimetismo en su estrategia de LinkedIn.' },
    { title: 'Penalización técnica (Albia)', desc: 'Competidores han desplegado páginas sectoriales con intención SEO, pero su pérdida de visibilidad sugiere penalización por Core Web Vitals.' },
    { title: 'Inercia estructural (Big Four)', desc: 'Actores tradicionales muestran dificultades de adaptación. Su rigidez estructural limita su reacción, cediendo terreno en términos transaccionales.' },
  ]

  competitorInsights.forEach((insight) => {
    checkPageBreak(18)
    addText(insight.title, 'h3')
    addText(insight.desc, 'body', 5)
    addSpacer(5)
  })

  addSpacer(8)
  addText('Ventaja competitiva: el modelo unificado', 'h2')
  addSpacer(5)

  addText('Frente a la fragmentación y la deuda técnica de la competencia, NORGESTION opera bajo un modelo centralizado que integra estrategia, tecnología y narrativa.', 'body', 6)
  addSpacer(8)

  const strengths = [
    { title: 'Autoridad de dominio consolidada', desc: 'Trayectoria con presencia digital sistemática que permite posicionar páginas de tercer nivel por encima de portales verticales exclusivos.' },
    { title: 'Arquitectura web estructural y semántica', desc: 'Base semántica sólida diseñada desde el inicio para escalar sin deuda técnica ni fricción estructural.' },
    { title: 'Agilidad full stack', desc: 'Control total del ciclo (Estrategia, Diseño, Código, Contenido) que elimina la fricción entre proveedores.' },
    { title: 'Visión largoplacista', desc: 'Construcción de activos digitales basada en calidad técnica, premiando la calidad frente a la cantidad.' },
  ]

  strengths.forEach((s) => {
    checkPageBreak(18)
    addText(s.title, 'h3')
    addText(s.desc, 'body', 5)
    addSpacer(4)
  })

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

  addText('Consolidación y', 'title')
  addText('Expansión', 'title')
  addText('2026', 'title')
  addSpacer(10)

  addText('Propuesta estratégica para mantener el liderazgo digital y expandir el alcance a nuevos mercados y verticales.', 'body', 6)

  addSpacer(20)
  addHorizontalLine()

  onProgress?.(30)

  // ============================================
  // PAGE 2: STRATEGY
  // ============================================
  addPage()

  addText('Estrategia', 'label')
  addSpacer(5)
  addText('Líneas de trabajo 2026', 'h1')
  addSpacer(5)
  addText('Cuatro ejes estratégicos para consolidar el liderazgo y expandir el alcance.', 'body', 6)
  addSpacer(15)

  const strategies = [
    {
      number: '01',
      title: 'Verticales sectoriales',
      description: 'Posicionarse como experto en sectores específicos de alto valor.',
      sectors: ['Energía: Renovables, oil&gas, utilities', 'Industria: Manufactureras, automoción', 'Agroalimentario: Bodegas, cooperativas', 'Audiovisual: Productoras, contenido digital'],
      objective: 'Captar operaciones de clientes que buscan asesores especializados en su sector.',
    },
    {
      number: '02',
      title: 'Blindaje geográfico',
      description: 'Dominar las búsquedas locales en mercados estratégicos.',
      sectors: ['M&A Valencia', 'Corporate Finance Sevilla', 'Venta empresa País Vasco', 'Reestructuración Galicia'],
      objective: 'Ser la primera opción cuando un empresario busca asesoramiento en su ciudad.',
    },
    {
      number: '03',
      title: 'Expansión internacional',
      description: 'Captar operaciones cross-border e inversores extranjeros.',
      sectors: ['M&A advisor Spain', 'Sell company Spain', 'Spanish market entry', 'Tech M&A Spain'],
      objective: 'Posicionar a NORGESTION como puerta de entrada al mercado español.',
    },
    {
      number: '04',
      title: 'Autoridad y reputación',
      description: 'Reforzar la credibilidad offline que impulsa el posicionamiento online.',
      sectors: ['Presencia en medios especializados', 'Artículos de opinión en publicaciones del sector', 'Menciones en rankings y directorios', 'Participación en eventos del sector'],
      objective: 'Que las menciones externas refuercen la autoridad web.',
    },
  ]

  strategies.forEach((strategy) => {
    checkPageBreak(60)
    setFont('label')
    pdf.text(strategy.number, margin, y)
    setFont('h2')
    pdf.text(strategy.title, margin + 12, y)
    y += 8

    setFont('body')
    const descLines = pdf.splitTextToSize(strategy.description, contentWidth - 12)
    pdf.text(descLines, margin, y)
    y += descLines.length * 5 + 5

    strategy.sectors.forEach((sector) => {
      addText('• ' + sector, 'body', 5)
    })

    addSpacer(5)
    setFont('small')
    pdf.text('Objetivo: ' + strategy.objective, margin, y)
    y += 10
    addSpacer(5)
  })

  onProgress?.(50)

  // ============================================
  // PAGE 3: ROADMAP
  // ============================================
  addPage()

  addText('Hoja de ruta', 'label')
  addSpacer(5)
  addText('Calendario de ejecución', 'h1')
  addSpacer(5)
  addText('Distribución del trabajo a lo largo del año.', 'body', 6)
  addSpacer(15)

  const quarters = [
    {
      label: 'Q1 — Enero - Marzo',
      items: ['Auditoría de posiciones actuales', 'Definición de verticales prioritarias', 'Estructura de landings sectoriales', 'Inicio vertical Energía'],
    },
    {
      label: 'Q2 — Abril - Junio',
      items: ['Lanzamiento vertical Industria', 'Blindaje geográfico: Valencia, Sevilla', 'Optimización de posiciones existentes', 'Campaña de autoridad en medios'],
    },
    {
      label: 'Q3 — Julio - Septiembre',
      items: ['Vertical Agroalimentario', 'Estructura internacional (inglés)', 'Blindaje geográfico: Galicia, Aragón', 'Análisis de competencia'],
    },
    {
      label: 'Q4 — Octubre - Diciembre',
      items: ['Vertical Audiovisual', 'Consolidación internacional', 'Optimización general', 'Informe anual y planificación 2027'],
    },
  ]

  quarters.forEach((quarter) => {
    checkPageBreak(40)
    addText(quarter.label, 'h2')
    addSpacer(5)
    quarter.items.forEach((item) => {
      addText('• ' + item, 'body', 5)
    })
    addSpacer(10)
  })

  onProgress?.(70)

  // ============================================
  // PAGE 4: PRICING
  // ============================================
  addPage()

  addText('Inversión', 'label')
  addSpacer(5)
  addText('Propuesta económica', 'h1')
  addSpacer(5)
  addText('Cuota integral que incluye todos los servicios necesarios para ejecutar la estrategia.', 'body', 6)
  addSpacer(15)

  addText('Servicios incluidos', 'h2')
  addSpacer(8)

  const services = [
    { title: 'Dirección estratégica', desc: 'Reuniones periódicas, análisis de competencia, ajuste de prioridades según objetivos de negocio.' },
    { title: 'Diseño y desarrollo web', desc: 'Nuevas páginas, mejoras de experiencia de usuario, adaptación continua a dispositivos.' },
    { title: 'Posicionamiento SEO', desc: 'Optimización técnica, creación de contenido estratégico, mejora continua de posiciones.' },
    { title: 'Gestión LinkedIn', desc: 'Publicaciones para perfil corporativo y socios, interacción, crecimiento de audiencia.' },
    { title: 'Estrategia internacional', desc: 'Contenido en inglés, optimización para mercados extranjeros, captación internacional.' },
    { title: 'Soporte tecnológico', desc: 'Mantenimiento, seguridad, implementación de nuevas funcionalidades.' },
  ]

  services.forEach((service) => {
    checkPageBreak(20)
    addText(service.title, 'h3')
    addText(service.desc, 'body', 5)
    addSpacer(8)
  })

  addSpacer(10)
  addHorizontalLine()

  addText('Notas adicionales', 'h2')
  addSpacer(8)

  const notes = [
    { title: 'ROI estimado', desc: 'Con un fee medio de operación de [X]€, la inversión anual se recupera con [X] operaciones originadas digitalmente.' },
    { title: 'Comparativa', desc: 'La alternativa sería contratar una agencia externa (sin conocimiento del sector) o un equipo interno (mayor coste fijo).' },
    { title: 'Compromiso', desc: 'Facturación mensual. Revisión trimestral de resultados y ajuste de prioridades.' },
  ]

  notes.forEach((note) => {
    checkPageBreak(20)
    addText(note.title, 'h3')
    addText(note.desc, 'body', 5)
    addSpacer(8)
  })

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
