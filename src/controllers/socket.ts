import store, { TStore } from '../utils/store';
import { WEBSOCKET_COMMANDS, WEBSOCKET_STATUSES, WEBSOCKET_URL } from '../common/apiConst';

type TWebsocketData = {
  chatId: number;
  userId: number;
  token: string;
};

type TMessageOffset = {
  offset: number;
};

export class WebSocketController {
  private websocket: WebSocket;

  private readonly socketURL: string = '';

  private chatId: number;

  private userId: number;

  private ping: NodeJS.Timeout;

  private token: string;

  private store: TStore;

  private COMMANDS: typeof WEBSOCKET_COMMANDS;

  private STATUSES: typeof WEBSOCKET_STATUSES;

  constructor(
    socketURL: string,
    statuses: typeof WEBSOCKET_STATUSES,
    state: TStore,
    commands: typeof WEBSOCKET_COMMANDS,
  ) {
    this.store = state;
    this.COMMANDS = commands;
    this.STATUSES = statuses;
    this.socketURL = socketURL;
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  private addListener() {
    this.websocket.addEventListener(this.STATUSES.OPEN, this.onOpen);
    this.websocket.addEventListener(this.STATUSES.CLOSE, this.onClose);
    this.websocket.addEventListener(this.STATUSES.ERROR, this.onError);
    this.websocket.addEventListener(this.STATUSES.MESSAGE, this.onMessage);
  }

  private removeListener() {
    this.websocket.removeEventListener(this.STATUSES.OPEN, this.onOpen);
    this.websocket.removeEventListener(this.STATUSES.CLOSE, this.onClose);
    this.websocket.removeEventListener(this.STATUSES.ERROR, this.onError);
    this.websocket.removeEventListener(this.STATUSES.MESSAGE, this.onMessage);
  }

  public connect(options: TWebsocketData) {
    this.chatId = options.chatId;
    this.userId = options.userId;
    this.token = options.token;

    if (this.websocket) {
      this.closeWebsocket();
    }

    this.websocket = new WebSocket(
      `${this.socketURL}${options.userId}/${options.chatId}/${options.token}`,
    );

    this.addListener();
  }

  private onOpen() {
    this.getMessages({ offset: 0 });
    this.ping = this.sendPingHandler();
  }

  private sendPingHandler() {
    return setInterval(
      () => this.websocket.send(JSON.stringify({ type: this.COMMANDS.PING })),
      10000,
    );
  }

  private onError(event: ErrorEvent) {
    const { message } = event;
    this.store.set('errorMessage', message);
    console.error(message);
  }

  private reconnect() {
    this.connect({
      token: this.token,
      userId: this.userId,
      chatId: this.chatId,
    });
  }

  private readonly onMessage = (event: MessageEvent) => {
    let data;

    try {
      data = JSON.parse(event.data);
    } catch (e) {
      data = [];
    } finally {
      if (Array.isArray(data)) {
        if (!data.length) {
          this.store.set('messages', []);
        } else if (data[0].id === 0) {
          this.store.set('messages', data);
        } else {
          const messages = [...data];

          this.store.set('messages', messages);
        }
      } else if (typeof data === 'object' && data.type === 'message') {
        const messages = [data, ...this.store.getState().messages];
        this.store.set('messages', messages);
      }

      console.log(event.data);
    }
  };

  private onClose(event: CloseEvent) {
    const { code, reason, wasClean } = event;
    this.removeListener();
    if (code === 1006) {
      this.reconnect();
    }
    if (wasClean) {
      console.log('Соединение закрыто');
    } else {
      console.error('Что-то пошло не так ((((');
    }
    console.log(`Status: code: ${code}, reason: ${reason}`);
  }

  public closeWebsocket() {
    clearInterval(this.ping);
    this.websocket.close();
    this.removeListener();
  }

  public getMessages(options: TMessageOffset) {
    this.websocket.send(
      this.stringifyIt({
        content: options.offset.toString(),
        type: this.COMMANDS.GET_OLD_MESSAGES,
      }),
    );
  }

  private stringifyIt(data: unknown): string {
    return JSON.stringify(data);
  }

  public sendMessage(message: string) {
    this.websocket.send(
      this.stringifyIt({
        content: message,
        type: this.STATUSES.MESSAGE,
      }),
    );
  }
}

const webSocketController = new WebSocketController(
  WEBSOCKET_URL,
  WEBSOCKET_STATUSES,
  store,
  WEBSOCKET_COMMANDS,
);

export default webSocketController;
