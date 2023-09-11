import Block from '../../utils/block';
import template from './wrapper.hbs';

type TProps = {
  onClick: (event: Event) => void;
  class: string;
  events: {
    click: (event: Event) => void;
  };
};

export class Wrapper extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => props.onClick(event),
      },
    });
  }

  public show() {
    this.getContent()!.style.display = 'flex';
  }

  public hide() {
    super.hide();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
