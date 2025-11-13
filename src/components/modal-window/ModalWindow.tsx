import './ModalWindow.scss'

import CancelIcon from '../../assets/icons/icon-cancel.svg?react'

import { Button } from '../button/Button'
import clsx from 'clsx'

export const ModalWindow = ({
  onAccentButtonAction,
  onButtonAction,
  onCloseModal,
  title,
  text,
  buttonLabel,
  accentButtonLabel,
  hasCloseButton = false,
}: {
  onAccentButtonAction: () => unknown,
  onButtonAction: () => unknown,
  onCloseModal?: () => unknown,
  title: string,
  text: string | React.ReactNode,
  buttonLabel: string,
  accentButtonLabel: string,
  hasCloseButton?: boolean,
}) => (
  <div 
    className={clsx(`modal-window`, { 
      'modal-window--has-close-button': hasCloseButton,
    })}
    data-cy="modal-window"
  >
    {
      hasCloseButton && <button
        type="button"
        className="modal-window__close-button"
        onClick={onCloseModal}
      >
        <CancelIcon />
      </button>
    }

    <div className="modal-window__title">
      {title}
    </div>

    <div className="modal-window__text">
      {text}
    </div>

    <div className="modal-window__actions"> 
      <Button 
        onClick={onButtonAction}
        label={buttonLabel}
      />
    
      <Button 
        onClick={onAccentButtonAction}
        label={accentButtonLabel}
        isAccent
      />
    </div>
  </div>
)
