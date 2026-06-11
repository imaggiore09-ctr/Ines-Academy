/* ATELIER — Obras y colecciones */

const ESTADOS = ["en proceso", "terminada", "fotografiada", "publicada", "vendida"];
const ESTADO_PILL = { "en proceso": "todo", "terminada": "todo", "fotografiada": "doing", "publicada": "doing", "vendida": "done" };

function ObraModal({ obra, onClose }) {
  const { addObra, setObra, deleteObra } = useStore();
  const isNew = !obra;
  const [f, setF] = useState(obra || { nombre: "", tecnica: "", medidas: "", fecha: "", precio: "", estado: "en proceso", coleccion: "", historia: "" });
  const set = (k, v) => setF({ ...f, [k]: v });
  const save = () => {
    if (!f.nombre.trim()) return;
    const data = { ...f, precio: parseInt(f.precio) || 0 };
    if (isNew) addObra(data); else setObra(obra.id, data);
    onClose();
  };
  return React.createElement(Modal, { kicker: isNew ? "Nueva obra" : "Editar obra", title: isNew ? "Registrar obra" : f.nombre, onClose, wide: true,
    footer: React.createElement(React.Fragment, null,
      !isNew && React.createElement("button", { className: "btn ghost sm", onClick: () => { deleteObra(obra.id); onClose(); },
        style: { marginRight: "auto", color: "var(--red-deep)", borderColor: "var(--red-line)" } }, React.createElement(Icon, { name: "trash", size: 15 }), "Eliminar"),
      React.createElement("button", { className: "btn ghost sm", onClick: onClose }, "Cancelar"),
      React.createElement("button", { className: "btn red sm", onClick: save }, isNew ? "Registrar" : "Guardar")) },
    React.createElement("div", { className: "grid g-2", style: { gap: 18 } },
      React.createElement(ImgPh, { label: "Foto de referencia", style: { aspectRatio: "4/5" } }),
      React.createElement("div", null,
        React.createElement(Field, { label: "Nombre de la obra", value: f.nombre, onChange: v => set("nombre", v) }),
        React.createElement(Field, { label: "Técnica", value: f.tecnica, onChange: v => set("tecnica", v), placeholder: "Óleo sobre lino…" }),
        React.createElement("div", { className: "row", style: { gap: 12 } },
          React.createElement(Field, { label: "Medidas", value: f.medidas, onChange: v => set("medidas", v), placeholder: "60 × 50 cm" }),
          React.createElement("label", { className: "field", style: { flex: 1 } }, React.createElement("span", null, "Precio (€)"),
            React.createElement("input", { className: "input", type: "number", value: f.precio, onChange: e => set("precio", e.target.value) }))))),
    React.createElement("div", { className: "row", style: { gap: 12 } },
      React.createElement("label", { className: "field", style: { flex: 1 } }, React.createElement("span", null, "Fecha"),
        React.createElement("input", { type: "date", className: "input", value: f.fecha, onChange: e => set("fecha", e.target.value) })),
      React.createElement("label", { className: "field", style: { flex: 1 } }, React.createElement("span", null, "Estado"),
        React.createElement("select", { className: "input", value: f.estado, onChange: e => set("estado", e.target.value) },
          ESTADOS.map(s => React.createElement("option", { key: s, value: s }, s)))),
      React.createElement(Field, { label: "Colección", value: f.coleccion, onChange: v => set("coleccion", v) })),
    React.createElement(Field, { label: "Historia de la obra", value: f.historia, onChange: v => set("historia", v), area: true }));
}

