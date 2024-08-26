import clsx from 'clsx';
import { memo, useContext, useState } from 'react';
import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import { useLocation } from 'react-router-dom';
import { ReactComponent as IconLogoutActive } from '../assets/icons/icon-logout-active.svg';
import { ReactComponent as IconLogout } from '../assets/icons/icon-logout.svg';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Copyright from './components/Copyright/Copyright';
import MobileControlsPanel from './components/MobileControlsPanel/MobileControlsPanel';
import SidebarItem from './components/Sidebar/components/SidebarItem/SidebarItem';
import Sidebar from './components/Sidebar/Sidebar';
import TemplatePages from './components/TemplatePages/TemplatePages';
import { useSidebarRoutes } from './hooks/useSidebarRoutes';
import { getAdminRoutes, getSidebarRoutes } from '../routes/adminRoutes';
import AccessBasedOnPemissionsStateContext from '../routes/state/AccessBasedOnPemissionsStateContext';
import { parseJwt } from '../features/employees/utils/utilsForPermissions';
import { authService } from '../common/authService';

function Template() {
  const location = useLocation();

  const accessBasedOnPemissionsState = useContext(AccessBasedOnPemissionsStateContext);

  const parsedSidebarRoutes = useSidebarRoutes(getSidebarRoutes(accessBasedOnPemissionsState.accessPermissions), location);
  const adminRoutes = getAdminRoutes(accessBasedOnPemissionsState.accessPermissions);

  const breadcrumbs = useBreadcrumbs(adminRoutes as BreadcrumbsRoute<string>[], { excludePaths: ['/'] });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);

  const prevBreadcrumbPath = breadcrumbs.length > 1
    ? breadcrumbs[breadcrumbs.length - 2].key
    : null;

  // @ts-ignore
  const [token] = useContext(authService.AuthContext);
  const infoBoxDataName = parseJwt(token).corporateEmail.split('@')[0];

  return (
    <>
      <div
        className={clsx('template', {
          'template--sidebar-collapsed': isSidebarCollapsed,
        })}
      >
        <div className="template__sidebar">
          <Sidebar
            infoBoxData={{ name: infoBoxDataName }}
            menuData={parsedSidebarRoutes}
            isCollapsed={isSidebarCollapsed}
            isMobileOpened={isMobileSidebarOpened}
            onCollapseToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onOverlayClick={() => setIsMobileSidebarOpened(false)}
            onMenuLinkClick={() => setIsMobileSidebarOpened(false)}
            renderBottomComponent={() => (

              <SidebarItem
                className="template__logout"
                icon={<IconLogout />}
                iconActive={<IconLogoutActive />}
                isWindowRedirectNecessary
                path="/auth/logout"
                label="LogOut"
              />
            )}
          />
        </div>

        <div className="template__main">
          <div className="template__panel template__panel--top">
            <Breadcrumbs list={breadcrumbs} />
          </div>

          <div className="template__content">
            <TemplatePages routes={adminRoutes} />
          </div>

          <div className="template__panel template__panel--bottom">
            <Copyright />
          </div>
        </div>
      </div>

      <MobileControlsPanel
        homePath="/analytics"
        homePageName="Analytics"
        prevPath={prevBreadcrumbPath}
        isToggled={isMobileSidebarOpened}
        onToggleClick={() => setIsMobileSidebarOpened(!isMobileSidebarOpened)}
      />
    </>
  );
}

export default memo(Template);
