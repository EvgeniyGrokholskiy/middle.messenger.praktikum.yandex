import Block from '../../utils/block';
import template from './searchInput.hbs';
import image from '../../img/searchIcon.svg';

type TProps = {
  imageSrc: typeof image;
  value: string;
  placeholder: string;
  class: string;
  onKeyup: (value: string) => void;
  events: {
    keyup: (event: Event) => void;
  };
};

export class SearchInput extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
      imageSrc: image,
      events: {
        keyup: (event: Event) => this.keyupHandler(event),
      },
    });
  }

  keyupHandler(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.props.onKeyup(value);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
