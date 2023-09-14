import router from './router';
import { TChat, TUserData } from '../api/types';
import { APP_PATH } from '../common/appPath';
import { TUserProfilePage } from '../common/userProfilePageData';
import { TChatPage } from '../common/chatPageData';

export const backToChat = () => {
  router.go(APP_PATH.MESSENGER);
};

export const renderUserProfile = (event: Event) => {
  event.preventDefault();
  router.go(APP_PATH.SETTINGS);
};

export const renderRegisterPage = (event: Event) => {
  event.preventDefault();
  router.go(APP_PATH.SIGNUP);
};

export const renderLoginPage = (event: Event) => {
  event.preventDefault();
  router.go(APP_PATH.SIGN_IN);
};

export const navigateToLoginPage = () => {
  router.go(APP_PATH.SIGN_IN);
};

export const renderChatPage = (event: Event) => {
  event.preventDefault();
  router.go(APP_PATH.MESSENGER);
};
export const renderChat = (event: Event) => {
  event.preventDefault();
  router.go(APP_PATH.MESSENGER);
};

export const renderError5XXPage = (event: Event) => {
  event.preventDefault();
};

export const renderError404Page = (event: Event) => {
  event.preventDefault();
};

export const getUserProfilePageDataWithValues = (
  pageData: TUserProfilePage,
  userData: TUserData,
): TUserProfilePage => {
  if (userData) {
    return {
      ...pageData,
      userProfileInputBlockData: pageData.userProfileInputBlockData.map(inputData => {
        const key = inputData.ref as string;
        const value = String(userData[key]);
        return { ...inputData, value };
      }),
    };
  }
  return pageData;
};

export const addChatDataInChatPageData = (
  data: TChatPage,
  chatList: TChat[],
  userLogin: string,
): TChatPage => {
  const newChatList = chatList.map(chat => ({
    ...chat,
    isLastMessageOutgoing: chat?.last_message?.user?.login === userLogin ? 'true' : '',
  }));
  return { ...data, chatList: newChatList };
};

type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.keys(rhs).forEach(p => {
    if (Object.hasOwn(rhs, p)) {
      try {
        if (rhs[p]?.constructor === Object) {
          rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
          lhs[p] = rhs[p];
        }
      } catch (e) {
        lhs[p] = rhs[p];
      }
    }
  });

  return lhs;
}

export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as Indexed,
  );
  return merge(object as Indexed, { ...result });
};

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isObject(value: unknown): value is Indexed {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isEqualObj(lhs: unknown, rhs: unknown) {
  if (!isObject(lhs) || !isObject(rhs)) {
    return false;
  }

  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // eslint-disable-next-line
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (!isEqualObj(value, rightValue)) {
        return false;
      }
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export const addResourcesUrlInAvatars = (userData: TUserData, resourcesUrl: string): TUserData => {
  return {
    ...userData,
    avatar: `${resourcesUrl}${userData.avatar}`,
  };
};
