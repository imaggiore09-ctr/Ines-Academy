import { BrandMark } from './BrandMark';
import type { BrandVariant } from './BrandMark';

const BRAND_SUB = 'Estudio de Marca';

interface BrandLockupProps {
  name: string;
  variant?: BrandVariant;
  size?: number;
  nameSize?: number;
  light?: boolean;
}

export function BrandLockup({ name, variant, size = 36, nameSize = 19, light }: BrandLockupProps) {
  return (
    <div className="row" style={{ gap: 11 }}>
      <BrandMark variant={variant} size={size} />
      <div>
        <div className="brand-name" style={{ fontSize: nameSize, lineHeight: 1, color: light ? '#fff' : 'var(--ink)' }}>
          {name}
        </div>
        <div className="brand-sub" style={light ? { color: 'rgba(255,255,255,.5)' } : undefined}>
          {BRAND_SUB}
        </div>
      </div>
    </div>
  );
}
