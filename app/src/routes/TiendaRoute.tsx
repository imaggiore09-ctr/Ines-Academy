import { useAppStore } from '@/store/useAppStore';
import { Ring } from '@/components/ui/Ring';
import { Icon } from '@/components/ui/Icon';
import { Check } from '@/components/ui/Check';

const OBLIGACIONES = [
  { k: 'LSSI', t: 'Ley de Servicios de la Sociedad de la Información', d: 'Debes identificarte como vendedora (nombre/NIF, contacto) y dar información clara de productos y precios.' },
  { k: 'RGPD', t: 'Protección de datos', d: 'Si recoges datos (emails, direcciones), necesitas consentimiento y explicar cómo los tratas y guardas.' },
  { k: 'Privacidad', t: 'Política de privacidad', d: 'Página obligatoria que explica qué datos recoges, para qué y los derechos del usuario.' },
  { k: 'Cookies', t: 'Aviso de cookies', d: 'Si usas cookies de analítica o terceros, necesitas un banner de consentimiento y una política de cookies.' },
  { k: 'Condiciones', t: 'Condiciones de compra', d: 'Definen el proceso de pedido, pago, plazos y responsabilidades. Dan seguridad jurídica a ambas partes.' },
  { k: 'Desistimiento', t: 'Derecho de desistimiento', d: 'El cliente puede devolver en 14 días sin justificación (con excepciones, p. ej. encargos personalizados).' },
];

const SHOP_INFO: Record<string, { why: string; legal: string }> = {
  s1: { why: 'La plataforma es la base de tu tienda: define comisiones, control y experiencia de compra.', legal: 'No obligatorio' },
  s2: { why: 'Aumenta la confianza de los clientes y fortalece tu marca.', legal: 'No obligatorio' },
  s3: { why: 'Sin catálogo no hay nada que vender: es el escaparate de tu obra.', legal: 'No obligatorio' },
  s4: { why: 'Permite aceptar pagos de forma segura y profesional.', legal: 'No obligatorio' },
  s5: { why: 'Define qué cobras de envío y a dónde llegas. Evita sorpresas.', legal: 'No obligatorio' },
  s6: { why: 'Protege tanto al comprador como al vendedor.', legal: 'Obligatorio' },
  s7: { why: 'La página «Sobre mí» humaniza tu marca y genera confianza.', legal: 'No obligatorio' },
  s8: { why: 'La página de encargos abre una vía de ingresos a medida muy rentable.', legal: 'No obligatorio' },
  s9: { why: 'El email de bienvenida convierte una primera compra en relación a largo plazo.', legal: 'No obligatorio' },
  s10: { why: 'Permite detectar errores antes de que los clientes los sufran.', legal: 'Recomendado' },
};

