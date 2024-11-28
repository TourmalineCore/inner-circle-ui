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
  onChange: any,
}) {
  const viewTypeClassName = viewType === 'radio' ? 'tc-checkfield__box--radio' : '';

  return (
    <label style={style} className={`tc-checkfield ${className}`}>
      <input
        type="checkbox"
        className="tc-checkfield__input"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className={`tc-checkfield__box ${viewTypeClassName}`} />

      {label && (
        <span className="tc-checkfield__label">{label}</span>
      )}
    </label>
  );
}
