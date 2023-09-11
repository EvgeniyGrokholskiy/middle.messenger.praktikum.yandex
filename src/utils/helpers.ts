import router from './router';
import { TChat, TUserData } from '../api/types';
import { APP_PATH } from '../common/appPath';
import { TUserProfilePage } from '../common/userProfilePageData';
import { TChatPage } from '../common/chatPageData';

export const backToChat = () => {
  router.go(APP_PATH.CHAT);
};

export const renderUserProfile = (event: Event) => {
  event.preventDefault();
  router.go(APP_PATH.USER_PROFILE);
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
  router.go(APP_PATH.CHAT);
};
export const renderChat = (event: Event) => {
  event.preventDefault();
  router.go(APP_PATH.CHAT);
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
    value as any,
  );
  return merge(object as Indexed, { ...result });
};

type PlainObject<T = any> = {
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

function isObject(value: any): value is Indexed {
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

// export const isEqualObj = (a: unknown, b: unknown): boolean => {

//
//   const aKeys = Object.keys(a);
//   const bKeys = Object.keys(b);
//
//   if (aKeys.length !== bKeys.length) {
//     return false;
//   }
//
//   aKeys.forEach(key => {
//     if (Object.hasOwn(b, key)) {
//       const aValue = a[key];
//       const bValue = b[key];
//
//       if (isObject(aValue) && isObject(bValue)) {
//         if (!isEqualObj(aValue, bValue)) {
//           return false;
//         }
//       } else if (aValue !== bValue) {
//         return false;
//       }
//     }
//     return false;
//   });
//
//   return true;
// };
//
// function isObject(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }

// function isArray(value: unknown): value is [] {
//   return Array.isArray(value);
// }
//
// type PlainObject<T = unknown> = {
//   [k in string]: T;
// };

// function isPlainObject(value: unknown): value is PlainObject {
//   return typeof value === 'object'
//     && value !== null
//     && value.constructor === Object
//     && Object.prototype.toString.call(value) === '[object Object]';
// }
//
// function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
//   return isPlainObject(value) || isArray(value);
// }

// function isEqual(lhs: PlainObject, rhs: PlainObject) {
//   // Сравнение количества ключей объектов и массивов
//   if (Object.keys(lhs).length !== Object.keys(rhs).length) {
//     return false;
//   }
//
//   for (const [key, value] of Object.entries(lhs)) {
//     const rightValue = rhs[key];
//     if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
//       // Здесь value и rightValue может быть только массивом или объектом
//       // И TypeScript это обрабатывает
//       if (isEqual(value, rightValue)) {
//         continue;
//       }
//       return false;
//     }
//
//     if (value !== rightValue) {
//       return false;
//     }
//   }
//
//   return true;
// }

// function cloneDeep(value: any): any {
//   if (Array.isArray(value)) {
//     return value.map((item) => cloneDeep(item));
//   } else if (typeof value === 'object' && value !== null) {
//     const copy = {} as any;
//     for (const key in value) {
//       if (value.hasOwnProperty(key)) {
//         copy[key] = cloneDeep(value[key] as any);
//       }
//     }
//     return copy;
//   } else {
//     return value;
//   }
// }

// function cloneDeep<T extends object = object>(obj: T) {
//   return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
//     // Handle:
//     // * null
//     // * undefined
//     // * boolean
//     // * number
//     // * string
//     // * symbol
//     // * function
//     if (item === null || typeof item !== "object") {
//       return item;
//     }
//
//     // Handle:
//     // * Date
//     if (item instanceof Date) {
//       return new Date(item.valueOf());
//     }
//
//     // Handle:
//     // * Array
//     if (item instanceof Array) {
//       let copy = [];
//
//       item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));
//
//       return copy;
//     }
//
//     // Handle:
//     // * Set
//     if (item instanceof Set) {
//       let copy = new Set();
//
//       item.forEach(v => copy.add(_cloneDeep(v)));
//
//       return copy;
//     }
//
//     // Handle:
//     // * Map
//     if (item instanceof Map) {
//       let copy = new Map();
//
//       item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
//
//       return copy;
//     }
//
//     // Handle:
//     // * Object
//     if (item instanceof Object) {
//       let copy: object = {};
//
//       // Handle:
//       // * Object.symbol
//       Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep(item[s])));
//
//       // Handle:
//       // * Object.name (other)
//       Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));
//
//       return copy;
//     }
//
//     throw new Error(`Unable to copy object: ${item}`);
//   })(obj);
// }

// type StringIndexed = Record<string, any>;
//
// function queryStringifyMY(data, prefix = '', rek = false) {
//   if (typeof data !== 'object') {
//     throw new Error('input must be an object');
//   }
//   let queryString = '';
//   for (const key in data) {
//     const value = data[key];
//     const fullKey = prefix ? `${prefix}[${key}]` : key;
//     if (typeof value === 'object') {
//       queryString += queryStringifyMY(value, fullKey, true);
//     } else if (Array.isArray(value)) {
//       for (let i = 0; i < value.length; i++) {
//         queryString += `${fullKey}[${i}]=${value[i]}&`;
//       }
//     } else {
//       queryString += `${fullKey}=${value}&`;
//     }
//   }
//   if (rek) {
//     return queryString;
//   }
//   return queryString.slice(0, -1);
// }
//
// function queryStringify(data: StringIndexed): string | never {
//   if (typeof data !== "object") {
//     throw new Error("Data must be object");
//   }
//
//   const keys = Object.keys(data);
//   return keys.reduce((result, key, index) => {
//     const value = data[key];
//     const endLine = index < keys.length - 1 ? "&" : "";
//
//     if (Array.isArray(value)) {
//       const arrayValue = value.reduce<StringIndexed>(
//         (result, arrData, index) => ({
//           ...result,
//           [`${key}[${index}]`]: arrData
//         }),
//         {}
//       );
//
//       return `${result}${queryStringify(arrayValue)}${endLine}`;
//     }
//
//     if (typeof value === "object") {
//       const objValue = Object.keys(value || {}).reduce<StringIndexed>(
//         (result, objKey) => ({
//           ...result,
//           [`${key}[${objKey}]`]: value[objKey]
//         }),
//         {}
//       );
//
//       return `${result}${queryStringify(objValue)}${endLine}`;
//     }
//
//     return `${result}${key}=${value}${endLine}`;
//   }, "");
// }
