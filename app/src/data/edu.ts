// Contenido educativo estático para el módulo de aprendizaje

export const EDU_CATEGORIES = ['Marca', 'Redes', 'Ventas', 'Obra', 'Visual'] as const;
export type EduCategory = typeof EDU_CATEGORIES[number];

export interface ShopInfoEntry { why: string; riesgo: string; legal: string; }
export interface Obligacion { k: string; t: string; d: string; }
export interface FiscalModule {
  id: string; t: string; icon: string; min: number;
  intro: string; ejemplo: string;
  errores: string[]; checklist: string[]; recursos: string[];
}
export interface LegalFecha { date: string; t: string; }
export interface LegalDoc { name: string; k: string; }



/* Por qué cada tarea: se muestra en un icono de información del Plan */
export const TASK_INFO: Record<string, string> = {
  // Mes 1
  "t1-1": "Esta definición será la base de toda tu comunicación, tu posicionamiento y tu diferenciación frente a otros artistas.",
  "t1-2": "Tu estilo es lo que hace que una obra sea reconociblemente tuya. Definirlo te ayuda a ser coherente y memorable.",
  "t1-3": "Tus valores ayudan a crear coherencia en tus obras, mensajes y decisiones de negocio.",
  "t1-4": "Tu historia personal es lo que conecta emocionalmente con la gente. Es lo que recuerdan y comparten.",
  "t1-5": "El nombre será uno de los activos más importantes de tu identidad a largo plazo.",
  "t1-6": "Un moodboard es un tablero visual con imágenes, colores, texturas, tipografías y referencias que representan la esencia de tu marca. Sirve como guía para mantener coherencia visual en todas tus comunicaciones y decisiones creativas.",
  "t1-7": "Una paleta definida da unidad a todo lo que publicas y hace que tu marca se reconozca de un vistazo.",
  "t1-8": "El tono de comunicación es cómo «suenas». Decidirlo evita improvisar y mantiene tu voz reconocible.",
  "t1-9": "Pensar las colecciones desde el principio te da una hoja de ruta creativa y comercial, no obras sueltas.",
  // Mes 2
  "t2-1": "Las fotos son lo primero que ve un posible comprador. Una buena foto puede ser la diferencia entre vender o no.",
  "t2-2": "Mostrar el proceso genera cercanía y confianza: la gente compra al artista, no solo la obra.",
  "t2-3": "Tener un banco de contenido evita la presión de crear a diario y te permite publicar con constancia.",
  "t2-4": "Las plantillas dan coherencia visual y te ahorran horas cada semana.",
  "t2-6": "Un calendario editorial te permite planificar con calma y no depender de la inspiración del momento.",
  // Mes 3
  "t3-1": "Hacer público el perfil es el primer paso real hacia tus futuros clientes. No tiene que ser perfecto para empezar.",
  "t3-6": "Medir qué funciona te permite invertir tu energía donde de verdad conecta con la gente.",
  "t3-7": "Una rutina sostenible es más valiosa que un gran esfuerzo puntual: la constancia construye marca.",
  // Mes 4
  "t4-1": "La plataforma define costes, comisiones y cuánto control tienes. Es una decisión difícil de cambiar después.",
  "t4-3": "El precio comunica valor. Definirlo bien protege tu trabajo, tu tiempo y tu sostenibilidad.",
  "t4-7": "Estas páginas dan confianza y profesionalidad: responden a las dudas del comprador antes de que pregunte.",
  // Mes 5
  "t5-3": "La narrativa une las obras en una historia: convierte un conjunto de cuadros en una colección deseable.",
  "t5-5": "La lista de espera te da compradores calientes el día del lanzamiento y reduce la incertidumbre.",
  "t5-7": "El lanzamiento concentra la atención. Hacerlo con fecha y campaña multiplica tus posibilidades de vender.",
  // Mes 6
  "t6-1": "Revisar métricas con perspectiva te dice qué repetir y qué dejar de hacer el próximo trimestre.",
  "t6-6": "La newsletter es tu único canal que no depende de un algoritmo: hablas directamente con quien te sigue."
};

