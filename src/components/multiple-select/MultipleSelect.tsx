import './MultipleSelect.scss'

import IconArrow from '../../assets/icons/icon-arrow.svg?react'
import IconCross from '../../assets/icons/icon-cross.svg?react'
import IconCheckMarkPurple from '../../assets/icons/icon-check-mark-purple.svg?react'
import { useEffect, useRef, useState } from 'react'
import { useHorizontalDragScroll } from './hooks/useHorizontalDragScroll'
import clsx from 'clsx'

type Option = {
  value: string,
  label: string,
}

export function MultipleSelect({
  className = ``,
  placeholder = ``,
  label,
  id,
  value,
  options = [],
  isError,
  onChange,
}: {
  value: string[],
  options: Option[],
  placeholder?: string,
  label?: string,
  id?: string,
  className?: string,
  isError?: boolean,
  onChange?: (
    selectedOptions: Option[]
  ) => unknown,
}) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)
  const multipleSelectRef = useRef<HTMLDivElement>(null)

  const {
    containerRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
  } = useHorizontalDragScroll()

  useEffect(() => {
    const handleClickOutsideOrFocusLoss = (event: MouseEvent | FocusEvent) => {
      if (multipleSelectRef.current && !multipleSelectRef.current.contains(event.target as Node)) {
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

  return (
    <div
      className={`multiple-select ${className}`}
      ref={multipleSelectRef}
    >

      {label && (
        <label 
          className="multiple-select__label"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div 
        className={clsx(`multiple-select__control`, {
          'multiple-select__control--error': isError,
        })}
        tabIndex={0}
        onClick={handleOpenDropdown}
        onKeyDown={(e) => {
          if (e.key === `Enter`) {
            handleOpenDropdown()
          } 
        }}
      >
        <div
          ref={containerRef} 
          className="multiple-select__values-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {getSelectedLabels()}
        </div>
        <IconArrow
          className={clsx(`multiple-select__arrow`, {
            'multiple-select__arrow--open': isOpen,
          })}
        />
      </div>

      {isOpen && (
        <div className="multiple-select__dropdown">
          {options.map(({
            value: optionValue,
            label: optionLabel, 
          }) => (
            <button
              key={`multiple-select-option-${optionValue}`}
              className="multiple-select__option"
              onClick={() => handleOptionChange(optionValue)}
            >
              <span>{optionLabel}</span>
              {value.includes(optionValue) && <IconCheckMarkPurple className='multiple-select__check-mark' />}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  function getSelectedLabels() {
    const selected = options
      .filter((option) => value.includes(option.value))
    
    return selected.length > 0
      ? selected.map(({
        label,
        value,
      }) => (
        <span
          key={value}
          className='multiple-select__value'
        >
          {label}
          <IconCross
            tabIndex={0}
            onClick={(e) => {
              // stopPropagation is needed so that the dropdown menu does not open when clicking on the cross
              e.stopPropagation()
              handleOptionChange(value)
            }}
            onKeyDown={(e) => {
              e.stopPropagation()
              if (e.key === `Enter`) {
                handleOptionChange(value)
              } 
            }}
            aria-label='Remove from selected options'
          />
        </span>
      ))
      : <span 
        className='multiple-select__placeholder'
      >
        {placeholder}
      </span>
  }

  function handleOpenDropdown() {
    setIsOpen(!isOpen)
  }

  function handleOptionChange(optionValue: Option['value']) {
    const newValue = value.includes(optionValue)
      ? value.filter((value) => value !== optionValue)
      : [
        ...value,
        optionValue,
      ]

    const selectedOptions = options.filter((option) => newValue.includes(option.value))
    
    onChange?.(selectedOptions)
  }
}