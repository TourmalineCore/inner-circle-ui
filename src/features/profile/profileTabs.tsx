import { ReactNode } from 'react';
import { faClipboardList, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const profileSections: {
  [key: string]: string;
} = {
  SUMMARY: 'summary',
  PERSONAL: 'personal',
};

export const profileTabs: {
  [key: string]: {
    id?: string;
    link: string;
    tabLabel?: string;
    tabIcon?: ReactNode;
    component: () => JSX.Element;
    editable?: boolean;
    showActions?: boolean;
  };
} = {
  [profileSections.SUMMARY]: {
    id: profileSections.SUMMARY,
    link: `/profile/${profileSections.SUMMARY}`,
    tabLabel: profileSections.SUMMARY,
    tabIcon: <FontAwesomeIcon icon={faUser} className="fa-icon" />,
    component: () => (<span>summary tab</span>),
    editable: true,
    showActions: true,
  },
  [profileSections.PERSONAL]: {
    id: profileSections.PERSONAL,
    link: `/profile/${profileSections.PERSONAL}`,
    tabLabel: profileSections.PERSONAL,
    tabIcon: <FontAwesomeIcon icon={faClipboardList} className="fa-icon" />,
    component: () => (<span>personal tab</span>),
    editable: false,
  },
};
