import IconProfile from '../../assets/icons/icon-profile.svg?react'
import IconProfileActive from '../../assets/icons/icon-profile-active.svg?react'

import { ProfilePage } from './ProfilePage'

export const profileRoutes = [
  {
    path: `/profile`,
    breadcrumb: `Profile`,
    Component: ProfilePage,
  },
]

export const profileSidebarRoutes = [
  {
    path: `/profile`,
    label: `Profile`,
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
  },
]
