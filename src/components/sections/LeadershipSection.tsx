'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Stat {
  value: string
  label: string
}

interface Keyword {
  term: string
  position: number
  category?: string
}

interface GeoKeyword {
  city: string
  keywords: { position: number; term: string }[]
}

interface SliderImage {
  src: string
  alt: string
}

interface LeadershipSectionProps {
  label: string
  title: string
  description: string
  stats: Stat[]
  generalKeywords: Keyword[]
  techKeywords: Keyword[]
  geoKeywords: GeoKeyword[]
  internationalKeywords: Keyword[]
  allKeywords: Keyword[]
  disclaimer?: string
}

// Lightbox Component for Full-Screen Zoom
function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onGoToSlide,
}: {
  images: SliderImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onGoToSlide: (index: number) => void
}) {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

      {/* Close Button - Fixed position for visibility */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="fixed top-6 right-6 z-[1002] w-12 h-12 flex items-center justify-center bg-black/80 backdrop-blur-sm border border-white/30 text-white hover:bg-black hover:border-white/50 transition-all duration-300 rounded-full"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
        {/* Main Image */}
        <div className="relative w-full h-full max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-300 ease-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-full"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-full"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
          {/* Image Counter */}
          <div className="text-[14px] font-medium text-white/50 tracking-wider">
            <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); onGoToSlide(index); }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-[#016936]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Keyboard Hint */}
        <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-4 text-[12px] text-white/30" onClick={(e) => e.stopPropagation()}>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 bg-white/10 rounded text-white/50">ESC</kbd>
            cerrar
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 bg-white/10 rounded text-white/50">&larr;</kbd>
            <kbd className="px-2 py-0.5 bg-white/10 rounded text-white/50">&rarr;</kbd>
            navegar
          </span>
        </div>
      </div>
    </div>
  )
}

// Stacked Images Component for PDF mode
function StackedImages({ images }: { images: SliderImage[] }) {
  return (
    <div className="space-y-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[16/10] overflow-hidden bg-[#0a0f11] rounded-sm"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  )
}

// Premium Image Slider Component
function ImageSlider({ images }: { images: SliderImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length
    goToSlide(nextIndex)
  }, [currentIndex, images.length, goToSlide])

  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    goToSlide(prevIndex)
  }, [currentIndex, images.length, goToSlide])

  // Auto-play (disabled when lightbox is open)
  useEffect(() => {
    if (isPaused || isLightboxOpen) return
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [goToNext, isPaused, isLightboxOpen])

  const openLightbox = () => {
    setIsLightboxOpen(true)
  }

  return (
    <>
      {/* Interactive Slider - Hidden in PDF mode */}
      <div
        className="relative group pdf-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Image Container */}
        <div
          className="relative aspect-[16/10] overflow-hidden bg-[#0a0f11] rounded-sm cursor-zoom-in"
          onClick={openLightbox}
        >
          {/* Images */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-[1.02]'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Subtle Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#11191C]/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11191C]/20 via-transparent to-[#11191C]/20 pointer-events-none" />

          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 text-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-full"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-full"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 text-[13px] font-medium text-white/50 tracking-wider pointer-events-none">
            <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="slider-nav-dots flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-[#016936]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="slider-progress mt-4 h-[1px] bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#016936]/60 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / images.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Stacked Images - Shown only in PDF mode */}
      <div className="pdf-show hidden">
        <StackedImages images={images} />
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={goToNext}
        onPrev={goToPrev}
        onGoToSlide={goToSlide}
      />
    </>
  )
}

// AI Slider Images Data (limited to 3 for optimal PDF generation)
const aiSliderImages: SliderImage[] = [
  { src: '/images/slider-ia/NORGESTION_01.jpg', alt: 'NORGESTION en resultados de IA - Búsqueda M&A' },
  { src: '/images/slider-ia/NORGESTION_02.jpg', alt: 'NORGESTION en resultados de IA - Consultora especializada' },
  { src: '/images/slider-ia/NORGESTION_04.jpg', alt: 'NORGESTION en resultados de IA - Interim Management' },
  { src: '/images/slider-ia/NORGESTION_07.jpg', alt: 'NORGESTION en resultados de IA - Corporate Finance' },
  { src: '/images/slider-ia/NORGESTION_08.jpg', alt: 'NORGESTION en resultados de IA - Asesoría empresarial' },
  { src: '/images/slider-ia/NORGESTION_ChatGPT.jpg', alt: 'NORGESTION en ChatGPT' },
  { src: '/images/slider-ia/NORGESTION_Claude_España.jpg', alt: 'NORGESTION en Claude - España' },
  { src: '/images/slider-ia/NORGESTION_Claude_Madrid.jpg', alt: 'NORGESTION en Claude - Madrid' },
]

function KeywordCard({ term, position }: { term: string; position: number }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(term)
    toast.success(`"${term}" copiado al portapapeles`)
  }

  return (
    <button
      onClick={copyToClipboard}
      className="group text-left p-6 bg-[#11191C] hover:bg-[#016936]/[0.12] transition-all duration-300 cursor-pointer flex flex-col items-start"
    >
      <span className="inline-flex items-center justify-center text-[12px] font-medium text-[#2a9d5c] bg-[#0d3d2a] px-2.5 py-1.5 mb-4">
        #{position}
      </span>
      <span className="text-[15px] text-white/75 leading-relaxed group-hover:text-white/90 transition-colors">
        {term}
      </span>
    </button>
  )
}

