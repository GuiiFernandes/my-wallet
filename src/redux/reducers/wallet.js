import { REQUEST_CURRENCIES, CURRENCIES_SUCCESS, CURRENCIES_FAILURE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
  isAPIFailure: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isLoading: true,
    };
  case CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isLoading: false,
    };
  case CURRENCIES_FAILURE:
    return {
      ...state,
      isAPIFailure: true,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default wallet;
