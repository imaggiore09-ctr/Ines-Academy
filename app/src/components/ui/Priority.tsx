import type { Priority as P } from '@/types/models';

interface PriorityProps {
  p: P;
}

export function Priority({ p }: PriorityProps) {
  return (
    <span className="mi">
      <span className={'dot ' + p} />
      {p === 'alta' ? 'Alta' : p === 'media' ? 'Media' : 'Baja'}
    </span>
  );
}
