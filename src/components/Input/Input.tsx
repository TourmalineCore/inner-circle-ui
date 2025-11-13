import './Input.scss'

import clsx from 'clsx'
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
  isInvalid,
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
  isInvalid?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
} & Omit<Props, 'mask'>) {
  return (
    <div
      style={style}
      className={`input ${className}`}
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
          className={clsx(`input__control`, {
            'input__control--error': isInvalid,
          })}
          type="text"
          value={value}
          onChange={onChange}
          mask={mask || ``}
          {...props}
        />
      </div>
    </div>
  )
}
