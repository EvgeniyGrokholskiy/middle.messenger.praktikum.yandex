import { expect } from 'chai';

import Block from './block.ts';
/* eslint-disable no-unused-expressions */
describe('Block class', () => {
  class ComponentMock extends Block {
    constructor(props: any) {
      super(props);
    }
  }
  const block = new ComponentMock({});

  it('Should have an id', () => {
    expect(block.id).to.be.a('string');
  });

  it('Method .setProps() should works correctly', () => {
    block.setProps({ text: 'text' });
    expect(block.props).to.have.property('text');
  });

  it('Block public variable children should not be null', () => {
    expect(block.children).to.be.not.null;
  });
});
