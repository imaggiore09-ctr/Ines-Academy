import { useState } from 'react';
import { useSession } from '@/store/useSession';
import { BrandLockup } from '@/components/brand/BrandLockup';
import { Icon } from '@/components/ui/Icon';
import { Field } from '@/components/ui/Field';
import inesImg from '@/assets/ines.png';

const USERS = [
  { id: 'ines' as const, name: 'Inés', full: 'Inés de Cueto', role: 'Artista', ink: false },
  { id: 'cristina' as const, name: 'Cristina', full: 'Cristina de Cueto', role: 'Business Manager', ink: true },
];

export function LoginRoute() {
  const { login } = useSession();
  const [who, setWho] = useState<'ines' | 'cristina'>('ines');
  const [pw, setPw] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(who);
  };

  return (
    <div className="login">
      {/* Panel izquierdo oscuro */}
      <div className="login-art">
        <div className="login-art-copy">
          <div className="kicker" style={{ color: 'rgba(255,255,255,.6)' }}>Dashboard de hermanas · 2026</div>
          <div style={{ marginTop: 'auto', marginBottom: '5%' }}>
            <div className="display" style={{ fontSize: 52, lineHeight: 1.06, letterSpacing: '-0.02em' }}>
              Construir<br />nuestra{' '}
              <span className="display-i" style={{ color: 'var(--red)' }}>marca</span>
              <br />personal
            </div>
            <p style={{ color: 'rgba(255,255,255,.66)', maxWidth: '32ch', marginTop: 22, fontSize: 14.5 }}>
              De la identidad artística al primer lanzamiento: 6 meses paso a paso.
            </p>
          </div>
        </div>
      </div>

      {/* Columna foto Inés */}
      <div className="login-photo-col">
        <img className="login-photo" src={inesImg} alt="Inés de Cueto" />
      </div>

      {/* Formulario */}
      <div className="login-form-wrap">
        <form className="login-form" onSubmit={submit}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ display: 'inline-flex' }}>
              <BrandLockup name="de Cueto Sisters" variant="crest" size={80} nameSize={28} />
            </div>
            <h2 className="display" style={{ fontSize: 21, marginTop: 18 }}>Bienvenida de nuevo</h2>
            <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Este espacio es solo vuestro.</p>
          </div>

          <div className="kicker" style={{ marginBottom: 9 }}>¿Quién entra?</div>
          <div className="row" style={{ gap: 10, marginBottom: 20 }}>
            {USERS.map(u => (
              <button
                key={u.id}
                type="button"
                onClick={() => setWho(u.id)}
                className="card"
                style={{
                  flex: 1, padding: '14px 12px', textAlign: 'center', cursor: 'pointer',
                  borderColor: who === u.id ? 'var(--ink)' : 'var(--line)',
                  borderWidth: who === u.id ? 1.5 : 1,
                  background: who === u.id ? 'var(--paper)' : 'var(--paper-2)',
                }}
              >
                <div className={'avatar' + (u.ink ? ' ink' : '')} style={{ margin: '0 auto 8px', width: 36, height: 36 }}>
                  {u.name[0]}
                </div>
                <div style={{ fontSize: 14 }}>{u.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 2 }}>{u.role}</div>
              </button>
            ))}
          </div>

          <Field label="Contraseña" value={pw} onChange={setPw} />
          <button className="btn block" type="submit" style={{ marginTop: 6 }}>
            Entrar al atelier <Icon name="arrow" size={16} />
          </button>
          <p className="mono center" style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 16 }}>
            Acceso privado · solo Inés y Cristina
          </p>
        </form>
      </div>
    </div>
  );
}
