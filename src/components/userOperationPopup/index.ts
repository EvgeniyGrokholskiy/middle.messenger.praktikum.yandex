import Block from '../../utils/block';
import template from './userOperationPupup.hbs';

type UserOperationPopupProps = {
  headerText: string;
  buttonText: string;
  data: any;
  onSubmit: (userLogin: string) => void;
};

export class UserOperationPopup extends Block<UserOperationPopupProps> {
  constructor(props: UserOperationPopupProps) {
    super({
      ...props,
      ...props.data,
      events: {
        click: (event: Event) => event.stopPropagation(),
        submit: (event: Event) => this.onSubmit(event),
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const [login] = formData.getAll('login');
    this.props.onSubmit(login as string);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
