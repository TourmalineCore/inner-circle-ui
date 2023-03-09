import Indicators from "./Indicators"

import { MemoryRouter } from 'react-router-dom';

import jsonMockRequest from '../../../../../cypress/fixtures/total-finance-data.json';

describe('Indicators', () => {
  beforeEach(() => {
    mockGetTotalFinanceResponse()
    mountIndicators();
    waitResponse();
  })

  it('validate right parse request for value reserveForQuarter', () => {
    cy.findByTestId("reserve-for-quarter-label").should('contain.text', jsonMockRequest.reserveFinance.reserveForQuarter)
  });

  it('validate right parse request for value reserveForHalfYear', () => {
    cy.findByTestId("reserve-for-half-year-label").should('contain.text', jsonMockRequest.reserveFinance.reserveForHalfYear)
  });

  it('validate right parse request for value reserveForYear', () => {
    cy.findByTestId("reserve-for-year-label").should('contain.text', jsonMockRequest.reserveFinance.reserveForYear)
    
  });

  it('validate right parse request for value desiredIncome', () => {
    cy.findByTestId("desired-income-label").should('contain.text', jsonMockRequest.desiredFinancialMetrics.desiredIncome)
    
  });

  it('validate right parse request for value ', () => {
    cy.findByTestId("desired-profit-label").should('contain.text', jsonMockRequest.desiredFinancialMetrics.desiredProfit)
    
  });

  it('validate right parse request for value desiredProfitability', () => {
    cy.findByTestId("desired-profitability-label").should('contain.text', jsonMockRequest.desiredFinancialMetrics.desiredProfitability)
    
  });

  it('validate right parse request for value totalExpense', () => {
    cy.findByTestId("total-expense-label").should('contain.text', jsonMockRequest.totalExpenses.totalExpense)
    
  });

  it('validate right parse request for value payrollExpense', () => {
    cy.findByTestId("payroll-expense-label").should('contain.text', jsonMockRequest.totalExpenses.payrollExpense)
    
  });

  it('validate right parse request for value officeExpense', () => {
    cy.findByTestId("office-expense-label").should('contain.text', jsonMockRequest.totalExpenses.officeExpense)
    
  });

  it('validate right parse request for value workingDaysInYear', () => {
    cy.findByTestId("working-days-in-year-label").should('contain.text', jsonMockRequest.workingDays.workingDaysInYear)
    
  });

  it('validate right parse request for value workingDaysInYearWithoutVacation', () => {
    cy.findByTestId("working-days-in-year-without-vacation-label").should('contain.text', jsonMockRequest.workingDays.workingDaysInYearWithoutVacation)
    
  });

  it('validate right parse request for value workingDaysInYearWithoutVacationAndSick', () => {
    cy.findByTestId("working-days-in-year-without-vacation-and-sick-label").should('contain.text', jsonMockRequest.workingDays.workingDaysInYearWithoutVacationAndSick)
    
  });

  it('validate right parse request for value workingDaysInMonth', () => {
    cy.findByTestId("working-days-in-month-label").should('contain.text', jsonMockRequest.workingDays.workingDaysInMonth)
    
  });

  it('validate right parse request for value workingHoursInMonth', () => {
    cy.findByTestId("working-hours-in-month-label").should('contain.text', jsonMockRequest.workingDays.workingHoursInMonth)
    
  });
  it('validate right parse request for value districtCoefficient', () => {
    cy.findByTestId("district-coefficient-label").should('contain.text', jsonMockRequest.districtCoefficient * 100)
    
  });

  it('validate right parse request for value incomeTaxPercent', () => {
    cy.findByTestId("income-tax-percent-label").should('contain.text', jsonMockRequest.incomeTaxPercent * 100)
  });

  it('validate right parse request for value minimumWage', () => {
    const convertedValue = jsonMockRequest.minimumWage.toString().replace('.', ',');
    cy.findByTestId("minimum-wage-label").should('contain.text', convertedValue)
  });
})

function mountIndicators() {
  cy.mount(
    <MemoryRouter>
      <Indicators />
    </MemoryRouter>,
  );
}

function mockGetTotalFinanceResponse() {
  cy.intercept('GET', '/api/salary/finance/get-total-finance', {
    statusCode: 200,
    fixture: 'total-finance-data.json',
  })
  .as('getTotalFinance');
}

function waitResponse() {
  cy.wait('@getTotalFinance');
}