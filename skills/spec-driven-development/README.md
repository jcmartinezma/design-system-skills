# spec-driven-development

Skill para un agente que lleva una feature con un SDD medio.

Una spec dice qué se entrega, cómo se sabe que está hecha y qué no entra. Un plan corto dice los pasos y los archivos. El agente no escribe código hasta que la persona confirma ese plan. Al final, cada criterio de aceptación se comprueba y solo se marca si pasa.

No hace falta instalar nada. La skill son instrucciones y plantillas.

## Por qué un SDD medio

Un SDD completo separa requisitos, diseño y tareas. Sirve cuando el cambio es grande y mucha gente tiene que alinearse. En el día a día de producto se vuelve lento: tres documentos para un filtro, un estado o un ajuste de flujo.

El modo medio deja un solo `spec.md` por feature y un `plan.md` al lado. El control no desaparece. Sigue estando en los criterios (Dado / Cuando / Entonces), en las preguntas de antes de programar y en la validación al cerrar. Lo que se quita es el paquete de documentos que no cambia la decisión.

## Instalación

Copia `skills/spec-driven-development/` al directorio de skills que lee tu agente. Pídele una feature, un cambio de comportamiento o que abra una spec. Leerá `SKILL.md` cuando encaje.

## Cómo se usa

Las specs no viven en esta carpeta. El agente las crea en el repo del producto, en `specs/NNN-nombre-corto/`.

1. **Spec.** Se escribe `spec.md`: historia, criterios de aceptación, requisitos técnicos, fuera de alcance y referencias. El estado pasa de Borrador a Lista cuando la das por cerrada.
2. **Plan.** El agente escribe `plan.md` (de 3 a 7 pasos y los archivos). Antes de programar pregunta por lo que la spec no cierra: casos límite, vacío, error, carga, permisos, móvil, accesibilidad y detalles técnicos ambiguos. Si una respuesta cambia el alcance, entra en la spec. Tú confirmas el plan y entonces empieza el código.
3. **Implementación.** Un commit por paso, citando la spec. Por ejemplo: `feat(003): CA-2 filtro por provincia`.
4. **Validación.** El agente prueba cada criterio (test, ejecución, navegador o Storybook). Marca solo los que pasan y anota cómo. Cuando están todos, el estado queda en Implementada.

Varias specs pueden ir a la vez si no se pisan los archivos. Conviene aislarlas (una rama, un worktree o un cloud agent por spec). Si una necesita a otra, se declara `Depende de: NNN` y esa espera.

Un ajuste que no añade funcionalidad (mover archivos, pulir lo visual, un detalle de experiencia, rendimiento, limpieza) no abre spec nueva. Se anota en el registro de ajustes de la spec que ya cubre ese objetivo. Si el cambio añade comportamiento o hace que un criterio deje de cumplirse, es una spec nueva.

## Qué lee el agente

`SKILL.md` es la entrada: el flujo, las reglas de specs en paralelo, los ajustes y el impacto sobre specs anteriores. `templates/` son los archivos que copia. `examples/` muestra una spec ya implementada, su plan y una spec deprecada que esa feature sustituyó.

## Árbol

```
spec-driven-development/
├── SKILL.md
├── README.md
├── templates/
│   ├── spec.md
│   └── plan.md
└── examples/
    ├── 001-filtro-comunidad/
    │   └── spec.md
    └── 003-filtro-provincia/
        ├── spec.md
        └── plan.md
```
