import React, { useState, useEffect } from "react";
// Importación necesaria para que los iconos funcionen:
import { ChevronRight, ChevronLeft, Send, Sparkles, Star, Lock } from 'lucide-react';

// ─── PALETA VANESSA ───────────────────────────────────────────────────────────
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
  VENDE_IA:      "https://go.hotmart.com/L105250070A?ap=720b",
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

  .fade-enter {
    animation: fadeUp 0.5s ease forwards;
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .display-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(34px, 8vw, 48px);
    line-height: 1.05;
    letter-spacing: 0.02em;
    color: ${G.white};
    text-align: center;
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
    text-align: center;
  }

  .question-text {
    font-size: clamp(17px, 3.5vw, 21px);
    font-weight: 700;
    line-height: 1.35;
    color: ${G.white};
    margin-bottom: 22px;
  }

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
  .btn-primary:disabled { opacity: 0.38; cursor: default; transform: none; }

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
  }
  .option-btn.selected {
    border-color: ${G.yellow};
    background: rgba(245,200,66,0.14);
    color: ${G.white};
    font-weight: 700;
  }

  .input-field {
    width: 100%;
    padding: 14px 18px;
    border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 14px;
    background: rgba(255,255,255,0.07);
    color: white;
    margin-bottom: 12px;
    outline: none;
  }

  .archetype-badge {
    background: linear-gradient(135deg, ${G.yellow} 0%, ${G.orange} 100%);
    border-radius: 20px;
    padding: 28px 24px;
    text-align: center;
    margin-bottom: 24px;
  }
  .arch-name { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: ${G.purpleDeep}; }

  .feature-item {
    display: flex; gap: 12px; padding: 11px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    font-size: 14px; color: rgba(255,255,255,0.78);
  }

  .testimonial {
    background: rgba(255,255,255,0.06);
    border-radius: 16px; padding: 18px; margin-top: 10px;
  }
`;

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
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
