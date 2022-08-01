import { iActionTypes } from '../actions/auth';
export interface iSuperAuth {
  auth: iAuth;
}
export interface AuthUser {
  id: string;
  email: string;
}

export interface iAuth {
  isLoggedIn: boolean;
  user: AuthUser | undefined;
}

const initialState: iAuth = {
  isLoggedIn: false,
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
