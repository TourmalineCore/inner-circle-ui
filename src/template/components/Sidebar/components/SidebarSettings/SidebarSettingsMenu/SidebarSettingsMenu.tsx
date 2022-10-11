import ThemeColorPicker from '../../../../../../components/ThemeColorPicker/ThemeColorPicker';

function SidebarSettingsMenu() {
  return (
    <div className="sidebar-settings-menu">
      <div className="sidebar-settings-menu__item">
        <div className="sidebar-settings-menu__title">Colors</div>
        <ThemeColorPicker />
      </div>
    </div>
  );
}

export default SidebarSettingsMenu;
