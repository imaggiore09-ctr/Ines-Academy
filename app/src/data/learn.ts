// Contenido formativo detallado de cada módulo de Aprendizaje.
// Cada módulo tiene una introducción, objetivos y lecciones completas.

export interface Lesson {
  t: string;
  duracion: number; // minutos
  contenido: string[]; // párrafos
  clave: string[]; // puntos clave / aprendizajes
  ejercicio: string; // ejercicio aplicado al proyecto de Inés
}

export interface LearnContent {
  intro: string;
  objetivos: string[];
  paraQuien: string;
  lessons: Lesson[];
}

export const LEARN_CONTENT: Record<string, LearnContent> = {
  /* ───────────────────────── a1 · Marca personal ───────────────────────── */
  a1: {
    intro:
      'Una marca personal artística no es un logo ni un nombre bonito: es la promesa coherente de lo que la gente siente cuando ve tu obra. En este módulo construyes esa promesa desde los cimientos, para que cada decisión posterior —redes, tienda, precios— parta de una base sólida y reconocible.',
    paraQuien: 'Para Inés, al inicio del proyecto, antes de publicar nada en público.',
    objetivos: [
      'Articular en una frase quién eres como artista y qué te diferencia.',
      'Traducir tus valores en decisiones visuales y de comunicación concretas.',
      'Crear un sistema de marca (nombre, paleta, tono) que puedas mantener seis meses.',
    ],
    lessons: [
      {
        t: 'Qué es de verdad una marca personal',
        duracion: 3,
        contenido: [
          'Marca es la suma de las percepciones que alguien tiene de ti antes incluso de hablar contigo. En el arte, esa percepción se construye con la obra, sí, pero también con cómo la presentas, qué cuentas alrededor y qué silencias.',
          'No confundas identidad visual (logo, colores, tipografías) con identidad de marca (valores, historia, voz, posición). Lo visual es la punta del iceberg; lo que sostiene la coherencia está debajo.',
          'Para una artista emergente, la marca personal cumple una función práctica: reduce el ruido. Cuando tienes claro quién eres, decides más rápido qué publicar, qué encargos aceptar y qué precio defender.',
        ],
        clave: [
          'Marca = percepción coherente, no decoración.',
          'Lo visual es consecuencia de los valores, no al revés.',
          'Una marca clara acelera todas tus decisiones.',
        ],
        ejercicio:
          'Escribe en una frase: "Soy una artista que ____, para personas que ____". No la pulas todavía; captura la primera versión honesta.',
      },
      {
        t: 'Tu esencia: valores y manifiesto',
        duracion: 4,
        contenido: [
          'Los valores son los principios que no negocias. En tu caso podrían ser la honestidad del material, la lentitud frente a lo inmediato, o lo doméstico como territorio noble. Elige tres o cuatro; más de cinco diluyen el mensaje.',
          'Un manifiesto de artista es un texto breve, en primera persona, que declara desde dónde creas. No describe técnicas: describe intenciones. Sirve de brújula cuando dudes y de texto base para tu "Sobre mí".',
          'El error habitual es escribir lo que suena bien en vez de lo que es verdad. La marca solo funciona si puedes sostenerla a diario sin actuar.',
        ],
        clave: [
          'Tres o cuatro valores, no diez.',
          'El manifiesto declara intenciones, no técnicas.',
          'Solo vale lo que puedes sostener sin fingir.',
        ],
        ejercicio:
          'Redacta un manifiesto de 4–6 frases empezando cada una por "Creo que…" o "Pinto porque…". Guárdalo en la pantalla de Identidad.',
      },
      {
        t: 'Diferenciación: el hueco que solo tú ocupas',
        duracion: 4,
        contenido: [
          'No necesitas ser la mejor del mundo; necesitas ser inconfundible en un terreno concreto. La diferenciación nace del cruce entre tu tema (qué pintas), tu mirada (cómo lo ves) y tu material (con qué lo haces).',
          'Estudia tres artistas que admiras y nombra en una frase qué los hace reconocibles. Después haz el mismo ejercicio contigo: si no sale, es señal de que tu propuesta aún es genérica.',
          'La diferenciación no es un eslogan de marketing: es una decisión creativa que limita y, al limitar, te da fuerza.',
        ],
        clave: [
          'Inconfundible > "el mejor".',
          'Diferenciación = tema × mirada × material.',
          'Limitar tu terreno te da identidad.',
        ],
        ejercicio:
          'Completa: "Mientras otros artistas pintan ____, yo pinto ____ porque ____." Esa última parte es tu diferencia real.',
      },
      {
        t: 'El nombre de la marca',
        duracion: 3,
        contenido: [
          'Tienes dos caminos: tu nombre propio (Inés de Cueto) o un nombre de estudio. El nombre propio conecta con la autoría y es difícil de copiar; el de estudio permite crecer hacia un equipo o una línea de producto.',
          'Criterios para decidir: que se pronuncie y escriba sin esfuerzo, que el dominio .com o .es esté libre, que el usuario de Instagram esté disponible y que no choque con marcas ya registradas.',
          'No te bloquees buscando la perfección. El nombre gana fuerza con el uso; uno correcto y disponible vale más que uno genial y ocupado.',
        ],
        clave: [
          'Nombre propio = autoría; estudio = escalable.',
          'Comprueba dominio + usuario + registro antes de decidir.',
          'Disponible y correcto gana a genial y ocupado.',
        ],
        ejercicio:
          'Haz una lista de 5 candidatos y comprueba dominio e Instagram de cada uno. Marca la decisión en la pantalla de Identidad.',
      },
      {
        t: 'Sistema visual: paleta y tipografía',
        duracion: 4,
        contenido: [
          'Un sistema visual mínimo y firme se reconoce mejor que uno rico y disperso. Empieza con una paleta de tres: un fondo (papel), un texto (tinta) y un acento (tu rojo). Esa restricción es marca.',
          'Elige dos familias tipográficas como máximo: una de carácter para titulares y números (una display tipo Bodoni) y una neutra para textos largos. La coherencia tipográfica transmite cuidado.',
          'Define dónde NO usar color. El espacio en blanco y la contención son parte del lenguaje editorial premium que buscas.',
        ],
        clave: [
          'Paleta de tres: fondo, texto, acento.',
          'Dos tipografías máximo.',
          'El blanco y la contención también comunican.',
        ],
        ejercicio:
          'Fija tu paleta de tres colores con sus códigos HEX y guárdala en Identidad. Anota una regla de "dónde nunca uso el rojo".',
      },
      {
        t: 'Mantener la coherencia en el tiempo',
        duracion: 3,
        contenido: [
          'La marca no se decide una vez: se sostiene. Crea un documento vivo (tu pantalla de Identidad) donde estén el manifiesto, los valores, la paleta y las palabras que sí y que no representan tu marca.',
          'Antes de publicar cualquier cosa, pásala por un filtro de tres preguntas: ¿suena a mí?, ¿respeta mi paleta?, ¿aporta a mi historia? Si falla una, edítala.',
          'La incoherencia no se nota en una pieza, se nota en el conjunto. La constancia discreta construye más marca que un golpe de efecto.',
        ],
        clave: [
          'La marca se sostiene, no se decide una vez.',
          'Filtro previo: ¿suena a mí?, ¿mi paleta?, ¿mi historia?',
          'La constancia discreta vence al golpe de efecto.',
        ],
        ejercicio:
          'Define tus listas de "palabras que SÍ" y "palabras que NO" representan la marca en la pantalla de Identidad.',
      },
    ],
  },

  /* ───────────────────────── a2 · Storytelling en redes ───────────────── */
  a2: {
    intro:
      'En redes no compite la mejor obra, compite la mejor historia bien contada. Este módulo te enseña a convertir tu proceso y tu mirada en narrativas que la gente quiere seguir, sin exponerte más de lo que te resulta cómodo.',
    paraQuien: 'Para Inés, durante la preparación de contenido y el lanzamiento del perfil.',
    objetivos: [
      'Identificar las historias que ya tienes y no estás contando.',
      'Estructurar publicaciones con principio, tensión y cierre.',
      'Sostener una voz reconocible sin agotarte.',
    ],
    lessons: [
      {
        t: 'Por qué la gente sigue historias, no productos',
        duracion: 2,
        contenido: [
          'El cerebro recuerda narrativas, no catálogos. Una obra acompañada de su porqué se queda; la misma obra como foto suelta se desliza y se olvida.',
          'Seguir a alguien es apostar por lo que vendrá. La historia es la promesa de que mañana habrá algo que merezca tu atención.',
        ],
        clave: [
          'Recordamos historias, no productos.',
          'Seguir = apostar por lo que viene.',
        ],
        ejercicio: 'Mira tus últimas 5 obras y escribe en una línea el porqué de cada una.',
      },
      {
        t: 'Las historias que ya tienes',
        duracion: 4,
        contenido: [
          'No necesitas inventar nada espectacular. Tienes material en el origen de una pieza, en un error que se volvió hallazgo, en por qué elegiste ese color, en el objeto cotidiano que te obsesiona.',
          'Haz inventario de microhistorias: el taller por la mañana, la compra del lino, la duda antes de firmar una obra. Lo pequeño y verdadero conecta más que lo grande y forzado.',
        ],
        clave: [
          'Lo cotidiano verdadero supera a lo épico forzado.',
          'Toda obra tiene origen, duda y decisión: ahí está la historia.',
        ],
        ejercicio: 'Lista 10 microhistorias de tu día a día en el estudio y guárdalas como banco de ideas en Redes.',
      },
      {
        t: 'La estructura de una buena publicación',
        duracion: 4,
        contenido: [
          'Una publicación que funciona tiene gancho (primera línea que detiene el scroll), desarrollo (la historia o la idea) y cierre (una reflexión o una pregunta que invita a responder).',
          'El gancho no es un truco: es prometer valor honesto en seis palabras. Evita los clickbaits que no cumples; erosionan la confianza que tanto cuesta.',
          'Cierra siempre invitando a algo pequeño: guardar, comentar una palabra, contarte su versión. La conversación alimenta el alcance mejor que el aplauso.',
        ],
        clave: [
          'Gancho + desarrollo + cierre.',
          'El gancho promete valor real, no engaña.',
          'Cierra invitando a una acción pequeña.',
        ],
        ejercicio: 'Escribe una publicación completa (gancho, desarrollo, cierre) sobre tu obra en proceso favorita.',
      },
      {
        t: 'Encontrar y sostener tu voz',
        duracion: 4,
        contenido: [
          'Tu voz es cómo suenas al escribir: cercana o distante, sobria o lúdica, breve o detallada. Defínela con tres adjetivos y revisa tus textos contra ellos.',
          'La voz se mantiene con plantillas mentales, no con esfuerzo heroico. Tener tres formatos fijos (proceso, idea, obra) reduce la fatiga de empezar de cero cada día.',
        ],
        clave: [
          'Define tu voz con tres adjetivos.',
          'Tres formatos fijos vencen al folio en blanco diario.',
        ],
        ejercicio: 'Elige tus 3 adjetivos de voz y reescribe un texto antiguo para que suene a ellos.',
      },
      {
        t: 'Calendario sin agobio',
        duracion: 3,
        contenido: [
          'Publicar bien y poco supera a publicar mucho y mal. Define una frecuencia que puedas mantener un trimestre entero, aunque sea dos veces por semana.',
          'Trabaja por lotes: graba y escribe varias piezas el mismo día con la misma energía. Separar producción de publicación es el secreto de la constancia sostenible.',
        ],
        clave: [
          'Frecuencia sostenible > frecuencia ambiciosa.',
          'Produce por lotes; publica programado.',
        ],
        ejercicio: 'Planifica 2 semanas de contenido en el calendario de Redes usando tu banco de microhistorias.',
      },
    ],
  },

  /* ───────────────────────── a3 · Vender sin agresividad ───────────────── */
  a3: {
    intro:
      'Vender arte no es presionar: es ayudar a la persona correcta a dar un paso que ya quiere dar. Este módulo te quita la culpa de cobrar y te da un método amable y firme para convertir interés en venta.',
    paraQuien: 'Para Inés, cuando empiece a recibir interés real por su obra.',
    objetivos: [
      'Desactivar la creencia de que vender es molestar.',
      'Crear llamadas a la acción claras y respetuosas.',
      'Acompañar a quien duda sin perseguir a quien no compra.',
    ],
    lessons: [
      {
        t: 'Vender es un acto de servicio',
        duracion: 2,
        contenido: [
          'Si crees en tu obra, ofrecerla es hacer un favor: pones al alcance de alguien algo que mejorará su espacio y su vida. La vergüenza de vender suele ser miedo al rechazo disfrazado.',
          'La persona que compra tu obra no pierde dinero: transforma dinero en algo que le importa. Tu trabajo es ayudarla a verlo, no convencerla a la fuerza.',
        ],
        clave: [
          'Ofrecer lo valioso es servir, no molestar.',
          'Comprar es transformar dinero en sentido.',
        ],
        ejercicio: 'Escribe 3 razones honestas por las que tener una obra tuya mejora la vida de alguien.',
      },
      {
        t: 'La llamada a la acción amable',
        duracion: 4,
        contenido: [
          'Una llamada a la acción (CTA) es decir con claridad qué puede hacer la persona ahora: "está disponible", "escríbeme para encargos", "queda una de la serie". Sin CTA, el interés se evapora.',
          'Amable no es tímida. "Por si te interesa, esta obra está a la venta; cualquier duda, aquí estoy" es claro y respetuoso a la vez.',
          'Repetir la CTA no es pesado si aportas valor entre medias. La gente necesita varios contactos antes de decidir.',
        ],
        clave: [
          'Sin CTA no hay venta: di qué hacer ahora.',
          'Claridad y respeto conviven.',
          'Repetir con valor de por medio no es presionar.',
        ],
        ejercicio: 'Redacta 3 CTAs distintas para la misma obra y elige la que más suena a ti.',
      },
      {
        t: 'Acompañar a quien duda',
        duracion: 4,
        contenido: [
          'La duda no es un no: suele ser falta de información o de confianza. Responde con calma a precio, envío, devoluciones y autenticidad antes de que pregunten.',
          'Ofrece opciones, no presión: una obra más pequeña, una reserva, un plan de pago. Dar caminos respeta el ritmo de cada persona.',
          'Si dicen que no, agradece y deja la puerta abierta. Un no de hoy es a menudo un sí de dentro de seis meses.',
        ],
        clave: [
          'Duda = falta de info o confianza, no rechazo.',
          'Ofrece opciones en vez de presión.',
          'Un no cuidado deja la puerta abierta.',
        ],
        ejercicio: 'Prepara respuestas tipo (precio, envío, devolución, autenticidad) para tener listas y serenas.',
      },
      {
        t: 'Precio, valor y la conversación del dinero',
        duracion: 3,
        contenido: [
          'Hablar de dinero con naturalidad transmite profesionalidad. Di el precio sin disculparte y sin justificarte de más; el titubeo siembra duda en el otro.',
          'Cuando expliques el valor, habla del tiempo, el material y la pieza única, no de tu necesidad de cobrar. El comprador paga por lo que recibe, no por tus facturas.',
        ],
        clave: [
          'Di el precio sin disculpas.',
          'Justifica con valor recibido, no con tu necesidad.',
        ],
        ejercicio: 'Practica en voz alta decir el precio de tu obra más cara tres veces, sin añadir excusas.',
      },
    ],
  },

  /* ───────────────────────── a4 · Preparar una colección ───────────────── */
  a4: {
    intro:
      'Una colección convierte obras sueltas en un cuerpo de trabajo deseable. Este módulo te ayuda a pensar en series con criterio narrativo y comercial, para que tu primer lanzamiento tenga fuerza de conjunto.',
    paraQuien: 'Para Inés, al planear su primera serie y su lanzamiento.',
    objetivos: [
      'Definir el hilo conductor de una colección.',
      'Decidir número, formatos y rango de precios coherentes.',
      'Construir una narrativa que una las piezas.',
    ],
    lessons: [
      {
        t: 'Qué hace que varias obras sean una colección',
        duracion: 3,
        contenido: [
          'Una colección no es "las obras que tengo": es un grupo unido por un hilo —un tema, una paleta, un formato, una pregunta—. Ese hilo es lo que la hace memorable y vendible.',
          'El hilo puede ser conceptual (la luz doméstica), formal (siempre 30×30) o material (solo grafito). Cuanto más claro, más fácil de comunicar y de coleccionar.',
        ],
        clave: [
          'Colección = obras unidas por un hilo claro.',
          'El hilo puede ser tema, formato o material.',
        ],
        ejercicio: 'Define en una frase el hilo conductor de tu primera colección.',
      },
      {
        t: 'Tamaño y formatos de la serie',
        duracion: 4,
        contenido: [
          'Para un primer lanzamiento, entre 6 y 12 piezas es manejable: suficiente para dar sensación de cuerpo, no tanto como para agotarte o saturar al público.',
          'Combina formatos con intención: piezas grandes ancla que marcan el precio alto, y piezas pequeñas accesibles que facilitan la primera compra. Esa escalera de precios amplía tu público.',
        ],
        clave: [
          '6–12 piezas para un primer lanzamiento.',
          'Mezcla piezas ancla y piezas accesibles.',
        ],
        ejercicio: 'Esboza tu serie: cuántas piezas, qué formatos y cuántas de cada tamaño.',
      },
      {
        t: 'La narrativa que une las piezas',
        duracion: 4,
        contenido: [
          'Escribe el texto de colección: de dónde nace, qué explora, qué quieres que sienta quien la mire. Ese texto es tan parte de la obra como los cuadros.',
          'Pon título a la colección y, si tiene sentido, a cada pieza. Los títulos son ganchos de memoria y abren conversación.',
          'La narrativa convierte un conjunto de cuadros en una experiencia; eso es lo que eleva el valor percibido.',
        ],
        clave: [
          'El texto de colección es parte de la obra.',
          'Los títulos abren conversación y memoria.',
          'La narrativa eleva el valor percibido.',
        ],
        ejercicio: 'Escribe el título y el texto de presentación (5–8 frases) de tu colección.',
      },
      {
        t: 'Coherencia visual del conjunto',
        duracion: 2,
        contenido: [
          'Cuando fotografíes y presentes la serie, mantén fondo, luz y encuadre constantes. La coherencia de presentación refuerza la sensación de colección sólida.',
          'Decide un orden de lectura: por dónde quieres que entre el ojo. En la web y en redes, ese orden cuenta la historia.',
        ],
        clave: [
          'Misma luz, fondo y encuadre en toda la serie.',
          'Decide el orden de lectura del conjunto.',
        ],
        ejercicio: 'Define las reglas de fotografía de tu serie y el orden en que mostrarás las piezas.',
      },
      {
        t: 'Del taller al lanzamiento',
        duracion: 3,
        contenido: [
          'Planifica hacia atrás desde la fecha de lanzamiento: cuándo tienen que estar pintadas, fotografiadas, con texto y subidas. Reserva margen para imprevistos.',
          'No esperes a tener todo perfecto para empezar a contar el proceso. Mostrar la colección naciendo crea expectación y compradores antes del día clave.',
        ],
        clave: [
          'Planifica hacia atrás desde la fecha de lanzamiento.',
          'Cuenta el proceso para crear expectación.',
        ],
        ejercicio: 'Crea en el Plan las tareas con fechas para tener la colección lista el día de lanzamiento.',
      },
    ],
  },

  /* ───────────────────────── a5 · Poner precios ────────────────────────── */
  a5: {
    intro:
      'El precio es comunicación: dice cuánto vale tu trabajo y filtra a tu público. Este módulo te da un método para poner precios con criterio, defenderlos sin culpa y subirlos con el tiempo.',
    paraQuien: 'Para Inés, antes de publicar la tienda y la primera colección.',
    objetivos: [
      'Calcular un precio base con método, no a ojo.',
      'Construir una escala de precios coherente.',
      'Entender cómo y cuándo subir precios.',
    ],
    lessons: [
      {
        t: 'Qué comunica un precio',
        duracion: 2,
        contenido: [
          'Un precio demasiado bajo no atrae más compradores: siembra dudas sobre la calidad y atrae a quien no valora la obra. El precio posiciona.',
          'El precio también te protege: defiende tu tiempo, tu material y tu sostenibilidad como artista. Cobrar bien es poder seguir creando.',
        ],
        clave: [
          'Precio bajo siembra dudas, no atrae.',
          'Cobrar bien sostiene tu carrera.',
        ],
        ejercicio: 'Anota qué sientes al pensar en subir tus precios; nombrar el bloqueo es el primer paso.',
      },
      {
        t: 'Método de cálculo del precio base',
        duracion: 5,
        contenido: [
          'Un punto de partida común: (coste de materiales) + (horas × tu tarifa por hora) + margen. A eso se suma el factor de tamaño y, con el tiempo, el factor de demanda y trayectoria.',
          'Otra referencia habitual en pintura es el precio por superficie: un importe por centímetro cuadrado o por punto de tamaño, que mantiene coherencia entre formatos.',
          'No copies precios de artistas consagrados ni regales por inseguridad. Busca un número que puedas defender con calma y repetir sin dudar.',
        ],
        clave: [
          'Precio = materiales + tiempo + margen (+ tamaño/demanda).',
          'El precio por superficie da coherencia entre formatos.',
          'Elige un número que puedas defender sin titubear.',
        ],
        ejercicio: 'Calcula el precio base de una obra mediana con la fórmula y compáralo con tu intuición.',
      },
      {
        t: 'La escala de precios',
        duracion: 4,
        contenido: [
          'Ofrece una escalera: piezas pequeñas accesibles, medianas (tu grueso) y grandes ancla. Tener entrada barata facilita la primera compra; el ancla alto hace que el resto parezca razonable.',
          'Los prints o ediciones limitadas amplían la base sin canibalizar la obra original, siempre que dejes clara la diferencia de valor.',
        ],
        clave: [
          'Escalera: accesible · grueso · ancla.',
          'Prints amplían público sin restar al original.',
        ],
        ejercicio: 'Diseña tu escala de precios con 3 niveles y un ejemplo de obra en cada uno.',
      },
      {
        t: 'Subir precios con el tiempo',
        duracion: 3,
        contenido: [
          'Los precios suben cuando sube la demanda, mejora tu trayectoria o se agotan series. Subir es señal de salud, no de codicia.',
          'Avisa con naturalidad ("a partir de la próxima colección, los precios se ajustan") y respeta lo prometido a quien ya tenía un compromiso. La coherencia construye confianza.',
        ],
        clave: [
          'Sube por demanda, trayectoria o escasez.',
          'Avisa con naturalidad y respeta compromisos previos.',
        ],
        ejercicio: 'Define tu criterio de subida: ¿cada cuánto y por qué razones subirás precios?',
      },
    ],
  },

  /* ───────────────────────── a6 · Fotografiar obra ─────────────────────── */
  a6: {
    intro:
      'La foto es lo primero —y a veces lo único— que verá un comprador. Una mala foto hunde una gran obra; una buena foto vende. Este módulo te da lo esencial para fotografiar tu trabajo con dignidad usando lo que ya tienes.',
    paraQuien: 'Para Inés, al preparar el banco de contenido y el catálogo.',
    objetivos: [
      'Conseguir color y luz fieles a la obra real.',
      'Eliminar reflejos, sombras y distorsión.',
      'Crear un set repetible para series coherentes.',
    ],
    lessons: [
      {
        t: 'Luz: la decisión que más importa',
        duracion: 4,
        contenido: [
          'La luz natural indirecta —cerca de una ventana grande, sin sol directo— es la mejor amiga del arte. Da color fiel y sombras suaves sin equipo caro.',
          'Evita mezclar fuentes de luz (ventana + bombilla cálida): crea dominantes de color difíciles de corregir. Apaga las luces de casa y trabaja solo con la ventana.',
          'Los días nublados son ideales: la nube actúa de difusor gigante y reparte la luz de forma uniforme.',
        ],
        clave: [
          'Luz natural indirecta, nunca sol directo.',
          'No mezcles fuentes de luz.',
          'El día nublado es un estudio gratis.',
        ],
        ejercicio: 'Fotografía la misma obra con luz de ventana y con bombilla; compara la fidelidad del color.',
      },
      {
        t: 'Encuadre, fondo y reflejos',
        duracion: 4,
        contenido: [
          'Coloca la obra paralela a la cámara para evitar distorsión (que los lados se vean torcidos). Cámara y centro de la obra a la misma altura.',
          'Fondo neutro y limpio: una pared blanca o un cartón gris. El fondo no debe competir con la obra.',
          'Para obra con barniz o cristal, gira ligeramente la pieza o la luz hasta que desaparezca el reflejo. Nunca dispares de frente a una superficie brillante.',
        ],
        clave: [
          'Obra paralela a la cámara: sin distorsión.',
          'Fondo neutro que no compita.',
          'Gira pieza o luz para matar reflejos.',
        ],
        ejercicio: 'Monta un set con pared neutra y dispara una obra cuidando paralelismo y reflejos.',
      },
      {
        t: 'Edición fiel y set repetible',
        duracion: 4,
        contenido: [
          'Edita para parecerte a la realidad, no para embellecer de más. Ajusta encuadre, endereza, corrige el balance de blancos hasta que el blanco real se vea blanco, y nivela exposición. Nada de filtros.',
          'Guarda tus ajustes y la disposición del set (posición de ventana, altura de cámara, distancia). Repetir el mismo set en toda una serie da una coherencia que se nota como profesionalidad.',
          'Exporta en alta resolución para impresión y una versión ligera para web. Nómbralas con el título de la obra para no perderte.',
        ],
        clave: [
          'Edita hacia la fidelidad, sin filtros.',
          'Set repetible = serie coherente.',
          'Guarda alta resolución + versión web nombradas.',
        ],
        ejercicio: 'Define y anota tu "receta de set" para reutilizarla en toda la colección.',
      },
    ],
  },

  /* ───────────────────────── a7 · Lanzamiento ──────────────────────────── */
  a7: {
    intro:
      'Un lanzamiento concentra la atención en una fecha y multiplica tus ventas frente a publicar obras sueltas. Este módulo te da la estructura de un lanzamiento sereno: antes, durante y después.',
    paraQuien: 'Para Inés, al sacar su primera colección al público.',
    objetivos: [
      'Construir expectación antes del día clave.',
      'Ejecutar el día de apertura con todo listo.',
      'Aprovechar el después para fidelizar y aprender.',
    ],
    lessons: [
      {
        t: 'Anatomía de un lanzamiento',
        duracion: 3,
        contenido: [
          'Un lanzamiento tiene tres fases: calentamiento (creas expectación), apertura (abres la venta) y cierre (das un empujón final y agradeces). Saltarse el calentamiento es el error más común.',
          'La venta no empieza el día de apertura: empieza semanas antes, cuando la gente conoce la colección que viene y decide que la quiere.',
        ],
        clave: [
          'Tres fases: calentamiento, apertura, cierre.',
          'La venta empieza antes del día clave.',
        ],
        ejercicio: 'Fija la fecha de lanzamiento y marca en el calendario las tres fases.',
      },
      {
        t: 'Calentamiento: crear expectación',
        duracion: 4,
        contenido: [
          'Durante las dos o tres semanas previas, muestra el proceso: detalles, dudas, el porqué de la serie. No enseñes todo; deja preguntas abiertas que generen ganas.',
          'Crea una lista de espera o de avisos: quien se apunta es tu comprador más caliente. Recoger correos antes del día es lo que convierte expectación en ventas.',
          'Anuncia la fecha con claridad y repítela. La gente necesita verla varias veces para reservarla.',
        ],
        clave: [
          'Muestra proceso, no todo: deja preguntas abiertas.',
          'Lista de espera = compradores calientes.',
          'Anuncia y repite la fecha.',
        ],
        ejercicio: 'Diseña una lista de espera y planifica 5 publicaciones de calentamiento.',
      },
      {
        t: 'El día de apertura',
        duracion: 4,
        contenido: [
          'Ten todo probado de antemano: enlaces que funcionan, pago que funciona, fotos y textos subidos, envío definido. Una compra fallida el día clave duele doble.',
          'Avisa primero a la lista de espera, con un margen de ventaja. Premiar a quien te siguió de cerca refuerza la relación.',
          'Comunica varias veces durante el día: apertura, "ya hay piezas reservadas", "quedan pocas". La urgencia honesta acelera decisiones.',
        ],
        clave: [
          'Prueba todo antes: enlaces, pago, envío.',
          'La lista de espera entra primero.',
          'Comunica el progreso durante el día.',
        ],
        ejercicio: 'Haz una compra de prueba completa en tu tienda y corrige lo que falle.',
      },
      {
        t: 'Escasez y urgencia honestas',
        duracion: 2,
        contenido: [
          'La obra original es escasa por naturaleza: cada pieza es única. Comunicar "queda una de esta serie" no es manipular, es informar de algo verdadero.',
          'Nunca inventes urgencia falsa (falsos contadores, falsas reservas). El público del arte valora la honestidad y castiga el truco.',
        ],
        clave: [
          'La unicidad de la obra es escasez real.',
          'Nunca inventes urgencia: erosiona la confianza.',
        ],
        ejercicio: 'Escribe 3 mensajes de escasez verdadera para tu colección.',
      },
      {
        t: 'Después del lanzamiento',
        duracion: 3,
        contenido: [
          'Agradece a quien compró y a quien difundió. Un mensaje personal tras la compra convierte a un comprador en un seguidor fiel que vuelve.',
          'Revisa los datos sin obsesionarte: qué pieza se vendió antes, qué mensaje funcionó, de dónde vino la gente. Esos aprendizajes mejoran el siguiente lanzamiento.',
          'Cierra con un balance honesto y, si quedan piezas, planifica cómo seguir mostrándolas sin saturar.',
        ],
        clave: [
          'El agradecimiento personal fideliza.',
          'Analiza datos para mejorar el próximo lanzamiento.',
          'Cierra con balance y plan para las piezas restantes.',
        ],
        ejercicio: 'Prepara un mensaje de agradecimiento post-compra y una plantilla de balance del lanzamiento.',
      },
    ],
  },

  /* ───────────────────────── a8 · Newsletter ───────────────────────────── */
  a8: {
    intro:
      'La newsletter es el único canal que no depende de un algoritmo: hablas directamente con quien decidió escucharte. Este módulo te ayuda a crear y sostener una lista de correo que vende sin redes de por medio.',
    paraQuien: 'Para Inés, en paralelo a las redes, como activo a largo plazo.',
    objetivos: [
      'Entender por qué el email supera a las redes para vender.',
      'Conseguir suscriptores con un incentivo honesto.',
      'Escribir correos que la gente abra y disfrute.',
    ],
    lessons: [
      {
        t: 'Por qué el email gana al algoritmo',
        duracion: 3,
        contenido: [
          'En redes, solo una fracción de tus seguidores ve cada publicación; el algoritmo decide. En email llegas a la bandeja de entrada de todos los que se apuntaron.',
          'Si mañana una red social cae o cambia las reglas, tu lista de correo sigue siendo tuya. Es el activo más sólido de tu marca a largo plazo.',
        ],
        clave: [
          'El email llega a todos; las redes, a una fracción.',
          'Tu lista es tuya, pase lo que pase con las redes.',
        ],
        ejercicio: 'Elige una herramienta de email gratuita y crea tu cuenta para empezar.',
      },
      {
        t: 'Conseguir suscriptores',
        duracion: 4,
        contenido: [
          'Da una razón clara para apuntarse: acceso anticipado a las colecciones, ver obra antes que nadie, o un contenido especial (un texto, una guía, un descuento de primera compra).',
          'Pon el formulario donde la gente ya está mirando: en tu bio, al final de cada publicación importante y en tu web. Pídelo sin vergüenza: quien te quiere seguir, agradece el camino fácil.',
        ],
        clave: [
          'Da una razón concreta para suscribirse.',
          'Pon el formulario donde ya te miran.',
        ],
        ejercicio: 'Define tu incentivo de suscripción y dónde colocarás el formulario.',
      },
      {
        t: 'Qué escribir y cada cuánto',
        duracion: 4,
        contenido: [
          'No esperes a vender para escribir. Manda correos de valor: el detrás de cámaras de una obra, una reflexión, el avance de la colección. Así, cuando vendas, no será un correo frío.',
          'Una frecuencia realista es una o dos veces al mes. Mejor poco y bueno que mucho y vacío: cada correo intrascendente entrena a la gente a no abrirte.',
          'Escribe como hablas, en primera persona, a una sola persona. El email íntimo funciona mejor que el boletín corporativo.',
        ],
        clave: [
          'Aporta valor entre venta y venta.',
          'Una o dos veces al mes, con sustancia.',
          'Escribe a una persona, no a una lista.',
        ],
        ejercicio: 'Escribe tu primer correo de bienvenida presentándote a quien acaba de suscribirse.',
      },
      {
        t: 'Asuntos que se abren',
        duracion: 3,
        contenido: [
          'El asunto decide si te abren. Que sea honesto, concreto y con un punto de curiosidad: "La obra que casi no termino" abre más que "Newsletter de marzo".',
          'Evita mayúsculas gritonas y promesas que no cumples dentro. La confianza en el asunto se gana correo a correo.',
        ],
        clave: [
          'Asunto honesto + concreto + curiosidad.',
          'Sin gritos ni promesas vacías.',
        ],
        ejercicio: 'Escribe 5 asuntos posibles para tu próximo correo y elige el más tú.',
      },
    ],
  },

  /* ───────────────────────── a9 · Hablar con clientes ──────────────────── */
  a9: {
    intro:
      'Detrás de cada venta hay una conversación. Saber responder con calma, claridad y calidez convierte interesados en compradores y compradores en clientes que repiten y te recomiendan.',
    paraQuien: 'Para Inés, en cuanto empiecen las consultas por mensaje o email.',
    objetivos: [
      'Responder con rapidez, calidez y límites sanos.',
      'Gestionar encargos sin acabar trabajando gratis.',
      'Convertir una compra en una relación duradera.',
    ],
    lessons: [
      {
        t: 'El tono de las respuestas',
        duracion: 3,
        contenido: [
          'Responde pronto aunque sea para decir "te leo, te contesto con calma esta tarde". La rapidez transmite respeto y profesionalidad.',
          'Calidez con límites: amable siempre, disponible no siempre. Marcar horarios de respuesta te protege y, lejos de alejar, da seguridad al cliente.',
        ],
        clave: [
          'Responde pronto, aunque sea para decir "luego te contesto".',
          'Calidez con límites de horario.',
        ],
        ejercicio: 'Define tu horario de respuesta y un mensaje breve de "acuse de recibo".',
      },
      {
        t: 'Gestionar encargos',
        duracion: 4,
        contenido: [
          'Un encargo mal gestionado es trabajo no remunerado y disgustos. Antes de empezar, acuerda por escrito: qué, medidas, plazo, precio, anticipo y qué pasa si hay cambios.',
          'Pide siempre un anticipo (por ejemplo, el 50%). Compromete al cliente y cubre tus materiales. Es práctica normal y profesional, no desconfianza.',
          'Limita las rondas de cambios desde el principio ("incluye dos revisiones; a partir de ahí, se presupuesta"). Define el proceso y lo respetarán.',
        ],
        clave: [
          'Acuerda todo por escrito antes de empezar.',
          'Anticipo del 50%: estándar profesional.',
          'Limita las rondas de cambios desde el inicio.',
        ],
        ejercicio: 'Crea tu plantilla de encargo con todos los puntos a acordar antes de aceptar.',
      },
      {
        t: 'De compra a relación',
        duracion: 3,
        contenido: [
          'La venta no termina en el pago: el embalaje cuidado, una nota a mano y un mensaje de seguimiento convierten una transacción en una experiencia memorable.',
          'Pide opinión y permiso para mostrar la obra en su nuevo hogar. El testimonio de un cliente feliz es la mejor publicidad y abre la puerta a que vuelva.',
        ],
        clave: [
          'El cuidado post-venta crea experiencia, no transacción.',
          'Un cliente feliz que recomienda vale más que un anuncio.',
        ],
        ejercicio: 'Diseña tu "experiencia de entrega": embalaje, nota personal y mensaje de seguimiento.',
      },
    ],
  },
};
