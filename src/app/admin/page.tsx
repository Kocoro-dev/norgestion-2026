import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#11191C]">Dashboard</h1>
        <p className="text-[#666666]">Panel de administración de la propuesta NORGESTION 2026</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informe 2025</CardTitle>
            <CardDescription>Análisis de resultados del ecosistema digital</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/informe"
              className="text-sm text-[#016936] font-medium hover:underline"
            >
              Editar contenido
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Propuesta 2026</CardTitle>
            <CardDescription>Plan de expansión y consolidación</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/propuesta"
              className="text-sm text-[#016936] font-medium hover:underline"
            >
              Editar contenido
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Keywords</CardTitle>
            <CardDescription>Gestión de palabras clave y posicionamiento</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/keywords"
              className="text-sm text-[#016936] font-medium hover:underline"
            >
              Gestionar keywords
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/informe"
              target="_blank"
              className="block text-sm text-[#666666] hover:text-[#11191C]"
            >
              Ver Informe 2025 (nueva pestaña)
            </Link>
            <Link
              href="/propuesta"
              target="_blank"
              className="block text-sm text-[#666666] hover:text-[#11191C]"
            >
              Ver Propuesta 2026 (nueva pestaña)
            </Link>
            <Link
              href="/admin/settings"
              className="block text-sm text-[#666666] hover:text-[#11191C]"
            >
              Configuración general
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[#666666]">
            <p>
              Este panel permite editar todo el contenido de las páginas de informe y propuesta.
            </p>
            <p>
              Los cambios se guardan en Supabase y se reflejan automáticamente en las páginas públicas.
            </p>
            <p className="text-xs text-[#888888]">
              Base de datos: Supabase<br />
              Hosting: Vercel
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
