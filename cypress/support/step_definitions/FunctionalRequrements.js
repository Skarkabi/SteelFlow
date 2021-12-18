Given("The user goes to the login page", ()=>{
    cy.visit(`http://localhost:3000`);
})

When("Entered {string} as {string}", (input, location) => {
    cy.get(`#${location}`).type(input)
})

When("Clicked the {string} button", (button) => {
    cy.get(`#${button}`).click();
})

Then("The {string} should be shown to indicate {string}", (element, outcome) => {
    if(outcome === "Success"){
        cy.url().should('eq', `http://localhost:3000/`);
    }else{
        cy.url().should('eq', `http://localhost:3000/login`);
    }
})

Given("User with {string} and {string} is logged in", (id, password)=>{
    cy.visit(`http://localhost:3000`);
    cy.get(`#fName`).type(id)
    cy.get(`#lName`).type(password);
    cy.get(`#login-btn`).click();
})

When("User type {string} {string} see {string}", (type, avail, element) => {
    if(avail == "should"){
        cy.contains(`${element}`)
        
    }else{
        
    }
})

Then("User {string} click {string}", (avail, element)=> {
    if(avail === "should"){
        cy.get(`[id="${element}"]`).click()
    }else{
        cy.visit('http://localhost:3000/users/view')
    }
    
})

Then("User should be on page {string}", (url) => {
    cy.url().should('eq', `http://localhost:3000/${url}`)
    if(url === ""){
        cy.contains('You do not have access to that page');
    }
   
})

When("User inputs {string} in {string}", (value, input) => {
    cy.get(`[id="${input}"]`).type(value)
})

When("User sees {string}", (value) => {
    cy.get(`[id="${value}"]`)
})

Then("User views message {string}", (value) => {
    cy.contains(`${value}`)
})

Then("User sees the first order as {string}", (value) => {
    cy.get(`[id="row-0"]`).contains(`${value}`)
})

When("User visits page {string}", (url) => {
    cy.url().visit(`http://localhost:3000/${url}`)
})

When("{string} {string} have attribute {string}", (item, option, element) => {
    if(option === "should"){
        cy.get(`#${item}`).invoke('attr', 'class').should('contain', `${element}`)
    }else{
        cy.get(`#${item}`).not('.active')
    }
       
    
})

Then("User views {string} table", (name) => {
    cy.get(`[name="${name}"]`)
})

When("Order {string} Status should be {string}", (row, status) => {
    cy.get(`[id="${row}"]`).should('contain', `${status}`)
})

When("Order status should be {string}", (value) => {
    cy.get(`input[id="status"]`).should('have.value', value);
})