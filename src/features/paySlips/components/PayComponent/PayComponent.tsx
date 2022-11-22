import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import './PayComponent.css';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

function PayComponent({ id, name, date } : { id?: number, name?: string, date?: string }) {
  return (
    <div className="pay-component">
      <Link to={`${id}`}>
        <div className="component-info">
          <div className="component-name">{name}</div>
          <div className="component-date">{date}</div>
        </div>
      </Link>
      <button formMethod="get" className="component-download" type="button">
        <FontAwesomeIcon size={'2xl' as SizeProp} icon={faFileDownload as IconProp} />
      </button>
    </div>
  );
}

export default PayComponent;
