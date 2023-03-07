import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import { screen } from '@testing-library/react';
// fireEvent
import App from '../../App';
import userEvent from '@testing-library/user-event';
// import user from '../../redux/reducers/user';
// import  WalletForm from '../../components/WalletForm'
// import { handleSubmit } from '../../components/WalletForm'

describe('Testa a página de Login', () => {
  it('Se existe dois inputs, um de email e o outro de senha, além do botão de login', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Se aparece o botão com o texto "Entrar" após preencher email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    
    userEvent.type(emailInput, 'user@gmail.com');
    userEvent.type(passwordInput, '147258');

    const aboutButton = screen.getByRole('button', { name: /entrar/i });
    expect(aboutButton).toBeInTheDocument();

    });

  it('Se o usuário é redirecionado para a página "/carteira" após clicar no botão de entrar', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const aboutButton = screen.getByRole('button', { name: /entrar/i });
    
    userEvent.type(emailInput, 'user@teste.com');
    userEvent.type(passwordInput, '112233');
    userEvent.click(aboutButton);
    
    const text = screen.getByText(/brl/i);
    expect(text).toBeInTheDocument();
  });
});

describe('Testa a página Wallet', () => {
  it('Se renderiza as entradas do formulário', () => {
    const {history} = renderWithRouterAndRedux(<App />);

    history.push('/carteira')
    
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const aboutButton = screen.getByRole('button', { name: /adicionar despesa/i });
    
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
  });

  // it('Se atualiza os valores do formulário na mudança de entrada', () => {
  //   const onSubmitMock = jest.fn();
  //   renderWithRouterAndRedux(<WalletForm onSubmit={handleSubmit} />);

  //   const form = screen.getByTestId('wallet-form');
  //   const valueInput = screen.getByTestId('value-input');
  //   const descriptionInput = screen.getByTestId('description-input');
  //   const currencyInput = screen.getByTestId('currency-input');
  //   const methodInput = screen.getByTestId('method-input');
  //   const tagInput = screen.getByTestId('tag-input');
  //   const submitButton = screen.getByRole('button', { name: 'Adicionar Despesa' });

  //   fireEvent.change(valueInput, { target: { value: '10' } });
  //   fireEvent.change(descriptionInput, { target: { value: 'Mantimentos' } });
  //   fireEvent.change(currencyInput, { target: { value: 'USD' } });
  //   fireEvent.change(methodInput, { target: { value: 'Cartão de crédito' } });
  //   fireEvent.change(tagInput, { target: { value: 'Alimentação' } });
  //   fireEvent.submit(submitButton);

  //   fireEvent.submit(form);

  //   expect(onSubmitMock).toHaveBeenCalled();
  //   expect(onSubmitMock).toHaveBeenCalledWith({
  //     value: '10',
  //     description: 'Mantimentos',
  //     currency: 'USD',
  //     method: 'Cartão de crédito',
  //     tag: 'Alimentação',
  //   });
  // });
});


// All files           |    78.4 |       85 |    64.7 |   80.73