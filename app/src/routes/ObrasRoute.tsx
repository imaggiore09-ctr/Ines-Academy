import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icon } from '@/components/ui/Icon';
import { ImgPh } from '@/components/ui/ImgPh';
import { Modal } from '@/components/ui/Modal';
import { Field } from '@/components/ui/Field';
import type { Obra, ObraEstado } from '@/types/models';

const ESTADOS: ObraEstado[] = ['en proceso', 'terminada', 'fotografiada', 'publicada', 'vendida'];
const ESTADO_PILL: Record<ObraEstado, string> = { 'en proceso': 'todo', terminada: 'todo', fotografiada: 'doing', publicada: 'doing', vendida: 'done' };

function eur(n: number) { return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }); }

function ObraModal({ obra, onClose }: { obra: Obra | null; onClose: () => void }) {
  const { addObra, setObra, deleteObra } = useAppStore();
  const isNew = !obra;
  const [f, setF] = useState<Partial<Obra>>(obra || { nombre: '', tecnica: '', medidas: '', fecha: '', precio: 0, estado: 'en proceso', coleccion: '', diseno: '', historia: '' });
  const set = (k: keyof Obra, v: string | number | ObraEstado) => setF({ ...f, [k]: v });
  const save = () => {
    if (!f.nombre?.trim()) return;
    const data = { ...f, precio: Number(f.precio) || 0 } as Obra;
    if (isNew) addObra(data); else setObra(obra!.id, data);
    onClose();
  };
  return (
    <Modal kicker={isNew ? 'Nueva obra' : 'Editar obra'} title={isNew ? 'Registrar obra' : (f.nombre || 'Obra')} onClose={onClose} wide
      footer={<>
        {!isNew && <button className="btn ghost sm" onClick={() => { deleteObra(obra!.id); onClose(); }} style={{ marginRight: 'auto', color: 'var(--red-deep)', borderColor: 'var(--red-line)' }}><Icon name="trash" size={15} /> Eliminar</button>}
        <button className="btn ghost sm" onClick={onClose}>Cancelar</button>
        <button className="btn red sm" onClick={save}>{isNew ? 'Registrar' : 'Guardar'}</button>
      </>}>
      <div className="grid g-2" style={{ gap: 18 }}>
        <ImgPh label="Foto de referencia" style={{ aspectRatio: '4/5' }} />
        <div>
          <Field label="Nombre de la obra" value={f.nombre || ''} onChange={(v) => set('nombre', v)} />
          <Field label="Técnica" value={f.tecnica || ''} onChange={(v) => set('tecnica', v)} placeholder="Óleo sobre lino…" />
          <div className="row" style={{ gap: 12 }}>
            <Field label="Medidas" value={f.medidas || ''} onChange={(v) => set('medidas', v)} placeholder="60 × 50 cm" />
            <label className="field" style={{ flex: 1 }}>
              <span>Precio (€)</span>
              <input className="input" type="number" value={f.precio || ''} onChange={(e) => set('precio', parseInt(e.target.value) || 0)} />
            </label>
          </div>
        </div>
      </div>
      <div className="row" style={{ gap: 12 }}>
        <label className="field" style={{ flex: 1 }}>
          <span>Fecha</span>
          <input type="date" className="input" value={f.fecha || ''} onChange={(e) => set('fecha', e.target.value)} />
        </label>
        <label className="field" style={{ flex: 1 }}>
          <span>Estado</span>
          <select className="input" value={f.estado || 'en proceso'} onChange={(e) => set('estado', e.target.value as ObraEstado)}>
            {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <Field label="Colección" value={f.coleccion || ''} onChange={(v) => set('coleccion', v)} />
      </div>
      <Field label="Tipo de diseño (p.ej. Figurativo, Minimalista, Bodegón…)" value={f.diseno || ''} onChange={(v) => set('diseno', v)} placeholder="Escribe el tipo de diseño…" />
      <Field label="Historia de la obra" value={f.historia || ''} onChange={(v) => set('historia', v)} area />
    </Modal>
  );
}

function ObraCard({ o, onClick }: { o: Obra; onClick: () => void }) {
  return (
    <button className="mod" onClick={onClick} style={{ cursor: 'pointer' }}>
      <ImgPh label={o.tecnica.split(' ')[0] || 'obra'} className="mod-cover" style={{ aspectRatio: '4/5', borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }} />
      <div className="mod-body">
        <div className="row between" style={{ marginBottom: 6 }}>
          <span className={'pill ' + ESTADO_PILL[o.estado]}>{o.estado}</span>
          <span className="display" style={{ fontSize: 16 }}>{o.precio ? eur(o.precio) : '—'}</span>
        </div>
        <div className="display" style={{ fontSize: 18, lineHeight: 1.1 }}>{o.nombre}</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 6 }}>{o.tecnica} · {o.medidas}</div>
        <div className="row wrap" style={{ gap: 6, marginTop: 8 }}>
          {o.coleccion && <div className="tag" style={{ fontSize: 11 }}><Icon name="obras" size={11} /> {o.coleccion}</div>}
          {o.diseno && <div className="tag" style={{ fontSize: 11, borderColor: 'var(--red-line)', color: 'var(--red-deep)', background: 'var(--red-wash)' }}>{o.diseno}</div>}
        </div>
      </div>
    </button>
  );
}

