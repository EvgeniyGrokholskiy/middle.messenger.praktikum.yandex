import { nanoid } from 'nanoid';

import { EventBus } from './EventBus';
import { InputType } from './validator';

export type TEvent = (event: Event) => void;

export type TEvents = { [key: string]: ((event: Event) => void) | undefined };
// type TEventsType<Refs> = { [key in keyof Refs]?: TEvent } | TEvent; тип из видео про компонентный подход

abstract class Block<TProps extends Record<string, unknown> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  protected props: TProps;

  protected refs: Record<string, Block | Block[]> = {};

  public children: Record<string, Block | Block[]> = {};

  private _eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  // private meta: { props: any } = { props: '' };

  constructor(propsWithChildren: TProps) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);

    // this.meta = {
    //   props,
    // };

    this.children = children;
    this.props = this.makePropsProxy(props);

    this._eventBus = () => eventBus;

    this.registerEvents(eventBus);

    this.makePropsProxy = this.makePropsProxy.bind(this);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private getChildrenAndProps(childrenAndProps: TProps) {
    const props: Record<string, any> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      const isArrayWithLength = Array.isArray(value) && value.length > 0;
      const isEveryValueInstanceOfBlock = isArrayWithLength
        ? value.every(item => item instanceof Block)
        : false;

      if (isArrayWithLength && isEveryValueInstanceOfBlock) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value as Block;
      } else {
        props[key] = value;
      }
    });

    return { props: props as TProps, children };
  }

  private getEvents() {
    const { events = {} } = this.props as TProps & { events: TEvents };
    return events;
  }

  private addEvents() {
    const events = this.getEvents();

    Object.keys(events).forEach(eventName => {
      const eventsCallback = events[eventName] as EventListenerOrEventListenerObject;

      if (this._element) {
        this._element.addEventListener(eventName as keyof HTMLElementEventMap, eventsCallback);
      }
    });
  }

  // eslint-disable-next-line
  // @ts-ignore
  private removeEvents() {
    const events = this.getEvents();

    Object.keys(events).forEach(eventName => {
      const eventsCallback = events[eventName] as EventListenerOrEventListenerObject;

      if (this._element && eventsCallback) {
        this._element.removeEventListener(eventName as keyof HTMLElementEventMap, eventsCallback);
      }
    });
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(!this.children).forEach(child => child.dispatchComponentDidMount());
  }

  // private _componentDidUpdate(oldProps: any, newProps: any) {
  //     if (this.componentDidUpdate(oldProps, newProps)) {
  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line
  // protected componentDidUpdate(oldProps: any, newProps: any) {
  protected componentDidUpdate() {
    return true;
  }

  public setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this.removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this.addEvents();
  }

  public compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs };

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  private makePropsProxy(props: TProps, self: Block = this) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof TProps];
        const isFunction = typeof value === 'function';

        return isFunction ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop as keyof TProps] = value;

        self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        // throw new Error('Нет доступа');
        return false;
      },
    });
  }

  // private _createDocumentElement(tagName: string) {
  //   return document.createElement(tagName);
  // }

  public getName(): InputType | '' {
    return '';
  }

  public validateInput() {}

  protected enableEditMode() {}

  public getIsValid(): boolean {
    return true;
  }

  protected show() {
    this.getContent()!.style.display = 'block';
  }

  public hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
