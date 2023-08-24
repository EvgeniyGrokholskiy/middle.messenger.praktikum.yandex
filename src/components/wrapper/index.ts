import Block from '../../utils/block';
import template from './wrapper.hbs';

type TProps = {
  onClick: () => void;
  class: string;
};

export class Wrapper extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  show() {
    this.getContent()!.style.display = 'flex';
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
