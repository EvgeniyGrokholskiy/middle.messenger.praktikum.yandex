import Block from '../../utils/block';
import template from './chatItem.hbs';
import { getTime } from '../../helpers';

type TProps = {
  id: number;
  selected: number;
  avatar: string;
  chatName: string;
  lastMessageTime: string;
  isLastMessageOutgoing: boolean;
  lastMessage: string;
  unreadMessages: number;
  selectedChatClass: string;
  onClick: (chatId: number) => void;
  events: {
    click: () => void;
  };
};

export class ChatItem extends Block<TProps> {
  private readonly chatId: number;

  constructor(props: TProps) {
    super({
      ...props,
      lastMessageTime: getTime(props.lastMessageTime),
      selectedChatClass: props.id === props.selected ? 'chat-item_selected' : '',
      events: {
        click: () => this.props.onClick(this.chatId),
      },
    });
    this.chatId = props.id;
  }

  public show() {
    super.show();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
