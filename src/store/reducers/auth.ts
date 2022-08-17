import { iActionTypes } from '../actions/auth';
export interface iSuperAuth {
  auth: iAuth;
}

export interface iAuth {
  isLoggedIn: boolean;
  userId: string | undefined;
  userEmail: string | undefined;
}

const initialState: iAuth = {
  isLoggedIn: false,
  userId: undefined,
  userEmail: undefined,
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
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
      };
    case iActionTypes.LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    default:
      return state;
  }
};