export function TiendaRoute() {
  const { state, toggleCheck, setState } = useAppStore();
  const shop = state.SHOP;
  const done = shop.checklist.filter((c) => c.done).length;
  const pct = Math.round(done / shop.checklist.length * 100);
  const setPlataforma = (p: string) => setState((s) => ({ ...s, SHOP: { ...s.SHOP, plataforma: p } }));

  return (
    <div className="page">
      <div style={{ marginBottom: 28 }}>
        <div className="kicker kicker-red">El negocio</div>
        <h1 className="page-title" style={{ marginTop: 8 }}>Tienda online</h1>
        <p className="page-intro" style={{ marginTop: 12 }}>Todo lo necesario para abrir la tienda con calma y sin olvidar nada.</p>
      </div>

      <div className="card" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 26 }}>
        <Ring pct={pct} size={78} stroke={6}><div className="display" style={{ fontSize: 19 }}>{pct}%</div></Ring>
        <div style={{ flex: 1 }}>
          <div className="kicker kicker-red">Estado de lanzamiento</div>
          <div className="display" style={{ fontSize: 24, margin: '5px 0 4px' }}>{shop.estado}</div>
          <p className="muted" style={{ fontSize: 13.5 }}>{done} de {shop.checklist.length} pasos completados · objetivo: Mes 4 (diciembre)</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Plataforma</div>
          <div className="row" style={{ gap: 7 }}>
            {['Shopify', 'WooCommerce', 'Otra'].map((p) => (
              <button key={p} className="tag" onClick={() => setPlataforma(p)} style={{ cursor: 'pointer', borderColor: shop.plataforma === p ? 'var(--ink)' : 'var(--line-2)', color: shop.plataforma === p ? '#fff' : 'var(--ink-mute)', background: shop.plataforma === p ? 'var(--ink)' : 'var(--paper)' }}>{p}</button>
            ))}
          </div>
          {!shop.plataforma && <div className="mono" style={{ fontSize: 10, color: 'var(--red-deep)', marginTop: 8 }}>↑ Decisión pendiente</div>}
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr', alignItems: 'start', gap: 26 }}>
        <div className="card">
          <div className="kicker kicker-red" style={{ marginBottom: 16 }}>Checklist de creación</div>
          <div>
            {shop.checklist.map((c) => {
              const info = SHOP_INFO[c.id];
              const legalReq = info?.legal !== 'No obligatorio';
              return (
                <div key={c.id} className={'task-row' + (c.done ? ' is-done' : '')}>
                  <div className="task-ico"><Icon name="check" size={18} /></div>
                  <Check on={c.done} onClick={() => toggleCheck('SHOP', c.id)} />
                  <div className="task-body" style={{ cursor: 'default' }}>
                    <div className="t-title" style={{ fontSize: 15 }}>{c.t}</div>
                    {info && <div className="t-sub">{info.why}</div>}
                  </div>
                  <div className="task-right">
                    {legalReq && info && <span className={'pill ' + (info.legal === 'Obligatorio' ? 'doing' : 'todo')}>{info.legal}</span>}
                    <span className={'pill ' + (c.done ? 'done' : 'todo')}>{c.done ? 'Hecho' : 'Pendiente'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="kicker" style={{ marginBottom: 14 }}>Páginas necesarias</div>
            <div className="row wrap" style={{ gap: 8 }}>
              {shop.paginas.map((p, i) => <span key={i} className="tag"><Icon name="doc" size={12} /> {p}</span>)}
            </div>
          </div>
          <div className="card">
            <div className="kicker" style={{ marginBottom: 14 }}>Textos pendientes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {shop.textosPendientes.map((t, i) => (
                <div key={i} className="row" style={{ gap: 10 }}>
                  <span className="dot alta" style={{ marginTop: 7 }} />
                  <span style={{ fontSize: 13.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ background: 'var(--paper-2)', border: 'none' }}>
            <div className="grid g-2" style={{ gap: 16 }}>
              <div>
                <div className="kicker" style={{ marginBottom: 8 }}>Pagos</div>
                <p className="muted" style={{ fontSize: 13 }}>Tarjeta + PayPal. Pendiente de configurar pasarela.</p>
              </div>
              <div>
                <div className="kicker" style={{ marginBottom: 8 }}>Envíos</div>
                <p className="muted" style={{ fontSize: 13 }}>España 6€ · UE 15€. Embalaje a mano con seguro.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="row between" style={{ marginBottom: 16 }}>
          <div>
            <div className="kicker kicker-red">Importante · informativo</div>
            <h3 className="display" style={{ fontSize: 20, marginTop: 4 }}>Obligaciones legales en España</h3>
          </div>
          <Icon name="legal" size={20} style={{ color: 'var(--ink-faint)' }} />
        </div>
        <p className="muted" style={{ fontSize: 13, marginBottom: 16, maxWidth: '70ch' }}>Una tienda online en España tiene que cumplir ciertas normas. Esto es un resumen sencillo para que sepáis de qué hablar con la asesoría — no sustituye su consejo.</p>
        <div className="grid g-2" style={{ gap: 12 }}>
          {OBLIGACIONES.map((o, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '13px 0', borderBottom: i < OBLIGACIONES.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--red-deep)', fontWeight: 600, minWidth: 80, paddingTop: 2 }}>{o.k}</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{o.t}</div>
                <p className="muted" style={{ fontSize: 12.5, marginTop: 3, lineHeight: 1.5 }}>{o.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid g-2" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="kicker" style={{ marginBottom: 14 }}>Preguntas frecuentes</div>
          {shop.faq.map((f, i) => (
            <div key={i} style={{ padding: '11px 0', borderBottom: i < shop.faq.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{f.q}</div>
              <p className="muted" style={{ fontSize: 13, marginTop: 3 }}>{f.a}</p>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="kicker" style={{ marginBottom: 14 }}>Política de devoluciones</div>
          <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.6 }}>14 días para devoluciones desde la recepción. La obra debe volver en su embalaje original. Los encargos personalizados no admiten devolución salvo defecto.</p>
          <button className="btn ghost sm" style={{ marginTop: 14 }}><Icon name="edit" size={14} /> Editar política</button>
        </div>
      </div>
    </div>
  );
}
