# Transferencia a Claude Code — de Cueto Sisters · Estudio de Marca

> **Lee primero** `ANALISIS_Y_AUDITORIA.md` (Fases 1–2: análisis + auditoría).
> Este documento cubre las **Fases 3–5**: arquitectura objetivo, exportación e instalación.
> El manual de estándares está en `DEVELOPER_MANUAL.md` (Fase 6).

---

## 1. Sobre estos archivos (IMPORTANTE)

Los archivos de `design_reference/` son una **referencia de diseño creada en HTML/JSX** — un **prototipo de alta fidelidad** que muestra el aspecto y el comportamiento deseados. **No son código de producción** para copiar y desplegar tal cual.

Tu tarea en Claude Code es **recrear estos diseños en un entorno real y mantenible** (recomendado: **Vite + React + TypeScript**), reutilizando patrones de producción. El prototipo es la **fuente de verdad de producto, UX y visual**: respétalo al pixel. La arquitectura, en cambio, debe rehacerse según la sección 3.

**Fidelidad: ALTA (hi-fi).** Colores, tipografía, espaciados e interacciones son finales. Reprodúcelos con exactitud.

**Reglas de oro (del encargo):** no eliminar funcionalidades, no cambiar comportamientos, no simplificar procesos, mantener toda la lógica, estructura, integraciones y decisiones de diseño actuales.

---

## 2. Resumen del proyecto

**Qué es:** web app **privada para dos usuarias** (Inés de Cueto — artista; Cristina de Cueto — gestión) que funciona como centro de **formación + planificación + ejecución** para construir la marca personal artística de Inés en 6 meses.

**Casos de uso:**
- Seguir un **roadmap de 6 meses** con tareas, prioridades, fechas, notas y recursos.
- Definir y guardar la **identidad de marca**.
- Planificar **redes sociales** y registrar métricas.
- Gestionar el **inventario de obras** y colecciones.
- Preparar la **tienda online** con contexto legal.
- Organizar **legal y finanzas** (trámites, fechas, ingresos/gastos, preguntas para asesoría).
- **Aprender** con módulos formativos y una **academia fiscal** (10 módulos).

**Idioma:** español (es-ES). **Tono:** editorial, íntimo, premium, femenino, minimalista.

---

## 3. Arquitectura objetivo (Fase 3)

Stack recomendado (modular, escalable, tipado, mantenible):

| Área | Elección recomendada | Por qué |
|---|---|---|
| Build/dev | **Vite** | Rápido, estándar para React+TS. |
| Lenguaje | **TypeScript** | Tipar el modelo de datos (sección 5). |
| UI | **React 18** | Igual que el prototipo. |
| Routing | **React Router v6** | Sustituye el routing por estado actual. |
| Estado servidor | **TanStack Query** | Cache + estados loading/error (audit F3). |
| Estado cliente | **Zustand** (o Context) | Equivale al `StoreProvider` actual, simple. |
| Validación | **Zod** + **react-hook-form** | Validación de formularios y de datos persistidos (audit B1/U4). |
| Backend/Datos | **Supabase** (Postgres + Auth + RLS) | Resuelve S1/S2: auth real para 2 cuentas + **datos compartidos** entre hermanas. |
| Estilo | **CSS Modules** o **Tailwind** con los tokens de la sección 6 | Romper el CSS monolítico (audit A4). |
| Iconos | Portar el set SVG propio (`ui.jsx → ICONS`) a componentes | Mantiene identidad. |

### 3.1 Estructura de carpetas propuesta

```
src/
  main.tsx
  App.tsx                      # Providers + Router
  routes/
    LoginRoute.tsx
    DashboardRoute.tsx
    PlanRoute.tsx
    IdentidadRoute.tsx
    RedesRoute.tsx
    ObrasRoute.tsx
    TiendaRoute.tsx
    LegalRoute.tsx
    AprendizajeRoute.tsx
    FiscalRoute.tsx
  components/
    layout/   (Sidebar, Topbar, AppShell)
    brand/    (BrandMark, BrandLockup)        # de brand.jsx
    ui/       (Card, Ring, Bar, Check, Pill, Tag, Modal, Field, InfoPop, Icon, ImgPh, Toast)
    plan/     (MonthCard, TaskRow, TaskModal, MonthCalendar, NewTaskModal)
    obras/    (ObraCard, ObraModal)
    ...por dominio
  features/                    # lógica por dominio (hooks + servicios)
    tasks/  identity/  social/  obras/  shop/  legal/  learning/  fiscal/
  lib/
    supabase.ts  queryClient.ts  format.ts (eur, fmtDate, daysUntil)
  store/
    useUiStore.ts (route, tweaks)   useSession.ts
  data/
    seed.ts   (de data.js)          edu.ts (de edu.js)
  types/
    models.ts (sección 5)
  styles/
    tokens.css (sección 6)  globals.css  + módulos por componente
  assets/
    ines.png
```

