import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import { screen } from '@testing-library/react';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('Testa a página de Login', () => {
  it('Se existe dois inputs, um de email e o outro de senha, além do botão de login', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('Se aparece o botão com o texto "Entrar" após preencher email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    userEvent.type(emailInput, 'user@gmail.com');

    const passwordInput = screen.getByPlaceholderText(/senha/i);
    userEvent.type(passwordInput, '147258');

    const aboutButton = screen.getByRole('button', { name: /entrar/i });
    expect(aboutButton).toBeInTheDocument();

    });

  it('Se o usuário é redirecionado para a página "/carteira" após clicar no botão de entrar', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    userEvent.type(emailInput, 'user@teste.com');

    const passwordInput = screen.getByPlaceholderText(/senha/i);
    userEvent.type(passwordInput, '112233');

    const aboutButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(aboutButton);

    const text = screen.getByText(/brl/i);
    expect(text).toBeInTheDocument();
  });
});

describe('Testa a página Wallet', () => {
  it('Se os elementos aparecem na tela', () => {
    const {history} = renderWithRouterAndRedux(<App />);

    history.push('/carteira')
    
    const value = screen.getByTestId('value-input');
    expect(value).toBeInTheDocument();

    const description = screen.getByTestId('description-input');
    expect(description).toBeInTheDocument();

    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();

    const aboutButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(aboutButton).toBeInTheDocument();
  });
});
