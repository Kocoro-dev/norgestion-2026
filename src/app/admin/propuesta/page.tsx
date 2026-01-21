'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export default function AdminPropuesta() {
  const [saving, setSaving] = useState(false)

  const [heroData, setHeroData] = useState({
    badge: 'Propuesta Estratégica',
    title: 'Consolidación y Expansión 2026',
    lead: 'Plan de trabajo para mantener el liderazgo digital y expandir el alcance a nuevos mercados y verticales.',
  })

  const [pricingData, setPricingData] = useState({
    type: 'Cuota Mensual',
    value: '[X]',
    period: 'al mes',
    features: [
      { title: 'Dirección estratégica', description: 'Reuniones periódicas, análisis de competencia, ajuste de prioridades según objetivos de negocio.' },
      { title: 'Diseño y desarrollo web', description: 'Nuevas páginas, mejoras de experiencia de usuario, adaptación continua a dispositivos.' },
      { title: 'Posicionamiento SEO', description: 'Optimización técnica, creación de contenido estratégico, mejora continua de posiciones.' },
      { title: 'Gestión LinkedIn', description: 'Publicaciones para perfil corporativo y socios, interacción, crecimiento de audiencia.' },
      { title: 'Estrategia internacional', description: 'Contenido en inglés, optimización para mercados extranjeros, captación internacional.' },
      { title: 'Soporte tecnológico', description: 'Mantenimiento, seguridad, implementación de nuevas funcionalidades.' },
    ],
    notes: [
      { title: 'ROI estimado', description: 'Con un fee medio de operación de [X]€, la inversión anual se recupera con [X] operaciones originadas digitalmente.' },
      { title: 'Comparativa', description: 'La alternativa sería contratar una agencia externa (sin conocimiento del sector) o un equipo interno (mayor coste fijo).' },
      { title: 'Compromiso', description: 'Facturación mensual. Revisión trimestral de resultados y ajuste de prioridades.' },
    ],
  })

  const handleSave = async () => {
    setSaving(true)
    // TODO: Save to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    toast.success('Cambios guardados correctamente')
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-[#11191C]">Propuesta 2026</h1>
          <p className="text-[#666666]">Edita el contenido de la propuesta</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="pricing">Inversión</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Sección Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-badge">Badge</Label>
                <Input
                  id="hero-badge"
                  value={heroData.badge}
                  onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="hero-title">Título</Label>
                <Input
                  id="hero-title"
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="hero-lead">Descripción</Label>
                <Textarea
                  id="hero-lead"
                  value={heroData.lead}
                  onChange={(e) => setHeroData({ ...heroData, lead: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Sección Inversión</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Tipo</Label>
                  <Input
                    value={pricingData.type}
                    onChange={(e) => setPricingData({ ...pricingData, type: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Valor</Label>
                  <Input
                    value={pricingData.value}
                    onChange={(e) => setPricingData({ ...pricingData, value: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Periodo</Label>
                  <Input
                    value={pricingData.period}
                    onChange={(e) => setPricingData({ ...pricingData, period: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Servicios incluidos</Label>
                {pricingData.features.map((feature, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-4 p-4 bg-[#F5F5F7]">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...pricingData.features]
                          newFeatures[index].title = e.target.value
                          setPricingData({ ...pricingData, features: newFeatures })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...pricingData.features]
                          newFeatures[index].description = e.target.value
                          setPricingData({ ...pricingData, features: newFeatures })
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label>Notas adicionales</Label>
                {pricingData.notes.map((note, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-4 p-4 bg-[#F5F5F7]">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={note.title}
                        onChange={(e) => {
                          const newNotes = [...pricingData.notes]
                          newNotes[index].title = e.target.value
                          setPricingData({ ...pricingData, notes: newNotes })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Textarea
                        value={note.description}
                        onChange={(e) => {
                          const newNotes = [...pricingData.notes]
                          newNotes[index].description = e.target.value
                          setPricingData({ ...pricingData, notes: newNotes })
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
