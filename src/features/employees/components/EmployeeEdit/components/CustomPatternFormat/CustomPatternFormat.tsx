import React from 'react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { InputPropPackage } from '../../types';

function CustomPatternFormat({
  className = '',
  type,
  format = '',
  value,
  isInvalid,
  onChange = () => {},
}: {
  className?: string;
  type?: 'text' | 'tel' | 'password';
  format: string;
  value: string | number | null;
  isInvalid?: boolean;
  onChange: (event: NumberFormatValues) => void;
}) {
  return (
    <PatternFormat<InputPropPackage>
      className={className}
      type={type}
      format={format}
      customInput={Input}
      value={value}
      isInvalid={isInvalid}
      onValueChange={onChange}
      mask="_"
      allowEmptyFormatting
      valueIsNumericString
      validationMessages={['This field is required. Please fill it up.']}
      isMessagesAbsolute
    />
  );
}

export default CustomPatternFormat;
