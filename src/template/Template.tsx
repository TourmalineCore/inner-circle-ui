import { useState } from 'react';
import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import clsx from 'clsx';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import SidebarItem from './components/Sidebar/components/SidebarItem/SidebarItem';
import SidebarSettingsControl from './components/Sidebar/components/SidebarSettings/SidebarSettingsControl';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import MobileControlsPanel from './components/MobileControlsPanel/MobileControlsPanel';
import Copyright from './components/Copyright/Copyright';
import TemplatePages from './components/TemplatePages/TemplatePages';

import { useSidebarRoutes } from './hooks/useSidebarRoutes';

import { adminRoutes, sidebarRoutes } from '../routes/adminRoutes';

function Template() {
  const location = useLocation();

  const parsedSidebarRoutes = useSidebarRoutes(sidebarRoutes, location);

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
                  icon={faSignOutAlt}
                  path="/logout"
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
        prevPath={prevBreadcrumbPath}
        isToggled={isMobileSidebarOpened}
        onToggleClick={() => setIsMobileSidebarOpened(!isMobileSidebarOpened)}
      />
    </>
  );
}

export default Template;
