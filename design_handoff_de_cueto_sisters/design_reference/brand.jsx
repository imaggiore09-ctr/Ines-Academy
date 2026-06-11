/* ATELIER — Monograma de marca «I» (variantes) + naming */

const BRAND_NAMES = ["de Cueto Sisters", "Hermanas de Cueto", "Sis Business", "Sis Studio", "de Cueto Studio"];
const BRAND_SUB = "Estudio de Marca";

/* Serif "I" — versión grande (monograma suelto) o compacta (dentro de marco) */
function SerifI({ compact }) {
  if (compact) {
    return React.createElement("g", { fill: "currentColor" },
      React.createElement("rect", { x: 13, y: 12, width: 14, height: 2.1, rx: 0.4 }),
      React.createElement("rect", { x: 13, y: 25.8, width: 14, height: 2.1, rx: 0.4 }),
      React.createElement("rect", { x: 18, y: 12, width: 4, height: 16 }));
  }
  return React.createElement("g", { fill: "currentColor" },
    React.createElement("rect", { x: 9, y: 7, width: 22, height: 2.6, rx: 0.5 }),
    React.createElement("rect", { x: 9, y: 30.4, width: 22, height: 2.6, rx: 0.5 }),
    React.createElement("rect", { x: 16.4, y: 7, width: 7.2, height: 26 }));
}

/* variant: crest · frame · shield · circle · serif */
function BrandMark({ variant = "crest", size = 36 }) {
  let content;
  if (variant === "crest") {
    content = React.createElement(React.Fragment, null,
      // óvalo doble
      React.createElement("ellipse", { cx: 20, cy: 20, rx: 13.4, ry: 16.6, fill: "none", stroke: "currentColor", strokeWidth: 1.1 }),
      React.createElement("ellipse", { cx: 20, cy: 20, rx: 11.3, ry: 14.2, fill: "none", stroke: "currentColor", strokeWidth: 0.55, opacity: .6 }),
      // filigrana superior (curvas espejadas + remate)
      React.createElement("path", { d: "M20 1.2c-2.4 1.6-4 .3-4 .3M20 1.2c2.4 1.6 4 .3 4 .3", fill: "none", stroke: "currentColor", strokeWidth: 0.7, strokeLinecap: "round" }),
      React.createElement("path", { d: "M20 5.6c-1.7-1-1.7-3 0-4 1.7 1 1.7 3 0 4Z", fill: "currentColor" }),
      // filigrana inferior (espejo)
      React.createElement("path", { d: "M20 38.8c-2.4-1.6-4-.3-4-.3M20 38.8c2.4-1.6 4-.3 4-.3", fill: "none", stroke: "currentColor", strokeWidth: 0.7, strokeLinecap: "round" }),
      React.createElement("path", { d: "M20 34.4c-1.7 1-1.7 3 0 4 1.7-1 1.7-3 0-4Z", fill: "currentColor" }),
      // pequeñas volutas laterales
      React.createElement("path", { d: "M6.6 20c-1.4 0-2.2-1-2.2-2M33.4 20c1.4 0 2.2-1 2.2-2M6.6 20c-1.4 0-2.2 1-2.2 2M33.4 20c1.4 0 2.2 1 2.2 2", fill: "none", stroke: "currentColor", strokeWidth: 0.6, strokeLinecap: "round", opacity: .8 }),
      // reglas finas dentro
      React.createElement("rect", { x: 13.5, y: 10.8, width: 13, height: 0.8, fill: "currentColor", opacity: .55 }),
      React.createElement("rect", { x: 13.5, y: 28.4, width: 13, height: 0.8, fill: "currentColor", opacity: .55 }),
      // serif I refinada
      React.createElement("g", { fill: "currentColor" },
        React.createElement("rect", { x: 14.6, y: 13.2, width: 10.8, height: 1.7, rx: 0.4 }),
        React.createElement("rect", { x: 13.8, y: 13.2, width: 1.2, height: 1.7 }),
        React.createElement("rect", { x: 25, y: 13.2, width: 1.2, height: 1.7 }),
        React.createElement("rect", { x: 14.6, y: 25.1, width: 10.8, height: 1.7, rx: 0.4 }),
        React.createElement("rect", { x: 13.8, y: 25.1, width: 1.2, height: 1.7 }),
        React.createElement("rect", { x: 25, y: 25.1, width: 1.2, height: 1.7 }),
        React.createElement("rect", { x: 18.4, y: 13.2, width: 3.2, height: 13.6 })));
  } else if (variant === "circle") {
    content = React.createElement(React.Fragment, null,
      React.createElement("circle", { cx: 20, cy: 20, r: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.4 }),
      React.createElement(SerifI, { compact: true }));
  } else if (variant === "shield") {
    content = React.createElement(React.Fragment, null,
      React.createElement("path", { d: "M20 3 35 8v11c0 9-6.5 14.5-15 18C11.5 33.5 5 28 5 19V8L20 3Z",
        fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinejoin: "round" }),
      React.createElement("g", { transform: "translate(0,1)" }, React.createElement(SerifI, { compact: true })));
  } else if (variant === "serif") {
    content = React.createElement(React.Fragment, null,
      React.createElement("rect", { x: 6, y: 4.5, width: 28, height: 1.2, fill: "currentColor", opacity: .5 }),
      React.createElement("rect", { x: 6, y: 34.3, width: 28, height: 1.2, fill: "currentColor", opacity: .5 }),
      React.createElement(SerifI, null));
  } else { // frame
    content = React.createElement(React.Fragment, null,
      React.createElement("rect", { x: 3, y: 3, width: 34, height: 34, rx: 2.5, fill: "none", stroke: "currentColor", strokeWidth: 1.4 }),
      React.createElement("rect", { x: 6, y: 6, width: 28, height: 28, rx: 1, fill: "none", stroke: "currentColor", strokeWidth: 0.6, opacity: .45 }),
      React.createElement(SerifI, { compact: true }));
  }
  return React.createElement("div", { className: "brand-mono", style: { width: size, height: size } },
    React.createElement("svg", { width: size, height: size, viewBox: "0 0 40 40" }, content));
}

/* Marca completa: monograma + nombre + subtítulo */
function BrandLockup({ name, variant, size = 36, nameSize = 19, light }) {
  return React.createElement("div", { className: "row", style: { gap: 11 } },
    React.createElement(BrandMark, { variant, size }),
    React.createElement("div", null,
      React.createElement("div", { className: "brand-name", style: { fontSize: nameSize, lineHeight: 1, color: light ? "#fff" : "var(--ink)" } }, name),
      React.createElement("div", { className: "brand-sub", style: light ? { color: "rgba(255,255,255,.5)" } : null }, BRAND_SUB)));
}

Object.assign(window, { BrandMark, BrandLockup, BRAND_NAMES, BRAND_SUB, SerifI });
