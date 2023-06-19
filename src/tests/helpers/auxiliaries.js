import mockData from './mockData';

const alimentacao = 'Alimentação';
const cartaoDebito = 'Cartão de débito';

export const emailsFailTest = ['email', 'email@', 'email@com', 'email@email@com', 'email@.', 'email.email.com', 'email@.com', '.email@email.com', '@email.com', 'email.com@', '@email@.', '@..'];

export const elementsType = ['H1', 'P', 'DIV'];

export const inputsName = ['description', 'tag', 'value', 'currency', 'method'];

export const valuesExpenses = [
  {
    insert: ['Teste0', 'Trabalho', '10', 'EUR', cartaoDebito],
    expected: ['Teste0', 'Trabalho', cartaoDebito, '10.00', 'Euro/Real Brasileiro', '5.13', '51.27', 'Real', ''],
    valuesData: { id: 0,
      description: 'Teste0',
      tag: 'Trabalho',
      method: cartaoDebito,
      value: '10',
      currency: 'EUR' },
  },
  {
    insert: ['Teste1', alimentacao, '5', 'USD', 'Dinheiro'],
    expected: ['Teste1', alimentacao, 'Dinheiro', '5', 'Dólar Americano/Real Brasileiro', '4.75', '23.77', 'Real', ''],
    valuesData: { id: 1,
      description: 'Teste1',
      tag: alimentacao,
      method: 'Dinheiro',
      value: '5',
      currency: 'USD' },
  },
];

export const valuesExpensesEdit = [
  {
    insert: ['Teste2', 'Lazer', '5', 'CAD', 'Dinheiro'],
    expected: ['Teste2', 'Lazer', 'Dinheiro', '5', 'Dólar Canadense/Real Brasileiro', '3.76', '18.78', 'Real', ''],
  },
  {
    insert: ['Teste3', 'Trabalho', '10', 'EUR', 'Cartão de crédito'],
    expected: ['Teste3', 'Trabalho', 'Cartão de crédito', '10', 'Euro/Real Brasileiro', '5.13', '51.27', 'Real', ''],
  },
];

export const createInitState = (notExpenses = true) => ({
  user: {
    email: 'email@email.com',
  },
  wallet: {
    currencies: [],
    expenses: notExpenses
      ? [] : valuesExpenses.map(({ valuesData }) => (
        { ...valuesData, exchangeRates: mockData }
      )),
    editor: false,
    idToEdit: 0,
    isLoading: true,
    isAPIFailure: false,
  },
});
