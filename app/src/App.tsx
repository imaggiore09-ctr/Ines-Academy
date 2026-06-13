import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useSession } from '@/store/useSession';
import { useUiStore } from '@/store/useUiStore';
import { useAppStore } from '@/store/useAppStore';
import { scheduleSave } from '@/lib/sync';
import { AppShell } from '@/components/layout/AppShell';
import { LoginRoute } from '@/routes/LoginRoute';
import { Toast } from '@/components/ui/Toast';
import '@/styles/tokens.css';
import '@/styles/globals.css';

const FONT_MAP: Record<string, string> = {
  bodoni: '"Bodoni Moda", "Times New Roman", serif',
  playfair: '"Playfair Display", serif',
  caslon: '"Libre Caslon Display", serif',
};

function Router() {
  const { user } = useSession();
  if (!user) return <LoginRoute />;
  return <AppShell />;
}

export default function App() {
  const { toast, accent, displayFont } = useUiStore();
  const { initSync } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    document.documentElement.style.setProperty('--display', FONT_MAP[displayFont] ?? FONT_MAP.bodoni);
  }, [accent, displayFont]);

  // Init Supabase sync once on mount
  useEffect(() => {
    initSync();
    // Subscribe to local store changes and push to Supabase
    const unsub = useAppStore.subscribe((store) => {
      scheduleSave(store.state);
    });
    return unsub;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {toast && <Toast message={toast} />}
    </QueryClientProvider>
  );
}
