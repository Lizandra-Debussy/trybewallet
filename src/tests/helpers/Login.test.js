// import React from 'react';
// import { renderWithRouterAndRedux } from './renderWith';
// import { screen } from '@testing-library/react';
// import App from '../../App';
// import userEvent from '@testing-library/user-event';
// import user from '../../redux/reducers/user';

// describe('Testa a página de Login', () => {
//   it('Se existe dois inputs, um de email e o outro de senha', () => {
//     renderWithRouterAndRedux(<App />);

//     const emailInput = screen.getByPlaceholderText(/email/i);
//     expect(emailInput).toBeInTheDocument();

//     const passwordInput = screen.getByPlaceholderText(/senha/i);
//     expect(passwordInput).toBeInTheDocument();
//   });

//   it('Se aparece o botão com o texto "Entrar" após preencher email e senha', () => {
//     renderWithRouterAndRedux(<App />);

//     const emailInput = screen.getByPlaceholderText(/email/i);
//     userEvent.type(emailInput, 'user@gmail.com');

//     const passwordInput = screen.getByPlaceholderText(/senha/i);
//     userEvent.type(passwordInput, '147258');

//     const aboutButton = screen.getByRole('button', { name: /entrar/i });
//     expect(aboutButton).toBeInTheDocument();

//     });

//   // it('Se o usuário é redirecionado para a página /carteira, após clicar no botão de entrar', () => {
//   //   renderWithRouterAndRedux(<App />);
     // });

// });