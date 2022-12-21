import { IndicatorType } from '../../types';

function ListComponent({ values, icon }:{ values: IndicatorType[], icon: string }) {
  return (
    <div className={`list-component ${icon}`}>
      {values.map((el) => (
        <div className="list-component__info">
          <div className="component-signature__big">{el.label}</div>
          <div className="component-value__min">{el.value}</div>
        </div>
      ))}
    </div>
  );
}

export default ListComponent;
