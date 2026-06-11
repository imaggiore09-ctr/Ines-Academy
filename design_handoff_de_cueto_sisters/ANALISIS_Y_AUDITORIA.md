# Informe de análisis y auditoría — de Cueto Sisters · Estudio de Marca

> Documento de transferencia · Fases 1 y 2
> Preparado actuando como Arquitecto de Software Senior + Lead Frontend + Lead Product Designer + Lead Full-Stack.
> Fecha: junio 2026 · Versión del estado: `atelier_state_v1`

---

## FASE 1 — Análisis completo del proyecto

### 1.1 Resumen ejecutivo

**de Cueto Sisters** es una **web app privada** (SPA) para dos usuarias —Inés de Cueto (artista) y Cristina de Cueto (gestión)— concebida como **centro de formación, planificación y ejecución** para construir desde cero la marca personal artística de Inés a lo largo de 6 meses: identidad, redes, tienda online, legal/finanzas y formación.

El proyecto está implementado hoy como **prototipo de alta fidelidad totalmente interactivo** en **React 18 (UMD) + Babel Standalone in-browser**, sin paso de build. Todo el estado de la usuaria se persiste en `localStorage`. Es funcional de extremo a extremo: navegación, edición, alta/baja de entidades, filtros, métricas y progreso.

> **Naturaleza del entregable:** los archivos son una **referencia de diseño en HTML/JSX** (prototipo). No son código de producción para desplegar tal cual. La tarea en Claude Code es **recrear estos diseños** en un entorno real (Vite + React + TypeScript recomendado) reutilizando sus patrones.

### 1.2 Stack actual

| Capa | Tecnología | Detalle |
|---|---|---|
| UI | React 18.3.1 (UMD `development`) | Cargado por `<script>` con `integrity` |
| Transpilación | Babel Standalone 7.29.0 | En navegador, `type="text/babel"` |
| Estilo | CSS plano + variables `:root` | Un único `styles.css` (~555 líneas) |
| Estado | Context API + `useState` | `StoreProvider` / `useStore()` |
| Persistencia | `localStorage` / `sessionStorage` | 3 claves (ver 1.7) |
| Tipografía | Google Fonts | Bodoni Moda, IBM Plex Mono, Libre Caslon, Playfair |
| Iconos | SVG inline propios | Diccionario `ICONS` en `ui.jsx` |
| Tweaks | `tweaks-panel.jsx` (host protocol) | Panel in-app de personalización |

**No hay** bundler, gestor de paquetes, router de librería, backend, API, ni tests. Todo el render parte de `React.createElement` (sin JSX en runtime salvo el transpilado por Babel).

### 1.3 Mapa de archivos (20 archivos)

```
index.html        Punto de entrada; carga fuentes + todos los scripts en orden
styles.css        Sistema visual completo (tokens, componentes, layout, responsive)
data.js           Semilla de datos (window.ATELIER_SEED): meses, identidad, obras…
edu.js            Contenido educativo estático (window.ATELIER_EDU)
store.jsx         StoreProvider, useStore, selectores (progreso, fechas, eur)
ui.jsx            Primitivas: Icon, Ring, Bar, Check, Pill, Modal, Field, InfoPop…
brand.jsx         Monograma «I» (5 variantes) + naming + BrandLockup
shell.jsx         Login (3 columnas), Sidebar, Topbar, definición de NAV
dashboard.jsx     Inicio — 3 variantes de layout (editorial/compacto/galería)
plan.jsx          Roadmap 6 meses, detalle de mes, TaskModal, calendario, filtros
identidad.jsx     Formularios editables de identidad de marca + preview en vivo
redes.jsx         Métricas, calendario de contenidos, bancos de ideas, checklist
obras.jsx         Inventario de obras (galería/tabla), alta/edición, filtros
tienda.jsx        Checklist de tienda + obligaciones legales España
legal.jsx         Trámites, fechas, documentos, preguntas asesoría, ingresos/gastos
aprendizaje.jsx   9 módulos formativos con modal de lecciones
fiscal.jsx        Academia fiscal — 10 módulos con checklist de comprensión
app.jsx           Raíz: routing por estado, sesión, Tweaks, render del árbol
tweaks-panel.jsx  Shell del panel de Tweaks (componente starter)
ines.png          Retrato editorial usado en el login
```

**Orden de carga (crítico):** `data.js` → `edu.js` → `store.jsx` → `ui.jsx` → `brand.jsx` → `tweaks-panel.jsx` → `shell.jsx` → pantallas → `app.jsx`. Cada módulo publica sus símbolos en `window` mediante `Object.assign(window, {...})` porque cada `<script type="text/babel">` tiene su propio scope.

