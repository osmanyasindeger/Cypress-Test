context('Login', () => {
    beforeEach(() => {
      cy.visit('https://www.bayzat.com')
    })
    it('Top Menu -> Login Button -> Login Page -> Login', function (done) {
        var login_button = 'body > div.wrap > header > div > div.menu > div > a.btn.btn-lg.btn-link.btn-lock.js-link-logged-out';
        expect(cy.get(login_button)).to.exist
        cy.get(login_button).each(($el, index, $list) => {
            cy.get($el[index]).click()
        })
        cy.url().should('eq', 'https://www.bayzat.com/profile/login').end()
        cy.get('#ember11-field')
        .type('mridul+180307@bayzat.com')
        cy.get('#ember12-field')
        .type('123456789')
        cy.get('#ember15').click()
        cy.url().should(($p) => {
          expect($p).to.contain('https://www.bayzat.com/enterprise/dashboard/index')
          done()
        })
      })
      it('Login with JWT ', function (done) {
        var user_credentials = {
          email: 'mridul+180307@bayzat.com',
          password: '123456789'
        }

        cy.login(user_credentials.email, user_credentials.password);
        cy.url().should(($p) => {
          expect($p).to.contain('https://www.bayzat.com/enterprise/dashboard/index')
          done()
        })
      })
      it('View Team & Add New Employee & Delete Registered Employee ', function (done) {
        if (!navigator.userAgent.includes('Cypress')) {
          window.addEventListener("beforeunload", this.beforeunloadFunction)
        }
        // // Regular Expression
        // // var regex = /^https:\/\/www.bayzat\.com(\/(enterprise\/dashboard\/employees\/)?(\?.*)?)?([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}?(\/(profile\/personal))/

        // Authorized User Credentials
        var user_credentials = {
          email: 'mridul+180307@bayzat.com',
          password: '123456789'
        }

        // Creating Employee Credentials
        var employee = {
          preferredName: 'Mary Jane',
          firstName: 'Mary',
          lastName: 'Jane',
          dateOfBirthFormatted: '21/07/1993',
          mobileNumber: '05555555555',
          workEmail: 'mary@bayzat.com',
          officeNumber: '3125621456',
          position: 'engineering',
          hiredAtFormatted: '09/07/2019',
          probationEndDateFormatted: '05/07/2020',
          Nationality: 'Turkish - Turkey',
          Gender: 'Female',
          LegalCountryOfResidence: 'Turkey',
          healthInsurancePolicy: '18 03 07 Test plan'
        }

        //   // Firstly login
        cy.login(user_credentials.email, user_credentials.password);
        cy.get('[href="/enterprise/dashboard/employees/list?resetToDefaults=true"]').click()

        // Open dropdown and click 'Add Single Employee' named button
        cy.xpath('//a[@class="btn btn-primary btn-lg btn-labeled fa fa-plus js-add-employee-trigger dropdown-toggle ember-view"]').click();
        cy.xpath('//a[@class="ember-view" and text()="Add single employee"]').click();

        // Open select dropdown named Nationality and set 'Turkish - Turkey' value
        cy.xpath("//div[contains(@class, 'col-sm-11 col-md-10 col-lg-8') and contains(.//label, 'Nationality')]/div[1]/div[1]/div[1]/div[1]").click();
        cy.xpath("//div[contains(@class, 'col-sm-11 col-md-10 col-lg-8') and contains(.//label, 'Nationality')]/div[1]/div[1]/div[1]/div[2]/div[1]/ul/li").within(($el) => {
          cy.get($el).contains(employee.Nationality).click( {force: true} )
        })

        // Open select dropdown named Gender and set 'Female' value
        cy.xpath("//div[contains(@class, 'col-sm-11 col-md-10 col-lg-8') and contains(.//label, 'Gender')]/div[1]/div[1]/div[1]/div[1]").click();
        cy.xpath("//div[contains(@class, 'col-sm-11 col-md-10 col-lg-8') and contains(.//label, 'Gender')]/div[1]/div[1]/div[1]/div[2]/div[1]/ul/li").within(($el) => {
          cy.get($el).contains(employee.Gender).click( {force: true} )
        })

        // Open select dropdown named Legal Country of Residence and set 'Turkey' value
        cy.xpath("//div[contains(@class, 'col-sm-11 col-md-10 col-lg-8') and contains(.//label, 'Legal Country of Residence')]/div[1]/div[1]/div[1]/div[1]").click();
        cy.xpath("//div[contains(@class, 'col-sm-11 col-md-10 col-lg-8') and contains(.//label, 'Legal Country of Residence')]/div[1]/div[1]/div[1]/div[2]/div[1]/ul/li").within(($el) => {
          cy.get($el).contains(employee.LegalCountryOfResidence).click( {force: true} )
        })

        // Open select dropdown named Health Insurance Policy and set '18 03 07 Test plan' value
        cy.xpath("//div[contains(@class, 'col-sm-11 col-md-10 col-lg-8') and contains(.//label, 'Health Insurance Policy')]/div[1]/div[1]/div[1]/div[1]").click();
        cy.xpath("//div[contains(@class, 'col-sm-11 col-md-10 col-lg-8') and contains(.//label, 'Health Insurance Policy')]/div[1]/div[1]/div[1]/div[2]/div[1]/ul/li").within(($el) => {
          cy.get($el).contains(employee.healthInsurancePolicy).click( {force: true} )
        })
        // Set Clock
        // Open form and set input values
        cy.xpath("//form[@class='js-employee-add-form clearfix form-horizontal ember-view']").within(($el) => {
          cy.get($el).within(($form) => {
            cy.get('input[name="preferredName"]').type(employee.preferredName)
            cy.get('input[name="firstName"]').type(employee.firstName)
            cy.get('input[name="lastName"]').type(employee.lastName)
            cy.get('input[name="dateOfBirthFormatted"]').type(employee.dateOfBirthFormatted).type('{enter}')
            cy.get('input[name="mobileNumber"]').type(employee.mobileNumber)
            cy.get('input[name="workEmail"]').type(employee.workEmail)
            cy.get('input[name="officeNumber"]').type(employee.officeNumber)
            cy.get('input[name="position"]').type(employee.position)
            cy.get('input[name="hiredAtFormatted"]').type(employee.hiredAtFormatted).type('{enter}')
            cy.get('input[name="probationEndDateFormatted"]').type(employee.probationEndDateFormatted).type('{enter}')
            cy.root().submit()
            })
        }).wait(8000);
        // // Check callback url after employee registration with regex
        // // cy.url().should('match', regex).wait(3000);
        
        // View Team
        cy.get('[href="/enterprise/dashboard/employees/list?resetToDefaults=true').click()
        cy.xpath("//table[contains(@class, 'table hovered-rows loader  js-employee-list')]/tbody/tr[contains(.//td[@class='cell-ellipsis--mobile']/span/text(), 'Mary Jane Jane')]").within(($el) => {
          cy.get($el).xpath(".//td[@class='text-center']").click();
        })
        cy.xpath("//div[@class='col-xs-6 col-md-8 col-lg-4 text-right']/button[@class='btn btn-lg btn-icon btn-danger ember-view']").click();
        cy.xpath("//div[@class='modal-dialog modal-md']/div[@class='modal-content']/form/button[@class='btn btn-danger ember-view']").click().wait(8000);

        // Logout
        cy.get('[href="/enterprise/dashboard/logout').click()

        // Visit homepage & check login button
        cy.visit('https://www.bayzat.com');
        var login_button = 'body > div.wrap > header > div > div.menu > div > a.btn.btn-lg.btn-link.btn-lock.js-link-logged-out';
        expect(cy.get(login_button)).to.exist
        cy.get(login_button).each(($el, index, $list) => {
             cy.get($el[index]).click().end()
             done()
         })
    })
  })
