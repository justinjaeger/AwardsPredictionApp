import { NativeEventEmitter } from 'react-native';

export enum CustomEvent {
  KEYCHAIN_SET = 'KEYCHAIN_SET',
}

const endAllSessionsEventEmitter = new NativeEventEmitter({
  addListener: () => {},
  removeListeners: () => {},
});

export const listen = (callback: () => void) => {
  endAllSessionsEventEmitter.addListener(CustomEvent.KEYCHAIN_SET, () => {
    callback();
  });
};

export const emit = () => {
  endAllSessionsEventEmitter.emit(CustomEvent.KEYCHAIN_SET);
};

export const remove = () => {
  endAllSessionsEventEmitter.removeAllListeners(CustomEvent.KEYCHAIN_SET);
};
