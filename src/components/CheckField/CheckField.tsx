export default function CheckField({
  style = {},
  className = '',
  viewType = 'checkbox',
  label,
  disabled = false,
  checked,
  onChange,
  ...props
} : {
  style?: React.CSSProperties;
  className?: string;
  viewType?: 'checkbox' | 'radio';
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) {
  const viewTypeClassName = viewType === 'radio' ? 'checkfield__box--radio' : '';

  return (
    <label style={style} className={`checkfield ${className}`}>
      <input
        type="checkbox"
        className="checkfield__input"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className={`checkfield__box ${viewTypeClassName}`} />

      {label && (
        <span className="checkfield__label">{label}</span>
      )}
    </label>
  );
}
