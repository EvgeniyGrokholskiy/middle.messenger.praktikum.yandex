import Block from '../../utils/block';
import template from './message.hbs';
import { getTime } from '../../helpers';

type TMessageProps = {
  id: number;
  time: string;
  content: string;
  userId: number;
  outgoingMessage: string;
  class: string;
};

export class Message extends Block<TMessageProps> {
  constructor(props: TMessageProps) {
    super({
      ...props,
      outgoingMessage: props.id === props.userId ? 'true' : '',
      time: getTime(props.time),
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
