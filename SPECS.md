# CRM MC Dashboard — Especificaciones del Proyecto

## 1. Visión General

Dashboard CRM para **Mas Copies** (imprenta/copistería). Sistema multi-rol para gestión de pedidos, clientes, stock, cajas y configuración general del negocio.

**Estado actual:** En desarrollo activo. Autenticación y API mockeadas con `json-server`.

---

## 2. Stack Tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| UI Framework | React | 19.1.0 |
| Lenguaje | TypeScript | 5.8.3 |
| Build tool | Vite | 7.0.5 |
| Routing | React Router DOM | 7.7.1 |
| State Management | Redux Toolkit + React-Redux | 2.8.2 / 9.2.0 |
| UI Library | Chakra UI | 3.23.0 |
| CSS-in-JS | @emotion/react | 11.14.0 |
| HTTP Client | Axios | 1.11.0 |
| Iconos | React Icons | 5.5.0 |
| Tema dark/light | Next-themes | 0.4.6 |
| Mock API | json-server | 1.0.0-beta.3 |
| Test runner | Vitest | — |

### Scripts disponibles

```bash
npm run dev         # Vite dev server
npm run dev:mock    # Vite + json-server (puerto 3001) en paralelo
npm run build       # Build producción
npm run lint        # ESLint
npm run test        # Vitest
npm run preview     # Preview build producción
```

---

## 3. Arquitectura de Directorios

```
src/
├── assets/                  # Imágenes, SVGs
├── components/              # Componentes reutilizables
│   ├── layout/
│   │   ├── AdminLayout/     # Layout maestro (navbar + sidebar + outlet)
│   │   ├── Navbar/
│   │   ├── Sidemenu/        # Sidebar colapsable con menú por rol
│   │   └── Footer/
│   ├── Table/               # Tabla genérica tipada con TypeScript
│   ├── Select/              # Select custom con Chakra UI
│   ├── RowActions/          # Menú de acciones por fila (ver, imprimir, eliminar)
│   ├── SectionBox/          # Contenedor con header y botón de acción
│   ├── AdminPageToolbar/    # Toolbar: título, búsqueda, botón "Nuevo"
│   ├── TitleWithIcon/
│   ├── AccountSection/      # Sección de cuenta con tabla embebida
│   ├── AccountStatusSummary/
│   └── ui/                  # Wrappers de Chakra (provider, toaster, tooltip, color-mode)
├── config/
│   └── constants.tsx        # Base URL API + endpoints
├── features/
│   └── auth/
│       └── index.tsx        # Redux slice de autenticación
├── hooks/
│   └── useFetch.tsx         # Hook genérico axios (GET/POST/PUT/DELETE)
├── pages/
│   ├── auth/                # Página de login con selector de rol
│   ├── admin/               # Todas las páginas del rol admin
│   └── cliente/             # Todas las páginas del rol cliente
├── routes/
│   └── index.tsx            # Definición de rutas + guards RoleRoute / ProtectedRoute
├── store/
│   └── index.tsx            # Configuración Redux store
├── theme/
│   └── index.tsx            # Chakra createSystem + tokens semánticos
├── types/
│   └── index.tsx            # Interfaces TypeScript globales
└── utils/                   # Funciones utilitarias
```

---

## 4. Sistema de Autenticación

### Flujo actual (mock)

1. Usuario accede a `/auth`
2. Selecciona rol (Cliente / Admin / Empleado)
3. Se despacha `login` action con datos hardcodeados al Redux store
4. `ProtectedRoute` y `RoleRoute` controlan acceso según `isAuthenticated` y `rol`

### Shape del estado de auth

```typescript
interface AuthUser {
  nombre: string
  apellido: string
  id: string
  token: string
  dni: string
  email: string
  rol: "user_admin" | "user_cliente" | "user_empleado"
  [key: string]: any
}

// Redux state shape
{
  auth: {
    user: AuthUser | null
    isAuthenticated: boolean
  }
}
```

### Guards de rutas

| Guard | Descripción |
|---|---|
| `ProtectedRoute` | Redirige a `/auth` si no autenticado |
| `RoleRoute` | Acepta prop `allow: string[]`. Redirige a `/` si rol no permitido |

---

## 5. Rutas del Sistema

### Rutas Cliente (`user_cliente`)

