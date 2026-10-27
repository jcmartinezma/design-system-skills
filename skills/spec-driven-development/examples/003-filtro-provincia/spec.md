> Ejemplo ficticio. Copia la forma, no este listado de talleres. Las specs reales viven en `specs/` del repo de producto.

# Filtrar talleres por provincia

- **Estado:** Implementada
- **Fecha:** 2026-03-18
- **Reemplaza a:** 001

## Historia

Como vecino que busca un taller, quiero filtrar el listado por provincia para ver solo los que puedo visitar.

## Criterios de aceptación

- [x] **CA-1.** Dado el listado con talleres de varias provincias, cuando elijo «León» en Provincia, entonces solo veo talleres de León.
      Validado: test `filtra por León` en `src/pages/Talleres.test.tsx`.
- [x] **CA-2.** Dado el filtro con «León» aplicado, cuando elijo «Todas», entonces vuelvo a ver todos los talleres.
      Validado: test `restablece con Todas` en `src/pages/Talleres.test.tsx`.
- [x] **CA-3.** Dado que elijo una provincia sin talleres, cuando se aplica el filtro, entonces veo el estado vacío con el texto «No hay talleres en esta provincia» y ninguna card.
      Validado: test `muestra el estado vacío` y revisión de la story `Talleres/sin resultados` en Storybook.
- [x] **CA-4.** Dado el filtro, cuando llego con el teclado, entonces el control se anuncia como «Provincia», puedo elegir una opción sin ratón y el listado se actualiza.
      Validado: en el navegador, story `Talleres/con filtro`, con Tab para llegar, flechas para moverme y Enter para elegir.

## Requisitos técnicos

- **Stack:** React. La pantalla es `src/pages/Talleres.tsx`.
- **Componentes del design system:** `ds-select` para la provincia y `ds-empty-state` para CA-3. La card del taller no se cambia.
- **Datos y APIs:** array local `src/data/talleres.ts`, con el campo `provincia`. Sin API nueva.
- **Rendimiento:** filtro en memoria. El listado de referencia tiene menos de 200 talleres. Sin virtualización.
- **Accesibilidad:** el nombre accesible del select es el texto visible «Provincia». Ver CA-4.
- **Restricciones:** no se toca el diseño de la card ni el orden alfabético del listado sin filtrar.

## Fuera de alcance

- Filtro por oficio.
- Guardar la provincia en la URL.
- Mapa.
- Permisos. El listado es público.

## Referencias

- **Figma:** https://www.figma.com/design/ejemploTalleres/listado?node-id=12-4 (frame «Filtro provincia»; enlace de ejemplo, no es un archivo real).
- **Componentes:** `ds-select`, `ds-empty-state`.
- **Notas:** «Todas» es la primera opción y el valor inicial. No hay provincia recordada entre visitas.

## Registro de ajustes

- 2026-03-21 — Se extrajo el select a `src/components/FiltroProvincia.tsx`. Mismo comportamiento.
- 2026-03-28 — Se acercó el select al listado con el token `spacing.sm`. Mismo flujo.
