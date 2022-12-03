import { useEffect, useState } from 'react';
import './RedactComponent.css';
import { formatMoney, reformatMoney } from '../../../../common/utils/formatMoney';

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

  function onBlur() {
    onCheckPercent(redValue.replace(',', '.'));
    if (onChange && (Number(reformatMoney(value)) !== Number(reformatMoney(redValue)))) {
      onChange(Number(redValue));
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
            onBlur={onBlur}
          />
        ) : <div>{value}</div>}
      {valueDelta && valueDelta !== 0
        ? (
          <div style={{ color: valueDelta > 0 ? 'green' : 'red' }}>
            {valueDelta === 0 ? '' : getTotal()}
          </div>
        )
        : ''}
    </div>
  );

  function getTotal() {
    if (valueDelta) {
      const plus = valueDelta >= 1 ? '+' : '';
      return `${plus}${isPercent ? `${valueDelta}%` : formatMoney(valueDelta)}`;
    }
    return '';
  }
}

export default RedactComponent;
