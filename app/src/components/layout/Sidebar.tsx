import { useUiStore } from '@/store/useUiStore';
import { useSession } from '@/store/useSession';
import { BrandLockup } from '@/components/brand/BrandLockup';
import { Icon } from '@/components/ui/Icon';

const NAV = [
  { group: 'Tu proyecto', items: [
    { id: 'dashboard', label: 'Inicio', icon: 'dashboard' },
    { id: 'plan', label: 'Plan por meses', icon: 'roadmap' },
  ]},
  { group: 'La marca', items: [
    { id: 'identidad', label: 'Identidad', icon: 'identity' },
    { id: 'redes', label: 'Redes sociales', icon: 'social' },
    { id: 'obras', label: 'Obras y colecciones', icon: 'obras' },
  ]},
  { group: 'El negocio', items: [
    { id: 'tienda', label: 'Tienda online', icon: 'shop' },
    { id: 'legal', label: 'Legal y finanzas', icon: 'legal' },
    { id: 'aprendizaje', label: 'Aprendizaje', icon: 'learn' },
    { id: 'fiscal', label: 'Conocimientos fiscales generales', icon: 'book', badge: 'Nuevo' },
  ]},
];

export function Sidebar() {
  const { route, setRoute, brandName } = useUiStore();
  const { user, logout } = useSession();

  const userName = user === 'ines' ? 'Inés' : user === 'cristina' ? 'Cristina' : '';
  const userFull = user === 'ines' ? 'Inés de Cueto' : user === 'cristina' ? 'Cristina de Cueto' : '';
  const userRole = user === 'ines' ? 'Artista' : 'Business Manager';
  const isInk = user === 'cristina';

  const go = (id: string) => setRoute(id as Parameters<typeof setRoute>[0]);

  return (
    <aside className="sidebar">
      <div className="brand">
        <BrandLockup name={brandName} variant="crest" size={34} nameSize={18} />
      </div>
      <nav className="nav">
        {NAV.map(sec => (
          <div key={sec.group}>
            <div className="nav-label">{sec.group}</div>
            {sec.items.map(it => (
              <button
                key={it.id}
                className={'nav-item' + (route === it.id ? ' active' : '') + (it.badge ? ' tall' : '')}
                onClick={() => go(it.id)}
              >
                <Icon name={it.icon} size={18} />
                <span>{it.label}</span>
                {it.badge && <span className="nav-badge">{it.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-foot">
        <button className="user-chip" onClick={logout} title="Cerrar sesión">
          <div className={'avatar' + (isInk ? ' ink' : '')}>{userName[0]}</div>
          <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5 }}>{userFull}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{userRole} · Cerrar sesión</div>
          </div>
          <Icon name="arrow" size={15} style={{ color: 'var(--ink-faint)' }} />
        </button>
      </div>
    </aside>
  );
}
