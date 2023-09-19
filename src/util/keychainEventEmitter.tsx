import { NativeEventEmitter } from 'react-native';

export enum CustomEvent {
  KEYCHAIN_SET = 'KEYCHAIN_SET',
}

const keychainEventEmitter = new NativeEventEmitter({
  addListener: () => {},
  removeListeners: () => {},
});

const listen = (callback: () => void) => {
  keychainEventEmitter.addListener(CustomEvent.KEYCHAIN_SET, () => {
    callback();
  });
};

const emit = () => {
  keychainEventEmitter.emit(CustomEvent.KEYCHAIN_SET);
};

const remove = () => {
  keychainEventEmitter.removeAllListeners(CustomEvent.KEYCHAIN_SET);
};

const KeychainEventEmitter = {
  listen,
  emit,
  remove,
};

export default KeychainEventEmitter;
