import Block from '../../utils/block';
import template from './outMessageItem.hbs';

type TProps = {
  class: string;
  messageText: string;
  imageUrl: string;
  sendTime: string;
};

export class OutMessageItem extends Block<TProps> {
  constructor(props: TProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