/* Tienda: por qué importa, riesgo y si es obligatorio legalmente */
export const SHOP_INFO: Record<string, ShopInfoEntry> = {
  "s1": { why: "La plataforma es la base de tu tienda: define comisiones, control y experiencia de compra.", riesgo: "Elegir mal puede obligarte a migrar todo más adelante, perdiendo tiempo y posicionamiento.", legal: "No obligatorio" },
  "s2": { why: "Aumenta la confianza de los clientes y fortalece tu marca.", riesgo: "Un dominio genérico transmite menos profesionalidad y es más difícil de recordar.", legal: "No obligatorio" },
  "s3": { why: "Sin catálogo no hay nada que vender: es el escaparate de tu obra.", riesgo: "Un catálogo incompleto o con malas fotos frena la decisión de compra.", legal: "No obligatorio" },
  "s4": { why: "Permite aceptar pagos de forma segura y profesional.", riesgo: "Sin una pasarela fiable puedes perder ventas o exponer datos de tus clientes.", legal: "No obligatorio" },
  "s5": { why: "Define qué cobras de envío y a dónde llegas. Evita sorpresas para ti y para el cliente.", riesgo: "Tarifas mal calculadas pueden hacer que pierdas dinero en cada envío.", legal: "No obligatorio" },
  "s6": { why: "Es una obligación legal en muchos casos y protege tanto al comprador como al vendedor.", riesgo: "No informar del derecho de desistimiento puede acarrear sanciones y reclamaciones.", legal: "Obligatorio" },
  "s7": { why: "La página «Sobre mí» humaniza tu marca y genera la confianza que cierra la venta.", riesgo: "Sin ella, la tienda se siente impersonal y poco fiable.", legal: "No obligatorio" },
  "s8": { why: "La página de encargos abre una vía de ingresos a medida muy rentable para artistas.", riesgo: "Sin un proceso claro, los encargos generan confusión y trabajo no remunerado.", legal: "No obligatorio" },
  "s9": { why: "El email de bienvenida convierte una primera compra en una relación a largo plazo.", riesgo: "Perder ese primer contacto es perder la oportunidad de fidelizar.", legal: "No obligatorio" },
  "s10": { why: "Permite detectar errores antes de que los clientes reales los sufran.", riesgo: "Un fallo en el pago o el envío en una venta real daña tu reputación desde el primer día.", legal: "Recomendado" }
};

/* Obligaciones legales de una tienda online en España (informativo) */
export const OBLIGACIONES: Obligacion[] = [
  { k: "LSSI", t: "Ley de Servicios de la Sociedad de la Información", d: "Debes identificarte como vendedora (nombre/NIF, contacto) y dar información clara de productos y precios." },
  { k: "RGPD", t: "Protección de datos", d: "Si recoges datos (emails, direcciones), necesitas consentimiento y explicar cómo los tratas y guardas." },
  { k: "Privacidad", t: "Política de privacidad", d: "Página obligatoria que explica qué datos recoges, para qué y los derechos del usuario." },
  { k: "Cookies", t: "Aviso de cookies", d: "Si usas cookies de analítica o terceros, necesitas un banner de consentimiento y una política de cookies." },
  { k: "Condiciones", t: "Condiciones de compra", d: "Definen el proceso de pedido, pago, plazos y responsabilidades. Dan seguridad jurídica a ambas partes." },
  { k: "Desistimiento", t: "Derecho de desistimiento", d: "El cliente puede devolver en 14 días sin justificación (con excepciones, p. ej. encargos personalizados)." }
];

