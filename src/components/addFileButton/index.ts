import Block from '../../utils/block';
import template from './addFileButton.hbs';
import image from '../../img/addIcon.svg';

type TProps = {
  imageSrc: typeof image;
  class: string;
  onClick: () => void;
  events: {
    click: () => void;
  };
};

export class AddFileButton extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
      imageSrc: image,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
