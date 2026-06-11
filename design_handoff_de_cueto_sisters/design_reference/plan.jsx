/* ATELIER — Plan por meses: Roadmap · Detalle de mes · TaskModal */

/* ————— Modal de tarea (editable) ————— */
function TaskModal({ taskRef, onClose }) {
  const { state, setTask, toggleDone, deleteTask } = useStore();
  const month = state.MONTHS.find(m => m.id === taskRef.monthId);
  const task = month && month.tasks.find(t => t.id === taskRef.taskId);
  if (!task) return null;

  const patch = (p) => setTask(month.id, task.id, p);

  return React.createElement(Modal, {
    kicker: "Mes " + month.n + " · " + month.window, title: task.title, onClose,
    footer: React.createElement(React.Fragment, null,
      React.createElement("button", { className: "btn ghost sm", onClick: () => { deleteTask(month.id, task.id); onClose(); },
        style: { marginRight: "auto", color: "var(--red-deep)", borderColor: "var(--red-line)" } },
        React.createElement(Icon, { name: "trash", size: 15 }), "Eliminar"),
      React.createElement("button", { className: "btn ghost sm", onClick: onClose }, "Cerrar"),
      React.createElement("button", { className: "btn red sm", onClick: () => { toggleDone(month.id, task.id); onClose(); } },
        React.createElement(Icon, { name: "check", size: 15 }),
        task.status === "completada" ? "Reabrir" : "Marcar completada"))
  },
    (window.ATELIER_EDU && window.ATELIER_EDU.TASK_INFO[task.id]) && React.createElement("div", {
      style: { background: "var(--red-wash)", border: "1px solid var(--red-line)", borderRadius: "var(--r-md)", padding: "13px 15px", marginBottom: 18, display: "flex", gap: 11 } },
      React.createElement(Icon, { name: "info", size: 17, style: { color: "var(--red-deep)", flex: "none", marginTop: 1 } }),
      React.createElement("div", null,
        React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 4 } }, "Por qué importa"),
        React.createElement("p", { style: { fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 } }, window.ATELIER_EDU.TASK_INFO[task.id]))),
    React.createElement(Field, { label: "Título de la tarea", value: task.title, onChange: v => patch({ title: v }) }),
    React.createElement("div", { className: "row", style: { gap: 14 } },
      React.createElement("label", { className: "field", style: { flex: 1 } },
        React.createElement("span", null, "Estado"),
        React.createElement("select", { className: "input", value: task.status, onChange: e => patch({ status: e.target.value }) },
          ["pendiente", "en progreso", "completada"].map(s => React.createElement("option", { key: s, value: s }, STATUS_LABEL[s])))),
      React.createElement("label", { className: "field", style: { flex: 1 } },
        React.createElement("span", null, "Prioridad"),
        React.createElement("select", { className: "input", value: task.priority, onChange: e => patch({ priority: e.target.value }) },
          ["alta", "media", "baja"].map(s => React.createElement("option", { key: s, value: s }, s[0].toUpperCase() + s.slice(1))))),
      React.createElement("label", { className: "field", style: { flex: 1 } },
        React.createElement("span", null, "Fecha límite"),
        React.createElement("input", { type: "date", className: "input", value: task.due, onChange: e => patch({ due: e.target.value }) }))),
    React.createElement(Field, { label: "Notas", value: task.notes, onChange: v => patch({ notes: v }), area: true, placeholder: "Escribe aquí tus notas…" }),
    React.createElement("div", { className: "field" },
      React.createElement("span", { style: { display: "block", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 8 } }, "Recursos asociados"),
      (task.resources && task.resources.length)
        ? React.createElement("div", { className: "row wrap", style: { gap: 8 } },
            task.resources.map((r, i) => React.createElement("span", { key: i, className: "tag" },
              React.createElement(Icon, { name: "doc", size: 12 }), r)))
        : React.createElement("p", { className: "faint", style: { fontSize: 13 } }, "Sin recursos todavía.")),
    React.createElement("div", { style: { background: "var(--paper-2)", borderRadius: "var(--r-md)", padding: 16, marginTop: 4 } },
      React.createElement("div", { className: "kicker", style: { marginBottom: 10 } }, "Preguntas de reflexión"),
      React.createElement("ul", { style: { margin: 0, paddingLeft: 18, color: "var(--ink-soft)", fontSize: 13.5, lineHeight: 1.7 } },
        month.reflection.map((q, i) => React.createElement("li", { key: i, className: "display-i", style: { fontSize: 15 } }, q))))
  );
}

