import { useAppStore, monthProgress, overallProgress } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';
import { useSession } from '@/store/useSession';
import { Ring } from '@/components/ui/Ring';
import { Bar } from '@/components/ui/Bar';
import { Check } from '@/components/ui/Check';
import { Icon } from '@/components/ui/Icon';
import { ImgPh } from '@/components/ui/ImgPh';
import type { Task } from '@/types/models';

const PRIORITY_COLOR: Record<string, string> = { alta: 'var(--red)', media: 'var(--ink-soft)', baja: 'var(--ink-faint)' };

function eur(n: number) { return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }); }
function fmtDate(s: string) {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function Priority({ p }: { p: string }) {
  return <span className="mi" style={{ color: PRIORITY_COLOR[p] }}>{p[0].toUpperCase() + p.slice(1)}</span>;
}

function WelcomeHero({ userName, big }: { userName: string; big?: boolean }) {
  const hour = new Date().getHours();
  const saludo = hour < 14 ? 'Buenos días' : hour < 21 ? 'Buenas tardes' : 'Buenas noches';
  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  const todayFormatted = today[0].toUpperCase() + today.slice(1);
  const m = useAppStore((s) => s.state.MONTHS.find((x) => x.id === s.state.currentMonthId));
  return (
    <div>
      <div className="kicker kicker-red">{todayFormatted}</div>
      <h1 className="display" style={{ fontSize: big ? 52 : 40, lineHeight: 1.02, marginTop: 10 }}>
        {saludo}, <span className="display-i">{userName[0].toUpperCase() + userName.slice(1)}</span>.
      </h1>
      <p className="page-intro" style={{ marginTop: 12 }}>
        Estás en el <b style={{ color: 'var(--ink)' }}>Mes {m?.n}: {m?.name}</b>. Hoy es un buen día para decidir el nombre de tu marca.
      </p>
    </div>
  );
}

function StatusCard({ go }: { go: (r: string) => void }) {
  const state = useAppStore((s) => s.state);
  const chk = (sec: 'SHOP' | 'LEGAL') => {
    const l = state[sec].checklist;
    return l.length ? Math.round(l.filter((c) => c.done).length / l.length * 100) : 0;
  };
  const items = [
    { k: 'Identidad', v: monthProgress(state.MONTHS.find((m) => m.id === 'm1')!).pct, icon: 'identity', route: 'identidad' },
    { k: 'Redes', v: monthProgress(state.MONTHS.find((m) => m.id === 'm3')!).pct, icon: 'social', route: 'redes' },
    { k: 'Contenido', v: monthProgress(state.MONTHS.find((m) => m.id === 'm2')!).pct, icon: 'obras', route: 'obras' },
    { k: 'Tienda', v: chk('SHOP'), icon: 'shop', route: 'tienda' },
    { k: 'Legal', v: chk('LEGAL'), icon: 'legal', route: 'legal' },
    { k: 'Ventas', v: Math.min(100, state.LEGAL.ingresos.length * 25), icon: 'trending', route: 'legal' },
  ];
  return (
    <div className="card">
      <div className="card-hd between">
        <div>
          <div className="kicker">Estado de la marca</div>
          <h3 className="display" style={{ fontSize: 19, marginTop: 4 }}>Dónde estás hoy</h3>
        </div>
        <Icon name="target" size={18} style={{ color: 'var(--ink-faint)' }} />
      </div>
      <div className="grid g-3" style={{ gap: 14 }}>
        {items.map((it) => (
          <button key={it.k} onClick={() => go(it.route)} style={{ textAlign: 'left', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
            <div className="row between" style={{ marginBottom: 7 }}>
              <span className="mono" style={{ fontSize: 11.5, letterSpacing: '.04em' }}>{it.k}</span>
              <span className="display" style={{ fontSize: 15 }}>{it.v}%</span>
            </div>
            <Bar pct={it.v} />
          </button>
        ))}
      </div>
    </div>
  );
}

function NextTasksCard({ go, openTask }: { go: (r: string) => void; openTask: (mid: string, tid: string) => void }) {
  const { state, toggleDone } = useAppStore();
  const tasks: (Task & { monthId: string; monthN: number })[] = [];
  state.MONTHS.forEach((m) => m.tasks.forEach((t) => {
    if (t.status !== 'completada') tasks.push({ ...t, monthId: m.id, monthN: m.n });
  }));
  tasks.sort((a, b) => {
    const pr: Record<string, number> = { alta: 0, media: 1, baja: 2 };
    if ((a.due || '') !== (b.due || '')) return (a.due || '9999').localeCompare(b.due || '9999');
    return pr[a.priority] - pr[b.priority];
  });
  const next = tasks.slice(0, 5);
  return (
    <div className="card">
      <div className="card-hd between">
        <div>
          <div className="kicker">Próximas tareas</div>
          <h3 className="display" style={{ fontSize: 19, marginTop: 4 }}>Lo siguiente</h3>
        </div>
        <button className="btn ghost sm" onClick={() => go('plan')}>Ver plan</button>
      </div>
      <div>
        {next.map((t) => (
          <div className={'task is-' + (t.status === 'completada' ? 'done' : 'x')} key={t.id}>
            <Check on={t.status === 'completada'} onClick={() => toggleDone(t.monthId, t.id)} />
            <div className="t-main" onClick={() => openTask(t.monthId, t.id)} style={{ cursor: 'pointer' }}>
              <div className="t-title">{t.title}</div>
              <div className="t-meta">
                <Priority p={t.priority} />
                {t.due && <span className="mi"><Icon name="clock" size={12} /> {fmtDate(t.due)}</span>}
                <span className="mi">Mes {t.monthN}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DecisionsCard() {
  const state = useAppStore((s) => s.state);
  return (
    <div className="card" style={{ background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>
      <div className="card-hd between">
        <div>
          <div className="kicker" style={{ color: 'rgba(255,255,255,.5)' }}>Decisiones pendientes</div>
          <h3 className="display" style={{ fontSize: 19, marginTop: 4, color: '#fff' }}>Por decidir</h3>
        </div>
        <Icon name="sparkle" size={18} style={{ color: 'var(--red)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {state.DECISIONS.map((d, i) => (
          <div key={i} style={{ padding: '13px 0', borderBottom: i < state.DECISIONS.length - 1 ? '1px solid rgba(255,255,255,.12)' : 'none' }}>
            <div className="row between">
              <span style={{ fontSize: 14.5 }}>{d.t}</span>
              <span className="mono" style={{ fontSize: 10.5, color: 'rgba(255,255,255,.45)' }}>{d.month}</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 12.5, marginTop: 3 }}>{d.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RemindersCard() {
  const state = useAppStore((s) => s.state);
  return (
    <div className="card">
      <div className="kicker" style={{ marginBottom: 14 }}>Recordatorios</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {state.REMINDERS.map((r, i) => (
          <div key={i} className="row" style={{ gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--paper-2)', display: 'grid', placeItems: 'center', flex: 'none', color: 'var(--ink-soft)' }}>
              <Icon name={r.icon} size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, lineHeight: 1.3 }}>{r.t}</div>
              <div className="mono" style={{ fontSize: 10.5, color: 'var(--red-deep)', marginTop: 2 }}>{r.due}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthFocusCard({ go }: { go: (r: string) => void }) {
  const state = useAppStore((s) => s.state);
  const m = state.MONTHS.find((x) => x.id === state.currentMonthId)!;
  const p = monthProgress(m);
  return (
    <button className="card" onClick={() => go('plan')} style={{ cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 22, alignItems: 'center', width: '100%' }}>
      <Ring pct={p.pct} size={78} stroke={6}>
        <div className="display" style={{ fontSize: 20 }}>{p.pct}%</div>
      </Ring>
      <div style={{ flex: 1 }}>
        <div className="kicker kicker-red">Mes {m.n} · {m.window}</div>
        <h3 className="display" style={{ fontSize: 22, margin: '5px 0 6px' }}>{m.name}</h3>
        <p className="muted" style={{ fontSize: 13.5 }}>{m.objective}</p>
      </div>
      <Icon name="arrow" size={18} style={{ color: 'var(--ink-faint)' }} />
    </button>
  );
}

function MiniStat({ num, label, sub }: { num: string | number; label: string; sub?: string }) {
  return (
    <div className="card" style={{ padding: '18px 20px' }}>
      <div className="stat-num sm">{num}</div>
      <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.05em', color: 'var(--ink-mute)', marginTop: 6, textTransform: 'uppercase' }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export function DashboardRoute() {
  const { state } = useAppStore();
  const { dashLook, setRoute, openTask } = useUiStore();
  const user = useSession(s => s.user) ?? 'ines';

  const go = (r: string) => setRoute(r as Parameters<typeof setRoute>[0]);

  const op = overallProgress(state.MONTHS);
  const totalObras = state.OBRAS.length;
  const ingresos = state.LEGAL.ingresos.reduce((a, b) => a + b.monto, 0);

  return (
    <>

      {dashLook === 'compacto' && (
        <div className="page">
          <div style={{ marginBottom: 26 }}><WelcomeHero userName={user} /></div>
          <div className="grid g-4" style={{ marginBottom: 18 }}>
            <MiniStat num={op.pct + '%'} label="Progreso total" sub={op.done + ' de ' + op.total + ' tareas'} />
            <MiniStat num="1 / 6" label="Mes actual" sub="Identidad" />
            <MiniStat num={totalObras} label="Obras" sub="registradas" />
            <MiniStat num={eur(ingresos)} label="Ingresos" sub="acumulados" />
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr', marginBottom: 18 }}>
            <StatusCard go={go} />
            <RemindersCard />
          </div>
          <div className="grid g-2">
            <NextTasksCard go={go} openTask={openTask} />
            <DecisionsCard />
          </div>
        </div>
      )}

      {dashLook === 'galeria' && (
        <div className="page">
          <div style={{ marginBottom: 22 }}><WelcomeHero userName={user} big /></div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 22 }}>
            {['Moodboard', 'Obra reciente', 'Proceso', 'Paleta'].map((l, i) => (
              <ImgPh key={i} label={l} style={{ aspectRatio: '1', height: 'auto' }} />
            ))}
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', marginBottom: 18 }}>
            <MonthFocusCard go={go} />
            <MiniStat num={op.pct + '%'} label="Progreso total" sub={op.done + '/' + op.total + ' tareas'} />
          </div>
          <div className="grid g-2" style={{ marginBottom: 18 }}>
            <StatusCard go={go} />
            <NextTasksCard go={go} openTask={openTask} />
          </div>
          <div className="grid g-2">
            <DecisionsCard />
            <RemindersCard />
          </div>
        </div>
      )}

      {(dashLook === 'editorial' || !dashLook) && (
        <div className="page">
          <div style={{ marginBottom: 30 }}><WelcomeHero userName={user} big /></div>
          <div style={{ marginBottom: 18 }}><MonthFocusCard go={go} /></div>
          <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', marginBottom: 18 }}>
            <StatusCard go={go} />
            <RemindersCard />
          </div>
          <div className="grid g-2">
            <NextTasksCard go={go} openTask={openTask} />
            <DecisionsCard />
          </div>
        </div>
      )}
    </>
  );
}
