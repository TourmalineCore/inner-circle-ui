import { ReactComponent as IconPersonalProfile } from '../../../../../assets/icons/personal-profile.svg';

function SidebarInfoBox({
  name = 'Nameless User',
}: {
  name?: string;
}) {
  return (
    <div className="sidebar-infobox">
      <div className="sidebar-infobox__image">
        <IconPersonalProfile />
      </div>
      <div className="sidebar-infobox__col">
        <div className="sidebar-infobox__name">{name}</div>
      </div>
    </div>
  );
}

export default SidebarInfoBox;
