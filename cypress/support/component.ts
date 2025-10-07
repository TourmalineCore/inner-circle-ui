import './commands'
import '../env-config'
// import '../../public/env-config';

/// <reference types="cypress" />

// styles
import '../../src/styles/index.scss'

// commands
import { mount } from 'cypress/react'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      compareSnapshot(name: string, options?: any): Chainable<Element>,
    }
  }
}

Cypress.Commands.add(`mount`, mount)
