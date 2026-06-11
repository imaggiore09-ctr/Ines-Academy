import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Icon } from '@/components/ui/Icon';
import { Check } from '@/components/ui/Check';
import { Modal } from '@/components/ui/Modal';
import { Field } from '@/components/ui/Field';

function eur(n: number) { return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }); }
function fmtDate(s: string) {
  if (!s) return '';
  return new Date(s + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

const LEGAL_FECHAS = [
  { date: '20 ene', t: 'Modelo 130 — IRPF 4T anterior' },
  { date: '30 ene', t: 'Modelo 390 — Resumen IVA anual' },
  { date: '20 abr', t: 'Modelo 130 — IRPF 1T' },
  { date: '30 abr', t: 'Modelo 303 — IVA 1T' },
  { date: '20 jul', t: 'Modelo 130 — IRPF 2T' },
  { date: '30 jul', t: 'Modelo 303 — IVA 2T' },
];

const LEGAL_DOCS = [
  { name: 'Contrato asesoría', k: 'PDF · 2 páginas' },
  { name: 'NIF / DNI', k: 'Imagen' },
  { name: 'Alta en Hacienda (036)', k: 'PDF' },
];

const LEGAL_PREGUNTAS = [
  '¿Me conviene empezar como autónoma desde el primer momento?',
  '¿Puedo vender cuadros antes de darme de alta?',
  '¿Me conviene la tarifa plana de autónomos al empezar?',
  '¿Qué gastos del estudio puedo deducir?',
  '¿Puedo deducir materiales artísticos?',
  '¿Puedo desgravar parte de mi vivienda si trabajo desde casa?',
  '¿Cómo tributan las ventas internacionales?',
  '¿Cómo facturo a clientes fuera de España?',
  '¿Cómo funciona el IVA en la Unión Europea?',
  '¿Qué ocurre si vendo una obra original a un cliente extranjero?',
  '¿Qué obligaciones tengo si vendo productos digitales?',
  '¿Necesito registrar mi marca?',
  '¿Necesito seguro de responsabilidad civil?',
  '¿Cómo debo gestionar los envíos internacionales?',
  '¿Qué impuestos debo presentar cada trimestre?',
  '¿Qué impuestos debo presentar cada año?',
  '¿Cómo debo guardar las facturas?',
  '¿Qué forma jurídica me recomendarías para crecer en el futuro?',
  '¿Existen ayudas o subvenciones para artistas y emprendedoras?',
];

function MovModal({ kind, onClose }: { kind: 'ingresos' | 'gastos'; onClose: () => void }) {
  const { addMovimiento } = useAppStore();
  const cats = kind === 'ingresos' ? ['Venta obra', 'Encargo', 'Print', 'Otro'] : ['Material', 'Servicios', 'Cuota autónoma', 'Marketing', 'Otro'];
  const [f, setF] = useState({ fecha: '', concepto: '', cat: cats[0], monto: '' });
  const save = () => { if (!f.concepto.trim()) return; addMovimiento(kind, { ...f, monto: parseInt(f.monto) || 0 }); onClose(); };
  return (
    <Modal kicker={kind === 'ingresos' ? 'Nuevo ingreso' : 'Nuevo gasto'} title={kind === 'ingresos' ? 'Registrar ingreso' : 'Registrar gasto'} onClose={onClose}
      footer={<><button className="btn ghost sm" onClick={onClose}>Cancelar</button><button className="btn red sm" onClick={save}>Registrar</button></>}>
      <Field label="Concepto" value={f.concepto} onChange={(v) => setF({ ...f, concepto: v })} />
      <div className="row" style={{ gap: 12 }}>
        <label className="field" style={{ flex: 1 }}><span>Fecha</span><input type="date" className="input" value={f.fecha} onChange={(e) => setF({ ...f, fecha: e.target.value })} /></label>
        <label className="field" style={{ flex: 1 }}><span>Importe (€)</span><input type="number" className="input" value={f.monto} onChange={(e) => setF({ ...f, monto: e.target.value })} /></label>
        <label className="field" style={{ flex: 1 }}><span>Categoría</span>
          <select className="input" value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })}>
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>
    </Modal>
  );
}