/* Preguntas para la asesoría (ampliadas) */
export const LEGAL_PREGUNTAS: string[] = [
  "¿Me conviene empezar como autónoma desde el primer momento?",
  "¿Puedo vender cuadros antes de darme de alta?",
  "¿Me conviene la tarifa plana de autónomos al empezar?",
  "¿Qué gastos del estudio puedo deducir?",
  "¿Puedo deducir materiales artísticos?",
  "¿Puedo desgravar parte de mi vivienda si trabajo desde casa?",
  "¿Cómo tributan las ventas internacionales?",
  "¿Cómo facturo a clientes fuera de España?",
  "¿Cómo funciona el IVA en la Unión Europea?",
  "¿Qué ocurre si vendo una obra original a un cliente extranjero?",
  "¿Qué obligaciones tengo si vendo productos digitales?",
  "¿Necesito registrar mi marca?",
  "¿Necesito seguro de responsabilidad civil?",
  "¿Cómo debo gestionar los envíos internacionales?",
  "¿Qué impuestos debo presentar cada trimestre?",
  "¿Qué impuestos debo presentar cada año?",
  "¿Cómo debo guardar las facturas?",
  "¿Qué forma jurídica me recomendarías para crecer en el futuro?",
  "¿Existen ayudas o subvenciones para artistas y emprendedoras?"
];

