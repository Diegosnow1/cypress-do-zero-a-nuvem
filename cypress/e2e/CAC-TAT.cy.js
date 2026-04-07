describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })

  it.only('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

 
  it.only('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('DIEGO')
    cy.get('#lastName').type('JOSE')
    cy.get('#email').type('DIEGOSNOWAGORA@GMAIL.COM')
    cy.get('#open-text-area').type('TESTE')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible') //Mensagem enviada com sucesso.

    
  })



    it.only('Utilizar o long text', () => {
    const longText = Cypress._.repeat('TESTE ', 20) //Gerar um texto longo repetindo a palavra "TESTE" 20 vezes.
    cy.get('#firstName').type('DIEGO')
    cy.get('#lastName').type('JOSE')
    cy.get('#email').type('DIEGOSNOWAGORA@GMAIL.COM')
    cy.get('#open-text-area').type(longText,{delay:0}) //Preencher o campo de texto com o texto longo gerado, sem delay entre as teclas.
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible') //Mensagem enviada com sucesso.

    
  })
    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('DIEGO')
    cy.get('#lastName').type('JOSE')
    cy.get('#email').type('DIEGOSNOWAGORAGMAIL.COM')
    cy.get('#open-text-area').type('TESTE')

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible') //Mensagem de erro exibida.

    
  })


    it.only('validar que, se um valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('#phone').type('abc')

    cy.get('#phone').should('have.value', '') //Verificar que o campo de telefone continua vazio, pois valores não-numéricos não devem ser aceitos.

    
  })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('DIEGO')
    cy.get('#lastName').type('JOSE')
    cy.get('#email').type('DIEGOSNOWAGORAGMAIL.COM')
    cy.get('#phone-checkbox').check().should('be.checked') //Marcar a checkbox que torna o telefone obrigatório.
    cy.get('#open-text-area').type('TESTE')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible') //Mensagem de erro exibida.

    
  })

  

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('DIEGO').should('have.value', 'DIEGO').clear().should('have.value', '')
    cy.get('#lastName').type('JOSE').should('have.value', 'JOSE').clear().should('have.value', '')
    cy.get('#email').type('DIEGOSNOWAGORAGMAIL.COM').should('have.value', 'DIEGOSNOWAGORAGMAIL.COM').clear().should('have.value', '')
    cy.get('#phone').type('11999999999').should('have.value', '11999999999').clear().should('have.value', '')
    cy.get('#open-text-area').type('TESTE').should('have.value', 'TESTE').clear().should('have.value', '')  
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible') //Mensagem de erro exibida.

    
  })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible') //Mensagem de erro exibida.

    
  })


    it.only('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstname: 'DIEGO',
      lastname: 'JOSE',
      email: 'DIEGOSNOWAGORA@GMAIL.COM',
      text: 'TESTE'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible') //Mensagem enviada com sucesso.

    
  })

    it.only('seleciona um produto (YouTube) por seu texto', () => {

    //Selecionar a opção "YouTube" do dropdown de produtos usando seu texto visível.
    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value', 'youtube')

 })

    it.only('seleciona um produto (Mentoria) por seu valor ', () => {

    //Selecionar a opção "Mentoria" do dropdown de produtos usando seu valor.
    cy.get('#product').select('mentoria')
    cy.get('#product').should('have.value', 'mentoria')

 })

    it.only('seleciona um produto (Blog) por índice', () => {

    //A opção "Selecione" ocupa o índice 0, então "Blog" fica no índice 1.
    cy.get('#product').select(1)
    cy.get('#product').should('have.value', 'blog')

 })
    it.only('marca o tipo de atendimento "Feedback', () => {

    //Marcar a opção "Feedback" do tipo de atendimento usando seu texto visível.
    cy.get('input[type="radio"]').check('feedback').should('be.checked')

   

 })

    it.only('marca cada tipo de atendimento ', () => {

  
    cy.get('input[type="radio"]').each(($radio) => {
    cy.wrap($radio).check()
    .should('be.checked') //Marcar cada opção de tipo de atendimento e verificar se está marcada.
    })


  })


  
    it.only('marca ambos checkboxes, depois desmarca o último ', () => {
    cy.get('input[type="checkbox"]')
    .check().should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked') //Marcar ambos checkboxes e verificar se estão marcados, depois desmarcar o último e verificar se não está mais marcado.

  })

  
    it.only('seleciona um arquivo da pasta fixtures ', () => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should('exist') //Selecionar um arquivo usando o caminho relativo da fixture.
   
  })

      it.only('seleciona um arquivo simulando um drag-and-drop ', () => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
      .should('exist') //Selecionar um arquivo usando o caminho relativo da fixture.
   
  })

      it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias ', () => {
      cy.fixture('example.json').as('sampleFile') //Carregar o arquivo da fixture e atribuir um alias a ele.
      cy.get('input[type="file"]')
      .selectFile('@sampleFile',{action:'drag-drop'})
      .should('exist') //Selecionar um arquivo usando o caminho relativo da fixture.
   
  })

      it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.get('#privacy a')
      .should('have.attr', 'target', '_blank') //Verificar que o link para a política de privacidade tem o atributo target="_blank", indicando que ele abrirá em outra aba.
   
  })

  
      it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy a')
      .invoke('removeAttr', 'target') //Remover o atributo target do link para a política de privacidade para que ele abra na mesma aba.
      .click() //Clicar no link para acessar a página da política de privacidade.
      
      cy.contains('Talking About Testing')
      .should('be.visible') //Verificar que o conteúdo da página da política de privacidade está visível, confirmando que a navegação foi bem-sucedida.
  })


  })

 
 