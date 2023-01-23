import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactLink from '../../../../components/ContactLink/ContactLink';
import './InfoComponent.scss';

function InfoComponent({ value, icon, link }: { value: string | null, icon?:string | IconDefinition, link: string | null }) {
  const linkValidity = link || undefined;
  return (
    <div className="info-component">
      <div className="info-component__icon">
        {typeof icon === 'string'
          ? (
            <img src={icon as string} height="35px" alt="" />
          )
          : (
            <FontAwesomeIcon size={'xl' as SizeProp} icon={icon as IconProp} />
          )}
      </div>
      <div className="info-component__value">
        <ContactLink contact={value} link={linkValidity} />
      </div>
    </div>
  );
}

export default InfoComponent;
