import { ReactNode } from 'react';
import clsx from 'clsx';
import InfoTip from '../../../../../components/InfoTip/InfoTip';
import { ReactComponent as IconError } from '../../../../../assets/icons/icon-error.svg';

export function InfoCard({
  value,
  icon,
  label,
  isError = false,
  isHaveValue,
}: {
  label: string;
  value: ReactNode,
  icon?: ReactNode,
  isHaveValue: boolean;
  isError?: boolean;
}) {
  return (
    <div
      className="info-card"
      data-cy="info-card"
    >
      <div className="info-card__card">
        <div className="info-card__header">
          <span className="info-card__name">{label}</span>
          <span className="info-card__icon">{icon}</span>
        </div>

        <span
          data-cy="info-card-value"
          className={clsx('info-card__value', {
            'info-card__value--not-filled': !isHaveValue,
          })}
        >
          {
            isHaveValue
              ? value
              : 'not filled..'
          }
        </span>
      </div>

      {
        isError && (
          <InfoTip
            className="info-card__info-tip"
            content="Please fill this field."
            classNameContent="info-card__info-content"
            icon={<IconError />}
          />
        )
      }
    </div>
  );
}
