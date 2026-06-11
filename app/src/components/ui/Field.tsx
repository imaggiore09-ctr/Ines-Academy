interface FieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  area?: boolean;
  placeholder?: string;
  mono?: boolean;
}

export function Field({ label, value, onChange, area, placeholder, mono }: FieldProps) {
  return (
    <label className="field">
      {label && <span>{label}</span>}
      {area ? (
        <textarea
          className="textarea"
          value={value ?? ''}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          style={mono ? { fontFamily: 'var(--mono)' } : undefined}
        />
      ) : (
        <input
          className="input"
          value={value ?? ''}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
