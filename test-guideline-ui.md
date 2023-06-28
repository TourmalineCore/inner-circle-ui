# Rules and Patterns of the UI testing
- [Main rules](#main-rules)
  - [Cypress Chain Method writing convention](#cypress-chain-method-writing-convention)
  - [Async Commands and the Cypress Command Queue](#async-commands-and-the-cypress-command-queue)
    - [Asynchronous Execution of Cypress Commands](#asynchronous-execution-of-cypress-commands)
    - [Mixing Asynchronous and Synchronous Code](#mixing-asynchronous-and-synchronous-code)
- [Page Object and Page Factory](#page-object-and-page-factory)
  - [Storage folder for page object classes](#storage-folder-for-page-object-classes)
- [Component Testing Strategy](#component-testing-strategy)
  - [What do we test in the component test](#what-do-we-test-in-the-component-test)
  - [Names of component tests](#names-of-component-tests)
- [E2E Testing Strategy](#e2e_strategy)
  - [What do we test in the E2E test](#what-do-we-test-in-the-e2e-test)
- [Executing Tests](#executing-tests)

## Main rules <a name="main-rules"></a> 

The Cypress framework is used for component and user-flow (E2E) testing. Tests will be written only by ***TDD*** methodology.

But first, remember the rules you must follow when writing your tests

- Atomicity. One test per functionality
- Independence. Tests can be run in any order and it must pass 

Ok! We are ready! Let's dive in!

### Cypress Chain Method writing convention <a name="cypress-chain-method-writing-convention"></a> 
Cypress chain methods convention define how should be written on each line by the method (except for first line) to more understandable and easy-to-read code

Example: 

```JavaScript
cy.getByData(`gallery-name-input`)
  .last()
  .should(`be.focused`)
```

### Async Commands and the Cypress Command Queue <a name="#async-commands-and-the-cypress-command-queue"></a> 

It is important to note that the Cypress Command queue is asynchronous. Commands execute immediately when they are enqueued, but their callbacks don't execute until all previously enqueued commands have completed. 

#### *Asynchronous Execution of Cypress Commands* <a name="asynchronous-execution-of-cypress-commands"></a>

  It is crucial to understand that Cypress commands do not perform any action immediately upon being invoked, but rather schedule themselves for later execution. This is what is meant by the term "asynchronous" when referring to Cypress commands.

#### *Mixing Asynchronous and Synchronous Code* <a name="mixing-asynchronous-and-synchronous-code"></a>

  It is important to remember that Cypress commands run asynchronously when attempting to combine them with synchronous code. Synchronous code executes immediately, without waiting for the Cypress commands to complete above it.

[***Go here for the details and examples. It is an official Cypress documentation.***](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous) 

---

## Page Object and Page Factory <a name="page-object-and-page-factory"></a> 
Follow Page Object and Page Factory design patterns for writing tests. This patterns involves describing all pages through classes that describe all possible actions in methods. In the same way actions with page elements are described.

This is the best practice when designing automated UI tests. There is some reasons why we use patterns: 
  - **Code reusability**: The Page Object and Page Factory patterns allow you to write code that can be reused across different tests. Instead of writing the same code over and over again, you can create reusable Page Objects and use them in multiple tests, making your tests more maintainable and easier to read.
  - **Separation of concerns**: The Page Object and Page Factory patterns separate the code that interacts with the UI from the test logic. This separation of concerns makes your tests easier to read and maintain, as it allows you to focus on the test logic without worrying about the details of how the UI is implemented.
  - **Improved test stability**: The Page Object and Page Factory patterns provide a more stable and reliable way of interacting with the UI. By encapsulating the UI logic within the Page Object, you can make sure that your tests always interact with the UI in the same way, reducing the likelihood of flaky tests.
  - **Scalability**: As your frontend application grows in complexity, the Page Object and Page Factory patterns make it easier to manage your tests. By breaking down your UI into smaller Page Objects, you can keep your code organized and more maintainable, even as your application grows.

Here we have a `BasePage` abstract class with common actions on every page, like visit, reload or header menu.
So, then create Page Object class and extend this `BasePage` class. 

Here's an example of defining Page Object class `LoginPage` with interactions on it:

```JavaScript
//login-page.ts
import BasePage from "./BasePage"

export default class LoginPage extends BasePage {
  // Define methods to interact with the UI on the login page

  static typeLogin(login: string) {
    cy.getByData('usernameInput')
      .type(login);
  }
  static typePassword(password: string) {
    cy.getByData('password-input')
      .type(password);
  }
  static tapSignIn() {
    cy.getByData('login-button')
      .click();
  }
  static errorBoxIsShown() {
    cy.getByData('error-box').should('exist');
  }
}
```

Then use it on your component **and** E2E tests like this:

```JavaScript
// Export the LoginPage object
import LoginPage from '../pages/login_page';

describe('Login', () => {
  beforeEach(() => {
    LoginPage.visit('/auth');
  });

  it('should log in with valid credentials', () => {
    LoginPage.typeLogin('Elijah');
    LoginPage.typePassword('Sapronov');
    LoginPage.tapSignIn();
    PersonalAccountPage.isOpen();
  });

  it('should display an error message with invalid login', () => {
    LoginPage.typeLogin('Elijah123');
    LoginPage.typePassword('Sapronov');
    LoginPage.errorBoxIsShown();
  });
  it('should display an error message with invalid password', () => {
    LoginPage.typeLogin('Elijah');
    LoginPage.typePassword('Sapronov123');
    LoginPage.errorBoxIsShown();
  });
});
```

### *Storage folder for page object classes* <a name="storage-folder-for-page-object-classes"></a>

All page classes storage in **./cypress/pages** folder

Here, you can create files for every page like **base-page.ts**

---

## Component Testing Strategy <a name="component-testing-strategy"></a> 

The following will describe strategies for testing components.

### *What do we test in the component test* <a name="what-do-we-test-in-the-component-test"></a>

- Inner component of the page
  - Component mounting successfully
  - All behaviors that are described in requirements
  - All functions are called on certain cases that you expect
  
    When a component takes a callback function as a parameter, we use `cy.spy()` for testing it:
  ```JavaScript
  it('SHOULD call onLogin function once AFTER type creds and click Log In')
    //using spy on your func
    const onLogin = cy.spy().as(`onLogin`);
    
    cy.getByData(`login-input`)
      .type(`admin`);

    cy.getByData(`password-input`)
      .type(`123`);

    cy.getByData(`login-button`)
      .click();

    // validate that your func is called once with right parameters
    cy.get(`@onLogin`)
      .should(`have.been.calledOnceWith`, {
        login: `admin`,
        password: `123`,
      });
  ```

- Page component (integration component test):
  - All axios requests are correctly parsed

    When testing using Cypress, we only sparingly mock/intercept network calls or other interaction with the 'outside world'. We isolate UI rendering. If we're mocking API calls, we can use `cy.intercept()`
  ```JavaScript
  it('SHOULD call get galleries request and show 1 gallery WHEN mount component', () => {
    // using intercept for mock it's STATUS or RESPONSE on request with it url
    // use it BEFORE request is called (before component is mounting)
    cy.intercept(`GET`, `/api/galleries`, [{
      id: 1,
      name: `First Gallery`,
    }])
    cy.mount(<GalleriesPage />)
    cy.getByData('gallery-card')
      .should('have.length', 1)
  })
  ```

- Any other components (State classes / react hooks)
  - All methods are worked as you expect

Don't forget that all of this must be described through the **TDD** approach!

### *Names of component tests* <a name="names-of-component-tests"></a>

Component tests must contain the name of the component they are testing. You should also add .cy at the end of the file name so that Cypress can correctly recognize the test

Example:

Component `LoginForm.tsx`

Test `LoginForm.cy.tsx`

### *Storage for component tests*

Component tests must be stored in the same folder as the component being tested

Example:

Component `Galleries/GalleriesPage.tsx`

Test `Galleries/GalleriesPage.cy.tsx`

---

## E2E Testing Strategy



### *What do we test in the E2E test* <a name="what-do-we-test-in-the-e2e-test"></a>

Each E2E test - **use case** of our application

It's a scenario in which the end user performs a chain of actions in a product or follows a specific path to a specific end goal. These scenarios must be positive (happy-path)

We want to cover the whole scenario, considering 2 dimensions:

- Horizontal - we are trying to fully embrace the flow, path, or user scenario that we know about, can imagine, wish to see, or expect from end-user behavior

- Vertical - includes all technical layers: backend, frontend, service layer, data storage and management layer

## Executing Tests <a name="executing-tests"></a> 
To execute Cypress component test, run this command in the terminal:
```
npm run test --component
```
If you want to execute E2E tests, run this command in the terminal:
```
npm run test --e2e 
```
To open Cypress GUI and check the steps of the tests and test caises overall, run this command in the terminal:
```
npx cypress open
```

