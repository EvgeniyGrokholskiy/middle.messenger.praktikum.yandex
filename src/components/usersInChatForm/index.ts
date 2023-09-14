import Block from '../../utils/block';
import template from './usersInChatForm.hbs';
import { TChatUserData } from '../../api/types';

type TProps = {
  usersInChat: TChatUserData[][];
  buttonText: string;
  onSubmit: (users: FormDataEntryValue[]) => void;
  events: {
    submit: (event: Event) => void;
  };
};

export class UsersInChatForm extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        submit: (event: Event) => this.onSubmit(event),
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const users = formData.getAll('users');

    this.props.onSubmit(users);

    form.reset();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
