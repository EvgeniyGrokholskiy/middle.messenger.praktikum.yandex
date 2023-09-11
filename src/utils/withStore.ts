import Block from './block';
import { isEqualObj } from './helpers';
import store, { IStore, STORE_EVENTS } from './store';

export function withStore<TSP>(mapStateToProps: (state: IStore) => TSP) {
  return function wrap<TP>(Component: typeof Block) {
    return class WithStore extends Component {
      private readonly onStoreUpdate: () => void;

      constructor(props: Omit<TP, keyof TSP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as TP), ...previousState });

        this.onStoreUpdate = () => {
          const stateProps: TSP = mapStateToProps(store.getState());

          if (isEqualObj(previousState, stateProps)) {
            return;
          }

          previousState = { ...stateProps };

          this.setProps({ ...stateProps });
        };

        store.on(STORE_EVENTS.UPDATED, this.onStoreUpdate);
      }

      componentWillUnmount() {
        store.off(STORE_EVENTS.UPDATED, this.onStoreUpdate);
      }
    };
  };
}
