import "../support/commands";

describe("tests drinks components, view array of drinks, ", () => {
  beforeEach(() => {
    cy.mockLogin();
  });

  it("create a drink, ensure it is added to the array and then delete the drink", () => {
    cy.get(".drinks-container").should("be.visible");
    cy.get(".toggle-drink-form-button > div").should("be.visible");
    cy.get(".toggle-drink-form-button > div").click();
    cy.getByTestId("drink-name").type("A Test Drink");
    cy.getByTestId("drink-category").select("martini");
    cy.getByTestId("drink-ice").select("straight");
    cy.getByTestId("drink-glass").select("coup");
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
    cy.getByTestId("drink-submit-button").click();
    cy.get(".modal-box > button").click();

    cy.reload();
    cy.get(".modal-box > button").click();
    cy.get(".drinks-container")
      .contains("h2.drink-name", "A Test Drink")
      .click();

    cy.get(".drink-modal").should("be.visible");
    cy.get(".selectedDrinks-name").should("contain.text", "A Test Drink");
    cy.get("#define-category").should("contain.text", "martini");
    cy.get("#define-glass").should("contain.text", "coup");
    cy.get(".selectedDrinks-instructions").should(
      "contain.text",
      "Stir down well and strain into a chilled glass."
    );

    cy.get(".edit-button").click();
    cy.get(".edit-drink-modal-content").should("be.visible");
    cy.get(".bin-icon").click();
    cy.get(".confirm-delete-modal").should("be.visible");
    cy.get(".confirm-btn").click();
  });
});
