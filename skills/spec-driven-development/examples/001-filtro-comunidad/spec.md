> Ejemplo ficticio de una spec deprecada. La sustituye `003-filtro-provincia`. No revalides estos criterios: ya no describen el producto.

# Filtrar talleres por comunidad autónoma

- **Estado:** Deprecada
- **Fecha:** 2026-03-18
- **Reemplazada por:** 003

## Historia

Como vecino que busca un taller, quiero filtrar el listado por comunidad autónoma para ver los de mi zona.

## Criterios de aceptación

- [x] **CA-1.** Dado el listado con talleres de varias comunidades, cuando elijo «Castilla y León», entonces solo veo talleres de esa comunidad.
      Validado: test `filtra por comunidad` en `src/pages/Talleres.test.tsx` (pasada del 2026-02-02, ya no rige).
- [x] **CA-2.** Dado el filtro de comunidad aplicado, cuando elijo «Todas», entonces vuelvo a ver todos los talleres.
      Validado: test `limpia el filtro de comunidad` en `src/pages/Talleres.test.tsx` (pasada del 2026-02-02, ya no rige).

## Requisitos técnicos

- **Stack:** React. La pantalla era `src/pages/Talleres.tsx`.
- **Componentes del design system:** `ds-select`.
- **Datos y APIs:** array local, campo `comunidad`.
- **Rendimiento:** filtro en memoria.
- **Accesibilidad:** nombre accesible «Comunidad autónoma».
- **Restricciones:** no se cambiaba la card del taller.

## Fuera de alcance

- Filtro por provincia.
- Filtro por oficio.
- Mapa.

## Referencias

- **Figma:** No hay.
- **Componentes:** `ds-select`.
- **Notas:** el grano del filtro resultó demasiado amplio. Una comunidad junta provincias que la persona no puede visitar el mismo día.

## Registro de ajustes

Ninguno.

## Motivo de la deprecación

El listado pasó a filtrar por provincia. Una comunidad agrupa varias provincias y estos criterios ya no dicen lo que hace la pantalla. No se reescribieron: cambió el grano del filtro, no un detalle del mismo control. La spec vigente es la 003.
