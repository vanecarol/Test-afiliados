import { useState, useEffect } from "react";

// ─── PALETA VANESSA: morado profundo + amarillo dorado + blanco ───────────────
const G = {
  purple:      "#3B2F8F",
  purpleDark:  "#28206A",
  purpleDeep:  "#1A1445",
  purpleMid:   "#4D3DAD",
  purpleLight: "#6B5BC8",
  purpleSoft:  "#EAE8FF",
  yellow:      "#F5C842",
  yellowHot:   "#FFD700",
  yellowLight: "#FFF3B0",
  orange:      "#F08030",
  white:       "#FFFFFF",
  offWhite:    "#FAFAFA",
  text:        "#1A1445",
  textMid:     "#4D3DAD",
  textLight:   "#7B6FBB",
  cream:       "#F5F3FF",
};

// ─── AFFILIATE LINKS ──────────────────────────────────────────────────────────
const LINKS = {
  UBC:          "https://shop.beacons.ai/atravesdelawebsite/1d8cdc22-8ad5-4076-918f-03e24b2d76bd?t=1775992494726",
  UBC_PLAZOS:   "https://shop.beacons.ai/atravesdelawebsite/1d8cdc22-8ad5-4076-918f-03e24b2d76bd?t=1775992494726",
  VENDE_IA:     "https://go.hotmart.com/L105250070A?ap=720b",
  CODIGO_MILLON:"https://go.hotmart.com/S105250063H?ap=0708",
  FRANQUICIA:   "https://go.hotmart.com/M105249914F?ap=39fb",
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Nunito', sans-serif;
    background: ${G.purpleDeep};
    min-height: 100vh;
    color: ${G.white};
    overflow-x: hidden;
  }

  .app-bg {
    min-height: 100vh;
    padding: 0 0 60px;
    background:
      radial-gradient(ellipse at 10% 0%, rgba(245,200,66,0.18) 0%, transparent 45%),
      radial-gradient(ellipse at 90% 100%, rgba(75,55,170,0.5) 0%, transparent 50%),
      ${G.purpleDeep};
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .card {
    width: 100%;
    max-width: 520px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(245,200,66,0.18);
    border-radius: 24px;
    overflow: hidden;
    margin-top: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,200,66,0.08);
    backdrop-filter: blur(12px);
  }

  .card-top {
    height: 4px;
    background: linear-gradient(90deg, ${G.yellow}, ${G.orange}, ${G.purpleLight});
  }

  .card-inner { padding: 32px 28px; }
  @media(max-width:480px){ .card-inner { padding: 24px 18px; } }

  /* Progress */
  .progress-track {
    height: 3px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 28px;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, ${G.yellow}, ${G.orange});
    border-radius: 2px;
    transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  }

  /* Fade */
  .fade-enter {
    animation: fadeUp 0.5s ease forwards;
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Typography */
  .display-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(36px, 8vw, 52px);
    line-height: 1.05;
    letter-spacing: 0.02em;
    color: ${G.white};
  }
  .display-title span { color: ${G.yellow}; }
  .label-tag {
    display: inline-block;
    background: rgba(245,200,66,0.15);
    border: 1px solid rgba(245,200,66,0.3);
    color: ${G.yellow};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 50px;
    padding: 5px 14px;
    margin-bottom: 16px;
  }
  .subtitle {
    font-size: 15px;
    color: rgba(255,255,255,0.72);
    line-height: 1.65;
    margin-top: 10px;
  }
  .question-text {
    font-size: clamp(17px, 3.5vw, 21px);
    font-weight: 700;
    line-height: 1.35;
    color: ${G.white};
    margin-bottom: 22px;
  }

  /* Buttons */
  .btn-primary {
    width: 100%;
    padding: 16px 24px;
    border: none;
    border-radius: 50px;
    background: linear-gradient(135deg, ${G.yellow}, ${G.orange});
    color: ${G.purpleDeep};
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(245,200,66,0.35);
    letter-spacing: 0.01em;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(245,200,66,0.5); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.38; cursor: default; transform: none; }

  .btn-secondary {
    width: 100%;
    padding: 14px 24px;
    border: 1.5px solid rgba(245,200,66,0.5);
    border-radius: 50px;
    background: transparent;
    color: ${G.yellow};
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-secondary:hover { background: rgba(245,200,66,0.1); }

  .btn-ghost {
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    cursor: pointer;
    padding: 6px;
    transition: color 0.2s;
  }
  .btn-ghost:hover { color: ${G.yellow}; }

  /* Option buttons */
  .option-btn {
    width: 100%;
    padding: 15px 18px;
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    background: rgba(255,255,255,0.05);
    text-align: left;
    font-family: 'Nunito', sans-serif;
    font-size: 14.5px;
    color: rgba(255,255,255,0.85);
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.22s;
    font-weight: 500;
    line-height: 1.45;
  }
  .option-btn:hover {
    border-color: rgba(245,200,66,0.5);
    background: rgba(245,200,66,0.08);
    color: ${G.white};
  }
  .option-btn.selected {
    border-color: ${G.yellow};
    background: rgba(245,200,66,0.14);
    color: ${G.white};
    font-weight: 700;
  }
  .option-btn.selected::after {
    content: '✓';
    float: right;
    color: ${G.yellow};
    font-weight: 800;
  }

  /* Interstitial */
  .intersticial {
    background: linear-gradient(135deg, rgba(245,200,66,0.10), rgba(107,91,200,0.15));
    border: 1px solid rgba(245,200,66,0.2);
    border-radius: 20px;
    padding: 32px 24px;
    text-align: center;
  }
  .inter-emoji {
    font-size: 52px;
    display: block;
    margin-bottom: 16px;
    animation: pulse 2.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100%{ transform:scale(1); }
    50%{ transform:scale(1.08); }
  }
  .inter-pill {
    display: inline-block;
    background: ${G.yellow};
    color: ${G.purpleDeep};
    border-radius: 50px;
    padding: 5px 18px;
    font-size: 13px;
    font-weight: 800;
    margin-bottom: 14px;
    letter-spacing: 0.04em;
  }
  .inter-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px;
    color: ${G.white};
    margin-bottom: 10px;
    letter-spacing: 0.04em;
  }
  .inter-text {
    font-size: 15px;
    color: rgba(255,255,255,0.72);
    line-height: 1.65;
  }

  /* Loading */
  .loading-center { text-align: center; padding: 10px 0; }
  .spinner-wrap { position: relative; width: 72px; height: 72px; margin: 0 auto 28px; }
  .spinner-wrap::before, .spinner-wrap::after {
    content:''; position:absolute; inset:0; border-radius:50%;
    border:3px solid transparent;
  }
  .spinner-wrap::before {
    border-top-color: ${G.yellow};
    animation: spin 1s linear infinite;
  }
  .spinner-wrap::after {
    border-bottom-color: ${G.purpleLight};
    animation: spin 1.6s linear infinite reverse;
    inset: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    min-height: 20px;
    transition: opacity 0.4s;
  }
  .ai-tags {
    display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 24px;
  }
  .ai-tag {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 50px;
    padding: 4px 12px;
    font-size: 12px;
    color: rgba(255,255,255,0.5);
  }

  /* Form */
  .input-field {
    width: 100%;
    padding: 14px 18px;
    border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 14px;
    background: rgba(255,255,255,0.07);
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    color: ${G.white};
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 12px;
  }
  .input-field:focus { border-color: ${G.yellow}; }
  .input-field::placeholder { color: rgba(255,255,255,0.35); }

  /* Divider */
  hr.divider { border: none; border-top: 1px solid rgba(255,255,255,0.09); margin: 24px 0; }

  /* Step */
  .step-label { font-size: 12px; color: rgba(255,255,255,0.35); font-weight: 600; letter-spacing: 0.05em; }

  /* Result archetype badge */
  .archetype-badge {
    background: linear-gradient(135deg, ${G.yellow} 0%, ${G.orange} 100%);
    border-radius: 20px;
    padding: 28px 24px;
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }
  .archetype-badge::after {
    content:'';
    position:absolute;
    top:-30%;right:-10%;
    width:200px;height:200px;
    border-radius:50%;
    background: rgba(255,255,255,0.08);
    pointer-events:none;
  }
  .arch-icon { font-size: 52px; display:block; margin-bottom: 10px; }
  .arch-label {
    font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform:uppercase;
    color: ${G.purpleDeep}; opacity: 0.7; display:block; margin-bottom: 6px;
  }
  .arch-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    color: ${G.purpleDeep};
    letter-spacing: 0.04em;
    display:block;
  }

  /* Feature list */
  .feature-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    font-size: 14px;
    color: rgba(255,255,255,0.78);
  }
  .feature-icon { color: ${G.yellow}; font-size: 16px; flex-shrink:0; margin-top:1px; }

  /* Testimonial */
  .testimonial {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 18px 20px 16px;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(255,255,255,0.72);
    line-height: 1.65;
    position: relative;
  }
  .testimonial::before {
    content:'"';
    font-family: Georgia, serif;
    font-size: 52px;
    color: rgba(245,200,66,0.3);
    position:absolute;
    top:-4px; left:14px;
    line-height:1;
  }
  .testimonial-body { padding-top: 14px; }
  .testimonial-author {
    font-weight: 700; color: ${G.yellow}; margin-top: 8px; font-size: 13px;
  }

  /* Price box */
  .price-box {
    border: 2px solid ${G.yellow};
    border-radius: 20px;
    padding: 22px;
    text-align: center;
    margin-bottom: 10px;
    background: rgba(245,200,66,0.06);
  }
  .price-box.alt { border-color: rgba(255,255,255,0.18); background: transparent; }
  .price-tag {
    font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform:uppercase;
    color: ${G.yellow}; display:block; margin-bottom: 6px;
  }
  .price-tag.alt { color: rgba(255,255,255,0.5); }
  .price-amount {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 44px;
    color: ${G.white};
    letter-spacing: 0.02em;
    display:block;
  }
  .price-note { font-size: 13px; color: rgba(255,255,255,0.45); margin-top: 4px; display:block; }

  /* Trust row */
  .trust-row {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 12px 16px;
    margin-top: 14px;
    font-size: 13px;
    color: rgba(255,255,255,0.65);
  }

  /* Proof banner */
  .proof-banner {
    display: flex; align-items: center; gap: 12px;
    background: rgba(245,200,66,0.1);
    border: 1px solid rgba(245,200,66,0.25);
    border-radius: 14px;
    padding: 14px 16px;
    margin-top: 18px;
  }
  .proof-text { font-size: 13px; color: rgba(255,255,255,0.75); }
  .proof-text strong { color: ${G.yellow}; }

  .nav-row {
    display: flex; justify-content: space-between; align-items: center; margin-top: 16px;
  }
