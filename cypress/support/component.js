// Import commands.js using ES2015 syntax:
import './commands';
import { mount } from 'cypress/react';
import '@testing-library/cypress/add-commands';

// import css
import '@tourmalinecore/react-tc-ui-kit/es/index.css';
import '@tourmalinecore/react-tc-modal/es/index.css';
import '@tourmalinecore/react-table-responsive/es/index.css';

// add command for render component
Cypress.Commands.add('mount', mount);
