'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { generateVisualPDF, generateEditorialPDF, generatePropuestaEditorialPDF } from '@/lib/pdf-generator'

interface CTASectionProps {
  title: string
  description?: string
  buttonText: string
  buttonHref?: string
  variant?: 'light' | 'dark'
  mode?: 'link' | 'pdf'
  pdfTargetId?: string
  pdfFilename?: string
  pdfTextFilename?: string
  pdfType?: 'informe' | 'propuesta'
  centered?: boolean
  showSeparator?: boolean
}

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref = '/',
  variant = 'light',
  mode = 'link',
  pdfTargetId = 'pdf-content',
  pdfFilename = 'NORGESTION-Informe-2025.pdf',
  pdfTextFilename = 'NORGESTION-Informe-Texto-2025.pdf',
  pdfType = 'informe',
  centered = false,
  showSeparator = false,
}: CTASectionProps) {
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false)
  const [isGeneratingText, setIsGeneratingText] = useState(false)
  const [progressVisual, setProgressVisual] = useState(0)
  const [progressText, setProgressText] = useState(0)

  const handleVisualPDF = async () => {
    if (isGeneratingVisual || isGeneratingText) return

    setIsGeneratingVisual(true)
    setProgressVisual(0)

    try {
      await generateVisualPDF(pdfTargetId, {
        filename: pdfFilename,
        onProgress: setProgressVisual,
      })
    } catch (error) {
      console.error('Error generating visual PDF:', error)
    } finally {
      setIsGeneratingVisual(false)
      setProgressVisual(0)
    }
  }

  const handleTextPDF = async () => {
    if (isGeneratingVisual || isGeneratingText) return

    setIsGeneratingText(true)
    setProgressText(0)

    try {
      if (pdfType === 'propuesta') {
        await generatePropuestaEditorialPDF({
          filename: pdfTextFilename,
          onProgress: setProgressText,
        })
      } else {
        await generateEditorialPDF({
          filename: pdfTextFilename,
          onProgress: setProgressText,
        })
      }
    } catch (error) {
      console.error('Error generating text PDF:', error)
    } finally {
      setIsGeneratingText(false)
      setProgressText(0)
    }
  }

  return (
    <section className={cn(
      "py-20 md:py-28",
      variant === 'dark' ? "bg-[#0a0a0a]" : "bg-[#fafafa]",
      showSeparator && (variant === 'dark' ? "border-t border-white/10" : "border-t border-[#e5e5e5]")
    )}>
      <div className={cn(
        "max-w-[1176px] mx-auto px-6",
        centered && "text-center"
      )}>
        <h2 className={cn(
          "text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] mb-4",
          variant === 'dark' ? "text-white" : "text-[#1d1d1f]"
        )}>
          {title}
        </h2>

        {description && (
          <p className={cn(
            "text-[17px] md:text-[19px] mb-8 leading-[1.5]",
            centered ? "max-w-[520px] mx-auto" : "max-w-[480px]",
            variant === 'dark' ? "text-white/50" : "text-[#86868b]"
          )}>
            {description}
          </p>
        )}

        {mode === 'link' ? (
          <Link
            href={buttonHref}
            className="inline-block bg-[#016936] text-white px-10 py-4 text-[16px] font-medium rounded-none hover:bg-[#015a2d] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(1,105,54,0.3)] hover:scale-[1.02]"
          >
            {buttonText}
          </Link>
        ) : (
          <div className={cn(
            "flex flex-col sm:flex-row gap-4",
            centered ? "items-center justify-center" : "items-start"
          )}>
            {/* Primary Button - Visual PDF */}
            <button
              onClick={handleVisualPDF}
              disabled={isGeneratingVisual || isGeneratingText}
              className={cn(
                "inline-flex items-center gap-3 bg-[#016936] text-white px-10 py-4 text-[16px] font-medium rounded-none transition-all duration-300",
                (isGeneratingVisual || isGeneratingText)
                  ? "opacity-80 cursor-wait"
                  : "hover:bg-[#015a2d] hover:shadow-[0_8px_24px_rgba(1,105,54,0.3)] hover:scale-[1.02]"
              )}
            >
              {isGeneratingVisual ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Generando... {progressVisual}%</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{buttonText}</span>
                </>
              )}
            </button>

            {/* Secondary Button - Text PDF */}
            <button
              onClick={handleTextPDF}
              disabled={isGeneratingVisual || isGeneratingText}
              className={cn(
                "inline-flex items-center gap-3 border-2 border-[#016936] text-[#016936] px-10 py-[14px] text-[16px] font-medium rounded-none transition-all duration-300",
                (isGeneratingVisual || isGeneratingText)
                  ? "opacity-60 cursor-wait"
                  : "hover:bg-[#016936]/5 hover:scale-[1.02]"
              )}
            >
              {isGeneratingText ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Generando... {progressText}%</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Crear PDF de texto</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
