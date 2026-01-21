import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { SmoothScrollProvider } from "@/lib/smooth-scroll"
import { AnimationProvider } from "@/lib/animations"
import "./globals.css"

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Estrategia Digital 2026 | NORGESTION",
  description: "Análisis de resultados 2025 y propuesta de continuidad para la consolidación del liderazgo digital de NORGESTION.",
  robots: "noindex, nofollow",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${workSans.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </SmoothScrollProvider>
        <Toaster />
      </body>
    </html>
  )
}
