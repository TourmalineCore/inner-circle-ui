import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import { ReactNode } from 'react';
import { profileModes } from './profileModes';

type AvailableActionsProps = {
  key?: string;
  text?: string;
  tabLabel?: string;
  icon?: ReactNode;
  onClick?: () => unknown;
  disabled?: boolean;
};

type ProfileTabsProps = {
  id?: string;
  link?: string;
  tabLabel?: string;
  tabIcon?: ReactNode;
  component: () => JSX.Element;
  editable?: boolean;
  showActions?: boolean;
};

function getProfileAvailableActionButtons({
  profileTab,
  profileMode,
  setEditMode,
  exitWithoutSave,
  saveDataAndExit,
  saveDisabled,
}: {
  profileTab: ProfileTabsProps;
  profileMode: string;
  setEditMode: () => unknown;
  exitWithoutSave: () => unknown;
  saveDataAndExit: () => unknown;
  saveDisabled: boolean;
}) {
  const availableActions: AvailableActionsProps[] = [];

  if (!profileTab.editable) {
    return availableActions;
  }

  if (profileMode === profileModes.VIEW) {
    availableActions.push({
      key: 'EDIT',
      icon: <FontAwesomeIcon className="fa-icon" icon={faEdit} />,
      text: `Edit ${profileTab.tabLabel}`,
      onClick: setEditMode,
    });
  }

  if (profileMode === profileModes.EDIT) {
    availableActions.push({
      key: 'CANCEL',
      icon: <FontAwesomeIcon className="fa-icon" icon={faTimes} color="#ec250d" />,
      text: 'Cancel',
      onClick: exitWithoutSave,
    });

    availableActions.push({
      key: 'SUBMIT',
      icon: <FontAwesomeIcon className="fa-icon" icon={faCheck} color="#00bf9a" />,
      text: 'Save',
      onClick: saveDataAndExit,
      disabled: saveDisabled,
    });
  }

  return availableActions;
}

export default getProfileAvailableActionButtons;
