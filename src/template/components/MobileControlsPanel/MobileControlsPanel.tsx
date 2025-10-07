import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import IconAnalytics from '../../../assets/icons/icon-analytics.svg?react'
import IconAnalyticsActive from '../../../assets/icons/icon-analytics-active.svg?react'
import IconBurger from '../../../assets/icons/icon-burger.svg?react'
import IconCross from '../../../assets/icons/icon-cross.svg?react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export function MobileControlsPanel({
  prevPath,
  homePath = `/`,
  homePageName = `Home`,
  isToggled,
  onToggleClick = () => {},
}: {
  prevPath?: string | null,
  homePath?: string,
  homePageName?: string,
  isToggled: boolean,
  onToggleClick?: () => unknown,
}) {
  const location = useLocation()
 
  return (
    <div className="mobile-controls-panel">
      {prevPath ? (
        <Link to={prevPath}
          className="mobile-controls-panel__item">
          <FontAwesomeIcon className="mobile-controls-panel__item-icon"
            icon={faArrowLeft as IconProp} />
        </Link>
      ) : (
        <div className="mobile-controls-panel__item" />
      )}

      <Link to={homePath}
        className="mobile-controls-panel__item">
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
  )
}