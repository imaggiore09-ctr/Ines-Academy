import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Route = 'dashboard' | 'plan' | 'identidad' | 'redes' | 'obras' | 'tienda' | 'legal' | 'aprendizaje' | 'fiscal';
type Accent = 'rojo' | 'carmesi' | 'tinta';
type DashLook = 'editorial' | 'compacto' | 'galeria';
type DisplayFont = 'bodoni' | 'playfair' | 'caslon';

interface UiState {
  route: Route;
  accent: Accent;
  dashLook: DashLook;
  displayFont: DisplayFont;
  brandName: string;
  toast: string | null;
  setRoute: (r: Route) => void;
  setAccent: (a: Accent) => void;
  setDashLook: (d: DashLook) => void;
  setDisplayFont: (f: DisplayFont) => void;
  setBrandName: (n: string) => void;
  flash: (msg: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      route: 'dashboard',
      accent: 'rojo',
      dashLook: 'editorial',
      displayFont: 'bodoni',
      brandName: 'de Cueto Sisters',
      toast: null,
      setRoute: (route) => set({ route }),
      setAccent: (accent) => set({ accent }),
      setDashLook: (dashLook) => set({ dashLook }),
      setDisplayFont: (displayFont) => set({ displayFont }),
      setBrandName: (brandName) => set({ brandName }),
      flash: (msg) => {
        set({ toast: msg });
        setTimeout(() => set({ toast: null }), 2400);
      },
    }),
    { name: 'atelier_ui' }
  )
);
