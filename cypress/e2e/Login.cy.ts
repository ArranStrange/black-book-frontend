describe("Login", () => {
  it("should open the login page", () => {
    cy.visit("https://black-book-1454c.web.app/");
    cy.get(".modal-box > button").click();
    cy.get(".login-card").should("be.visible");
    cy.get("#username").type("testuser");
    cy.get("#password").type("testpassword{enter}");
    cy.get(".drinks-container > :nth-child(1)").click();
    cy.get(".drink-modal").should("be.visible");
    cy.get(".edit-button").should("be.visible");
    cy.get(".edit-button").click();
  });
});
