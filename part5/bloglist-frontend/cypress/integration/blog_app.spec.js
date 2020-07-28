describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user1 = {
            username: 'cypress',
            password: 'cypresspassword',
            name: 'Cypress Testing Bot'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user1)
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

    describe('When Logged in as cypress', function () {
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

        describe('And Blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    url: 'testurl',
                    author: 'testauthor',
                    title: 'testtitle'
                });
                const user2 = {
                    username: 'altuser',
                    password: 'password',
                    name: 'Alternate Testing Bot'
                }
                cy.request('POST', 'http://localhost:3003/api/users/', user2)
                cy.login({ username: user2.username, password: user2.password })
                cy.createBlog({
                    url: 'alternatetesturl',
                    author: 'alternate testauthor',
                    title: 'alternate testtitle'
                });
                cy.login({ username: 'cypress', password: 'cypresspassword' })
            })

            it('a blog can be liked', function () {
                cy.contains('testauthor')
                    .contains('View Details')
                    .click()
                    .parent()
                    .contains('like')
                    .click()
                    .parent()
                    .contains('Likes: 1')
            })

            it.only('cypress can delete own blog', function () {
                cy.contains('testauthor')
                    .contains('View Details').click()
                    .parent()
                    .contains('Delete')
                    .click()
                    .should('be.visible')

                cy.get("html")
                    .should('not.contain', 'testtitle testauthor')
            })

            it('cypress can not delete altuser blog', function () {
                cy.contains('alternate testauthor')
                    .contains('View Details').click()
                    .parent()
                    .contains('Delete')
                    .should('not.be.visible')

                cy.get("#main")
                    .should('contain', 'alternate testauthor')

            })
        })
    });
});
