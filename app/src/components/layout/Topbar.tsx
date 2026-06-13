import { useState } from 'react';
import { useUiStore } from '@/store/useUiStore';
import { useAppStore } from '@/store/useAppStore';
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

function SearchPanel({ onClose }: { onClose: () => void }) {
  const { state } = useAppStore();
  const { setRoute } = useUiStore();
  const [q, setQ] = useState('');
  const lq = q.toLowerCase().trim();
  const results: { label: string; sub: string; action: () => void }[] = [];

  if (lq.length >= 2) {
    state.MONTHS.forEach((m) => {
      m.tasks.forEach((t) => {
        if (t.title.toLowerCase().includes(lq) || t.notes.toLowerCase().includes(lq)) {
          results.push({ label: t.title, sub: `Mes ${m.n} · ${m.window}`, action: () => { setRoute('plan'); onClose(); } });
        }
      });
    });
    state.OBRAS.forEach((o) => {
      if (o.nombre.toLowerCase().includes(lq) || o.coleccion.toLowerCase().includes(lq) || o.historia.toLowerCase().includes(lq)) {
        results.push({ label: o.nombre, sub: `${o.tecnica} · ${o.medidas}`, action: () => { setRoute('obras'); onClose(); } });
      }
    });
    state.LEARN.forEach((m) => {
      if (m.t.toLowerCase().includes(lq) || m.cat.toLowerCase().includes(lq)) {
        results.push({ label: m.t, sub: `Aprendizaje · ${m.cat}`, action: () => { setRoute('aprendizaje'); onClose(); } });
      }
    });
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(33,29,24,.5)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: 'var(--paper)', borderRadius: 'var(--r-lg)', width: '100%', maxWidth: 560, boxShadow: 'var(--shadow-pop)', overflow: 'hidden' }}>
        <div className="row" style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', gap: 10 }}>
          <Icon name="search" size={17} style={{ color: 'var(--ink-faint)', flex: 'none' }} />
          <input
            autoFocus
            placeholder="Buscar tareas, obras, módulos…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
            style={{ border: 'none', outline: 'none', padding: 0, fontSize: 15, background: 'transparent', flex: 1, fontFamily: 'inherit', color: 'var(--ink)' }}
          />
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>
        <div style={{ maxHeight: 380, overflowY: 'auto' }}>
          {lq.length < 2 && (
            <p className="muted" style={{ padding: '18px 20px', fontSize: 13 }}>Escribe al menos 2 caracteres para buscar.</p>
          )}
          {lq.length >= 2 && results.length === 0 && (
            <p className="muted" style={{ padding: '18px 20px', fontSize: 13 }}>Sin resultados para «{q}».</p>
          )}
          {results.map((r, i) => (
            <button key={i} onClick={r.action}
              style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', textAlign: 'left', padding: '12px 20px', background: 'none', border: 'none', borderBottom: '1px solid var(--line)', cursor: 'pointer', transition: 'background .1s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--paper-2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}>
              <span style={{ fontSize: 14 }}>{r.label}</span>
              <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-mute)' }}>{r.sub}</span>
            </button>
          ))}
        </div>
        {lq.length >= 2 && results.length > 0 && (
          <div style={{ padding: '8px 20px', borderTop: '1px solid var(--line)' }}>
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>{results.length} resultado{results.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function RemindersPanel({ onClose }: { onClose: () => void }) {
  const { state } = useAppStore();
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ position: 'absolute', top: 54, right: 16, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', width: 320, boxShadow: 'var(--shadow-pop)', overflow: 'hidden' }}>
        <div className="row between" style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
          <span className="kicker">Recordatorios</span>
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={15} /></button>
        </div>
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {state.REMINDERS.length === 0 && (
            <p className="muted" style={{ padding: '16px 18px', fontSize: 13 }}>Sin recordatorios pendientes.</p>
          )}
          {state.REMINDERS.map((r, i) => (
            <div key={i} className="row" style={{ gap: 12, padding: '12px 18px', borderBottom: i < state.REMINDERS.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--red-wash)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <Icon name={r.icon} size={15} style={{ color: 'var(--red-deep)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, lineHeight: 1.4 }}>{r.t}</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--red-deep)', marginTop: 3 }}>{r.due}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 18px', borderTop: '1px solid var(--line)', background: 'var(--paper-2)' }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{state.REMINDERS.length} recordatorio{state.REMINDERS.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}

export function Topbar() {
  const { route } = useUiStore();
  const { state } = useAppStore();
  const [showSearch, setShowSearch] = useState(false);
  const [showReminders, setShowReminders] = useState(false);

  return (
    <>
      {showSearch && <SearchPanel onClose={() => setShowSearch(false)} />}
      {showReminders && <RemindersPanel onClose={() => setShowReminders(false)} />}
      <header className="topbar">
        <div className="crumbs">
          Atelier <span style={{ opacity: 0.4 }}>/</span> <b>{ROUTE_TITLES[route] ?? 'Inicio'}</b>
        </div>
        <div className="spacer" />
        <div className="row" style={{ gap: 10 }}>
          <div className="tag" style={{ borderColor: 'var(--red-line)', color: 'var(--red-deep)', background: 'var(--red-wash)' }}>
            <Icon name="flag" size={13} /> Mes 1 · Sep
          </div>
          <button className="icon-btn" title="Buscar" onClick={() => { setShowReminders(false); setShowSearch(true); }}>
            <Icon name="search" size={17} />
          </button>
          <button className="icon-btn" title="Recordatorios" onClick={() => { setShowSearch(false); setShowReminders((v) => !v); }} style={{ position: 'relative' }}>
            <Icon name="bell" size={17} />
            {state.REMINDERS.length > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', border: '1.5px solid var(--paper)' }} />
            )}
          </button>
        </div>
      </header>
    </>
  );
}
