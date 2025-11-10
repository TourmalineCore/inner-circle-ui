import { BookState } from "../../pages/book/state/BookState"
import { BookStateContext } from "../../pages/book/state/BookStateStateContext"
import { ModalWindow } from "./ModalWindow"
import './../../pages/book/BookContent.scss'

export const VIEWPORTS = [
  {
    width: 375,
    height: 343,
  },
  {
    width: 768,
    height: 480,
  },
]

describe(`Modal Window Snapshot test`, () => {
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

      mountComponent({
        title: `Do You Want to Quit this\u00A0Page?`,
        text: `The data you have entered will not\u00A0be saved`,
        buttonLabel: `No, Stay Here`,
        accentButtonLabel: `Yes, Quit`,
      })

      cy
        .window()
        .then((win) => win.document.fonts.ready)

      cy
        .getByData(`modal-window`)
        .compareSnapshot(`/${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })

  it(`Take the snapshot of a result with close button`, () => {
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

      mountComponent({
        title: `When you are Going to\u00A0Return Book to\u00A0the Library?`,
        text: 
          <>
            You can choose the date in the next step or the date{` `}
            <span className='text-accent'>
              13.04.2025
            </span>
            {` `}will be selected automatically
          </>,
        buttonLabel: `Choose the Return Date`,
        accentButtonLabel: `Take Book`,
        hasCloseButton: true,
      })
      
      cy
        .window()
        .then((win) => win.document.fonts.ready)

      cy
        .getByData(`modal-window`)
        .compareSnapshot(`/with-close-button${viewport.width}`, {
          capture: `viewport`,
        })
    })
  })
})

function mountComponent({
  title,
  text,
  buttonLabel,
  accentButtonLabel,
  hasCloseButton = false,
}: {
  title: string,
  text: string | React.ReactNode,
  buttonLabel: string,
  accentButtonLabel: string,
  hasCloseButton?: boolean,
 }) {
  const bookState = new BookState()
    
  cy
    .mount(
      <BookStateContext.Provider value={bookState}>
        <ModalWindow
          onAccentButtonAction={() => {}}
          onButtonAction={() => {}}
          title={title}
          text={text}
          buttonLabel={buttonLabel}
          accentButtonLabel={accentButtonLabel}
          hasCloseButton={hasCloseButton}
        />,
      </BookStateContext.Provider>,
    )
}
