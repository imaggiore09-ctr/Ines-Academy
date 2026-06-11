interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Tag({ children, onClick }: TagProps) {
  return (
    <span className="tag" onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      {children}
    </span>
  );
}
