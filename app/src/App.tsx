import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useSession } from '@/store/useSession';
import { useUiStore } from '@/store/useUiStore';
import { AppShell } from '@/components/layout/AppShell';
import { LoginRoute } from '@/routes/LoginRoute';
import { Toast } from '@/components/ui/Toast';
import '@/styles/tokens.css';
import '@/styles/globals.css';

function Router() {
  const { user } = useSession();
  if (!user) return <LoginRoute />;
  return <AppShell />;
}

export default function App() {
  const { toast } = useUiStore();
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {toast && <Toast message={toast} />}
    </QueryClientProvider>
  );
}
