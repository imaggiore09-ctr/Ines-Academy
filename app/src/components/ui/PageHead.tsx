import type { ReactNode } from 'react';

interface PageHeadProps {
  kicker?: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
}

export function PageHead({ kicker, title, intro, actions }: PageHeadProps) {
  return (
    <div className="page-head row between" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
      <div>
        {kicker && <div className="kicker kicker-red">{kicker}</div>}
        <h1 className="page-title">{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
      </div>
      {actions && <div className="row" style={{ gap: 10 }}>{actions}</div>}
    </div>
  );
}
