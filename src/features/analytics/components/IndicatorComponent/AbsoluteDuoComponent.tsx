import { IndicatorType } from '../../types';
import './IndicatorComponent.css';

function AbsoluteDuoComponent({
  leftValue, rightValue, sumValue, icon,
}:{ leftValue: IndicatorType, rightValue: IndicatorType, sumValue: IndicatorType, icon:string }) {
  return (
    <div className={`absolute-component ${icon}`}>
      <div className="absolute-component__sum">
        <div className="component-signature__min">{sumValue.label}</div>
        <div className="component-value__big">{sumValue.value}</div>
      </div>
      <div className="absolute-component__values">
        <div className="absolute-component__value">
          <div className="component-signature__min">{leftValue.label}</div>
          <div className="component-value__big">{leftValue.value}</div>
        </div>
        <div className="absolute-component__value">
          <div className="component-signature__min">{rightValue.label}</div>
          <div className="component-value__big">{rightValue.value}</div>
        </div>
      </div>
    </div>
  );
}

export default AbsoluteDuoComponent;
