import Block from '../../utils/block';
import template from './paragraph.hbs';

type TProps = {
  class: string;
  text: string;
};

export class Paragraph extends Block {
  constructor(props: TProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
