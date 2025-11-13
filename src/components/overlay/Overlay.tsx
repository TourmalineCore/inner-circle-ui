import './Overlay.scss'

import { ModalWindow } from '../modal-window/ModalWindow'
import { useAddDisableScrollClassOnBody } from '../../common/hooks/useAddDisableScrollClassOnBody'

export const Overlay = ({
  onAccentButtonAction,
  onButtonAction,
  onCloseModal,
  modalName,
  title,
  text,
  buttonLabel,  
  accentButtonLabel,
  hasCloseButton = false,
}: {
  onAccentButtonAction: () => unknown,
  onButtonAction?: () => unknown,
  onCloseModal?: () => unknown,
  modalName: `modal`,
  title?: string,
  text?: string | React.ReactNode,
  buttonLabel?: string,
  accentButtonLabel?: string,
  hasCloseButton?: boolean,
  endCalendarDate?: Date | null,
  onChangeCalendar?: (dates: [Date, Date]) => unknown,
}) => {
  useAddDisableScrollClassOnBody()

  return (
    <div className="overlay">
      {
        modalName == `modal` && (
          <ModalWindow 
            onAccentButtonAction={onAccentButtonAction}
            onButtonAction={onButtonAction!}
            onCloseModal={onCloseModal!}
            title={title!}
            text={text!}
            buttonLabel={buttonLabel!}
            accentButtonLabel={accentButtonLabel!}
            hasCloseButton={hasCloseButton} 
          />
        )
      }
    </div>
  )
}
