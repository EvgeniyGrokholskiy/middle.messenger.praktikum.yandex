import { APP_PATH } from '../common/appPath';
import store, { TStore } from '../utils/store';
import { TMethodsResponse } from './userProfile';
import router, { TRouter } from '../utils/router';
import { authApi, TAuthApi } from '../api/authApi';
import { TSignInRequestData, TSignupRequestData } from '../api/types';

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
      .then(() => {
        this.getUserData();
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

  signup(data: TSignupRequestData): Promise<TMethodsResponse> {
    return this.api
      .signup(data)
      .then(() => {
        setTimeout(() => this.router.go(APP_PATH.CHAT), 200);
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
      .catch(() => {
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