/* Academia fiscal — 10 módulos */
export const FISCAL_MODULES: FiscalModule[] = [
  {
    id: "f1", t: "Qué significa ser autónoma", icon: "user", min: 6,
    intro: "Ser autónoma significa darte de alta para ejercer una actividad económica por cuenta propia. Implica obligaciones (cuota, impuestos, facturas) pero también te permite facturar legalmente y deducir gastos.",
    ejemplo: "Inés vende su primer cuadro a un particular. Para emitir factura y cobrarlo legalmente, necesita estar dada de alta como autónoma en Hacienda (036/037) y en la Seguridad Social (RETA).",
    errores: ["Creer que «como vendo poco no hace falta darme de alta».", "Confundir el alta en Hacienda con el alta de autónoma: son dos trámites distintos.", "No informarse de la tarifa plana, que reduce mucho la cuota los primeros meses."],
    checklist: ["Sé qué es el RETA y la cuota de autónomos.", "Sé qué es la tarifa plana y si me aplica.", "Distingo el alta en Hacienda del alta en Seguridad Social."],
    recursos: ["Sede electrónica de la Seguridad Social", "Guía de tarifa plana para nuevos autónomos"]
  },
  {
    id: "f2", t: "Qué es el IVA", icon: "doc", min: 7,
    intro: "El IVA es un impuesto sobre el consumo que añades a tus facturas y luego ingresas a Hacienda. Tú actúas de intermediaria: lo cobras al cliente y lo declaras.",
    ejemplo: "Inés vende un cuadro por 500 €. Si aplica un 21% de IVA, factura 605 € y los 105 € de IVA no son suyos: los declara y los ingresa a Hacienda.",
    errores: ["Gastar el IVA cobrado como si fuera ingreso propio.", "No saber qué tipo de IVA aplica a la venta de obra original.", "Olvidar que también puedes deducir el IVA de tus compras."],
    checklist: ["Entiendo que el IVA cobrado no es mi dinero.", "Sé en qué modelo se declara (303 trimestral).", "Sé que puedo deducir el IVA de mis gastos."],
    recursos: ["Modelo 303 — Agencia Tributaria", "Tipos de IVA aplicables"]
  },
  {
    id: "f3", t: "Qué es el IRPF", icon: "trending", min: 6,
    intro: "El IRPF es el impuesto sobre tu beneficio (ingresos menos gastos). Como autónoma, haces pagos a cuenta a lo largo del año y ajustas en la declaración anual.",
    ejemplo: "Si Inés gana 12.000 € y tiene 3.000 € de gastos, tributa sobre 9.000 € de beneficio. En sus facturas a empresas suele incluir una retención de IRPF.",
    errores: ["Confundir ingresos con beneficio.", "No reservar dinero para el IRPF y llevarse un susto en la declaración.", "No aplicar retención cuando corresponde."],
    checklist: ["Sé que el IRPF grava el beneficio, no la facturación.", "Sé qué es una retención de IRPF en factura.", "Reservo un % de cada venta para impuestos."],
    recursos: ["Modelo 130 — pago fraccionado", "Calculadora de retenciones"]
  },
  {
    id: "f4", t: "Cómo funcionan las facturas", icon: "doc", min: 5,
    intro: "La factura es el documento legal de cada venta. Debe incluir tus datos, los del cliente, número correlativo, fecha, concepto, base, IVA y total.",
    ejemplo: "Inés crea la factura 2026-001 por «Cuadro óleo 60×50», base 500 €, IVA 21% (105 €), total 605 €. La siguiente venta será la 2026-002.",
    errores: ["Saltarse la numeración correlativa.", "No guardar copia de cada factura emitida y recibida.", "Olvidar los datos fiscales del cliente cuando es empresa."],
    checklist: ["Mi factura incluye todos los datos obligatorios.", "Numero las facturas de forma correlativa.", "Guardo todas las facturas emitidas y recibidas."],
    recursos: ["Plantilla de factura", "Requisitos legales de una factura"]
  },
  {
    id: "f5", t: "Gastos deducibles", icon: "list", min: 7,
    intro: "Un gasto deducible es el que está vinculado a tu actividad y reduce el beneficio sobre el que pagas impuestos. Debe estar justificado con factura a tu nombre.",
    ejemplo: "Inés deduce óleos, lienzos, marcos, la web, parte del móvil y, si cumple requisitos, un porcentaje de los suministros de su estudio en casa.",
    errores: ["Deducir gastos personales sin relación con la actividad.", "Guardar tickets en vez de facturas con tus datos.", "No conservar los justificantes el tiempo legal exigido."],
    checklist: ["Sé qué es un gasto «afecto a la actividad».", "Pido siempre factura a mi nombre.", "Conservo los justificantes."],
    recursos: ["Lista de gastos deducibles para autónomos", "Deducción por trabajar desde casa"]
  },
  {
    id: "f6", t: "Calendario fiscal básico", icon: "calendar", min: 5,
    intro: "Hacienda tiene fechas fijas de presentación cada trimestre y al cierre del año. Conocerlas evita recargos y sanciones por presentar tarde.",
    ejemplo: "El IVA del primer trimestre (enero-marzo) se presenta en abril. El resumen anual de IVA se presenta en enero del año siguiente.",
    errores: ["Presentar fuera de plazo y pagar recargo.", "No anotar las fechas en un calendario.", "Dejar la documentación para el último día."],
    checklist: ["Conozco los meses de presentación trimestral.", "Tengo las fechas en mi calendario.", "Preparo la documentación con antelación."],
    recursos: ["Calendario del contribuyente — AEAT"]
  },
  {
    id: "f7", t: "Obligaciones trimestrales", icon: "clock", min: 6,
    intro: "Cada trimestre presentas, por lo general, el IVA (modelo 303) y el pago fraccionado de IRPF (modelo 130), aunque no hayas tenido ventas.",
    ejemplo: "En abril, julio, octubre y enero, Inés presenta el 303 y el 130 del trimestre anterior, aunque algún trimestre haya vendido poco.",
    errores: ["No presentar un trimestre «porque no he vendido».", "Mezclar gastos de distintos trimestres.", "No cuadrar lo declarado con tus facturas."],
    checklist: ["Sé qué modelos presento cada trimestre.", "Presento aunque el resultado sea cero.", "Reviso que cuadra con mis facturas."],
    recursos: ["Modelo 303", "Modelo 130"]
  },
  {
    id: "f8", t: "Obligaciones anuales", icon: "flag", min: 5,
    intro: "Al cerrar el año presentas los resúmenes anuales (IVA y, si procede, retenciones) y la declaración de la renta con el resultado de tu actividad.",
    ejemplo: "En enero Inés presenta el resumen anual de IVA (390) y en primavera incluye su actividad en la Renta junto al resto de sus ingresos.",
    errores: ["Olvidar el resumen anual de IVA.", "No conciliar los trimestres con el anual.", "No incluir la actividad en la declaración de la renta."],
    checklist: ["Sé qué resúmenes anuales me corresponden.", "Concilio los cuatro trimestres.", "Incluyo mi actividad en la Renta."],
    recursos: ["Modelo 390 — resumen anual de IVA", "Campaña de la Renta"]
  },
  {
    id: "f9", t: "Cómo guardar documentación", icon: "box", min: 4,
    intro: "Debes conservar facturas, justificantes y declaraciones durante los años que marca la ley (generalmente 4, hasta 6 por contabilidad). Mejor en digital y ordenado.",
    ejemplo: "Inés guarda cada factura en una carpeta por año y trimestre, con copia en la nube, para encontrarla rápido si Hacienda la pide.",
    errores: ["Acumular papeles sin orden.", "No tener copia de seguridad digital.", "Tirar facturas antes de tiempo."],
    checklist: ["Tengo un sistema de carpetas por año/trimestre.", "Hago copia de seguridad digital.", "Conservo todo el tiempo legal exigido."],
    recursos: ["Plazos de conservación de documentos", "Apps de gestión documental"]
  },
  {
    id: "f10", t: "Vender arte online: conceptos clave", icon: "shop", min: 7,
    intro: "Vender por internet añade matices fiscales: IVA según el país del comprador, facturación intracomunitaria, productos digitales y umbrales de venta a la UE.",
    ejemplo: "Si Inés vende una obra a un particular en Francia, puede haber reglas distintas de IVA. Para una empresa de otro país de la UE, la facturación intracomunitaria cambia.",
    errores: ["Aplicar siempre el IVA español sin mirar el país del comprador.", "No registrarse en el ROI si vende a empresas de la UE.", "Ignorar las reglas de productos digitales."],
    checklist: ["Sé que el IVA puede variar según el país del comprador.", "He preguntado a la asesoría por la venta a la UE.", "Distingo venta a particular de venta a empresa."],
    recursos: ["IVA en el comercio electrónico — AEAT", "Registro de Operadores Intracomunitarios (ROI)"]
  }
];

