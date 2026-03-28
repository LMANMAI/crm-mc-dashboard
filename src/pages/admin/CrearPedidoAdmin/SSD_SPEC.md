# Software Specification Design (SSD): Cotizador / Pedidos - Mas Copies

## 1. Modelo de Datos del Formulario (React State)

Se recomienda el uso de **React Hook Form** junto con **Zod** para la gestión del estado y validaciones, permitiendo un manejo eficiente de los renders y errores.

```typescript
interface OrderFormState {
  clientId: string;           // UUID o ID numérico del cliente
  productId: string;          // ID del producto base
  subProductId?: string;      // ID opcional del subproducto/variante
  quantity: number;           // Cantidad solicitada (mínimo 1)
  observations: string;       // Texto libre para detalles (máx 500 caracteres)
  file: File | null;          // Objeto File para la subida (máx 50MB)
}
```

## 2. Componentes de Chakra UI v3

Para una interfaz moderna, accesible y coherente con el diseño actual:

*   **`Field.Root`**: Contenedor principal para etiquetas, inputs y mensajes de error.
*   **`Select` (Custom Component)**: Selector para Cliente, Producto y Subproducto (integrado con el componente `Select` existente en el proyecto).
*   **`NumberInput`**: Control especializado para el campo `Cantidad`, con validación de rangos.
*   **`Textarea`**: Para el campo `Observaciones`, con resize vertical limitado.
*   **`FileUpload`**: Implementación de un input de archivo estilizado con soporte para `accept="application/pdf,image/*"`.
*   **`Button`**: Con estado `loading` durante el envío y `colorPalette="teal"`.
*   **`Stack` / `Grid`**: Para la distribución responsiva del formulario (Layout de 2 columnas en desktop).

## 3. Validaciones de Negocio (Zod Schema)

```typescript
const orderSchema = z.object({
  clientId: z.string().min(1, "El cliente es obligatorio"),
  productId: z.string().min(1, "El producto es obligatorio"),
  quantity: z.number().int().min(1, "La cantidad mínima es 1"),
  observations: z.string().max(500, "Máximo 500 caracteres").optional(),
  file: z.instanceof(File)
    .refine((file) => file.size <= 50 * 1024 * 1024, "El archivo supera los 50MB")
    .refine((file) => ["application/pdf", "image/jpeg", "image/png"].includes(file.type), "Formato no soportado")
});
```

## 4. Estructura del Payload JSON (Backend Spring Boot)

El backend espera un request de tipo `multipart/form-data` debido a la subida de archivos. El objeto de datos se enviará como una parte del request (`order_data`) en formato JSON, siguiendo las convenciones de la arquitectura de monolito modular.

### Part 1: `order_data` (application/json)
```json
{
  "clientId": "550e8400-e29b-41d4-a716-446655440000",
  "productId": "PROD-001",
  "subProductId": "SUB-005",
  "quantity": 25,
  "observations": "Imprimir en papel fotográfico mate, corte a sangre.",
  "metadata": {
    "source": "ADMIN_DASHBOARD",
    "createdAt": "2026-03-26T14:30:00Z"
  }
}
```

### Part 2: `file` (multipart/form-data)
*   Contiene el flujo binario del archivo seleccionado.

## 5. Arquitectura de Separación (Refactorización)

1.  **Capa de Servicio (Hooks)**: Crear `useOrderActions.ts` para manejar la lógica de `POST` al endpoint `/api/v1/orders`.
2.  **Capa de Presentación**: Dividir en `OrderDetailsPreview` (resumen visual e imagen) y `OrderEntryForm` (inputs de datos).
3.  **Capa de Modelos**: Centralizar interfaces en `src/types/order.ts` para compartir entre el cotizador y el listado de pedidos.
