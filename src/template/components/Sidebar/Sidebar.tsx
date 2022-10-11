import {
  useRef, useEffect, CSSProperties, ReactNode, MouseEvent,
} from 'react';
import clsx from 'clsx';

import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

import SidebarInfoBox from './components/SidebarInfoBox/SidebarInfoBox';
import SidebarItem from './components/SidebarItem/SidebarItem';

import { useSidebarSwipe } from '../../hooks/useSidebarSwipe';

import { SidebarProps } from '../../types/Template';

const OPENED_DOCUMENT_CLASSNAME = 'is-sidebar-mobile-opened';

function Sidebar({
  style = {},
  className,
  isMobileOpened = false,
  isCollapsed = false,
  menuData = [],
  infoBoxData,
  renderBottomComponent,
  renderTopComponent,
  onCollapseToggle = () => {},
  onOverlayClick = () => {},
  onMenuLinkClick = () => {},
}: {
  style?: CSSProperties;
  className?: string;
  isMobileOpened?: boolean;
  isCollapsed?: boolean;
  menuData: SidebarProps[];
  infoBoxData: {
    photoUrl?: string;
    name?: string;
    email?: string;
  };
  renderBottomComponent?: ({ portalTarget }: { portalTarget: HTMLDivElement | null }) => JSX.Element;
  renderTopComponent?: ReactNode;
  onCollapseToggle?: () => unknown;
  onOverlayClick?: () => unknown;
  onMenuLinkClick?: () => unknown;
}) {
  const sidebarContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    toggleDocumentClassnameOnOpen(isMobileOpened);
  }, [isMobileOpened]);

  useSidebarSwipe({
    sidebarContainerRef,
    isMobileOpened,
    onClose: onOverlayClick,
  });

  return (
    <div
      ref={sidebarContainerRef}
      style={style}
      className={clsx('sidebar', className, {
        'sidebar--collapsed': isCollapsed,
        'sidebar--mobile-opened': isMobileOpened,
      })}
    >
      <div className="sidebar__overlay" role="presentation" onClick={onOverlayClick} />

      <div className="sidebar__inner">
        <div className="sidebar__top">
          {infoBoxData && (
            <SidebarInfoBox {...infoBoxData} />
          )}

          {renderTopComponent && (
            <div className="sidebar__top-component">
              {renderTopComponent}
            </div>
          )}

          <button
            type="button"
            className="sidebar__toggler"
            onClick={handleCollapseToggleClick}
          >
            <SidebarItem
              label="Collapse menu"
              icon={isCollapsed ? faAngleDoubleRight : faAngleDoubleLeft}
            />
          </button>
        </div>

        <div className="sidebar__navlist">
          {renderMenu()}
        </div>

        {renderBottomComponent && (
          <div className="sidebar__bottom">
            {renderBottomComponent({
              portalTarget: sidebarContainerRef.current,
            })}
          </div>
        )}
      </div>
    </div>
  );

  function handleCollapseToggleClick(event: MouseEvent<HTMLButtonElement>) {
    onCollapseToggle();
    event.currentTarget.blur();
  }

  function renderMenu() {
    return (
      <ul className="sidebar__navsection">
        {menuData.map((menuItem) => renderMenuItem(menuItem))}
      </ul>
    );
  }

  function renderMenuItem(item: SidebarProps) {
    return (
      <li key={item.path} className="sidebar__navitem">
        <SidebarItem
          {...item}
          sidebarContainerRef={sidebarContainerRef}
          isSidebarCollapsed={isCollapsed}
          onItemClick={onMenuLinkClick}
        />
      </li>
    );
  }

  function toggleDocumentClassnameOnOpen(isOpened: boolean) {
    if (isOpened) {
      document.documentElement.classList.add(OPENED_DOCUMENT_CLASSNAME);
    } else {
      document.documentElement.classList.remove(OPENED_DOCUMENT_CLASSNAME);
    }
  }
}

export default Sidebar;
