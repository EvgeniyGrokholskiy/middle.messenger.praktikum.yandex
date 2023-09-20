import sinon from 'sinon';
import { expect } from 'chai';

import Block from './block.ts';
import router from './router.ts';
import { APP_PATH } from '../common/appPath.ts';

describe('Router class', () => {
  const baseURL = 'http://localhost:3000';
  const windowHistoryBack = window.history.back;
  const windowHistoryForward = window.history.forward;
  const getFirstFakeContent = sinon.fake.returns(document.createElement('div'));

  const fakeBlock = class {
    getContent = getFirstFakeContent;

    componentWillUnmount = () => {
      console.log('fakeBlock will unmount');
    };
  } as unknown as typeof Block;

  before(() => {
    router.use(APP_PATH.SIGN_IN, fakeBlock).use(APP_PATH.SIGNUP, fakeBlock);
  });

  beforeEach(() => {
    window.history.back = sinon.fake();
    window.history.forward = sinon.fake();
  });

  after(() => {
    window.history.back = windowHistoryBack;
    window.history.forward = windowHistoryForward;
  });

  it('Method .use() should return Router instance', () => {
    const result = router.use(APP_PATH.SIGN_IN, fakeBlock);

    expect(result).to.eq(router);
  });

  it('Method .start() should render a page on start', () => {
    router.start();

    expect(getFirstFakeContent.callCount).to.eq(1);
  });

  it('Method .forward() should call window history forward', () => {
    router.forward();

    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it('Method .back() should call window history back', () => {
    router.back();

    expect((window.history.back as any).callCount).to.eq(1);
  });

  it('Method .go() should render correct page on right path', () => {
    router.go(APP_PATH.SIGNUP);

    expect(window.location.href).to.be.eq(`${baseURL}${APP_PATH.SIGNUP}`);
  });
});
