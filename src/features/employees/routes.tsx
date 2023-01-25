import { ReactComponent as IconEmployees } from '../../assets/icons/employees.svg';
import { ReactComponent as IconEmployeesActive } from '../../assets/icons/employees-active.svg';

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
    path: '/employees/:id',
    breadcrumb: 'Edit contact details',
    Component: EmployeeEditContactPage,
  },
  {
    path: '/employees/:id',
    breadcrumb: 'Edit salary data',
    Component: EmployeeEditSalaryPage,
  },
];

export const employeesSidebarRoutes = [
  {
    path: '/employees',
    label: 'Employees',
    icon: <IconEmployees />,
    iconActive: <IconEmployeesActive />,
  },
];
