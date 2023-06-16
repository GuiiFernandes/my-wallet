export const emailsFailTest = ['email', 'email@', 'email@com', 'email@email@com', 'email@.', 'email.email.com', 'email@.com', '.email@email.com', '@email.com', 'email.com@'];

export const elementsType = ['H1', 'P', 'DIV'];

export const inputsName = ['description', 'tag', 'value', 'currency', 'method'];

export const valuesExpenses = [
  {
    insert: ['Teste0', 'Trabalho', '10', 'EUR', 'Cartão de débito'],
    expected: ['Teste0', 'Trabalho', 'Cartão de débito', '10.00', 'Euro/Real Brasileiro', '5.13', '51.27', 'Real', ''],
  },
  {
    insert: ['Teste1', 'Alimentação', '5', 'USD', 'Dinheiro'],
    expected: ['Teste1', 'Alimentação', 'Dinheiro', '5', 'Dólar Americano/Real Brasileiro', '4.75', '23.77', 'Real', ''],
  },
];
