describe('conmplete e to e test', () => {
  it('e to e test', () => {
    cy.visit('/')

    cy.contains('Login with Metamask').click()
    cy.contains('Loading the Crypto Lottery...')

    cy.contains('Buy 1 ticket for 0.01 GOERLI').click()
    cy.contains('Buying your tickets...')
    cy.contains('Tickets purchased successfully!')

    cy.contains('Draw Winner').click()
    cy.contains('Winner Winner Chicken Dinner!')
    cy.contains('Time Remaining')

    cy.contains('Click here to Withdraw').click()
    cy.contains('Withdrawing winnings...')
    cy.contains('Winnings withdrawn successfully!')

  })
})