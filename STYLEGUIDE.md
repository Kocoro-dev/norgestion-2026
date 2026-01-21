# NORGESTION - Guía de Estilos

## Tipografía

### Fuente
- **Familia**: Work Sans
- **Pesos disponibles**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Escala tipográfica

| Elemento | Tamaño | Peso | Notas |
|----------|--------|------|-------|
| H1 | 60px | semibold | Solo en Hero sections |
| H1 Lead | 22px (18px mobile) | regular | Descripción bajo H1, max-width 500px |
| H2 | 48px (32px mobile) | semibold | Títulos de sección |
| H2 Lead | 20px | regular | Descripción bajo H2, max-width 700px |
| H3 | 28px (24px mobile) | normal | Subsecciones |
| H3 Lead | 16px | regular | Descripción bajo H3, max-width 540px |
| Body | 16px | regular | Texto de párrafo estándar |
| Body small | 15px | regular | Texto secundario |
| Caption | 14px | regular | Disclaimers, notas al pie |
| Label | 14px | medium | Etiquetas de sección (uppercase, tracking 0.15em) |
| Navbar | 16px | regular | Links de navegación |

### Mínimos
- Nunca usar menos de **14px** en texto visible
- Excepción: badges de posición (11-12px) por su naturaleza compacta

---

## Colores

### Paleta oficial NORGESTION

| Color | Hex | Nombre |
|-------|-----|--------|
| Verde | `#016936` | Primary green |
| Verde claro | `#EFF2F2` | Light green (fondos) |
| Verde oscuro | `#11191C` | Dark green (fondos oscuros) |
| Negro | `#333333` | Text black |
| Blanco | `#FFFFFF` | White |

### Fondos de sección

| Nombre | Hex | Uso |
|--------|-----|-----|
| White | `#FFFFFF` | Secciones claras (Impact, Hero light) |
| Light Green | `#EFF2F2` | Secciones neutras (Vista general, Comparison) |
| Light Gray | `#f5f5f7` | Alternativa neutra |
| Dark Green | `#11191C` | Sección de Liderazgo/Posicionamiento |
| Green | `#016936` | Hero variant verde |

### Texto

| Contexto | Color | Opacidad |
|----------|-------|----------|
| Título (light bg) | `#1d1d1f` o `#333333` | 100% |
| Título (dark bg) | `#FFFFFF` | 100% |
| Body (light bg) | `#6e6e73` | 100% |
| Body (dark bg) | `#FFFFFF` | 60-75% |
| Muted (dark bg) | `#FFFFFF` | 40-50% |
| Label (light bg) | `#016936` | 100% |
| Label (dark bg) | `#86868b` | 100% |

### Verde corporativo (variantes)

| Variante | Hex | Uso |
|----------|-----|-----|
| Primary | `#016936` | Acentos, botones, labels |
| Light | `#2a9d5c` | Texto en badges oscuros |
| Dark | `#0d3d2a` | Fondo de badges en secciones oscuras |
| Hover | `#016936` con 12% opacity | Estados hover en dark bg |
| Background | `#EFF2F2` | Fondos de sección claros |

---

## Espaciado

### Secciones
- Padding vertical: `py-16 md:py-24` (64px / 96px)
- Ancho máximo: `max-w-[1176px]`
- Padding horizontal: `px-6` (24px)

### Entre bloques (vertical)
- Entre secciones principales: `mb-24` (96px)
- Header a contenido: `mb-12` (48px)
- H3 a descripción: `mb-3` (12px)
- Descripción a contenido: `mb-10` (40px)

### Navbar
- Altura: `h-[68px]`
- Gap entre items: `gap-8`

---

## Componentes

### Keyword Card
```
Contenedor:
- padding: p-6 (24px)
- fondo: bg-[#11191C]
- hover: bg-[#016936]/[0.12]
- transición: transition-all duration-300
- layout: flex flex-col items-start

Badge de posición:
- fondo: bg-[#0d3d2a]
- texto: text-[#2a9d5c]
- tamaño: text-[12px] font-medium
- padding: px-2.5 py-1.5
- margin-bottom: mb-4

Texto keyword:
- tamaño: text-[15px]
- color: text-white/75
- hover: text-white/90
```

### Grid de Keywords
```
- grid: grid-cols-2 md:grid-cols-5
- separadores: gap-[1px] bg-white/[0.06]
- cards sin gap, el fondo del grid crea las líneas
```

### Botones
```
Primary:
- fondo: bg-[#016936]
- hover: bg-[#015a2d]
- texto: text-white text-[15px] font-medium
- padding: px-8 py-3
```

