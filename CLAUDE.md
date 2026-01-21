# NORGESTION - Propuesta 2026

## Descripción
Aplicación web para NORGESTION que incluye:
- Informe de resultados 2025
- Propuesta de servicios 2026 (por desarrollar)
- Panel admin interno para gestionar contenido

## Tecnologías
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui (Radix UI)
- **Base de datos**: Supabase
- **Formularios**: React Hook Form + Zod
- **PDF**: jsPDF + html2canvas-pro

## Estructura del proyecto
```
/react-app
  /src
    /app              # Rutas (App Router)
      /admin          # Panel de administración
      /login          # Autenticación
      /informe        # Página del informe 2025
      /propuesta      # Página de propuesta 2026
    /components
      /ui             # Componentes shadcn/ui
      /sections       # Secciones de las páginas
      /layout         # Navbar, Footer
    /lib
      /supabase       # Cliente y server de Supabase
      utils.ts        # Utilidades (cn)
      pdf-generator.ts
    /data             # Datos estáticos (keywords, rankings)
    /types            # Tipos TypeScript
```

## Comandos
```bash
cd react-app
npm run dev      # Desarrollo local (localhost:3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

## Repositorio y servicios
- **GitHub**: https://github.com/Koro-dev/norgestion-2026
- **Hosting**: Vercel (deploy automático desde main)
- **Base de datos**: Supabase

## Guía de estilos
Consultar `/react-app/styleguide.md` antes de crear o modificar componentes UI. Incluye:
- Paleta de colores corporativos (verde #016936)
- Escala tipográfica (Work Sans)
- Espaciados y breakpoints
- Especificaciones de componentes
