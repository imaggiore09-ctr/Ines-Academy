/* ATELIER — Identidad de marca (formularios editables) */

function ChipEditor({ label, items, onChange, accent }) {
  const [val, setVal] = useState("");
  const add = () => { const v = val.trim(); if (!v) return; onChange([...items, v]); setVal(""); };
  return React.createElement("div", { className: "field" },
    React.createElement("span", { style: { display: "block", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 8 } }, label),
    React.createElement("div", { className: "row wrap", style: { gap: 8, marginBottom: 10 } },
      items.map((it, i) => React.createElement("span", { key: i, className: "tag",
        style: accent ? { borderColor: "var(--red-line)", color: "var(--red-deep)", background: "var(--red-wash)" } : null },
        it, React.createElement("button", { onClick: () => onChange(items.filter((_, j) => j !== i)),
          style: { border: "none", background: "none", padding: 0, marginLeft: 2, color: "inherit", cursor: "pointer", opacity: .6, display: "flex" } },
          React.createElement(Icon, { name: "x", size: 11 })))),
      items.length === 0 && React.createElement("span", { className: "faint", style: { fontSize: 13 } }, "Aún nada — añade abajo.")),
    React.createElement("div", { className: "row", style: { gap: 8 } },
      React.createElement("input", { className: "input", value: val, placeholder: "Escribe y pulsa Añadir…",
        onChange: e => setVal(e.target.value), onKeyDown: e => { if (e.key === "Enter") { e.preventDefault(); add(); } } }),
      React.createElement("button", { className: "btn ghost sm", onClick: add }, "Añadir")));
}

function IdentidadScreen() {
  const { state, setIdentity } = useStore();
  const id = state.IDENTITY;
  const set = (k) => (v) => setIdentity({ [k]: v });

  return React.createElement("div", { className: "page" },
    React.createElement(PageHead, { kicker: "La marca", title: "Identidad de marca",
      intro: "El corazón de todo. Guarda aquí quién es Inés como artista. Todo se guarda automáticamente.",
      actions: React.createElement("span", { className: "tag" }, React.createElement(Icon, { name: "check", size: 13 }), "Guardado") }),

    React.createElement("div", { className: "grid", style: { gridTemplateColumns: "1.45fr 1fr", alignItems: "start", gap: 26 } },
      // —— Columna formularios ——
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 16 } }, "01 · Esencia"),
          React.createElement(Field, { label: "Nombre artístico / de marca", value: id.nombre, onChange: set("nombre"), placeholder: "Pendiente de decidir…" }),
          React.createElement(Field, { label: "Frase de presentación", value: id.frase, onChange: set("frase"), area: true }),
          React.createElement(Field, { label: "Historia personal", value: id.historia, onChange: set("historia"), area: true })),

        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 16 } }, "02 · Personalidad"),
          React.createElement(ChipEditor, { label: "Valores de marca", items: id.valores, onChange: set("valores"), accent: true }),
          React.createElement(Field, { label: "Estilo artístico", value: id.estilo, onChange: set("estilo"), area: true }),
          React.createElement(ChipEditor, { label: "Temas recurrentes", items: id.temas, onChange: set("temas") }),
          React.createElement(ChipEditor, { label: "Inspiraciones", items: id.inspiraciones, onChange: set("inspiraciones") })),

        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 16 } }, "03 · Voz y tono"),
          React.createElement(Field, { label: "Tono de voz", value: id.voz, onChange: set("voz"), area: true }),
          React.createElement("div", { className: "grid g-2", style: { gap: 18 } },
            React.createElement(ChipEditor, { label: "Palabras que SÍ representan la marca", items: id.siPalabras, onChange: set("siPalabras"), accent: true }),
            React.createElement(ChipEditor, { label: "Palabras que NO la representan", items: id.noPalabras, onChange: set("noPalabras") })))),

      // —— Columna preview + visual ——
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 80 } },
        React.createElement("div", { className: "card flush" },
          React.createElement("div", { style: { background: "var(--ink)", color: "#fff", padding: "26px 24px", position: "relative", overflow: "hidden" } },
            React.createElement(Spots, { specs: [{ w: 60, h: 54, t: "-10%", r: "8%", r0: 16, c: "#262420" }, { w: 36, h: 40, b: "10%", l: "6%", r0: -8, c: "#26241c" }] }),
            React.createElement("div", { className: "kicker", style: { color: "rgba(255,255,255,.5)", position: "relative" } }, "Vista de marca"),
            React.createElement("div", { className: "display", style: { fontSize: 30, marginTop: 8, position: "relative" } }, id.nombre || "Inés de Cueto"),
            React.createElement("p", { className: "display-i", style: { color: "rgba(255,255,255,.7)", fontSize: 16, marginTop: 8, position: "relative" } }, "“" + (id.frase || "Tu frase aparecerá aquí") + "”")),
          React.createElement("div", { style: { padding: "20px 24px" } },
            React.createElement("div", { className: "kicker", style: { marginBottom: 10 } }, "Valores"),
            React.createElement("div", { className: "row wrap", style: { gap: 7, marginBottom: 18 } },
              id.valores.map((v, i) => React.createElement("span", { key: i, className: "tag" }, v))),
            React.createElement("div", { className: "kicker", style: { marginBottom: 10 } }, "Paleta"),
            React.createElement("div", { className: "row", style: { gap: 8 } },
              id.paleta.map((c, i) => React.createElement("div", { key: i, style: { flex: 1 } },
                React.createElement("div", { style: { height: 46, borderRadius: 6, background: c, border: "1px solid var(--line)" } }),
                React.createElement("div", { className: "mono", style: { fontSize: 9, color: "var(--ink-faint)", marginTop: 5, textAlign: "center" } }, c)))))),

        React.createElement("div", { className: "card" },
          React.createElement("div", { className: "kicker kicker-red", style: { marginBottom: 14 } }, "04 · Sistema visual"),
          React.createElement(Field, { label: "Tipografías", value: id.tipografias, onChange: set("tipografias") }),
          React.createElement("div", { style: { borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 4 } },
            React.createElement("div", { className: "display", style: { fontSize: 32, lineHeight: 1 } }, "Aa"),
            React.createElement("div", { className: "mono", style: { fontSize: 11, color: "var(--ink-mute)", marginTop: 8 } }, "Bodoni Moda · display"),
            React.createElement("div", { style: { fontFamily: "var(--mono)", fontSize: 13, marginTop: 12 } }, "Aa Bb Cc 0123"),
            React.createElement("div", { className: "mono", style: { fontSize: 11, color: "var(--ink-mute)", marginTop: 4 } }, "IBM Plex Mono · detalles"))))));
}

Object.assign(window, { IdentidadScreen });
