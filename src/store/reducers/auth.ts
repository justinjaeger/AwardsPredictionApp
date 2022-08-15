import { User } from '../../API';
import { iActionTypes } from '../actions/auth';
export interface iSuperAuth {
  auth: iAuth;
}

export interface iAuth {
  isLoggedIn: boolean;
  hasLoggedInBefore: boolean;
  user: User | undefined;
}

const initialState: iAuth = {
  isLoggedIn: false,
  hasLoggedInBefore: false,
  user: undefined,
};

export const authReducer = (
  state = initialState,
  action: { type: keyof typeof iActionTypes; payload: any },
) => {
  switch (action.type) {
    case iActionTypes.LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        hasLoggedInBefore: true,
        user: action.payload,
      };
    case iActionTypes.LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
