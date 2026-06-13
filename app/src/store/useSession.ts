import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SessionState {
  user: 'ines' | 'cristina' | null;
  login: (user: 'ines' | 'cristina') => void;
  logout: () => void;
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'atelier_user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
