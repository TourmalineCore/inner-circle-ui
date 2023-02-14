/* eslint-disable @typescript-eslint/naming-convention */
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { Input } from '@tourmalinecore/react-tc-ui-kit';

export default function MyCustomNumberFormat({
  value,
  onChange,
  required,
}: {
  value: string | number | null;
  onChange: (event: NumberFormatValues) => void;
  required?: boolean;
}) {
  return (
    <NumericFormat
      required={required}
      allowLeadingZeros
      thousandSeparator=","
      value={value}
      valueIsNumericString
      onValueChange={onChange}
      customInput={Input}
    />
  );
}
