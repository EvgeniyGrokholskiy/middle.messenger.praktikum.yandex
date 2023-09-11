import Block from '../../utils/block';
import template from './newMessageBlock.hbs';

type TProps = {
  onSubmit: (message: string) => void;
  class: string;
  events: {
    submit: (event: Event) => void;
  };
};

export class NewMessageBlock extends Block<TProps> {
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

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const [message] = formData.getAll('message');

    this.props.onSubmit(message as string);

    form.reset();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
