import './Button.scss'

import clsx from 'clsx'

export const Button = ({
  onClick,
  className, 
  label, 
  isAccent = false,
  isDisable = false,
  isLoader = false,
  isMobile = false,
  isOutline = false,
  ...props
}: {
  onClick: () => unknown,
  className?: string, 
  label: string | React.ReactNode, 
  isAccent?: boolean,
  isDisable?: boolean,
  isLoader?: boolean,
  isMobile?: boolean,
  isOutline?: boolean,
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    type="button"
    onClick={onClick} 
    className={clsx(`button`, className, {
      'button__accent': isAccent,
      'button__secondary': !isAccent,
      'button__disable': isDisable,
      'button__mobile': isMobile,
      'button__outline': isOutline,
    })}
    disabled={isDisable}
    {...props}
  >
    {
      <>
        {
          isLoader && <span className="button__loader" />
        }
        {label}
      </>
    }
  </button>
)