| Ruta | Página | Descripción |
|---|---|---|
| `/` o `/pedidos` | PedidosClientePage | Listado de pedidos propios |
| `/cuenta-corriente` | CuentaCorrienteCliente | Estado de cuenta |
| `/mis-datos` | ClienteScreen | Perfil del cliente |
| `/presupuestos` | PresupuestosPageCliente | Presupuestos/cotizaciones |
| `/comprobantes` | ComprobantesPageCliente | Comprobantes |
| `/pedidos/:id` | DetailPage | Detalle de pedido |
| `/presupuestos/:id` | DetailPage | Detalle de presupuesto |
| `/comprobantes/:id` | DetailPage | Detalle de comprobante |

### Rutas Admin (`user_admin` / `user_empleado`)

#### Operativa
| Ruta | Página | Descripción |
|---|---|---|
| `/crear-pedido` | CrearPedidoAdminPage | Configurador de pedido/cotización con specs de producto |
| `/cotizador` | CotizadorAdminPage | Herramienta de cotización digital |
| `/pedidos-admin` | PedidosAdminPage | Gestión y filtrado de pedidos |
| `/proyectos` | ProyectosAdminPage | Gestión de proyectos |
| `/nuevo-pedido` | NuevoPedidoAdminPage | Alta de nuevo pedido |
| `/historial-admin` | HistorialAdminPage | Historial de pedidos |

#### Administrativa
| Ruta | Página | Descripción |
|---|---|---|
| `/cajas` | CajasAdminPage | Gestión de cajas/caja registradora |
| `/compras` | ComprasAdminPage | Registro de compras |
| `/stock` | StockAdminPage | Inventario/stock |

#### Tablas Operativas
| Ruta | Página | Descripción |
|---|---|---|
| `/estados-admin` | EstadosAdminPage | Estados de pedidos |
| `/pedidos-simples-admin` | PedidosSimpleAdmin | Pedidos simples |
| `/sectores-admin` | SectoresAdmin | Sectores |
| `/categorias-admin` | CategoriasAdmin | Categorías de productos |
| `/insumos-admin` | InsumosAdmin | Insumos/materiales |

#### Tablas Administrativas
| Ruta | Página | Descripción |
|---|---|---|
| `/clientes-admin` | ClientesAdminPage | ABM de clientes con saldo |
| `/tipos-cliente-admin` | TiposClienteAdminPage | Tipos de cliente |
| `/config-facturas-admin` | ConfigFacturasAdminPage | Configuración de facturación |
| `/proveedores-admin` | ProveedoresAdminPage | ABM de proveedores |
| `/medios-pago-admin` | MediosPagoAdminPage | Medios de pago |

#### Tablas Generales
| Ruta | Página | Descripción |
|---|---|---|
| `/usuarios-admin` | UsuariosAdminPage | ABM de usuarios |
| `/tipos-usuarios-admin` | NivelesUsuariosPage | Niveles/roles de usuario |
| `/tienda-admin` | TiendaAdminPage | Configuración de tienda |
| `/configuraciones-admin` | ConfiguracionesAdminPage | Configuración general |
| `/archivos-admin` | ArchivosAdminPage | Gestión de archivos |
| `/reportes` | ReportesAdminPage | Reportes (en desarrollo) |

---

## 6. API / Capa de Datos

### Configuración

```
BASE_URL: http://localhost:3001  (json-server en dev)
```

### Endpoints definidos

| Recurso | Endpoints |
|---|---|
| Auth | `POST /auth/signup`, `POST /auth/signin` |
| Users | `GET/POST /users`, `GET/PUT/DELETE /users/:id`, `/users/role/:id`, `/users/active/:id`, `/users/inactive/:id` |
| Products | `GET/POST /products`, `GET/PUT/DELETE /products/:id` |
| Colors | `GET/POST /color`, `GET/PUT/DELETE /color/:id` |
| Clicks | `GET/POST /click`, `GET/PUT/DELETE /click/:id` |
| Endings | `GET/POST /endings`, `GET/PUT/DELETE /endings/:id` |
| Paper | `GET/POST /paper`, `GET/PUT/DELETE /paper/:id` |
| Sizes | `GET/POST /size`, `GET/PUT/DELETE /size/:id` |
| Sheet Charges | `GET/POST /sheet-charge`, `GET/PUT/DELETE /sheet-charge/:id` |
| Orders | `GET/POST /orders`, `GET/PUT/DELETE /orders/:id`, `PATCH /orders/:id/status` |
| Order Products | `GET/POST /order-product`, `GET/PUT/DELETE /order-product/:id` |

