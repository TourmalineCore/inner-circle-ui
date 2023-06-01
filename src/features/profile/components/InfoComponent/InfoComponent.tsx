import { ReactNode } from 'react';
import InfoTip from '../../../../components/InfoTip/InfoTip';
import { ReactComponent as IconError } from '../../../../assets/icons/icon-error.svg';

function InfoComponent({
  value,
  icon,
  label,
  isError = false,
}: {
  label: string;
  value: string | ReactNode,
  icon?: ReactNode,
  isError?: boolean;
}) {
  return (
    <div className="info-component">

      <div className="info-component__card">
        <div className="info-component__header">
          <span className="info-component__name">{label}</span>
          <span className="info-component__icon">{icon}</span>
        </div>

        <span className="info-component__value">
          {value || 'I will be...'}
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
  );
}

export default InfoComponent;
