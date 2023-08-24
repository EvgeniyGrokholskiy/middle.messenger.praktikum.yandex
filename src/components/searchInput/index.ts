import Block from '../../utils/block';
import template from './searchInput.hbs';
import image from '../../img/searchIcon.svg';

type TProps = {
  value: string;
  placeholder: string;
  class: string;
};

export class SearchInput extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      imageSrc: image,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
