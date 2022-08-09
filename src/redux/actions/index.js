import getCurrenciesAPI from '../../services/currenciesAPI';

export const USER = 'USER';
export const CURRENCIES = 'CURRENCIES';
export const EXPENSES = 'EXPENSES';

export const userLogin = (payload) => ({
  type: USER,
  payload,
});

export const currenciesAction = (payload) => ({
  type: CURRENCIES,
  payload,
});

export const currenciesActionThunk = () => async (dispatch) => {
  try {
    const response = await getCurrenciesAPI();
    const data = Object.keys(response);
    const currenciesList = data.filter((currencie) => currencie !== 'USDT');
    dispatch(currenciesAction(currenciesList));
  } catch (error) {
    console.error(error);
  }
};

export const expensesAction = (payload) => ({
  type: EXPENSES,
  payload,
});
