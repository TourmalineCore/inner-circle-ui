import { useEffect, useState } from 'react';
import { formatMoney, reformatMoney } from '../../../../common/utils/formatMoney';

import './RedactComponent.css';

function RedactComponent({
  value,
  valueDelta,
  onChange,
} : {
  value : string,
  valueDelta?: number,
  onChange?: (number: number) => void
}) {
  const [redValue, setRedValue] = useState(value);
  const [isPercent, setisPercent] = useState(false);

  useEffect(() => {
    if (redValue.includes('%')) {
      setisPercent(true);
    }
  }, []);

  function onFocus() {
    setRedValue(reformatMoney(redValue));
  }

  function onCheckPercent(number : string) {
    if (isPercent) {
      setRedValue(`${number}%`);
    } else {
      setRedValue(formatMoney(Number(number)));
    }
  }

  function onAccept() {
    onCheckPercent(redValue.replace(',', '.'));
    if (onChange && (Number(reformatMoney(value)) !== Number(reformatMoney(redValue)))) {
      onChange(Number(redValue));
    }
  }

  function onCancellation() {
    setRedValue(value);
  }
  function handleKeyUp(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
      onAccept();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.target.blur();
      onCancellation();
    }
  }

  return (
    <div className="redact-cmpnt">
      {onChange
        ? (
          <input
            className="input-data"
            type="text"
            value={redValue}
            onChange={(e : any) => setRedValue(e.target.value)}
            onFocus={onFocus}
            onKeyUp={handleKeyUp}
            onBlur={onCancellation}
          />
        ) : <div>{value}</div>}
      {valueDelta !== 0 && valueDelta
        && (
          <div style={{ color: valueDelta > 0 ? 'green' : 'red' }}>
            {valueDelta === 0 ? '' : getTotal(valueDelta)}
          </div>
        )}
    </div>
  );

  function getTotal(delta: number) {
    const plus = delta >= 1 ? '+' : '';
    return `${plus}${isPercent ? `${delta}%` : formatMoney(delta)}`;
  }
}

export default RedactComponent;
