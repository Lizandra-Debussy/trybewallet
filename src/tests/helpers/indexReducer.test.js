import rootReducer from '../../redux/reducers/index';
import { CURRENCIES, EXPENSES, REMOVE_EXPENSES, EDIT_EXPENSE, UPDATE_EXPENSE } from '../../redux/actions'

describe('rootReducer', () => {
  it('deve combinar todos os redutores corretamente', () => {
    const userAction = {
      type: 'SET_USER',
      payload: {
        id: 1,
        name: 'John Doe',
      },
    };

    const currenciesAction = {
      type: CURRENCIES,
      payload: ['BRL', 'USD', 'EUR'],
    };

    const expensesAction1 = {
      type: EXPENSES,
      payload: {
        amount: 1000,
        description: 'Example I',
      },
    };

    const expensesAction2 = {
      type: EXPENSES,
      payload: {
        amount: 200,
        description: 'Example II',
      },
    };

    const removeExpensesAction = {
      type: REMOVE_EXPENSES,
      payload: 2,
    };

    const editExpenseAction = {
      type: EDIT_EXPENSE,
      id: 1,
    };

    const updateExpenseAction = {
      type: UPDATE_EXPENSE,
      payload: {
        amount: 2000,
        description: 'Example III',
        id: 1,
      },
    };

    const initialState = {
      user: {},
      wallet: {
        currencies: [],
        expenses: [],
        controlId: 0,
        editor: false,
        idToEdit: 0,
      },
    };

    const expectedState = {
      user: {
        id: 1,
        name: 'John Doe',
      },
      wallet: {
        currencies: ['BRL', 'USD', 'EUR'],
        expenses: [
          { amount: 1000, description: 'Example I', id: 1 },
          { amount: 200, description: 'Example II', id: 2 },
        ],
        controlId: 2,
        editor: false,
        idToEdit: 1,
      },
    };

    const state = [userAction, currenciesAction, expensesAction1, expensesAction2, removeExpensesAction, editExpenseAction, updateExpenseAction].reduce(rootReducer, initialState);
    expect(state).toEqual(expectedState);
  });
});
