describe("no.wikipedia.org", () => {
  it("can search for Noroff", () => {
    cy.visit("https://no.wikipedia.org");
    cy.get("input#searchInput").type("Anand Chetty{enter}", { delay: 500 });
    cy.get("h1").contains("Anand Chetty");
  });
});
