import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from '../App';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import { elementsType, inputsName } from './helpers/arraysTest';
import Table from '../components/Table';
import { tableHeaders } from '../helpers';

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

describe('Teste da renderização dos componentes:', () => {
  afterEach(() => jest.clearAllMocks());

  it('O Header tem uma tag header com 3 filhos, sendo um "h1", um "p" e uma "div", com os textos corretos;', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i));

    const headerEl = screen.getByRole('banner');
    const soonsHeaderEl = headerEl.childNodes;
    const titleEl = screen.getByRole('heading', { level: 1 });
    const totalFieldEl = screen.getByTestId(/total-field/i);
    const currencyFieldEl = screen.getByTestId(/header-currency-field/i);
    const emailFieldEl = screen.getByTestId(/email-field/i);

    expect(headerEl).toBeVisible();
    expect(soonsHeaderEl).toHaveLength(3);
    elementsType.forEach((type, index) => {
      expect(soonsHeaderEl[index].nodeName).toBe(type);
    });
    expect(titleEl).toHaveTextContent('My Wallet');
    expect(totalFieldEl).toHaveTextContent('0.00');
    expect(currencyFieldEl).toHaveTextContent('BRL');
    expect(emailFieldEl).toHaveTextContent(initialState.user.email);
  });

  it('O formulário é renderizado corretamente na tela;', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    await act(async () => {
      renderWithRouterAndRedux(<WalletForm />, { initialEntries: ['/carteira'], initialState });
    });

    const inputs = screen.getAllByTestId(/input/i);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(inputs).toHaveLength(5);
    expect(button).toBeVisible();
    inputs.forEach((input, index) => {
      expect(input).toBeVisible();
      expect(input).toHaveAttribute('name', inputsName[index]);
    });
  });

  it('A tabela é renderizado corretamente na tela;', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Table />, { initialEntries: ['/carteira'], initialState });

    const tableEl = screen.getByRole('table');
    const trs = screen.getAllByRole('row');
    const ths = screen.getAllByRole('columnheader');

    expect(tableEl).toBeVisible();
    expect(tableEl.childNodes).toHaveLength(2);
    expect(trs).toHaveLength(1);
    expect(ths).toHaveLength(9);
    tableHeaders.forEach((header, index) => {
      expect(ths[index]).toHaveTextContent(header);
    });
    expect(tableEl.lastChild).toHaveTextContent('');
  });
});
