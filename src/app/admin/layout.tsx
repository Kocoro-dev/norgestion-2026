'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Informe 2025', href: '/admin/informe' },
  { label: 'Propuesta 2026', href: '/admin/propuesta' },
  { label: 'Keywords', href: '/admin/keywords' },
  { label: 'Configuración', href: '/admin/settings' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [demoMode, setDemoMode] = useState(true)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    setDemoMode(!supabaseUrl)
  }, [])

  const handleLogout = async () => {
    if (!demoMode) {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        await supabase.auth.signOut()
      } catch {
        // Ignore errors
      }
    }
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-[#E5E5E5]">
        <div className="p-6 border-b border-[#E5E5E5]">
          <Link href="/admin">
            <Image
              src="/assets/images/Logo_NORGESTION-verde.png"
              alt="NORGESTION"
              width={90}
              height={18}
              className="h-[18px] w-auto"
            />
          </Link>
          <p className="text-xs text-[#666666] mt-2">Panel de Administración</p>
          {demoMode && (
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] bg-amber-100 text-amber-700">
              MODO DEMO
            </span>
          )}
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-4 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-[#016936] text-white font-medium"
                      : "text-[#666666] hover:bg-[#F5F5F7] hover:text-[#11191C]"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E5E5]">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-[#666666] hover:bg-[#F5F5F7] hover:text-[#11191C] transition-colors text-left"
          >
            Cerrar sesión
          </button>
          <div className="mt-4 flex gap-4">
            <Link
              href="/informe"
              target="_blank"
              className="text-xs text-[#016936] hover:underline"
            >
              Ver Informe
            </Link>
            <Link
              href="/propuesta"
              target="_blank"
              className="text-xs text-[#016936] hover:underline"
            >
              Ver Propuesta
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
