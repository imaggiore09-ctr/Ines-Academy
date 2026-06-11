/* ATELIER — Dashboard (3 variaciones: editorial · compacto · galería) */

function brandStatus(state) {
  const mp = id => monthProgress(state.MONTHS.find(m => m.id === id)).pct;
  const chk = sec => {
    const l = state[sec].checklist; return l.length ? Math.round(l.filter(c => c.done).length / l.length * 100) : 0;
  };
  return [
    { k: "Identidad", v: mp("m1"), icon: "identity", route: "identidad" },
    { k: "Redes", v: mp("m3"), icon: "social", route: "redes" },
    { k: "Contenido", v: mp("m2"), icon: "obras", route: "obras" },
    { k: "Tienda", v: chk("SHOP"), icon: "shop", route: "tienda" },
    { k: "Legal", v: chk("LEGAL"), icon: "legal", route: "legal" },
    { k: "Ventas", v: Math.min(100, state.LEGAL.ingresos.length * 25), icon: "trending", route: "legal" }
  ];
}

function nextTasks(state, n = 5) {
  const out = [];
  state.MONTHS.forEach(m => m.tasks.forEach(t => {
    if (t.status !== "completada") out.push({ ...t, monthId: m.id, monthName: m.name, monthN: m.n });
  }));
  out.sort((a, b) => {
    const pr = { alta: 0, media: 1, baja: 2 };
    if ((a.due || "") !== (b.due || "")) return (a.due || "9999").localeCompare(b.due || "9999");
    return pr[a.priority] - pr[b.priority];
  });
  return out.slice(0, n);
}

function WelcomeHero({ user, big }) {
  const hour = 9;
  const saludo = hour < 14 ? "Buenos días" : hour < 21 ? "Buenas tardes" : "Buenas noches";
  return React.createElement("div", null,
    React.createElement("div", { className: "kicker kicker-red" }, "Domingo · 8 de septiembre"),
    React.createElement("h1", { className: "display", style: { fontSize: big ? 52 : 40, lineHeight: 1.02, marginTop: 10 } },
      saludo + ", ", React.createElement("span", { className: "display-i" }, user.name), "."),
    React.createElement("p", { className: "page-intro", style: { marginTop: 12 } },
      "Estás en el ", React.createElement("b", { style: { color: "var(--ink)" } }, "Mes 1: Identidad artística y marca"),
      ". Hoy es un buen día para decidir el nombre de tu marca."));
}

function StatusCard({ go }) {
  const { state } = useStore();
  const items = brandStatus(state);
  return React.createElement("div", { className: "card" },
    React.createElement("div", { className: "card-hd between" },
      React.createElement("div", null,
        React.createElement("div", { className: "kicker" }, "Estado de la marca"),
        React.createElement("h3", { className: "display", style: { fontSize: 19, marginTop: 4 } }, "Dónde estás hoy")),
      React.createElement(Icon, { name: "target", size: 18, style: { color: "var(--ink-faint)" } })),
    React.createElement("div", { className: "grid g-3", style: { gap: 14 } },
      items.map(it => React.createElement("button", { key: it.k, onClick: () => go(it.route),
        style: { textAlign: "left", border: "none", background: "none", padding: 0, cursor: "pointer" } },
        React.createElement("div", { className: "row between", style: { marginBottom: 7 } },
          React.createElement("span", { className: "mono", style: { fontSize: 11.5, letterSpacing: ".04em" } }, it.k),
          React.createElement("span", { className: "display", style: { fontSize: 15 } }, it.v + "%")),
        React.createElement(Bar, { pct: it.v }))))
  );
}

