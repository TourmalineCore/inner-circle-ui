import './InfoComponent.css';
import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

function InfoComponent({
  value,
  name,
  label,
  onChange,
  faIcon,
  icon,
} :
{ value: string,
  name?: string
  label? : string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  faIcon? : IconDefinition,
  icon?: string
}) {
  return (
    <div className="component">
      {onChange
        ? (
          <Input
            value={value}
            label={label}
            onChange={onChange}
            name={name}
          />
        ) : (
          <div className="component-info">
            {faIcon
              && (
                <div className="component-info__faicon">
                  <FontAwesomeIcon size={'xl' as SizeProp} icon={faIcon as IconProp} />
                </div>
              )}
            {icon
              && (
                <div className="component-info__icon">
                  <img src={icon} height="35px" alt="icon" />
                </div>
              )}
            <div className="component-info__value">{value}</div>
          </div>
        )}
    </div>
  );
}

export default InfoComponent;
