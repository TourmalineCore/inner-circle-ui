import { EmployeeEditContent } from "./EmployeeEditContent"
import { EmployeeEditState } from "./state/EmployeeEditState"
import { EmployeeEditStateContext } from "./state/EmployeeEditStateContext"

export const VIEWPORTS = [
  { 
    width: 375,
    height: 983,
  },
  {
    width: 768,
    height: 960,
  },
  {
    width: 1024,
    height: 707,
  },
  {
    width: 1366,
    height: 707,
  },
  {
    width: 1920,
    height: 1008,
  },
]

describe(`Employee Edit Snapshot test`, () => {  
  it(`Take the snapshot of a result`, () => {
    VIEWPORTS.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)

      cy.wrap(
        Cypress.automation(`remote:debugger:protocol`, {
          command: `Emulation.setDeviceMetricsOverride`,
          params: {
            width: viewport.width,
            height: viewport.height,
            deviceScaleFactor: 1,
            mobile: false,
          },
        }),
      )

      mountComponent()

      cy
        .window()
        .then((win) => win.document.fonts.ready)

      cy
        .document()
        .its(`fonts.status`)
        .should(`equal`, `loaded`)

      cy
        .getByData(`employee-edit`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })  
})

function mountComponent() {
  const employeeEditState = new EmployeeEditState()
  employeeEditState.initialize({
    loadedEmployee: {
      fullName: `Test Test Test`,
      corporateEmail: `test@tourmalinecore.com`,
      specialization: [],
      birthDate: null,
      workedTime: null,
      phone: null,
      personalEmail: null,
      gitHub: null,
      gitLab: null,
    },
  })

  cy
    .mount(
      <EmployeeEditStateContext.Provider value={employeeEditState}>
        <EmployeeEditContent updateEmployeesAsync={() => {}}/>
      </EmployeeEditStateContext.Provider>,
    )
}
