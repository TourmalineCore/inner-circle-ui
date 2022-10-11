import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ProfileNavItems } from '../../types/Profile';

function ProfileNav({
  tabs,
}: {
  tabs: ProfileNavItems[];
}) {
  return (
    <div className="profile-nav">
      <ul className="profile-nav__list">
        {
          tabs.map((tab) => (
            <ProfileNavItem {...tab} />
          ))
        }
      </ul>
    </div>
  );
}

function ProfileNavItem({
  text,
  icon,
  href,
  onClick,
  active,
}: ProfileNavItems) {
  return (
    <li className="profilenav__item">
      <Link
        to={href}
        className={clsx('profile-nav__button', {
          'profile-nav__button--active': active,
        })}
        onClick={onClick}
      >
        <span className="profile-nav__icon">
          {icon}
        </span>
        <span className="profile-nav__button-text">
          {text}
        </span>
      </Link>
    </li>
  );
}

export default ProfileNav;