/* Subtítulos cortos por tarea (visibles bajo el título) */
export const TASK_SUB: Record<string, string> = {
  "t1-1": "Clarificamos tu esencia, tu mensaje y lo que te hace única.",
  "t1-2": "Definimos tu lenguaje visual y tus características distintivas.",
  "t1-3": "Tus valores guían cada decisión de tu marca y tu comunicación.",
  "t1-4": "Contamos tu historia para que conecte y genere confianza.",
  "t1-5": "Un nombre claro y memorable que represente tu universo.",
  "t1-6": "Definimos la dirección visual de tu marca de forma estratégica.",
  "t1-7": "Elegimos colores que transmitan tu esencia y conecten con tu público.",
  "t1-8": "Cómo «suenas» al escribir: tu voz reconocible en cada mensaje.",
  "t1-9": "Primeras ideas de series para tener una hoja de ruta creativa.",
  "t2-1": "Buenas fotos: lo primero que ve quien podría comprarte.",
  "t2-2": "Mostrar el proceso genera cercanía y confianza.",
  "t2-3": "Acumula piezas para publicar con constancia sin agobios.",
  "t2-4": "Plantillas que dan coherencia visual y te ahorran horas.",
  "t2-5": "Una biografía que diga quién eres y qué encontrarán.",
  "t2-6": "Planifica con calma, sin depender de la inspiración del día.",
  "t2-7": "Tres reels listos para arrancar con fuerza.",
  "t2-8": "Un dossier que te presente con profesionalidad.",
  "t3-1": "El primer paso real hacia tus futuros clientes.",
  "t3-2": "Las publicaciones que dicen quién eres y qué haces.",
  "t3-3": "Enseña cómo nace cada obra entre bambalinas.",
  "t3-4": "Comparte tu camino: es lo que la gente recuerda.",
  "t3-5": "Muestra tus obras con su contexto y su historia.",
  "t3-6": "Aprende qué conecta para invertir bien tu energía.",
  "t3-7": "Una rutina sostenible vale más que un esfuerzo puntual.",
  "t4-1": "Define costes, comisiones y control de tu tienda.",
  "t4-2": "El escaparate de tu obra, ordenado y atractivo.",
  "t4-3": "El precio comunica valor y protege tu trabajo.",
  "t4-4": "Qué cobras de envío y a dónde llegas, sin sorpresas.",
  "t4-5": "Protege al comprador y a ti; en muchos casos es obligatorio.",
  "t4-6": "Textos que enamoran y resuelven dudas antes de comprar.",
  "t4-7": "Las páginas que dan confianza y profesionalidad.",
  "t4-8": "Convierte una primera compra en una relación duradera.",
  "t5-1": "Reúne las obras que formarán tu primer lanzamiento.",
  "t5-2": "Decide cuántas piezas tendrá la colección.",
  "t5-3": "La historia que une las obras y las hace deseables.",
  "t5-4": "Calienta a tu audiencia antes del gran día.",
  "t5-5": "Compradores listos el día del lanzamiento.",
  "t5-6": "Anuncia la fecha y concentra la atención.",
  "t5-7": "Abre la venta con todo preparado.",
  "t5-8": "Mira qué funcionó para repetirlo y mejorarlo.",
  "t6-1": "Revisa los datos con perspectiva, sin obsesionarte.",
  "t6-2": "Mejora lo que ya conecta con tu público.",
  "t6-3": "Ajusta precios según lo aprendido.",
  "t6-4": "Prints y ediciones para llegar a más bolsillos.",
  "t6-5": "Una vía de ingresos a medida muy rentable.",
  "t6-6": "Tu canal directo, sin depender del algoritmo.",
  "t6-7": "Planifica las próximas colecciones con calma."
};

