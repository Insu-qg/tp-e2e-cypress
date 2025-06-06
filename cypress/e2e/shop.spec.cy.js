describe('Shopping Cart Feature', () => {
  beforeEach(() => {
    cy.visit('/public/shop.html')
  })

  it('should display all products initially', () => {
    cy.get('#products li').should('have.length', 2)
    cy.contains('T-shirt - 20€').should('be.visible')
    cy.contains('Mug - 10€').should('be.visible')
  })

  it('should add products to cart when clicking Add button', () => {
    // Add T-shirt to cart
    cy.contains('li', 'T-shirt').find('.add-to-cart').click()
    cy.get('#cart li').should('have.length', 1)
    cy.get('#cart').should('contain', 'T-shirt - 20€')
  })

  it('should update total correctly when adding products', () => {
    // Add both products
    cy.contains('li', 'T-shirt').find('.add-to-cart').click()
    cy.contains('li', 'Mug').find('.add-to-cart').click()
    
    // Verify total (20€ + 10€ = 30€)
    cy.get('#total').should('have.text', '30')
  })

  it('should only show checkout form when cart has items', () => {
    // Initially form should be hidden
    cy.get('#checkout-form').should('not.be.visible')
    
    // Add item and check form appears
    cy.contains('li', 'Mug').find('.add-to-cart').click()
    cy.get('#checkout-form').should('be.visible')
  })

  describe('Order Validation', () => {
    beforeEach(() => {
      // Add item to cart to make form visible
      cy.contains('li', 'T-shirt').find('.add-to-cart').click()
    })

    it('should prevent order with empty name', () => {
      cy.get('#email').type('test@example.com')
      cy.get('#cgu').check()
      cy.get('#submit-order').click()
      
      cy.get('#confirmation').should('not.be.visible')
    })

    it('should prevent order with invalid email', () => {
      cy.get('#name').type('John Doe')
      cy.get('#email').type('invalid-email')
      cy.get('#cgu').check()
      cy.get('#submit-order').click()
      
      cy.get('#confirmation').should('not.be.visible')
    })

    it('should prevent order without accepting terms', () => {
      cy.get('#name').type('John Doe')
      cy.get('#email').type('test@example.com')
      cy.get('#submit-order').click()
      
      cy.get('#confirmation').should('not.be.visible')
    })
  })

  it('should complete full order successfully', () => {
    // Add product
    cy.contains('li', 'T-shirt').find('.add-to-cart').click()
    
    // Fill form
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john@example.com')
    cy.get('#cgu').check()
    
    // Submit order
    cy.get('#submit-order').click()
    
    // Verify confirmation
    cy.get('#confirmation')
      .should('be.visible')
      .and('contain', 'Commande confirmée !')
    
    // Form should be hidden
    cy.get('#checkout-form').should('not.be.visible')
  })

  describe('Multiple Products Handling', () => {
    it('should handle multiple additions of the same product', () => {
      // Add T-shirt twice
      cy.contains('li', 'T-shirt').find('.add-to-cart').click()
      cy.contains('li', 'T-shirt').find('.add-to-cart').click()
      
      // Verify cart has 2 items
      cy.get('#cart li').should('have.length', 2)
      // Verify total is 40€ (20€ x 2)
      cy.get('#total').should('have.text', '40')
    })

    it('should handle different products in any order', () => {
      // Add products in different order
      cy.contains('li', 'Mug').find('.add-to-cart').click()
      cy.contains('li', 'T-shirt').find('.add-to-cart').click()
      cy.contains('li', 'Mug').find('.add-to-cart').click()
      
      // Verify cart has 3 items
      cy.get('#cart li').should('have.length', 3)
      // Verify total is 40€ (10€ + 20€ + 10€)
      cy.get('#total').should('have.text', '40')
    })
  })

  describe('Combined Form Validation Errors', () => {
    beforeEach(() => {
      cy.fixture('users').as('userData')
      cy.contains('li', 'T-shirt').find('.add-to-cart').click()
    })

    it('should handle multiple form errors simultaneously', () => {
      cy.get('@userData').then(users => {
        // Test invalid email only
        cy.get('#email').type(users.invalidUser.email)
        // Don't fill name field at all
        // Don't check CGU
        cy.get('#submit-order').click()
        
        // Verify form wasn't submitted
        cy.get('#confirmation').should('not.be.visible')
        cy.get('#checkout-form').should('be.visible')
      })
    })

    it('should complete order with valid user data and screenshot', () => {
      cy.get('@userData').then(users => {
        // Use valid user data
        cy.get('#name').type(users.validUser.name)
        cy.get('#email').type(users.validUser.email)
        cy.get('#cgu').check()
        cy.get('#submit-order').click()
        
        // Verify success and take screenshot
        cy.get('#confirmation')
          .should('be.visible')
          .and('contain', 'Commande confirmée !')
        
        // Take screenshot of final state
        cy.screenshot('successful-order-confirmation', {
          capture: 'viewport'
        })
      })
    })
  })
})