export function LegalRoute() {
  const { state, toggleCheck } = useAppStore();
  const L = state.LEGAL;
  const [mov, setMov] = useState<'ingresos' | 'gastos' | null>(null);
  const totalIn = L.ingresos.reduce((a, b) => a + b.monto, 0);
  const totalOut = L.gastos.reduce((a, b) => a + b.monto, 0);
  const groups = [...new Set(L.checklist.map((c) => c.group))];

  return (
    <div className="page">
      {mov && <MovModal kind={mov} onClose={() => setMov(null)} />}
      <div style={{ marginBottom: 28 }}>
        <div className="kicker kicker-red">El negocio</div>
        <h1 className="page-title" style={{ marginTop: 8 }}>Legal y finanzas</h1>
        <p className="page-intro" style={{ marginTop: 12 }}>Organiza trámites y lleva las cuentas. Esto NO es asesoramiento legal: es tu cuaderno para llegar preparada a la asesoría.</p>
      </div>

      <div className="card" style={{ background: 'var(--paper-2)', borderColor: 'var(--line)', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start', padding: '13px 17px' }}>
        <Icon name="info" size={17} style={{ color: 'var(--ink-mute)', marginTop: 1, flex: 'none' }} />
        <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Aquí solo organizamos información y recordatorios. Para decisiones fiscales y legales, consulta siempre con tu asesoría.</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.35fr 1fr', alignItems: 'start', gap: 26, marginBottom: 26 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="kicker kicker-red" style={{ marginBottom: 8 }}>Impuestos y obligaciones</div>
            {groups.map((g) => (
              <div key={g} style={{ marginTop: 10 }}>
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', margin: '8px 0 2px 4px' }}>{g}</div>
                {L.checklist.filter((c) => c.group === g).map((c) => (
                  <div key={c.id} className={'task-row' + (c.done ? ' is-done' : '')}>
                    <div className="task-ico"><Icon name="check" size={18} /></div>
                    <Check on={c.done} onClick={() => toggleCheck('LEGAL', c.id)} />
                    <div className="task-body" style={{ cursor: 'default' }}>
                      <div className="t-title" style={{ fontSize: 14.5 }}>{c.t}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="card" style={{ background: 'var(--paper-2)', border: 'none' }}>
            <div className="kicker" style={{ marginBottom: 12 }}>Preguntas para la asesoría</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ink-soft)', fontSize: 13.5, lineHeight: 1.85 }}>
              {LEGAL_PREGUNTAS.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="kicker kicker-red" style={{ marginBottom: 12 }}>Fechas importantes</div>
            {LEGAL_FECHAS.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: i < LEGAL_FECHAS.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'flex-start' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--red-deep)', minWidth: 48, paddingTop: 1 }}>{f.date}</span>
                <span style={{ fontSize: 13, lineHeight: 1.4 }}>{f.t}</span>
              </div>
            ))}
            <button className="btn ghost sm block" style={{ marginTop: 14 }}><Icon name="calendar" size={14} /> Ver calendario fiscal</button>
          </div>
          <div className="card">
            <div className="kicker kicker-red" style={{ marginBottom: 12 }}>Documentos guardados</div>
            {LEGAL_DOCS.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: i < LEGAL_DOCS.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'center' }}>
                <Icon name="doc" size={17} style={{ color: 'var(--ink-faint)', flex: 'none' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5 }}>{d.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 1 }}>{d.k}</div>
                </div>
                <Icon name="arrow" size={14} style={{ color: 'var(--ink-faint)' }} />
              </div>
            ))}
            <button className="btn ghost sm block" style={{ marginTop: 6 }}>Ver todos los documentos</button>
          </div>
        </div>
      </div>

      <div className="kicker" style={{ marginBottom: 12 }}>Tus cuentas</div>
      <div className="grid g-3" style={{ marginBottom: 22 }}>
        <div className="card"><div className="kicker" style={{ marginBottom: 8 }}>Ingresos</div><div className="stat-num" style={{ color: 'var(--done)' }}>{eur(totalIn)}</div></div>
        <div className="card"><div className="kicker" style={{ marginBottom: 8 }}>Gastos</div><div className="stat-num" style={{ color: 'var(--red)' }}>{eur(totalOut)}</div></div>
        <div className="card" style={{ background: 'var(--ink)', borderColor: 'var(--ink)' }}><div className="kicker" style={{ marginBottom: 8, color: 'rgba(255,255,255,.5)' }}>Balance</div><div className="stat-num" style={{ color: '#fff' }}>{eur(totalIn - totalOut)}</div></div>
      </div>

      <div className="card flush">
        <div className="row between" style={{ padding: '18px 22px 14px' }}>
          <div>
            <div className="kicker">Registro de movimientos</div>
            <h3 className="display" style={{ fontSize: 19, marginTop: 4 }}>Ingresos y gastos</h3>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn ghost sm" onClick={() => setMov('ingresos')}><Icon name="plus" size={14} /> Ingreso</button>
            <button className="btn sm" onClick={() => setMov('gastos')}><Icon name="plus" size={14} /> Gasto</button>
          </div>
        </div>
        <div style={{ padding: '0 8px 8px' }}>
          <table className="tbl">
            <thead><tr>{['Fecha', 'Concepto', 'Categoría', 'Importe'].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {[...L.ingresos.map((m) => ({ ...m, isIn: true })), ...L.gastos.map((m) => ({ ...m, isIn: false }))]
                .sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''))
                .map((m) => (
                  <tr key={m.id}>
                    <td className="mono" style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{fmtDate(m.fecha)}</td>
                    <td>{m.concepto}</td>
                    <td><span className="tag">{m.cat}</span></td>
                    <td><span className="display" style={{ fontSize: 15, color: m.isIn ? 'var(--done)' : 'var(--red)' }}>{(m.isIn ? '+' : '−') + eur(m.monto).replace('-', '')}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
