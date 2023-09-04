import Block from '../../utils/block';
import template from './h1.hbs';

type TProps = {
  class: string;
  text: string;
};

export class H1 extends Block {
  constructor(props: TProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
