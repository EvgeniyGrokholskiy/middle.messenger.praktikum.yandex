import Block from '../../utils/block';
import template from './userProfileAvatar.hbs';
import avatarBackground from '../../img/avatarBackground.jpg';

type TProps = {
  avatarBackground: typeof avatarBackground;
  imageSrc: string;
  classToBackgroundImage: string;
  class: string;
  onClick: () => void;
  events: {
    click: () => void;
  };
};

export class UserProfileAvatar extends Block<TProps> {
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