### 1.4 Secciones / pantallas (8 + login)

1. **Login** — selección de usuaria (Inés/Cristina) + contraseña (decorativa). 3 columnas: texto sobre negro · foto de Inés · formulario.
2. **Inicio (Dashboard)** — bienvenida, foco del mes, estado de marca (6 indicadores), próximas tareas, decisiones pendientes, recordatorios. 3 variantes de layout vía Tweaks.
3. **Plan por meses** — roadmap de 6 meses; detalle con objetivo, checklist (estado/prioridad/fecha/notas/recursos), vista calendario, filtros, alta de tareas, preguntas de reflexión, contexto educativo por tarea.
4. **Identidad** — formularios editables (nombre, frase, historia, valores, estilo, temas, inspiraciones, paleta, tipografías, voz, palabras sí/no) + tarjeta de previsualización en vivo.
5. **Redes sociales** — métricas editables (seguidores/alcance/interacciones/mensajes), calendario de contenidos, bancos de ideas (reels/stories/carruseles/frases/guiones), checklist antes de publicar.
6. **Obras y colecciones** — inventario (galería + tabla), alta/edición con estado, técnica, medidas, precio, colección, historia; filtros y métricas (vendidas, ingresos).
7. **Tienda online** — estado de lanzamiento, selección de plataforma, checklist con contexto educativo (porqué/riesgo/obligatoriedad), páginas, textos pendientes, caja «Obligaciones legales en España» (LSSI, RGPD, Privacidad, Cookies, Condiciones, Desistimiento), FAQ y devoluciones.
8. **Legal y finanzas** — trámites por grupo (Asesoría/Altas/Impuestos/Facturación), fechas importantes (timeline), documentos guardados, 19 preguntas para la asesoría, registro de ingresos/gastos con balance.
9. **Aprendizaje** — 9 módulos formativos + **Conocimientos fiscales generales** (10 módulos con intro, ejemplo, errores, checklist de comprensión y recursos).

### 1.5 Modelo de datos (semilla — `data.js`)

```
ATELIER_SEED
├─ MONTHS[6]      { id, n, name, window, range, objective, reflection[], tasks[] }
│   └─ task       { id, title, priority(alta|media|baja),
│                   status(pendiente|en progreso|completada), due(ISO), notes, resources[] }
├─ IDENTITY       { nombre, frase, historia, valores[], estilo, temas[], inspiraciones[],
│                   paleta[], tipografias, voz, siPalabras[], noPalabras[] }
├─ SOCIAL         { metrics{seguidores,alcance,interacciones,mensajes,seguidoresGoal},
│                   reels[], stories[], carruseles[], frases[], guiones[], checklist[], calendar[] }
├─ OBRAS[]        { id, nombre, tecnica, medidas, fecha, precio, estado, coleccion, historia }
├─ SHOP           { plataforma, estado, checklist[], paginas[], textosPendientes[], faq[] }
├─ LEGAL          { checklist[], preguntas[], ingresos[], gastos[] }
├─ LEARN[9]       { id, t, min, mods, done, cat }
├─ REMINDERS[]    { t, due, icon }
├─ DECISIONS[]    { t, detail, month }
└─ currentMonthId "m1"
```

Contenido educativo (`edu.js → ATELIER_EDU`): `TASK_INFO`, `TASK_SUB`, `TASK_ICON`, `SHOP_INFO`, `SHOP_ICON`, `OBLIGACIONES`, `LEGAL_PREGUNTAS`, `LEGAL_FECHAS`, `LEGAL_DOCS`, `LEGAL_SUB`, `LEGAL_ICON`, `FISCAL_MODULES[10]`.

### 1.6 Flujo de navegación y estado

- **Routing:** por estado local (`route` en `app.jsx`), persistido en `localStorage("atelier_route")`. No usa History API ni hash. 8 rutas mapeadas a componentes de pantalla.
- **Sesión:** `sessionStorage("atelier_user")`. Sin login → `<Login>`; con login → shell completo.
- **Tweaks:** `dashLook`, `accent` (rojo/carmesí/tinta), `displayFont`, `brandName`, `logo`. Aplicados a `:root` (atributo `data-accent`, variable `--display`).
- **Feedback:** sistema de *toast* global (`flash()` en el store, 2,4 s).

### 1.7 Persistencia (3 claves)

