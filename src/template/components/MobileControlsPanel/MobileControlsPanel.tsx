import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as IconAnalitics } from '../../../assets/icons/analytics.svg';
import { ReactComponent as IconAnaliticsActive } from '../../../assets/icons/analytics-active.svg';
import { ReactComponent as IconBurger } from '../../../assets/icons/burger.svg';
import { ReactComponent as IconCross } from '../../../assets/icons/cross.svg';

function MobileControlsPanel({
  prevPath,
  homePath = '/',
  nameHomePage = 'Home',
  isToggled,
  onToggleClick = () => {},
}: {
  prevPath?: string | null;
  homePath?: string;
  nameHomePage?: string;
  isToggled: boolean;
  onToggleClick?: () => unknown;
}) {
  const location = useLocation();

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
        <div className="mobile-controls-panel__icon-location">
          {
            location.pathname === homePath
              ? <IconAnaliticsActive />
              : <IconAnalitics />
          }
        </div>
        <span>{nameHomePage}</span>
      </Link>

      <button
        type="button"
        className="mobile-controls-panel__item"
        onClick={onToggleClick}
      >
        <div className="mobile-controls-panel__item-icon">
          {!isToggled ? <IconBurger /> : <IconCross />}
        </div>
      </button>
    </div>
  );
}

export default MobileControlsPanel;
