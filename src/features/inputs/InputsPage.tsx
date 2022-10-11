import { ChangeEvent, useState } from 'react';
import {
  Button, Input, NativeSelect, CheckField,
} from '@tourmalinecore/react-tc-ui-kit';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import CustomHeading from '../../components/CustomHeading/CustomHeading';

const checkFieldsData = {
  1: 'label-1',
  2: 'label-2',
};

function InputsPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set());
  const [selectedRadio, setSelectedRadio] = useState('');

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Form Controls Demo</DefaultCardHeader>
      )}
    >
      <CustomHeading>Buttons:</CustomHeading>

      <Button
        style={{
          marginRight: 16,
          marginBottom: 16,
        }}
      >
        Default
      </Button>

      <Button
        style={{
          marginRight: 16,
          marginBottom: 16,
        }}
        color="primary"
      >
        Apply
      </Button>

      <Button
        style={{
          marginRight: 16,
          marginBottom: 16,
        }}
        color="danger"
      >
        Cancel
      </Button>

      <Button
        style={{
          marginRight: 16,
          marginBottom: 16,
        }}
        color="secondary"
      >
        Secondary
      </Button>

      <CustomHeading>Input:</CustomHeading>

      <Input
        style={{ maxWidth: 300 }}
        label="Input label"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
      />

      <CustomHeading>Native Select:</CustomHeading>

      <NativeSelect
        style={{ maxWidth: 300 }}
        value={selectedValue}
        options={[{ label: 'option1', value: 1 }, { label: 'option2', value: 2 }]}
        onChange={(option: { label: string; value: number }) => {
          setSelectedValue(option.value);
        }}
      />

      <CustomHeading>Checkboxes:</CustomHeading>
      {Object.entries(checkFieldsData).map(([value, label]) => (
        <CheckField
          key={value}
          style={{
            marginBottom: 16,
          }}
          label={label}
          checked={selectedCheckboxes.has(value)}
          onChange={() => {
            setSelectedCheckboxes((prevSelected) => {
              if (prevSelected.has(value)) {
                return new Set([...prevSelected].filter((x) => x !== value));
              }

              return new Set([...prevSelected, value]);
            });
          }}
        />
      ))}

      <CustomHeading>Radiobuttons:</CustomHeading>

      {Object.entries(checkFieldsData).map(([value, label]) => (
        <CheckField
          key={value}
          style={{
            marginBottom: 16,
          }}
          viewType="radio"
          label={label}
          checked={value === selectedRadio}
          onChange={() => {
            setSelectedRadio(value);
          }}
        />
      ))}
    </ContentCard>
  );
}

export default InputsPage;
