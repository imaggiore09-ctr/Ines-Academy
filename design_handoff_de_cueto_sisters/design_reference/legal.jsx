/* ATELIER — Legal y finanzas */

function MovModal({ kind, onClose }) {
  const { addMovimiento } = useStore();
  const [f, setF] = useState({ fecha: "", concepto: "", cat: kind === "ingresos" ? "Venta obra" : "Material", monto: "" });
  const cats = kind === "ingresos" ? ["Venta obra", "Encargo", "Print", "Otro"] : ["Material", "Servicios", "Cuota autónoma", "Marketing", "Otro"];
  const save = () => { if (!f.concepto.trim()) return; addMovimiento(kind, { ...f, monto: parseInt(f.monto) || 0 }); onClose(); };
  return React.createElement(Modal, { kicker: kind === "ingresos" ? "Nuevo ingreso" : "Nuevo gasto", title: kind === "ingresos" ? "Registrar ingreso" : "Registrar gasto", onClose,
    footer: React.createElement(React.Fragment, null,
      React.createElement("button", { className: "btn ghost sm", onClick: onClose }, "Cancelar"),
      React.createElement("button", { className: "btn red sm", onClick: save }, "Registrar")) },
    React.createElement(Field, { label: "Concepto", value: f.concepto, onChange: v => setF({ ...f, concepto: v }) }),
    React.createElement("div", { className: "row", style: { gap: 12 } },
      React.createElement("label", { className: "field", style: { flex: 1 } }, React.createElement("span", null, "Fecha"),
        React.createElement("input", { type: "date", className: "input", value: f.fecha, onChange: e => setF({ ...f, fecha: e.target.value }) })),
      React.createElement("label", { className: "field", style: { flex: 1 } }, React.createElement("span", null, "Importe (€)"),
        React.createElement("input", { type: "number", className: "input", value: f.monto, onChange: e => setF({ ...f, monto: e.target.value }) })),
      React.createElement("label", { className: "field", style: { flex: 1 } }, React.createElement("span", null, "Categoría"),
        React.createElement("select", { className: "input", value: f.cat, onChange: e => setF({ ...f, cat: e.target.value }) },
          cats.map(c => React.createElement("option", { key: c, value: c }, c))))));
}

