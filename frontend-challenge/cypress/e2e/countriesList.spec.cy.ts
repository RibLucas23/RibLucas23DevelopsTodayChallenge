describe('CountriesList Component - Base Route', () => {
	beforeEach(() => {
		cy.intercept('GET', 'http://localhost:5000/countries/available', {
			statusCode: 200,
			body: [
				{ name: 'Argentina', countryCode: 'AR' },
				{ name: 'Brazil', countryCode: 'BR' },
				{ name: 'Chile', countryCode: 'CL' },
				{ name: 'Peru', countryCode: 'PE' },
				{ name: 'Uruguay', countryCode: 'UY' },
				{ name: 'Paraguay', countryCode: 'PY' },
				{ name: 'Colombia', countryCode: 'CO' },
				{ name: 'Ecuador', countryCode: 'EC' },
				{ name: 'Venezuela', countryCode: 'VE' },
				{ name: 'Bolivia', countryCode: 'BO' },
			],
		}).as('getCountries');

		cy.visit('/');
	});

	it('should render countries correctly', () => {
		cy.wait('@getCountries');

		cy.get('ul li').should('have.length', 10); // Verifica que se rendericen los 10 países

		cy.get('li').contains('Argentina');
		cy.get('li').contains('Brazil');
	});

	it('should display country codes correctly', () => {
		cy.wait('@getCountries');

		cy.get('li').first().should('contain', 'AR');
		cy.get('li').eq(1).should('contain', 'BR');
	});

	it('should navigate to the country page when clicking on a country name', () => {
		cy.wait('@getCountries');

		cy.get('button').contains('Argentina').click();

		cy.url().should('include', '/country/AR');
	});
});
