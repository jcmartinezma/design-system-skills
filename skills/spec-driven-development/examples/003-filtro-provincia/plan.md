> Ejemplo ficticio de un plan ya confirmado. En un plan real las preguntas nacen en `pendiente` y se rellenan con la persona.

# Plan: Filtrar talleres por provincia

- **Spec:** `specs/003-filtro-provincia/spec.md`
- **Fecha:** 2026-03-18
- **Confirmado:** sí

## Pasos

1. **Datos y select de provincia** — CA-1
   - Archivos: `src/data/talleres.ts`, `src/pages/Talleres.tsx`, `src/pages/Talleres.test.tsx`
2. **Opción «Todas»** — CA-2
   - Archivos: `src/pages/Talleres.tsx`, `src/pages/Talleres.test.tsx`
3. **Estado vacío** — CA-3
   - Archivos: `src/pages/Talleres.tsx`, `src/pages/Talleres.test.tsx`, story `Talleres/sin resultados`
4. **Nombre accesible y prueba de teclado** — CA-4
   - Archivos: `src/pages/Talleres.tsx`, story `Talleres/con filtro`

## Archivos afectados

- `src/data/talleres.ts` — modificar (campo `provincia`)
- `src/pages/Talleres.tsx` — modificar
- `src/pages/Talleres.test.tsx` — crear
- Story `Talleres/con filtro` y `Talleres/sin resultados` — crear

## Preguntas antes de implementar

| # | Tema | Pregunta | Respuesta | Dónde quedó |
|---|---|---|---|---|
| 1 | Casos límite | ¿Qué pasa si el dato viene sin provincia? | Esos talleres solo aparecen en «Todas». No se inventa una provincia. | Requisitos técnicos. Notas. |
| 2 | Vacío, error, carga | ¿Hay estado vacío, de error o de carga? | Vacío sí, con un texto fijo. Los datos son locales: no hay error de red ni carga. | CA-3. Fuera de alcance: mapa y API. |
| 3 | Permisos | ¿Algún rol no debería filtrar? | No. El listado es público. | Fuera de alcance. |
| 4 | Móvil | ¿El filtro cambia de control en pantalla estrecha? | No. `ds-select` sirve en los dos tamaños. | Requisitos técnicos. |
| 5 | Accesibilidad | ¿El select se opera solo con teclado y cómo se llama? | Sí. El nombre es «Provincia». | CA-4. |
| 6 | Detalle técnico | ¿La provincia elegida queda en la URL? | No. | Fuera de alcance. |

## Impacto en specs anteriores

| Spec | Criterio | Por qué | Acción |
|---|---|---|---|
| 001 | CA-1, CA-2 | El listado pasará a filtrar por provincia. Los criterios de comunidad autónoma dejarán de describir la pantalla. Misma página: `src/pages/Talleres.tsx`. | Deprecar. `Reemplazada por: 003`. |

## Confirmación

- [x] La persona ha leído el plan y las respuestas ya están volcadas a la spec.
