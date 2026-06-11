import { useState } from 'react';
import { Icon } from './Icon';

interface InfoPopProps {
  title?: string;
  children: React.ReactNode;
  side?: string;
}

export function InfoPop({ title, children, side }: InfoPopProps) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className={'infopop' + (open ? ' open' : '') + (side ? ' ' + side : '')}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="info-dot"
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        onMouseEnter={() => setOpen(true)}
        aria-label="Por qué importa"
      >
        <Icon name="info" size={14} />
      </button>
      <span className="info-card" onClick={e => e.stopPropagation()}>
        {title && <span className="info-card-t">{title}</span>}
        <span className="info-card-b">{children}</span>
      </span>
    </span>
  );
}
