import { END_POINTS_URL } from '../common/apiConst';
import { httpTransport } from '../utils/HTTPTransport';
import { TSearchUserByLoginData, TSignInRequestData, TSignupRequestData } from './types';

export type TAuthApi = typeof authApi;

export const authApi = {
  signup(data: TSignupRequestData): Promise<XMLHttpRequest> {
    return httpTransport.post(END_POINTS_URL.SIGN_UP, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      data,
    });
  },
  login(data: TSignInRequestData): Promise<XMLHttpRequest> {
    return httpTransport.post(END_POINTS_URL.SIGN_IN, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      data,
    });
  },
  logout() {
    return httpTransport.post(END_POINTS_URL.AUTH_LOGOUT, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
    });
  },
  getUserData() {
    return httpTransport.get(END_POINTS_URL.AUTH_USER, {
      headers: {
        withCredentials: true,
      },
    });
  },
  searchUserByLogin(data: TSearchUserByLoginData) {
    return httpTransport.post(END_POINTS_URL.SEARCH_USER, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        withCredentials: true,
      },
      data,
    });
  },
};
