import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ATELIER_SEED } from '@/data/seed';
import type { AppState, Task, Identity, SocialMetrics, Obra, Movimiento } from '@/types/models';
import { useUiStore } from '@/store/useUiStore';

interface AppStore {
  state: AppState;
  // Tasks
  toggleDone: (monthId: string, taskId: string) => void;
  cycleStatus: (monthId: string, taskId: string) => void;
  setTask: (monthId: string, taskId: string, patch: Partial<Task>) => void;
  addTask: (monthId: string, data: Partial<Task>) => void;
  deleteTask: (monthId: string, taskId: string) => void;
  // Identity
  setIdentity: (patch: Partial<Identity>) => void;
  // Social
  setMetrics: (patch: Partial<SocialMetrics>) => void;
  // Obras
  addObra: (data: Partial<Obra>) => void;
  setObra: (id: string, data: Partial<Obra>) => void;
  deleteObra: (id: string) => void;
  // Checklist (SHOP / LEGAL)
  toggleCheck: (section: 'SHOP' | 'LEGAL', id: string) => void;
  // setState generic
  setState: (fn: (s: AppState) => AppState) => void;
  // Movimientos
  addMovimiento: (kind: 'ingresos' | 'gastos', data: Omit<Movimiento, 'id'>) => void;
  // Modules
  toggleModule: (id: string) => void;
  // Toast
  flash: (msg: string) => void;
}

const STATUS_CYCLE = { pendiente: 'en progreso', 'en progreso': 'completada', completada: 'pendiente' } as const;

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      state: ATELIER_SEED,

      toggleDone: (monthId, taskId) =>
        set((s) => ({
          state: {
            ...s.state,
            MONTHS: s.state.MONTHS.map((m) =>
              m.id !== monthId ? m : {
                ...m,
                tasks: m.tasks.map((t) =>
                  t.id !== taskId ? t : { ...t, status: t.status === 'completada' ? 'pendiente' : 'completada' }
                ),
              }
            ),
          },
        })),

      cycleStatus: (monthId, taskId) =>
        set((s) => ({
          state: {
            ...s.state,
            MONTHS: s.state.MONTHS.map((m) =>
              m.id !== monthId ? m : {
                ...m,
                tasks: m.tasks.map((t) =>
                  t.id !== taskId ? t : { ...t, status: STATUS_CYCLE[t.status] }
                ),
              }
            ),
          },
        })),

      setTask: (monthId, taskId, patch) =>
        set((s) => ({
          state: {
            ...s.state,
            MONTHS: s.state.MONTHS.map((m) =>
              m.id !== monthId ? m : {
                ...m,
                tasks: m.tasks.map((t) => (t.id !== taskId ? t : { ...t, ...patch })),
              }
            ),
          },
        })),

      addTask: (monthId, data) =>
        set((s) => ({
          state: {
            ...s.state,
            MONTHS: s.state.MONTHS.map((m) =>
              m.id !== monthId ? m : {
                ...m,
                tasks: [
                  ...m.tasks,
                  {
                    id: 'nt-' + Date.now(),
                    title: data.title || '',
                    priority: data.priority || 'media',
                    status: 'pendiente',
                    due: data.due || '',
                    notes: '',
                    resources: [],
                  },
                ],
              }
            ),
          },
        })),

      deleteTask: (monthId, taskId) =>
        set((s) => ({
          state: {
            ...s.state,
            MONTHS: s.state.MONTHS.map((m) =>
              m.id !== monthId ? m : { ...m, tasks: m.tasks.filter((t) => t.id !== taskId) }
            ),
          },
        })),

      setIdentity: (patch) =>
        set((s) => ({ state: { ...s.state, IDENTITY: { ...s.state.IDENTITY, ...patch } } })),

      setMetrics: (patch) =>
        set((s) => ({
          state: {
            ...s.state,
            SOCIAL: { ...s.state.SOCIAL, metrics: { ...s.state.SOCIAL.metrics, ...patch } },
          },
        })),

      addObra: (data) =>
        set((s) => ({
          state: {
            ...s.state,
            OBRAS: [
              ...s.state.OBRAS,
              {
                id: 'o-' + Date.now(),
                nombre: data.nombre || '',
                tecnica: data.tecnica || '',
                medidas: data.medidas || '',
                fecha: data.fecha || '',
                precio: data.precio || 0,
                estado: data.estado || 'en proceso',
                coleccion: data.coleccion || '',
                historia: data.historia || '',
              },
            ],
          },
        })),

      setObra: (id, data) =>
        set((s) => ({
          state: {
            ...s.state,
            OBRAS: s.state.OBRAS.map((o) => (o.id !== id ? o : { ...o, ...data })),
          },
        })),

      deleteObra: (id) =>
        set((s) => ({ state: { ...s.state, OBRAS: s.state.OBRAS.filter((o) => o.id !== id) } })),

      toggleCheck: (section, id) =>
        set((s) => ({
          state: {
            ...s.state,
            [section]: {
              ...s.state[section],
              checklist: (s.state[section] as { checklist: { id: string; done: boolean }[] }).checklist.map(
                (c) => (c.id !== id ? c : { ...c, done: !c.done })
              ),
            },
          },
        })),

      setState: (fn) => set((s) => ({ state: fn(s.state) })),

      addMovimiento: (kind, data) =>
        set((s) => ({
          state: {
            ...s.state,
            LEGAL: {
              ...s.state.LEGAL,
              [kind]: [
                ...s.state.LEGAL[kind],
                { ...data, id: kind[0] + '-' + Date.now() },
              ],
            },
          },
        })),

      toggleModule: (id) =>
        set((s) => ({
          state: {
            ...s.state,
            LEARN: s.state.LEARN.map((m) => (m.id !== id ? m : { ...m, done: !m.done })),
          },
        })),

      flash: (msg) => useUiStore.getState().flash(msg),
    }),
    { name: 'atelier_app_v1' }
  )
);

// Helpers
export function monthProgress(m: AppState['MONTHS'][0]) {
  const total = m.tasks.length;
  const done = m.tasks.filter((t) => t.status === 'completada').length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function overallProgress(months: AppState['MONTHS']) {
  const total = months.reduce((a, m) => a + m.tasks.length, 0);
  const done = months.reduce((a, m) => a + m.tasks.filter((t) => t.status === 'completada').length, 0);
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}
