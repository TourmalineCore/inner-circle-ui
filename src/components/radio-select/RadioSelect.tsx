import './RadioSelect.scss'

import IconArrow from '../../assets/icons/icon-arrow.svg?react'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

type Option = {
  value: string,
  label: string,
}

export const RadioSelect = ({
  value,
  options,
  onChange,
}: {
  value: Option['value'],
  options: Option[],
  onChange: (
    optionValue: Option['value']
  ) => unknown,
}) => {  
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)
  
  const radioSelectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutsideOrFocusLoss = (event: MouseEvent | FocusEvent) => {
      if (radioSelectRef.current && !radioSelectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener(`mousedown`, handleClickOutsideOrFocusLoss)
    document.addEventListener(`focusin`, handleClickOutsideOrFocusLoss)
    
    return () => {
      document.removeEventListener(`mousedown`, handleClickOutsideOrFocusLoss)
      document.removeEventListener(`focusin`, handleClickOutsideOrFocusLoss)
    }
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div
      className='radio-select'
      ref={radioSelectRef}
    >
      <div 
        className={clsx(`radio-select__control`, {
          'radio-select__control--open': isOpen,
        })}
        tabIndex={0}
        onClick={handleOpenDropdown}
        onKeyDown={(e) => {
          if (e.key === `Enter`) {
            handleOpenDropdown()
          } 
        }}
      >
        <div className="radio-select__placeholder">
          {selectedOption?.label}
        </div>
        <IconArrow className={clsx(`radio-select__arrow`, {
          'radio-select__arrow--open': isOpen,
        })} />
      </div>

      {isOpen && (
        <div className="radio-select__dropdown">
          {options.map(({
            value: optionValue,
            label: optionLabel, 
          }) => (
            <label
              key={`radio-select-option-${optionValue}`}
              className="radio-select__option"
            >
              <input
                type="radio"
                value={optionValue}
                checked={selectedOption?.value === optionValue}
                onChange={() => handleOptionChange(optionValue)}
              />
              {optionLabel}
            </label>
          ))}
        </div>
      )}
    </div>
  )

  function handleOptionChange(optionValue: string) {
    onChange(optionValue)
    handleOpenDropdown()
  }

  function handleOpenDropdown() {
    setIsOpen(!isOpen)
  }
}
