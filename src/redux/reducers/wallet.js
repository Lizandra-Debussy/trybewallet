// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, EXPENSES, REMOVE_EXPENSES,
  EDIT_EXPENSE, UPDATE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  controlId: 0,
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.controlId, ...action.payload }],
      controlId: state.controlId + 1,
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses
        .map((expense) => (expense.id !== state.idToEdit ? expense : action.payload)),
    };
  default:
    return state;
  }
};

export default wallet;
