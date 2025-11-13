import { EmployeeProfileContent } from "./EmployeeProfileContent"
import { EmployeeProfileState } from "./state/EmployeeProfileState"
import { EmployeeProfileStateContext } from "./state/EmployeeProfileStateContext"

export const VIEWPORTS = [
  { 
    width: 375,
    height: 1072,
  },
  {
    width: 768,
    height: 960,
  },
  {
    width: 1024,
    height: 704,
  },
  {
    width: 1366,
    height: 696,
  },
  {
    width: 1920,
    height: 1008,
  },
]

describe(`Employee Profile Snapshot test`, () => {  
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
        .getByData(`employee-profile`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })  
})

function mountComponent() {
  const employeeProfileState = new EmployeeProfileState()
  employeeProfileState.initialize({
    loadedEmployeeProfile: {
      id: 1,
      fullName: `Test Test Test`,
      corporateEmail: `test@tourmalinecore.com`,
      specializations: [],
      workerTime: null,
      birthDate: `2000-08-13`,
      phone: null,
      personalEmail: null,
      gitHub: null,
      gitLab: null,
    },
  })

  cy
    .mount(
      <EmployeeProfileStateContext.Provider value={employeeProfileState}>
        <EmployeeProfileContent editEmployeeAsync={() => {}}/>
      </EmployeeProfileStateContext.Provider>,
    )
}
