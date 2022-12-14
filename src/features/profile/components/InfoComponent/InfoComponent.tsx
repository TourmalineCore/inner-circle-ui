import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './InfoComponent.css';

function InfoComponent({ value, icon }: { value: string, icon?:string | IconDefinition }) {
  return (
    <div className="info-component">
      <div className="info-component__icon">
        {typeof icon === 'string'
          ? (
            <img src={icon as string} height="35px" alt={value} />
          )
          : (
            <FontAwesomeIcon size={'xl' as SizeProp} icon={icon as IconProp} />
          )}
      </div>
      <div className="info-component__value">{value}</div>
    </div>
  );
}

export default InfoComponent;
