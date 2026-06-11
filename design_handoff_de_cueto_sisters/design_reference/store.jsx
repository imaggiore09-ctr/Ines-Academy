/* ATELIER — almacén de estado con persistencia en localStorage */
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

const STORE_KEY = "atelier_state_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // clon profundo de la semilla
  return JSON.parse(JSON.stringify(window.ATELIER_SEED));
}

const StoreCtx = createContext(null);
const useStore = () => useContext(StoreCtx);

function StoreProvider({ children }) {
  const [state, setState] = useState(loadState);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }, [state]);

  const flash = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  // ——— mutadores ———
  const api = {
    state, setState, flash,

    // tareas
    cycleStatus(monthId, taskId) {
      const order = ["pendiente", "en progreso", "completada"];
      setState(s => mutMonths(s, monthId, taskId, t => {
        const i = order.indexOf(t.status);
        return { ...t, status: order[(i + 1) % 3] };
      }));
    },
    toggleDone(monthId, taskId) {
      setState(s => mutMonths(s, monthId, taskId, t => ({
        ...t, status: t.status === "completada" ? "pendiente" : "completada"
      })));
      api.flash("Tarea actualizada");
    },
    setTask(monthId, taskId, patch) {
      setState(s => mutMonths(s, monthId, taskId, t => ({ ...t, ...patch })));
    },
    addTask(monthId, task) {
      setState(s => ({ ...s, MONTHS: s.MONTHS.map(m => m.id === monthId
        ? { ...m, tasks: [...m.tasks, { id: "t" + Date.now(), status: "pendiente",
            priority: "media", due: "", notes: "", resources: [], ...task }] }
        : m) }));
      api.flash("Tarea añadida");
    },
    deleteTask(monthId, taskId) {
      setState(s => ({ ...s, MONTHS: s.MONTHS.map(m => m.id === monthId
        ? { ...m, tasks: m.tasks.filter(t => t.id !== taskId) } : m) }));
    },

    // identidad
    setIdentity(patch) { setState(s => ({ ...s, IDENTITY: { ...s.IDENTITY, ...patch } })); },

    // obras
    addObra(o) {
      setState(s => ({ ...s, OBRAS: [{ id: "o" + Date.now(), estado: "en proceso",
        coleccion: "", historia: "", ...o }, ...s.OBRAS] }));
      api.flash("Obra registrada");
    },
    setObra(id, patch) { setState(s => ({ ...s, OBRAS: s.OBRAS.map(o => o.id === id ? { ...o, ...patch } : o) })); },
    deleteObra(id) { setState(s => ({ ...s, OBRAS: s.OBRAS.filter(o => o.id !== id) })); },

    // checklists genéricas (shop/legal)
    toggleCheck(section, id) {
      setState(s => ({ ...s, [section]: { ...s[section],
        checklist: s[section].checklist.map(c => c.id === id ? { ...c, done: !c.done } : c) } }));
    },

    // social
    setMetrics(patch) { setState(s => ({ ...s, SOCIAL: { ...s.SOCIAL, metrics: { ...s.SOCIAL.metrics, ...patch } } })); },

    // finanzas
    addMovimiento(kind, mov) {
      setState(s => ({ ...s, LEGAL: { ...s.LEGAL,
        [kind]: [{ id: kind[0] + Date.now(), ...mov }, ...s.LEGAL[kind]] } }));
      api.flash(kind === "ingresos" ? "Ingreso registrado" : "Gasto registrado");
    },

    // aprendizaje
    toggleModule(id) {
      setState(s => ({ ...s, LEARN: s.LEARN.map(m => m.id === id ? { ...m, done: !m.done } : m) }));
    },

    reset() {
      localStorage.removeItem(STORE_KEY);
      setState(JSON.parse(JSON.stringify(window.ATELIER_SEED)));
      api.flash("Progreso reiniciado");
    }
  };

  return React.createElement(StoreCtx.Provider, { value: api },
    children,
    toast && React.createElement("div", { className: "toast" },
      React.createElement("span", { className: "d" }), toast));
}

function mutMonths(s, monthId, taskId, fn) {
  return { ...s, MONTHS: s.MONTHS.map(m => m.id === monthId
    ? { ...m, tasks: m.tasks.map(t => t.id === taskId ? fn(t) : t) } : m) };
}

// ——— selectores / utilidades de progreso ———
function monthProgress(m) {
  const done = m.tasks.filter(t => t.status === "completada").length;
  return { done, total: m.tasks.length, pct: m.tasks.length ? Math.round(done / m.tasks.length * 100) : 0 };
}
function overallProgress(months) {
  const all = months.flatMap(m => m.tasks);
  const done = all.filter(t => t.status === "completada").length;
  return { done, total: all.length, pct: all.length ? Math.round(done / all.length * 100) : 0 };
}
function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}
function daysUntil(iso) {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  const now = new Date("2026-09-08T00:00:00"); // "hoy" del prototipo
  return Math.round((d - now) / 86400000);
}
function eur(n) { return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n || 0); }

Object.assign(window, {
  StoreProvider, useStore, monthProgress, overallProgress, fmtDate, daysUntil, eur
});
