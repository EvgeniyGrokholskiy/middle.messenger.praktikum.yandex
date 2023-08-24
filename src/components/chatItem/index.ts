import Block from '../../utils/block';
import template from './chatItem.hbs';

type TProps = {
  selected: string;
  avatarUrl: string;
  chatName: string;
  lastMessageTime: string;
  isLastMessageOutgoing: boolean;
  lastMessage: string;
  unreadMessages: number;
};

export class ChatItem extends Block {
  constructor(props: TProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
