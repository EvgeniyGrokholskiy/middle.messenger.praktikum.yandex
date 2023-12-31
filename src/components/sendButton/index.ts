import Block from '../../utils/block';
import template from './sendButton.hbs';
import image from '../../img/rightArrow.svg';

type TProps = {
  imageSrc: typeof image;
};

export class SendButton extends Block<TProps> {
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
