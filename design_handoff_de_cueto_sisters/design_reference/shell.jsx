/* ATELIER — Login, Sidebar, Topbar */

/* Rosa de línea minimalista (decorativa) para la portada */
function RedFlower() {
  return React.createElement("svg", { className: "login-flower", viewBox: "0 0 200 430", fill: "none",
      stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
    // contorno de la flor (pétalos exteriores ondulados)
    React.createElement("path", { d: "M110 30c16-8 38 2 40 24 18 0 32 20 22 38 12 12 6 36-12 42 2 18-16 32-34 26-10 14-34 12-42-4-18 6-36-8-34-26-16-6-20-30-6-42-8-18 6-38 24-38 6-12 26-18 42-20Z" }),
    // pétalos internos en espiral
    React.createElement("path", { d: "M100 66c-12 2-20 14-16 26 4 14 22 18 33 8 9-8 8-24-4-30-10-5-23 1-26 12-2 9 5 18 14 18" }),
    React.createElement("path", { d: "M118 74c8 6 11 18 5 27M92 88c-2 11 5 22 16 25", strokeWidth: 1.4 }),
    // tallo
    React.createElement("path", { d: "M116 154c-3 44 5 86-5 140-5 28-3 64 1 122" }),
    // hoja superior izquierda
    React.createElement("path", { d: "M112 196c-30-12-54 0-67 24 31 7 56-3 67-24Z" }),
    React.createElement("path", { d: "M82 211c9 5 19 8 27 7", strokeWidth: 1.3 }),
    // hoja derecha
    React.createElement("path", { d: "M114 262c31-9 55 5 66 30-31 5-55-7-66-30Z" }),
    React.createElement("path", { d: "M144 279c-9 3-18 5-26 4", strokeWidth: 1.3 }),
    // hoja inferior izquierda
    React.createElement("path", { d: "M110 330c-26-9-47 2-58 23 27 6 49-4 58-23Z" }),
    React.createElement("path", { d: "M84 343c8 4 16 6 23 6", strokeWidth: 1.3 })
  );
}

const USERS = [
  { id: "ines", name: "Inés", full: "Inés de Cueto", role: "Artista", ink: false },
  { id: "cris", name: "Cristina", full: "Cristina de Cueto", role: "Business Manager", ink: true }
];

function Login({ onEnter, brand }) {
  const [who, setWho] = useState("ines");
  const [pw, setPw] = useState("");
  const user = USERS.find(u => u.id === who);

  const submit = (e) => { e.preventDefault(); onEnter(user); };

  return React.createElement("div", { className: "login" },
    // panel negro: texto
    React.createElement("div", { className: "login-art" },
      React.createElement("div", { className: "login-art-copy" },
        React.createElement("div", { className: "kicker", style: { color: "rgba(255,255,255,.6)" } }, "Dashboard de hermanas · 2026"),
        React.createElement("div", { style: { marginTop: "auto", marginBottom: "5%" } },
          React.createElement("div", { className: "display", style: { fontSize: 52, lineHeight: 1.06, letterSpacing: "-0.02em" } },
            "Construir", React.createElement("br", null),
            "nuestra ",
            React.createElement("span", { className: "display-i", style: { color: "var(--gold)" } }, "marca"),
            React.createElement("br", null),
            "personal"),
          React.createElement("p", { style: { color: "rgba(255,255,255,.66)", maxWidth: "32ch", marginTop: 22, fontSize: 14.5 } },
            "De la identidad artística al primer lanzamiento: 6 meses paso a paso."))
      )
    ),
    // columna foto de Inés
    React.createElement("div", { className: "login-photo-col" },
      React.createElement("img", { className: "login-photo", src: "ines.png", alt: "Inés de Cueto" })
    ),
    // formulario
    React.createElement("div", { className: "login-form-wrap" },
      React.createElement("form", { className: "login-form", onSubmit: submit },
        React.createElement("div", { style: { textAlign: "center", marginBottom: 24 } },
          React.createElement("div", { style: { display: "inline-flex" } },
            React.createElement(BrandLockup, { name: brand.name, variant: brand.variant, size: 80, nameSize: 28 })),
          React.createElement("h2", { className: "display", style: { fontSize: 21, marginTop: 18 } }, "Bienvenida de nuevo"),
          React.createElement("p", { className: "muted", style: { fontSize: 14, marginTop: 6 } }, "Este espacio es solo vuestro.")),

        React.createElement("div", { className: "kicker", style: { marginBottom: 9 } }, "¿Quién entra?"),
        React.createElement("div", { className: "row", style: { gap: 10, marginBottom: 20 } },
          USERS.map(u => React.createElement("button", {
            key: u.id, type: "button", onClick: () => setWho(u.id),
            className: "card", style: {
              flex: 1, padding: "14px 12px", textAlign: "center", cursor: "pointer",
              borderColor: who === u.id ? "var(--ink)" : "var(--line)",
              borderWidth: who === u.id ? 1.5 : 1, background: who === u.id ? "var(--paper)" : "var(--paper-2)"
            }
          },
            React.createElement("div", { className: "avatar" + (u.ink ? " ink" : ""), style: { margin: "0 auto 8px", width: 36, height: 36 } }, u.name[0]),
            React.createElement("div", { style: { fontSize: 14 } }, u.name),
            React.createElement("div", { className: "mono", style: { fontSize: 10, color: "var(--ink-faint)", marginTop: 2 } }, u.role)))),

        React.createElement(Field, { label: "Contraseña", value: pw, onChange: setPw }),
        React.createElement("button", { className: "btn block", type: "submit", style: { marginTop: 6 } },
          "Entrar al atelier", React.createElement(Icon, { name: "arrow", size: 16 })),
        React.createElement("p", { className: "mono center", style: { fontSize: 10.5, color: "var(--ink-faint)", marginTop: 16 } },
          "Acceso privado · solo Inés y Cristina")
      )
    )
  );
}

const NAV = [
  { group: "Tu proyecto", items: [
    { id: "dashboard", label: "Inicio", icon: "dashboard" },
    { id: "plan", label: "Plan por meses", icon: "roadmap" }
  ]},
  { group: "La marca", items: [
    { id: "identidad", label: "Identidad", icon: "identity" },
    { id: "redes", label: "Redes sociales", icon: "social" },
    { id: "obras", label: "Obras y colecciones", icon: "obras" }
  ]},
  { group: "El negocio", items: [
    { id: "tienda", label: "Tienda online", icon: "shop" },
    { id: "legal", label: "Legal y finanzas", icon: "legal" },
    { id: "aprendizaje", label: "Aprendizaje", icon: "learn" },
    { id: "fiscal", label: "Conocimientos fiscales generales", icon: "book", badge: "Nuevo" }
  ]}
];

function Sidebar({ route, go, user, onLogout, brand }) {
  const { state } = useStore();
  const counts = {
    plan: overallProgress(state.MONTHS).pct + "%",
    obras: state.OBRAS.length,
    aprendizaje: state.LEARN.filter(m => m.done).length + "/" + state.LEARN.length
  };
  return React.createElement("aside", { className: "sidebar" },
    React.createElement("div", { className: "brand" },
      React.createElement(BrandLockup, { name: brand.name, variant: brand.variant, size: 34, nameSize: 18 })),
    React.createElement("nav", { className: "nav" },
      NAV.map(sec => React.createElement(React.Fragment, { key: sec.group },
        React.createElement("div", { className: "nav-label" }, sec.group),
        sec.items.map(it => React.createElement("button", {
          key: it.id, className: "nav-item" + (route === it.id ? " active" : "") + (it.badge ? " tall" : ""), onClick: () => go(it.id)
        },
          React.createElement(Icon, { name: it.icon, size: 18 }),
          React.createElement("span", null, it.label),
          it.badge
            ? React.createElement("span", { className: "nav-badge" }, it.badge)
            : (counts[it.id] != null && React.createElement("span", { className: "nav-count" }, counts[it.id]))))))),
    React.createElement("div", { className: "sidebar-foot" },
      React.createElement("button", { className: "user-chip", onClick: onLogout, title: "Cerrar sesión" },
        React.createElement("div", { className: "avatar" + (user.ink ? " ink" : "") }, user.name[0]),
        React.createElement("div", { style: { textAlign: "left", flex: 1, minWidth: 0 } },
          React.createElement("div", { style: { fontSize: 13.5 } }, user.full),
          React.createElement("div", { className: "mono", style: { fontSize: 10, color: "var(--ink-faint)" } }, "Cerrar sesión")),
        React.createElement(Icon, { name: "arrow", size: 15, style: { color: "var(--ink-faint)" } })))
  );
}

const ROUTE_TITLES = {
  dashboard: "Inicio", plan: "Plan por meses", identidad: "Identidad",
  redes: "Redes sociales", obras: "Obras y colecciones", tienda: "Tienda online",
  legal: "Legal y finanzas", aprendizaje: "Aprendizaje", fiscal: "Conocimientos fiscales"
};

function Topbar({ route, onMenu, onOpenTweaks, brand }) {
  return React.createElement("header", { className: "topbar" },
    React.createElement("button", { className: "icon-btn menu-btn", onClick: onMenu },
      React.createElement(Icon, { name: "menu", size: 18 })),
    React.createElement("div", { className: "crumbs" }, "Atelier", " ", React.createElement("span", { style: { opacity: .4 } }, "/"), " ",
      React.createElement("b", null, ROUTE_TITLES[route] || "Inicio")),
    React.createElement("div", { className: "spacer" }),
    React.createElement("div", { className: "row", style: { gap: 10 } },
      React.createElement("div", { className: "tag", style: { borderColor: "var(--red-line)", color: "var(--red-deep)", background: "var(--red-wash)" } },
        React.createElement(Icon, { name: "flag", size: 13 }), "Mes 1 · Sep"),
      React.createElement("button", { className: "icon-btn", title: "Buscar" }, React.createElement(Icon, { name: "search", size: 17 })),
      React.createElement("button", { className: "icon-btn", title: "Recordatorios" }, React.createElement(Icon, { name: "bell", size: 17 }))));
}

Object.assign(window, { Login, Sidebar, Topbar, USERS, NAV, ROUTE_TITLES, RedFlower });
