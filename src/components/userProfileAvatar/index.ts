import Block from '../../utils/block';
import template from './userProfileAvatar.hbs';
import { BASE_RESOURCES_URL } from '../../common/apiConst';
import avatarBackground from '../../img/avatarBackground.jpg';

type TProps = {
  avatarBackground: typeof avatarBackground;
  imageSrc: string;
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
      imageSrc: props.imageSrc ? `${BASE_RESOURCES_URL}${props.imageSrc}` : '',
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
