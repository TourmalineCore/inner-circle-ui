import {
  useState, useRef, MutableRefObject, ChangeEvent, ElementType, ReactNode,
} from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import SidebarTooltip from './components/SidebarTooltip/SidebarTooltip';
import { SidebarProps } from '../../../../types/Template';

function SidebarItem({
  tagName = 'div',
  itemRef,
  sidebarContainerRef,
  className,
  icon,
  iconActive,
  iconMini,
  label,
  windowPath,
  path,
  isActive,
  counter,
  routes = [],
  isNestedRoutesCollapsed = true,
  isSidebarCollapsed,
  onItemClick = () => {},
  onNestedBlockCollapseToggle = () => {},
}: {
  tagName?: ElementType;
  itemRef?: MutableRefObject<HTMLElement | null>;
  sidebarContainerRef?: MutableRefObject<HTMLElement | null>;
  className?: string;
  icon?: ReactNode;
  iconActive?: (() => JSX.Element) | ReactNode;
  iconMini?: ReactNode;
  label: string;
  windowPath?: string;
  path?: string;
  isActive?: boolean;
  counter?: string;
  routes?: SidebarProps[];
  isNestedRoutesCollapsed?: boolean;
  isSidebarCollapsed?: boolean;
  onItemClick?: () => unknown;
  onNestedBlockCollapseToggle?: () => unknown;
}) {
  const hasNestedElements = routes && !!routes.length;

  const currentItemRef = itemRef || useRef<HTMLElement>(null);

  const [nestedBlockCollapsed, setNestedBlockCollapsed] = useState(isNestedRoutesCollapsed);
  const [isHovered, setIsHovered] = useState(false);

  const TagName = getProperTagName();

  const linkProps = {
    to: path,
  };

  const windowLinkProps = {
    href: windowPath,
  };

  return (
    <>
      <TagName
        ref={currentItemRef}
        className={clsx('sidebar-item', className, {
          'sidebar-item--has-nested': hasNestedElements,
          'sidebar-item--active': isActive,
        })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...linkProps}
        {...windowLinkProps}
      >
        {icon && (
          <span className="sidebar-item__icon-container">
            {!isActive
              ? (
                <div className="sidebar-item__icon">
                  {icon }
                </div>
              )
              : (
                <div className="sidebar-item__icon">
                  {iconActive
                    ? (
                      <span>
                        {iconActive }
                      </span>
                    )
                    : (
                      <span>
                        {icon }
                      </span>
                    )}
                </div>
              )}

            {!!counter && (
              <span className="sidebar-item__counter">{counter}</span>
            )}
          </span>
        )}

        {iconMini && (
          <span className="sidebar-item__mini-container">
            { iconMini }
          </span>
        )}

        <span className="sidebar-item__box">
          <span className="sidebar-item__content">{label}</span>

          {hasNestedElements && (
            <FontAwesomeIcon
              fixedWidth
              icon={nestedBlockCollapsed ? faChevronDown : faChevronUp}
              className="sidebar-item__drop-arrow"
            />
          )}
        </span>
      </TagName>

      {hasNestedElements && !nestedBlockCollapsed && (
        <div className="sidebar-item__nested">
          {routes.map((nestedRouteProps) => (
            <SidebarItem
              {...nestedRouteProps}
              key={nestedRouteProps.path}
              itemRef={itemRef}
              sidebarContainerRef={sidebarContainerRef}
              isSidebarCollapsed={isSidebarCollapsed}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}

      {isSidebarCollapsed && isHovered && !!sidebarContainerRef && (
        ReactDOM.createPortal(
          <SidebarTooltip
            sidebarItemRef={currentItemRef}
            sidebarContainerRef={sidebarContainerRef}
            content={label}
          />,
          sidebarContainerRef.current!,
        )
      )}
    </>
  );

  function handleClick(event: ChangeEvent<HTMLElement>) {
    if (hasNestedElements) {
      setNestedBlockCollapsed(!nestedBlockCollapsed);
      onNestedBlockCollapseToggle();

      event.preventDefault();

      return;
    }

    onItemClick();
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function getProperTagName() {
    let resultTagName = tagName;

    if (path) {
      resultTagName = Link;
    }

    if (windowPath) {
      resultTagName = 'a';
    }

    if (hasNestedElements) {
      resultTagName = 'div';
    }

    return resultTagName;
  }
}

export default SidebarItem;
