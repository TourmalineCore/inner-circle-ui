// ToDo: rename RedactComponent, get rid of inline styles for delta (using classname)

import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { formatMoney, reformatMoney } from '../../../../common/utils/formatMoney';

import './RedactComponent.css';

function RedactComponent({
  value,
  valueDelta,
  onChange = () => {},
  isEditable = false,
} : {
  value : string | number,
  valueDelta?: number,
  onChange?: (number: number) => void,
  isEditable?: boolean,
}) {
  const [editableValue, setRedValue] = useState(String(value));
  const [isPercent, setIsPercent] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editableValue.includes('%')) {
      setIsPercent(true);
    }
  }, []);

  function onFocus() {
    setRedValue(reformatMoney(editableValue));
  }

  function onCheckPercent(number : string) {
    if (isPercent) {
      setRedValue(`${number}%`);
    } else {
      setRedValue(formatMoney(Number(number)));
    }
  }

  function onAccept() {
    onCheckPercent(editableValue.replace(',', '.'));
    if (isEditable && (Number(reformatMoney(String(value))) !== Number(reformatMoney(editableValue)))) {
      onChange(Number(editableValue));
    }
  }

  function onCancel() {
    setRedValue(String(value));
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current?.blur();
      onAccept();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      inputRef.current?.blur();

      onCancel();
    }
  }

  return (
    <div className="component">
      {
        isEditable
          ? (
            <input
              ref={inputRef}
              className="component-input"
              type="text"
              value={editableValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRedValue(e.target.value)}
              onFocus={onFocus}
              onKeyUp={handleKeyUp}
              onBlur={onCancel}
            />
          ) : <div>{value}</div>
      }
      {valueDelta
        ? (
          <div style={{ color: valueDelta > 0 ? 'green' : 'red' }}>
            {getTotal(valueDelta)}
          </div>
        )
        : null}
    </div>
  );

  function getTotal(delta: number) {
    const plus = delta >= 1 ? '+' : '';

    return `${plus}${isPercent ? `${delta}%` : formatMoney(delta)}`;
  }
}

export default RedactComponent;
