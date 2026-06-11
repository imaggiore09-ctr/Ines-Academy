import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Modal } from '@/components/ui/Modal';
import { Icon } from '@/components/ui/Icon';
import { Bar } from '@/components/ui/Bar';
import { ImgPh } from '@/components/ui/ImgPh';
import { Spots } from '@/components/ui/Spots';
import { PageHead } from '@/components/ui/PageHead';
import type { LearnModule } from '@/types/models';

function LessonModal({ mod, onClose }: { mod: LearnModule; onClose: () => void }) {
  const { toggleModule } = useAppStore();
  return (
    <Modal
      kicker={mod.cat + ' · ' + mod.min + ' min'}
      title={mod.t}
      onClose={onClose}
      wide
      footer={
        <>
          <button className="btn ghost sm" onClick={onClose}>Cerrar</button>
          <button className="btn red sm" onClick={() => { toggleModule(mod.id); onClose(); }}>
            <Icon name="check" size={15} /> {mod.done ? 'Marcar sin completar' : 'Marcar completado'}
          </button>
        </>
      }
    >
      <ImgPh label="Portada del módulo" style={{ aspectRatio: '16/7', marginBottom: 18 }} />
      <p className="muted" style={{ marginBottom: 18 }}>
        Una guía práctica en {mod.mods} lecciones para que avances a tu ritmo. Cada lección incluye un ejercicio aplicado a tu propio proyecto.
      </p>
      <div className="kicker" style={{ marginBottom: 12 }}>Lecciones</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Array.from({ length: mod.mods }).map((_, i) => (
          <div key={i} className="row" style={{ gap: 12, padding: '11px 0', borderBottom: i < mod.mods - 1 ? '1px solid var(--line)' : 'none' }}>
            <span className="display" style={{ fontSize: 16, color: 'var(--red)', width: 26 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ flex: 1, fontSize: 14 }}>Lección {i + 1}</span>
            <Icon name="arrow" size={15} style={{ color: 'var(--ink-faint)' }} />
          </div>
        ))}
      </div>
    </Modal>
  );
}

export function AprendizajeRoute() {
  const { state } = useAppStore();
  const [open, setOpen] = useState<LearnModule | null>(null);
  const mods = state.LEARN;
  const done = mods.filter(m => m.done).length;
  const featured = mods.find(m => !m.done) || mods[0];

  return (
    <div className="page">
      {open && <LessonModal mod={open} onClose={() => setOpen(null)} />}
      <PageHead
        kicker="Formación"
        title="Aprendizaje"
        intro="Mini cursos para cada paso del camino. Aprende justo lo que necesitas, cuando lo necesitas."
      />

      <div className="card flush" style={{ marginBottom: 26, display: 'grid', gridTemplateColumns: '1.1fr 1fr', overflow: 'hidden' }}>
        <div style={{ background: 'var(--ink)', color: '#fff', padding: '34px 34px', position: 'relative', overflow: 'hidden' }}>
          <Spots specs={[{ w: 70, h: 62, t: '-8%', r: '10%', r0: 16, c: '#262420' }, { w: 44, h: 48, b: '8%', l: '8%', r0: -10, c: '#26241c' }]} />
          <div style={{ position: 'relative' }}>
            <div className="kicker" style={{ color: 'rgba(255,255,255,.5)' }}>Empieza por aquí · {featured.cat}</div>
            <h2 className="display" style={{ fontSize: 32, lineHeight: 1.05, margin: '12px 0 14px', color: '#fff' }}>{featured.t}</h2>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 14, maxWidth: '34ch' }}>
              {featured.mods} lecciones · {featured.min} min · aplicado a tu proyecto
            </p>
            <button className="btn red" style={{ marginTop: 22 }} onClick={() => setOpen(featured)}>
              <Icon name="arrow" size={16} /> Empezar módulo
            </button>
          </div>
        </div>
        <ImgPh label="Portada destacada" style={{ borderRadius: 0, border: 'none', minHeight: 260 }} />
      </div>

      <div className="row between" style={{ marginBottom: 16 }}>
        <div className="kicker">Todos los módulos</div>
        <div className="row" style={{ gap: 12, width: 240 }}>
          <Bar pct={Math.round((done / mods.length) * 100)} />
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', whiteSpace: 'nowrap' }}>{done}/{mods.length}</span>
        </div>
      </div>

      <div className="grid g-3">
        {mods.map(m => (
          <button key={m.id} className="mod" onClick={() => setOpen(m)}>
            <div style={{ position: 'relative' }}>
              <ImgPh label={m.cat} className="mod-cover" style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid var(--line)' }} />
              {m.done && (
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--done)', color: '#fff', borderRadius: 999, width: 26, height: 26, display: 'grid', placeItems: 'center' }}>
                  <Icon name="check" size={15} />
                </div>
              )}
            </div>
            <div className="mod-body">
              <div className="row between" style={{ marginBottom: 8 }}>
                <span className="tag">{m.cat}</span>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>{m.min} min</span>
              </div>
              <div className="display" style={{ fontSize: 18, lineHeight: 1.12 }}>{m.t}</div>
              <div className="row" style={{ gap: 6, marginTop: 12 }}>
                <Icon name="learn" size={13} style={{ color: 'var(--ink-faint)' }} />
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{m.mods} lecciones</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
