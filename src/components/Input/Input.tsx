import './Input.scss'
import InputMask, { Props } from 'react-input-mask'

export function Input({
  inputRef,
  style,
  className = ``,
  id,
  label,
  value,
  name,
  placeholder,
  mask,
  isValid,
  isInvalid = false,
  isError = false,
  validationMessages = [],
  isMessagesAbsolute = false,
  onChange = () => { },
  ...props
} : {
  inputRef?: React.Ref<HTMLInputElement>,
  style?: React.CSSProperties,
  className?: string,
  id?: string,
  label?: string,
  value?: string | number | readonly string[],
  name?: string,
  placeholder?: string,
  mask?: string,
  isValid?: boolean,
  isInvalid?: boolean,
  isError?: boolean,
  validationMessages?: string[],
  isMessagesAbsolute?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
} & Omit<Props, 'mask'>) {
  const validClassname = isValid ? `input--valid` : ``
  const invalidClassname = isInvalid ? `input--invalid` : ``
  const errorsAbsoluteClassname = isMessagesAbsolute ? `input__errors--absolute` : ``

  return (
    <div
      style={style}
      className={`input ${className} ${invalidClassname} ${validClassname}`}
    >
      {
        label && (
          <label 
            className="input__label"
            htmlFor={id}
          >
            {label}
          </label>
        )
      }

      <div className="input__box">
        <InputMask
          name={name}
          inputRef={inputRef}
          id={id}
          placeholder={placeholder}
          className={`
            input__control
            ${isError ? `input__control--error`: ``}
          `}
          type="text"
          value={value}
          onChange={onChange}
          mask={mask || ``}
          {...props}
        />
      </div>

      {
        isInvalid 
        && validationMessages.length > 0 
        && (
          <ul className={`input__errors ${errorsAbsoluteClassname}`}>
            {
              validationMessages.map((validationMessage: any) => (
                <li key={validationMessage}>
                  {validationMessage}
                </li>
              ))
            }
          </ul>
        )}
    </div>
  )
}
