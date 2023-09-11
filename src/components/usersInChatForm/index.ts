import Block from '../../utils/block';
import template from './usersInChatForm.hbs';

export class UsersInChatForm extends Block {
  constructor(props: any) {
    super({
      ...props,
      events: {
        submit: (event: Event) => this.onSubmit(event),
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const users = formData.getAll('users');
    this.props.onSubmit(users);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
