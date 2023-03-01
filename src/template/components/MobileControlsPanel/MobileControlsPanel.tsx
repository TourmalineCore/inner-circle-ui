import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as IconAnalytics } from '../../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../../assets/icons/icon-analytics-active.svg';
import { ReactComponent as IconBurger } from '../../../assets/icons/icon-burger.svg';
import { ReactComponent as IconCross } from '../../../assets/icons/icon-cross.svg';

function MobileControlsPanel({
  prevPath,
  homePath = '/',
  homePageName = 'Home',
  isToggled,
  onToggleClick = () => {},
}: {
  prevPath?: string | null;
  homePath?: string;
  homePageName?: string;
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
              ? <IconAnalyticsActive />
              : <IconAnalytics />
          }
        </div>
        <span>{homePageName}</span>
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
