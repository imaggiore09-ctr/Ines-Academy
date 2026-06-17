import { useState, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Modal } from '@/components/ui/Modal';
import { Icon } from '@/components/ui/Icon';
import { Bar } from '@/components/ui/Bar';
import { ImgPh } from '@/components/ui/ImgPh';
import { Spots } from '@/components/ui/Spots';
import { PageHead } from '@/components/ui/PageHead';
import { LEARN_CONTENT } from '@/data/learn';
import type { Lesson } from '@/data/learn';
import type { LearnModule } from '@/types/models';

const EJERCICIOS_KEY = 'atelier_ejercicios_v1';
function loadEjercicios(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(EJERCICIOS_KEY) || '{}'); } catch { return {}; }
}
function saveEjercicio(key: string, value: string) {
  const all = loadEjercicios();
  all[key] = value;
  try { localStorage.setItem(EJERCICIOS_KEY, JSON.stringify(all)); } catch { /* ignore */ }
}

/* ─── Vista de una lección abierta ─── */
function LessonView({ lesson, index, total, modId, onBack }: { lesson: Lesson; index: number; total: number; modId: string; onBack: () => void }) {
  const ejercicioKey = `${modId}-${index}`;
  const [respuesta, setRespuesta] = useState(() => loadEjercicios()[ejercicioKey] || '');
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback((v: string) => {
    setRespuesta(v);
    setSaved(false);
  }, []);

  const handleSave = () => {
    saveEjercicio(ejercicioKey, respuesta);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <button className="btn ghost sm" onClick={onBack} style={{ marginBottom: 16 }}>
        <Icon name="chevron" size={14} style={{ transform: 'rotate(180deg)' }} /> Todas las lecciones
      </button>
      <div className="kicker kicker-red">Lección {String(index + 1).padStart(2, '0')} de {total} · {lesson.duracion} min</div>
      <h3 className="display" style={{ fontSize: 24, margin: '8px 0 18px' }}>{lesson.t}</h3>

      {lesson.contenido.map((p, i) => (
        <p key={i} style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 14 }}>{p}</p>
      ))}

      <div style={{ background: 'var(--paper-2)', borderRadius: 'var(--r-md)', padding: '16px 18px', margin: '20px 0' }}>
        <div className="kicker" style={{ marginBottom: 10 }}>Lo que te llevas</div>
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ink-soft)', fontSize: 13.5, lineHeight: 1.7 }}>
          {lesson.clave.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>

      <div style={{ background: 'var(--red-wash)', border: '1px solid var(--red-line)', borderRadius: 'var(--r-md)', padding: '15px 18px', marginBottom: 4 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          <Icon name="edit" size={18} style={{ color: 'var(--red-deep)', flex: 'none', marginTop: 2 }} />
          <div>
            <div className="kicker kicker-red" style={{ marginBottom: 5 }}>Ejercicio aplicado</div>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{lesson.ejercicio}</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--red-line)', paddingTop: 14 }}>
          <div className="kicker kicker-red" style={{ marginBottom: 8 }}>Tu respuesta</div>
          <textarea
            className="textarea tall"
            value={respuesta}
            placeholder="Escribe aquí tu reflexión, ideas o ejercicio… Pulsa «Guardar respuesta» cuando termines."
            onChange={(e) => handleChange(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,.65)', borderColor: 'var(--red-line)', marginBottom: 10, boxSizing: 'border-box' }}
          />
          <div className="row" style={{ gap: 10, justifyContent: 'flex-end' }}>
            {saved && <span className="mono" style={{ fontSize: 11, color: 'var(--done)', alignSelf: 'center' }}>✓ Guardado</span>}
            <button className="btn red sm" onClick={handleSave}>
              <Icon name="check" size={14} /> Guardar respuesta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonModal({ mod, onClose }: { mod: LearnModule; onClose: () => void }) {
  const { toggleModule } = useAppStore();
  const content = LEARN_CONTENT[mod.id];
  const [open, setOpen] = useState<number | null>(null);

  // Fallback si aún no hay contenido para este módulo
  if (!content) {
    return (
      <Modal kicker={mod.cat + ' · ' + mod.min + ' min'} title={mod.t} onClose={onClose} wide
        footer={<button className="btn ghost sm" onClick={onClose}>Cerrar</button>}>
        <p className="muted">Contenido en preparación.</p>
      </Modal>
    );
  }

  const lesson = open !== null ? content.lessons[open] : null;

  return (
    <Modal
      kicker={mod.cat + ' · ' + mod.min + ' min · ' + content.lessons.length + ' lecciones'}
      title={mod.t}
      onClose={onClose}
      wide
      footer={
        <>
          {open !== null && content.lessons[open + 1] && (
            <button className="btn ghost sm" onClick={() => setOpen(open + 1)} style={{ marginRight: 'auto' }}>
              Siguiente lección <Icon name="arrow" size={14} />
            </button>
          )}
          <button className="btn ghost sm" onClick={onClose}>Cerrar</button>
          <button className="btn red sm" onClick={() => { toggleModule(mod.id); onClose(); }}>
            <Icon name="check" size={15} /> {mod.done ? 'Marcar sin completar' : 'Marcar completado'}
          </button>
        </>
      }
    >
      {lesson ? (
        <LessonView lesson={lesson} index={open!} total={content.lessons.length} modId={mod.id} onBack={() => setOpen(null)} />
      ) : (
        <>
          <ImgPh label="Portada del módulo" style={{ aspectRatio: '16/7', marginBottom: 18 }} />
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 16 }}>{content.intro}</p>

          <div className="grid g-2" style={{ gap: 16, marginBottom: 22 }}>
            <div style={{ background: 'var(--paper-2)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
              <div className="kicker" style={{ marginBottom: 10 }}>Qué vas a conseguir</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.65 }}>
                {content.objetivos.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
            <div style={{ background: 'var(--paper-2)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
              <div className="kicker" style={{ marginBottom: 10 }}>Para quién y cuándo</div>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{content.paraQuien}</p>
            </div>
          </div>

          <div className="kicker" style={{ marginBottom: 12 }}>Lecciones</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {content.lessons.map((l, i) => (
              <button key={i} className="row" onClick={() => setOpen(i)}
                style={{ gap: 12, padding: '13px 4px', borderBottom: i < content.lessons.length - 1 ? '1px solid var(--line)' : 'none', background: 'none', border: 'none', borderBottomStyle: 'solid', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                <span className="display" style={{ fontSize: 16, color: 'var(--red)', width: 26, flex: 'none' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ flex: 1, fontSize: 14 }}>{l.t}</span>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>{l.duracion} min</span>
                <Icon name="arrow" size={15} style={{ color: 'var(--ink-faint)', flex: 'none' }} />
              </button>
            ))}
          </div>
        </>
      )}
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
