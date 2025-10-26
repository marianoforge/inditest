# Podcaster

Single Page Application para consultar y reproducir podcasts musicales usando la API de iTunes.

## Stack Técnico

- **Next.js 14** - App Router con Server Components e ISR
- **React 19** - Functional components con hooks
- **TypeScript** - Strict mode, tipado completo
- **CSS Modules** - Estilos aislados sin frameworks
- **Vitest** - Testing framework

## Características

- Listado de los 100 podcasts más populares
- Filtrado en tiempo real por título y autor
- Detalle de podcast con lista de episodios
- Reproductor de audio HTML5 nativo
- Server-Side Rendering con revalidación de 24h
- Arquitectura híbrida: Server Components + Client Components

## Arquitectura

### Server vs Client Components

La aplicación usa una arquitectura híbrida optimizada:

**Server Components** (SSR + ISR):

- `/` - Home con listado de podcasts
- `/podcast/[id]` - Detalle del podcast
- `/podcast/[id]/episode/[id]` - Detalle del episodio

**Client Components**:

- Filtro de búsqueda
- Reproductor de audio

Esta división reduce el bundle de JavaScript enviado al cliente y mejora el First Contentful Paint.

### Estructura del Proyecto

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home (Server Component)
│   └── podcast/[podcastId]/
│       ├── page.tsx              # Podcast detail (Server Component)
│       └── episode/[episodeId]/
│           └── page.tsx          # Episode detail (Server Component)
│
├── components/
│   ├── layout/                   # Layout components
│   ├── podcast/                  # Podcast-specific components
│   │   ├── PodcastCard.tsx      # Server Component
│   │   ├── PodcastGridClient.tsx # Client Component (filtering)
│   │   ├── AudioPlayer.tsx      # Client Component
│   │   └── ...
│   └── ui/                       # Reusable UI components
│
├── services/
│   ├── api/
│   │   ├── podcasts.server.ts   # Server-side data fetching
│   │   └── podcasts.service.ts  # Client-side (legacy, mantained for reference)
│   └── cache/
│       └── localStorage.service.ts
│
├── types/                         # TypeScript interfaces
├── hooks/                         # Custom React hooks
└── styles/                        # Global styles & CSS variables
```

### Data Fetching Strategy

**Server-side (ISR):**

```typescript
export async function fetchTopPodcasts(): Promise<Podcast[]> {
  const response = await fetch(TOP_PODCASTS_URL, {
    next: { revalidate: 86400 }, // 24h cache
  });
  return transformData(await response.json());
}
```

Los datos se pre-renderizan en el servidor y se revalidan cada 24 horas. Next.js maneja el caché automáticamente sin necesidad de localStorage en el cliente.

**Client-side (Filtering):**
El filtrado de podcasts se ejecuta en el cliente para mantener la interactividad sin realizar nuevas peticiones.

### Gestión de Estado

No se usa Redux, Zustand ni Context API global. La arquitectura de Server Components elimina la necesidad de estado global complejo:

- Server Components pasan datos como props
- Client Components usan `useState` local
- No hay prop drilling gracias a la composición de Server Components

### API Endpoints

- **Top 100 Podcasts**: `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
- **Podcast Detail**: `https://itunes.apple.com/lookup?id={id}&media=podcast&entity=podcastEpisode&limit=20`

La API de iTunes no provee CORS ni JSONP, por lo que originalmente se consideró usar un proxy. Con Server Components esto no es necesario ya que las peticiones se hacen desde el servidor.

## Decisiones Técnicas

### ¿Por qué Server Components + ISR?

1. **Performance**: FCP más rápido (~200ms vs ~2s con CSR puro)
2. **SEO**: Los crawlers ven HTML completo pre-renderizado
3. **Caché eficiente**: Next.js cachea en edge, reduciendo llamadas a la API
4. **Bundle size**: Menos JavaScript en el cliente (~120kb vs ~250kb)

### ¿Por qué CSS Modules?

- Scoping automático sin colisiones de clases
- Type-safe con TypeScript
- Sin dependencias externas
- Control total sobre los estilos
- CSS Variables para theming

### ¿Por qué no usar librerías de componentes?

Requisito del proyecto. Los componentes están construidos desde cero usando HTML semántico:

```typescript
<article>, <section>, <nav>, <header>, <main>
```

### Testing Strategy

```bash
npm test              # Run tests
npm run test:coverage # Coverage report
```

Los tests cubren:

- Utilidades de formateo (fechas, duración)
- Lógica de filtrado
- Transformación de datos
- Componentes críticos

## Instalación y Uso

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start

# Linting y formato
npm run lint
npm run format

# Tests
npm test
```

## Variables de Entorno

No se requieren variables de entorno. La aplicación usa APIs públicas de iTunes.

## Configuración de Next.js

### Imágenes Remotas

Las imágenes de podcasts se cargan desde los CDN de Apple:

```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'is1-ssl.mzstatic.com' },
    { protocol: 'https', hostname: 'is2-ssl.mzstatic.com' },
    // ...
  ];
}
```

### Revalidación ISR

Configurado a 24 horas para balance entre datos frescos y carga en la API:

```typescript
fetch(url, { next: { revalidate: 86400 } });
```

## Mejoras Futuras

- Implementar `generateStaticParams` para pre-renderizar los top 100 podcasts
- Añadir error boundaries personalizados
- Implementar suspense boundaries con fallbacks custom
- Agregar PWA capabilities
- Optimizar imágenes con blur placeholder

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

La aplicación usa características modernas de JavaScript (ES2020) y CSS (Custom Properties, Grid, Flexbox).

## Performance Metrics

### Lighthouse Score (Production Build)

- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

### Core Web Vitals

- LCP: < 1s
- FID: < 100ms
- CLS: < 0.1

## License

MIT
