import { ChangeEvent, ReactNode, useContext } from 'react';
import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { ProfileStateContext } from '../../../../state/ProfileStateContext';
import { InfoCard } from '../../../components/info-card/InfoCard';

export function InfoEditableCard({
  value,
  icon,
  label,
  onChange,
} : {
  label: string;
  value: ReactNode,
  icon: ReactNode,
  onChange: (event: ChangeEvent<HTMLInputElement>) => unknown,
}) {
  const profileState = useContext(ProfileStateContext);

  return (
    <InfoCard
      isHaveValue={profileState.isEdit || !!value}
      value={
        !profileState.isEdit
          ? value
          : (
            <Input
              value={value || ''}
              maxLength={40}
              onChange={onChange}
            />
          )
      }
      label={label}
      icon={icon}
    />
  );
}
