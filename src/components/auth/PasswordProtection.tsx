'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PasswordProtectionProps {
  children: React.ReactNode
  storageKey?: string
  password?: string
  backgroundImage?: string
}

export function PasswordProtection({
  children,
  storageKey = 'propuesta-access',
  password = 'NOR2026',
  backgroundImage = '/images/hero-propuesta2.png',
}: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check localStorage on mount
    const hasAccess = localStorage.getItem(storageKey) === 'true'
    setIsAuthenticated(hasAccess)
  }, [storageKey])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Small delay for UX
    setTimeout(() => {
      if (inputPassword === password) {
        localStorage.setItem(storageKey, 'true')
        setIsAuthenticated(true)
      } else {
        setError('Contraseña incorrecta')
        setInputPassword('')
      }
      setIsLoading(false)
    }, 300)
  }

  // Loading state while checking localStorage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[420px] px-6">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Image
              src="/assets/images/Logo_NORGESTION-blanco_.png"
              alt="NORGESTION"
              width={180}
              height={36}
              className="h-6 w-auto"
              priority
            />
          </div>

          {/* Login Box */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10">
            {/* Title */}
            <h1 className="text-[22px] md:text-[24px] font-semibold text-white text-center mb-2">
              Acceso restringido
            </h1>
            <p className="text-[14px] text-white/50 text-center mb-8">
              Introduce la contraseña para acceder a la propuesta
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  id="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-[15px] placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  autoFocus
                  disabled={isLoading}
                />
                {error && (
                  <p className="mt-2 text-[13px] text-red-400">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputPassword}
                className="w-full bg-[#016936] text-white py-3 text-[15px] font-medium transition-all duration-300 hover:bg-[#015a2d] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <span>Acceder</span>
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-[13px] text-white/40">
            Documento confidencial elaborado por kingseo
          </p>
        </div>
      </div>
    )
  }

  // Show protected content
  return <>{children}</>
}
