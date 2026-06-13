import { useEffect } from 'react';
import { Icon } from './Icon';

interface ModalProps {
  title: string;
  kicker?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}

export function Modal({ title, kicker, onClose, children, footer, wide }: ModalProps) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="modal" style={wide ? { maxWidth: 720 } : undefined} onMouseDown={e => e.stopPropagation()}>
        <div className="modal-hd">
          <div style={{ flex: 1 }}>
            {kicker && <div className="kicker" style={{ marginBottom: 5 }}>{kicker}</div>}
            <h3>{title}</h3>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ border: 'none' }}>
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
