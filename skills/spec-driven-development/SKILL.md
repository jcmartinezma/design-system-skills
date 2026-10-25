---
name: spec-driven-development
description: >-
  Lleva una feature con un SDD medio: un spec.md con criterios de
  aceptación, un plan.md corto, commits por paso y validación de cada
  criterio. Úsala cuando haya que construir o cambiar comportamiento
  con control de alcance, o cuando el trabajo viva en specs/.
---

# Desarrollo dirigido por especificación

SDD medio: una spec por feature y un plan corto. La spec dice qué se entrega, cómo se comprueba y qué no se toca. El plan dice los pasos. La persona confirma el plan antes de que haya código.

No escribas el trío `requirements.md`, `design.md` y `tasks.md`. Ese ciclo es el SDD largo. Aquí el control está en los criterios de aceptación y en la confirmación del plan.

Las specs de producto viven en `specs/NNN-nombre-corto/` del repo en el que trabajas. Las plantillas de esta skill solo se copian.

## Cuándo usarla

- La persona pide una feature, un cambio de comportamiento o una spec.
- Hay que dejar el alcance por escrito y validar criterio a criterio.
- Una spec ya implementada necesita un ajuste y hay que decidir si cabe ahí o pide spec nueva.

No la uses para montar un design system desde cero: eso es `design-system-architect`. No la uses para especificar o revisar solo la accesibilidad de un componente: eso es `aria-implementation` o `aria-review`. Un arreglo que no cambia comportamiento y no cae dentro de ninguna spec se hace directo, sin abrir una spec.

## Flujo

Copia [templates/spec.md](templates/spec.md) y [templates/plan.md](templates/plan.md). No reescribas la estructura de memoria. Un ejemplo cerrado está en [examples/003-filtro-provincia/](examples/003-filtro-provincia/) y una spec deprecada en [examples/001-filtro-comunidad/spec.md](examples/001-filtro-comunidad/spec.md).

### 1. Spec

La persona escribe la spec, o tú la redactas con ella. Una feature, un `spec.md`.

1. Mira `specs/`. El número es el mayor existente más uno, con tres dígitos (`001`, `014`). Si no hay carpeta, empieza en `001`. No reutilices ni renumeres.
2. Crea `specs/NNN-nombre-corto/spec.md`. El slug va en kebab-case, corto, sin espacios.
3. Rellena la plantilla. Estado inicial: **Borrador**. Fecha de hoy (`YYYY-MM-DD`). Quita `Reemplaza a`, `Reemplazada por`, `Depende de` y la sección `## Motivo de la deprecación` si no aplican.
4. **Historia.** Una frase: Como [usuario] quiero [acción] para [beneficio].
5. **Criterios de aceptación.** Checklist `- [ ]`, numerados `CA-1`, `CA-2`… Cada uno es un comportamiento comprobable, en Dado / Cuando / Entonces. Si un criterio junta dos resultados, pártelo.
6. **Requisitos técnicos.** Sustituyen a la antigua sección de estados de UI. Cubren stack, componentes del design system (`ds-*`), datos y APIs, rendimiento, accesibilidad y restricciones. Vacío, error y carga no tienen sección propia: si aplican, son criterios.
7. **Fuera de alcance.** Lo que alguien podría colar en el mismo cambio y no se toca. Si no hay nada cercano, escribe `Ninguno.`.
8. **Referencias.** Enlace a Figma si existe, componentes `ds-*` y notas. No inventes un enlace.
9. Deja **Registro de ajustes** en `Ninguno.` hasta que haya uno.

Pasa a **Lista** solo cuando la persona diga que la spec está cerrada. Hasta entonces sigue en Borrador y se puede editar.

### 2. Plan

Con la spec en Lista, copia la plantilla a `specs/NNN-nombre-corto/plan.md`.

