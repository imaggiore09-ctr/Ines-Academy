import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Bar } from '@/components/ui/Bar';
import { Icon } from '@/components/ui/Icon';

function fmtDate(s: string) {
  if (!s) return '';
  const parts = new Date(s + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).split(' ');
  return parts;
}

function MetricTile({ label, value, goal, onChange, icon }: { label: string; value: number; goal?: number; onChange: (v: number) => void; icon: string }) {
  const [edit, setEdit] = useState(false);
  return (
    <div className="card" style={{ padding: '18px 20px' }}>
      <div className="row between" style={{ marginBottom: 10 }}>
        <span className="mono" style={{ fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>{label}</span>
        <Icon name={icon} size={15} style={{ color: 'var(--ink-faint)' }} />
      </div>
      {edit
        ? <input className="input" type="number" autoFocus value={value} onChange={(e) => onChange(parseInt(e.target.value) || 0)} onBlur={() => setEdit(false)} onKeyDown={(e) => { if (e.key === 'Enter') setEdit(false); }} style={{ fontFamily: 'var(--display)', fontSize: 26, padding: '2px 6px' }} />
        : <div className="stat-num" onClick={() => setEdit(true)} style={{ cursor: 'pointer' }}>{value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}</div>}
      {goal && <div style={{ marginTop: 12 }}>
        <Bar pct={Math.min(100, value / goal * 100)} />
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 6 }}>Meta: {goal.toLocaleString('es-ES')}</div>
      </div>}
    </div>
  );
}

function IdeaColumn({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  return (
    <div className="card">
      <div className="card-hd" style={{ marginBottom: 14 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--paper-2)', display: 'grid', placeItems: 'center', color: 'var(--ink-soft)' }}>
          <Icon name={icon} size={16} />
        </div>
        <h3 className="display" style={{ fontSize: 17 }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {items.map((it, i) => (
          <div key={i} className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--red)', marginTop: 2 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: 13.5, lineHeight: 1.45 }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RedesRoute() {
  const { state, setMetrics } = useAppStore();
  const s = state.SOCIAL;
  const m = s.metrics;
  const typeColor: Record<string, string> = { Post: 'var(--ink)', Reel: 'var(--red)', Story: 'var(--ink-faint)', Carrusel: 'var(--ink-soft)' };

  return (
    <div className="page">
      <div style={{ marginBottom: 28 }}>
        <div className="kicker kicker-red">La marca</div>
        <h1 className="page-title" style={{ marginTop: 8 }}>Redes sociales</h1>
        <p className="page-intro" style={{ marginTop: 12 }}>Planifica el contenido, guarda ideas y sigue el pulso de la cuenta sin que te coma el tiempo.</p>
      </div>

      <div className="kicker" style={{ marginBottom: 12 }}>Métricas básicas</div>
      <div className="grid g-4" style={{ marginBottom: 28 }}>
        <MetricTile label="Seguidores" value={m.seguidores} goal={m.seguidoresGoal} icon="user" onChange={(v) => setMetrics({ seguidores: v })} />
        <MetricTile label="Alcance" value={m.alcance} icon="eye" onChange={(v) => setMetrics({ alcance: v })} />
        <MetricTile label="Interacciones" value={m.interacciones} icon="heart" onChange={(v) => setMetrics({ interacciones: v })} />
        <MetricTile label="Mensajes" value={m.mensajes} icon="mail" onChange={(v) => setMetrics({ mensajes: v })} />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr', alignItems: 'start', gap: 26, marginBottom: 28 }}>
        <div className="card">
          <div className="card-hd between">
            <div>
              <div className="kicker">Calendario de contenidos</div>
              <h3 className="display" style={{ fontSize: 19, marginTop: 4 }}>Próximas publicaciones</h3>
            </div>
            <Icon name="calendar" size={18} style={{ color: 'var(--ink-faint)' }} />
          </div>
          <div>
            {s.calendar.map((c, i) => {
              const parts = fmtDate(c.day);
              return (
                <div key={i} className="row" style={{ gap: 14, padding: '12px 0', borderBottom: i < s.calendar.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <div style={{ textAlign: 'center', width: 44, flex: 'none' }}>
                    <div className="display" style={{ fontSize: 20, lineHeight: 1 }}>{parts[0]}</div>
                    <div className="mono" style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{parts[1]}</div>
                  </div>
                  <div style={{ width: 3, height: 30, borderRadius: 2, background: typeColor[c.type] || 'var(--ink)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14 }}>{c.title}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 1 }}>{c.type}</div>
                  </div>
                  <span className="pill todo">Programado</span>
                </div>
              );
            })}
          </div>
          <button className="btn ghost sm" style={{ marginTop: 16 }}><Icon name="plus" size={14} /> Programar publicación</button>
        </div>

        <div className="card" style={{ background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>
          <div className="kicker" style={{ color: 'rgba(255,255,255,.5)', marginBottom: 14 }}>Antes de publicar</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {s.checklist.map((c, i) => (
              <div key={i} className="row" style={{ gap: 11 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.3)', flex: 'none', marginTop: 1 }} />
                <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,.85)' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="kicker" style={{ marginBottom: 12 }}>Banco de ideas</div>
      <div className="grid g-3" style={{ marginBottom: 18 }}>
        <IdeaColumn title="Ideas para reels" items={s.reels} icon="social" />
        <IdeaColumn title="Ideas para stories" items={s.stories} icon="sparkle" />
        <IdeaColumn title="Ideas para carruseles" items={s.carruseles} icon="grid" />
      </div>
      <div className="grid g-2">
        <IdeaColumn title="Banco de frases" items={s.frases} icon="edit" />
        <IdeaColumn title="Guiones para vídeos" items={s.guiones} icon="doc" />
      </div>
    </div>
  );
}
