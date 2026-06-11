/* ATELIER — App raíz: routing, sesión, tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dashLook": "editorial",
  "accent": "rojo",
  "displayFont": "Bodoni Moda",
  "brandName": "de Cueto Sisters",
  "logo": "crest"
}/*EDITMODE-END*/;

const ACCENT_MAP = { "rojo": "rojo", "carmesi": "carmesi", "tinta": "tinta" };
const FONT_MAP = {
  "Bodoni Moda": '"Bodoni Moda", "Times New Roman", serif',
  "Playfair": '"Playfair Display", serif',
  "Libre Caslon": '"Libre Caslon Display", serif'
};

function Placeholder({ title }) {
  return React.createElement("div", { className: "page" },
    React.createElement(PageHead, { kicker: "Sección", title: title || "En construcción" }),
    React.createElement("div", { className: "card center", style: { padding: 60 } },
      React.createElement(Icon, { name: "sparkle", size: 28, style: { color: "var(--ink-faint)" } }),
      React.createElement("p", { className: "muted", style: { marginTop: 12 } }, "Esta sección está en construcción.")));
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [user, setUser] = useState(() => {
    try { const u = sessionStorage.getItem("atelier_user"); return u ? JSON.parse(u) : null; } catch (e) { return null; }
  });
  const [route, setRoute] = useState(() => localStorage.getItem("atelier_route") || "dashboard");
  const [navOpen, setNavOpen] = useState(false);
  const [taskRef, setTaskRef] = useState(null); // { monthId, taskId }

  // aplicar acento + fuente display al :root
  useEffect(() => {
    document.documentElement.setAttribute("data-accent", ACCENT_MAP[t.accent] || "rojo");
    document.documentElement.style.setProperty("--display", FONT_MAP[t.displayFont] || FONT_MAP["Bodoni Moda"]);
  }, [t.accent, t.displayFont]);

  useEffect(() => { localStorage.setItem("atelier_route", route); }, [route]);

  const go = (r) => { setRoute(r); setNavOpen(false); window.scrollTo({ top: 0 }); };
  const enter = (u) => { setUser(u); try { sessionStorage.setItem("atelier_user", JSON.stringify(u)); } catch (e) {} };
  const logout = () => { setUser(null); try { sessionStorage.removeItem("atelier_user"); } catch (e) {} };
  const openTask = (monthId, taskId) => setTaskRef({ monthId, taskId });
  const brand = { name: t.brandName || "de Cueto Sisters", variant: t.logo || "frame" };

  if (!user) return React.createElement(Login, { onEnter: enter, brand });

  const screens = {
    dashboard: () => React.createElement(Dashboard, { user, go, openTask, look: t.dashLook }),
    plan: () => React.createElement(window.PlanScreen || Placeholder, { go, openTask, title: "Plan por meses" }),
    identidad: () => React.createElement(window.IdentidadScreen || Placeholder, { title: "Identidad" }),
    redes: () => React.createElement(window.RedesScreen || Placeholder, { title: "Redes sociales" }),
    obras: () => React.createElement(window.ObrasScreen || Placeholder, { title: "Obras y colecciones" }),
    tienda: () => React.createElement(window.TiendaScreen || Placeholder, { title: "Tienda online" }),
    legal: () => React.createElement(window.LegalScreen || Placeholder, { title: "Legal y finanzas" }),
    aprendizaje: () => React.createElement(window.AprendizajeScreen || Placeholder, { go, title: "Aprendizaje" }),
    fiscal: () => React.createElement(window.FiscalScreen || Placeholder, { title: "Conocimientos fiscales" })
  };
  const Screen = screens[route] || screens.dashboard;

  return React.createElement("div", { className: "app" + (navOpen ? " nav-open" : "") },
    React.createElement(Sidebar, { route, go, user, onLogout: logout, brand }),
    navOpen && React.createElement("div", { className: "scrim", onClick: () => setNavOpen(false) }),
    React.createElement("div", { className: "main" },
      React.createElement(Topbar, { route, onMenu: () => setNavOpen(true), brand }),
      Screen()),
    taskRef && React.createElement(window.TaskModal, { taskRef, onClose: () => setTaskRef(null) }),

    // —— Tweaks ——
    React.createElement(TweaksPanel, { title: "Tweaks" },
      React.createElement(TweakSection, { label: "Look del dashboard" }),
      React.createElement(TweakRadio, { label: "Disposición", value: t.dashLook,
        options: ["editorial", "compacto", "galeria"], onChange: v => { setTweak("dashLook", v); go("dashboard"); } }),
      React.createElement(TweakSection, { label: "Identidad visual" }),
      React.createElement(TweakColor, { label: "Acento", value: t.accent === "rojo" ? "#cc2e29" : t.accent === "carmesi" ? "#9e1b1b" : "#221d18",
        options: ["#cc2e29", "#9e1b1b", "#221d18"],
        onChange: hex => setTweak("accent", hex === "#cc2e29" ? "rojo" : hex === "#9e1b1b" ? "carmesi" : "tinta") }),
      React.createElement(TweakRadio, { label: "Tipografía display", value: t.displayFont,
        options: ["Bodoni Moda", "Playfair", "Libre Caslon"], onChange: v => setTweak("displayFont", v) }),
      React.createElement(TweakSection, { label: "Marca" }),
      React.createElement(TweakSelect, { label: "Nombre", value: t.brandName,
        options: BRAND_NAMES, onChange: v => setTweak("brandName", v) }),
      React.createElement(TweakRadio, { label: "Monograma «I»", value: t.logo,
        options: ["crest", "frame", "shield", "circle", "serif"], onChange: v => setTweak("logo", v) })
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(StoreProvider, null, React.createElement(App)));
