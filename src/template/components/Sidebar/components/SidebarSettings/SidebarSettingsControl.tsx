import {
  useState, useEffect, useRef,
} from 'react';
import ReactDOM from 'react-dom';

import { ReactComponent as IconSetting } from '../../../../../assets/icons/icon-settings.svg';
import { ReactComponent as IconSettingActive } from '../../../../../assets/icons/icon-settings-active.svg';

import SidebarItem from '../SidebarItem/SidebarItem';
import SidebarSettingsMenu from './SidebarSettingsMenu/SidebarSettingsMenu';

function SidebarSettingsControl({
  portalTarget,
}: {
  portalTarget: HTMLDivElement | null;
}) {
  const [isMenuOpened, setMenuOpened] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (
          !containerRef.current
          || !dropdownRef.current
          || containerRef.current!.contains(event.target as Node)
          || dropdownRef.current!.contains(event.target as Node)
        ) {
          return;
        }

        setMenuOpened(false);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [],
  );

  return (
    <>
      <SidebarItem
        itemRef={containerRef}
        tagName="button"
        className="sidebar-settings-control"
        icon={<IconSetting />}
        iconActive={<IconSettingActive />}
        label="Settings"
        onItemClick={() => setMenuOpened(!isMenuOpened)}
      />

      {isMenuOpened && ReactDOM.createPortal(
        <div ref={dropdownRef} className="sidebar-settings-control__dropdown">
          <SidebarSettingsMenu />
        </div>,
        portalTarget!,
      )}
    </>
  );
}

export default SidebarSettingsControl;
