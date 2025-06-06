# E2E Testing with Cypress

This project contains two end-to-end testing exercises using Cypress:
- Book Search Feature
- Shopping Cart Feature

## 📦 Prerequisites

- Node.js (v14+)
- npm or yarn
- A modern web browser

## 🚀 Getting Started

```bash
# Install dependencies
npm install
```

## 🧪 Available Scripts

| Command | Description |
|---------|------------|
| `npm run cypress` | Opens Cypress Test Runner in interactive mode |
| `npm run cypress:run` | Runs all tests in headless mode |
| `npm run test:books` | Runs book search feature tests in headless mode |
| `npm run test:shop` | Runs shopping cart feature tests in headless mode |


### Interactive Mode
```bash
# Open Cypress Test Runner (Interactive mode)
npm run cypress
```

Don't forget to run :

```bash
npx serve public 
```

## 📚 TP1: Book Search Feature

### Features Tested
- Search functionality for books by title or author
- Real-time filtering of book list
- "No results" message display
- Default state verification

### Test Cases
1. Default display of all books
2. Search by book title ("dune")
3. Search by author name ("orwell")
4. Empty results handling
5. Search clearing behavior

### File Structure
```
cypress/
  ├── e2e/
  │   └── books.spec.cy.js
  └── fixtures/
public/
  └── books.html
```

## 🛒 TP2: Shopping Cart Feature

### Features Tested
- Product display and addition to cart
- Total price calculation
- Form validation rules
- Order confirmation flow

### Test Cases
1. Initial products display
2. Adding products to cart
3. Price total updates
4. Form validation:
   - Empty name
   - Invalid email
   - Unchecked terms
5. Complete order flow
6. Multiple products handling

### File Structure
```
cypress/
  ├── e2e/
  │   └── shop.spec.cy.js
  └── fixtures/
      └── users.json
public/
  └── shop.html
```

## 🧪 Running Specific Tests

```bash
# Open Cypress and run specific test files
npm run cypress --spec "cypress/e2e/books.spec.cy.js"
npm run cypress --spec "cypress/e2e/shop.spec.cy.js"

# Run tests in headless mode
npx cypress run --spec "cypress/e2e/books.spec.cy.js"
npx cypress run --spec "cypress/e2e/shop.spec.cy.js"
```

## 📝 Test Writing Guidelines

1. Use descriptive test names
2. Group related tests using `describe` blocks
3. Use `beforeEach` for common setup
4. Make assertions specific and meaningful
5. Use fixtures for test data

## 🔍 Common Commands

- `cy.visit()`: Navigate to a page
- `cy.get()`: Select elements
- `cy.contains()`: Find elements by content
- `cy.type()`: Enter text
- `cy.click()`: Click elements
- `cy.should()`: Make assertions

## 📸 Screenshots

Screenshots are automatically captured on test failure and can be manually taken using:
```javascript
cy.screenshot('screenshot-name')
```