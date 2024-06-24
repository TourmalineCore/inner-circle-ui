import { ReactComponent as IconPersonalProfile } from '../../../../../assets/icons/icon-personal-profile.svg';

export function SidebarInfoBox({
  name,
}: {
  name: string;
}) {
  return (
    <div className="sidebar-infobox">
      <div className="sidebar-infobox__image">
        <IconPersonalProfile />
      </div>
      <div className="sidebar-infobox__col" data-cy="sidebar-infobox">
        <div className="sidebar-infobox__name">{capitalize(name)}</div>
      </div>
    </div>
  );

  function capitalize(word: string) {
    // TODO: it’s necessary, but if something breaks, fix it here
    if (word.substring(0, 3) === 'ank') {
      const firstName = word[0].toUpperCase();
      const lastName = word.substring(2);
      return `${lastName[0].toUpperCase() + word.slice(3)} ${firstName}.`;
    }
    if (word.substring(0, 3) === 'snl') {
      const firstName = word[0].toUpperCase();
      const lastName = word.substring(2);
      return `${lastName[0].toUpperCase() + word.slice(3)} ${firstName}.`;
    }
    if (word.substring(0, 2) === 'yu') {
      const firstName = word[0].toUpperCase();
      const lastName = word.substring(2);
      return `${lastName[0].toUpperCase() + word.slice(3)} ${firstName}.`;
    }
    const firstName = word[0].toUpperCase();
    const lastName = word.substring(1);
    return `${lastName[0].toUpperCase() + word.slice(2)} ${firstName}.`;
  }
}
