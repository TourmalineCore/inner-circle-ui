import './commands'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      compareSnapshot(name: string, options?: any): Chainable<Element>,
    }
  }
}
