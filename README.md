# NORGESTION - Estrategia Digital 2026

Aplicación React/Next.js para la presentación de informes y propuestas estratégicas.

## Stack Tecnológico

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes UI
- **Supabase** - Base de datos, Auth y Storage

## Requisitos

- Node.js 18+
- npm
- Cuenta en [Supabase](https://supabase.com)

---

## Setup Inicial (Primera vez)

### 1. Crear proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com) y crear cuenta/login
2. Crear nuevo proyecto:
   - Nombre: `norgestion-estrategia`
   - Región: `West EU (Frankfurt)`
   - Guardar la contraseña de la base de datos

### 2. Crear tablas en Supabase

Ir a **SQL Editor** en Supabase y ejecutar:

```sql
-- Páginas
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Secciones
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255),
  content JSONB DEFAULT '{}',
  "order" INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Keywords
CREATE TABLE keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term VARCHAR(255) NOT NULL,
  position INTEGER NOT NULL,
  category VARCHAR(100),
  is_highlighted BOOLEAN DEFAULT false,
  is_tech BOOLEAN DEFAULT false,
  is_international BOOLEAN DEFAULT false,
  geo_city VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  type VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configuración global
CREATE TABLE settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_sections_page ON sections(page_id);
CREATE INDEX idx_keywords_position ON keywords(position);
CREATE INDEX idx_keywords_category ON keywords(category);

-- Insertar páginas iniciales
INSERT INTO pages (slug, title, meta_description) VALUES
('informe', 'Informe 2025', 'Análisis del ecosistema digital 2025'),
('propuesta', 'Propuesta 2026', 'Plan de expansión y consolidación 2026');
```

### 3. Configurar Storage en Supabase

1. Ir a **Storage** en Supabase
2. Crear nuevo bucket: `images`
3. Marcar como **Public**

### 4. Configurar Auth en Supabase

1. Ir a **Authentication** → **Providers**
2. Asegurar que **Email** está habilitado
3. Ir a **Authentication** → **Users**
4. Crear usuario admin con email y contraseña

### 5. Obtener credenciales

Ir a **Settings** → **API** y copiar:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Setup Local (Cada desarrollador)

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-org/norgestion-estrategia-2026.git
cd norgestion-estrategia-2026/react-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editar `.env.local` con las credenciales reales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=admin@norgestion.com
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Estructura del Proyecto

```
src/
├── app/                    # Rutas (App Router)
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página raíz
│   ├── informe/            # /informe
│   ├── propuesta/          # /propuesta
│   ├── admin/              # /admin (protegido)
│   │   ├── layout.tsx      # Layout admin con auth
│   │   ├── page.tsx        # Dashboard
│   │   ├── informe/        # Editor informe
│   │   ├── propuesta/      # Editor propuesta
│   │   └── keywords/       # Gestión keywords
│   └── api/                # API Routes
├── components/
│   ├── ui/                 # Componentes shadcn
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Secciones de las páginas
│   └── admin/              # Componentes del admin
├── lib/
│   ├── supabase/           # Clientes Supabase
│   └── utils.ts            # Utilidades
├── types/
│   └── database.ts         # Tipos TypeScript
└── styles/
    └── globals.css         # Estilos globales
```

---

## Flujo de Trabajo (Git)

### Ramas

- `main` - Producción (protegida)
- `dev` - Desarrollo
- `feature/*` - Nuevas funcionalidades

### Crear nueva feature

```bash
git checkout dev
git pull origin dev
git checkout -b feature/nombre-tarea
```

### Commits

```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/nombre-tarea
```

### Convención de commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `style:` Cambios de estilos
- `refactor:` Refactorización
- `docs:` Documentación

### Merge

1. Crear Pull Request en GitHub: `feature/xxx` → `dev`
2. Review por otro desarrollador
3. Merge a `dev`
4. Cuando esté estable: `dev` → `main`

---

## Despliegue (Vercel)

### Primera vez

1. Ir a [vercel.com](https://vercel.com)
2. Import Git Repository
3. Seleccionar el repositorio
4. Configurar:
   - Framework: Next.js
   - Root Directory: `react-app`
5. Añadir variables de entorno (igual que `.env.local`)
6. Deploy

### Despliegues automáticos

- Push a `main` → Deploy a producción
- Push a `dev` → Deploy preview

---

## Comandos

```bash
npm run dev      # Desarrollo local
npm run build    # Compilar para producción
npm run start    # Ejecutar build
npm run lint     # Verificar código
```

---

## URLs

- **Local:** http://localhost:3000
- **Producción:** https://tu-proyecto.vercel.app

### Rutas públicas
- `/informe` - Informe 2025
- `/propuesta` - Propuesta 2026

### Rutas admin (requiere login)
- `/admin` - Dashboard
- `/admin/informe` - Editar informe
- `/admin/propuesta` - Editar propuesta
- `/admin/keywords` - Gestionar keywords
