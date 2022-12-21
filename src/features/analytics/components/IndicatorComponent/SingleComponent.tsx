import { IndicatorType } from '../../types';

function SingleComponent({ value, icon }:{ value: IndicatorType, icon?: string }) {
  return (
    <div className={`single-component ${icon || ''}`}>
      <div className="component-signature__min">{value.label}</div>
      <div className="component-value__big">{value.value}</div>
    </div>
  );
}

export default SingleComponent;