function LegalScreen() {
  const { state, toggleCheck } = useStore();
  const L = state.LEGAL;
  const EDU = window.ATELIER_EDU || {};
  const [mov, setMov] = useState(null);
  const totalIn = L.ingresos.reduce((a, b) => a + b.monto, 0);
  const totalOut = L.gastos.reduce((a, b) => a + b.monto, 0);
  const groups = [...new Set(L.checklist.map(c => c.group))];

  const checkRow = (c) => React.createElement("div", { key: c.id, className: "task-row" + (c.done ? " is-done" : "") },
    React.createElement("div", { className: "task-ico" }, React.createElement(Icon, { name: (EDU.LEGAL_ICON && EDU.LEGAL_ICON[c.id]) || "check", size: 18 })),
    React.createElement(Check, { on: c.done, onClick: () => toggleCheck("LEGAL", c.id) }),
    React.createElement("div", { className: "task-body", style: { cursor: "default" } },
      React.createElement("div", { className: "t-title", style: { fontSize: 14.5 } }, c.t),
      EDU.LEGAL_SUB && EDU.LEGAL_SUB[c.id] && React.createElement("div", { className: "t-sub" }, EDU.LEGAL_SUB[c.id])));

  return React.createElement("div", { className: "page" },
    mov && React.createElement(MovModal, { kind: mov, onClose: () => setMov(null) }),
    React.createElement(PageHead, { kicker: "El negocio", title: "Legal y finanzas",
      intro: "Organiza trámites y lleva las cuentas. Esto NO es asesoramiento legal: es tu cuaderno para llegar preparada a la asesoría." }),

    // aviso
    React.createElement("div", { className: "card", style: { background: "var(--gold-wash)", borderColor: "var(--gold-line)", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start", padding: "13px 17px" } },
      React.createElement(Icon, { name: "info", size: 17, style: { color: "var(--gold-deep)", marginTop: 1, flex: "none" } }),
      React.createElement("p", { style: { fontSize: 13, color: "var(--ink-soft)" } }, "Aquí solo organizamos información y recordatorios. Para decisiones fiscales y legales, consulta siempre con tu asesoría.")),

    React.createElement("div", { className: "grid", style: { gridTemplateColumns: "1.35fr 1fr", alignItems: "start", gap: 26, marginBottom: 26 } },
      // —— Izquierda: trámites + preguntas ——
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 8 } }, "Impuestos y obligaciones"),
          groups.map(g => React.createElement("div", { key: g, style: { marginTop: 10 } },
            React.createElement("div", { className: "mono", style: { fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "8px 0 2px 4px" } }, g),
            L.checklist.filter(c => c.group === g).map(checkRow)))),
        React.createElement("div", { className: "card", style: { background: "var(--paper-2)", border: "none" } },
          React.createElement("div", { className: "kicker", style: { marginBottom: 12 } }, "Preguntas para la asesoría"),
          React.createElement("ul", { style: { margin: 0, paddingLeft: 18, color: "var(--ink-soft)", fontSize: 13.5, lineHeight: 1.85 } },
            (EDU.LEGAL_PREGUNTAS || L.preguntas).map((q, i) => React.createElement("li", { key: i }, q))))),

      // —— Derecha: fechas + documentos ——
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 12 } }, "Fechas importantes"),
          (EDU.LEGAL_FECHAS || []).map((f, i) => React.createElement("div", { key: i, className: "tl-row" },
            React.createElement("span", { className: "tl-date" }, f.date),
            React.createElement("span", { style: { fontSize: 13, lineHeight: 1.4 } }, f.t))),
          React.createElement("button", { className: "btn ghost sm block", style: { marginTop: 14 } },
            React.createElement(Icon, { name: "calendar", size: 14 }), "Ver calendario fiscal")),
        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 12 } }, "Documentos guardados"),
          (EDU.LEGAL_DOCS || []).map((d, i) => React.createElement("div", { key: i, className: "doc-chip" },
            React.createElement(Icon, { name: "doc", size: 17, className: "dc-ico" }),
            React.createElement("div", { style: { flex: 1, minWidth: 0 } },
              React.createElement("div", { style: { fontSize: 13.5 } }, d.name),
              React.createElement("div", { className: "mono", style: { fontSize: 10, color: "var(--ink-faint)", marginTop: 1 } }, d.k)),
            React.createElement(Icon, { name: "arrow", size: 14, style: { color: "var(--ink-faint)" } }))),
          React.createElement("button", { className: "btn ghost sm block", style: { marginTop: 6 } }, "Ver todos los documentos"))) ),

    // —— Finanzas ——
    React.createElement("div", { className: "kicker", style: { marginBottom: 12 } }, "Tus cuentas"),
    React.createElement("div", { className: "grid g-3", style: { marginBottom: 22 } },
      React.createElement("div", { className: "card" }, React.createElement("div", { className: "kicker", style: { marginBottom: 8 } }, "Ingresos"), React.createElement("div", { className: "stat-num", style: { color: "var(--done)" } }, eur(totalIn))),
      React.createElement("div", { className: "card" }, React.createElement("div", { className: "kicker", style: { marginBottom: 8 } }, "Gastos"), React.createElement("div", { className: "stat-num", style: { color: "var(--red)" } }, eur(totalOut))),
      React.createElement("div", { className: "card", style: { background: "var(--ink)", borderColor: "var(--ink)" } }, React.createElement("div", { className: "kicker", style: { marginBottom: 8, color: "rgba(255,255,255,.5)" } }, "Balance"), React.createElement("div", { className: "stat-num", style: { color: "#fff" } }, eur(totalIn - totalOut)))),

    React.createElement("div", { className: "card flush" },
      React.createElement("div", { className: "row between", style: { padding: "18px 22px 14px" } },
        React.createElement("div", null,
          React.createElement("div", { className: "kicker" }, "Registro de movimientos"),
          React.createElement("h3", { className: "display", style: { fontSize: 19, marginTop: 4 } }, "Ingresos y gastos")),
        React.createElement("div", { className: "row", style: { gap: 8 } },
          React.createElement("button", { className: "btn ghost sm", onClick: () => setMov("ingresos") }, React.createElement(Icon, { name: "plus", size: 14 }), "Ingreso"),
          React.createElement("button", { className: "btn sm", onClick: () => setMov("gastos") }, React.createElement(Icon, { name: "plus", size: 14 }), "Gasto"))),
      React.createElement("div", { style: { padding: "0 8px 8px" } },
        React.createElement("table", { className: "tbl" },
          React.createElement("thead", null, React.createElement("tr", null, ["Fecha", "Concepto", "Categoría", "Importe"].map(h => React.createElement("th", { key: h }, h)))),
          React.createElement("tbody", null,
            [...L.ingresos.map(m => ({ ...m, in: true })), ...L.gastos.map(m => ({ ...m, in: false }))]
              .sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""))
              .map(m => React.createElement("tr", { key: m.id },
                React.createElement("td", { className: "mono", style: { fontSize: 12, color: "var(--ink-mute)" } }, fmtDate(m.fecha)),
                React.createElement("td", null, m.concepto),
                React.createElement("td", null, React.createElement("span", { className: "tag" }, m.cat)),
                React.createElement("td", null, React.createElement("span", { className: "display", style: { fontSize: 15, color: m.in ? "var(--done)" : "var(--red)" } }, (m.in ? "+" : "−") + eur(m.monto).replace("-", "")))))))))
  );
}

Object.assign(window, { LegalScreen });
