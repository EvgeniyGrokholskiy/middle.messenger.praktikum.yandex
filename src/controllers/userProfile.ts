import { APP_PATH } from '../common/appPath';
import store, { TStore } from '../utils/store';
import router, { TRouter } from '../utils/router';
import { TUserApi, userApi } from '../api/userApi';
import { BASE_RESOURCES_URL } from '../common/apiConst';
import { addResourcesUrlInAvatars } from '../utils/helpers';
import { TSignupRequestData, TUserPassword } from '../api/types';

export type TUserProfileController = typeof userProfileController;

export type TMethodsResponse = {
  isError: boolean;
  errorMessage: string;
};

class UserProfileController {
  private readonly api: TUserApi;

  private readonly store: TStore;

  private readonly router: TRouter;

  constructor(api: TUserApi, storeObj: TStore, routerObj: TRouter) {
    this.api = api;
    this.store = storeObj;
    this.router = routerObj;
  }

  getUserProfile(userId: number): Promise<TMethodsResponse> {
    return this.api
      .getUserProfileById(userId)
      .then(response => {
        this.store.set('user', response);
        return {
          isError: false,
          errorMessage: '',
        };
      })
      .catch(error => {
        return this.errorHandler(error);
      });
  }

  changeUserProfileData(data: TSignupRequestData): Promise<TMethodsResponse> {
    return this.api
      .changeUserProfileData(data)
      .then(() => {
        this.store.set('user', data);
        return {
          isError: false,
          errorMessage: '',
        };
      })
      .catch(error => {
        return this.errorHandler(error);
      });
  }

  changeUserPassword(data: TUserPassword): Promise<TMethodsResponse> {
    return this.api
      .changeUserPasswordData(data)
      .then(() => {
        return {
          isError: false,
          errorMessage: '',
        };
      })
      .catch(error => {
        return this.errorHandler(error);
      });
  }

  setNewAvatar(data: FormData): Promise<TMethodsResponse> {
    return this.api
      .setNewAvatarData(data)
      .then(({ response: userData }) => {
        this.store.set('user', addResourcesUrlInAvatars(userData, BASE_RESOURCES_URL));
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
    if (status === 401) {
      this.router.go(APP_PATH.SIGN_IN);
    }
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

const userProfileController = new UserProfileController(userApi, store, router);

export default userProfileController;
