import Block from '../../utils/block';
import template from './searchUsers.hbs';

type TSearchUsersProps = {
  onSubmit: (login: string) => void;
  events: {
    submit: (event: Event) => void;
  };
};

export class SearchUsers extends Block<TSearchUsersProps> {
  constructor(props: TSearchUsersProps) {
    super({
      ...props,
      events: {
        submit: event => this.onSubmit(event),
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const [login] = form.getAll('login');
    this.props.onSubmit(login as string);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
