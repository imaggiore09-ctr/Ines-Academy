/* ATELIER — Aprendizaje */

function LessonModal({ mod, onClose }) {
  const { toggleModule } = useStore();
  return React.createElement(Modal, { kicker: mod.cat + " · " + mod.min + " min", title: mod.t, onClose, wide: true,
    footer: React.createElement(React.Fragment, null,
      React.createElement("button", { className: "btn ghost sm", onClick: onClose }, "Cerrar"),
      React.createElement("button", { className: "btn red sm", onClick: () => { toggleModule(mod.id); onClose(); } },
        React.createElement(Icon, { name: "check", size: 15 }), mod.done ? "Marcar sin completar" : "Marcar completado")) },
    React.createElement(ImgPh, { label: "Portada del módulo", style: { aspectRatio: "16/7", marginBottom: 18 } }),
    React.createElement("p", { className: "muted", style: { marginBottom: 18 } }, "Una guía práctica en " + mod.mods + " lecciones para que avances a tu ritmo. Cada lección incluye un ejercicio aplicado a tu propio proyecto."),
    React.createElement("div", { className: "kicker", style: { marginBottom: 12 } }, "Lecciones"),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } },
      Array.from({ length: mod.mods }).map((_, i) => React.createElement("div", { key: i, className: "row", style: { gap: 12, padding: "11px 0", borderBottom: i < mod.mods - 1 ? "1px solid var(--line)" : "none" } },
        React.createElement("span", { className: "display", style: { fontSize: 16, color: "var(--red)", width: 26 } }, String(i + 1).padStart(2, "0")),
        React.createElement("span", { style: { flex: 1, fontSize: 14 } }, "Lección " + (i + 1)),
        React.createElement(Icon, { name: "arrow", size: 15, style: { color: "var(--ink-faint)" } })))));
}

function AprendizajeScreen() {
  const { state } = useStore();
  const [open, setOpen] = useState(null);
  const mods = state.LEARN;
  const done = mods.filter(m => m.done).length;
  const featured = mods.find(m => !m.done) || mods[0];

  return React.createElement("div", { className: "page" },
    open && React.createElement(LessonModal, { mod: open, onClose: () => setOpen(null) }),
    React.createElement(PageHead, { kicker: "Formación", title: "Aprendizaje",
      intro: "Mini cursos para cada paso del camino. Aprende justo lo que necesitas, cuando lo necesitas." }),

    // destacado
    React.createElement("div", { className: "card flush", style: { marginBottom: 26, display: "grid", gridTemplateColumns: "1.1fr 1fr", overflow: "hidden" } },
      React.createElement("div", { style: { background: "var(--ink)", color: "#fff", padding: "34px 34px", position: "relative", overflow: "hidden" } },
        React.createElement(Spots, { specs: [{ w: 70, h: 62, t: "-8%", r: "10%", r0: 16, c: "#262420" }, { w: 44, h: 48, b: "8%", l: "8%", r0: -10, c: "#26241c" }] }),
        React.createElement("div", { style: { position: "relative" } },
          React.createElement("div", { className: "kicker", style: { color: "rgba(255,255,255,.5)" } }, "Empieza por aquí · " + featured.cat),
          React.createElement("h2", { className: "display", style: { fontSize: 32, lineHeight: 1.05, margin: "12px 0 14px", color: "#fff" } }, featured.t),
          React.createElement("p", { style: { color: "rgba(255,255,255,.65)", fontSize: 14, maxWidth: "34ch" } }, featured.mods + " lecciones · " + featured.min + " min · aplicado a tu proyecto"),
          React.createElement("button", { className: "btn red", style: { marginTop: 22 }, onClick: () => setOpen(featured) },
            React.createElement(Icon, { name: "arrow", size: 16 }), "Empezar módulo"))),
      React.createElement(ImgPh, { label: "Portada destacada", style: { borderRadius: 0, border: "none", minHeight: 260 } })),

    // progreso general
    React.createElement("div", { className: "row between", style: { marginBottom: 16 } },
      React.createElement("div", { className: "kicker" }, "Todos los módulos"),
      React.createElement("div", { className: "row", style: { gap: 12, width: 240 } },
        React.createElement(Bar, { pct: Math.round(done / mods.length * 100) }),
        React.createElement("span", { className: "mono", style: { fontSize: 11, color: "var(--ink-mute)", whiteSpace: "nowrap" } }, done + "/" + mods.length))),

    React.createElement("div", { className: "grid g-3" },
      mods.map(m => React.createElement("button", { key: m.id, className: "mod", onClick: () => setOpen(m) },
        React.createElement("div", { style: { position: "relative" } },
          React.createElement(ImgPh, { label: m.cat, className: "mod-cover", style: { borderRadius: 0, border: "none", borderBottom: "1px solid var(--line)" } }),
          m.done && React.createElement("div", { style: { position: "absolute", top: 12, right: 12, background: "var(--done)", color: "#fff", borderRadius: 999, width: 26, height: 26, display: "grid", placeItems: "center" } },
            React.createElement(Icon, { name: "check", size: 15 }))),
        React.createElement("div", { className: "mod-body" },
          React.createElement("div", { className: "row between", style: { marginBottom: 8 } },
            React.createElement("span", { className: "tag" }, m.cat),
            React.createElement("span", { className: "mono", style: { fontSize: 10.5, color: "var(--ink-faint)" } }, m.min + " min")),
          React.createElement("div", { className: "display", style: { fontSize: 18, lineHeight: 1.12 } }, m.t),
          React.createElement("div", { className: "row", style: { gap: 6, marginTop: 12 } },
            React.createElement(Icon, { name: "learn", size: 13, style: { color: "var(--ink-faint)" } }),
            React.createElement("span", { className: "mono", style: { fontSize: 11, color: "var(--ink-mute)" } }, m.mods + " lecciones")))))));
}

Object.assign(window, { AprendizajeScreen });
