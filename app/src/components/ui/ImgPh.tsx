interface ImgPhProps {
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function ImgPh({ label, style, className }: ImgPhProps) {
  return (
    <div className={'imgph ' + (className ?? '')} style={style}>
      <span>{label ?? 'imagen'}</span>
    </div>
  );
}
