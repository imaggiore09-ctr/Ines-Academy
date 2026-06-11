export interface SpotSpec {
  w: number;
  h: number;
  t?: string;
  l?: string;
  r?: string;
  b?: string;
  r0?: number;
  c?: string;
  o?: number;
}

interface SpotsProps {
  specs: SpotSpec[];
}

export function Spots({ specs }: SpotsProps) {
  return (
    <>
      {specs.map((s, i) => (
        <span
          key={i}
          className="spot"
          style={{
            width: s.w,
            height: s.h,
            top: s.t,
            left: s.l,
            right: s.r,
            bottom: s.b,
            transform: `rotate(${s.r0 || 0}deg)`,
            background: s.c || 'var(--ink)',
            opacity: s.o ?? 0.9,
          }}
        />
      ))}
    </>
  );
}
