/// <reference types="cypress" />

describe('Checks that the app renders and works properly', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('renders the overview page', () => {
    cy.get('.PrivateSwitchBase-input').should('not.be.checked')
    cy.get('.MuiFormControlLabel-root > .MuiTypography-root').should(
      'have.text',
      'Switch to dark theme'
    )
    cy.get('.MuiTypography-h1').should('have.text', 'Been there, done that!')
    cy.get('#\\:r1\\:').should('be.visible')
    cy.get('.mapboxgl-canvas').should('be.visible')
    cy.get(
      ':nth-child(2) > .css-13i4rnv-MuiGrid-root > .MuiTypography-root'
    ).should('have.text', 'Cities')
    cy.get('[data-testid="all-visited-icon"] > path').should('be.visible')
    cy.get(
      ':nth-child(3) > .css-13i4rnv-MuiGrid-root > .MuiTypography-root'
    ).should('have.text', 'Attractions')
    cy.get('[data-testid="visited-icon"] > path').should('be.visible')
    cy.get(
      '.css-gi694y-MuiGrid-root > .MuiGrid-container > :nth-child(1) > .MuiTypography-root'
    ).should('have.text', 'Built by Lucas Silbernagel')
    cy.get('[data-testid="GitHubIcon"]').should(
      'have.attr',
      'data-testid',
      'GitHubIcon'
    )
    cy.get(':nth-child(3) > .MuiTypography-root').should(
      'have.text',
      'City and tourist attraction data provided by Geoapify'
    )
  })

  it('toggles the theme', () => {
    cy.get('.PrivateSwitchBase-input').should('not.be.checked')
    cy.get('.MuiFormControlLabel-root > .MuiTypography-root').should(
      'have.text',
      'Switch to dark theme'
    )
    cy.get('.PrivateSwitchBase-input').check()
    cy.get('.PrivateSwitchBase-input').should('be.checked')
    cy.get('.MuiFormControlLabel-root > .MuiTypography-root').should(
      'have.text',
      'Switch to light theme'
    )
    cy.get('.PrivateSwitchBase-input').uncheck()
    cy.get('.PrivateSwitchBase-input').should('not.be.checked')
    cy.get('.MuiFormControlLabel-root > .MuiTypography-root').should(
      'have.text',
      'Switch to dark theme'
    )
  })

  it('adds, edits, filters, and deletes cities', () => {
    cy.get('.MuiFormControl-root').click()
    cy.get('#\\:r1\\:').clear()
    cy.get('#\\:r1\\:').clear()
    cy.get('#\\:r1\\:').type('toronto')
    cy.get('#\\:r1\\:-option-0').click()
    cy.get('[data-testid="ArrowBackIcon"]').should('be.visible')
    cy.get('[data-testid="delete-city-button"]').should(
      'have.text',
      'Delete city'
    )
    cy.get('.MuiTypography-h2').should('have.text', 'Toronto, ON, Canada')
    cy.get(
      ':nth-child(1) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).should('not.be.checked')
    cy.get(
      ':nth-child(1) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiTypography-root'
    ).should('have.text', 'Mackenzie House')
    cy.get(
      ':nth-child(1) > .css-1lym95h-MuiGrid-root > .MuiGrid-container > a > [data-testid="InfoIcon"] > path'
    ).should('be.visible')
    cy.get(
      ':nth-child(2) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).should('not.be.checked')
    cy.get(
      ':nth-child(2) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiTypography-root'
    ).should('have.text', 'Allan Gardens Conservatory')
    cy.get(
      ':nth-child(2) > .css-1lym95h-MuiGrid-root > .MuiGrid-container > a > [data-testid="InfoIcon"]'
    ).should('have.attr', 'data-testid', 'InfoIcon')
    cy.get(
      ':nth-child(2) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).check()
    cy.get(
      ':nth-child(2) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).should('be.checked')
    cy.get('[data-testid="ArrowBackIcon"]').click()
    cy.get(':nth-child(18) > [data-testid="attraction-icon"] > path').click()
    cy.get('.css-1a1imm0-MuiTypography-root').should(
      'have.text',
      'Ontario Place'
    )
    cy.get('.mapboxgl-popup-content > :nth-child(1) > :nth-child(2)').should(
      'have.text',
      'Toronto, ON, Canada'
    )
    cy.get('.mapboxgl-popup-content > :nth-child(1) > :nth-child(3)').should(
      'have.text',
      'Visited: No'
    )
    cy.get('[data-testid="InfoIcon"] > path').should('be.visible')
    cy.get('[data-testid="EditIcon"]').should(
      'have.attr',
      'data-testid',
      'EditIcon'
    )
    cy.get('[data-testid="all-visited-icon"]').should('be.visible')
    cy.get('[data-testid="visited-icon"]').should('be.visible')
    cy.get('[data-tag-index="0"] > .MuiChip-label').should(
      'have.text',
      'Cities'
    )
    cy.get('[data-tag-index="1"] > .MuiChip-label').should(
      'have.text',
      'Attractions'
    )
    cy.get('[data-testid="reset-filters-button"]').should(
      'have.text',
      'Reset map & filters'
    )
    cy.get('[data-testid="clear-data-button"]').should(
      'have.text',
      'Clear all data'
    )
    cy.get('#\\:r1n\\:').clear()
    cy.get('#\\:r1n\\:').type('vancouver')
    cy.get('#\\:r1n\\:-option-0').click()
    cy.get(
      ':nth-child(15) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).should('not.be.checked')
    cy.get(
      ':nth-child(15) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiTypography-root'
    ).should('have.text', 'Gastown Steam Clock')
    cy.get(
      ':nth-child(15) > .css-1lym95h-MuiGrid-root > .MuiGrid-container > a > [data-testid="InfoIcon"] > path'
    ).should('be.visible')
    cy.get(
      ':nth-child(15) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).check()
    cy.get(
      ':nth-child(15) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).should('be.checked')
    cy.get('[data-testid="ArrowBackIcon"]').click()
    cy.get(':nth-child(38) > [data-testid="attraction-icon"]').click()
    cy.get('.css-1a1imm0-MuiTypography-root').should(
      'have.text',
      'Coopers Mews'
    )
    cy.get('.mapboxgl-popup-content > :nth-child(1) > :nth-child(2)').should(
      'have.text',
      'Vancouver, BC, Canada'
    )
    cy.get('.mapboxgl-popup-content > :nth-child(1) > :nth-child(3)').should(
      'have.text',
      'Visited: No'
    )
    cy.get('[data-testid="InfoIcon"] > path').should('be.visible')
    cy.get('[data-testid="EditIcon"]').should(
      'have.attr',
      'data-testid',
      'EditIcon'
    )
    cy.get('[data-testid="EditIcon"] > path').click()
    cy.get('.MuiTypography-h2').should('have.text', 'Vancouver, BC, Canada')
    cy.get(
      ':nth-child(1) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).should('not.be.checked')
    cy.get(
      ':nth-child(1) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiTypography-root'
    ).should('have.text', 'Harbour Centre Lookout Tower')
    cy.get(
      ':nth-child(1) > .css-1lym95h-MuiGrid-root > .MuiGrid-container > a > [data-testid="InfoIcon"] > path'
    ).should('be.visible')
    cy.get(
      ':nth-child(1) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).check()
    cy.get(
      ':nth-child(1) > .css-1lym95h-MuiGrid-root > .MuiGrid-grid-xs-10 > [data-testid="attraction-checkbox"] > .MuiButtonBase-root > .PrivateSwitchBase-input'
    ).should('be.checked')
    cy.get('[data-testid="ArrowBackIcon"]').click()
    cy.get('#\\:r69\\:').click()
    cy.get('#\\:r69\\:-option-0').click()
    cy.get('[data-testid="reset-filters-button"]').click()
    cy.get('#\\:r5r\\:').clear()
    cy.get('#\\:r5r\\:').type('vancouver')
    cy.get('#\\:r5r\\:-option-0').click()
    cy.get('[data-testid="delete-city-button"]').click()
    cy.get('#modal-title').should(
      'have.text',
      'Are you sure you want to delete Vancouver, BC, Canada?'
    )
    cy.get('[data-testid="cancel-button"]').should('have.text', 'Cancel')
    cy.get('[data-testid="confirm-button"]').should('have.text', 'Yes')
    cy.get('[data-testid="cancel-button"]').click()
    cy.get('.MuiTypography-h2').should('have.text', 'Vancouver, BC, Canada')
    cy.get('[data-testid="delete-city-button"]').click()
    cy.get('[data-testid="confirm-button"]').click()
    cy.get('[data-testid="clear-data-button"]').click()
    cy.get('#modal-title').should(
      'have.text',
      'Are you sure you want to delete all saved data?'
    )
    cy.get('[data-testid="cancel-button"]').should('have.text', 'Cancel')
    cy.get('[data-testid="confirm-button"]').should('have.text', 'Yes')
    cy.get('[data-testid="cancel-button"]').click()
    cy.get('[data-testid="clear-data-button"]').click()
    cy.get('[data-testid="confirm-button"]').click()
  })

  it('renders an error when a city without attractions is searched', () => {
    cy.get('#\\:r1\\:').clear()
    cy.get('#\\:r1\\:').type('banff')
    cy.get('#\\:r1\\:-option-0').click()
    cy.get('[data-testid="no-data-message"]').should(
      'have.text',
      "Sorry, the Geoapify places API doesn't have any attractions on file for this city! 🙁"
    )
    cy.get('[data-testid="ArrowBackIcon"]').click()
  })
})
