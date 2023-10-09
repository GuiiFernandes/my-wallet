import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const emailValid = 'email@email.com';

describe('[Startest] Teste da página de Login:', () => {
  afterEach(() => jest.clearAllMocks());

  it('A página login é renderizada no inicio da aplicação com o botão de entrar desabilitado;', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const btnLoginEl = screen.getByRole('button', { name: /entrar/i });

    expect(history.location.pathname).toBe('/');
    expect(emailInput).toBeVisible();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toBeVisible();
    expect(passwordInput).toHaveValue('');
    expect(btnLoginEl).toBeVisible();
    expect(btnLoginEl).toBeDisabled();
  });

  it('O botão de entrar é habilitado APENAS quando um email e senha válidos são preenchidos;', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const btnLoginEl = screen.getByRole('button', { name: /entrar/i });

    expect(btnLoginEl).toBeDisabled();
    act(() => {
      userEvent.type(passwordInput, '123456');
      userEvent.type(emailInput, 'emailInvalid');
      expect(btnLoginEl).toBeDisabled();
      userEvent.clear(passwordInput);
      userEvent.clear(emailInput);
      userEvent.type(emailInput, emailValid);
      userEvent.type(passwordInput, '12345');
      expect(btnLoginEl).toBeDisabled();
      userEvent.clear(passwordInput);
      userEvent.type(passwordInput, '123456');
    });
    expect(btnLoginEl).toBeEnabled();
  });

  it('Ao clicar no botão de entrar, a rota muda para a página de carteira e o e-mail está na tela;', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history, store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const btnLoginEl = screen.getByRole('button', { name: /entrar/i });

    await act(async () => {
      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
      userEvent.type(emailInput, emailValid);
      userEvent.type(passwordInput, '123456');

      expect(emailInput).toHaveValue(emailValid);
      expect(passwordInput).toHaveValue('123456');
      userEvent.click(btnLoginEl);
    });

    const headerEl = await screen.findByRole('banner');
    const soonsHeaderEl = headerEl.children;
    const { pathname } = history.location;
    const emailEl = screen.getByTestId('email-field');

    expect(global.fetch).toBeCalledTimes(1);
    expect(headerEl).toBeVisible();
    expect(soonsHeaderEl).toHaveLength(3);
    expect(pathname).toBe('/carteira');
    expect(emailEl).toBeVisible();
    expect(store.getState().user.email).toBe(emailValid);
  });
});
