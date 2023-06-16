import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';
import { valuesExpenses } from './helpers/arraysTest';

const initialState = {
  user: {
    email: 'email@email.com',
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
    isLoading: true,
    isAPIFailure: false,
  },
};

describe('Teste de funcionamento da carteira:', () => {
  afterEach(() => jest.clearAllMocks());

  it('Lança uma despesa e soma o total corretamente;', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i));

    const inputs = screen.getAllByTestId(/input/i);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.type(inputs[0], 'Teste0');
      userEvent.selectOptions(inputs[1], 'Trabalho');
      userEvent.type(inputs[2], '10');
      userEvent.selectOptions(inputs[3], 'EUR');
      userEvent.selectOptions(inputs[4], 'Cartão de débito');
      userEvent.click(button);
    });

    await screen.findByText('Teste0');

    act(() => {
      userEvent.clear(inputs[0]);
      userEvent.clear(inputs[2]);
      userEvent.type(inputs[0], 'Teste1');
      userEvent.selectOptions(inputs[1], 'Alimentação');
      userEvent.type(inputs[2], '5');
      userEvent.selectOptions(inputs[3], 'USD');
      userEvent.selectOptions(inputs[4], 'Dinheiro');
      userEvent.click(button);
    });

    await screen.findByText('Teste1');

    const expenses = screen.getAllByRole('row');
    expect(expenses).toHaveLength(3);

    valuesExpenses.forEach(({ expected }, index) => {
      expected.forEach((data, indexData) => {
        if (indexData !== expected.length - 1) {
          expect(expenses[index + 1].childNodes[indexData]).toHaveTextContent(data);
        } else {
          expect(expenses[index + 1].childNodes[indexData].childNodes[0]).toHaveAttribute('data-testid', 'edit-btn');
          expect(expenses[index + 1].childNodes[indexData].childNodes[1]).toHaveAttribute('data-testid', 'delete-btn');
        }
      });
    });

    const total = screen.getByTestId(/total-field/i);

    expect(total).toHaveTextContent('75.03');
  });
});
