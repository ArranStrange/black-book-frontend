/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    mockLogin(): Chainable<void>;
  }
}