function NextTasksCard({ go, openTask }) {
  const { state, toggleDone } = useStore();
  const tasks = nextTasks(state, 5);
  return React.createElement("div", { className: "card" },
    React.createElement("div", { className: "card-hd between" },
      React.createElement("div", null,
        React.createElement("div", { className: "kicker" }, "Próximas tareas"),
        React.createElement("h3", { className: "display", style: { fontSize: 19, marginTop: 4 } }, "Lo siguiente")),
      React.createElement("button", { className: "btn ghost sm", onClick: () => go("plan") }, "Ver plan")),
    React.createElement("div", null,
      tasks.map(t => React.createElement("div", { className: "task is-" + (t.status === "completada" ? "done" : "x"), key: t.id },
        React.createElement(Check, { on: t.status === "completada", onClick: () => toggleDone(t.monthId, t.id) }),
        React.createElement("div", { className: "t-main", onClick: () => openTask(t.monthId, t.id), style: { cursor: "pointer" } },
          React.createElement("div", { className: "t-title" }, t.title),
          React.createElement("div", { className: "t-meta" },
            React.createElement(Priority, { p: t.priority }),
            t.due && React.createElement("span", { className: "mi" }, React.createElement(Icon, { name: "clock", size: 12 }), fmtDate(t.due)),
            React.createElement("span", { className: "mi" }, "Mes " + t.monthN))))))
  );
}

function DecisionsCard() {
  const { state } = useStore();
  return React.createElement("div", { className: "card", style: { background: "var(--ink)", color: "#fff", borderColor: "var(--ink)" } },
    React.createElement("div", { className: "card-hd between" },
      React.createElement("div", null,
        React.createElement("div", { className: "kicker", style: { color: "rgba(255,255,255,.5)" } }, "Decisiones pendientes"),
        React.createElement("h3", { className: "display", style: { fontSize: 19, marginTop: 4, color: "#fff" } }, "Por decidir")),
      React.createElement(Icon, { name: "sparkle", size: 18, style: { color: "var(--red)" } })),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } },
      state.DECISIONS.map((d, i) => React.createElement("div", { key: i, style: {
        padding: "13px 0", borderBottom: i < state.DECISIONS.length - 1 ? "1px solid rgba(255,255,255,.12)" : "none" } },
        React.createElement("div", { className: "row between" },
          React.createElement("span", { style: { fontSize: 14.5 } }, d.t),
          React.createElement("span", { className: "mono", style: { fontSize: 10.5, color: "rgba(255,255,255,.45)" } }, d.month)),
        React.createElement("p", { style: { color: "rgba(255,255,255,.6)", fontSize: 12.5, marginTop: 3 } }, d.detail))))
  );
}

function RemindersCard() {
  const { state } = useStore();
  return React.createElement("div", { className: "card" },
    React.createElement("div", { className: "kicker", style: { marginBottom: 14 } }, "Recordatorios"),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
      state.REMINDERS.map((r, i) => React.createElement("div", { key: i, className: "row", style: { gap: 12 } },
        React.createElement("div", { style: { width: 34, height: 34, borderRadius: 8, background: "var(--paper-2)", display: "grid", placeItems: "center", flex: "none", color: "var(--ink-soft)" } },
          React.createElement(Icon, { name: r.icon, size: 16 })),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontSize: 13.5, lineHeight: 1.3 } }, r.t),
          React.createElement("div", { className: "mono", style: { fontSize: 10.5, color: "var(--red-deep)", marginTop: 2 } }, r.due)))))
  );
}

function MonthFocusCard({ go }) {
  const { state } = useStore();
  const m = state.MONTHS.find(x => x.id === state.currentMonthId);
  const p = monthProgress(m);
  return React.createElement("button", { className: "card", onClick: () => go("plan"),
    style: { cursor: "pointer", textAlign: "left", display: "flex", gap: 22, alignItems: "center", width: "100%" } },
    React.createElement(Ring, { pct: p.pct, size: 78, stroke: 6 },
      React.createElement("div", { className: "display", style: { fontSize: 20 } }, p.pct + "%")),
    React.createElement("div", { style: { flex: 1 } },
      React.createElement("div", { className: "kicker kicker-red" }, "Mes 1 · " + m.window),
      React.createElement("h3", { className: "display", style: { fontSize: 22, margin: "5px 0 6px" } }, m.name),
      React.createElement("p", { className: "muted", style: { fontSize: 13.5 } }, m.objective)),
    React.createElement(Icon, { name: "arrow", size: 18, style: { color: "var(--ink-faint)" } }));
}

