# Manual para desarrolladores — de Cueto Sisters (Fase 6)

Convenciones y estándares para implementar y mantener el proyecto en Claude Code. Complementa `README.md` y `ANALISIS_Y_AUDITORIA.md`.

---

## 1. Estándares de código

- **TypeScript estricto:** `"strict": true`. Sin `any` salvo justificación. Tipar todo el modelo (`types/models.ts`).
- **Componentes funcionales + hooks.** Nada de clases.
- **JSX literal** (`.tsx`), no `React.createElement` (el prototipo lo usa solo por restricción del entorno sin build).
- **Funciones puras** para lógica de cálculo (progreso, formato): aisladas en `lib/`, testeables.
- **Imports ES**; prohibido publicar en `window` (el prototipo lo hace por su entorno; en producción NO).
- **Formato:** Prettier + ESLint (`eslint-config-react-app` o `@typescript-eslint`). Pre-commit con Husky + lint-staged.
- **Idioma:** UI y contenido en **español (es-ES)**. Nombres de código en inglés; los strings de dominio ya existentes pueden permanecer en español por fidelidad (`pendiente`, `en progreso`, `completada`, etc.) — si se traducen, hacerlo vía i18n, no rompiendo los enums.

## 2. Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `TaskRow`, `MonthCard`, `BrandLockup` |
| Archivos de componente | PascalCase.tsx | `TaskModal.tsx` |
| Hooks | camelCase con `use` | `useTasks`, `useSession` |
| Stores | `use<Nombre>Store` | `useUiStore` |
| Tipos/Interfaces | PascalCase | `Task`, `AppState` |
| Constantes | UPPER_SNAKE | `STATUS_LABEL`, `NAV` |
| CSS Modules | `Component.module.css` | `TaskRow.module.css` |
| Variables CSS (tokens) | `--kebab-case` | `--ink-soft` |
| Claves de datos | conservar las del prototipo | `MONTHS`, `IDENTITY`, `OBRAS`… |

## 3. Estructura recomendada de un componente

```tsx
// components/plan/TaskRow.tsx
import styles from './TaskRow.module.css';
import type { Task } from '@/types/models';

interface TaskRowProps {
  task: Task;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
}

export function TaskRow({ task, onToggle, onOpen }: TaskRowProps) {
  const isDone = task.status === 'completada';
  return (
    <div className={`${styles.row} ${isDone ? styles.done : ''}`}>
      {/* … */}
    </div>
  );
}
```
- Props tipadas e inmutables. Sin lógica de datos dentro (vive en hooks/features).
- Estados visuales (`hover`/`focus`/`active`/`disabled`/`loading`) explícitos.
- Accesibilidad: `aria-label` en botones de icono, `:focus-visible`, roles correctos.

## 4. Gestión de estado

- **Estado de UI** (ruta activa, Tweaks, modales): Zustand (`store/useUiStore.ts`) o Context. Equivale al `app.jsx` + parte de `store.jsx`.
- **Estado de datos** (entidades persistidas): **TanStack Query** contra Supabase. Mutaciones optimistas + invalidación; aquí viven los estados **loading/error** (audit F3) y los **toasts** tras mutación.
- **Persistencia local** (modo offline/borrador): si se mantiene `localStorage`, **versionar el esquema** (`schemaVersion`) y validar con Zod al hidratar, con migraciones y fallback a seed (audit B1).
- **IDs:** `crypto.randomUUID()` (no `Date.now()`).
- **Fechas:** `new Date()` real; no hardcodear «hoy» (audit B2).

### Equivalencias de mutadores (del store actual)
`cycleStatus`, `toggleDone`, `setTask`, `addTask`, `deleteTask`, `setIdentity`, `addObra`, `setObra`, `deleteObra`, `toggleCheck(section,id)`, `setMetrics`, `addMovimiento(kind,mov)`, `toggleModule`, `reset`. Reimplementar cada uno como mutación de TanStack Query (o acción de store) preservando la semántica exacta.

## 5. Integración de APIs / datos

- Cliente único en `lib/supabase.ts`. Hooks por dominio en `features/<dominio>/`.
- Toda respuesta **validada con Zod** antes de entrar al estado.
- **RLS** en Supabase: el proyecto pertenece a las dos usuarias; nadie más lee/escribe.
- Patrón: `useTasksQuery()`, `useUpdateTaskMutation()`, etc. Nada de fetch suelto en componentes.

## 6. Estilos

- Portar `styles/tokens.css` literal (sección 6 del README) como única fuente de valores.
- Romper el `styles.css` monolítico en **CSS Modules por componente** (o Tailwind con los tokens mapeados en `tailwind.config`).
- Mantener: radios, sombras, escala tipográfica, animación `rise` con `prefers-reduced-motion`.
- Respeto **pixel-perfect** del prototipo (es hi-fi).

## 7. Testing

- **Unit** (Vitest): funciones de `lib/` (`monthProgress`, `overallProgress`, `fmtDate`, `eur`, `daysUntil`) y reducers/mutadores.
- **Componentes** (React Testing Library): estados de `TaskRow`, `TaskModal`, formularios (validación), filtros.
- **E2E** (Playwright): flujos clave — login, completar tarea, alta de obra, registrar ingreso/gasto, navegación entre secciones, persistencia tras recargar.
- Cobertura objetivo pragmática: lógica de negocio > 80%.

## 8. Seguridad

- **Auth real** (Supabase Auth/Clerk) para las 2 cuentas; sin contraseña decorativa (audit S1).
- Rutas protegidas con guard de sesión.
- Nunca exponer claves de servicio en el cliente (solo `anon key` + RLS).
- Sanitizar/escapar todo contenido editable que se muestre.
- `.env*` fuera del control de versiones.

## 9. Optimización / rendimiento

- Code-splitting por ruta (`React.lazy` + `Suspense`).
- **Debounce** de persistencia local (no escribir en cada keystroke) (audit P-2).
- Memoizar listas y selectores costosos; `key` estable (UUID).
- Imágenes: lazy-load, formatos modernos, tamaños responsivos.
- Lighthouse/axe en CI.

## 10. Accesibilidad (no negociable)

- Contraste AA mínimo; cuidado con texto sobre foto en el login.
- Navegación por teclado completa; foco visible (`:focus-visible`).
- `aria-label`/`aria-pressed` en toggles e iconos; `role="dialog"` + trap de foco en modales (el prototipo ya cierra con Escape).
- Respetar `prefers-reduced-motion`.

## 11. Git / flujo de trabajo

- Ramas: `feat/<pantalla>`, `fix/<bug>`, `chore/…`.
- Commits convencionales (`feat:`, `fix:`, `refactor:`, `docs:`…).
- PRs pequeñas por pantalla/feature; checklist de la sección 9 del README como guía de avance.

## 12. Definición de «hecho» por pantalla

Una pantalla está terminada cuando: reproduce el diseño al pixel (hi-fi) · tiene estados loading/error/empty · es responsive · es accesible (axe sin errores críticos) · su lógica está cubierta por tests · usa datos validados con Zod · no rompe ninguna funcionalidad del prototipo.

---

> Recuerda las **reglas de oro**: no eliminar funcionalidades, no cambiar comportamientos, no simplificar procesos, mantener toda la lógica, estructura, integraciones y decisiones de diseño. La arquitectura cambia; **el producto y el diseño se conservan**.
