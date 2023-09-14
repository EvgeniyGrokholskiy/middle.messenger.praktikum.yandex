import Block from '../../utils/block';
import template from './deleteChatButton.hbs';
import image from '../../img/deleteUserIcon.svg';

type TDeleteChatButtonProps = {
  imgSrc: typeof image;
  innerText: string;
  onClick: () => void;
  events: {
    click: () => void;
  };
};

export class DeleteChatButton extends Block<TDeleteChatButtonProps> {
  constructor(props: TDeleteChatButtonProps) {
    super({
      ...props,
      imgSrc: image,
      events: {
        click: () => this.onClickHandler(),
      },
    });
  }

  onClickHandler() {
    if (window.confirm('Вы действительно хотите удалить чат?')) {
      this.props.onClick();
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
