describe('App E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Hamburger menu should be hidden by default', () => {
    cy.get('[data-cy=hamburgerMeny]').should('not.be.visible') //burgermenu should be hidden by default
    cy.wait(2000)
  });
  it('Hamburger menu should be visible when burger button is clicked', () => {
    cy.get("[data-cy=hamburgerButton]").click() //clicks the burger button
    cy.get('[data-cy=hamburgerMeny]').should('be.visible') //burgermenu should now be visible
    cy.wait(3000)
  });
  it('There should be 9 movies on load, and 18 when the user has scrolled to the bottom (pagination)', () => {
    cy.get("[data-cy=movieCard]").should("have.length", 9) //counts number of moviecards
    cy.scrollTo('bottom', {duration: 5000}) //scrolls to bottom of page to trigger pagination
    cy.get("[data-cy=movieCard]").should("have.length", 18) //counts number of moviecards, which should now be 18 instead of 9
  });
  it('Search should only return movies with corresponding name', () => {
    cy.get('[data-cy=searchBar]').type('Terminator') //types "Terminator" into the text field
    cy.get("[data-cy=movieCard]").its(".header").contains("Terminator") //Checks that all the moviecards displayed has a title including "Terminator"
  });
});
