import { expect } from 'chai';
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';

import { HTTPTransport } from './HTTPTransport.ts';
import { BASE_URL, END_POINTS_URL } from '../common/apiConst.ts';

describe('HTTPTransport class', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // eslint-disable-next-line
    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = HTTPTransport.getInstance(BASE_URL);
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('Method .get() should send GET request', () => {
    instance.get(END_POINTS_URL.AUTH_USER, {});

    const [request] = requests;

    expect(request?.method).to.eq('GET');
  });

  it('Method .get() should send GET request with right query params', () => {
    instance.get(END_POINTS_URL.AUTH_USER, { data: { param1: 'test', param2: 'test' } });
    const expectUrl = `${BASE_URL}${END_POINTS_URL.AUTH_USER}?param1=test&param2=test`;

    const [request] = requests;
    const { url } = request;

    expect(url).to.eq(expectUrl);
  });

  it('Method .post() should send POST request', () => {
    instance.post(END_POINTS_URL.AUTH_LOGOUT, {});

    const [request] = requests;

    expect(request?.method).to.eq('POST');
  });

  it('Method .put() should send PUT request', () => {
    instance.put(END_POINTS_URL.AVATAR, {});

    const [request] = requests;

    expect(request?.method).to.eq('PUT');
  });

  it('Method .delete() should send DELETE request', () => {
    instance.delete(END_POINTS_URL.CHATS, {});

    const [request] = requests;

    expect(request?.method).to.eq('DELETE');
  });
});