/* ————— Nueva tarea ————— */
function NewTaskModal({ monthId, onClose }) {
  const { addTask } = useStore();
  const [form, setForm] = useState({ title: "", priority: "media", due: "" });
  const save = () => { if (!form.title.trim()) return; addTask(monthId, form); onClose(); };
  return React.createElement(Modal, { kicker: "Nueva tarea", title: "Añadir tarea", onClose,
    footer: React.createElement(React.Fragment, null,
      React.createElement("button", { className: "btn ghost sm", onClick: onClose }, "Cancelar"),
      React.createElement("button", { className: "btn red sm", onClick: save }, "Añadir")) },
    React.createElement(Field, { label: "Título", value: form.title, onChange: v => setForm({ ...form, title: v }), placeholder: "¿Qué hay que hacer?" }),
    React.createElement("div", { className: "row", style: { gap: 14 } },
      React.createElement("label", { className: "field", style: { flex: 1 } },
        React.createElement("span", null, "Prioridad"),
        React.createElement("select", { className: "input", value: form.priority, onChange: e => setForm({ ...form, priority: e.target.value }) },
          ["alta", "media", "baja"].map(s => React.createElement("option", { key: s, value: s }, s[0].toUpperCase() + s.slice(1))))),
      React.createElement("label", { className: "field", style: { flex: 1 } },
        React.createElement("span", null, "Fecha límite"),
        React.createElement("input", { type: "date", className: "input", value: form.due, onChange: e => setForm({ ...form, due: e.target.value }) }))));
}

/* ————— Tarjeta de mes (roadmap) ————— */
function MonthCard({ m, onClick, current }) {
  const p = monthProgress(m);
  return React.createElement("button", { className: "month-card" + (current ? " current" : ""), onClick },
    React.createElement("div", { className: "mc-top" },
      React.createElement("div", { className: "row between" },
        React.createElement("span", { className: "month-num display" }, "Mes " + m.n),
        current
          ? React.createElement("span", { className: "pill doing" }, "En curso")
          : React.createElement("span", { className: "mono", style: { fontSize: 11, color: "var(--ink-faint)" } }, m.window)),
      React.createElement("div", { className: "month-name" }, m.name),
      React.createElement("p", { className: "muted", style: { fontSize: 13, minHeight: 38 } }, m.objective)),
    React.createElement("div", { className: "mc-foot" },
      React.createElement("div", { className: "row between", style: { marginBottom: 8 } },
        React.createElement("span", { className: "mono", style: { fontSize: 11, color: "var(--ink-mute)" } }, p.done + "/" + p.total + " tareas"),
        React.createElement("span", { className: "display", style: { fontSize: 15 } }, p.pct + "%")),
      React.createElement(Bar, { pct: p.pct })));
}