### 3.2 Mapa: prototipo → destino

| Prototipo | Destino |
|---|---|
| `store.jsx` (`StoreProvider`, `useStore`) | `store/` (Zustand) + `features/*/hooks` + TanStack Query contra Supabase |
| `app.jsx` (routing por estado) | `App.tsx` + React Router |
| `shell.jsx` (Login/Sidebar/Topbar/NAV) | `components/layout/*` + `routes/LoginRoute.tsx` |
| `ui.jsx` (primitivas + ICONS) | `components/ui/*` |
| `brand.jsx` | `components/brand/*` |
| `dashboard.jsx`/`plan.jsx`/… | `routes/*Route.tsx` + `components/<dominio>/*` |
| `data.js` / `edu.js` | `data/seed.ts` / `data/edu.ts` (+ tablas Supabase) |
| `styles.css` | `styles/tokens.css` + módulos/Tailwind |
| `tweaks-panel.jsx` | Opcional: panel de ajustes de marca (no esencial en producción) |

---

## 4. Pantallas y comportamiento (referencia hi-fi)

Para el detalle visual exacto de **cada componente** (medidas, colores, tipografía, estados), abre los archivos de `design_reference/` indicados y reprodúcelos. Resumen por pantalla:

### 4.1 Login (`shell.jsx`)
- **Layout:** grid 3 columnas `0.86fr 1.12fr 1.0fr`. Izquierda: panel negro (`--ink`) con kicker, titular display y subtítulo. Centro: foto `ines.png` (`object-fit:cover; object-position:74% 20%`). Derecha: formulario sobre `--paper`.
- **Formulario:** `BrandLockup` (logo «I» variante `crest` tam. 80 + «de Cueto Sisters» 28px + «Estudio de Marca»), título «Bienvenida de nuevo» (21px), selector de usuaria (2 tarjetas), campo contraseña, botón «Entrar al atelier».
- **Responsive:** < 920px colapsa a 1 col (audit F1 → mejorar).

### 4.2 Inicio / Dashboard (`dashboard.jsx`)
- 3 variantes (`editorial`/`compacto`/`galeria`) seleccionables por Tweaks. **Por defecto: editorial.**
- Bloques: `WelcomeHero`, `MonthFocusCard` (anillo de progreso del mes), `StatusCard` (6 indicadores de marca), `RemindersCard`, `NextTasksCard`, `DecisionsCard` (sobre fondo negro).

### 4.3 Plan por meses (`plan.jsx`)
- Roadmap: 6 `MonthCard` con progreso. Detalle: objetivo, **preguntas de reflexión**, toolbar (segmented `Checklist`/`Calendario`, filtros prioridad/estado, «Añadir tarea»), lista de `TaskRow` (icono + título + subtítulo educativo + meta; clic despliega «Por qué importa»), `TaskModal` (editar todo, recursos, reflexión, eliminar/completar), `MonthCalendar`.

### 4.4 Identidad (`identidad.jsx`)
- Formularios editables + `ChipEditor` (valores/temas/inspiraciones/palabras sí-no) + tarjeta de **preview de marca en vivo** con paleta y muestras tipográficas.

### 4.5 Redes (`redes.jsx`)
- `MetricTile` editables (click-to-edit) con barra a meta; calendario de contenidos; `IdeaColumn` (reels/stories/carruseles/frases/guiones); checklist antes de publicar (panel negro).

### 4.6 Obras (`obras.jsx`)
- Métricas; segmented Galería/Tabla; filtros colección/estado; `ObraCard`/tabla; `ObraModal` alta/edición (placeholder de foto, estado, técnica, medidas, precio, colección, historia).

### 4.7 Tienda (`tienda.jsx`)
- Estado de lanzamiento (anillo) + selección de plataforma; checklist con iconos + subtítulo + pill obligatoriedad; páginas; textos pendientes; **caja «Obligaciones legales en España»** (LSSI/RGPD/Privacidad/Cookies/Condiciones/Desistimiento); FAQ; devoluciones.

### 4.8 Legal y finanzas (`legal.jsx`)
- Aviso (no es asesoramiento legal); trámites por grupo (icono + subtítulo); **Fechas importantes** (timeline); **Documentos guardados**; **19 preguntas** para la asesoría; resumen ingresos/gastos/balance; registro con `MovModal`.

