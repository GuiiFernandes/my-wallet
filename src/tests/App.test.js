import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';
import { valuesExpenses, valuesExpensesEdit, createInitState } from './helpers/auxiliaries';

const postExpense = async (inputs, button, insert) => {
  act(() => {
    for (let index = 0; index < insert.length; index += 1) {
      if (index === 0 || index === 2) {
        userEvent.clear(inputs[index]);
        userEvent.type(inputs[index], insert[index]);
      } else {
        userEvent.selectOptions(inputs[index], insert[index]);
      }
    }
    userEvent.click(button);
  });

  await screen.findByText(insert[0]);
};

const checkReturnExpenses = (dataExpenses, expenses) => {
  dataExpenses.forEach(({ expected }, index) => {
    expected.forEach((data, indexData) => {
      if (indexData !== expected.length - 1) {
        expect(expenses[index + 1].childNodes[indexData]).toHaveTextContent(data);
      } else {
        expect(expenses[index + 1].childNodes[indexData].childNodes[0]).toHaveAttribute('data-testid', 'edit-btn');
        expect(expenses[index + 1].childNodes[indexData].childNodes[1]).toHaveAttribute('data-testid', 'delete-btn');
      }
    });
  });
};

describe('Teste de funcionamento da carteira:', () => {
  afterEach(() => jest.clearAllMocks());

  it('Lança uma despesa e soma o total corretamente;', async () => {
    const initialState = createInitState();

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i));

    const inputs = screen.getAllByTestId(/input/i);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    await postExpense(inputs, button, valuesExpenses[0].insert);
    await postExpense(inputs, button, valuesExpenses[1].insert);

    const expenses = screen.getAllByRole('row');
    expect(expenses).toHaveLength(3);

    checkReturnExpenses(valuesExpenses, expenses);

    const total = screen.getByTestId(/total-field/i);

    expect(total).toHaveTextContent('75.03');
  });

  it('Edita uma despesa já lançada;', async () => {
    const initialState = createInitState(false);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i));

    const editBtnEl = screen.getAllByTestId(/edit-btn/i);

    act(() => {
      userEvent.click(editBtnEl[0]);
    });

    const inputs = screen.getAllByTestId(/input/i);
    const saveEditBtn = await screen.findByRole('button', { name: /editar despesa/i });

    await postExpense(inputs, saveEditBtn, valuesExpensesEdit[0].insert);

    act(() => {
      userEvent.click(editBtnEl[1]);
    });

    await postExpense(inputs, saveEditBtn, valuesExpensesEdit[1].insert);

    const expenses = screen.getAllByRole('row');
    expect(expenses).toHaveLength(3);

    checkReturnExpenses(valuesExpensesEdit, expenses);

    const total = screen.getByTestId(/total-field/i);

    expect(total).toHaveTextContent('70.05');
  });

  it('Deleta uma despesa já lançada;', async () => {
    const initialState = createInitState(false);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i));

    const deleteBtnEl = screen.getAllByTestId(/delete-btn/i);

    act(() => {
      userEvent.click(deleteBtnEl[0]);
    });

    const expenses = screen.getAllByRole('row');
    expect(expenses).toHaveLength(2);

    act(() => {
      userEvent.click(deleteBtnEl[1]);
    });

    const expenses2 = screen.getAllByRole('row');
    expect(expenses2).toHaveLength(1);
  });
});
