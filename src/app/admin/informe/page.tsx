'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export default function AdminInforme() {
  const [saving, setSaving] = useState(false)

  // Form state - would be loaded from Supabase
  const [heroData, setHeroData] = useState({
    badge: 'Informe de Resultados',
    title: 'Análisis del Ecosistema Digital 2025',
    lead: 'Evaluación del rendimiento de la estrategia digital y el posicionamiento de NORGESTION en el mercado de M&A y Corporate Finance.',
  })

  const [contextStats, setContextStats] = useState([
    { value: '70%', description: 'de los procesos de búsqueda de asesores financieros comienzan en Google.' },
    { value: '24/7', description: 'La web funciona como escaparate permanente para clientes de todo el mundo.' },
    { value: '0€', description: 'en publicidad pagada. Todo el tráfico es orgánico y cualificado.' },
  ])

  const [metrics, setMetrics] = useState([
    { value: '2:30', unit: 'min', title: 'Tiempo de lectura', description: 'Los visitantes dedican una media de 2 minutos y medio a explorar el contenido.' },
    { value: '65', unit: '%', title: 'Captación de nuevos clientes', description: 'El 65% de las visitas llegan buscando soluciones.' },
    { value: '53', unit: '%', title: 'Nivel de interacción', description: 'Más de la mitad de los visitantes interactúan activamente.' },
    { value: '1/3', unit: '', title: 'Visitantes con intención', description: 'Un tercio de los visitantes busca activamente soluciones de M&A.' },
  ])

  const [impactData, setImpactData] = useState({
    totalContacts: '[X]+',
    leadTypes: [
      { title: 'Venta de empresa', description: 'Empresarios interesados en vender su compañía', count: '[X]' },
      { title: 'Búsqueda de adquisiciones', description: 'Inversores buscando oportunidades de compra', count: '[X]' },
      { title: 'Captación de talento', description: 'Profesionales interesados en unirse al equipo', count: '[X]' },
      { title: 'Otras consultas', description: 'Servicios específicos, colaboraciones', count: '[X]' },
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
          <h1 className="text-3xl font-semibold text-[#11191C]">Informe 2025</h1>
          <p className="text-[#666666]">Edita el contenido del informe de análisis</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="contexto">Contexto</TabsTrigger>
          <TabsTrigger value="metricas">Métricas</TabsTrigger>
          <TabsTrigger value="impacto">Impacto</TabsTrigger>
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

        <TabsContent value="contexto">
          <Card>
            <CardHeader>
              <CardTitle>Sección Contexto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contextStats.map((stat, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-4 p-4 bg-[#F5F5F7]">
                  <div>
                    <Label>Valor</Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...contextStats]
                        newStats[index].value = e.target.value
                        setContextStats(newStats)
                      }}
                    />
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={stat.description}
                      onChange={(e) => {
                        const newStats = [...contextStats]
                        newStats[index].description = e.target.value
                        setContextStats(newStats)
                      }}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metricas">
          <Card>
            <CardHeader>
              <CardTitle>Sección Métricas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={index} className="p-4 bg-[#F5F5F7] space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Valor</Label>
                      <Input
                        value={metric.value}
                        onChange={(e) => {
                          const newMetrics = [...metrics]
                          newMetrics[index].value = e.target.value
                          setMetrics(newMetrics)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Unidad</Label>
                      <Input
                        value={metric.unit}
                        onChange={(e) => {
                          const newMetrics = [...metrics]
                          newMetrics[index].unit = e.target.value
                          setMetrics(newMetrics)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={metric.title}
                        onChange={(e) => {
                          const newMetrics = [...metrics]
                          newMetrics[index].title = e.target.value
                          setMetrics(newMetrics)
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={metric.description}
                      onChange={(e) => {
                        const newMetrics = [...metrics]
                        newMetrics[index].description = e.target.value
                        setMetrics(newMetrics)
                      }}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impacto">
          <Card>
            <CardHeader>
              <CardTitle>Sección Impacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Total de contactos</Label>
                <Input
                  value={impactData.totalContacts}
                  onChange={(e) => setImpactData({ ...impactData, totalContacts: e.target.value })}
                />
              </div>
              <div className="space-y-4">
                <Label>Tipología de leads</Label>
                {impactData.leadTypes.map((lead, index) => (
                  <div key={index} className="grid md:grid-cols-3 gap-4 p-4 bg-[#F5F5F7]">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={lead.title}
                        onChange={(e) => {
                          const newLeads = [...impactData.leadTypes]
                          newLeads[index].title = e.target.value
                          setImpactData({ ...impactData, leadTypes: newLeads })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Input
                        value={lead.description}
                        onChange={(e) => {
                          const newLeads = [...impactData.leadTypes]
                          newLeads[index].description = e.target.value
                          setImpactData({ ...impactData, leadTypes: newLeads })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Cantidad</Label>
                      <Input
                        value={lead.count}
                        onChange={(e) => {
                          const newLeads = [...impactData.leadTypes]
                          newLeads[index].count = e.target.value
                          setImpactData({ ...impactData, leadTypes: newLeads })
                        }}
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
