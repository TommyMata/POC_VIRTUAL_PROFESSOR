# POC Virtual Professor - Frontend Standards Guide

Este documento define los estándares y mejores prácticas para el desarrollo del Frontend. Úsalo como referencia para mantener consistencia en el código.

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.2.0 | UI Library |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 7.2.4 | Build tool |
| Ant Design | 6.2.1 | Componentes UI |
| Tailwind CSS | 4.1.18 | Utilidades CSS |
| i18next | 25.8.0 | Internacionalización |
| React Router | 7.12.0 | Routing |
| Axios | 1.13.2 | HTTP Client |

---

## Estructura del Proyecto

```
src/
├── app/                    # Punto de entrada y configuración
│   ├── App.tsx            # Componente raíz
│   ├── main.tsx           # Entry point
│   ├── providers.tsx      # Providers (Router, i18n, Context, Ant Design)
│   └── router.tsx         # Configuración de rutas
├── components/
│   ├── common/            # Componentes reutilizables
│   │   └── [ComponentName]/
│   │       ├── ComponentName.tsx
│   │       ├── ComponentName.css  (opcional)
│   │       └── index.ts
│   └── layout/            # Layouts
│       └── MainLayout/
├── features/              # Páginas organizadas por dominio
│   └── [featureName]/
│       ├── components/
│       │   └── FeatureNamePage.tsx
│       └── index.ts
├── hooks/                 # Custom hooks
├── services/api/          # Servicios API
├── contexts/              # React contexts
├── config/                # Configuración (env, routes, theme)
├── types/                 # Tipos TypeScript globales
├── lib/                   # Librerías configuradas (axios, i18n)
├── locales/               # Traducciones (en/, es/)
│   ├── en/common.json
│   └── es/common.json
└── assets/styles/         # Estilos globales
```

### Path Aliases

Usa estos aliases en lugar de rutas relativas:

```typescript
import { Button } from '@components/common'
import { useApi } from '@hooks/useApi'
import type { Course } from '@/types/api.types'
```

| Alias | Ruta |
|-------|------|
| `@/*` | `./src/*` |
| `@components/*` | `./src/components/*` |
| `@features/*` | `./src/features/*` |
| `@hooks/*` | `./src/hooks/*` |
| `@services/*` | `./src/services/*` |
| `@types/*` | `./src/types/*` |
| `@config/*` | `./src/config/*` |
| `@lib/*` | `./src/lib/*` |
| `@contexts/*` | `./src/contexts/*` |
| `@locales/*` | `./src/locales/*` |
| `@assets/*` | `./src/assets/*` |

---

## Creación de Componentes

### Estructura de carpeta

```
ComponentName/
├── ComponentName.tsx      # Componente principal
├── ComponentName.css      # Estilos (solo si necesario)
└── index.ts               # Barrel export
```

### Template de componente

```typescript
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

export interface ComponentNameProps {
  title: string
  children?: ReactNode
  onClick?: () => void
}

export function ComponentName({ title, children, onClick }: ComponentNameProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

### Barrel export (index.ts)

```typescript
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName'
```

### Convenciones de nombres

- **Componentes**: PascalCase → `ClassCard`, `FileUpload`, `PageHeader`
- **Props interface**: `[ComponentName]Props` → `ClassCardProps`
- **Archivos CSS**: mismo nombre → `ClassCard.css`

---

## Manejo de Estilos

### Jerarquía (en orden de preferencia)

1. **Ant Design Theme Config** - Para personalización global
2. **Tailwind CSS** - Para layout y utilidades rápidas
3. **CSS Custom** - Solo cuando los anteriores no son suficientes

### Cuándo usar cada uno

| Situación | Usar |
|-----------|------|
| Colores, bordes, fuentes globales | Ant Design Theme (`config/theme.ts`) |
| Layout, spacing, flex, grid | Tailwind |
| Componentes Ant Design | Componentes de antd directamente |
| Animaciones complejas | CSS custom |
| Pseudo-elementos (::before, ::after) | CSS custom |
| Hover/focus con transiciones | CSS custom |

### Ejemplo con Tailwind

```tsx
<div className="flex items-center justify-between gap-4 p-6 mb-4">
  <span className="text-lg font-semibold text-primary-500">
    {title}
  </span>
