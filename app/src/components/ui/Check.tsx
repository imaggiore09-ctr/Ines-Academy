interface CheckProps {
  on?: boolean;
  onClick?: () => void;
}

export function Check({ on, onClick }: CheckProps) {
  return (
    <button className={'check' + (on ? ' on' : '')} onClick={onClick} aria-pressed={!!on}>
      <svg viewBox="0 0 24 24">
        <path d="M5 12l5 5L20 6" />
      </svg>
    </button>
  );
}
