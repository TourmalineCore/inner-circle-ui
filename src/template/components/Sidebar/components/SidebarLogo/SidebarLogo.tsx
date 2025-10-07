import { Link } from 'react-router-dom'

import logoCore from '../../../../../assets/img/logo-core.png'
import logoText from '../../../../../assets/img/logo-text.png'

export function SidebarLogo() {
  return (
    <Link to="/employees"
      className="sidebar-logo">
      <img src={logoCore}
        alt="logo"
        className="sidebar-logo__image" />
      <div className="sidebar-logo__text-container">
        <img src={logoText}
          alt="logo-text"
          className="sidebar-logo__text" />
      </div>
    </Link>

  )
}
