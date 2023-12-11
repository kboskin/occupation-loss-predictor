describe('Desktop tests (1920x1080)', () => {

  it('finds the content "Russian losses forecast"', () => {
    cy.visit('/')
    cy.contains('Russian losses forecast')
      .should('be.visible')
  })

  it('finds the content "Losses & Forecast"', () => {
    cy.visit('/')
    cy.contains('Losses & Forecast')
      .should('be.visible')
  })

  it('finds the content "Numeric forecast"', () => {
    cy.visit('/')
    cy.contains('Numeric forecast')
      .should('be.visible')
  })

  it('finds the content "Support project"', () => {
    cy.visit('/')
    cy.contains('Support project')
      .should('be.visible')
  })

  it('"Support the UArmy" button hover styles should be correct', () => {
    cy.visit('/')
    cy.get('button.z-0').trigger('mouseover')
      .should('have.css', 'background-color', 'rgba(243, 18, 96, 0.2)')
  })

  it('"Support the UArmy" button redirects to SaveLife', () => {
    cy.visit('/')
    cy.get('button.z-0')
      .should('be.visible')
      .invoke('attr','href')
      .then(href => {
        cy.visit(href)
    })
  })

  it('video displays', () => {
    cy.visit('/')
    cy.get('.video-container')
      .should('be.visible')
  })

  it('Shows the correct number of days', () => {
    cy.visit('/')
    const daysCount = cy.get('div.text-5xl').first()
    daysCount.should('exist')
    cy.wait(1200)
    daysCount.invoke('text').then((timerText) => {
      
      const daysSinceStart: number = parseInt(timerText)

      const expectedDays: number = getDaysSinceStart()
      
      expect(daysSinceStart).to.equal(expectedDays)
    })
  })
  function getDaysSinceStart(): number {
    const startDate: Date = new Date('2022-02-24T00:00:00Z');
    const currentDate: Date = new Date();

    const millisecondsPerDay: number = 24 * 60 * 60 * 1000;
    const daysSinceStart: number = Math.floor((currentDate.getTime() - startDate.getTime()) / millisecondsPerDay);

    return daysSinceStart;
  }

  it('finds the content "AI-Based Russian Losses Forecast"', () => {
    cy.visit('/')
    cy.contains('AI-Based Russian Losses Forecast').should('be.visible')
  })

  it('finds the content "Protecting the World"', () => {
    cy.visit('/')
    cy.contains('Protecting the World').should('be.visible')
  })

})

describe('Mobile tests', () => {

  beforeEach(() => {
    cy.viewport('iphone-x')
  })

  it('finds menu button on mobile', () => {
    cy.visit('/')
    cy.get('button.flex')
      .should('be.visible')
      .click()
  })
})