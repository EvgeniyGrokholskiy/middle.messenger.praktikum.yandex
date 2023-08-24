import Block from '../../utils/block';
import template from './userProfileAvatar.hbs';
import avatarBackground from '../../img/avatarBackground.jpg';

type TProps = {
  imageSrc: string;
  class: string,
  onClick: () => void;
  events: {
    click: () => void;
  }
};

export class UserProfileAvatar extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      avatarBackground,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}