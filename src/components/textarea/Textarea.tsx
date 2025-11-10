import './Textarea.scss'

import clsx from 'clsx'

export function Textarea({
  className = ``,
  id,
  label,
  isInvalid,
  ...props
}: {
 className?: string,
 id?: string,
 label?: string,
 isInvalid?: boolean,
}& React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) {
  return (
    <div className={`textarea ${className}`}>
      {
        label && (
          <label 
            className="textarea__label"
            htmlFor={id}
          >
            {label}
          </label>
        )
      }
      <textarea
        id={id}
        className={clsx(`textarea__control`, {
          'textarea__field--error': isInvalid,
        })}
        {...props}
      />
    </div>
  )
}