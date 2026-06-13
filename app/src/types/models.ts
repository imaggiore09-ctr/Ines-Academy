export type Priority = 'alta' | 'media' | 'baja';
export type TaskStatus = 'pendiente' | 'en progreso' | 'completada';
export type ObraEstado = 'en proceso' | 'terminada' | 'fotografiada' | 'publicada' | 'vendida';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: TaskStatus;
  due: string;
  notes: string;
  resources: string[];
}

export interface Month {
  id: string;
  n: number;
  name: string;
  window: string;
  range: string;
  objective: string;
  reflection: string[];
  tasks: Task[];
}

export interface Identity {
  nombre: string;
  frase: string;
  historia: string;
  valores: string[];
  estilo: string;
  temas: string[];
  inspiraciones: string[];
  paleta: string[];
  tipografias: string;
  voz: string;
  siPalabras: string[];
  noPalabras: string[];
}

export interface SocialMetrics {
  seguidores: number;
  alcance: number;
  interacciones: number;
  mensajes: number;
  seguidoresGoal: number;
}

export interface Obra {
  id: string;
  nombre: string;
  tecnica: string;
  medidas: string;
  fecha: string;
  precio: number;
  estado: ObraEstado;
  coleccion: string;
  diseno: string;
  historia: string;
}

export interface ChecklistItem {
  id: string;
  t: string;
  done: boolean;
  group?: string;
}

export interface Movimiento {
  id: string;
  fecha: string;
  concepto: string;
  cat: string;
  monto: number;
}

export interface LearnModule {
  id: string;
  t: string;
  min: number;
  mods: number;
  done: boolean;
  cat: string;
}

export interface CalendarEntry {
  day: string;
  type: string;
  title: string;
}

export interface AppState {
  MONTHS: Month[];
  IDENTITY: Identity;
  SOCIAL: {
    metrics: SocialMetrics;
    reels: string[];
    stories: string[];
    carruseles: string[];
    frases: string[];
    guiones: string[];
    checklist: string[];
    calendar: CalendarEntry[];
  };
  OBRAS: Obra[];
  SHOP: {
    plataforma: string;
    estado: string;
    checklist: ChecklistItem[];
    paginas: string[];
    textosPendientes: string[];
    faq: { q: string; a: string }[];
  };
  LEGAL: {
    checklist: ChecklistItem[];
    preguntas: string[];
    ingresos: Movimiento[];
    gastos: Movimiento[];
  };
  LEARN: LearnModule[];
  REMINDERS: { t: string; due: string; icon: string }[];
  DECISIONS: { t: string; detail: string; month: string }[];
  currentMonthId: string;
}
