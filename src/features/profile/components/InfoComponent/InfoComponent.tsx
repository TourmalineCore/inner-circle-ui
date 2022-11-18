import './InfoComponent.css';
import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

function InfoComponent({
  value,
  name,
  label,
  isRedact = false,
  onChange,
  faIcon,
  icon,
  text,
} :
{ value: string,
  name?: string
  label? : string,
  isRedact?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  faIcon? : IconDefinition,
  icon? : string
  text? : string
}) {
  return (
    <div className="info-component">
      {isRedact
        ? (
          <Input
            className="info-component-input"
            value={value}
            label={label}
            onChange={onChange}
            name={name}
          />
        ) : (
          <div className="info-component-label">
            {faIcon
              ? (
                <div className="component-label-faicon">
                  <FontAwesomeIcon size={'xl' as SizeProp} icon={faIcon as IconProp} />
                </div>
              ) : (
                <div className={icon ? `component-label-icon ${icon}` : undefined} />
              )}

            <div className={`component-label-value ${text}`}>{value}</div>
          </div>
        )}
    </div>
  );
}

export default InfoComponent;
