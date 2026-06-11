/* ATELIER — Conocimientos fiscales (mini academia) */

const FISCAL_KEY = "atelier_fiscal_v1";
function loadFiscal() { try { return JSON.parse(localStorage.getItem(FISCAL_KEY)) || {}; } catch (e) { return {}; } }

function FiscalModal({ mod, checks, setChecks, onClose }) {
  const arr = checks[mod.id] || [];
  const toggle = (i) => {
    const next = { ...checks, [mod.id]: mod.checklist.map((_, j) => j === i ? !arr[j] : !!arr[j]) };
    setChecks(next);
  };
  const Section = (label, icon, body) => React.createElement("div", { style: { marginBottom: 22 } },
    React.createElement("div", { className: "row", style: { gap: 9, marginBottom: 10 } },
      React.createElement(Icon, { name: icon, size: 16, style: { color: "var(--red)" } }),
      React.createElement("div", { className: "kicker" }, label)),
    body);

  return React.createElement(Modal, { kicker: "Módulo · " + mod.min + " min de lectura", title: mod.t, onClose, wide: true,
    footer: React.createElement("button", { className: "btn red sm", onClick: onClose }, "Hecho") },

    Section("En sencillo", "book",
      React.createElement("p", { style: { fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)" } }, mod.intro)),

    Section("Ejemplo real", "sparkle",
      React.createElement("div", { style: { background: "var(--paper-2)", borderLeft: "3px solid var(--red)", borderRadius: "0 var(--r-md) var(--r-md) 0", padding: "13px 16px" } },
        React.createElement("p", { className: "display-i", style: { fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.55 } }, mod.ejemplo))),

    Section("Errores frecuentes", "info",
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } },
        mod.errores.map((e, i) => React.createElement("div", { key: i, className: "row", style: { gap: 10, alignItems: "flex-start" } },
          React.createElement("span", { style: { color: "var(--red)", fontFamily: "var(--mono)", fontSize: 13, marginTop: 1 } }, "✕"),
          React.createElement("span", { style: { fontSize: 13.5, lineHeight: 1.45 } }, e))))),

    Section("Checklist de comprensión", "check",
      React.createElement("div", null,
        mod.checklist.map((c, i) => React.createElement("div", { key: i, className: "task" + (arr[i] ? " is-done" : ""), style: { padding: "10px 2px" } },
          React.createElement(Check, { on: !!arr[i], onClick: () => toggle(i) }),
          React.createElement("div", { className: "t-main", style: { alignSelf: "center" } },
            React.createElement("div", { className: "t-title", style: { fontSize: 14 } }, c)))))),

    Section("Recursos útiles", "doc",
      React.createElement("div", { className: "row wrap", style: { gap: 8 } },
        mod.recursos.map((r, i) => React.createElement("span", { key: i, className: "tag" }, React.createElement(Icon, { name: "arrow", size: 12 }), r))))
  );
}

