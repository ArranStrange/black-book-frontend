describe("Search Bar and Navigation", () => {
  beforeEach(() => {
    cy.mockLogin();
  });
  it("should open the search bar and navigate to the search page", () => {
    cy.getByTestId("drink-card").should("be.visible");
    cy.get(".search-bar").should("be.visible");
    cy.get(".search-bar").click();
    cy.get(".search-bar").type("Margarita");
    cy.get('[data-testid="submit-search-button"]').click();
    cy.getByTestId("drink-card").click();
    cy.get(".selectedDrinks-name");
  });
  it("should select a letter from the nav and check the drinks are being filtered", () => {
    cy.get(".alphabet").should("be.visible");
    cy.get(".alphabet").get("li").last().click();
    cy.get(".current-letter").should("contain", "");
    cy.get(".drinks-container").should("be.visible");
    cy.get(".drinks-container")
      .find('[data-testid="drink-card"]')
      .should("contain", "Zombie");
  });
});
