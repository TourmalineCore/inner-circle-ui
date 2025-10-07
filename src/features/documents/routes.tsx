import IconDocuments from '../../assets/icons/icon-documents.svg?react'
import IconDocumentsActive from '../../assets/icons/icon-documents-active.svg?react'

export const documentsSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `/documents`,
    label: `Documents`,
    icon: <IconDocuments />,
    iconActive: <IconDocumentsActive />,
  },
]
