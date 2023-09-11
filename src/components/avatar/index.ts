import Block from '../../utils/block';
import template from './avatar.hbs';

type TProps = {
  src: string;
  imageClass: string;
  class: string;
  onClick: () => void;
  events: {
    onclick: () => void;
  };
};

export class Avatar extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        onclick: props.onClick,
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
