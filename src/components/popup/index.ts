import Block from '../../utils/block';
import template from './popup.hbs';

type TProps = {
  class: string;
};

export class Popup extends Block<TProps> {
  constructor(props: TProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
