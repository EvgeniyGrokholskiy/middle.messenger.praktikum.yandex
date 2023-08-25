interface IHTTPTransport {
  get: (url: string, options: Record<string, any> = {}) => Promise<unknown>;
  put: (url: string, options: Record<string, any> = {}) => Promise<unknown>;
  post: (url: string, options: Record<string, any> = {}) => Promise<unknown>;
  deleted: (url: string, options: Record<string, any> = {}) => Promise<unknown>;
  request: (url: string, options: Record<string, any> = {}) => Promise<unknown>;
}

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const queryStringify = (data: Record<string, string>) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
};

export class HTTPTransport implements IHTTPTransport {
  get = (url, options: Record<string, any> = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put = (url, options: Record<string, any> = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post = (url, options: Record<string, any> = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete = (url, options: Record<string, any> = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url, options, timeout = 5000) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data, headers, withCredentials } = options;

      xhr.withCredentials = withCredentials;

      xhr.open(method, method === METHODS.GET && data ? `${url}${queryStringify(data)}` : url);

      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.timeout = timeout;
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(`Error: ${xhr.status}, ${xhr.statusText}`));
        }
      };

      xhr.onabort = () => reject(new Error('Abort request'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Timeout error'));

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data || []));
      }
    });
}
