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
import SidebarSettingsControl from './components/Sidebar/components/SidebarSettings/SidebarSettingsControl';
import Sidebar from './components/Sidebar/Sidebar';
import TemplatePages from './components/TemplatePages/TemplatePages';

import { useSidebarRoutes } from './hooks/useSidebarRoutes';

import { getAdminRoutes, getSidebarRoutes } from '../routes/adminRoutes';
import RoutesStateContext from '../routes/state/RoutesStateContext';

function Template() {
  const location = useLocation();

  const routesStateContext = useContext(RoutesStateContext);

  const parsedSidebarRoutes = useSidebarRoutes(getSidebarRoutes(routesStateContext.accessPermissions), location);
  const adminRoutes = getAdminRoutes(routesStateContext.accessPermissions);

  const breadcrumbs = useBreadcrumbs(adminRoutes as BreadcrumbsRoute<string>[], { excludePaths: ['/'] });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);

  const prevBreadcrumbPath = breadcrumbs.length > 1
    ? breadcrumbs[breadcrumbs.length - 2].key
    : null;

  return (
    <>
      <div
        className={clsx('template', {
          'template--sidebar-collapsed': isSidebarCollapsed,
        })}
      >
        <div className="template__sidebar">
          <Sidebar
            infoBoxData={{}}
            menuData={parsedSidebarRoutes}
            isCollapsed={isSidebarCollapsed}
            isMobileOpened={isMobileSidebarOpened}
            onCollapseToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onOverlayClick={() => setIsMobileSidebarOpened(false)}
            onMenuLinkClick={() => setIsMobileSidebarOpened(false)}
            renderBottomComponent={(props : { portalTarget: HTMLDivElement | null }) => (
              <>
                <SidebarSettingsControl portalTarget={props.portalTarget} />

                <SidebarItem
                  icon={<IconLogout />}
                  iconActive={<IconLogoutActive />}
                  isWindowRedirectNecessary
                  path="/auth/logout"
                  label="Sign Out"
                />
              </>
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