</div>
```

### Ejemplo con CSS custom

```css
/* ComponentName.css */
.component-name {
  transition: all 0.3s ease;
}

.component-name:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
```

### Clases Tailwind comunes

```
Layout:     flex, flex-col, items-center, justify-between, gap-*
Spacing:    m-*, p-*, mb-*, mt-*, mx-auto
Text:       text-lg, text-sm, font-semibold, font-medium
Colors:     text-primary-500, text-neutral-400, bg-white
Border:     rounded-lg, border, border-neutral-200
Responsive: max-sm:*, max-md:*, max-lg:*
```

---

## Internacionalización (i18n)

### Estructura de archivos

```
src/locales/
├── en/
│   └── common.json    # Traducciones inglés
└── es/
    └── common.json    # Traducciones español
```

### Estructura de claves

```json
{
  "app": {
    "name": "POC Virtual Professor",
    "loading": "Loading..."
  },
  "navigation": {
    "home": "Home",
    "dashboard": "Dashboard",
    "courses": "Courses"
  },
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "feature": {
    "title": "Feature Title",
    "form": {
      "fieldName": "Field Label",
      "validation": {
        "required": "This field is required"
      }
    },
    "messages": {
      "success": "Operation successful",
      "fileSelected": "File \"{{fileName}}\" selected"
    }
  }
}
```

### Uso en componentes funcionales

```typescript
import { useTranslation } from 'react-i18next'

export function MyComponent() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('feature.title')}</h1>
      <button>{t('common.save')}</button>
    </div>
  )
}
```

### Interpolación de variables

```typescript
// JSON: "fileSelected": "File \"{{fileName}}\" selected"
message.success(t('feature.messages.fileSelected', { fileName: file.name }))
```

### Uso en componentes de clase (ErrorBoundary)

```typescript
import { withTranslation, type WithTranslation } from 'react-i18next'

interface Props extends WithTranslation {
  children: ReactNode
}

class MyClassComponent extends Component<Props> {
  render() {
    const { t } = this.props
    return <span>{t('errors.generic')}</span>
  }
}

export const MyComponent = withTranslation()(MyClassComponent)
```

### Agregar nuevas traducciones

1. Agregar clave en `src/locales/es/common.json`
2. Agregar clave en `src/locales/en/common.json`
3. Usar con `t('nueva.clave')`

---

## Manejo de Estado (Context API)

### Patrón de Context

```typescript
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'

// 1. Tipos
type Theme = 'light' | 'dark'

interface MyContextState {
  theme: Theme
}

interface MyContextValue extends MyContextState {
  setTheme: (theme: Theme) => void
}

// 2. Crear contexto
const MyContext = createContext<MyContextValue | undefined>(undefined)

// 3. Provider
export function MyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MyContextState>({
    theme: 'light',
  })

  const setTheme = useCallback((theme: Theme) => {
    setState((prev) => ({ ...prev, theme }))
    localStorage.setItem('app-theme', theme)
  }, [])

  const value = useMemo<MyContextValue>(
    () => ({ ...state, setTheme }),
    [state, setTheme]
  )

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}