export function ObrasRoute() {
  const { state } = useAppStore();
  const [view, setView] = useState<'grid' | 'tabla'>('grid');
  const [fc, setFc] = useState('todas');
  const [fe, setFe] = useState('todos');
  const [fd, setFd] = useState('todos');
  const [edit, setEdit] = useState<Obra | null | undefined>(undefined);

  const colecciones = [...new Set(state.OBRAS.map((o) => o.coleccion).filter(Boolean))];
  const disenos = [...new Set(state.OBRAS.map((o) => o.diseno).filter(Boolean))];
  let obras = state.OBRAS;
  if (fc !== 'todas') obras = obras.filter((o) => o.coleccion === fc);
  if (fe !== 'todos') obras = obras.filter((o) => o.estado === fe);
  if (fd !== 'todos') obras = obras.filter((o) => o.diseno === fd);
  const vendidas = state.OBRAS.filter((o) => o.estado === 'vendida').length;

  return (
    <div className="page">
      {edit !== undefined && <ObraModal obra={edit} onClose={() => setEdit(undefined)} />}
      <div style={{ marginBottom: 28 }} className="row between wrap">
        <div>
          <div className="kicker kicker-red">La marca</div>
          <h1 className="page-title" style={{ marginTop: 8 }}>Obras y colecciones</h1>
          <p className="page-intro" style={{ marginTop: 12 }}>El inventario vivo del estudio. Cada obra con su historia, su estado y su precio.</p>
        </div>
        <button className="btn red" onClick={() => setEdit(null)}><Icon name="plus" size={16} /> Registrar obra</button>
      </div>

      <div className="grid g-4" style={{ marginBottom: 24 }}>
        <div className="card" style={{ padding: '16px 20px' }}><div className="stat-num sm">{state.OBRAS.length}</div><div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 5 }}>Obras totales</div></div>
        <div className="card" style={{ padding: '16px 20px' }}><div className="stat-num sm">{colecciones.length}</div><div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 5 }}>Colecciones</div></div>
        <div className="card" style={{ padding: '16px 20px' }}><div className="stat-num sm">{vendidas}</div><div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 5 }}>Vendidas</div></div>
        <div className="card" style={{ padding: '16px 20px' }}><div className="stat-num sm">{eur(state.OBRAS.reduce((a, b) => a + (b.estado === 'vendida' ? b.precio : 0), 0))}</div><div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 5 }}>Ingresos por obra</div></div>
      </div>

      <div className="row between wrap" style={{ marginBottom: 18, gap: 12 }}>
        <div className="seg">
          {([['grid', 'Galería'], ['tabla', 'Tabla']] as const).map(([v, l]) => <button key={v} className={view === v ? 'on' : ''} onClick={() => setView(v)}>{l}</button>)}
        </div>
        <div className="row wrap" style={{ gap: 10 }}>
          <select className="input" style={{ width: 'auto', padding: '7px 10px', fontSize: 13 }} value={fc} onChange={(e) => setFc(e.target.value)}>
            <option value="todas">Toda colección</option>
            {colecciones.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input" style={{ width: 'auto', padding: '7px 10px', fontSize: 13 }} value={fe} onChange={(e) => setFe(e.target.value)}>
            <option value="todos">Todo estado</option>
            {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="input" style={{ width: 'auto', padding: '7px 10px', fontSize: 13 }} value={fd} onChange={(e) => setFd(e.target.value)}>
            <option value="todos">Todo diseño</option>
            {disenos.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {view === 'grid'
        ? <div className="grid g-4">{obras.map((o) => <ObraCard key={o.id} o={o} onClick={() => setEdit(o)} />)}</div>
        : <div className="card flush" style={{ padding: '8px 16px' }}>
            <table className="tbl">
              <thead><tr>{['Obra', 'Técnica', 'Medidas', 'Colección', 'Diseño', 'Estado', 'Precio'].map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {obras.map((o) => (
                  <tr key={o.id} className="click" onClick={() => setEdit(o)}>
                    <td><span className="display" style={{ fontSize: 16 }}>{o.nombre}</span></td>
                    <td className="muted">{o.tecnica}</td>
                    <td className="mono" style={{ fontSize: 12 }}>{o.medidas}</td>
                    <td>{o.coleccion || '—'}</td>
                    <td>{o.diseno ? <span className="tag" style={{ fontSize: 11, borderColor: 'var(--red-line)', color: 'var(--red-deep)', background: 'var(--red-wash)' }}>{o.diseno}</span> : '—'}</td>
                    <td><span className={'pill ' + ESTADO_PILL[o.estado]}>{o.estado}</span></td>
                    <td><span className="display" style={{ fontSize: 15 }}>{o.precio ? eur(o.precio) : '—'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
    </div>
  );
}
