import { ReactNode } from 'react';

import './IndicatorComponent.scss';

function IndicatorComponent({
  head, children, isLite = false, style,
}:{ head?: string, children:ReactNode, isLite?: boolean, style?: React.CSSProperties }) {
  return (
    <div className={`indicator-component${isLite ? ' lite-box' : ''}`} style={style}>
      {head
        && <div className="indicator-component__head">{head}</div>}
      <div className="indicator-component__values">
        {children}
      </div>
    </div>
  );
}

export default IndicatorComponent;