### 4.9 Aprendizaje (`aprendizaje.jsx`) + Fiscal (`fiscal.jsx`)
- 9 módulos formativos con modal de lecciones; **academia fiscal**: 10 módulos con intro, ejemplo real, errores frecuentes, **checklist de comprensión** (persistida) y recursos.

### Interacciones transversales
- **Toast** global tras mutaciones (2,4 s).
- **Animación** de entrada `rise` (respetando `prefers-reduced-motion`).
- **Persistencia** automática en cada cambio (ver audit P-2: aplicar debounce).

---

## 5. Modelo de datos / tipos (Fase 4)

Portar a `types/models.ts`. Forma actual (ver `data/seed` + `store`):

```ts
type Priority = 'alta' | 'media' | 'baja';
type TaskStatus = 'pendiente' | 'en progreso' | 'completada';
type ObraEstado = 'en proceso' | 'terminada' | 'fotografiada' | 'publicada' | 'vendida';

interface Task {
  id: string; title: string; priority: Priority; status: TaskStatus;
  due: string;        // ISO 'YYYY-MM-DD' o ''
  notes: string; resources: string[];
}
interface Month {
  id: string; n: number; name: string; window: string; range: string;
  objective: string; reflection: string[]; tasks: Task[];
}
interface Identity {
  nombre: string; frase: string; historia: string; valores: string[];
  estilo: string; temas: string[]; inspiraciones: string[]; paleta: string[];
  tipografias: string; voz: string; siPalabras: string[]; noPalabras: string[];
}
interface SocialMetrics { seguidores:number; alcance:number; interacciones:number; mensajes:number; seguidoresGoal:number; }
interface Obra { id:string; nombre:string; tecnica:string; medidas:string; fecha:string; precio:number; estado:ObraEstado; coleccion:string; historia:string; }
interface ChecklistItem { id:string; t:string; done:boolean; group?:string; }
interface Movimiento { id:string; fecha:string; concepto:string; cat:string; monto:number; }
interface LearnModule { id:string; t:string; min:number; mods:number; done:boolean; cat:string; }
interface AppState {
  MONTHS: Month[]; IDENTITY: Identity;
  SOCIAL: { metrics: SocialMetrics; reels:string[]; stories:string[]; carruseles:string[]; frases:string[]; guiones:string[]; checklist:string[]; calendar:{day:string;type:string;title:string}[] };
  OBRAS: Obra[];
  SHOP: { plataforma:string; estado:string; checklist:ChecklistItem[]; paginas:string[]; textosPendientes:string[]; faq:{q:string;a:string}[] };
  LEGAL: { checklist:ChecklistItem[]; preguntas:string[]; ingresos:Movimiento[]; gastos:Movimiento[] };
  LEARN: LearnModule[];
  REMINDERS: {t:string;due:string;icon:string}[];
  DECISIONS: {t:string;detail:string;month:string}[];
  currentMonthId: string;
}
```

**Esquema de BD (Supabase, sugerido):** una fila de proyecto compartida + tablas `months`, `tasks`, `obras`, `movimientos`, `identity` (JSON), `social` (JSON), `shop` (JSON), `legal_checklist`, `fiscal_progress`. RLS: solo las 2 usuarias del proyecto. **Validar con Zod al leer** (audit B1).

---

## 6. Design tokens (Fase 4)

De `styles.css`. **Acento = rojo «labios de Inés».**

```css
/* Papel / tinta (blanco cálido + negro cálido) */
--paper:#fdfbf7;  --paper-2:#f5f1e9;  --paper-3:#ece5d8;
--ink:#211d18;    --ink-soft:#46413a; --ink-mute:#786f64; --ink-faint:#a69d8e;
--line:#e7dfd1;   --line-2:#ddd4c3;   --line-strong:#c9bfac;
/* Acento rojo (marca + estado) */
--red:#cc2e29;    --red-deep:#a8211d;  --red-wash:#f9e6e3; --red-line:#f0cbc6;
/* Estado completada (salvia) */
--done:#5f8a5f;   --done-wash:#e8efe2;
/* Radios */ --r-sm:4px; --r-md:7px; --r-lg:12px;
/* Sombras */
--shadow-card:0 1px 2px rgba(38,34,27,.04),0 8px 24px -16px rgba(38,34,27,.16);
--shadow-pop:0 18px 50px -18px rgba(38,34,27,.32);
/* Layout */ --sidebar-w:256px; --maxw:1240px;
```

