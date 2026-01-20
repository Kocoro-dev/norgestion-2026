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
}

export function Navbar({ items }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

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
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#d2d2d7] z-[1000]">
      <div className="max-w-[1176px] mx-auto px-6 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/images/Logo_NORGESTION-verde.png"
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
                  "text-[16px] font-normal transition-colors",
                  isActive(item.href)
                    ? "text-[#016936]"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]"
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
            "w-5 h-[1.5px] bg-[#1d1d1f] transition-transform",
            menuOpen && "rotate-45 translate-y-[3px]"
          )} />
          <span className={cn(
            "w-5 h-[1.5px] bg-[#1d1d1f] transition-transform",
            menuOpen && "-rotate-45 -translate-y-[3px]"
          )} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed top-[68px] left-0 right-0 bg-white border-b border-[#d2d2d7] transition-all",
        menuOpen ? "opacity-100 visible" : "opacity-0 invisible -translate-y-full"
      )}>
        <ul className="p-6 space-y-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-[16px] font-normal",
                  isActive(item.href)
                    ? "text-[#016936]"
                    : "text-[#6e6e73]"
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
