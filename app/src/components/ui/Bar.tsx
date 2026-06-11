interface BarProps {
  pct?: number;
  tall?: boolean;
}

export function Bar({ pct = 0, tall }: BarProps) {
  return (
    <div className={'bar' + (tall ? ' tall' : '')}>
      <i style={{ width: Math.max(0, Math.min(100, pct)) + '%' }} />
    </div>
  );
}
