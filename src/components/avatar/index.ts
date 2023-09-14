import Block from '../../utils/block';
import template from './avatar.hbs';

type TProps = {
  src: string;
  imageClass: string;
  class: string;
  onClick: () => void;
  events: {
    click: () => void;
  };
};

export class Avatar extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: () => {
          if (props.onClick) {
            props.onClick();
          }
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
