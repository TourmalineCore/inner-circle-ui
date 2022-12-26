import { ReactNode } from 'react';

import './IndicatorComponent.scss';

function IndicatorComponent({ head, children, isLite = false }:{ head?: string, children:ReactNode, isLite?: boolean }) {
  return (
    <div className={`indicator-component${isLite ? ' lite-box' : ''}`}>
      {head
        && <div className="indicator-component__head">{head}</div>}
      <div className="indicator-component__values">
        {children}
      </div>
    </div>
  );
}

export default IndicatorComponent;
