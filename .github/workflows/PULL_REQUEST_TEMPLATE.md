
## 📝 Descripción General
> Describí brevemente qué problema resuelve este PR o qué funcionalidad añade. 
*(Ej: Implementación de la capa BFF para optimizar el consumo de datos y limpieza de componentes obsoletos).*

## 🛠️ Cambios Realizados
- [ ] **BFF:** Implementación de [mencionar servicios/endpoints].
- [ ] **Vistas:** Reorganización de la estructura de carpetas en `/src/views`.
- [ ] **Refactor:** Limpieza y tipado de componentes con TypeScript.
- [ ] **Otros:** [Mencionar cambios menores].

## 🚦 Estado de la Integración
- **Prioridad:** 🔴 Alta / 🟡 Media / 🟢 Baja
- **¿Requiere cambios en el Backend?:** Sí / No
- **¿Altera la Base de Datos?:** Sí / No

## 🧪 Cómo Testear
1. Clonar la rama `feature/scafolding`.
2. Ejecutar `npm install` o `yarn install`.
3. Levantar el servicio [Nombre del Servicio/BFF].
4. Verificar las rutas: `/ruta1`, `/ruta2`.

## 📅 Plan de Producción
- **Fecha estimada de despliegue:** [DD/MM/AAAA]
- **Variables de Entorno Necesarias:** - `VAR_NAME=value`
- **Pasos previos al deploy:** [Ej: Correr migraciones, actualizar secrets en Vercel/Render, etc.]

## ✅ Checklist del autor

- [ ] El código compila sin errores (`npm run build`)
- [ ] No hay warnings nuevos de TypeScript o ESLint
- [ ] Se probó manualmente el flujo principal (golden path)
- [ ] No se introdujeron datos sensibles (tokens, contraseñas, endpoints reales)
- [ ] El PR apunta a la branch correcta (`develop` para features, `master` para hotfixes)

## 👀 Checklist del revisor

- [ ] El código es legible y sigue las convenciones del proyecto
- [ ] No hay lógica duplicada o abstracciones innecesarias
- [ ] Los cambios visuales fueron revisados en el navegador
- [ ] No hay regresiones visibles en otras partes de la app
- [ ] El PR está listo para mergear

---