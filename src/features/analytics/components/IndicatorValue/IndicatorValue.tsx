import { ReactNode } from 'react';

import './IndicatorValue.scss';

function IndicatorValue({
  label, value, isColumn,
}:{ label:ReactNode, value: string, isColumn?: boolean }) {
  return (
    <div className={`indicator-value${isColumn ? ' direction-column' : ''}`}>
      <div className="indicator-value__label">
        {label}
      </div>
      <div className="indicator-value__info">
        {value}
      </div>
    </div>
  );
}

export default IndicatorValue;