| Clave | Almacén | Contenido |
|---|---|---|
| `atelier_state_v1` | localStorage | Estado completo de la app (todas las entidades) |
| `atelier_route` | localStorage | Última ruta visitada |
| `atelier_user` | sessionStorage | Usuaria con sesión iniciada |
| `atelier_fiscal_v1` | localStorage | Checklists de comprensión de la academia fiscal |
| `tweaks-*` | localStorage | Estado del panel de Tweaks (gestionado por el starter) |

### 1.8 Funcionalidades implementadas (inventario)

Edición inline de tareas · alta/baja de tareas · ciclo de estado · toggle completada · filtros (prioridad/estado) · vista checklist/calendario · alta/edición/baja de obras · galería/tabla · edición de identidad con chips · preview de marca en vivo · métricas editables · registro de ingresos/gastos con balance · checklists de tienda y legal · popovers educativos · academia fiscal con progreso · 3 layouts de dashboard · personalización de marca (logo/nombre/acento/fuente) · persistencia total · toasts.

---

## FASE 2 — Auditoría de calidad, errores y riesgos

Cada hallazgo: **Prioridad** (P0 crítico → P3 menor) · **Impacto** · **Riesgo** · **Solución**.

### 2.1 Arquitectura

| # | Hallazgo | Prio | Impacto | Riesgo | Solución recomendada |
|---|---|---|---|---|---|
| A1 | **Babel en navegador + React UMD development**. Sin build, transpila en cada carga. | P0 | Rendimiento de arranque, no apto producción | Latencia, sin minificado, warnings dev | Migrar a **Vite + React + TypeScript**; JSX compilado en build. |
| A2 | **Acoplamiento por `window`**. Cada módulo publica símbolos en global. | P1 | Mantenibilidad, colisiones | Choques de nombres, orden de carga frágil | Sustituir por **imports ES**; cada componente en su archivo. |
| A3 | **Orden de `<script>` crítico**. data→edu→store→ui→… manual. | P1 | Fragilidad | Un reorden rompe la app | Resuelto por bundler con grafo de dependencias. |
| A4 | **`styles.css` monolítico** (~555 líneas, todo global). | P2 | Escalabilidad CSS | Especificidad, dead code | **CSS Modules** o Tailwind; o tokens + módulos por componente. |
| A5 | **Bloque `__om-edit-overrides`** y comentarios `EDITMODE` específicos del editor. | P2 | Ruido en producción | Confusión | Eliminar en la recreación. |
| A6 | Render con `React.createElement` (no JSX literal). | P3 | Legibilidad | — | Reescribir como JSX `.tsx` (más legible y tipado). |

### 2.2 Lógica de negocio / datos

| # | Hallazgo | Prio | Impacto | Riesgo | Solución |
|---|---|---|---|---|---|
| B1 | **Sin versionado de esquema** en `atelier_state_v1`. Si cambia la forma de los datos, el `localStorage` viejo rompe. | P0 | Pérdida/corrupción de datos de la usuaria | Crash al cargar estado antiguo | **Migraciones por versión** + validación con Zod al hidratar; fallback a semilla. |
| B2 | **«Hoy» hardcodeado** (`2026-09-08` en `daysUntil`, fechas del login). | P1 | Datos desfasados | Cálculos de plazos erróneos | Usar `new Date()` real; o fecha de inicio del proyecto configurable. |
| B3 | **Contraseña decorativa** — no valida nada; cualquier valor entra. | P0 (seguridad) | Acceso | App «privada» sin auth real | Implementar auth real (ver 2.5). |
| B4 | **IDs por `Date.now()`** — colisión posible en altas rápidas. | P2 | Integridad | Claves duplicadas en listas | `crypto.randomUUID()`. |
| B5 | Métricas de «Ventas» y barras derivadas de heurísticas (`ingresos.length*25`). | P3 | Exactitud | Indicador poco fiel | Derivar de datos reales cuando exista backend. |
| B6 | Checklist de comprensión fiscal usa **clave de persistencia aparte** (`atelier_fiscal_v1`), fuera del store central. | P2 | Consistencia | Estado disperso | Unificar en el store/único origen de verdad. |

### 2.3 Frontend / visual / responsive