### Tabla
```
Contenedor:
- borde: border border-white/[0.06]
- max-height: max-h-[400px] o max-h-[500px]
- overflow: overflow-y-scroll scrollbar-visible

Header:
- fondo: bg-[#11191C]
- texto: text-white/40 text-[13px] uppercase tracking-wider
- padding: py-4 pl-6

Filas:
- borde: border-white/[0.06]
- hover: hover:bg-[#016936]/[0.12]
- cursor: cursor-pointer (si es clicable)
- padding celdas: py-4, primera celda pl-6
```

### Scrollbar personalizado (secciones oscuras)
```
Clase: scrollbar-visible
Uso: Añadir a contenedores con overflow en secciones de fondo oscuro

IMPORTANTE: Los estilos deben estar dentro de @layer components en globals.css
para que funcionen correctamente en desarrollo (Tailwind CSS 4)

CSS (definido en globals.css):
- width: 8px
- track: rgba(255, 255, 255, 0.06)
- thumb: rgba(255, 255, 255, 0.2)
- thumb hover: rgba(255, 255, 255, 0.3)
- border-radius: 4px

Aplicar a:
- Tablas con scroll vertical
- Listas largas en secciones oscuras
- Cualquier contenedor scrollable en bg-[#11191C]

IMPORTANTE: Añadir data-lenis-prevent para evitar conflictos con Lenis:
<div className="overflow-y-scroll scrollbar-visible" data-lenis-prevent>
```

---

## Bordes y separadores

| Contexto | Valor |
|----------|-------|
| Sección clara | `border-[#d2d2d7]` |
| Sección oscura | `border-white/[0.06]` a `border-white/[0.1]` |
| Grid keywords | `gap-[1px] bg-white/[0.06]` |
| Acento verde | `border-[#016936]` (3px para destacar) |

---

## Estados interactivos

### Hover
- Transición estándar: `transition-all duration-300`
- Transición rápida: `transition-all duration-200`
- Fondo hover (dark): `hover:bg-[#016936]/[0.12]`
- Fondo hover (light): `hover:bg-white/[0.05]`
- Texto hover: opacity de 75% a 90%

### Click / Activo
- Keywords copiables muestran toast de confirmación
- Cursor: `cursor-pointer`

---

## Responsive

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Adaptaciones típicas
- H1: 40px → 52px → 60px
- H2: 32px → 48px
- H3: 22px → 26px
- Grid keywords: 2 cols → 5 cols
- Stats: column → row

---

## Accesibilidad

- Contraste mínimo: 4.5:1 para texto normal
- Elementos interactivos con hover visible
- Focus states heredados de componentes base
- Texto alternativo en imágenes

---

## Animaciones

### Librerías
- **Lenis**: Smooth scroll global (configurado en `/lib/smooth-scroll.tsx`)
- **GSAP + ScrollTrigger**: Animaciones de entrada (configurado en `/lib/animations.tsx`)

### Configuración Lenis
```typescript
duration: 1.2
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
smoothWheel: true
touchMultiplier: 2
```

### Parámetros GSAP estándar
```
Ease: power2.out (Apple-style, suave)
Duración: 0.7-0.9s para elementos, 0.6s para stagger
Distancia: y: 25-40px (vertical)
Start trigger: top 85% (cuando 15% del elemento es visible)
Stagger: 0.08-0.15s entre elementos
```

### Patrones de animación

**Headers de sección:**
```typescript
gsap.set(elements, { opacity: 0, y: 30 })
gsap.to(elements, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 })
```

**Cards y grids:**
```typescript
gsap.set(cards, { opacity: 0, y: 35 })
gsap.to(cards, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 })
```

**Contadores animados:**
```typescript
gsap.fromTo(counter, { textContent: 0 }, {
  textContent: endValue,
  duration: 1.5,
  snap: { textContent: 1 }
})
```

**Barras de progreso:**
```typescript
gsap.fromTo(bar, { width: '0%' }, {
  width: `${percentage}%`,
  duration: 0.8,
  delay: index * 0.05
})
```

### Principios
- Animaciones sutiles tipo Apple - no deben ser protagonistas
- Solo animar al entrar en viewport (once: true)
- Mantener hovers CSS para feedback inmediato
- Evitar animaciones en móvil para performance

### Toast (Sonner)
- Posición: esquina inferior
- Duración: 3 segundos
- Tipo: success para confirmaciones de copiado

---

## Notas de implementación

1. **Consistencia**: Usar siempre los mismos valores. Si dudas, consulta esta guía.
2. **Mobile-first**: Definir estilos base para mobile, luego ampliar con `md:` y `lg:`.
3. **Semántica**: Usar elementos HTML apropiados (h1, h2, h3, p, button).
4. **Performance**: Evitar sombras y filtros complejos. Preferir opacity y transforms.
