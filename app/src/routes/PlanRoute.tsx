import { useState } from 'react';
import { useAppStore, monthProgress, overallProgress } from '@/store/useAppStore';
import { Ring } from '@/components/ui/Ring';
import { Bar } from '@/components/ui/Bar';
import { Check } from '@/components/ui/Check';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { Field } from '@/components/ui/Field';
import type { Task, Month } from '@/types/models';

const STATUS_LABEL: Record<string, string> = { pendiente: 'Pendiente', 'en progreso': 'En progreso', completada: 'Completada' };
const STATUS_CLASS: Record<string, string> = { pendiente: 'todo', 'en progreso': 'doing', completada: 'done' };
const PRIORITY_COLOR: Record<string, string> = { alta: 'var(--red)', media: 'var(--ink-soft)', baja: 'var(--ink-faint)' };

function fmtDate(s: string) {
  if (!s) return '';
  return new Date(s + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function StatusPill({ status }: { status: Task['status'] }) {
  return <span className={'pill ' + STATUS_CLASS[status]}>{STATUS_LABEL[status]}</span>;
}

function TaskEditModal({ taskRef, onClose }: { taskRef: { monthId: string; taskId: string }; onClose: () => void }) {
  const { state, setTask, toggleDone, deleteTask } = useAppStore();
  const month = state.MONTHS.find((m) => m.id === taskRef.monthId);
  const task = month?.tasks.find((t) => t.id === taskRef.taskId);
  if (!task || !month) return null;
  const patch = (p: Partial<Task>) => setTask(month.id, task.id, p);
  return (
    <Modal kicker={`Mes ${month.n} · ${month.window}`} title={task.title} onClose={onClose}
      footer={<>
        <button className="btn ghost sm" onClick={() => { deleteTask(month.id, task.id); onClose(); }} style={{ marginRight: 'auto', color: 'var(--red-deep)', borderColor: 'var(--red-line)' }}>
          <Icon name="trash" size={15} /> Eliminar
        </button>
        <button className="btn ghost sm" onClick={onClose}>Cerrar</button>
        <button className="btn red sm" onClick={() => { toggleDone(month.id, task.id); onClose(); }}>
          <Icon name="check" size={15} /> {task.status === 'completada' ? 'Reabrir' : 'Marcar completada'}
        </button>
      </>}>
      <Field label="Título de la tarea" value={task.title} onChange={(v) => patch({ title: v })} />
      <div className="row" style={{ gap: 14 }}>
        <label className="field" style={{ flex: 1 }}><span>Estado</span>
          <select className="input" value={task.status} onChange={(e) => patch({ status: e.target.value as Task['status'] })}>
            {(['pendiente', 'en progreso', 'completada'] as const).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
        </label>
        <label className="field" style={{ flex: 1 }}><span>Prioridad</span>
          <select className="input" value={task.priority} onChange={(e) => patch({ priority: e.target.value as Task['priority'] })}>
            {(['alta', 'media', 'baja'] as const).map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
          </select>
        </label>
        <label className="field" style={{ flex: 1 }}><span>Fecha límite</span>
          <input type="date" className="input" value={task.due} onChange={(e) => patch({ due: e.target.value })} />
        </label>
      </div>
      <Field label="Notas" value={task.notes} onChange={(v) => patch({ notes: v })} area placeholder="Escribe aquí tus notas…" />
      <div className="field">
        <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 8 }}>Recursos</span>
        {task.resources.length
          ? <div className="row wrap" style={{ gap: 8 }}>{task.resources.map((r, i) => <span key={i} className="tag"><Icon name="doc" size={12} /> {r}</span>)}</div>
          : <p className="faint" style={{ fontSize: 13 }}>Sin recursos todavía.</p>}
      </div>
      <div style={{ background: 'var(--paper-2)', borderRadius: 'var(--r-md)', padding: 16 }}>
        <div className="kicker" style={{ marginBottom: 10 }}>Preguntas de reflexión</div>
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ink-soft)', fontSize: 13.5, lineHeight: 1.7 }}>
          {month.reflection.map((q, i) => <li key={i} className="display-i" style={{ fontSize: 15 }}>{q}</li>)}
        </ul>
      </div>
    </Modal>
  );
}

function NewTaskModal({ monthId, onClose }: { monthId: string; onClose: () => void }) {
  const { addTask } = useAppStore();
  const [form, setForm] = useState({ title: '', priority: 'media' as Task['priority'], due: '' });
  const save = () => { if (!form.title.trim()) return; addTask(monthId, form); onClose(); };
  return (
    <Modal kicker="Nueva tarea" title="Añadir tarea" onClose={onClose}
      footer={<><button className="btn ghost sm" onClick={onClose}>Cancelar</button><button className="btn red sm" onClick={save}>Añadir</button></>}>
      <Field label="Título" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="¿Qué hay que hacer?" />
      <div className="row" style={{ gap: 14 }}>
        <label className="field" style={{ flex: 1 }}><span>Prioridad</span>
          <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Task['priority'] })}>
            {(['alta', 'media', 'baja'] as const).map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
          </select>
        </label>
        <label className="field" style={{ flex: 1 }}><span>Fecha límite</span>
          <input type="date" className="input" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
        </label>
      </div>
    </Modal>
  );
}

