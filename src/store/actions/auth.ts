import { User } from '../../API';

export enum iActionTypes {
  LOGOUT_USER = 'LOGOUT_USER',
  LOGIN_USER = 'LOGIN_USER',
  UPDATE_USER = 'UPDATE_USER',
}

/**
 * use like so:
 * dispatch = useDispatch(); // import from 'react-redux'
 * dispatch(logoutUser())
 */

export const logoutUser = () => ({
  type: iActionTypes.LOGOUT_USER,
});

export const loginUser = (payload: User) => ({
  type: iActionTypes.LOGIN_USER,
  payload,
});

export const updateUser = (payload: User) => ({
  type: iActionTypes.LOGIN_USER,
  payload,
});
