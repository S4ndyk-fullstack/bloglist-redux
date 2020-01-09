describe('Blogs', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  it('user can login', function () {
    cy.contains('log in')
      .click()
    cy.get('#username')
      .type('S4ndyk')
    cy.get('#password')
      .type('viatonta')
    cy.contains('kirjaudu')
      .click()
    cy.contains('Santtu logged in')
  })

  it('user can add blog', function () {
    cy.get('#toggle')
      .click()
    cy.get('#title')
      .type('Bloggo')
    cy.get('#author')
      .type('Doggo')
    cy.get('#url')
      .type('Doggod Bloggo')
    cy.get('#create')
      .click()
    cy.contains('Bloggo by Doggo')
  })

  it('user can logout', function () {
    cy.get('button:first')
      .click()
    cy.contains('log in to application')
  })
})