/* ATELIER — Tienda online */

function TiendaScreen() {
  const { state, toggleCheck, setState, flash } = useStore();
  const shop = state.SHOP;
  const done = shop.checklist.filter(c => c.done).length;
  const pct = Math.round(done / shop.checklist.length * 100);

  const setPlataforma = (p) => { setState(s => ({ ...s, SHOP: { ...s.SHOP, plataforma: p } })); };

  return React.createElement("div", { className: "page" },
    React.createElement(PageHead, { kicker: "El negocio", title: "Tienda online",
      intro: "Todo lo necesario para abrir la tienda con calma y sin olvidar nada." }),

    // estado del lanzamiento
    React.createElement("div", { className: "card", style: { marginBottom: 24, display: "flex", alignItems: "center", gap: 26 } },
      React.createElement(Ring, { pct, size: 78, stroke: 6 }, React.createElement("div", { className: "display", style: { fontSize: 19 } }, pct + "%")),
      React.createElement("div", { style: { flex: 1 } },
        React.createElement("div", { className: "kicker kicker-red" }, "Estado de lanzamiento"),
        React.createElement("div", { className: "display", style: { fontSize: 24, margin: "5px 0 4px" } }, shop.estado),
        React.createElement("p", { className: "muted", style: { fontSize: 13.5 } }, done + " de " + shop.checklist.length + " pasos completados · objetivo: Mes 4 (diciembre)")),
      React.createElement("div", { style: { textAlign: "right" } },
        React.createElement("div", { className: "kicker", style: { marginBottom: 8 } }, "Plataforma"),
        React.createElement("div", { className: "row", style: { gap: 7 } },
          ["Shopify", "WooCommerce", "Otra"].map(p => React.createElement("button", { key: p,
            className: "tag", onClick: () => setPlataforma(p),
            style: { cursor: "pointer", borderColor: shop.plataforma === p ? "var(--ink)" : "var(--line-2)", color: shop.plataforma === p ? "#fff" : "var(--ink-mute)", background: shop.plataforma === p ? "var(--ink)" : "var(--paper)" } }, p))),
        !shop.plataforma && React.createElement("div", { className: "mono", style: { fontSize: 10, color: "var(--red-deep)", marginTop: 8 } }, "↑ Decisión pendiente"))),

    React.createElement("div", { className: "grid", style: { gridTemplateColumns: "1.3fr 1fr", alignItems: "start", gap: 26 } },
      // checklist
      React.createElement("div", { className: "card" },
        React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 16 } }, "Checklist de creación"),
        React.createElement("div", null,
          shop.checklist.map(c => {
            const info = window.ATELIER_EDU && window.ATELIER_EDU.SHOP_INFO[c.id];
            const ico = (window.ATELIER_EDU && window.ATELIER_EDU.SHOP_ICON[c.id]) || "check";
            const legalReq = info && info.legal !== "No obligatorio";
            return React.createElement("div", { key: c.id, className: "task-row" + (c.done ? " is-done" : "") },
            React.createElement("div", { className: "task-ico" }, React.createElement(Icon, { name: ico, size: 18 })),
            React.createElement(Check, { on: c.done, onClick: () => toggleCheck("SHOP", c.id) }),
            React.createElement("div", { className: "task-body", style: { cursor: "default" } },
              React.createElement("div", { className: "t-title", style: { fontSize: 15 } }, c.t),
              info && React.createElement("div", { className: "t-sub" }, info.why)),
            React.createElement("div", { className: "task-right" },
              legalReq && React.createElement("span", { className: "pill " + (info.legal === "Obligatorio" ? "doing" : "todo") }, info.legal),
              React.createElement("span", { className: "pill " + (c.done ? "done" : "todo") }, c.done ? "Hecho" : "Pendiente")));
          }))),

      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
        // páginas necesarias
        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker", style: { marginBottom: 14 } }, "Páginas necesarias"),
          React.createElement("div", { className: "row wrap", style: { gap: 8 } },
            shop.paginas.map((p, i) => React.createElement("span", { key: i, className: "tag" }, React.createElement(Icon, { name: "doc", size: 12 }), p)))),
        // textos pendientes
        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker", style: { marginBottom: 14 } }, "Textos pendientes"),
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
            shop.textosPendientes.map((t, i) => React.createElement("div", { key: i, className: "row", style: { gap: 10 } },
              React.createElement("span", { className: "dot alta", style: { marginTop: 7 } }),
              React.createElement("span", { style: { fontSize: 13.5 } }, t))))),
        // configuración
        React.createElement("div", { className: "card", style: { background: "var(--paper-2)", border: "none" } },
          React.createElement("div", { className: "grid g-2", style: { gap: 16 } },
            React.createElement("div", null,
              React.createElement("div", { className: "kicker", style: { marginBottom: 8 } }, "Pagos"),
              React.createElement("p", { className: "muted", style: { fontSize: 13 } }, "Tarjeta + PayPal. Pendiente de configurar pasarela.")),
            React.createElement("div", null,
              React.createElement("div", { className: "kicker", style: { marginBottom: 8 } }, "Envíos"),
              React.createElement("p", { className: "muted", style: { fontSize: 13 } }, "España 6€ · UE 15€. Embalaje a mano con seguro."))))),
    ),

    // Obligaciones legales en España
    React.createElement("div", { className: "card", style: { marginTop: 24, background: "var(--paper)" } },
      React.createElement("div", { className: "row between", style: { marginBottom: 16 } },
        React.createElement("div", null,
          React.createElement("div", { className: "kicker kicker-red" }, "Importante · informativo"),
          React.createElement("h3", { className: "display", style: { fontSize: 20, marginTop: 4 } }, "Obligaciones legales en España")),
        React.createElement(Icon, { name: "legal", size: 20, style: { color: "var(--ink-faint)" } })),
      React.createElement("p", { className: "muted", style: { fontSize: 13, marginBottom: 16, maxWidth: "70ch" } },
        "Una tienda online en España tiene que cumplir ciertas normas. Esto es un resumen sencillo para que sepáis de qué hablar con la asesoría — no sustituye su consejo."),
      React.createElement("div", { className: "grid g-2", style: { gap: 12 } },
        (window.ATELIER_EDU ? window.ATELIER_EDU.OBLIGACIONES : []).map((o, i) =>
          React.createElement("div", { key: i, className: "obli" },
            React.createElement("span", { className: "obli-k" }, o.k),
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 13.5, fontWeight: 500 } }, o.t),
              React.createElement("p", { className: "muted", style: { fontSize: 12.5, marginTop: 3, lineHeight: 1.5 } }, o.d))))) ),

    // FAQ + devoluciones
    React.createElement("div", { className: "grid g-2", style: { marginTop: 24 } },
      React.createElement("div", { className: "card" },
        React.createElement("div", { className: "kicker", style: { marginBottom: 14 } }, "Preguntas frecuentes"),
        shop.faq.map((f, i) => React.createElement("div", { key: i, style: { padding: "11px 0", borderBottom: i < shop.faq.length - 1 ? "1px solid var(--line)" : "none" } },
          React.createElement("div", { style: { fontSize: 14, fontWeight: 500 } }, f.q),
          React.createElement("p", { className: "muted", style: { fontSize: 13, marginTop: 3 } }, f.a)))),
      React.createElement("div", { className: "card" },
        React.createElement("div", { className: "kicker", style: { marginBottom: 14 } }, "Política de devoluciones"),
        React.createElement("p", { className: "muted", style: { fontSize: 13.5, lineHeight: 1.6 } },
          "14 días para devoluciones desde la recepción. La obra debe volver en su embalaje original. Los encargos personalizados no admiten devolución salvo defecto."),
        React.createElement("button", { className: "btn ghost sm", style: { marginTop: 14 } }, React.createElement(Icon, { name: "edit", size: 14 }), "Editar política"))));
}

Object.assign(window, { TiendaScreen });
