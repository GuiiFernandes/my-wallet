import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  uid: '',
  email: '',
  accessToken: '',
  displayName: '',
  phoneNumber: null,
  photoURL: '',
};

const setUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return action.user;
  default:
    return state;
  }
};

export default setUser;
