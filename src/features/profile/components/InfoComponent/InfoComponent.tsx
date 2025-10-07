import './InfoComponent.scss'

import { ReactNode } from 'react'
import clsx from 'clsx'
import { InfoTip } from '../../../../components/InfoTip/InfoTip'
import IconError from '../../../../assets/icons/icon-error.svg?react'

export function InfoComponent({
  value,
  icon,
  label,
  isError = false,
  isHaveValue,
}: {
  label: string,
  value: ReactNode,
  icon?: ReactNode,
  isHaveValue: boolean,
  isError?: boolean,
}) {
  return (
    <div className="info-component">

      <div className="info-component__card">
        <div className="info-component__header">
          <span className="info-component__name">{label}</span>
          <span className="info-component__icon">{icon}</span>
        </div>

        <span className={clsx(`info-component__value`, {
          'info-component__value--not-filled': !isHaveValue,
        })}
        >
          {
            isHaveValue
              ? value
              : `not filled...`
          }
        </span>
      </div>

      {isError && (
        <InfoTip
          className="info-component__info-tip"
          content="Please fill this field."
          classNameContent="info-component__info-content"
          icon={<IconError />}
        />
      )}
    </div>
  )
}