// 4. Hook personalizado
export function useMyContext(): MyContextValue {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
```

### Contexto global existente (AppContext)

```typescript
import { useApp } from '@contexts/AppContext'

function MyComponent() {
  const { language, setLanguage, theme, setTheme } = useApp()
  // ...
}
```

---

## Servicios y Hooks

### Estructura de servicios API

**Endpoints** (`src/services/api/endpoints.ts`):
```typescript
export const ENDPOINTS = {
  COURSES: '/courses',
  COURSE_BY_ID: (id: string) => `/courses/${id}`,
  CLASSES: '/classes',
} as const
```

**Uso del servicio**:
```typescript
import { apiService } from '@services/api'
import { ENDPOINTS } from '@services/api/endpoints'

const response = await apiService.get<Course[]>(ENDPOINTS.COURSES)
```

### Hooks disponibles

#### useApi - Llamadas API con estado

```typescript
import { useApi } from '@hooks/useApi'

function MyComponent() {
  const { data, loading, error, execute, reset } = useApi<Course[]>(
    () => apiService.get(ENDPOINTS.COURSES)
  )

  useEffect(() => {
    execute()
  }, [execute])

  if (loading) return <Loading />
  if (error) return <Error message={error.message} />
  return <CourseList courses={data} />
}
```

#### useLazyApi - Llamadas API con parámetros

```typescript
import { useLazyApi } from '@hooks/useLazyApi'

function CourseDetail() {
  const { courseId } = useParams()
  const { data, loading, execute } = useLazyApi<CourseDetail, [string]>(
    (id) => apiService.get(ENDPOINTS.COURSE_BY_ID(id))
  )

  useEffect(() => {
    if (courseId) execute(courseId)
  }, [courseId, execute])
}
```

#### useDebounce - Valores con debounce

```typescript
import { useDebounce } from '@hooks/useDebounce'

function SearchComponent() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    // Se ejecuta 500ms después de que el usuario deja de escribir
    fetchResults(debouncedSearch)
  }, [debouncedSearch])
}
```

#### useLocalStorage - Persistencia local

```typescript
import { useLocalStorage } from '@hooks/useLocalStorage'

function MyComponent() {
  const [value, setValue, removeValue] = useLocalStorage<string>('key', 'default')
}
```

---

## TypeScript y Tipos

### Ubicación de tipos

- **Tipos de API**: `src/types/api.types.ts`
- **Tipos globales**: `src/types/index.ts`
- **Props de componentes**: En el mismo archivo del componente

### Patrones comunes

```typescript
// Response genérica
export interface ApiResponse<T> {
  data: T
  status: number
  success: boolean
  message?: string
}

// Entidades de dominio
export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  totalClasses: number
  createdAt: string
  updatedAt: string
}

// Extender entidades
export interface CourseDetail extends Course {
  classes: Class[]
}

// Props de componentes
export interface CourseCardProps {
  course: Course
  onClick?: () => void
}
```

### Exportación de tipos

```typescript
// En el componente
export interface ButtonProps extends AntButtonProps {
  children?: ReactNode
}

// En index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

---

## Routing

### Definición de rutas (`src/config/routes.ts`)

```typescript
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE: '/course',
  COURSE_DETAIL: '/courses/:courseId',
} as const
```

### Lazy loading de páginas

```typescript
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loading } from '@components/common'
import { MainLayout } from '@components/layout/MainLayout'
import { ROUTES } from '@config/routes'

const DashboardPage = lazy(() =>
  import('@features/dashboard').then((module) => ({ default: module.DashboardPage }))
)

const CoursesPage = lazy(() =>
  import('@features/courses').then((module) => ({ default: module.CoursesPage }))
)

export function AppRouter() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.COURSES} element={<CoursesPage />} />
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.COURSES} replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
```

### Navegación

```typescript
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@config/routes'

function MyComponent() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(ROUTES.COURSES)
    // Con parámetros:
    navigate(ROUTES.COURSE_DETAIL.replace(':courseId', id))
  }
}
```

---

## Convenciones de Código

### Naming

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `ClassCard`, `FileUpload` |
| Hooks | camelCase + "use" | `useApi`, `useDebounce` |
| Contextos | PascalCase + "Context/Provider" | `AppContext`, `AppProvider` |
| Tipos/Interfaces | PascalCase | `CourseDetail`, `ApiResponse` |
| Constantes | UPPER_SNAKE_CASE | `ENDPOINTS`, `ROUTES` |
| Funciones/Variables | camelCase | `fetchCourses`, `handleClick` |

