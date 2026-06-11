import { useUiStore } from '@/store/useUiStore';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DashboardRoute } from '@/routes/DashboardRoute';
import { PlanRoute } from '@/routes/PlanRoute';
import { IdentidadRoute } from '@/routes/IdentidadRoute';
import { RedesRoute } from '@/routes/RedesRoute';
import { ObrasRoute } from '@/routes/ObrasRoute';
import { TiendaRoute } from '@/routes/TiendaRoute';
import { LegalRoute } from '@/routes/LegalRoute';
import { AprendizajeRoute } from '@/routes/AprendizajeRoute';
import { FiscalRoute } from '@/routes/FiscalRoute';

function RouteView() {
  const { route } = useUiStore();
  switch (route) {
    case 'dashboard':    return <DashboardRoute />;
    case 'plan':         return <PlanRoute />;
    case 'identidad':    return <IdentidadRoute />;
    case 'redes':        return <RedesRoute />;
    case 'obras':        return <ObrasRoute />;
    case 'tienda':       return <TiendaRoute />;
    case 'legal':        return <LegalRoute />;
    case 'aprendizaje':  return <AprendizajeRoute />;
    case 'fiscal':       return <FiscalRoute />;
    default:             return <DashboardRoute />;
  }
}

export function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-col">
        <Topbar />
        <main className="main-content">
          <RouteView />
        </main>
      </div>
    </div>
  );
}
