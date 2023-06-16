import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import { emailsFailTest } from './helpers/arraysTest';

describe('Teste da página de Login:', () => {
  afterEach(() => jest.clearAllMocks());

  it('A página login é renderizada no inicio da aplicação com o botão de entrar desabilitado;', () => {
    renderWithRouterAndRedux(<App />);
    const titleEl = screen.getByRole('heading', { level: 1, name: /my wallet/i });
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const btnLoginEl = screen.getByRole('button', { name: /entrar/i });

    expect(titleEl).toBeVisible();
    expect(emailInput).toBeVisible();
    expect(passwordInput).toBeVisible();
    expect(btnLoginEl).toBeVisible();
    expect(btnLoginEl).toBeDisabled();
  });

  it('O botão de entrar é habilitado APENAS quando um email e senha válidos são preenchidos;', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const btnLoginEl = screen.getByRole('button', { name: /entrar/i });

    expect(btnLoginEl).toBeDisabled();
    act(() => {
      emailsFailTest.forEach((email) => {
        userEvent.type(emailInput, email);
        expect(btnLoginEl).toBeDisabled();
      });
      userEvent.type(passwordInput, '12345');
      expect(btnLoginEl).toBeDisabled();
      userEvent.type(emailInput, 'email@email.com');
      userEvent.type(passwordInput, '123456');
    });
    expect(btnLoginEl).toBeEnabled();
  });

  it('Ao clicar no botão de entrar, a rota muda para a página de carteira e o e-mail está na tela;', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const btnLoginEl = screen.getByRole('button', { name: /entrar/i });

    await act(async () => {
      userEvent.type(emailInput, 'email@email.com');
      userEvent.type(passwordInput, '123456');
      userEvent.click(btnLoginEl);
    });

    const headerEl = await screen.findByRole('banner');
    const soonsHeaderEl = headerEl.children;
    const { pathname } = history.location;
    const emailEl = screen.getByTestId('email-field');

    expect(headerEl).toBeVisible();
    expect(soonsHeaderEl).toHaveLength(3);
    expect(pathname).toBe('/carteira');
    expect(emailEl).toBeVisible();
  });
});
