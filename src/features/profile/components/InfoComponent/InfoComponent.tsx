import { ReactNode } from 'react';
import './InfoComponent.css';

function InfoComponent({ value, icon }: { value: string, icon?: ReactNode }) {
  const viewValue = value || 'Not specified';
  return (
    <div className="info-component">
      {icon
      && (
        <div className="info-component__icon">
          {icon}
        </div>
      )}
      <div className="info-component__value">{viewValue}</div>
    </div>
  );
}

export default InfoComponent;
