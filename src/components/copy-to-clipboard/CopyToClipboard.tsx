import './CopyToClipboard.scss'

import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const CopyToClipboard = observer(({
  text,
  className,
  children,
}: {
  text: string,
  className?: string,
  children?: React.ReactNode,
}) => {
  const [
    isCopied,
    setIsCopied,
  ] = useState(false)

  const [
    isHovered,
    setIsHovered,
  ] = useState(false)

  const handleCopyClick = () => {
    navigator
      .clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
  }

  return (
    <div
      className="copy-to-clipboard"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`copy-to-clipboard__text ${className}`}
        onClick={handleCopyClick}
      >
        {children || text}
      </div>
      {(isHovered || isCopied) && (
        <div className="copy-to-clipboard__tooltip">
          {
            isCopied
              ? `Copied`
              : `Copy`
          }
        </div>
      )}
    </div>
  )
})
