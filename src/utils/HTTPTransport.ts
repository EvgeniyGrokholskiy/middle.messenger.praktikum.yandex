type HTTPMethod = (url: string, options: Record<string, any>) => Promise<unknown>;
type TRequestMethod = (
  url: string,
  options: Record<string, any>,
  timeout: number,
) => Promise<unknown>;

interface IHTTPTransport {
  get: HTTPMethod;
  put: HTTPMethod;
  post: HTTPMethod;
  delete: HTTPMethod;
  request: TRequestMethod;
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
  get: HTTPMethod = (url, options) => {
    const newUrl = options.data ? `${url}${queryStringify(options.data)}` : url;

    return this.request(newUrl, { ...options, method: METHODS.GET }, options.timeout);
  };

  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request: TRequestMethod = (url, options, timeout = 5000) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data, headers, withCredentials } = options;

      xhr.withCredentials = withCredentials;

      xhr.open(method, url);

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
