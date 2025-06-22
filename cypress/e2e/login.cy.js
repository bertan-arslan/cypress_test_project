describe("login test run", () => {
  beforeEach("visit", () => {
    cy.visit("http://localhost:5173/")
  })
  
  it('wrong email', () => {
    cy.get("[data-cy=email]").type("test@test");

    cy.get("[data-cy=errorEmail]").should("be.visible");
    cy.get("[data-cy=errorPassword]").should("not.exist");
    cy.get("[data-cy=errorTerms]").should("not.exist");

    cy.contains("Geçerli bir eposta adresi girin.").should("be.visible");
    cy.get("[data-cy=submitButton]").should("be.disabled")
  })

  it("wrong email and password", () =>{
    cy.get("[data-cy=email]").type("test@test");
    cy.get("[data-cy=password]").type("12Ab*");

    cy.get("[data-cy=errorEmail]").should("be.visible");
    cy.get("[data-cy=errorPassword]").should("be.visible");
    cy.get("[data-cy=errorTerms]").should("not.exist");

    cy.contains("En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az 1 sembol(!@#$%^&*) ve en az 1 rakam içermelidir.").should("be.visible");
  })

  it("correct email and password but no terms", ()=>{
    cy.get("[data-cy=email]").type("test@test.com");
    cy.get("[data-cy=password]").type("12Ab*cyrW*");

    cy.get('[data-cy=terms]')
      .check()
      .should('be.checked')
      .uncheck()
      .should('not.be.checked');

    cy.get("[data-cy=errorTerms]").should("be.visible");

    cy.get("[data-cy=submitButton]").should("be.disabled");

  })

  it("everything is correct", ()=>{
    cy.get("[data-cy=email]").type("test@test.com");
    cy.get("[data-cy=password]").type("12Ab*cyrW*");
    cy.get("[data-cy=terms]").click();

    cy.get("[data-cy=submitButton]").should("not.be.disabled").click();

    cy.url().should("include", "/success");
    cy.contains("Kayıt işleminiz başarıyla tamamlanmıştır").should("be.visible");

  })
})

