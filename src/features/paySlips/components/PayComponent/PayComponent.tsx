import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import './PayComponent.css';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

function PayComponent({ name, date } : { name : string, date: string }) {
  return (
    <div className="pay-component">
      <div className="component-name">{name}</div>
      <div className="component-date">{date}</div>
      <div className="component-download">
        <FontAwesomeIcon size={'xl' as SizeProp} icon={faFileDownload as IconProp} />
      </div>
    </div>
  );
}

export default PayComponent;
