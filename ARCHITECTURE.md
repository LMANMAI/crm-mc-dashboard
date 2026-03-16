# Arquitectura de Mas Copies: Dashboard (Monolito Modular MFE-Ready)

## 1. Visión y Lógica de Negocio

El Dashboard de Mas Copies es un CRM diseñado para la gestión operativa y administrativa de una empresa gráfica/imprenta. El sistema centraliza el flujo de trabajo separando las responsabilidades en dominios de negocio claros:

- **Dominio Operativo:** Gestión de producción diaria (creación de pedidos, cotizador digital, seguimiento de estados e historial de auditoría).
- **Dominio Administrativo:** Gestión contable, tablas generales y reportes.

El objetivo arquitectónico es un **MVP de iteración rápida** estructurado como un Monorepo, pero diseñado bajo principios de **Vertical Slicing** para permitir una migración futura a Microfrontends (Module Federation) sin refactorizar la lógica central.

## 2. Estructura del Monorepo

- `apps/shell`: Aplicación principal (Orquestador). Se encarga del enrutamiento base, el Layout (Sidebar/Topbar) y la inicialización del entorno.
- `packages/features/*`: Cápsulas aisladas que contienen la lógica de negocio completa de una funcionalidad (ej. `order-history`, `editor-copys`).
- `packages/core-contracts`: La "fuente de la verdad". Contiene interfaces TypeScript, DTOs y la definición estricta del Event Bus global compartido.

## 3. Reglas de Arquitectura e Integración (Core Rules)

1. **Event-Driven (Bajo Acoplamiento):** Las features no se invocan directamente entre sí. La comunicación inter-modular se realiza mediante un bus de eventos tipado (`coreEventBus`).
2. **Zero Cross-Imports:** Queda estrictamente prohibido que una feature importe código, estado o componentes desde la estructura interna de otra feature.
3. **Public API:** Todo módulo en `packages/*` debe exponer únicamente su contrato público a través de su archivo `src/index.ts`.

## 4. Estrategia de UI y Ruteo (Vertical Slicing)

- **Menú Lateral (Sidebar):** Cada categoría principal del menú (ej. Operativo, Administrativo) representa idealmente un Dominio de Negocio o un Microfrontend a futuro.
- **Opciones del Menú:** Cada ítem específico de navegación (ej. Crear Pedido, Historial) se mapea 1 a 1 con una **Feature** alojada en `packages/features/*`.
- **Integración Manual:** Al generar una nueva Feature, se debe importar su contenedor principal explícitamente en el router del Shell y agregar el enlace correspondiente en el Sidebar.

## 5. Developer Experience (DX), Tooling y Ejecución

Para habilitar el trabajo asíncrono entre Frontend y Backend, y evitar errores de configuración manual (Monorepo Tax), estandarizamos nuestras herramientas:

**Automatización de Features:**

```bash
npm run generate:feature <nombre-feature>
```

Entornos y Scripts de Desarrollo:

npm run dev: Modo Integración. Ejecuta el cliente conectándose a los endpoints reales de la API.

npm run dev:mock: Modo Autoconsumo. Levanta el cliente y un servidor local (json-server) en el puerto 3000. Ideal para diseñar UI/UX asíncronamente sin bloquearse por la API real.

npm run lint & npm run build: Validación de reglas de calidad y compilación estricta de TypeScript para despliegue.
