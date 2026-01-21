'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
}

interface NavbarProps {
  items: NavItem[]
  darkSections?: string[]
}

// Default dark sections based on typical layout
const DEFAULT_DARK_SECTIONS = ['', 'liderazgo', 'competitivo']

export function Navbar({ items, darkSections = DEFAULT_DARK_SECTIONS }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  // Determine if current section has dark background
  const isDarkSection = darkSections.includes(activeSection)

  useEffect(() => {
    const handleScroll = () => {
      const sections = items
        .filter(item => item.href.startsWith('#'))
        .map(item => item.href.slice(1))

      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(sectionId)
            return
          }
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return activeSection === href.slice(1)
    }
    return pathname === href
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl">
      <div className="max-w-[1176px] mx-auto px-6 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/" className="transition-opacity duration-300 hover:opacity-70">
          <Image
            src={isDarkSection ? "/assets/images/Logo_NORGESTION-blanco_.png" : "/assets/images/Logo_NORGESTION-verde.png"}
            alt="NORGESTION"
            width={200}
            height={40}
            className="h-5 w-auto"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative text-[16px] font-normal py-1 transition-all duration-300",
                  "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:transition-all after:duration-300 after:ease-out",
                  isDarkSection
                    ? "after:bg-[#2a9d5c]"
                    : "after:bg-[#016936]",
                  isActive(item.href)
                    ? isDarkSection
                      ? "text-white after:w-full"
                      : "text-[#1d1d1f] after:w-full"
                    : isDarkSection
                      ? "text-white/70 after:w-0 hover:text-white hover:after:w-full"
                      : "text-[#1d1d1f]/70 after:w-0 hover:text-[#1d1d1f] hover:after:w-full"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={cn(
            "w-5 h-[1.5px] transition-all duration-300",
            isDarkSection ? "bg-white" : "bg-[#1d1d1f]",
            menuOpen && "rotate-45 translate-y-[3px]"
          )} />
          <span className={cn(
            "w-5 h-[1.5px] transition-all duration-300",
            isDarkSection ? "bg-white" : "bg-[#1d1d1f]",
            menuOpen && "-rotate-45 -translate-y-[3px]"
          )} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed top-[68px] left-0 right-0 backdrop-blur-xl transition-all duration-300",
        isDarkSection ? "bg-black/20" : "bg-white/20",
        menuOpen ? "opacity-100 visible" : "opacity-0 invisible -translate-y-full"
      )}>
        <ul className="p-6 space-y-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative text-[16px] font-normal inline-block",
                  "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:transition-all after:duration-300",
                  isDarkSection
                    ? "after:bg-[#2a9d5c]"
                    : "after:bg-[#016936]",
                  isActive(item.href)
                    ? isDarkSection
                      ? "text-white after:w-full"
                      : "text-[#1d1d1f] after:w-full"
                    : isDarkSection
                      ? "text-white/70 after:w-0"
                      : "text-[#1d1d1f]/70 after:w-0"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
