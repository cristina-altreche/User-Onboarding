//INPUT TESTS
describe("INPUTS", () => {
  //check if url works
  it("it can navigate to the site", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "http://localhost:3000");
  });

  //get the name and type a name in it
  it("can type a name in the name input", () => {
    cy.get("input[name=name]")
      .type("Cristina") //name typed in
      .should("have.value", "Cristina") //text inputted contains name 
    // //clear's input   
    // cy.get('input[name=name').clear()  
  });

  //get email and type address in it
  it("can get email input and type address", () =>{
      cy.get('input[name=email')
      .type('csf@gms.com')
  })

  //get password and input password
  it('can get password input and type password', ()=>{
      cy.get('input[name=password]')
      .type('this is a password')
  })
});


//CHECKBOX & SUBMIT BTN TEST
describe('Checkbox & Submit Form', () => {
    //get checkbox and check if checked
    it('can get checkbox and check it', () => {
        cy.get('input[name=terms]').check()
    })

    it('can get the submit Btn and submit', () => {
        cy.get('form').submit()
    })
})
