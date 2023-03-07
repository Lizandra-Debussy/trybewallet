import wallet from '../../redux/reducers/wallet';
import { CURRENCIES, EXPENSES, REMOVE_EXPENSES, EDIT_EXPENSE, UPDATE_EXPENSE } from '../../redux/actions/index';

describe('wallet reducer', () => {
  it('deve retornar o estado inicial', () => {
    expect(wallet(undefined, {})).toEqual({
      currencies: [],
      expenses: [],
      controlId: 0,
      editor: false,
      idToEdit: 0,
    });
  });
  
  it('deve lidar com  CURRENCIES', () => {
    const currencies = [{ code: 'USD', name: 'United States dollar' }];
    const action = { type: CURRENCIES, payload: currencies };
    expect(wallet({}, action)).toEqual({ currencies });
  });

  it('deve lidar com EXPENSES', () => {
    const expense = { value: 100, currency: 'USD', description: 'Example' };
    const action = { type: EXPENSES, payload: expense };
    expect(wallet({ expenses: [], controlId: 0 }, action)).toEqual({
      expenses: [{ id: 0, ...expense }],
      controlId: 1,
    });
  });

  it('deve lidar com REMOVE_EXPENSES', () => {
    const state = { expenses: [{ id: 0 }, { id: 1 }] };
    const action = { type: REMOVE_EXPENSES, payload: 0 };
    expect(wallet(state, action)).toEqual({ expenses: [{ id: 1 }] });
  });

  it('deve lidar com EDIT_EXPENSE', () => {
    const state = { editor: false, idToEdit: 0 };
    const action = { type: EDIT_EXPENSE, id: 1 };
    expect(wallet(state, action)).toEqual({ editor: true, idToEdit: 1 });
  });

  it('deve lidar com UPDATE_EXPENSE', () => {
    const state = {
      expenses: [{ id: 0, value: 100, currency: 'USD', description: 'Example' }],
      editor: true,
      idToEdit: 0,
    };
    const updatedExpense = { id: 0, value: 200, currency: 'BRL', description: 'Updated' };
    const action = { type: UPDATE_EXPENSE, payload: updatedExpense };
    expect(wallet(state, action)).toEqual({
      expenses: [updatedExpense],
      editor: false,
      idToEdit: 0,
    });
  });
});
