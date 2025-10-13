import './RedactComponent.scss'

import clsx from 'clsx'

import { KeyboardEvent, useRef, useState } from 'react'
import { NumericFormat } from 'react-number-format'

export function RedactComponent({
  value,
  valueDelta,
  isEditable = false,
  isPercent = false,
  className,
  isPositiveDeltaGoodForClient = true,
  onChange = () => {},
} : {
  value: number,
  valueDelta?: number,
  isEditable?: boolean,
  isPercent?: boolean,
  isPositiveDeltaGoodForClient?: boolean,
  className?: string,
  onChange?: (number: number) => void,
}) {
  const [
    editableValue,
    setRedValue,
  ] = useState(value.toString())
  const [
    isFocus,
    setIsFocus,
  ] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function onAccept() {
    if (isEditable && (Number(value) !== Number(editableValue))) {
      onChange(Number(editableValue))
    }
  }

  function onCancel() {
    setRedValue(value.toString())
    setIsFocus(false)
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === `Enter`) {
      event.preventDefault()
      inputRef.current?.blur()
      onAccept()
    }

    if (event.key === `Escape`) {
      event.preventDefault()
      inputRef.current?.blur()

      onCancel()
    }
  }

  const sumbol = isPercent 
    ? ` %` 
    : ` ₽`

  let colorDelta

  if (!isPositiveDeltaGoodForClient) {
    colorDelta = valueDelta! > 0 
      ? `green` 
      : `red`
  }
  else {
    colorDelta = valueDelta! > 0 
      ? `red` 
      : `green`
  }

  return (
    <div className="component">
      <NumericFormat
        title="Click for update"
        getInputRef={inputRef}
        type="text"
        displayType={isEditable ? `input` : `text`}
        className={clsx(`component-input`, className, {
          'component-input--is-editable': isEditable,
        })}
        value={editableValue}
        valueIsNumericString
        allowLeadingZeros
        thousandsGroupStyle="thousand"
        thousandSeparator=","
        onValueChange={(values) => {
          setRedValue(values.value)
        }}
        suffix={isFocus ? undefined : sumbol}
        onFocus={() => setIsFocus(true)}
        onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => handleKeyUp(event)}
        onBlur={() => onCancel()}
      />

      {valueDelta
        ? (
          <div style={{
            color: colorDelta, 
          }}>
            <NumericFormat
              displayType="text"
              value={valueDelta}
              allowLeadingZeros
              prefix={valueDelta >= 1 
                ? `+` 
                : ``}
              thousandSeparator=","
              suffix={sumbol}
            />
          </div>
        ) : null}
    </div>
  )
}