`;

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
// Cada opción lleva scores que suman puntos a las 3 ofertas
const QUESTIONS = [
  {
    id: "q1",
    question: "Seamos honestas: entre pañales, tareas y la vida real… ¿cuánto tiempo diario puedes dedicarle a un negocio?",
    options: [
      { text: "1 a 2 horas. Cuando hay silencio en casa, las aprovecho.", scores: { UBC: 1, VENDE: 1, FRANQUICIA: 2 } },
      { text: "Cero tiempo real. Necesito algo que ya venga estructurado y funcionando.", scores: { FRANQUICIA: 4 } },
      { text: "Puedo sacar tiempo si veo una ruta clara que de verdad valga la pena.", scores: { UBC: 3, VENDE: 2 } },
      { text: "Tengo varias horas disponibles. Quiero construir algo en serio.", scores: { UBC: 4 } },
    ],
  },
  {
    id: "q2",
    question: "¿Cómo te sientes con la idea de aparecer en cámara, grabar reels y mostrar tu vida en redes?",
    options: [
      { text: "Me encanta la idea. Quiero construir mi marca personal y que la gente me conozca.", scores: { UBC: 4 } },
      { text: "Ni pensarlo. Si puedo generar dinero sin maquillarme, mejor.", scores: { VENDE: 4 } },
      { text: "Podría hacerlo, pero necesito saber exactamente cómo y por qué funciona.", scores: { UBC: 2, VENDE: 1 } },
      { text: "Prefiero operar detrás de escena y que el sistema trabaje por mí.", scores: { VENDE: 3, FRANQUICIA: 2 } },
    ],
  },
  {
    id: "q3",
    question: "Cuando piensas en empezar un negocio, ¿cuál es tu miedo más grande?",
    options: [
      { text: "Invertir dinero y que no funcione. No puedo darme el lujo de equivocarme.", scores: { FRANQUICIA: 3, VENDE: 2 } },
      { text: "No saber qué hacer primero. Hay demasiada información y me abruma.", scores: { FRANQUICIA: 4 } },
      { text: "No tener suficiente presencia o seguidores para vender.", scores: { UBC: 3 } },
      { text: "Que la tecnología me gane. No soy muy técnica.", scores: { FRANQUICIA: 2, VENDE: 2 } },
    ],
  },
  {
    id: "q4",
    question: "¿Cómo está tu energía mental en este momento?",
    options: [
      { text: "Agotada, pero con un fuego por dentro que no se apaga. Quiero salir adelante.", scores: { UBC: 2, FRANQUICIA: 2 } },
      { text: "Muy cansada. Necesito algo simple, guiado y que no me exija demasiado al principio.", scores: { FRANQUICIA: 4 } },
      { text: "Tengo ideas y energía, pero me bloqueo en la parte técnica.", scores: { VENDE: 3, FRANQUICIA: 1 } },
      { text: "Estoy lista. Tengo claridad y ganas de aprender a fondo.", scores: { UBC: 4 } },
    ],
  },
  {
    id: "q5",
    question: "Imagina que ya tienes ingresos propios. ¿Cómo se ve ese negocio?",
    options: [
      { text: "Soy un referente en mi nicho. La gente me busca porque confía en mí y en mi historia.", scores: { UBC: 4 } },
      { text: "Tengo un sistema automatizado vendiendo productos digitales mientras me ocupo de mis hijos.", scores: { VENDE: 4 } },
      { text: "Sigo una estructura probada que otro ya diseñó. Yo solo ejecuto y cobro.", scores: { FRANQUICIA: 4 } },
      { text: "Mezcla de todo, pero que no dependa de que yo esté 100% disponible.", scores: { VENDE: 2, FRANQUICIA: 3 } },
    ],
  },
  {
    id: "q6",
    question: "Una vecina te cuenta que lleva 3 meses sin resultados en su negocio online. ¿Qué le dirías?",
    options: [
      { text: "Que necesita construir autoridad primero. Sin marca, sin confianza, sin ventas.", scores: { UBC: 3 } },
      { text: "Que quizás está usando el modelo equivocado. No todo sirve para toda persona.", scores: { VENDE: 2, FRANQUICIA: 2 } },
      { text: "Que necesita un sistema ya armado, no empezar de cero inventando.", scores: { FRANQUICIA: 3 } },
      { text: "Que la IA puede hacer mucho trabajo por ella si sabe usarla bien.", scores: { VENDE: 3 } },
    ],
  },
  {
    id: "q7",
    question: "Si tuvieras que invertir en tu negocio hoy, ¿cuál sería tu postura?",
    options: [
      { text: "Quiero la formación más completa. Prefiero invertir bien una vez y no andar a medias.", scores: { UBC: 4 } },
      { text: "Busco algo accesible para empezar a generar resultados rápido y reinvertir.", scores: { FRANQUICIA: 3, VENDE: 2 } },
      { text: "Quiero algo práctico con inteligencia artificial incluida. Eso es el futuro.", scores: { VENDE: 4 } },
      { text: "Prefiero una opción que no me quite el sueño financieramente, pero que funcione.", scores: { FRANQUICIA: 4 } },
    ],
  },
];

const INTERSTITIALS = {
  2: {
    emoji: "☕",
    pill: "Vas muy bien",
    title: "QUERER DINERO PROPIO NO TE HACE MENOS MADRE",
    text: "Te hace más honesta. Sigue, ya vamos a la mitad.",
  },
  5: {
    emoji: "🔋",
    pill: "Casi terminamos",
    title: "TU CANSANCIO NO BORRA TU AMBICIÓN",
    text: "Solo necesitas una ruta que quepa en tu vida real. Eso es lo que estamos calculando.",
  },
};

const LOADING_TEXTS = [
  "Calculando tu tiempo disponible...",
  "Evaluando tu afinidad con la IA...",
  "Analizando tu nivel de exposición ideal...",
  "Seleccionando el modelo perfecto para tu etapa...",
  "Preparando tu ruta personalizada...",
];

// ─── RESULTS DATA ─────────────────────────────────────────────────────────────
const RESULTS = {
  UBC: {
    id: "UBC",
    icon: "👑",
    archetype: "La Creadora de Tribu",
    headline: "Estás lista para construir un imperio con tu marca personal",
    message: "Tienes el perfil de una mujer que no solo quiere generar ingresos, sino construir una comunidad, contar su historia y dejar huella. Eso se llama marca personal, y hay una academia diseñada exactamente para eso.",
    offer: "Ultimate Branding Course (UBC)",
    hook: "La formación todo-en-uno de marketing digital, Instagram, embudos, automatización y ventas — con posibilidad de reventa con comisión alta.",
    features: [
      "Marketing digital desde cero hasta experta",
      "Construcción de marca personal auténtica",
      "Estrategia de Instagram y contenido",
      "Embudos de venta automatizados",
      "Masterclass de reventa con alta comisión",
      "Comunidad activa de creadoras",
      "Acceso de por vida + actualizaciones",
    ],
    testimonials: [
      { text: "En 60 días ya tenía mis primeras ventas. La comunidad me sostuvo cuando quería rendirme.", author: "Mariana L. — Mamá de 2 niños, Colombia" },
      { text: "UBC me dio estructura. Ya no publico a ciegas. Publico con estrategia.", author: "Patricia V. — Ex empleada, ahora digital entrepreneur" },
    ],
    cta: "Quiero ver UBC →",
    cta2: "Ver opción de pago a plazos",
    link: LINKS.UBC,
    link2: LINKS.UBC_PLAZOS,
    hasInstallments: true,
  },
  VENDE: {
    id: "VENDE",
    icon: "🤖",
    archetype: "La Estratega Invisible",
    headline: "Tu paz mental es lo primero. Generas sin mostrarte.",
    message: "No quieres convertir tu vida privada en contenido, y está bien. Puedes generar ingresos serios con inteligencia artificial, productos digitales y automatización — sin grabar un solo reel si no quieres.",
    offer: "Desafío Vende con IA + Código Million Pro",
    hook: "El modelo faceless apoyado en IA que más está creciendo entre mujeres que quieren ingresos sin sacrificar su privacidad.",
    features: [
      "Modelo 100% faceless (sin mostrar tu cara)",
      "Creación de productos digitales con IA",
      "Automatización de ventas y seguimiento",
      "Estrategia pensada para poco tiempo",
      "Herramientas de IA para crear contenido",
      "Sistema replicable mes a mes",
    ],
    testimonials: [
      { text: "Nunca grabé un video mío. Mis productos digitales se venden solos gracias a la automatización.", author: "Sofía R. — Mamá a tiempo completo, México" },
      { text: "La IA hace el 80% del trabajo pesado. Yo solo supervisé y cobré.", author: "Daniela M. — Enfermera con 2 hijos, España" },
    ],
    cta: "Quiero ver Vende con IA →",
    link: LINKS.VENDE_IA,
    hasInstallments: false,
    secondOption: {
      text: "También te recomendamos Código Million Pro →",
      link: LINKS.CODIGO_MILLON,
    },
  },
  FRANQUICIA: {
    id: "FRANQUICIA",
    icon: "⚡",
    archetype: "La Mamá Práctica",
    headline: "No tienes tiempo para inventar la rueda. Aquí no tienes que hacerlo.",
    message: "Tu prioridad es una ruta simple, ya estructurada, que no dependa de que tengas energía infinita. Un sistema que funcione incluso en tus días más caóticos.",
    offer: "Franquicia Digital IA",
    hook: "El sistema más llave en mano del mercado. Tú ejecutas, el sistema trabaja.",
    features: [
      "Sistema 100% ya estructurado y probado",
      "Sin crear productos ni contenido desde cero",
      "Ruta clara de inicio a primera venta",
      "Pensado para mujeres con poco tiempo",
      "Soporte y comunidad incluidos",
      "Escalable según tu ritmo",
    ],
    testimonials: [
      { text: "La primera semana ya entendí cómo funcionaba. La segunda semana ya tenía mi primera venta.", author: "Laura G. — Mamá primeriza, Argentina" },
      { text: "Llevaba meses procrastinando. Franquicia IA me dio el sistema y yo solo tuve que ejecutar.", author: "Sandra P. — Maestra, Venezuela" },
    ],
    cta: "Quiero activar la Franquicia IA →",
    link: LINKS.FRANQUICIA,
    hasInstallments: false,
  },
};

// ─── GOOGLE SHEETS INTEGRATION ───────────────────────────────────────────────
// 👇 Reemplaza esta URL con la que copiaste de tu Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6iTC6cBVypAMe28odVoRrMzL6ZEfVFmqdCecDx6sKGhkzi3c8qSjxyihCULX5SGYZ/exec";

const enviarDatosAGoogle = async (datosMamá) => {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre:    datosMamá.nombre,
        email:     datosMamá.email,
        resultado: datosMamá.resultado,
        notas:     "Lead desde App de Maternidad",
      }),
    });
    console.log("Datos enviados con éxito");

    // ─── PIXEL DE META ────────────────────────────────────────────────────────
    // Se dispara justo después de que los datos llegan a Google Sheets
    if (window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "Test de Maternidad",
        value:        0,
        currency:     "EUR",
      });
    }
  } catch (error) {
    console.error("Error al enviar los datos", error);
  }
};

// ─── SCORING ──────────────────────────────────────────────────────────────────
function computeResult(answers) {
  const scores = { UBC: 0, VENDE: 0, FRANQUICIA: 0 };
  Object.values(answers).forEach(({ scores: s }) => {
    Object.entries(s).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });
  });
  // Tiebreaker: si hay empate aplicar reglas
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function MaternidadApp() {
  const [screen, setScreen] = useState("welcome");
  const [maternityStage, setMaternityStage] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [interstitialData, setInterstitialData] = useState(null);
  const [pendingStep, setPendingStep] = useState(null);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [result, setResult] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const go = (s) => { setAnimKey(k => k + 1); setScreen(s); };

  // Loading rotation
  useEffect(() => {
    if (screen !== "loading") return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < LOADING_TEXTS.length) {
        setLoadingIdx(i);
      } else {
        clearInterval(iv);
        const r = computeResult(answers);
        setResult(r);
        setTimeout(() => go("capture"), 500);
      }
    }, 900);
    return () => clearInterval(iv);
  }, [screen]);

  const totalQ = QUESTIONS.length;
  const progress = screen === "quiz" ? ((quizStep + 1) / totalQ) * 100
    : screen === "loading" || screen === "capture" || screen === "result" ? 100 : 0;

  function handleOptionSelect(opt) { setCurrentAnswer(opt); }

  function advanceQuiz() {
    if (!currentAnswer) return;
    const q = QUESTIONS[quizStep];
    const newAnswers = { ...answers, [q.id]: currentAnswer };
    setAnswers(newAnswers);
    setCurrentAnswer(null);

    const next = quizStep + 1;

    if (INTERSTITIALS[next]) {
      setInterstitialData(INTERSTITIALS[next]);
      setPendingStep(next);
      go("interstitial");
      return;
    }

    if (next >= totalQ) {
      setLoadingIdx(0);
      go("loading");
      return;
    }

    setQuizStep(next);
    setAnimKey(k => k + 1);
  }

  function continueFromInterstitial() {
    setQuizStep(pendingStep);
    go("quiz");
  }

  async function handleSubmit() {
    if (!formData.name || !formData.email) return;

    // Calcula el resultado antes de navegar para enviarlo a Google Sheets
    const resultadoCalculado = computeResult(answers);
    setResult(resultadoCalculado);

    // Envía los datos a Google Sheets y dispara el Pixel de Meta
    await enviarDatosAGoogle({
      nombre:    formData.name,
      email:     formData.email,
      resultado: resultadoCalculado, // UBC | VENDE | FRANQUICIA
    });

    go("result");
  }

  const res = result ? RESULTS[result] : null;

  return (
    <>
      <style>{css}</style>
      <div className="app-bg">
        <div className="card">
          <div className="card-top" />
          <div className="card-inner">
            {(screen === "quiz") && (
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            )}
            <div key={animKey} className="fade-enter">

              {/* ── WELCOME ── */}
              {screen === "welcome" && (
                <div>
                  <span className="label-tag">Test · 2 minutos</span>
                  <h1 className="display-title">
                    Descubre tu ruta hacia la<br />
                    <span>independencia financiera</span><br />
                    sin perderte nada de tus hijos
                  </h1>
                  <p className="subtitle">
                    Respondé 7 preguntas y te decimos exactamente qué modelo de negocio digital encaja con tu tiempo, tu energía y tu etapa de maternidad.
                  </p>

                  <div className="proof-banner">
                    <span style={{ fontSize: 22 }}>🌟</span>
                    <span className="proof-text">
                      <strong>+3.100 mamás</strong> ya encontraron su ruta. Esta semana puede ser tu turno.
                    </span>
                  </div>

                  <hr className="divider" />

                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 12, fontWeight: 600 }}>
                    ¿EN QUÉ ETAPA ESTÁS?
                  </p>
                  {[
                    "Embarazada planeando el futuro 🤰",
                    "Mamá a tiempo completo buscando ingresos 🏠",
                    "Mamá trabajadora exhausta buscando una salida 💼",
                    "Mamá emprendedora que quiere ordenar su estrategia 🚀",
                  ].map((o, i) => (
                    <button
                      key={i}
                      className={`option-btn${maternityStage === i ? " selected" : ""}`}
                      onClick={() => setMaternityStage(i)}
                    >
                      {o}
                    </button>
                  ))}

                  <div style={{ marginTop: 20 }}>
                    <button
                      className="btn-primary"
                      onClick={() => maternityStage !== null && go("quiz")}
                      disabled={maternityStage === null}
                    >
                      Descubrir mi ruta →
                    </button>
                    <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>
                      Sin spam · Sin compromisos · 100% gratis
                    </p>
                  </div>
                </div>
              )}

              {/* ── QUIZ ── */}
              {screen === "quiz" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                    <span className="step-label">PREGUNTA {quizStep + 1} DE {totalQ}</span>
                    <button className="btn-ghost" onClick={() => {
                      if (quizStep > 0) { setQuizStep(q => q - 1); setCurrentAnswer(null); setAnimKey(k => k + 1); }
                    }}>← Anterior</button>
                  </div>
                  <p className="question-text">{QUESTIONS[quizStep].question}</p>
                  {QUESTIONS[quizStep].options.map((opt, i) => (
                    <button
                      key={i}
                      className={`option-btn${currentAnswer === opt ? " selected" : ""}`}
                      onClick={() => handleOptionSelect(opt)}
                    >
                      {opt.text}
                    </button>
                  ))}
                  <div style={{ marginTop: 20 }}>
                    <button className="btn-primary" onClick={advanceQuiz} disabled={!currentAnswer}>
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* ── INTERSTITIAL ── */}
              {screen === "interstitial" && interstitialData && (
                <div>
                  <div className="intersticial">
                    <span className="inter-emoji">{interstitialData.emoji}</span>
                    <div className="inter-pill">{interstitialData.pill}</div>
                    <div className="inter-title">{interstitialData.title}</div>
                    <p className="inter-text">{interstitialData.text}</p>
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <button className="btn-primary" onClick={continueFromInterstitial}>
                      Seguir el test →
                    </button>
                  </div>
                </div>
              )}

              {/* ── LOADING ── */}
              {screen === "loading" && (
                <div className="loading-center">
                  <div style={{ marginBottom: 32, fontSize: 40 }}>✨</div>
                  <div className="spinner-wrap" />
                  <h2 className="display-title" style={{ fontSize: 30, marginBottom: 16 }}>
                    Creando tu<br /><span>ruta personalizada</span>
                  </h2>
                  <p className="loading-text">{LOADING_TEXTS[loadingIdx]}</p>
                  <div className="ai-tags">
                    {["tiempo", "energía", "inversión", "exposición", "modelo"].map(t => (
                      <span key={t} className="ai-tag">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── CAPTURE ── */}
              {screen === "capture" && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <span style={{ fontSize: 48 }}>📩</span>
                    <h2 className="display-title" style={{ fontSize: 32, marginTop: 12 }}>
                      Ya tengo<br /><span>tu ruta trazada</span>
                    </h2>
                    <p className="subtitle">
                      ¿A dónde te envío tu plan de acción personalizado?
                    </p>
                  </div>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  />
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Tu mejor correo"
                    value={formData.email}
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                  />
                  <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.email}
                  >
                    Ver mi ruta personalizada →
                  </button>
                  <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>
                    Sin spam. Podés darte de baja cuando quieras.
                  </p>
                </div>
              )}

              {/* ── RESULT ── */}
              {screen === "result" && res && (
                <div>
                  <div className="archetype-badge">
                    <span className="arch-icon">{res.icon}</span>
                    <span className="arch-label">Tu perfil es</span>
                    <span className="arch-name">{res.archetype}</span>
                  </div>

                  <h2 className="display-title" style={{ fontSize: "clamp(24px,5vw,32px)", marginBottom: 12 }}>
                    {res.headline.split(/(independencia|sin|tu paz|no tienes)/i).map((part, i) =>
                      /independencia|sin|paz|tienes/i.test(part)
                        ? <span key={i} style={{ color: G.yellow }}>{part}</span>
                        : part
                    )}
                  </h2>

                  <p className="subtitle" style={{ marginBottom: 24 }}>{res.message}</p>

                  <hr className="divider" />

                  <span className="label-tag">Tu ruta recomendada</span>
                  <p style={{ fontSize: 18, fontWeight: 800, color: G.yellow, marginBottom: 4 }}>{res.offer}</p>
                  <p className="subtitle" style={{ marginBottom: 20 }}>{res.hook}</p>

                  {res.features.map((f, i) => (
                    <div key={i} className="feature-item">
                      <span className="feature-icon">★</span>
                      <span>{f}</span>
                    </div>
                  ))}

                  <hr className="divider" />

                  <span className="label-tag">Lo que dicen otras mamás</span>
                  {res.testimonials.map((t, i) => (
                    <div key={i} className="testimonial">
                      <div className="testimonial-body">
                        <p>{t.text}</p>
                        <p className="testimonial-author">— {t.author}</p>
                      </div>
                    </div>
                  ))}

                  <hr className="divider" />

                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
                    <a href={res.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <button className="btn-primary">{res.cta}</button>
                    </a>
                    {res.hasInstallments && (
                      <a href={res.link2} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <button className="btn-secondary">{res.cta2}</button>
                      </a>
                    )}
                    {res.secondOption && (
                      <a href={res.secondOption.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <button className="btn-secondary">{res.secondOption.text}</button>
                      </a>
                    )}
                  </div>

                  <div className="trust-row">
                    <span style={{ fontSize: 18 }}>🔒</span>
                    <span>Garantía de satisfacción. Si en 7 días no es lo que esperabas, lo hablamos.</span>
                  </div>

                  <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 24 }}>
                    Resultado calculado según tus respuestas · {new Date().toLocaleDateString("es-ES")}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