function GeoKeywordItem({ term, position }: { term: string; position: number }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(term)
    toast.success(`"${term}" copiado al portapapeles`)
  }

  return (
    <button
      onClick={copyToClipboard}
      className="group/item flex items-start gap-3 w-full text-left py-2 px-2 -mx-2 rounded hover:bg-[#016936]/[0.12] transition-all duration-200 cursor-pointer"
    >
      <span className="inline-flex items-center justify-center text-[11px] font-medium text-[#2a9d5c] bg-[#0d3d2a] px-1.5 py-0.5 flex-shrink-0">
        #{position}
      </span>
      <span className="text-[14px] text-white/70 group-hover/item:text-white/90 transition-colors">
        {term}
      </span>
    </button>
  )
}

export function LeadershipSection({
  label,
  title,
  description,
  stats,
  generalKeywords,
  techKeywords,
  geoKeywords,
  internationalKeywords,
  allKeywords,
  disclaimer,
}: LeadershipSectionProps) {
  return (
    <section id="liderazgo" className="py-16 md:py-24 bg-[#11191C]">
      <div className="max-w-[1176px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="text-[14px] font-medium uppercase tracking-[0.15em] text-[#86868b] mb-4">
            {label}
          </div>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-white leading-tight mb-3">
            {title}
          </h2>
          <p className="text-[20px] text-white/60 max-w-[700px]">
            {description}
          </p>
        </div>

        {/* Main Stats */}
        <div className="flex flex-col md:flex-row mb-24 pb-20 border-b border-white/[0.08]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex-1 py-6 md:py-0 ${index > 0 ? 'border-t md:border-t-0 md:border-l border-white/10 md:pl-12' : ''}`}
            >
              <div className="text-[48px] md:text-[64px] font-extralight text-white leading-none mb-2">
                {stat.value}
              </div>
              <div className={`text-[14px] uppercase tracking-[0.1em] ${index === 0 ? 'text-[#2a9d5c]' : 'text-white/50'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Keywords Generales */}
        <div className="mb-24">
          <h3 className="text-[22px] md:text-[26px] font-medium text-white mb-3">
            Keywords generales destacadas
          </h3>
          <p className="text-[16px] text-white/50 mb-10">
            Términos de alto valor comercial donde NORGESTION ocupa la primera posición.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[1px] bg-white/[0.06]">
            {generalKeywords.map((keyword, index) => (
              <KeywordCard key={index} term={keyword.term} position={keyword.position} />
            ))}
          </div>
        </div>

        {/* Sector Tecnológico */}
        <div className="mb-24">
          <h3 className="text-[22px] md:text-[26px] font-medium text-white mb-3">
            Sector tecnológico / Software
          </h3>
          <p className="text-[16px] text-white/50 mb-10">
            Posicionamiento especializado en M&A del sector IT y software.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[1px] bg-white/[0.06]">
            {techKeywords.map((keyword, index) => (
              <KeywordCard key={index} term={keyword.term} position={keyword.position} />
            ))}
          </div>
        </div>

        {/* Dominio Geográfico */}
        <div className="mb-24">
          <h3 className="text-[22px] md:text-[26px] font-medium text-white mb-3">
            Dominio geográfico
          </h3>
          <p className="text-[16px] text-white/50 mb-10">
            Liderazgo en búsquedas locales de las principales ciudades.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[1px] bg-white/[0.06]">
            {geoKeywords.map((geo, index) => (
              <div key={index} className="p-6 bg-[#11191C] flex flex-col items-start">
                <h4 className="font-medium text-white mb-5 text-[16px]">{geo.city}</h4>
                <div className="space-y-1 w-full">
                  {geo.keywords.map((kw, kwIndex) => (
                    <GeoKeywordItem key={kwIndex} term={kw.term} position={kw.position} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posicionamiento Internacional */}
        <div className="mb-24">
          <h3 className="text-[22px] md:text-[26px] font-medium text-white mb-3">
            Posicionamiento internacional
          </h3>
          <p className="text-[16px] text-white/50 mb-10">
            Visibilidad en búsquedas en inglés para captar operaciones cross-border.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1px] bg-white/[0.06]">
            {internationalKeywords.map((keyword, index) => (
              <KeywordCard key={index} term={keyword.term} position={keyword.position} />
            ))}
          </div>
        </div>

        {/* All Keywords Table */}
        <div className="mb-24">
          <h3 className="text-[22px] md:text-[26px] font-medium text-white mb-3">
            Todas las keywords en Top 5
          </h3>
          <p className="text-[16px] text-white/50 mb-10">
            Listado completo de términos donde NORGESTION aparece entre los 5 primeros resultados de Google.
          </p>
          <div className="border border-white/[0.06] max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-[#11191C] z-10">
                <TableRow className="border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-white/40 text-[13px] font-medium uppercase tracking-wider py-4 pl-6 w-16">#</TableHead>
                  <TableHead className="text-white/40 text-[13px] font-medium uppercase tracking-wider py-4">Keyword</TableHead>
                  <TableHead className="text-white/40 text-[13px] font-medium uppercase tracking-wider py-4 pr-6 text-right w-24">Posición</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allKeywords.map((keyword, index) => (
                  <TableRow
                    key={index}
                    className="border-white/[0.06] hover:bg-[#016936]/[0.12] transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(keyword.term)
                      toast.success(`"${keyword.term}" copiado al portapapeles`)
                    }}
                  >
                    <TableCell className="text-white/40 text-[14px] py-4 pl-6 tabular-nums">{index + 1}</TableCell>
                    <TableCell className="text-white/70 text-[15px] py-4">{keyword.term}</TableCell>
                    <TableCell className="py-4 pr-6 text-right">
                      <span className="inline-flex items-center justify-center text-[11px] font-medium text-[#2a9d5c] bg-[#0d3d2a] px-2 py-0.5">#{keyword.position}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Disclaimer Posicionamiento */}
        {disclaimer && (
          <div className="mb-16 pt-8 border-t border-white/10">
            <p className="text-[14px] text-white/30 leading-relaxed italic">
              {disclaimer}
            </p>
          </div>
        )}

        {/* AI Presence Section */}
        <div className="mb-12 pt-16">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-[32px] md:text-[48px] font-semibold text-white leading-tight mb-6">
                Presencia en<br />
                <span className="text-[#2a9d5c]">IA generativa</span>
              </h2>
              <p className="text-[20px] text-white/60 leading-relaxed mb-6">
                NORGESTION aparece de forma destacada en los resultados de inteligencia artificial generativa, tanto en búsquedas de keywords transaccionales como en consultas específicas sobre asesores boutique y especialistas en middle market.
              </p>
              <p className="text-[20px] text-white/60 leading-relaxed mb-8">
                Esta visibilidad abarca el ámbito semántico completo de la firma, con especial relevancia en <strong className="text-white/80 font-medium">M&A</strong> e <strong className="text-white/80 font-medium">Interim Management</strong>.
              </p>

              {/* Key Points */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#016936] mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-white/50">Resultados en ChatGPT, Perplexity y Claude</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#016936] mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-white/50">Consultas sobre advisors especializados</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#016936] mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-white/50">Búsquedas transaccionales de alto valor</span>
                </div>
              </div>
            </div>

            {/* Right Column - Slider */}
            <div>
              <ImageSlider images={aiSliderImages} />
            </div>
          </div>
        </div>

        {/* Disclaimer IA Generativa */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-[14px] text-white/30 leading-relaxed italic">
            Las consultas de IA generativa se han realizado en entornos sin historial de navegación ni influencia de contexto previo. Los resultados pueden variar en función del modelo, la versión y el momento de la consulta.
          </p>
        </div>
      </div>
    </section>
  )
}
