interface SerifIProps {
  compact?: boolean;
}

function SerifI({ compact }: SerifIProps) {
  if (compact) {
    return (
      <g fill="currentColor">
        <rect x={13} y={12} width={14} height={2.1} rx={0.4} />
        <rect x={13} y={25.8} width={14} height={2.1} rx={0.4} />
        <rect x={18} y={12} width={4} height={16} />
      </g>
    );
  }
  return (
    <g fill="currentColor">
      <rect x={9} y={7} width={22} height={2.6} rx={0.5} />
      <rect x={9} y={30.4} width={22} height={2.6} rx={0.5} />
      <rect x={16.4} y={7} width={7.2} height={26} />
    </g>
  );
}

export type BrandVariant = 'crest' | 'frame' | 'shield' | 'circle' | 'serif';

interface BrandMarkProps {
  variant?: BrandVariant;
  size?: number;
}

export function BrandMark({ variant = 'crest', size = 36 }: BrandMarkProps) {
  let content: React.ReactNode;

  if (variant === 'crest') {
    content = (
      <>
        <ellipse cx={20} cy={20} rx={13.4} ry={16.6} fill="none" stroke="currentColor" strokeWidth={1.1} />
        <ellipse cx={20} cy={20} rx={11.3} ry={14.2} fill="none" stroke="currentColor" strokeWidth={0.55} opacity={0.6} />
        <path d="M20 1.2c-2.4 1.6-4 .3-4 .3M20 1.2c2.4 1.6 4 .3 4 .3" fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round" />
        <path d="M20 5.6c-1.7-1-1.7-3 0-4 1.7 1 1.7 3 0 4Z" fill="currentColor" />
        <path d="M20 38.8c-2.4-1.6-4-.3-4-.3M20 38.8c2.4-1.6 4-.3 4-.3" fill="none" stroke="currentColor" strokeWidth={0.7} strokeLinecap="round" />
        <path d="M20 34.4c-1.7 1-1.7 3 0 4 1.7-1 1.7-3 0-4Z" fill="currentColor" />
        <path d="M6.6 20c-1.4 0-2.2-1-2.2-2M33.4 20c1.4 0 2.2-1 2.2-2M6.6 20c-1.4 0-2.2 1-2.2 2M33.4 20c1.4 0 2.2 1 2.2 2" fill="none" stroke="currentColor" strokeWidth={0.6} strokeLinecap="round" opacity={0.8} />
        <rect x={13.5} y={10.8} width={13} height={0.8} fill="currentColor" opacity={0.55} />
        <rect x={13.5} y={28.4} width={13} height={0.8} fill="currentColor" opacity={0.55} />
        <g fill="currentColor">
          <rect x={14.6} y={13.2} width={10.8} height={1.7} rx={0.4} />
          <rect x={13.8} y={13.2} width={1.2} height={1.7} />
          <rect x={25} y={13.2} width={1.2} height={1.7} />
          <rect x={14.6} y={25.1} width={10.8} height={1.7} rx={0.4} />
          <rect x={13.8} y={25.1} width={1.2} height={1.7} />
          <rect x={25} y={25.1} width={1.2} height={1.7} />
          <rect x={18.4} y={13.2} width={3.2} height={13.6} />
        </g>
      </>
    );
  } else if (variant === 'circle') {
    content = (
      <>
        <circle cx={20} cy={20} r={18} fill="none" stroke="currentColor" strokeWidth={1.4} />
        <SerifI compact />
      </>
    );
  } else if (variant === 'shield') {
    content = (
      <>
        <path d="M20 3 35 8v11c0 9-6.5 14.5-15 18C11.5 33.5 5 28 5 19V8L20 3Z" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
        <g transform="translate(0,1)"><SerifI compact /></g>
      </>
    );
  } else if (variant === 'serif') {
    content = (
      <>
        <rect x={6} y={4.5} width={28} height={1.2} fill="currentColor" opacity={0.5} />
        <rect x={6} y={34.3} width={28} height={1.2} fill="currentColor" opacity={0.5} />
        <SerifI />
      </>
    );
  } else {
    // frame
    content = (
      <>
        <rect x={3} y={3} width={34} height={34} rx={2.5} fill="none" stroke="currentColor" strokeWidth={1.4} />
        <rect x={6} y={6} width={28} height={28} rx={1} fill="none" stroke="currentColor" strokeWidth={0.6} opacity={0.45} />
        <SerifI compact />
      </>
    );
  }

  return (
    <div className="brand-mono" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        {content}
      </svg>
    </div>
  );
}
