describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'cypress',
            password: 'cypresspassword',
            name: 'Cypress Testing Bot'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    });

    it('login form is shown', function () {
        cy.get("#loginForm")
            .should('exist')
            .and('be.visible')
    })

    describe('Login', function () {

        describe('with wrong credentials', function () {
            it('should not show logged in', function () {
                cy.get('#username').type('cypress')
                cy.get('#password').type('lolzzz')
                cy.get('#loginButton').click()

                cy.get('html').should('not.contain', 'cypress Logged in')
            });

            it('should show correctly styled error message', function () {
                cy.get('#username').type('cypress')
                cy.get('#password').type('lolzzz')
                cy.get('#loginButton').click()
                cy.get('#error')
                    .should('contain', 'Invalid username or password')
                    .and('have.css', 'color', 'rgb(255, 0, 0)')
                    .and('have.css', 'border', '2px solid rgb(255, 0, 0)')
            });

        })

        it('user can login', function () {
            cy.get('#username').type('cypress')
            cy.get('#password').type('cypresspassword')
            cy.get('#loginButton').click()
            cy.contains('cypress Logged in')
        });
    })

    describe('When Logged in', function () {
        beforeEach(function () {
            cy.login({
                username: 'cypress',
                password: 'cypresspassword'
            })
        });

        it('a blog can be created', function () {
            cy.contains('Create New Blog').click()
            cy.get("#title").type('Cypress Title')
            cy.get('#author').type('Cypress Author')
            cy.get('#url').type('Cypress url')
            cy.get('#createBlogButton').click()
            cy.contains('Cypress Title')
            cy.contains('Cypress Author')
        })
    });
});
