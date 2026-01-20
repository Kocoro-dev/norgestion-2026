'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      setDemoMode(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Demo mode: skip auth
    if (demoMode) {
      router.push('/admin')
      return
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError('Credenciales incorrectas')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-[#11191C]">
            Panel de Administración
          </CardTitle>
          <CardDescription>
            NORGESTION - Estrategia 2026
          </CardDescription>
        </CardHeader>
        <CardContent>
          {demoMode && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              <strong>Modo Demo:</strong> Supabase no está configurado. Pulsa "Entrar" para acceder sin autenticación.
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            {!demoMode && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@norgestion.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-[#E5E5E5]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-[#E5E5E5]"
                  />
                </div>
              </>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#016936] hover:bg-[#11191C]"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
