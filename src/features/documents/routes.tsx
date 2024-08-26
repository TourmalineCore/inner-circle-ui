import { ReactComponent as IconDocuments } from '../../assets/icons/icon-documents.svg';
import { ReactComponent as IconDocumentsActive } from '../../assets/icons/icon-documents-active.svg';

export const documentsSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/documents',
    label: 'Documents',
    icon: <IconDocuments />,
    iconActive: <IconDocumentsActive />,
  },
];