function MonthCard({ m, onClick, current }: { m: Month; onClick: () => void; current: boolean }) {
  const p = monthProgress(m);
  return (
    <button className={'month-card' + (current ? ' current' : '')} onClick={onClick}>
      <div className="mc-top">
        <div className="row between">
          <span className="month-num display">Mes {m.n}</span>
          {current ? <span className="pill doing">En curso</span> : <span className="mono" style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{m.window}</span>}
        </div>
        <div className="month-name">{m.name}</div>
        <p className="muted" style={{ fontSize: 13, minHeight: 38 }}>{m.objective}</p>
      </div>
      <div className="mc-foot">
        <div className="row between" style={{ marginBottom: 8 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{p.done}/{p.total} tareas</span>
          <span className="display" style={{ fontSize: 15 }}>{p.pct}%</span>
        </div>
        <Bar pct={p.pct} />
      </div>
    </button>
  );
}

function TaskList({ month, openTask, filterP, filterS }: { month: Month; openTask: (mid: string, tid: string) => void; filterP: string; filterS: string }) {
  const { toggleDone, cycleStatus } = useAppStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  let tasks = month.tasks;
  if (filterP !== 'todas') tasks = tasks.filter((t) => t.priority === filterP);
  if (filterS !== 'todos') tasks = tasks.filter((t) => t.status === filterS);
  if (!tasks.length) return <p className="muted center" style={{ padding: 30 }}>No hay tareas con estos filtros.</p>;
  return (
    <div>
      {tasks.map((t) => {
        const isDone = t.status === 'completada';
        const open = expanded === t.id;
        return (
          <div key={t.id}>
            <div className={'task-row' + (isDone ? ' is-done' : '')}>
              <div className="task-ico"><Icon name="check" size={18} /></div>
              <Check on={isDone} onClick={() => toggleDone(month.id, t.id)} />
              <div className="task-body" onClick={() => setExpanded(open ? null : t.id)} style={{ cursor: 'pointer' }}>
                <div className="t-title" style={{ fontSize: 15 }}>{t.title}</div>
                <div className="t-meta-inline">
                  <span className="mi" style={{ color: PRIORITY_COLOR[t.priority] }}>{t.priority[0].toUpperCase() + t.priority.slice(1)}</span>
                  {t.due && <span className="mi"><Icon name="clock" size={12} /> {fmtDate(t.due)}</span>}
                  {t.notes && <span className="mi"><Icon name="edit" size={12} /> Nota</span>}
                  {t.resources.length > 0 && <span className="mi"><Icon name="doc" size={12} /> {t.resources.length}</span>}
                </div>
              </div>
              <div className="task-right">
                <button className="edit-btn" onClick={() => openTask(month.id, t.id)}><Icon name="settings" size={16} /></button>
                <button style={{ border: 'none', background: 'none', padding: 0 }} onClick={() => cycleStatus(month.id, t.id)}><StatusPill status={t.status} /></button>
              </div>
            </div>
            {open && t.notes && <div className="task-expand"><h4>Notas</h4><p>{t.notes}</p></div>}
          </div>
        );
      })}
    </div>
  );
}

function MonthCalendar({ month }: { month: Month }) {
  const tasksByDay: Record<string, Task[]> = {};
  month.tasks.forEach((t) => { if (t.due) (tasksByDay[t.due] = tasksByDay[t.due] || []).push(t); });
  const first = month.tasks.find((t) => t.due);
  const base = first ? new Date(first.due + 'T00:00:00') : new Date('2026-09-01T00:00:00');
  const y = base.getFullYear(), mo = base.getMonth();
  const firstDow = (new Date(y, mo, 1).getDay() + 6) % 7;
  const days = new Date(y, mo + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const dow = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  return (
    <div>
      <div className="cal" style={{ marginBottom: 6 }}>{dow.map((d) => <div key={d} className="cal-h">{d}</div>)}</div>
      <div className="cal">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} className="cell muted" />;
          const iso = `${y}-${String(mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const evs = tasksByDay[iso] || [];
          return (
            <div key={i} className={'cell' + (evs.length ? ' has' : '')}>{d}
              {evs[0] && <div className="ev" title={evs.map((e) => e.title).join(', ')}>{evs.length > 1 ? evs.length + ' tareas' : evs[0].title}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthDetail({ month, back, openTask }: { month: Month; back: () => void; openTask: (mid: string, tid: string) => void }) {
  const [view, setView] = useState<'checklist' | 'calendar'>('checklist');
  const [fp, setFp] = useState('todas');
  const [fs, setFs] = useState('todos');
  const [newTask, setNewTask] = useState(false);
  const p = monthProgress(month);
  return (
    <div className="page">
      {newTask && <NewTaskModal monthId={month.id} onClose={() => setNewTask(false)} />}
      <button className="btn ghost sm" onClick={back} style={{ marginBottom: 20 }}>
        <Icon name="chevron" size={14} style={{ transform: 'rotate(180deg)' }} /> Todos los meses
      </button>
      <div className="grid" style={{ gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 28, marginBottom: 26 }}>
        <div>
          <div className="kicker kicker-red">Mes {month.n} · {month.range}</div>
          <h1 className="page-title" style={{ marginTop: 8 }}>{month.name}</h1>
          <p className="page-intro" style={{ marginTop: 12 }}>{month.objective}</p>
        </div>
        <div className="card" style={{ width: 200, textAlign: 'center' }}>
          <Ring pct={p.pct} size={92} stroke={7}><div className="display" style={{ fontSize: 24 }}>{p.pct}%</div></Ring>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 12 }}>{p.done} de {p.total} tareas</div>
        </div>
      </div>
      <div className="card" style={{ background: 'var(--paper-2)', border: 'none', marginBottom: 22 }}>
        <div className="kicker" style={{ marginBottom: 10 }}>Preguntas de reflexión</div>
        <div className="row wrap" style={{ gap: 24 }}>
          {month.reflection.map((q, i) => <div key={i} className="display-i" style={{ fontSize: 18, flex: '1 1 240px', color: 'var(--ink-soft)' }}>"{q}"</div>)}
        </div>
      </div>
      <div className="row between wrap" style={{ marginBottom: 16, gap: 12 }}>
        <div className="seg">
          {([['checklist', 'Checklist'], ['calendar', 'Calendario']] as const).map(([v, l]) => (
            <button key={v} className={view === v ? 'on' : ''} onClick={() => setView(v)}>{l}</button>
          ))}
        </div>
        <div className="row wrap" style={{ gap: 10 }}>
          {view === 'checklist' && <>
            <select className="input" style={{ width: 'auto', padding: '7px 10px', fontSize: 13 }} value={fp} onChange={(e) => setFp(e.target.value)}>
              <option value="todas">Toda prioridad</option>
              {(['alta', 'media', 'baja'] as const).map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select className="input" style={{ width: 'auto', padding: '7px 10px', fontSize: 13 }} value={fs} onChange={(e) => setFs(e.target.value)}>
              <option value="todos">Todo estado</option>
              {(['pendiente', 'en progreso', 'completada'] as const).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
          </>}
          <button className="btn sm" onClick={() => setNewTask(true)}><Icon name="plus" size={15} /> Añadir tarea</button>
        </div>
      </div>
      <div className="card">
        {view === 'checklist'
          ? <TaskList month={month} openTask={openTask} filterP={fp} filterS={fs} />
          : <MonthCalendar month={month} />}
      </div>
    </div>
  );
}

export function PlanRoute() {
  const { state } = useAppStore();
  const [sel, setSel] = useState<string | null>(null);
  const [taskRef, setTaskRef] = useState<{ monthId: string; taskId: string } | null>(null);
  const month = sel ? state.MONTHS.find((m) => m.id === sel) : null;
  const op = overallProgress(state.MONTHS);

  if (month) return (
    <>
      {taskRef && <TaskEditModal taskRef={taskRef} onClose={() => setTaskRef(null)} />}
      <MonthDetail month={month} back={() => setSel(null)} openTask={(mid, tid) => setTaskRef({ monthId: mid, taskId: tid })} />
    </>
  );

  return (
    <div className="page">
      {taskRef && <TaskEditModal taskRef={taskRef} onClose={() => setTaskRef(null)} />}
      <div style={{ marginBottom: 28 }}>
        <div className="kicker kicker-red">Roadmap · 6 meses</div>
        <h1 className="page-title" style={{ marginTop: 8 }}>Plan por meses</h1>
        <p className="page-intro" style={{ marginTop: 12 }}>Tu camino de septiembre a febrero. Cada mes es un paso concreto hacia tu primera colección y tu independencia.</p>
      </div>
      <div className="card" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
        <Ring pct={op.pct} size={70} stroke={6}><div className="display" style={{ fontSize: 18 }}>{op.pct}%</div></Ring>
        <div style={{ flex: 1 }}>
          <div className="display" style={{ fontSize: 20 }}>Progreso general del proyecto</div>
          <p className="muted" style={{ fontSize: 13.5, marginTop: 2 }}>{op.done} de {op.total} tareas completadas en los seis meses</p>
        </div>
        <div style={{ width: 200 }}><Bar pct={op.pct} tall /></div>
      </div>
      <div className="grid g-3">
        {state.MONTHS.map((m) => <MonthCard key={m.id} m={m} current={m.id === state.currentMonthId} onClick={() => setSel(m.id)} />)}
      </div>
    </div>
  );
}
