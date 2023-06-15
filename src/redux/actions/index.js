import fetchAPI from '../../services/fetchAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const CURRENCIES_SUCCESS = 'CURRENCIES_SUCCESS';
export const CURRENCIES_FAILURE = 'CURRENCIES_FAILURE';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

export const requestCurrencies = () => ({ type: REQUEST_CURRENCIES });

export const currenciesSuccess = (currencies) => ({
  type: CURRENCIES_SUCCESS,
  currencies,
});

export const currenciesFailure = () => ({ type: CURRENCIES_FAILURE });

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const currencies = await fetchAPI();
    dispatch(currenciesSuccess(currencies));
  } catch (error) {
    console.error(error);
    dispatch(currenciesFailure());
  }
};

export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });
