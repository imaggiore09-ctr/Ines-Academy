/* ATELIER — datos semilla + almacén con persistencia (localStorage) */
(function () {
  const T = (id, title, priority, status, due, notes, resources) => ({
    id, title, priority: priority || "media", status: status || "pendiente",
    due: due || "", notes: notes || "", resources: resources || []
  });

  const MONTHS = [
    {
      id: "m1", n: 1, name: "Identidad artística y marca",
      window: "Sep", range: "1 – 30 sep",
      objective: "Definir quién es Inés como artista y sentar las bases de la marca: nombre, valores, estilo y paleta.",
      reflection: [
        "Si tu obra hablara por ti en una frase, ¿qué diría?",
        "¿Qué tres palabras quieres que la gente sienta al ver tu trabajo?",
        "¿Qué te diferencia de otros artistas que admiras?"
      ],
      tasks: [
        T("t1-1","Definir quién soy como artista","alta","completada","2026-09-04","Escribir un párrafo en primera persona.",["Plantilla: manifiesto de artista"]),
        T("t1-2","Definir mi estilo artístico","alta","completada","2026-09-07","",["Moodboard de referencia"]),
        T("t1-3","Definir mis valores","alta","en progreso","2026-09-10","Honestidad, materia, lentitud, lo doméstico.",[]),
        T("t1-4","Escribir mi historia personal","media","en progreso","2026-09-14","",["Guion de storytelling"]),
        T("t1-5","Elegir el nombre de la marca","alta","pendiente","2026-09-16","Decisión pendiente: ¿nombre propio o estudio?",["Comprobador de dominios"]),
        T("t1-6","Crear el moodboard","media","pendiente","2026-09-20","",["Tablero Pinterest privado"]),
        T("t1-7","Definir la paleta de colores","media","pendiente","2026-09-24","Blanco · negro · un rojo.",["Generador de paletas"]),
        T("t1-8","Definir el tono de comunicación","baja","pendiente","2026-09-27","",[]),
        T("t1-9","Esbozar las primeras colecciones","media","pendiente","2026-09-30","",[])
      ]
    },
    {
      id: "m2", n: 2, name: "Preparación visual y contenido",
      window: "Oct", range: "1 – 31 oct",
      objective: "Construir un banco de contenido y las plantillas visuales para arrancar en redes con material de sobra.",
      reflection: [
        "¿Qué parte de tu proceso es más bonita de mostrar?",
        "¿Qué imagen quieres que la gente recuerde de tu perfil?"
      ],
      tasks: [
        T("t2-1","Fotografiar las obras terminadas","alta","pendiente","2026-10-05","Luz natural, fondo neutro.",["Guía: fotografiar obra"]),
        T("t2-2","Grabar procesos creativos","alta","pendiente","2026-10-08","",[]),
        T("t2-3","Crear banco de contenido","alta","pendiente","2026-10-12","Mínimo 30 piezas.",[]),
        T("t2-4","Diseñar plantillas para Instagram","media","pendiente","2026-10-15","",["Kit de plantillas"]),
        T("t2-5","Escribir la biografía de Instagram","media","pendiente","2026-10-17","",[]),
        T("t2-6","Crear el calendario editorial","alta","pendiente","2026-10-20","",["Plantilla calendario"]),
        T("t2-7","Preparar los primeros reels","media","pendiente","2026-10-25","3 reels listos.",[]),
        T("t2-8","Crear la presentación de la artista","baja","pendiente","2026-10-30","",[])
      ]
    },
    {
      id: "m3", n: 3, name: "Lanzamiento en redes sociales",
      window: "Nov", range: "1 – 30 nov",
      objective: "Hacer público el perfil y establecer una rutina sostenible de publicación que cuente la historia de Inés.",
      reflection: [
        "¿Cómo sabrás que una publicación ha funcionado?",
        "¿Qué rutina puedes mantener sin agotarte?"
      ],
      tasks: [
        T("t3-1","Hacer público el perfil","alta","pendiente","2026-11-03","",[]),
        T("t3-2","Publicar contenido de presentación","alta","pendiente","2026-11-04","",[]),
        T("t3-3","Publicar proceso creativo","media","pendiente","2026-11-08","",[]),
        T("t3-4","Contar su historia","media","pendiente","2026-11-12","",[]),
        T("t3-5","Mostrar las primeras obras","alta","pendiente","2026-11-15","",[]),
        T("t3-6","Medir qué contenido funciona mejor","media","pendiente","2026-11-22","",["Panel de métricas"]),
        T("t3-7","Crear rutina semanal de publicación","alta","pendiente","2026-11-28","",[])
      ]
    },
    {
      id: "m4", n: 4, name: "Tienda online y estructura comercial",
      window: "Dic", range: "1 – 31 dic",
      objective: "Montar la tienda: plataforma, catálogo, precios, políticas y páginas clave listas para vender.",
      reflection: [
        "¿Qué experiencia quieres que tenga quien compre tu obra?",
        "¿Qué precio refleja el valor real de tu trabajo y tu tiempo?"
      ],
      tasks: [
        T("t4-1","Decidir la plataforma (Shopify / WooCommerce…)","alta","pendiente","2026-12-04","Decisión pendiente.",["Comparativa plataformas"]),
        T("t4-2","Crear el catálogo inicial","alta","pendiente","2026-12-09","",[]),
        T("t4-3","Definir los precios","alta","pendiente","2026-12-11","",["Guía: poner precio al arte"]),
        T("t4-4","Definir la política de envíos","media","pendiente","2026-12-14","",[]),
        T("t4-5","Definir la política de devoluciones","media","pendiente","2026-12-16","",[]),
        T("t4-6","Escribir los textos de producto","media","pendiente","2026-12-20","",[]),
        T("t4-7","Crear páginas: Sobre mí, Obras, Contacto, Encargos","alta","pendiente","2026-12-23","",[]),
        T("t4-8","Preparar el email de bienvenida","baja","pendiente","2026-12-28","",[])
      ]
    },
    {
      id: "m5", n: 5, name: "Primer lanzamiento",
      window: "Ene", range: "1 – 31 ene",
      objective: "Lanzar la primera colección con narrativa, lista de espera y campaña previa. Vender y analizar.",
      reflection: [
        "¿Qué historia une las obras de esta colección?",
        "¿Cómo quieres sentirte el día del lanzamiento?"
      ],
      tasks: [
        T("t5-1","Crear la primera colección","alta","pendiente","2027-01-06","",[]),
        T("t5-2","Definir el número de obras","media","pendiente","2027-01-08","",[]),
        T("t5-3","Crear la narrativa de la colección","alta","pendiente","2027-01-12","",[]),
        T("t5-4","Preparar la campaña previa","media","pendiente","2027-01-16","",[]),
        T("t5-5","Crear lista de espera","media","pendiente","2027-01-18","",["Formulario de espera"]),
        T("t5-6","Publicar la fecha de lanzamiento","alta","pendiente","2027-01-22","",[]),
        T("t5-7","Lanzar la venta","alta","pendiente","2027-01-26","",[]),
        T("t5-8","Analizar resultados","media","pendiente","2027-01-31","",[])
      ]
    },
    {
      id: "m6", n: 6, name: "Optimización y crecimiento",
      window: "Feb", range: "1 – 28 feb",
      objective: "Revisar métricas, mejorar lo que funciona y abrir nuevas vías: prints, encargos y newsletter.",
      reflection: [
        "¿Qué te ha funcionado mejor de lo esperado?",
        "¿Qué quieres dejar de hacer el próximo trimestre?"
      ],
      tasks: [
        T("t6-1","Revisar las métricas","media","pendiente","2027-02-04","",[]),
        T("t6-2","Mejorar el contenido","media","pendiente","2027-02-08","",[]),
        T("t6-3","Revisar y mejorar precios","baja","pendiente","2027-02-11","",[]),
        T("t6-4","Crear prints o ediciones limitadas","media","pendiente","2027-02-15","",[]),
        T("t6-5","Explorar encargos","media","pendiente","2027-02-18","",[]),
        T("t6-6","Crear la newsletter","alta","pendiente","2027-02-22","",["Guía: primera newsletter"]),
        T("t6-7","Planificar las siguientes colecciones","baja","pendiente","2027-02-28","",[])
      ]
    }
  ];

  const IDENTITY = {
    nombre: "", // nombre artístico — pendiente de decidir
    frase: "Pintura que mira lo doméstico con la calma de un dálmata al sol.",
    historia: "Inés lleva pintando desde niña. Estudió Bellas Artes y, tras años trabajando para otros, decide construir un proyecto propio donde la materia, el blanco y los pequeños gestos cotidianos son el centro.",
    valores: ["Honestidad", "Materia", "Lentitud", "Lo doméstico"],
    estilo: "Figuración serena, alto contraste, mucho blanco. Óleo y grafito.",
    temas: ["Interiores", "Animales", "Luz de mañana", "Objetos cotidianos"],
    inspiraciones: ["Vilhelm Hammershøi", "Cerámica japonesa", "Fotografía analógica"],
    paleta: ["#ffffff", "#161513", "#d62b1f", "#efedea"],
    tipografias: "Bodoni Moda · IBM Plex Mono",
    voz: "Cercana, honesta, sin artificios. Como una carta a una amiga.",
    siPalabras: ["calma", "materia", "honesto", "doméstico", "luz"],
    noPalabras: ["agresivo", "estridente", "saturado", "corporativo"]
  };

  const SOCIAL = {
    metrics: { seguidores: 0, alcance: 0, interacciones: 0, mensajes: 0,
               seguidoresGoal: 1000 },
    reels: ["Timelapse de una obra de principio a fin","La mezcla del rojo perfecto","Mi rincón del estudio a primera hora","Desembalar el material nuevo"],
    stories: ["Encuesta: ¿cuál de estas dos obras?","Detrás de cámara del secado","Pregunta abierta: ¿qué te transmite el blanco?"],
    carruseles: ["3 obras + su historia","Antes / después de un encargo","Mi paleta explicada"],
    frases: ["El blanco no es vacío, es espera.","Pinto despacio porque la materia no tiene prisa.","Cada obra empieza con una mancha."],
    guiones: ["Reel presentación: «Hola, soy Inés…» (15s)","Reel proceso: capas de óleo (30s)"],
    checklist: ["¿La foto está bien iluminada?","¿El texto cuenta una historia?","¿Hay llamada a la interacción?","¿Hashtags revisados?","¿Hora óptima de publicación?"],
    calendar: [
      { day: "2026-11-04", type: "Post", title: "Presentación" },
      { day: "2026-11-08", type: "Reel", title: "Proceso óleo" },
      { day: "2026-11-12", type: "Story", title: "Mi historia" },
      { day: "2026-11-15", type: "Carrusel", title: "Primeras obras" }
    ]
  };

  const OBRAS = [
    { id:"o1", nombre:"Mañana en la cocina", tecnica:"Óleo sobre lino", medidas:"60 × 50 cm", fecha:"2026-08-12", precio:680, estado:"fotografiada", coleccion:"Interiores", historia:"La luz que entra a las 8:00 sobre la mesa vacía." },
    { id:"o2", nombre:"Dálmata dormido", tecnica:"Óleo sobre tabla", medidas:"40 × 40 cm", fecha:"2026-08-28", precio:520, estado:"terminada", coleccion:"Animales", historia:"Un encargo que se volvió personal." },
    { id:"o3", nombre:"Mantel blanco", tecnica:"Grafito sobre papel", medidas:"30 × 24 cm", fecha:"2026-09-02", precio:240, estado:"en proceso", coleccion:"Interiores", historia:"" },
    { id:"o4", nombre:"Taza roja", tecnica:"Óleo sobre lino", medidas:"25 × 25 cm", fecha:"2026-09-15", precio:300, estado:"publicada", coleccion:"Objetos", historia:"El único punto de color de la serie." }
  ];

  const SHOP = {
    plataforma: "", // pendiente
    estado: "Planificación",
    checklist: [
      { id:"s1", t:"Elegir y contratar plataforma", done:false },
      { id:"s2", t:"Configurar dominio propio", done:false },
      { id:"s3", t:"Subir catálogo inicial", done:false },
      { id:"s4", t:"Configurar pasarela de pago", done:false },
      { id:"s5", t:"Configurar zonas y tarifas de envío", done:false },
      { id:"s6", t:"Redactar política de devoluciones", done:false },
      { id:"s7", t:"Crear página Sobre mí", done:false },
      { id:"s8", t:"Crear página Encargos", done:false },
      { id:"s9", t:"Email de bienvenida automático", done:false },
      { id:"s10", t:"Prueba de compra completa", done:false }
    ],
    paginas: ["Inicio","Sobre mí","Obras","Encargos","Contacto","Envíos y devoluciones"],
    textosPendientes: ["Descripción de «Mañana en la cocina»","Texto Sobre mí","FAQ de envíos"],
    faq: [
      { q:"¿Cómo se envían las obras?", a:"Embaladas a mano, mensajería con seguro." },
      { q:"¿Hacéis encargos?", a:"Sí, escríbeme a través de la página Encargos." }
    ]
  };

  const LEGAL = {
    checklist: [
      { id:"l1", t:"Reunión inicial con asesoría", done:false, group:"Asesoría" },
      { id:"l2", t:"Alta en Hacienda (modelo 036/037)", done:false, group:"Altas" },
      { id:"l3", t:"Alta de autónoma (RETA)", done:false, group:"Altas" },
      { id:"l4", t:"Entender obligaciones de IVA", done:false, group:"Impuestos" },
      { id:"l5", t:"Entender retenciones de IRPF", done:false, group:"Impuestos" },
      { id:"l6", t:"Plantilla de factura", done:false, group:"Facturación" },
      { id:"l7", t:"Lista de gastos deducibles", done:false, group:"Facturación" }
    ],
    preguntas: [
      "¿Me conviene la tarifa plana de autónomos al empezar?",
      "¿Qué gastos del estudio puedo deducir?",
      "¿Cómo facturo una venta fuera de España?",
      "¿Con qué periodicidad declaro el IVA?"
    ],
    ingresos: [
      { id:"i1", fecha:"2026-09-15", concepto:"Venta «Taza roja»", cat:"Venta obra", monto:300 },
      { id:"i2", fecha:"2026-08-30", concepto:"Encargo dálmata", cat:"Encargo", monto:520 }
    ],
    gastos: [
      { id:"g1", fecha:"2026-09-02", concepto:"Óleos y lino", cat:"Material", monto:142 },
      { id:"g2", fecha:"2026-09-10", concepto:"Marcos x3", cat:"Material", monto:96 },
      { id:"g3", fecha:"2026-08-20", concepto:"Sesión de fotos", cat:"Servicios", monto:120 }
    ]
  };

  const LEARN = [
    { id:"a1", t:"Cómo construir una marca personal artística", min:14, mods:6, done:true,  cat:"Marca" },
    { id:"a2", t:"Cómo contar una historia en redes", min:11, mods:5, done:false, cat:"Redes" },
    { id:"a3", t:"Cómo vender arte sin parecer agresiva", min:9,  mods:4, done:false, cat:"Ventas" },
    { id:"a4", t:"Cómo preparar una colección", min:12, mods:5, done:false, cat:"Obra" },
    { id:"a5", t:"Cómo poner precios a tu obra", min:10, mods:4, done:false, cat:"Ventas" },
    { id:"a6", t:"Cómo fotografiar tus obras", min:8,  mods:3, done:false, cat:"Visual" },
    { id:"a7", t:"Cómo hacer un lanzamiento", min:13, mods:5, done:false, cat:"Ventas" },
    { id:"a8", t:"Cómo crear una newsletter", min:9,  mods:4, done:false, cat:"Redes" },
    { id:"a9", t:"Cómo hablar con clientes", min:7,  mods:3, done:false, cat:"Ventas" }
  ];

  const REMINDERS = [
    { t:"Llamar a la asesoría para la primera reunión", due:"Esta semana", icon:"phone" },
    { t:"Comprar lino para la colección de interiores", due:"3 días", icon:"box" },
    { t:"Revisar referencias del moodboard con Cristina", due:"Mañana", icon:"heart" }
  ];

  const DECISIONS = [
    { t:"Nombre de la marca", detail:"¿Nombre propio «Inés de Cueto» o un estudio?", month:"Mes 1" },
    { t:"Plataforma de tienda", detail:"Shopify vs. WooCommerce vs. otra", month:"Mes 4" },
    { t:"Precio base de la colección", detail:"Rango por tamaño de obra", month:"Mes 5" }
  ];

  window.ATELIER_SEED = {
    MONTHS, IDENTITY, SOCIAL, OBRAS, SHOP, LEGAL, LEARN, REMINDERS, DECISIONS,
    currentMonthId: "m1"
  };
})();
