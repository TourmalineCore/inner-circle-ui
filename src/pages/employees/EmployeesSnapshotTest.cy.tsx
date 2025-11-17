import { MemoryRouter } from "react-router-dom"
import { EmployeesStateContext } from "./state/EmployeesStateContext"
import { EmployeesContent } from "./EmployeesContent"
import { EmployeesState } from "./state/EmployeesState"

export const VIEWPORTS = [
  {
    width: 375,
    height: 2080,
  },
  {
    width: 768,
    height: 1156,
  },
  {
    width: 1024,
    height: 1228,
  },
  {
    width: 1366,
    height: 1076,
  },
  {
    width: 1920,
    height: 1076,
  },
]

describe(`Employees Page Snapshot test`, () => {
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
        .getByData(`employees`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent() {
  const employeesState = new EmployeesState()
  
  employeesState.initialize({
    employees: [
      {
        employeeId: 1,
        fullName: `Test Test Test`,
        corporateEmail: `test@tourmalinecore.com`,
        personalEmail: `test_test@mail.ru`,
        phone: `+79999999999`,
        gitHub: null,
        gitLab: null,
        isBlankEmployee: false,
        isCurrentEmployee: true,
        birthDate: `2000-12-12`,
        specializations: [
          2,
          3,
        ],
        workerTime: `Понедельник с 10:00 до 19:00, Вторник с 10:00 до 19:00, Среда с 10:00 до 19:00, Четверг с 10:00 до 20:00, Пятница с 10:00 до 19:00. Обед с 14:00 до 15:00`,
      },
      {
        employeeId: 2,
        fullName: `Alexandrovna Elizabeth Victoria`,
        corporateEmail: `elizabethvictor@tourmalinecore.com`,
        personalEmail: `elizabethvictoria@gmail.com`,
        gitHub: `elizabethvictoria`,
        phone: `+79999999999`,
        gitLab: `elizabethvictoria`,
        isBlankEmployee: false,
        isCurrentEmployee: true,
        birthDate: `2000-12-12`,
        specializations: [
          1,
        ],
        workerTime: `Пн, Вт, Ср, Пт с 10:00 до 19:00, Чт с 10:00 до 20:00. Обед с 14:00 до 15:00`,
      },
      {
        employeeId: 3,
        fullName: `Christopher James Brown`,
        corporateEmail: `сhristopher@tourmalinecore.com`,
        personalEmail: null,
        phone:null,
        gitHub: null,
        gitLab: null,
        isBlankEmployee: false,
        isCurrentEmployee: true,
        birthDate: null,
        specializations: [],
        workerTime: null,
      },
    ],
  })

  cy
    .mount(
      <MemoryRouter 
        initialEntries={[
          `/employees`,
        ]}>
        <EmployeesStateContext.Provider value={employeesState}>
          <EmployeesContent />
        </EmployeesStateContext.Provider>
      </MemoryRouter>,
    )
}
