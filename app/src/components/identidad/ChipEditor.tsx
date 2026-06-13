import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface ChipEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  accent?: boolean;
}

export function ChipEditor({ label, items, onChange, accent }: ChipEditorProps) {
  const [val, setVal] = useState('');
  const add = () => {
    const v = val.trim();
    if (!v) return;
    onChange([...items, v]);
    setVal('');
  };
  return (
    <div className="field">
      <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 8 }}>{label}</span>
      <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
        {items.map((it, i) => (
          <span key={i} className="tag" style={accent ? { borderColor: 'var(--red-line)', color: 'var(--red-deep)', background: 'var(--red-wash)' } : undefined}>
            {it}
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              style={{ border: 'none', background: 'none', padding: 0, marginLeft: 2, color: 'inherit', cursor: 'pointer', opacity: 0.6, display: 'flex' }}
            >
              <Icon name="x" size={11} />
            </button>
          </span>
        ))}
        {items.length === 0 && <span className="faint" style={{ fontSize: 13 }}>Aun nada - anade abajo.</span>}
      </div>
      <div className="row" style={{ gap: 8 }}>
        <input
          className="input"
          value={val}
          placeholder="Escribe y pulsa Anadir..."
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
        />
        <button className="btn ghost sm" onClick={add}>Anadir</button>
      </div>
    </div>
  );
}