1. Escribe de 3 a 7 pasos. Cada paso cierra uno o dos criterios, nombra los archivos y cabe en un commit. El plan no añade comportamiento que la spec no tenga.
2. Lista los archivos afectados (crear o modificar).
3. Busca impacto en specs anteriores (regla de abajo) y rellena esa tabla. Si `specs/` no tenía nada más, dilo en la tabla.
4. Pregunta a la persona antes de implementar, aunque la spec parezca completa. Pregunta solo lo que la spec no responde:
   - casos límite
   - estados vacío, error y carga
   - permisos
   - móvil
   - accesibilidad
   - un detalle técnico importante o ambiguo (contrato de datos, componente del sistema, ruta, breakpoint)
5. Vuelca cada respuesta:
   - comportamiento comprobable nuevo → criterio nuevo en la spec
   - algo que queda fuera → fuera de alcance
   - solo el cómo, sin cambiar lo que se entrega → requisitos técnicos y el paso del plan
6. No rellenes la respuesta tú. Si dice que no aplica, anótalo en la fila y sigue.
7. Si la spec cambió, actualiza los pasos para que sigan citando los criterios vigentes y enseña ese cambio antes de pedir la confirmación.
8. Pide confirmación explícita del plan. Marca la casilla, pon **Confirmado:** sí y pasa la spec a **En curso**. Los criterios aceptados durante el plan no devuelven la spec a Borrador.

No escribas código mientras **Confirmado** sea `no`.

### 3. Implementación

1. Un commit por paso del plan, en la rama de esa spec.
2. El mensaje cita la spec y los criterios que el paso cierra. Forma: `feat(003): CA-2 filtro por provincia`. Usa `test` si el paso solo añade la prueba, `fix` si corrige un criterio que no pasaba.
3. No juntes pasos en un commit. No adelantes el paso siguiente.
4. Si el código revela un comportamiento que la spec no cuenta, para. No lo cueles. Actualiza la spec, ajusta el plan y espera una confirmación nueva.

### 4. Validación

Al terminar los pasos, recorre cada criterio y intenta comprobarlo. Elige la prueba más barata que sea honesta:

- lógica de datos o de estado → test o ejecución
- interacción, foco, teclado, layout o estado visual → navegador o Storybook, según el repo

Marca `- [x]` solo si pasó. Debajo, una línea `Validado:` con cómo (archivo de test, comando, story, qué hiciste en el navegador). Si no pasó, déjalo en `- [ ]` y escribe `Pendiente:` con el motivo. Si en este entorno no se pudo abrir el navegador o Storybook, no lo marques: deja qué faltó.

Cuando todos los criterios están en `- [x]`, el estado pasa a **Implementada** y la fecha de la cabecera pasa a hoy. Si queda alguno pendiente, el estado sigue en **En curso**.

## Reglas

### Specs en paralelo

Las specs no van en cascada. Varias pueden implementarse a la vez si son independientes: no editan los mismos archivos ni el mismo comportamiento.

Aíslalas. Una rama, un worktree o un cloud agent por spec. Dos specs en el mismo árbol de trabajo se pisan.

Si una necesita el resultado de otra, decláralo en la cabecera: `Depende de: NNN`. Esa va después, cuando la dependencia esté en **Implementada**. No arranques la dependiente en paralelo «mientras tanto».

### Ajustes sin spec nueva

Una spec **Implementada** admite ajustes y refactorizaciones sin spec nueva si siguen dentro de su objetivo y no añaden funcionalidad: reorganizar archivos, pulir lo visual, detalles de experiencia de uso, rendimiento, limpieza.

Regístralos en `## Registro de ajustes` de esa spec, una línea: fecha y qué se tocó. Un commit pequeño basta. No hace falta otro `plan.md`. Si el ajuste puede tumbar un criterio, vuelve a validar ese criterio y actualiza su línea `Validado:`.