### Hook `useFetch`

```typescript
// src/hooks/useFetch.tsx
function useFetch<T>(url: string, options?: FetchOptions): UseFetchReturn<T>

interface UseFetchReturn<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  makeRequest: (overrideOptions?: FetchOptions) => Promise<void>
}

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  useInitialFetch?: boolean
  headers?: Record<string, string>
  params?: Record<string, string>
  body?: unknown
  data?: unknown
}
```

---

## 7. State Management (Redux)

### Store

```typescript
// src/store/index.tsx
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### Auth Slice — Actions

| Action | Payload | Descripción |
|---|---|---|
| `login` | `AuthUser` | Set user + isAuthenticated = true |
| `logout` | — | Clear user + isAuthenticated = false |
| `updateUser` | `Partial<AuthUser>` | Actualización parcial del usuario |

### Uso en componentes

```typescript
const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
const dispatch = useDispatch<AppDispatch>()
dispatch(login(userData))
```

---

## 8. Tema y Diseño

### Paleta de colores

| Uso | Color |
|---|---|
| Primario / Acento | Teal |
| Neutro | Gray |
| Estado: Pendiente | Yellow |
| Estado: En proceso | Blue |
| Estado: Error/Cancelado | Red |
| Estado: Completado | Green |
| Header de secciones | Teal background + White text |

### Breakpoints custom

| Nombre | Valor |
|---|---|
| sm | 320px |
| md | 768px |
| lg | 960px |
| xl | 1200px |

### Convenciones UI

- Cards con borde y background sutil
- Headers de sección: fondo teal, texto blanco
- Tags con color semántico por estado
- Grids responsivos con templates por breakpoint
- Navegación con íconos de `react-icons`

---

## 9. Convenciones de Código

- **Exports vía `index.tsx`** — cada módulo exporta desde su index
- **Una página por ruta** — sin reutilización forzada entre roles
- **Organización por dominio** — carpetas agrupan por feature, no por tipo de archivo
- **Estado local en páginas complejas** — formularios multi-step usan `useState`
- **Tipos centralizados** en `src/types/index.tsx`
- **`type` keyword** para imports de solo tipo
- **Genéricos TypeScript** en componentes compartidos (ej: `Table<T>`)
- **Sin selectores Redux** — acceso directo a `state.auth` en componentes
- **Mock data hardcodeada** en páginas hasta integración con backend real

---

## 10. Módulo Crear Pedido (Spec detallada)

Ver: `src/pages/admin/CrearPedidoAdmin/SSD_SPEC.md`

Resumen:
- Formulario con: cliente, producto, subproducto, cantidad, observaciones, archivo
- Validación con Zod + React Hook Form (pendiente implementar)
- Payload multipart/form-data hacia Spring Boot backend
- Separación en capas: hook `useOrderActions`, `OrderDetailsPreview`, `OrderEntryForm`
- Config de productos cargada desde `orderData.json` (1040 líneas)

---

## 11. Pendientes / Estado de Implementación

| Feature | Estado |
|---|---|
| Autenticación real (backend) | Pendiente |
| Integración API real | Pendiente (mock activo) |
| Validaciones con Zod/RHF en formularios | Pendiente |
| Reportes | En desarrollo (stub) |
| Subida de archivos | Pendiente |
| Tests unitarios/integración | Pendiente |
| ESLint type-aware rules | Recomendado activar |
| Role `user_empleado` — alcance de permisos | Por definir |

---

## 12. Archivos Clave

| Archivo | Propósito |
|---|---|
| `src/routes/index.tsx` | Definición completa de rutas + guards |
| `src/config/constants.tsx` | Base URL + todos los endpoints |
| `src/types/index.tsx` | Interfaces TypeScript globales |
| `src/features/auth/index.tsx` | Redux slice auth |
| `src/store/index.tsx` | Redux store |
| `src/hooks/useFetch.tsx` | Hook HTTP genérico |
| `src/theme/index.tsx` | Chakra theme + tokens |
| `src/components/Table/index.tsx` | Tabla genérica reutilizable |
| `db.json` | Base de datos mock (json-server) |
| `src/pages/admin/CrearPedidoAdmin/orderData.json` | Config de productos para cotizador |
| `src/pages/admin/CrearPedidoAdmin/SSD_SPEC.md` | Spec detallada del módulo de pedidos |
