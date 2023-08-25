import { nanoid } from 'nanoid';

import { EventBus } from './EventBus';
import { InputType } from './validator';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);

  protected props: Record<string, any>;

  protected refs: Record<string, Block> = {};

  public children: Record<string, Block>;

  private _eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  // private meta: { props: any } = { props: '' };

  constructor(propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);

    // this.meta = {
    //   props,
    // };

    this.children = children;
    this.props = this.makePropsProxy(props);

    this._eventBus = () => eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  private addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
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

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
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

  public setProps = (nextProps: any) => {
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
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this.addEvents();
  }

  protected compile(template: (context: any) => string, context: any) {
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

  private makePropsProxy(props: any) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
        return false;
      },
    });
  }

  // private _createDocumentElement(tagName: string) {
  //   // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
  //   return document.createElement(tagName);
  // }

  public getName(): InputType | '' {
    return '';
  }

  public validateInput() {}

  public enableEditMode() {}

  public getIsValid(): boolean {
    return true;
  }

  public show() {
    this.getContent()!.style.display = 'block';
  }

  public hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
