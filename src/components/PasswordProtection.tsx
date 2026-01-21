'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PasswordProtectionProps {
  children: React.ReactNode
  storageKey: string
  password: string
  backgroundImage?: string
}

export function PasswordProtection({
  children,
  storageKey,
  password,
  backgroundImage = '/images/hero-bg-2-hd.png',
}: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    setIsAuthenticated(stored === 'true')
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
      <div className="min-h-screen bg-[#11191C] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    )
  }

  // Show content if authenticated
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Login screen
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#11191C]/85" />
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/assets/images/Logo_NORGESTION-blanco_.png"
            alt="NORGESTION"
            width={196}
            height={39}
            className="h-7 w-auto"
            priority
          />
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-8">
          <h1 className="text-2xl font-semibold text-white text-center mb-2">
            Acceso restringido
          </h1>
          <p className="text-white/50 text-center mb-8">
            Introduce la contraseña para acceder al informe
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value)
                  setError('')
                }}
                placeholder="Contraseña"
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/40 focus:outline-none focus:border-[#016936]/50 focus:bg-white/[0.08] transition-all duration-200"
                autoFocus
                autoComplete="current-password"
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputPassword}
              className="w-full py-3 bg-[#016936] text-white font-medium hover:bg-[#015a2d] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </>
              ) : (
                'Acceder'
              )}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-white/30 text-sm">
          Si no tienes la contraseña, contacta con tu representante
        </p>
      </div>
    </div>
  )
}
