/// <reference types="cypress" />

Cypress.Commands.add("getByTestId", (id) => {
  return cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add("mockLogin", () => {
  cy.visit("http://localhost:3000/");
  cy.window().then((win) => {
    win.localStorage.setItem("authToken", "mock-token");
  });
  cy.get(".modal-box > button").click();
});
