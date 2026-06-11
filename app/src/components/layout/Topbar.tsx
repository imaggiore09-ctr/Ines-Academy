import { useUiStore } from '@/store/useUiStore';
import { Icon } from '@/components/ui/Icon';

const ROUTE_TITLES: Record<string, string> = {
  dashboard: 'Inicio',
  plan: 'Plan por meses',
  identidad: 'Identidad',
  redes: 'Redes sociales',
  obras: 'Obras y colecciones',
  tienda: 'Tienda online',
  legal: 'Legal y finanzas',
  aprendizaje: 'Aprendizaje',
  fiscal: 'Conocimientos fiscales',
};

export function Topbar() {
  const { route } = useUiStore();
  return (
    <header className="topbar">
      <div className="crumbs">
        Atelier <span style={{ opacity: 0.4 }}>/</span> <b>{ROUTE_TITLES[route] ?? 'Inicio'}</b>
      </div>
      <div className="spacer" />
      <div className="row" style={{ gap: 10 }}>
        <div className="tag" style={{ borderColor: 'var(--red-line)', color: 'var(--red-deep)', background: 'var(--red-wash)' }}>
          <Icon name="flag" size={13} /> Mes 1 · Sep
        </div>
        <button className="icon-btn" title="Buscar"><Icon name="search" size={17} /></button>
        <button className="icon-btn" title="Recordatorios"><Icon name="bell" size={17} /></button>
      </div>
    </header>
  );
}