| El cambio… | Haz esto |
|---|---|
| Reorganiza archivos y el comportamiento sigue igual | Ajuste. Una línea en el registro. |
| Pule espaciado, color o jerarquía dentro del objetivo | Ajuste. Una línea en el registro. |
| Afina la experiencia de uso y el criterio sigue siendo verdad | Ajuste. Una línea en el registro. |
| Mejora rendimiento o limpia código y el resultado observable se mantiene | Ajuste. Una línea en el registro. |
| Añade una acción, un filtro, un dato, una pantalla o un estado | Spec nueva. |
| Hace que un criterio ya escrito deje de cumplirse | Spec nueva, y aplica la regla de impacto. |

Regla rápida: si quien ya usa la feature notaría una capacidad nueva o una respuesta distinta, es spec nueva. Si notaría el mismo comportamiento más claro, más rápido o mejor ordenado, es un ajuste.

### Impacto en specs anteriores

Antes de dar el plan por cerrado, abre los `spec.md` de `specs/` y busca criterios que hablen de los archivos o del comportamiento que vas a tocar. Lístalos en el plan, también cuando la acción sea «ninguna». No fíes la búsqueda a la memoria.

Si una spec posterior cambia criterios de otra, antes de pasar la nueva a **Implementada** haz una de estas dos cosas:

**(a) Reescribir.** El comportamiento sigue existiendo, pero el criterio antiguo ya no dice la verdad. Edita el criterio en su spec original, vuelve a validarlo y deja la procedencia:

```markdown
- [x] **CA-2.** Dado {contexto nuevo}, cuando {acción}, entonces {resultado nuevo}.
      Validado: {cómo, en esta pasada}.
      Reescrito por 014 el {YYYY-MM-DD}: antes prometía {resultado viejo}.
```

**(b) Deprecar.** La spec antigua ya no describe el producto porque el funcionamiento cambió de forma importante. Estado **Deprecada**, `Reemplazada por: NNN`, fecha de hoy y una sección `## Motivo de la deprecación`. La spec nueva lleva `Reemplaza a: NNN`. Comprueba los dos enlaces: las dos specs existen y se apuntan. No revalides los criterios viejos; ya no rigen. El ejemplo es [examples/001-filtro-comunidad/spec.md](examples/001-filtro-comunidad/spec.md), sustituida por [examples/003-filtro-provincia/spec.md](examples/003-filtro-provincia/spec.md).

## Qué no hacer

- No crees `requirements.md`, `design.md` ni `tasks.md`.
- No escribas código mientras **Confirmado** sea `no`.
- No marques `[x]` por haber leído el código. Hace falta un test, una ejecución o una revisión en navegador o Storybook.
- No abras una spec nueva para un ajuste que cabe en la tabla de arriba.
- No guardes funcionalidad nueva en el registro de ajustes.
- No lleves en paralelo dos specs que editan los mismos archivos.
- No encadenes specs que no tienen `Depende de`.
- No pases a **Implementada** una spec que deja criterios ajenos desactualizados.
- No inventes un criterio, un fuera de alcance ni un enlace a Figma. Proponlo y espera.
- No depreces una spec si la nueva no existe o no dice `Reemplaza a`.
- No copies los ejemplos de esta skill al repo de producto. Copia las plantillas.

## Cuándo leer cada archivo

| Léelo cuando | Archivo |
|---|---|
| Vas a crear la spec | [templates/spec.md](templates/spec.md) |
| Vas a crear el plan | [templates/plan.md](templates/plan.md) |
| Quieres ver una spec implementada, con criterios marcados y registro de ajustes | [examples/003-filtro-provincia/spec.md](examples/003-filtro-provincia/spec.md) |
| Quieres ver el plan ya confirmado, con preguntas e impacto | [examples/003-filtro-provincia/plan.md](examples/003-filtro-provincia/plan.md) |
| Quieres ver una spec deprecada y el motivo | [examples/001-filtro-comunidad/spec.md](examples/001-filtro-comunidad/spec.md) |
