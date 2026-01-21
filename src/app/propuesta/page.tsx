'use client'

import { Navbar, Footer } from '@/components/layout'
import { PasswordProtection } from '@/components/auth'
import {
  HeroSection,
  ObjectivesSection,
  ActionsSection,
  PricingSection,
  NextStepsSection,
  PhilosophySection,
  CTASection,
} from '@/components/sections'

const navItems = [
  { label: 'Objetivos', href: '#objetivos' },
  { label: 'Actuación', href: '#actuacion' },
  { label: 'Inversión', href: '#inversion' },
  { label: 'Calendario', href: '#siguientes-pasos' },
  { label: 'Filosofía', href: '#filosofia' },
]

const darkSections = ['', 'actuacion', 'siguientes-pasos']

export default function PropuestaPage() {
  return (
    <PasswordProtection
      storageKey="propuesta-access"
      password="NOR2026"
      backgroundImage="/images/hero-propuesta2.png"
    >
      <Navbar items={navItems} darkSections={darkSections} />

      <main id="pdf-content">
        <HeroSection
          badge="Propuesta 2026"
          title={<>Propuesta estratégica:<br /><em>consolidación y expansión</em> 2026</>}
          lead="Plan de trabajo para mantener el liderazgo actual y expandir el alcance hacia nuevos mercados, verticales, modelos de inteligencia (GEO) y reputación de marca."
          variant="dark"
          backgroundImage="/images/hero-propuesta2.png"
        />

        <ObjectivesSection
          label="Objetivos"
          title="Objetivos estratégicos"
          subtitle="Cuatro ejes para consolidar el liderazgo y expandir el alcance."
        />

        <ActionsSection
          label="Actuación"
          title="Líneas de actuación"
          subtitle="Seis tácticas complementarias para alcanzar los objetivos."
        />

        <PricingSection
          label="Inversión"
          title="Propuesta económica"
        />

        <NextStepsSection
          label="Siguientes pasos"
          title="Calendario de activación"
        />

        <PhilosophySection
          label="Filosofía"
          title="Nuestra posición ante la tecnología"
        />

        {/* CTA - PDF Download */}
        <CTASection
          title="Descargar propuesta"
          description="Genera un PDF con el contenido de esta propuesta."
          buttonText="Descargar PDF Visual"
          mode="pdf"
          pdfTargetId="pdf-content"
          pdfFilename="NORGESTION-Propuesta-2026.pdf"
          pdfTextFilename="NORGESTION-Propuesta-Texto-2026.pdf"
          pdfType="propuesta"
          variant="light"
          centered
          showSeparator
        />
      </main>

      <Footer />
    </PasswordProtection>
  )
}
