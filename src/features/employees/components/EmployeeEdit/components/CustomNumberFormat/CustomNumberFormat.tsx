/* eslint-disable @typescript-eslint/naming-convention */
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { InputPropPackage } from '../../types';

export default function CustomNumberFormat({
  value,
  onChange,
  required,
  isInvalid,
}: {
  value: string | number | null;
  onChange: (event: NumberFormatValues) => void;
  required?: boolean;
  isInvalid?: boolean;
}) {
  return (
    <NumericFormat<InputPropPackage>
      required={required}
      allowLeadingZeros
      thousandSeparator=","
      value={value}
      valueIsNumericString
      isInvalid={isInvalid}
      validationMessages={['This field is required. Please fill it up.']}
      isMessagesAbsolute
      onValueChange={onChange}
      customInput={Input}
    />
  );
}
