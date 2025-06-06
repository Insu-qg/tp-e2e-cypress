describe('Book Search Feature', () => {
  beforeEach(() => {
    // Visit the books page before each test
    cy.visit('/public/books.html')
  })

  it('should display all books by default', () => {
    // Check if all 3 books are visible
    cy.get('#book-list li').should('have.length', 3)
    cy.get('#book-list li').should('be.visible')
    
    // Verify "no results" message is hidden
    cy.get('#no-results').should('not.be.visible')
  })

  it('should only show "Dune" when searching for "dune"', () => {
    // Type "dune" in the search input
    cy.get('#search').type('dune')

    // Verify only one book is visible
    cy.get('#book-list li:visible').should('have.length', 1)
    
    // Verify it's "Dune"
    cy.get('#book-list li:visible').should('contain', 'Dune')
    
    // Verify other books are hidden
    cy.contains('Gatsby').should('not.be.visible')
    cy.contains('1984').should('not.be.visible')
  })

  it('should show "no results" message when no matches found', () => {
    // Type a search term that won't match any books
    cy.get('#search').type('xyz123')

    // Verify all books are hidden
    cy.get('#book-list li:visible').should('have.length', 0)
    
    // Verify "no results" message is visible
    cy.get('#no-results')
      .should('be.visible')
      .and('contain', 'Aucun résultat')
  })

  it('should find books by author name', () => {
    // Search by author
    cy.get('#search').type('orwell')

    // Verify only one book is visible
    cy.get('#book-list li:visible').should('have.length', 1)
    cy.get('#book-list li:visible').should('contain', '1984')
    
    // Take a screenshot of the search results
    cy.screenshot('search-by-author')
  })

  it('should show all books again when search is cleared', () => {
    // First search for something
    cy.get('#search').type('dune')
    cy.get('#book-list li:visible').should('have.length', 1)

    // Clear the search
    cy.get('#search').clear()

    // Verify all books are visible again
    cy.get('#book-list li').should('have.length', 3)
    cy.get('#book-list li').should('be.visible')
    cy.get('#no-results').should('not.be.visible')
  })
})