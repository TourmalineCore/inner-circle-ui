import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faHome, faBars, faTimes,
} from '@fortawesome/free-solid-svg-icons';

function MobileControlsPanel({
  prevPath,
  homePath = '/',
  isToggled,
  onToggleClick = () => {},
}: {
  prevPath?: string | null;
  homePath?: string;
  isToggled: boolean;
  onToggleClick?: () => unknown;
}) {
  return (
    <div className="mobile-controls-panel">
      {prevPath ? (
        <Link to={prevPath} className="mobile-controls-panel__item">
          <FontAwesomeIcon className="mobile-controls-panel__item-icon" icon={faArrowLeft} />
        </Link>
      ) : (
        <div className="mobile-controls-panel__item" />
      )}

      <Link to={homePath} className="mobile-controls-panel__item">
        <FontAwesomeIcon className="mobile-controls-panel__item-icon" icon={faHome} />
      </Link>

      <button
        type="button"
        className="mobile-controls-panel__item"
        onClick={onToggleClick}
      >
        <FontAwesomeIcon
          className="mobile-controls-panel__item-icon"
          icon={isToggled ? faTimes : faBars}
        />
      </button>
    </div>
  );
}

export default MobileControlsPanel;
