import { ReactNode } from 'react';

import './IndicatorValue.scss';

function IndicatorValue({
  label, value, isColumn, dataTestId
}:{ label:ReactNode, value: string, isColumn?: boolean, dataTestId?: string }) {
  return (
    <div className={`indicator-value${isColumn ? ' direction-column' : ''}`}>
      <div className="indicator-value__label">
        {label}
      </div>
      <div className="indicator-value__info" data-testid={dataTestId}>
        {value}
      </div>
    </div>
  );
}

export default IndicatorValue;
