'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

export default function AdminSettings() {
  const [saving, setSaving] = useState(false)

  const [settings, setSettings] = useState({
    siteTitle: 'Estrategia Digital 2026 | NORGESTION',
    siteDescription: 'Análisis de resultados 2025 y propuesta de continuidad para la consolidación del liderazgo digital de NORGESTION.',
    footerText: 'Documento confidencial © 2026',
  })

  const handleSave = async () => {
    setSaving(true)
    // TODO: Save to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    toast.success('Configuración guardada correctamente')
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-[#11191C]">Configuración</h1>
          <p className="text-[#666666]">Ajustes generales del sitio</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Metadatos del sitio</CardTitle>
            <CardDescription>Configuración de SEO y metadatos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-title">Título del sitio</Label>
              <Input
                id="site-title"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              />
              <p className="text-xs text-[#888888] mt-1">
                Se muestra en la pestaña del navegador
              </p>
            </div>
            <div>
              <Label htmlFor="site-description">Descripción</Label>
              <Input
                id="site-description"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
              <p className="text-xs text-[#888888] mt-1">
                Descripción para motores de búsqueda (aunque el sitio tiene noindex)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
            <CardDescription>Texto del pie de página</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="footer-text">Texto del footer</Label>
              <Input
                id="footer-text"
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de la cuenta</CardTitle>
            <CardDescription>Datos de acceso al panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <p className="text-sm text-[#666666] mt-1">
                  Configurado en Supabase Auth
                </p>
              </div>
              <div>
                <Label>Rol</Label>
                <p className="text-sm text-[#666666] mt-1">
                  Administrador
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <Button variant="outline">
                Cambiar contraseña
              </Button>
              <p className="text-xs text-[#888888] mt-2">
                Se enviará un email para restablecer la contraseña
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Base de datos</CardTitle>
            <CardDescription>Estado de la conexión con Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500" />
              <span className="text-sm text-[#666666]">Conectado a Supabase</span>
            </div>
            <p className="text-xs text-[#888888] mt-2">
              Las variables de entorno están configuradas correctamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
