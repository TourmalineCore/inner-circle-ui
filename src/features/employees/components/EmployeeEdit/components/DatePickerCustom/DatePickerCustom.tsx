/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Component, forwardRef } from 'react';

import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import { PatternFormat } from 'react-number-format';
import { Input } from '@tourmalinecore/react-tc-ui-kit';

function DatePickerCustom({
  date = null,
  dateFormat = 'dd.MM.yyyy',
  patternFormat = '##.##.####',
  onChange = () => {},
}: {
  date?: Date | null;
  dateFormat?: string;
  patternFormat?: string;
  onChange: (date: Date) => void;
}) {
  const CustomInput = forwardRef((props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => (
    // @ts-ignore
    <PatternFormat
      {...props}
      format={patternFormat}
      allowEmptyFormatting
      mask="_"
      placeholder="dd.mm.yyyy"
      getInputRef={ref}
      customInput={ReadonlyInput}
    />
  ));

  return (
    <DatePicker
      dateFormat={dateFormat}
      locale={ru}
      placeholderText="dd.mm.yyyy"
      selected={date}
      onChange={onChange}
      customInput={<CustomInput />}
    />
  );
}

// this is a workaround to prevent refs error
// eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
// eslint-disable-next-line react/prefer-stateless-function
class ReadonlyInput extends Component {
  render() {
    return (
      <Input
        {...this.props}
        placeholder="dd.mm.yyyy"
        type="text"
      />
    );
  }
}

export default DatePickerCustom;