### Orden de imports

```typescript
// 1. React
import { useState, useEffect, useCallback } from 'react'

// 2. Librerías externas
import { Card, Form, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

// 3. Componentes internos
import { PageHeader } from '@components/common'
import { Button } from '@components/common'

// 4. Hooks, servicios, utils
import { useApi } from '@hooks/useApi'
import { apiService } from '@services/api'

// 5. Tipos
import type { Course } from '@/types/api.types'

// 6. Estilos
import './ComponentName.css'
```

### Exports

- **Usar named exports** (no default exports)
- **Barrel exports** en cada `index.ts`
- **Exportar tipos** junto con componentes

```typescript
// Correcto
export function MyComponent() { }
export { MyComponent } from './MyComponent'

// Evitar
export default MyComponent
```

---

## Herramientas

### Prettier

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "jsxSingleQuote": false,
  "arrowParens": "always"
}
```

### Scripts npm

```bash
npm run dev      # Desarrollo con HMR
npm run build    # Build de producción
npm run lint     # Ejecutar ESLint
npm run preview  # Preview del build
```

---

## Guía: Crear Nueva Feature

### Checklist

1. **Crear estructura de carpetas**
   ```
   src/features/[featureName]/
   ├── components/
   │   ├── FeatureNamePage.tsx
   │   └── index.ts
   └── index.ts
   ```

2. **Crear componente de página**
   ```typescript
   // src/features/myFeature/components/MyFeaturePage.tsx
   import { useTranslation } from 'react-i18next'
   import { PageHeader } from '@components/common'

   export function MyFeaturePage() {
     const { t } = useTranslation()
     return (
       <div>
         <PageHeader title={t('myFeature.title')} />
         {/* Contenido */}
       </div>
     )
   }
   ```

3. **Crear barrel exports**
   ```typescript
   // src/features/myFeature/components/index.ts
   export { MyFeaturePage } from './MyFeaturePage'

   // src/features/myFeature/index.ts
   export { MyFeaturePage } from './components'
   ```

4. **Agregar ruta**
   ```typescript
   // src/config/routes.ts
   export const ROUTES = {
     // ...existentes
     MY_FEATURE: '/my-feature',
   } as const
   ```

5. **Agregar a router**
   ```typescript
   // src/app/router.tsx
   const MyFeaturePage = lazy(() =>
     import('@features/myFeature').then((m) => ({ default: m.MyFeaturePage }))
   )

   // En Routes:
   <Route path={ROUTES.MY_FEATURE} element={<MyFeaturePage />} />
   ```

6. **Agregar traducciones**
   ```json
   // src/locales/es/common.json
   {
     "myFeature": {
       "title": "Mi Feature"
     }
   }

   // src/locales/en/common.json
   {
     "myFeature": {
       "title": "My Feature"
     }
   }
   ```

7. **Agregar navegación (opcional)**
   ```typescript
   // src/components/layout/MainLayout/MainLayout.tsx
   const menuItems: MenuProps['items'] = [
     // ...existentes
     {
       key: ROUTES.MY_FEATURE,
       icon: <SomeIcon />,
       label: t('navigation.myFeature'),
     },
   ]
   ```

---

## Referencias Rápidas

### Componentes Ant Design más usados

```typescript
import {
  Button, Card, Form, Input, Select, Table,
  Modal, message, notification, Spin, Empty,
  Row, Col, Space, Typography, Divider,
  Menu, Layout, Breadcrumb, Dropdown
} from 'antd'

import {
  PlusOutlined, EditOutlined, DeleteOutlined,
  SearchOutlined, LoadingOutlined
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Header, Sider, Content } = Layout
```

### Mensajes y notificaciones

```typescript
import { message, notification } from 'antd'

// Mensajes simples
message.success(t('messages.success'))
message.error(t('messages.error'))
message.warning(t('messages.warning'))

// Notificaciones
notification.success({
  message: t('notification.title'),
  description: t('notification.description'),
})
```
