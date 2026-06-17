import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icon } from '@/components/ui/Icon';
import { Field } from '@/components/ui/Field';
import { Spots } from '@/components/ui/Spots';

function ChipEditor({ label, items, onChange, accent }: { label: string; items: string[]; onChange: (v: string[]) => void; accent?: boolean }) {
  const [val, setVal] = useState('');
  const add = () => { const v = val.trim(); if (!v) return; onChange([...items, v]); setVal(''); };
  return (
    <div className="field">
      <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 8 }}>{label}</span>
      <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
        {items.map((it, i) => (
          <span key={i} className="tag" style={accent ? { borderColor: 'var(--red-line)', color: 'var(--red-deep)', background: 'var(--red-wash)' } : undefined}>
            {it}
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} style={{ border: 'none', background: 'none', padding: 0, marginLeft: 2, color: 'inherit', cursor: 'pointer', opacity: .6, display: 'flex' }}>
              <Icon name="x" size={11} />
            </button>
          </span>
        ))}
        {items.length === 0 && <span className="faint" style={{ fontSize: 13 }}>Aún nada — añade abajo.</span>}
      </div>
      <div className="row" style={{ gap: 8 }}>
        <input className="input" value={val} placeholder="Escribe y pulsa Añadir…"
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
        <button className="btn ghost sm" onClick={add}>Añadir</button>
      </div>
    </div>
  );
}

export function IdentidadRoute() {
  const { state, setIdentity } = useAppStore();
  const id = state.IDENTITY;
  const set = (k: keyof typeof id) => (v: string | string[]) => setIdentity({ [k]: v });

  return (
    <div className="page">
      <div style={{ marginBottom: 28 }}>
        <div className="kicker kicker-red">La marca</div>
        <h1 className="page-title" style={{ marginTop: 8 }}>Identidad de marca</h1>
        <div className="row between" style={{ marginTop: 12 }}>
          <p className="page-intro" style={{ margin: 0 }}>El corazón de todo. Guarda aquí quién es Inés como artista. Todo se guarda automáticamente.</p>
          <span className="tag"><Icon name="check" size={13} /> Guardado</span>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.45fr 1fr', alignItems: 'start', gap: 26 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="kicker kicker-red" style={{ marginBottom: 16 }}>01 · Esencia</div>
            <Field label="Nombre artístico / de marca" value={id.nombre} onChange={set('nombre') as (v: string) => void} placeholder="Pendiente de decidir…" />
            <Field label="Frase de presentación" value={id.frase} onChange={set('frase') as (v: string) => void} area />
            <Field label="Historia personal" value={id.historia} onChange={set('historia') as (v: string) => void} area />
          </div>
          <div className="card">
            <div className="kicker kicker-red" style={{ marginBottom: 16 }}>02 · Personalidad</div>
            <ChipEditor label="Valores de marca" items={id.valores} onChange={set('valores') as (v: string[]) => void} accent />
            <Field label="Estilo artístico" value={id.estilo} onChange={set('estilo') as (v: string) => void} area />
            <ChipEditor label="Temas recurrentes" items={id.temas} onChange={set('temas') as (v: string[]) => void} />
            <ChipEditor label="Inspiraciones" items={id.inspiraciones} onChange={set('inspiraciones') as (v: string[]) => void} />
          </div>
          <div className="card">
            <div className="kicker kicker-red" style={{ marginBottom: 16 }}>03 · Voz y tono</div>
            <Field label="Tono de voz" value={id.voz} onChange={set('voz') as (v: string) => void} area />
            <div className="grid g-2" style={{ gap: 18 }}>
              <ChipEditor label="Palabras que SÍ representan la marca" items={id.siPalabras} onChange={set('siPalabras') as (v: string[]) => void} accent />
              <ChipEditor label="Palabras que NO la representan" items={id.noPalabras} onChange={set('noPalabras') as (v: string[]) => void} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 80 }}>
          <div className="card flush">
            <div style={{ background: 'var(--ink)', color: '#fff', padding: '26px 24px', position: 'relative', overflow: 'hidden' }}>
              <Spots specs={[{ w: 60, h: 54, t: '-10%', r: '8%', r0: 16, c: '#262420' }, { w: 36, h: 40, b: '10%', l: '6%', r0: -8, c: '#26241c' }]} />
              <div className="kicker" style={{ color: 'rgba(255,255,255,.5)', position: 'relative' }}>Vista de marca</div>
              <div className="display" style={{ fontSize: 30, marginTop: 8, position: 'relative' }}>{id.nombre || 'Inés de Cueto'}</div>
              <p className="display-i" style={{ color: 'rgba(255,255,255,.7)', fontSize: 16, marginTop: 8, position: 'relative' }}>"{id.frase || 'Tu frase aparecerá aquí'}"</p>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div className="kicker" style={{ marginBottom: 10 }}>Valores</div>
              <div className="row wrap" style={{ gap: 7, marginBottom: 18 }}>
                {id.valores.map((v, i) => <span key={i} className="tag">{v}</span>)}
              </div>
              <div className="kicker" style={{ marginBottom: 10 }}>Paleta</div>
              <div className="row" style={{ gap: 8 }}>
                {id.paleta.map((c, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{ height: 46, borderRadius: 6, background: c, border: '1px solid var(--line)' }} />
                    <div className="mono" style={{ fontSize: 9, color: 'var(--ink-faint)', marginTop: 5, textAlign: 'center' }}>{c}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="kicker kicker-red" style={{ marginBottom: 14 }}>04 · Sistema visual</div>
            <Field label="Tipografías" value={id.tipografias} onChange={set('tipografias') as (v: string) => void} />
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16, marginTop: 4 }}>
              <div className="display" style={{ fontSize: 32, lineHeight: 1 }}>Aa</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 8 }}>Bodoni Moda · display</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, marginTop: 12 }}>Aa Bb Cc 0123</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 4 }}>IBM Plex Mono · detalles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
