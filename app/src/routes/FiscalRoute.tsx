import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Icon } from '@/components/ui/Icon';
import { Check } from '@/components/ui/Check';
import { Ring } from '@/components/ui/Ring';
import { Bar } from '@/components/ui/Bar';
import { Spots } from '@/components/ui/Spots';
import { PageHead } from '@/components/ui/PageHead';
import { FISCAL_MODULES } from '@/data/edu';
import type { FiscalModule } from '@/data/edu';
import type { ReactNode } from 'react';

const FISCAL_KEY = 'atelier_fiscal_v1';
type ChecksMap = Record<string, boolean[]>;

function loadFiscal(): ChecksMap {
  try { return JSON.parse(localStorage.getItem(FISCAL_KEY) || '{}'); } catch { return {}; }
}

function Section({ label, icon, children }: { label: string; icon: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div className="row" style={{ gap: 9, marginBottom: 10 }}>
        <Icon name={icon} size={16} style={{ color: 'var(--red)' }} />
        <div className="kicker">{label}</div>
      </div>
      {children}
    </div>
  );
}

function FiscalModal({ mod, checks, setChecks, onClose }: {
  mod: FiscalModule; checks: ChecksMap; setChecks: (c: ChecksMap) => void; onClose: () => void;
}) {
  const arr = checks[mod.id] || [];
  const toggle = (i: number) => {
    setChecks({ ...checks, [mod.id]: mod.checklist.map((_, j) => (j === i ? !arr[j] : !!arr[j])) });
  };
  return (
    <Modal
      kicker={'Módulo · ' + mod.min + ' min de lectura'}
      title={mod.t}
      onClose={onClose}
      wide
      footer={<button className="btn red sm" onClick={onClose}>Hecho</button>}
    >
      <Section label="En sencillo" icon="book">
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{mod.intro}</p>
      </Section>

      <Section label="Ejemplo real" icon="sparkle">
        <div style={{ background: 'var(--paper-2)', borderLeft: '3px solid var(--red)', borderRadius: '0 var(--r-md) var(--r-md) 0', padding: '13px 16px' }}>
          <p className="display-i" style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{mod.ejemplo}</p>
        </div>
      </Section>

      <Section label="Errores frecuentes" icon="info">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {mod.errores.map((e, i) => (
            <div key={i} className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--red)', fontFamily: 'var(--mono)', fontSize: 13, marginTop: 1 }}>✕</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.45 }}>{e}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Checklist de comprensión" icon="check">
        <div>
          {mod.checklist.map((c, i) => (
            <div key={i} className={'task' + (arr[i] ? ' is-done' : '')} style={{ padding: '10px 2px' }}>
              <Check on={!!arr[i]} onClick={() => toggle(i)} />
              <div className="t-main" style={{ alignSelf: 'center' }}>
                <div className="t-title" style={{ fontSize: 14 }}>{c}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Recursos útiles" icon="doc">
        <div className="row wrap" style={{ gap: 8 }}>
          {mod.recursos.map((r, i) => (
            <span key={i} className="tag"><Icon name="arrow" size={12} /> {r}</span>
          ))}
        </div>
      </Section>
    </Modal>
  );
}

export function FiscalRoute() {
  const mods = FISCAL_MODULES;
  const [checks, setChecksRaw] = useState<ChecksMap>(loadFiscal);
  const [open, setOpen] = useState<FiscalModule | null>(null);
  const setChecks = (next: ChecksMap) => {
    setChecksRaw(next);
    try { localStorage.setItem(FISCAL_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const modProgress = (m: FiscalModule) => {
    const a = checks[m.id] || [];
    const d = m.checklist.filter((_, i) => a[i]).length;
    return Math.round((d / m.checklist.length) * 100);
  };
  const completed = mods.filter(m => modProgress(m) === 100).length;

  return (
    <div className="page">
      {open && <FiscalModal mod={open} checks={checks} setChecks={setChecks} onClose={() => setOpen(null)} />}
      <PageHead
        kicker="Academia privada"
        title="Conocimientos fiscales"
        intro="Los fundamentos de tener un negocio creativo en España, explicados sin jerga. Aprende a tu ritmo lo justo para entender a tu asesoría y tomar buenas decisiones."
      />

      <div className="card flush" style={{ marginBottom: 28, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', background: 'var(--ink)', borderColor: 'var(--ink)' }}>
        <div style={{ padding: '26px 30px', position: 'relative', overflow: 'hidden' }}>
          <Spots specs={[{ w: 60, h: 54, t: '-12%', r: '6%', r0: 16, c: '#262420' }, { w: 38, h: 42, b: '6%', l: '4%', r0: -8, c: '#26241c' }]} />
          <div style={{ position: 'relative' }}>
            <div className="kicker" style={{ color: 'rgba(255,255,255,.5)' }}>De artista a empresaria</div>
            <h2 className="display" style={{ fontSize: 26, lineHeight: 1.15, margin: '10px 0 8px', color: '#fff', maxWidth: '30ch' }}>
              Entender tu negocio te hace libre. Empieza por lo esencial.
            </h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 13.5, maxWidth: '44ch' }}>
              10 módulos breves. No es asesoramiento legal: es la base para hablar con seguridad con tu asesoría.
            </p>
          </div>
        </div>
        <div style={{ padding: '26px 30px', textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,.12)' }}>
          <Ring pct={Math.round((completed / mods.length) * 100)} size={80} stroke={6} track="rgba(255,255,255,.15)">
            <div className="display" style={{ fontSize: 20, color: '#fff' }}>{completed}/{mods.length}</div>
          </Ring>
          <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', marginTop: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Módulos al día
          </div>
        </div>
      </div>

      <div className="grid g-3">
        {mods.map((m, i) => {
          const p = modProgress(m);
          return (
            <button key={m.id} className="mod" onClick={() => setOpen(m)} style={{ cursor: 'pointer' }}>
              <div className="mod-body" style={{ display: 'flex', flexDirection: 'column', gap: 0, height: '100%' }}>
                <div className="row between" style={{ marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: 'var(--paper-2)', display: 'grid', placeItems: 'center', color: 'var(--ink-soft)' }}>
                    <Icon name={m.icon} size={18} />
                  </div>
                  {p === 100
                    ? <div style={{ background: 'var(--done)', color: '#fff', borderRadius: 999, width: 24, height: 24, display: 'grid', placeItems: 'center' }}><Icon name="check" size={14} /></div>
                    : <span className="display" style={{ fontSize: 22, color: 'var(--line-strong)' }}>{String(i + 1).padStart(2, '0')}</span>}
                </div>
                <div className="display" style={{ fontSize: 18, lineHeight: 1.12, marginBottom: 8 }}>{m.t}</div>
                <p className="muted" style={{ fontSize: 12.5, lineHeight: 1.5, marginBottom: 16, flex: 1 }}>
                  {m.intro.length > 96 ? m.intro.slice(0, 94) + '…' : m.intro}
                </p>
                <div className="row between" style={{ marginTop: 'auto' }}>
                  <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>{m.min} min</span>
                  <span className="mono" style={{ fontSize: 10.5, color: p ? 'var(--red-deep)' : 'var(--ink-faint)' }}>{p}%</span>
                </div>
                <div style={{ marginTop: 8 }}><Bar pct={p} /></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
