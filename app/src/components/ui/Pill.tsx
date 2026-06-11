import type { TaskStatus } from '@/types/models';

const STATUS_LABEL: Record<TaskStatus, string> = {
  'pendiente': 'Pendiente',
  'en progreso': 'En progreso',
  'completada': 'Completada',
};
const STATUS_CLASS: Record<TaskStatus, string> = {
  'pendiente': 'todo',
  'en progreso': 'doing',
  'completada': 'done',
};

interface PillProps {
  status: TaskStatus;
}

export function Pill({ status }: PillProps) {
  return <span className={'pill ' + STATUS_CLASS[status]}>{STATUS_LABEL[status]}</span>;
}