| # | Hallazgo | Prio | Impacto | Riesgo | Solución |
|---|---|---|---|---|---|
| F1 | **Login a 3 columnas** colapsa a 1 col < 920px y oculta foto/arte (`display:none`). En móvil se pierde la identidad visual. | P1 | UX móvil | Pantalla pobre en móvil | Rediseño responsive del login (apilado con foto arriba). |
| F2 | **Sidebar fija** se transforma en off-canvas < 860px (ya implementado), pero el contenido usa anchos amplios. Revisar tablas (obras/legal) con scroll horizontal. | P2 | Responsive | Overflow en móvil | `overflow-x:auto` en contenedores de tabla; cards en móvil. |
| F3 | **Estados loading/error ausentes** (no hay fetch hoy, pero al añadir backend faltarán). | P1 | UX | Pantallas en blanco al cargar | Definir skeletons + estados error desde el inicio. |
| F4 | **Accesibilidad**: faltan `aria-label` en varios botones de icono; foco no siempre visible; contraste del texto sobre foto del login depende de la imagen. | P1 | A11y | Exclusión, incumplimiento WCAG | Auditar con axe; añadir roles/labels; `:focus-visible`. |
| F5 | **Inputs `type` limitados**: precios como `number` sin formato live; fechas dependientes del locale del navegador. | P3 | UX | Entrada inconsistente | Componentes de input controlados con máscara/validación. |
| F6 | Animación de entrada `rise` gateada a `prefers-reduced-motion` correctamente; OK. Mantener al recrear. | P3 | — | — | Conservar. |

### 2.4 UX / UI

| # | Hallazgo | Prio | Impacto | Riesgo | Solución |
|---|---|---|---|---|---|
| U1 | **Buscador y campana** del topbar son decorativos (sin acción). | P2 | Expectativa rota | Frustración | Implementar o ocultar hasta tener función. |
| U2 | Varias **listas/recursos no editables** (bancos de ideas, recursos de tarea) — solo lectura. | P2 | Consistencia | La usuaria espera editar todo | Hacer editables o marcar claramente como contenido guía. |
| U3 | **Sin confirmación al eliminar** obras/tareas (acción directa). | P1 | Pérdida de datos | Borrado accidental | Modal de confirmación o *undo* en toast. |
| U4 | **Validación de formularios mínima** (solo título/nombre requerido). | P2 | Datos sucios | Entradas vacías o inválidas | Validación declarativa (Zod + react-hook-form). |
| U5 | Texto del objetivo del Mes 1 conserva «Ines» sin tilde si viene de estado guardado antiguo. | P3 | Detalle | Inconsistencia menor | Migración B1 lo resuelve. |

### 2.5 Seguridad

| # | Hallazgo | Prio | Impacto | Riesgo | Solución |
|---|---|---|---|---|---|
| S1 | **Sin autenticación real** (contraseña no se comprueba). | P0 | App privada expuesta | Cualquiera entra | Auth gestionada (Supabase Auth / Clerk / Auth.js) con 2 cuentas. |
| S2 | **Datos en `localStorage`** sin cifrar, solo en el dispositivo; sin sincronización entre Inés y Cristina. | P0 | Colaboración imposible | Cada navegador ve datos distintos | Backend con datos compartidos (ver Fase 3). |
| S3 | Sin protección de rutas; toda la app es accesible una vez «entras». | P1 | — | — | Guard de sesión + roles si se requiere. |
| S4 | Scripts externos con `integrity` (bien) pero `development` build. | P2 | — | — | Dependencias vía npm en producción. |

### 2.6 Rendimiento

| # | Hallazgo | Prio | Solución |
|---|---|---|---|
| P-1 | Transpilación Babel en cada carga | P0 | Build con Vite (desaparece). |
| P-2 | `localStorage.setItem` en cada cambio de estado (efecto sobre `state` completo) | P2 | *Debounce* de persistencia; persistir por slice. |
| P-3 | Sin code-splitting; todo carga de golpe | P2 | Lazy-load por ruta (`React.lazy`). |
| P-4 | Imágenes sin optimizar (`ines.png`) | P3 | `next/image` o `<img loading=lazy>` + formatos modernos. |

### 2.7 Veredicto

El prototipo es **sólido, coherente y completo a nivel de producto y diseño** — excelente base de especificación. Los riesgos **P0 son intrínsecos a su naturaleza de prototipo** (sin build, sin auth, sin backend, sin versionado de datos) y se resuelven en la migración a Claude Code, no son defectos del diseño. **Ninguna funcionalidad debe eliminarse**; todas se recrean sobre arquitectura de producción.

**Prioridad de trabajo recomendada en Claude Code:**
1. P0 arquitectura (Vite+TS) y datos (versionado/validación).
2. P0 seguridad (auth + backend compartido para las dos hermanas).
3. P1 responsive del login, estados loading/error, accesibilidad, confirmaciones de borrado.
4. P2/P3 refinamientos.

➡️ Continúa en **README.md** (estructura objetivo + instalación) y **DEVELOPER_MANUAL.md** (estándares).
