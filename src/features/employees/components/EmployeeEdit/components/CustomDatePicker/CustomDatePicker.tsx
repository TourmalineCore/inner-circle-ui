import { Component, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { ru } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { PatternFormat } from 'react-number-format'
import { InputPropPackage } from '../../types'
import { Input } from '../../../../../../components/Input/Input'

export function CustomDatePicker({
  date = null,
  dateFormat = `dd.MM.yyyy`,
  patternFormat = `##.##.####`,
  isInvalid,
  onChange = () => {},
}: {
  date?: Date | null,
  dateFormat?: string,
  patternFormat?: string,
  isInvalid?: boolean,
  onChange: (date: Date) => void,
}) {
  const CustomInput = forwardRef((props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => (
    // @ts-ignore
    <PatternFormat<InputPropPackage>
      {...props}
      customInput={ReadonlyInput}
      format={patternFormat}
      allowEmptyFormatting
      mask="_"
      placeholder="dd.mm.yyyy"
      isInvalid={isInvalid}
      validationMessages={[
        `This field is required. Please fill it up.`,
      ]}
      isMessagesAbsolute
      getInputRef={ref}
    />
  ))

  return (
    <DatePicker
      dateFormat={dateFormat}
      locale={ru}
      placeholderText="dd.mm.yyyy"
      selected={date}
      onChange={onChange}
      customInput={<CustomInput />}
    />
  )
}

// this is a workaround to prevent refs error
class ReadonlyInput extends Component {
  render() {
    return (
      <Input
        {...this.props}
        placeholder="dd.mm.yyyy"
      />
    )
  }
}
