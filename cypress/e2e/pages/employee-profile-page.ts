export class EmployeeProfilePage {
  static visit() {
    cy.visit(`/employees/profile`)
  }

  static updateEmployeeProfile() {      
    cy
      .getByData(`worker-time-input`)
      .type(`Work when the e2e tests are running`)
    
    cy
      .getByData(`personal-email-input`)
      .type(`test@test.com`)
          
    cy
      .getByData(`github-input`)
      .type(`test`)
    
    cy
      .getByData(`gitlab-input`)
      .type(`test`)
    
    cy
      .getByData(`save-button`)
      .click()
  }
}
