import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from '../App';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import { elementsType, inputsName, createInitState } from './helpers/auxiliaries';
import Table from '../components/Table';
import { tableHeaders } from '../helpers';

const initialState = createInitState();

describe('Teste da renderização dos componentes:', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  }));

  afterEach(() => jest.clearAllMocks());

  it('O Header tem uma tag header com 3 filhos, sendo um "h1", um "p" e uma "div", com os textos corretos;', async () => {
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

  it('Se houver um erro na requisição da API, o erro é exibido na tela;', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API is down'));
    const log = jest.spyOn(console, 'error');

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const errorEl = await screen.findByRole('heading', { level: 2 });

    expect(errorEl).toBeVisible();
    expect(errorEl).toHaveTextContent('Erro ao carregar moedas!');
    expect(log).toHaveBeenCalledWith(new Error('API is down'));
  });
});
