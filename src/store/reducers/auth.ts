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
      console.error('logging in');
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
      };
    case iActionTypes.LOGOUT_USER:
      console.error('logging out');
      return {
        ...state,
        isLoggedIn: false,
        userId: undefined,
      };
    default:
      return state;
  }
};
