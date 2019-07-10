Cypress.Commands.add("login", (email, password) => { 
    cy.request('POST', 'https://api.bayzat.com/users/login', { username: email, password:password, extended_expiration:false })
        .then((response) => {
            var jwt = response.body.payload.data.access_token;
            var obj = {
                token: jwt
            }
            window.localStorage.setItem('_bayzat_auth_token', JSON.stringify(obj));
            cy.visit('https://www.bayzat.com/enterprise/dashboard/index');
        })
 })