/* ————— Lista de tareas (checklist) ————— */
function TaskList({ month, openTask, filterP, filterS }) {
  const { toggleDone, cycleStatus } = useStore();
  const [expanded, setExpanded] = useState(null);
  const EDU = window.ATELIER_EDU || {};
  let tasks = month.tasks;
  if (filterP !== "todas") tasks = tasks.filter(t => t.priority === filterP);
  if (filterS !== "todos") tasks = tasks.filter(t => t.status === filterS);
  if (!tasks.length) return React.createElement("p", { className: "muted center", style: { padding: 30 } }, "No hay tareas con estos filtros.");
  return React.createElement("div", null,
    tasks.map(t => {
      const sub = EDU.TASK_SUB && EDU.TASK_SUB[t.id];
      const info = EDU.TASK_INFO && EDU.TASK_INFO[t.id];
      const ico = (EDU.TASK_ICON && EDU.TASK_ICON[t.id]) || "check";
      const isDone = t.status === "completada";
      const open = expanded === t.id;
      return React.createElement(React.Fragment, { key: t.id },
        React.createElement("div", { className: "task-row" + (isDone ? " is-done" : "") },
          React.createElement("div", { className: "task-ico" }, React.createElement(Icon, { name: ico, size: 18 })),
          React.createElement(Check, { on: isDone, onClick: () => toggleDone(month.id, t.id) }),
          React.createElement("div", { className: "task-body", onClick: () => info ? setExpanded(open ? null : t.id) : openTask(month.id, t.id) },
            React.createElement("div", { className: "t-title", style: { fontSize: 15 } }, t.title),
            sub && React.createElement("div", { className: "t-sub" }, sub),
            React.createElement("div", { className: "t-meta-inline" },
              React.createElement(Priority, { p: t.priority }),
              t.due && React.createElement("span", { className: "mi" }, React.createElement(Icon, { name: "clock", size: 12 }), fmtDate(t.due)),
              React.createElement("span", { className: "mi" }, React.createElement(Icon, { name: "edit", size: 12 }), t.notes ? "Nota" : "Nota +"),
              t.resources.length > 0 && React.createElement("span", { className: "mi" }, React.createElement(Icon, { name: "doc", size: 12 }), t.resources.length))),
          React.createElement("div", { className: "task-right" },
            React.createElement("button", { className: "edit-btn", title: "Editar tarea", onClick: () => openTask(month.id, t.id) },
              React.createElement(Icon, { name: "settings", size: 16 })),
            React.createElement("button", { style: { border: "none", background: "none", padding: 0 }, title: "Cambiar estado", onClick: () => cycleStatus(month.id, t.id) },
              React.createElement(StatusPill, { status: t.status })))),
        open && info && React.createElement("div", { className: "task-expand" },
          React.createElement("h4", null, "Por qué importa"),
          React.createElement("p", null, info)));
    }));
}