**Tipografía:**
- Display: **Bodoni Moda** (titulares, números, marca). Alternativas en Tweaks: Playfair Display, Libre Caslon Display.
- Mono: **IBM Plex Mono** (kickers, metadatos, etiquetas; uppercase + letter-spacing .06–.18em).
- Texto: **Helvetica Neue** / Helvetica / Arial.
- Escala kicker: 10–11px mono uppercase. Títulos de página: Bodoni ~44px. Body: 15px/1.55.

**Variantes de acento (Tweaks):** `data-accent="carmesi"` (#9e1b1b) y `data-accent="tinta"` (#221d18).

---

## 7. Assets

| Asset | Origen | Uso |
|---|---|---|
| `ines.png` | Foto editorial aportada por la usuaria | Columna central del login |
| Iconos SVG | Set propio en `ui.jsx → ICONS` (~45 glifos, stroke 1.6) | Toda la app |
| Monograma «I» | Vectorial en `brand.jsx` (5 variantes: crest/frame/shield/circle/serif) | Marca |
| Fuentes | Google Fonts (Bodoni Moda, IBM Plex Mono, Libre Caslon, Playfair) | — |

No se usan imágenes de stock: el resto de imágenes son **placeholders rayados** (`ImgPh`) a la espera de material real (fotos de obras, moodboard, portadas de módulos).

---

## 8. Instalación local + continuar en Claude Code (Fase 5)

### 8.1 Ver el prototipo tal cual (sin instalar nada)
El prototipo no necesita build. Sírvelo con cualquier servidor estático:
```bash
cd design_reference
python3 -m http.server 8000      # o:  npx serve .
# abre http://localhost:8000/index.html
```

### 8.2 Arrancar el proyecto de producción (recomendado)
```bash
# 1) Crear el proyecto
npm create vite@latest de-cueto-sisters -- --template react-ts
cd de-cueto-sisters
npm install

# 2) Dependencias recomendadas
npm install react-router-dom @tanstack/react-query zustand zod react-hook-form
npm install @supabase/supabase-js
# estilo: elige uno
#   Tailwind:  npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
#   o CSS Modules (incluido en Vite, sin extra)

# 3) Arrancar
npm run dev
```

### 8.3 Variables de entorno (`.env.local`)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
(No subir `.env*` al repo; añadir a `.gitignore`.)

### 8.4 Trabajar con Claude Code
1. Copia esta carpeta `design_handoff_de_cueto_sisters/` a la raíz de tu repo nuevo.
2. Abre el repo en Claude Code.
3. Prompt sugerido:
   > «Lee `design_handoff_de_cueto_sisters/ANALISIS_Y_AUDITORIA.md`, `README.md` y `DEVELOPER_MANUAL.md`. Recrea el prototipo de `design_reference/` en este proyecto Vite+React+TS siguiendo la arquitectura objetivo. Empieza por los tokens y las primitivas UI, luego el AppShell y el routing, después las pantallas en este orden: Login, Dashboard, Plan, Identidad, Redes, Obras, Tienda, Legal, Aprendizaje, Fiscal. No elimines ninguna funcionalidad; respeta el diseño al pixel.»
4. Implementa por capas; verifica cada pantalla contra el HTML de referencia.

### 8.5 Despliegue
- **Vercel** o **Netlify** (build `npm run build`, salida `dist/`).
- Supabase como backend gestionado. Configurar las variables de entorno en el panel del proveedor.

---

## 9. Orden de implementación sugerido (checklist)

- [ ] Tokens + estilos base (sección 6).
- [ ] Primitivas UI + set de iconos (`components/ui`).
- [ ] BrandMark/BrandLockup.
- [ ] AppShell (Sidebar + Topbar) + React Router.
- [ ] Tipos + seed + (luego) Supabase + Zod.
- [ ] Auth real (2 usuarias) + guard de sesión.
- [ ] Login (con responsive mejorado).
- [ ] Dashboard (variante editorial; el resto opcional).
- [ ] Plan + TaskModal + calendario + filtros.
- [ ] Identidad · Redes · Obras · Tienda · Legal · Aprendizaje · Fiscal.
- [ ] Estados loading/error + confirmaciones de borrado + validaciones.
- [ ] Accesibilidad (labels, foco, contraste) + auditoría axe.
- [ ] Despliegue.

---

**Archivos de este paquete:**
- `ANALISIS_Y_AUDITORIA.md` — Fases 1–2.
- `README.md` — este documento (Fases 3–5).
- `DEVELOPER_MANUAL.md` — Fase 6 (estándares y convenciones).
- `design_reference/` — prototipo HTML/JSX completo (fuente de verdad de diseño).
