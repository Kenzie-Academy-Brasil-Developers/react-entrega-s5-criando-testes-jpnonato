context("Search adress", () => {
    it("type a available CEP and click button to get An adress", () => {
        cy.visit('http://localhost:3000')
        cy.viewport(1440, 900)
        
        cy.get("input[type=number]").type(21820170)
        cy.contains("Buscar pelo CEP").click(); 
    })

})