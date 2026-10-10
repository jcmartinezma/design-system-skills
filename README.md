# design-system-skills

Colección de skills para agentes de IA pensadas para el trabajo diario con design systems: fundamentos y tokens, componentes, documentación, gobernanza y métricas.

Cada skill es un paquete autocontenido: un agente lee sus instrucciones y, cuando hace falta, ejecuta sus scripts para resolver tareas de forma fiable y repetible.

## Por qué

Muchas tareas de un sistema de diseño son deterministas: generar rampas de color, validar contraste, exportar tokens, auditar componentes. En lugar de que el agente las improvise cada vez, estas skills le dan instrucciones claras y código probado para hacerlas bien.

## Estructura del repositorio

```
design-system-skills/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── skills/
    ├── nombre-de-la-skill/
    │   ├── SKILL.md        # Instrucciones para el agente (obligatorio)
    │   ├── README.md       # Documentación para personas (recomendado)
    │   ├── scripts/        # Lógica ejecutable (opcional)
    │   ├── tests/          # Tests de los scripts (si hay scripts)
    │   └── examples/       # Entradas y salidas de ejemplo (opcional)
    └── otra-skill/
        └── ...
```

## Qué incluye cada skill

| Archivo / carpeta | Obligatorio | Para quién | Contenido |
|---|---|---|---|
| `SKILL.md` | Sí | Agente | Qué hace la skill, cuándo usarla, pasos a seguir y qué scripts lanzar |
| `README.md` | Recomendado | Personas | Descripción, instalación, dependencias y ejemplos |
| `scripts/` | No | Agente | Código que resuelve la parte determinista de la tarea |
| `tests/` | Si hay scripts | Mantenedores | Tests que garantizan que los scripts siguen funcionando |
| `examples/` | No | Ambos | Casos de uso con entrada y salida esperada |

### Formato de `SKILL.md`

Cada `SKILL.md` empieza con un frontmatter que identifica la skill:

```markdown
---
name: nombre-de-la-skill
description: Una frase que explique qué hace y cuándo debe usarla el agente.
---

# Nombre de la skill

## Cuándo usarla
...

## Pasos
1. ...
2. Ejecuta `python scripts/generate.py --input ...` y usa su salida.
```

## Convención de nombres

- Carpetas en `kebab-case`, en inglés y en minúsculas: `color-ramps`, `token-export`, `component-audit`.
- El campo `name` del frontmatter coincide con el nombre de la carpeta.
- Nombres que describan la tarea, no la herramienta: `contrast-check` mejor que `apca-script`.
- Scripts con verbos claros: `generate.py`, `validate.py`, `export.py`.

## Cómo usar una skill

1. Copia la carpeta de la skill en el directorio de skills de tu agente.
2. Instala las dependencias que indique su `README.md`, si las hay.
3. Pide la tarea al agente con normalidad: leerá el `SKILL.md` cuando sea relevante.

## Cómo añadir una skill nueva

1. Crea una carpeta en `skills/` siguiendo la convención de nombres.
2. Escribe el `SKILL.md` con su frontmatter (`name` y `description`).
3. Si la skill necesita código, añádelo en `scripts/` y sus tests en `tests/`.
4. Documenta el uso y las dependencias en el `README.md` de la skill.
5. Añade la skill al índice de este README.
6. Abre un pull request describiendo qué resuelve la skill.

## Índice de skills

| Skill | Descripción | Estado |
|---|---|---|
| [design-system-architect](skills/design-system-architect/) | Crea un design system desde cero (tokens DTCG, specs, gobernanza y guía para agentes) o audita uno existente y propone un plan de mejora. | Disponible |

## Licencia

Este proyecto se distribuye bajo la licencia indicada en [`LICENSE`](LICENSE).

---

Creado por [José Carlos Martínez](https://jcmartinez.net), Product Designer especializado en Design Systems y flujos con IA.
