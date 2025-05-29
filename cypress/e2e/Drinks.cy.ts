import "../support/commands";

describe("tests drinks components: view, add, and delete a drink", () => {
  beforeEach(() => {
    cy.mockLogin();
  });

  it("creates a drink, ensures it appears in the list, and then deletes it", () => {
    // Wait for drinks list
    cy.get("[data-testid=drinks-container]").should("be.visible");

    // Open the add drink form
    cy.get("[data-testid=toggle-drink-form-button]").click();

    // Fill out the form
    cy.getByTestId("drink-name").type("A Test Drink");
    cy.getByTestId("drink-category")
      .click()
      .get("li[data-value=martini]")
      .click();
    cy.getByTestId("drink-ice").click().get("li[data-value=straight]").click();
    cy.getByTestId("drink-glass").click().get("li[data-value=coup]").click();

    cy.getByTestId("ingredient-1").type("Vodka");
    cy.getByTestId("measure-1").type("60");
    cy.getByTestId("ingredient-2").type("Dry Vermouth");
    cy.getByTestId("measure-2").type("10");

    cy.getByTestId("drink-thumb").type(
      "https://www.artofdrink.com/wp-content/uploads/2010/08/blue-lagoon-cocktail.jpg"
    );
    cy.getByTestId("drink-instructions").type(
      "Stir down well and strain into a chilled glass."
    );
    cy.getByTestId("drink-rating").type("8");

    // Submit the form
    cy.getByTestId("drink-submit-button").click();

    // Close any confirmation modal
    cy.get("[data-testid=confirmation-modal] button").click({ force: true });

    // Reload and reopen confirmation modal if needed
    cy.reload();
    cy.get("[data-testid=confirmation-modal] button").click({ force: true });

    // Open the newly added drink
    cy.get("[data-testid=drinks-container]").contains("A Test Drink").click();

    // Check modal content
    cy.get("[data-testid=selected-drink-modal]").should("be.visible");
    cy.get("[data-testid=selected-drink-title]").should(
      "contain.text",
      "A Test Drink"
    );
    cy.get("[data-testid=selected-category]").should("contain.text", "martini");
    cy.get("[data-testid=selected-glass]").should("contain.text", "coup");
    cy.get("[data-testid=selected-instructions]").should(
      "contain.text",
      "Stir down well and strain into a chilled glass."
    );

    // Open edit modal
    cy.get("[data-testid=edit-button]").click();
    cy.get("[data-testid=edit-drink-modal]").should("be.visible");

    // Delete the drink
    cy.get("[data-testid=delete-drink-button]").click();
    cy.get("[data-testid=confirm-delete-modal]").should("be.visible");
    cy.get("[data-testid=confirm-delete-button]").click();
  });
});
