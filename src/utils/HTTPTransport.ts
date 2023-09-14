import { BASE_URL } from '../common/apiConst';

type HTTPMethod = (url: string, options: Record<string, any>) => Promise<XMLHttpRequest>;
type TRequestMethod = (
  url: string,
  options: Record<string, any>,
  timeout: number,
) => Promise<XMLHttpRequest>;

interface IHTTPTransport {
  get: HTTPMethod;
  put: HTTPMethod;
  post: HTTPMethod;
  delete: HTTPMethod;
}

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

const queryStringify = (data: Record<string, string>) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
};

class HTTPTransport implements IHTTPTransport {
  private static _instance: HTTPTransport;

  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    if (HTTPTransport._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl: string) {
    if (!HTTPTransport._instance) {
      this._instance = new HTTPTransport(baseUrl);
    }
    return this._instance;
  }

  public get: HTTPMethod = (url, options) => {
    const newUrl = options.data
      ? `${this.baseUrl}${url}${queryStringify(options.data)}`
      : `${this.baseUrl}${url}`;

    return this.request(newUrl, { ...options, method: METHODS.GET }, options.timeout);
  };

  public put: HTTPMethod = (url, options) =>
    this.request(`${this.baseUrl}${url}`, { ...options, method: METHODS.PUT }, options.timeout);

  public post: HTTPMethod = (url, options) =>
    this.request(`${this.baseUrl}${url}`, { ...options, method: METHODS.POST }, options.timeout);

  public delete: HTTPMethod = (url, options) =>
    this.request(`${this.baseUrl}${url}`, { ...options, method: METHODS.DELETE }, options.timeout);

  private request: TRequestMethod = (url, options, timeout = 5000) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data } = options;

      xhr.withCredentials = true;

      xhr.open(method, url);

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.responseType = 'json';

      xhr.timeout = timeout;
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };

      xhr.onabort = () => reject(new Error('Abort request'));
      xhr.onerror = () => reject(xhr);
      xhr.ontimeout = () => reject(new Error('Timeout error'));

      if (data instanceof FormData) {
        xhr.send(data);
      } else if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data || []));
      }
    });
}

export const httpTransport = HTTPTransport.getInstance(BASE_URL);
