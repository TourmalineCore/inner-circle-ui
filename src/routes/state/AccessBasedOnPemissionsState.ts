import { makeAutoObservable } from 'mobx';

export enum Permission {
  ViewPersonalProfile = 'ViewPersonalProfile',
  ViewContacts = 'ViewContacts',
  ViewSalaryAndDocumentsData = 'ViewSalaryAndDocumentsData',
  EditFullEmployeesData = 'EditFullEmployeesData',
  AccessAnalyticalForecastsPage = 'AccessAnalyticalForecastsPage',
  ViewAccounts = 'ViewAccounts',
  ManageAccounts = 'ManageAccounts',
  ViewRoles = 'ViewRoles',
  ManageRoles = 'ManageRoles',
  CanRequestCompensations = 'CanRequestCompensations',
  CanManageCompensations = 'CanManageCompensations',
  CanManageDocuments = 'CanManageDocuments',
  CanManageTenants = 'CanManageTenants',
  IsTenantsHardDeleteAllowed = 'IsTenantsHardDeleteAllowed',
  IsCompensationsHardDeleteAllowed = 'IsCompensationsHardDeleteAllowed',
}

class AccessBasedOnPemissionsState {
  private _accessPermissions = new Map<keyof typeof Permission, boolean>();

  constructor() {
    makeAutoObservable(this);
  }

  get accessPermissions() {
    return this._accessPermissions;
  }

  checkPermissionFromToken(permissionsFromToken: Array<keyof typeof Permission>) {
    const permissionsList = Object.keys(Permission) as Array<keyof typeof Permission>;

    permissionsList.forEach((item) => {
      if (permissionsFromToken.includes(item)) {
        this._accessPermissions.set(item, true);

        return item;
      }

      return item;
    });
  }
}
export default AccessBasedOnPemissionsState;
