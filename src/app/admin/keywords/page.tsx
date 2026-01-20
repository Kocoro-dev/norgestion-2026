'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { keywordsData } from '@/data/keywords'

export default function AdminKeywords() {
  const [keywords, setKeywords] = useState(keywordsData)
  const [filter, setFilter] = useState('')
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newKeyword, setNewKeyword] = useState({ term: '', position: 1 })

  const filteredKeywords = keywords.filter((kw) => {
    return kw.term.toLowerCase().includes(filter.toLowerCase())
  })

  const handleAddKeyword = () => {
    if (!newKeyword.term) {
      toast.error('El término es requerido')
      return
    }
    setKeywords([...keywords, newKeyword])
    setNewKeyword({ term: '', position: 1 })
    setDialogOpen(false)
    toast.success('Keyword añadida')
  }

  const handleDeleteKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index)
    setKeywords(newKeywords)
    toast.success('Keyword eliminada')
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO: Save to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    toast.success('Keywords guardadas correctamente')
  }

  const stats = {
    total: keywords.length,
    top1: keywords.filter(k => k.position === 1).length,
    top5: keywords.filter(k => k.position <= 5).length,
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-[#11191C]">Keywords</h1>
          <p className="text-[#666666]">Gestión de palabras clave y posicionamiento</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Añadir keyword</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añadir nueva keyword</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Término</Label>
                  <Input
                    value={newKeyword.term}
                    onChange={(e) => setNewKeyword({ ...newKeyword, term: e.target.value })}
                    placeholder="consultora m&a"
                  />
                </div>
                <div>
                  <Label>Posición</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={newKeyword.position}
                    onChange={(e) => setNewKeyword({ ...newKeyword, position: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <Button onClick={handleAddKeyword} className="w-full">
                  Añadir
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-semibold text-[#016936]">{stats.total}</div>
            <div className="text-sm text-[#666666]">Total keywords</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-semibold text-[#016936]">{stats.top1}</div>
            <div className="text-sm text-[#666666]">En posición #1</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-semibold text-[#016936]">{stats.top5}</div>
            <div className="text-sm text-[#666666]">En Top 5</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <Input
            placeholder="Buscar keyword..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Keywords ({filteredKeywords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">#</TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead className="w-[100px]">Posición</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeywords.map((keyword, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-[#666666]">{index + 1}</TableCell>
                    <TableCell>{keyword.term}</TableCell>
                    <TableCell className="font-semibold text-[#016936]">
                      #{keyword.position}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteKeyword(keywords.indexOf(keyword))}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