function MiniStat({ num, label, sub }) {
  return React.createElement("div", { className: "card", style: { padding: "18px 20px" } },
    React.createElement("div", { className: "stat-num sm" }, num),
    React.createElement("div", { className: "mono", style: { fontSize: 10.5, letterSpacing: ".05em", color: "var(--ink-mute)", marginTop: 6, textTransform: "uppercase" } }, label),
    sub && React.createElement("div", { style: { fontSize: 12, color: "var(--ink-faint)", marginTop: 2 } }, sub));
}

function Dashboard({ user, go, openTask, look }) {
  const { state } = useStore();
  const op = overallProgress(state.MONTHS);
  const totalObras = state.OBRAS.length;
  const ingresos = state.LEGAL.ingresos.reduce((a, b) => a + b.monto, 0);

  // ——— vista compacta ———
  if (look === "compacto") {
    return React.createElement("div", { className: "page" },
      React.createElement("div", { style: { marginBottom: 26 } }, React.createElement(WelcomeHero, { user })),
      React.createElement("div", { className: "grid g-4", style: { marginBottom: 18 } },
        React.createElement(MiniStat, { num: op.pct + "%", label: "Progreso total", sub: op.done + " de " + op.total + " tareas" }),
        React.createElement(MiniStat, { num: "1 / 6", label: "Mes actual", sub: "Identidad" }),
        React.createElement(MiniStat, { num: totalObras, label: "Obras", sub: "registradas" }),
        React.createElement(MiniStat, { num: eur(ingresos), label: "Ingresos", sub: "acumulados" })),
      React.createElement("div", { className: "grid", style: { gridTemplateColumns: "1.4fr 1fr", marginBottom: 18 } },
        React.createElement(StatusCard, { go }),
        React.createElement(RemindersCard, null)),
      React.createElement("div", { className: "grid g-2" },
        React.createElement(NextTasksCard, { go, openTask }),
        React.createElement(DecisionsCard, null)));
  }

  // ——— vista galería ———
  if (look === "galeria") {
    return React.createElement("div", { className: "page" },
      React.createElement("div", { style: { marginBottom: 22 } }, React.createElement(WelcomeHero, { user, big: true })),
      React.createElement("div", { className: "grid", style: { gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 } },
        ["Moodboard","Obra reciente","Proceso","Paleta"].map((l, i) =>
          React.createElement(ImgPh, { key: i, label: l, style: { aspectRatio: i === 0 ? "1" : "1", height: "auto" } }))),
      React.createElement("div", { className: "grid", style: { gridTemplateColumns: "1.5fr 1fr", marginBottom: 18 } },
        React.createElement(MonthFocusCard, { go }),
        React.createElement(MiniStat, { num: op.pct + "%", label: "Progreso total", sub: op.done + "/" + op.total + " tareas" })),
      React.createElement("div", { className: "grid g-2", style: { marginBottom: 18 } },
        React.createElement(StatusCard, { go }),
        React.createElement(NextTasksCard, { go, openTask })),
      React.createElement("div", { className: "grid g-2" },
        React.createElement(DecisionsCard, null),
        React.createElement(RemindersCard, null)));
  }

  // ——— vista editorial (por defecto) ———
  return React.createElement("div", { className: "page" },
    React.createElement("div", { style: { marginBottom: 30 } }, React.createElement(WelcomeHero, { user, big: true })),
    React.createElement("div", { style: { marginBottom: 18 } }, React.createElement(MonthFocusCard, { go })),
    React.createElement("div", { className: "grid", style: { gridTemplateColumns: "1.5fr 1fr", marginBottom: 18 } },
      React.createElement(StatusCard, { go }),
      React.createElement(RemindersCard, null)),
    React.createElement("div", { className: "grid g-2" },
      React.createElement(NextTasksCard, { go, openTask }),
      React.createElement(DecisionsCard, null)));
}

Object.assign(window, { Dashboard });