function ObraCard({ o, onClick }) {
  return React.createElement("button", { className: "mod", onClick, style: { cursor: "pointer" } },
    React.createElement(ImgPh, { label: o.tecnica.split(" ")[0] || "obra", className: "mod-cover", style: { aspectRatio: "4/5", borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" } }),
    React.createElement("div", { className: "mod-body" },
      React.createElement("div", { className: "row between", style: { marginBottom: 6 } },
        React.createElement("span", { className: "pill " + ESTADO_PILL[o.estado] }, o.estado),
        React.createElement("span", { className: "display", style: { fontSize: 16 } }, o.precio ? eur(o.precio) : "—")),
      React.createElement("div", { className: "display", style: { fontSize: 18, lineHeight: 1.1 } }, o.nombre),
      React.createElement("div", { className: "mono", style: { fontSize: 11, color: "var(--ink-mute)", marginTop: 6 } }, o.tecnica + " · " + o.medidas),
      o.coleccion && React.createElement("div", { className: "tag", style: { marginTop: 10 } }, React.createElement(Icon, { name: "obras", size: 12 }), o.coleccion)));
}

function ObrasScreen() {
  const { state } = useStore();
  const [view, setView] = useState("grid");
  const [fc, setFc] = useState("todas");
  const [fe, setFe] = useState("todos");
  const [edit, setEdit] = useState(undefined); // undefined=cerrado, null=nueva, obj=editar

  const colecciones = [...new Set(state.OBRAS.map(o => o.coleccion).filter(Boolean))];
  let obras = state.OBRAS;
  if (fc !== "todas") obras = obras.filter(o => o.coleccion === fc);
  if (fe !== "todos") obras = obras.filter(o => o.estado === fe);

  const vendidas = state.OBRAS.filter(o => o.estado === "vendida").length;

  return React.createElement("div", { className: "page" },
    edit !== undefined && React.createElement(ObraModal, { obra: edit, onClose: () => setEdit(undefined) }),
    React.createElement(PageHead, { kicker: "La marca", title: "Obras y colecciones",
      intro: "El inventario vivo del estudio. Cada obra con su historia, su estado y su precio.",
      actions: React.createElement("button", { className: "btn red", onClick: () => setEdit(null) }, React.createElement(Icon, { name: "plus", size: 16 }), "Registrar obra") }),

    React.createElement("div", { className: "grid g-4", style: { marginBottom: 24 } },
      React.createElement("div", { className: "card", style: { padding: "16px 20px" } }, React.createElement("div", { className: "stat-num sm" }, state.OBRAS.length), React.createElement("div", { className: "mono", style: { fontSize: 10, textTransform: "uppercase", color: "var(--ink-mute)", marginTop: 5 } }, "Obras totales")),
      React.createElement("div", { className: "card", style: { padding: "16px 20px" } }, React.createElement("div", { className: "stat-num sm" }, colecciones.length), React.createElement("div", { className: "mono", style: { fontSize: 10, textTransform: "uppercase", color: "var(--ink-mute)", marginTop: 5 } }, "Colecciones")),
      React.createElement("div", { className: "card", style: { padding: "16px 20px" } }, React.createElement("div", { className: "stat-num sm" }, vendidas), React.createElement("div", { className: "mono", style: { fontSize: 10, textTransform: "uppercase", color: "var(--ink-mute)", marginTop: 5 } }, "Vendidas")),
      React.createElement("div", { className: "card", style: { padding: "16px 20px" } }, React.createElement("div", { className: "stat-num sm" }, eur(state.OBRAS.reduce((a, b) => a + (b.estado === "vendida" ? b.precio : 0), 0))), React.createElement("div", { className: "mono", style: { fontSize: 10, textTransform: "uppercase", color: "var(--ink-mute)", marginTop: 5 } }, "Ingresos por obra"))),

    React.createElement("div", { className: "row between wrap", style: { marginBottom: 18, gap: 12 } },
      React.createElement("div", { className: "seg" },
        [["grid", "Galería"], ["tabla", "Tabla"]].map(([v, l]) => React.createElement("button", { key: v, className: view === v ? "on" : "", onClick: () => setView(v) }, l))),
      React.createElement("div", { className: "row wrap", style: { gap: 10 } },
        React.createElement("select", { className: "input", style: { width: "auto", padding: "7px 10px", fontSize: 13 }, value: fc, onChange: e => setFc(e.target.value) },
          React.createElement("option", { value: "todas" }, "Toda colección"), colecciones.map(c => React.createElement("option", { key: c, value: c }, c))),
        React.createElement("select", { className: "input", style: { width: "auto", padding: "7px 10px", fontSize: 13 }, value: fe, onChange: e => setFe(e.target.value) },
          React.createElement("option", { value: "todos" }, "Todo estado"), ESTADOS.map(s => React.createElement("option", { key: s, value: s }, s))))),

    view === "grid"
      ? React.createElement("div", { className: "grid g-4" }, obras.map(o => React.createElement(ObraCard, { key: o.id, o, onClick: () => setEdit(o) })))
      : React.createElement("div", { className: "card flush", style: { padding: "8px 16px" } },
          React.createElement("table", { className: "tbl" },
            React.createElement("thead", null, React.createElement("tr", null,
              ["Obra", "Técnica", "Medidas", "Colección", "Estado", "Precio"].map(h => React.createElement("th", { key: h }, h)))),
            React.createElement("tbody", null, obras.map(o => React.createElement("tr", { key: o.id, className: "click", onClick: () => setEdit(o) },
              React.createElement("td", null, React.createElement("span", { className: "display", style: { fontSize: 16 } }, o.nombre)),
              React.createElement("td", { className: "muted" }, o.tecnica),
              React.createElement("td", { className: "mono", style: { fontSize: 12 } }, o.medidas),
              React.createElement("td", null, o.coleccion || "—"),
              React.createElement("td", null, React.createElement("span", { className: "pill " + ESTADO_PILL[o.estado] }, o.estado)),
              React.createElement("td", null, React.createElement("span", { className: "display", style: { fontSize: 15 } }, o.precio ? eur(o.precio) : "—")))))))
  );
}

Object.assign(window, { ObrasScreen });
