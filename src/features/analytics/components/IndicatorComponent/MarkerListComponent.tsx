import { IndicatorType } from '../../types';

function MarkerListComponent({ header, valuse, icon }:{ header: string, valuse: IndicatorType[], icon: string }) {
  return (
    <div className={`marker-list ${icon}`}>
      <div className="marker-list__head">{header}</div>
      <div className="marker-list__info">
        <div className="marker-list__info-labels">
          {valuse.map((el) => (
            <div key={valuse.indexOf(el)} className="component-signature__big">

              <li>{el.label}</li>
            </div>
          ))}
        </div>
        <div className="marker-list__info-values">
          {valuse.map((el) => (
            <div key={valuse.indexOf(el)} className="component-value__min">{el.value}</div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default MarkerListComponent;