/* ————— Vista calendario del mes ————— */
function MonthCalendar({ month }) {
  const tasksByDay = {};
  month.tasks.forEach(t => { if (t.due) (tasksByDay[t.due] = tasksByDay[t.due] || []).push(t); });
  // construir rejilla del mes según primera fecha
  const first = month.tasks.find(t => t.due);
  const base = first ? new Date(first.due + "T00:00:00") : new Date("2026-09-01T00:00:00");
  const y = base.getFullYear(), mo = base.getMonth();
  const firstDow = (new Date(y, mo, 1).getDay() + 6) % 7; // lunes=0
  const days = new Date(y, mo + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const dow = ["L", "M", "X", "J", "V", "S", "D"];
  return React.createElement("div", null,
    React.createElement("div", { className: "cal", style: { marginBottom: 6 } },
      dow.map(d => React.createElement("div", { key: d, className: "cal-h" }, d))),
    React.createElement("div", { className: "cal" },
      cells.map((d, i) => {
        if (d === null) return React.createElement("div", { key: i, className: "cell muted" });
        const iso = `${y}-${String(mo + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const evs = tasksByDay[iso] || [];
        return React.createElement("div", { key: i, className: "cell" + (evs.length ? " has" : "") }, d,
          evs[0] && React.createElement("div", { className: "ev", title: evs.map(e => e.title).join(", ") },
            evs.length > 1 ? evs.length + " tareas" : evs[0].title));
      })));
}

/* ————— Detalle de mes ————— */
function MonthDetail({ month, back, openTask }) {
  const [view, setView] = useState("checklist");
  const [fp, setFp] = useState("todas");
  const [fs, setFs] = useState("todos");
  const [newTask, setNewTask] = useState(false);
  const p = monthProgress(month);

  return React.createElement("div", { className: "page" },
    newTask && React.createElement(NewTaskModal, { monthId: month.id, onClose: () => setNewTask(false) }),
    React.createElement("button", { className: "btn ghost sm", onClick: back, style: { marginBottom: 20 } },
      React.createElement(Icon, { name: "chevron", size: 14, style: { transform: "rotate(180deg)" } }), "Todos los meses"),

    React.createElement("div", { className: "grid", style: { gridTemplateColumns: "1fr auto", alignItems: "start", gap: 28, marginBottom: 26 } },
      React.createElement("div", null,
        React.createElement("div", { className: "kicker kicker-red" }, "Mes " + month.n + " · " + month.range),
        React.createElement("h1", { className: "page-title", style: { marginTop: 8 } }, month.name),
        React.createElement("p", { className: "page-intro", style: { marginTop: 12 } }, month.objective)),
      React.createElement("div", { className: "card", style: { width: 200, textAlign: "center" } },
        React.createElement(Ring, { pct: p.pct, size: 92, stroke: 7 },
          React.createElement("div", { className: "display", style: { fontSize: 24 } }, p.pct + "%")),
        React.createElement("div", { className: "mono", style: { fontSize: 11, color: "var(--ink-mute)", marginTop: 12 } },
          p.done + " de " + p.total + " tareas"))),

    // reflexión
    React.createElement("div", { className: "card", style: { background: "var(--paper-2)", border: "none", marginBottom: 22 } },
      React.createElement("div", { className: "kicker", style: { marginBottom: 10 } }, "Preguntas de reflexión"),
      React.createElement("div", { className: "row wrap", style: { gap: 24 } },
        month.reflection.map((q, i) => React.createElement("div", { key: i, className: "display-i", style: { fontSize: 18, flex: "1 1 240px", color: "var(--ink-soft)" } }, "“" + q + "”")))),

    // toolbar
    React.createElement("div", { className: "row between wrap", style: { marginBottom: 16, gap: 12 } },
      React.createElement("div", { className: "seg" },
        [["checklist", "Checklist"], ["calendar", "Calendario"]].map(([v, l]) =>
          React.createElement("button", { key: v, className: view === v ? "on" : "", onClick: () => setView(v) }, l))),
      React.createElement("div", { className: "row wrap", style: { gap: 10 } },
        view === "checklist" && React.createElement(React.Fragment, null,
          React.createElement("select", { className: "input", style: { width: "auto", padding: "7px 10px", fontSize: 13 }, value: fp, onChange: e => setFp(e.target.value) },
            React.createElement("option", { value: "todas" }, "Toda prioridad"),
            ["alta", "media", "baja"].map(s => React.createElement("option", { key: s, value: s }, s[0].toUpperCase() + s.slice(1)))),
          React.createElement("select", { className: "input", style: { width: "auto", padding: "7px 10px", fontSize: 13 }, value: fs, onChange: e => setFs(e.target.value) },
            React.createElement("option", { value: "todos" }, "Todo estado"),
            ["pendiente", "en progreso", "completada"].map(s => React.createElement("option", { key: s, value: s }, STATUS_LABEL[s])))),
        React.createElement("button", { className: "btn sm", onClick: () => setNewTask(true) },
          React.createElement(Icon, { name: "plus", size: 15 }), "Añadir tarea"))),

    React.createElement("div", { className: "card" },
      view === "checklist"
        ? React.createElement(TaskList, { month, openTask, filterP: fp, filterS: fs })
        : React.createElement(MonthCalendar, { month })));
}

/* ————— Pantalla Plan ————— */
function PlanScreen({ openTask }) {
  const { state } = useStore();
  const [sel, setSel] = useState(null);
  const month = sel && state.MONTHS.find(m => m.id === sel);

  if (month) return React.createElement(MonthDetail, { month, back: () => setSel(null), openTask });

  const op = overallProgress(state.MONTHS);
  return React.createElement("div", { className: "page" },
    React.createElement(PageHead, { kicker: "Roadmap · 6 meses", title: "Plan por meses",
      intro: "Tu camino de septiembre a febrero. Cada mes es un paso concreto hacia tu primera colección y tu independencia." }),
    React.createElement("div", { className: "card", style: { marginBottom: 24, display: "flex", alignItems: "center", gap: 24 } },
      React.createElement(Ring, { pct: op.pct, size: 70, stroke: 6 }, React.createElement("div", { className: "display", style: { fontSize: 18 } }, op.pct + "%")),
      React.createElement("div", { style: { flex: 1 } },
        React.createElement("div", { className: "display", style: { fontSize: 20 } }, "Progreso general del proyecto"),
        React.createElement("p", { className: "muted", style: { fontSize: 13.5, marginTop: 2 } }, op.done + " de " + op.total + " tareas completadas en los seis meses")),
      React.createElement("div", { style: { width: 200 } }, React.createElement(Bar, { pct: op.pct, tall: true }))),
    React.createElement("div", { className: "grid g-3" },
      state.MONTHS.map(m => React.createElement(MonthCard, { key: m.id, m, current: m.id === state.currentMonthId, onClick: () => setSel(m.id) }))));
}

Object.assign(window, { TaskModal, PlanScreen });