export const TASK_ICON: Record<string, string> = {
  "t1-1": "target", "t1-2": "star", "t1-3": "heart", "t1-4": "book", "t1-5": "edit",
  "t1-6": "grid", "t1-7": "palette", "t1-8": "social", "t1-9": "obras",
  "t2-1": "obras", "t2-2": "social", "t2-3": "box", "t2-4": "grid", "t2-5": "edit",
  "t2-6": "calendar", "t2-7": "social", "t2-8": "doc",
  "t3-1": "eye", "t3-2": "sparkle", "t3-3": "social", "t3-4": "book", "t3-5": "obras",
  "t3-6": "trending", "t3-7": "calendar",
  "t4-1": "shop", "t4-2": "grid", "t4-3": "trending", "t4-4": "box", "t4-5": "box",
  "t4-6": "edit", "t4-7": "doc", "t4-8": "mail",
  "t5-1": "obras", "t5-2": "list", "t5-3": "book", "t5-4": "sparkle", "t5-5": "mail",
  "t5-6": "calendar", "t5-7": "flag", "t5-8": "trending",
  "t6-1": "trending", "t6-2": "social", "t6-3": "trending", "t6-4": "grid", "t6-5": "heart",
  "t6-6": "mail", "t6-7": "calendar"
};

export const SHOP_ICON: Record<string, string> = {
  "s1": "shop", "s2": "social", "s3": "grid", "s4": "legal", "s5": "box",
  "s6": "doc", "s7": "heart", "s8": "edit", "s9": "mail", "s10": "check"
};

/* Legal — fechas, documentos, subtítulos e iconos */
export const LEGAL_FECHAS: LegalFecha[] = [
  { date: "2 sep", t: "Presentación trimestral de IVA (modelo 303)" },
  { date: "30 ago", t: "Pago fraccionado de IRPF (modelo 130)" },
  { date: "20 ago", t: "Resumen y revisión del trimestre" },
  { date: "1 jul", t: "Cierre de la campaña de la Renta" }
];
export const LEGAL_DOCS: LegalDoc[] = [
  { name: "Plantilla factura.pdf", k: "Facturación" },
  { name: "Modelo 036 ejemplo.pdf", k: "Altas" },
  { name: "Guía gastos deducibles.pdf", k: "Deducciones" }
];
export const LEGAL_SUB: Record<string, string> = {
  "l1": "Llega con todo preparado a tu primera reunión.",
  "l2": "El alta para ejercer tu actividad ante Hacienda.",
  "l3": "Tu cotización a la Seguridad Social como autónoma.",
  "l4": "Cuándo y cómo aplicar el IVA en tus facturas.",
  "l5": "Las retenciones que aparecen en tus facturas.",
  "l6": "Una plantilla lista según la normativa.",
  "l7": "Lo que puedes deducir legalmente de tu actividad."
};
export const LEGAL_ICON: Record<string, string> = {
  "l1": "phone", "l2": "doc", "l3": "user", "l4": "legal", "l5": "trending",
  "l6": "edit", "l7": "list"
};

