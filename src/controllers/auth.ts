import { APP_PATH } from '../common/appPath';
import store, { TStore } from '../utils/store';
import { TMethodsResponse } from './userProfile';
import router, { TRouter } from '../utils/router';
import { authApi, TAuthApi } from '../api/authApi';
import { API_ERROR_MESSAGES } from '../common/const';
import { TSearchUserByLoginData, TSignInRequestData, TSignupRequestData } from '../api/types';

export type TAuthController = typeof authController;

class AuthController {
  private readonly api: TAuthApi;

  private readonly store: TStore;

  private readonly router: TRouter;

  constructor(api: TAuthApi, storeObj: TStore, routerObj: TRouter) {
    this.api = api;
    this.store = storeObj;
    this.router = routerObj;
  }

  login(data: TSignInRequestData): Promise<TMethodsResponse> {
    return this.api
      .login(data)
      .then(async () => {
        const result = await this.getUserData();
        if (result) {
          this.router.go(APP_PATH.CHAT);
          return {
            isError: false,
            errorMessage: '',
          };
        }
        return {
          isError: true,
          errorMessage: 'get userDate error',
        };
      })
      .catch(error => {
        return this.errorHandler(error);
      });
  }

  signup(data: TSignupRequestData): Promise<TMethodsResponse> {
    return this.api
      .signup(data)
      .then(() => {
        this.router.go(APP_PATH.CHAT);
        return {
          isError: false,
          errorMessage: '',
        };
      })
      .catch(error => {
        return this.errorHandler(error);
      });
  }

  getUserData(): Promise<boolean> {
    return this.api
      .getUserData()
      .then(({ response: userData }) => {
        this.store.set('user', userData);
        return true;
      })
      .catch(error => {
        const { status } = error;
        const errorText = error.response.reason;
        if (status === 401 && errorText === API_ERROR_MESSAGES.COOKIE_NOT_VALID) {
          this.router.go(APP_PATH.SIGN_IN);
        }
        this.router.go(APP_PATH.SIGN_IN);
        return false;
      });
  }

  logout(): Promise<TMethodsResponse> {
    return this.api
      .logout()
      .then(() => {
        this.router.go(APP_PATH.SIGN_IN);
        this.store.set('user', {});
        return {
          isError: false,
          errorMessage: '',
        };
      })
      .catch(error => {
        return this.errorHandler(error);
      });
  }

  searchUser(data: TSearchUserByLoginData) {
    return this.api
      .searchUserByLogin(data)
      .then(response => {
        const result = response.response;
        return result;
      })
      .catch(error => this.errorHandler(error));
  }

  errorHandler(error: XMLHttpRequest) {
    const { status } = error;
    if (status === 404) {
      this.router.go(APP_PATH.ERROR_404);
    }
    if (status >= 500) {
      this.router.go(APP_PATH.ERROR_5XX);
    }
    return {
      isError: true,
      errorMessage: error.response.reason,
    };
  }
}

const authController = new AuthController(authApi, store, router);

export default authController;
