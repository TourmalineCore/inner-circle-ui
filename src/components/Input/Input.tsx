export default function Input({
  inputRef,
  style,
  className = '',
  id,
  label,
  value,
  name,
  placeholder,
  isValid,
  isInvalid = false,
  validationMessages = [],
  isMessagesAbsolute = false,
  onChange = () => { },
  ...props
} : {
  inputRef?: React.LegacyRef<HTMLInputElement>,
  style?: React.CSSProperties,
  className?: string,
  id?: string,
  label?: string,
  value?: string | number | readonly string[],
  name?: string,
  placeholder?: string,
  isValid?: boolean,
  isInvalid?: boolean,
  validationMessages?: string[],
  isMessagesAbsolute?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) {
  const validClassname = isValid ? 'input--valid' : '';
  const invalidClassname = isInvalid ? 'input--invalid' : '';
  const errorsAbsoluteClassname = isMessagesAbsolute ? 'input__errors--absolute' : '';

  return (
    <div
      style={style}
      className={`input ${className} ${invalidClassname} ${validClassname}`}
    >
      {label && (
        <label className="input__label" htmlFor={id}>{label}</label>
      )}

      <div className="input__box">
        <input
          name={name}
          ref={inputRef}
          id={id}
          placeholder={placeholder}
          className="input__control"
          type="text"
          maxLength={40}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>

      {isInvalid && validationMessages.length > 0 && (
        <ul className={`input__errors ${errorsAbsoluteClassname}`}>
          {validationMessages.map((validationMessage: any) => (
            <li key={validationMessage}>{validationMessage}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
