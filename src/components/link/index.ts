import Block from '../../utils/block';
import template from './link.hbs';

type TProps = {
  href: string;
  class: string;
  linkText: string;
  onClick: () => void;
  events: {
    click: () => void;
  }
}

export class Link extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
