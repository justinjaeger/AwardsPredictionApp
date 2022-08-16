import { User } from '../../API';
import { iActionTypes } from '../actions/auth';
export interface iSuperAuth {
  auth: iAuth;
}

export interface iAuth {
  isLoggedIn: boolean;
  storedEmail: string | undefined;
  user: User | undefined;
}

const initialState: iAuth = {
  isLoggedIn: false,
  storedEmail: undefined,
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
        storedEmail: action.payload.email,
        user: action.payload,
      };
    case iActionTypes.LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    case iActionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
