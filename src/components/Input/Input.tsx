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
  validationMessages?: any,
  isMessagesAbsolute?: boolean,
  onChange?: any,
}) {
  const validClassname = isValid ? 'tc-input--valid' : '';
  const invalidClassname = isInvalid ? 'tc-input--invalid' : '';
  const errorsAbsoluteClassname = isMessagesAbsolute ? 'tc-input__errors--absolute' : '';

  return (
    <div
      style={style}
      className={`tc-input ${className} ${invalidClassname} ${validClassname}`}
    >
      {label && (
        <label className="tc-input__label" htmlFor={id}>{label}</label>
      )}

      <div className="tc-input__box">
        <input
          name={name}
          ref={inputRef}
          id={id}
          placeholder={placeholder}
          className="tc-input__control"
          type="text"
          maxLength={40}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>

      {isInvalid && validationMessages.length && (
        <ul className={`tc-input__errors ${errorsAbsoluteClassname}`}>
          {validationMessages.map((validationMessage: any) => (
            <li key={validationMessage}>{validationMessage}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
