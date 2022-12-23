import { faUsers } from '@fortawesome/free-solid-svg-icons';

import EmployeesPage from './EmployeesPage';
import EmployeeAddPage from './components/EmployeeAddPage/EmployeeAddPage';
import EmployeeEditContactPage from './components/EmployeeEditContactPage/EmployeeEditContactPage';
import EmployeeEditSalaryPage from './components/EmployeeEditSalaryPage/EmployeeEditSalaryPage';

export const employeesRoutes = [
  {
    path: '/employees',
    breadcrumb: 'Employees',
    Component: EmployeesPage,
  },
  {
    path: '/employees/add',
    breadcrumb: 'Add an employee',
    Component: EmployeeAddPage,
  },
  {
    path: '/employees/edit-contact/:id',
    breadcrumb: 'Edit contact details',
    Component: EmployeeEditContactPage,
  },
  {
    path: '/employees/edit-salary/:id',
    breadcrumb: 'Edit salary data',
    Component: EmployeeEditSalaryPage,
  },
];

export const employeesSidebarRoutes = [
  {
    path: '/employees',
    label: 'Employees',
    icon: faUsers,
  },
];
