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
  addText('Resumen Ejecutivo', 'h2')
  addSpacer(8)

  const summaryPoints = [
    { num: '01', title: 'Liderazgo Digital', desc: 'Dominio en búsquedas de alto valor en Google y creciente presencia en resultados de IA generativa.' },
    { num: '02', title: 'Validación de Originación', desc: 'Aumento sostenido de contactos comerciales orgánicos generados a través del canal digital.' },
    { num: '03', title: 'Proyección Internacional', desc: 'La web actúa como escaparate para inversores extranjeros interesados en el middle market español.' },
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

  addText('Presencia en IA Generativa', 'h2')
  addSpacer(5)
  addText('NORGESTION aparece de forma destacada en los resultados de inteligencia artificial generativa (ChatGPT, Perplexity, Claude), tanto en búsquedas transaccionales como en consultas específicas sobre asesores boutique y especialistas en middle market.', 'body', 6)

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

// Legacy export for backwards compatibility
export const generatePDF = generateVisualPDF
