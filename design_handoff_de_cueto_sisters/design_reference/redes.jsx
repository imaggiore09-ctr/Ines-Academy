/* ATELIER — Redes sociales */

function MetricTile({ label, value, goal, onChange, icon }) {
  const [edit, setEdit] = useState(false);
  return React.createElement("div", { className: "card", style: { padding: "18px 20px" } },
    React.createElement("div", { className: "row between", style: { marginBottom: 10 } },
      React.createElement("span", { className: "mono", style: { fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-mute)" } }, label),
      React.createElement(Icon, { name: icon, size: 15, style: { color: "var(--ink-faint)" } })),
    edit
      ? React.createElement("input", { className: "input", type: "number", autoFocus: true, value: value,
          onChange: e => onChange(parseInt(e.target.value) || 0), onBlur: () => setEdit(false),
          onKeyDown: e => { if (e.key === "Enter") setEdit(false); }, style: { fontFamily: "var(--display)", fontSize: 26, padding: "2px 6px" } })
      : React.createElement("div", { className: "stat-num", onClick: () => setEdit(true), style: { cursor: "pointer" } },
          value >= 1000 ? (value / 1000).toFixed(1) + "k" : value),
    goal && React.createElement("div", { style: { marginTop: 12 } },
      React.createElement(Bar, { pct: Math.min(100, value / goal * 100) }),
      React.createElement("div", { className: "mono", style: { fontSize: 10, color: "var(--ink-faint)", marginTop: 6 } }, "Meta: " + goal.toLocaleString("es-ES"))));
}

function IdeaColumn({ title, items, icon }) {
  return React.createElement("div", { className: "card" },
    React.createElement("div", { className: "card-hd", style: { marginBottom: 14 } },
      React.createElement("div", { style: { width: 32, height: 32, borderRadius: 8, background: "var(--paper-2)", display: "grid", placeItems: "center", color: "var(--ink-soft)" } },
        React.createElement(Icon, { name: icon, size: 16 })),
      React.createElement("h3", { className: "display", style: { fontSize: 17 } }, title)),
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } },
      items.map((it, i) => React.createElement("div", { key: i, className: "row", style: { gap: 10, alignItems: "flex-start" } },
        React.createElement("span", { className: "mono", style: { fontSize: 11, color: "var(--red)", marginTop: 2 } }, String(i + 1).padStart(2, "0")),
        React.createElement("span", { style: { fontSize: 13.5, lineHeight: 1.45 } }, it)))));
}

function RedesScreen() {
  const { state, setMetrics } = useStore();
  const s = state.SOCIAL;
  const m = s.metrics;
  const typeColor = { Post: "var(--ink)", Reel: "var(--red)", Story: "var(--ink-faint)", Carrusel: "var(--ink-soft)" };

  return React.createElement("div", { className: "page" },
    React.createElement(PageHead, { kicker: "La marca", title: "Redes sociales",
      intro: "Planifica el contenido, guarda ideas y sigue el pulso de la cuenta sin que te coma el tiempo." }),

    // métricas
    React.createElement("div", { className: "kicker", style: { marginBottom: 12 } }, "Métricas básicas"),
    React.createElement("div", { className: "grid g-4", style: { marginBottom: 28 } },
      React.createElement(MetricTile, { label: "Seguidores", value: m.seguidores, goal: m.seguidoresGoal, icon: "user", onChange: v => setMetrics({ seguidores: v }) }),
      React.createElement(MetricTile, { label: "Alcance", value: m.alcance, icon: "eye", onChange: v => setMetrics({ alcance: v }) }),
      React.createElement(MetricTile, { label: "Interacciones", value: m.interacciones, icon: "heart", onChange: v => setMetrics({ interacciones: v }) }),
      React.createElement(MetricTile, { label: "Mensajes", value: m.mensajes, icon: "mail", onChange: v => setMetrics({ mensajes: v }) })),

    React.createElement("div", { className: "grid", style: { gridTemplateColumns: "1.3fr 1fr", alignItems: "start", gap: 26, marginBottom: 28 } },
      // calendario de contenidos
      React.createElement("div", { className: "card" },
        React.createElement("div", { className: "card-hd between" },
          React.createElement("div", null,
            React.createElement("div", { className: "kicker" }, "Calendario de contenidos"),
            React.createElement("h3", { className: "display", style: { fontSize: 19, marginTop: 4 } }, "Próximas publicaciones")),
          React.createElement(Icon, { name: "calendar", size: 18, style: { color: "var(--ink-faint)" } })),
        React.createElement("div", null,
          s.calendar.map((c, i) => React.createElement("div", { key: i, className: "row", style: { gap: 14, padding: "12px 0", borderBottom: i < s.calendar.length - 1 ? "1px solid var(--line)" : "none" } },
            React.createElement("div", { style: { textAlign: "center", width: 44, flex: "none" } },
              React.createElement("div", { className: "display", style: { fontSize: 20, lineHeight: 1 } }, fmtDate(c.day).split(" ")[0]),
              React.createElement("div", { className: "mono", style: { fontSize: 9, textTransform: "uppercase", color: "var(--ink-faint)" } }, fmtDate(c.day).split(" ")[1])),
            React.createElement("div", { style: { width: 3, height: 30, borderRadius: 2, background: typeColor[c.type] } }),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 14 } }, c.title),
              React.createElement("div", { className: "mono", style: { fontSize: 10.5, color: "var(--ink-mute)", marginTop: 1 } }, c.type)),
            React.createElement("span", { className: "pill todo" }, "Programado")))),
        React.createElement("button", { className: "btn ghost sm", style: { marginTop: 16 } }, React.createElement(Icon, { name: "plus", size: 14 }), "Programar publicación")),

      // checklist antes de publicar
      React.createElement("div", { className: "card", style: { background: "var(--ink)", color: "#fff", borderColor: "var(--ink)" } },
        React.createElement("div", { className: "kicker", style: { color: "rgba(255,255,255,.5)", marginBottom: 14 } }, "Antes de publicar"),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } },
          s.checklist.map((c, i) => React.createElement("div", { key: i, className: "row", style: { gap: 11 } },
            React.createElement("div", { style: { width: 18, height: 18, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,.3)", flex: "none", marginTop: 1 } }),
            React.createElement("span", { style: { fontSize: 13.5, color: "rgba(255,255,255,.85)" } }, c))))) ),

    // bancos de ideas
    React.createElement("div", { className: "kicker", style: { marginBottom: 12 } }, "Banco de ideas"),
    React.createElement("div", { className: "grid g-3", style: { marginBottom: 18 } },
      React.createElement(IdeaColumn, { title: "Ideas para reels", items: s.reels, icon: "social" }),
      React.createElement(IdeaColumn, { title: "Ideas para stories", items: s.stories, icon: "sparkle" }),
      React.createElement(IdeaColumn, { title: "Ideas para carruseles", items: s.carruseles, icon: "grid" })),
    React.createElement("div", { className: "grid g-2" },
      React.createElement(IdeaColumn, { title: "Banco de frases", items: s.frases, icon: "edit" }),
      React.createElement(IdeaColumn, { title: "Guiones para vídeos", items: s.guiones, icon: "doc" })));
}

Object.assign(window, { RedesScreen });
