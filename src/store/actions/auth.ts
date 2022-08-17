export enum iActionTypes {
  LOGOUT_USER = 'LOGOUT_USER',
  LOGIN_USER = 'LOGIN_USER',
}

/**
 * use like so:
 * dispatch = useDispatch(); // import from 'react-redux'
 * dispatch(logoutUser())
 */

export const logoutUser = () => ({
  type: iActionTypes.LOGOUT_USER,
});

export const loginUser = (payload: { userId: string; userEmail: string }) => ({
  type: iActionTypes.LOGIN_USER,
  payload,
});
