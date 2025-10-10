import './InfoTip.scss'

import { useState, ReactNode } from 'react'
import clsx from 'clsx'

export function InfoTip({
  className = ``,
  classNameContent = ``,
  title = ``,
  icon,
  content,
}: {
  className?: string,
  classNameContent?: string,
  title?: string,
  content: ReactNode,
  icon: ReactNode,
}) {
  const [
    isOpened,
    setOpened,
  ] = useState(false)

  return (
    <div
      className={clsx(`info-tip`, className, {
        'info-tip--opened': isOpened,
      })}
    >
      <button
        type="button"
        title={title}
        className="info-tip__toggle"
        onMouseEnter={() => setOpened(true)}
        onMouseLeave={() => setOpened(false)}
      >
        {icon}
      </button>

      <div className={clsx(`info-tip__content`, classNameContent)}>{content}</div>
    </div>
  )
}
