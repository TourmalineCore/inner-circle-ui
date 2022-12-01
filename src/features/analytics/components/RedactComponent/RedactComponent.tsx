import { useState } from 'react';
import './RedactComponent.css';
import { formatMoney, reformatMoney } from '../../../../common/utils/formatMoney';

function RedactComponent({ value } : { value : string }) {
  const [redValue, setRedValue] = useState(value);
  const [isPercent, setisPercent] = useState(false);

  function onFocus() {
    if (redValue.includes('%')) {
      setisPercent(true);
    }
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
  }

  return (
    <div className="redact-cmpnt">
      <input
        className="input-data"
        type="text"
        value={redValue}
        onChange={(e : any) => setRedValue(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

export default RedactComponent;