function FiscalScreen() {
  const mods = (window.ATELIER_EDU && window.ATELIER_EDU.FISCAL_MODULES) || [];
  const [checks, setChecksRaw] = useState(loadFiscal);
  const [open, setOpen] = useState(null);
  const setChecks = (next) => { setChecksRaw(next); try { localStorage.setItem(FISCAL_KEY, JSON.stringify(next)); } catch (e) {} };

  const modProgress = (m) => {
    const a = checks[m.id] || [];
    const d = m.checklist.filter((_, i) => a[i]).length;
    return Math.round(d / m.checklist.length * 100);
  };
  const completed = mods.filter(m => modProgress(m) === 100).length;

  return React.createElement("div", { className: "page" },
    open && React.createElement(FiscalModal, { mod: open, checks, setChecks, onClose: () => setOpen(null) }),
    React.createElement(PageHead, { kicker: "Academia privada", title: "Conocimientos fiscales",
      intro: "Los fundamentos de tener un negocio creativo en España, explicados sin jerga. Aprende a tu ritmo lo justo para entender a tu asesoría y tomar buenas decisiones." }),

    // hero
    React.createElement("div", { className: "card flush", style: { marginBottom: 28, display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", background: "var(--ink)", borderColor: "var(--ink)" } },
      React.createElement("div", { style: { padding: "26px 30px", position: "relative", overflow: "hidden" } },
        React.createElement(Spots, { specs: [{ w: 60, h: 54, t: "-12%", r: "6%", r0: 16, c: "#262420" }, { w: 38, h: 42, b: "6%", l: "4%", r0: -8, c: "#26241c" }] }),
        React.createElement("div", { style: { position: "relative" } },
          React.createElement("div", { className: "kicker", style: { color: "rgba(255,255,255,.5)" } }, "De artista a empresaria"),
          React.createElement("h2", { className: "display", style: { fontSize: 26, lineHeight: 1.15, margin: "10px 0 8px", color: "#fff", maxWidth: "30ch" } }, "Entender tu negocio te hace libre. Empieza por lo esencial."),
          React.createElement("p", { style: { color: "rgba(255,255,255,.6)", fontSize: 13.5, maxWidth: "44ch" } }, "10 módulos breves. No es asesoramiento legal: es la base para hablar con seguridad con tu asesoría."))),
      React.createElement("div", { style: { padding: "26px 30px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,.12)" } },
        React.createElement(Ring, { pct: Math.round(completed / mods.length * 100), size: 80, stroke: 6, track: "rgba(255,255,255,.15)" },
          React.createElement("div", { className: "display", style: { fontSize: 20, color: "#fff" } }, completed + "/" + mods.length)),
        React.createElement("div", { className: "mono", style: { fontSize: 10, color: "rgba(255,255,255,.5)", marginTop: 12, textTransform: "uppercase", letterSpacing: ".06em" } }, "Módulos al día"))),

    React.createElement("div", { className: "grid g-3" },
      mods.map((m, i) => {
        const p = modProgress(m);
        return React.createElement("button", { key: m.id, className: "mod", onClick: () => setOpen(m), style: { cursor: "pointer" } },
          React.createElement("div", { className: "mod-body", style: { display: "flex", flexDirection: "column", gap: 0, height: "100%" } },
            React.createElement("div", { className: "row between", style: { marginBottom: 14 } },
              React.createElement("div", { style: { width: 38, height: 38, borderRadius: 9, background: "var(--paper-2)", display: "grid", placeItems: "center", color: "var(--ink-soft)" } },
                React.createElement(Icon, { name: m.icon, size: 18 })),
              p === 100
                ? React.createElement("div", { style: { background: "var(--done)", color: "#fff", borderRadius: 999, width: 24, height: 24, display: "grid", placeItems: "center" } }, React.createElement(Icon, { name: "check", size: 14 }))
                : React.createElement("span", { className: "display", style: { fontSize: 22, color: "var(--line-strong)" } }, String(i + 1).padStart(2, "0"))),
            React.createElement("div", { className: "display", style: { fontSize: 18, lineHeight: 1.12, marginBottom: 8 } }, m.t),
            React.createElement("p", { className: "muted", style: { fontSize: 12.5, lineHeight: 1.5, marginBottom: 16, flex: 1 } }, m.intro.length > 96 ? m.intro.slice(0, 94) + "…" : m.intro),
            React.createElement("div", { className: "row between", style: { marginTop: "auto" } },
              React.createElement("span", { className: "mono", style: { fontSize: 10.5, color: "var(--ink-faint)" } }, m.min + " min"),
              React.createElement("span", { className: "mono", style: { fontSize: 10.5, color: p ? "var(--red-deep)" : "var(--ink-faint)" } }, p + "%")),
            React.createElement("div", { style: { marginTop: 8 } }, React.createElement(Bar, { pct: p }))));
      })));
}

Object.assign(window, { FiscalScreen });
