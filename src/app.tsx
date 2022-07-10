import 'react-native-gesture-handler';
import React from 'react';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { Provider as StoreProvider } from 'react-redux';
import { persistor, store } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';
import theme from './theme';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationProvider {...eva} theme={{ ...theme }}>
            <Navigation />
          </ApplicationProvider>
        </PersistGate>
      </StoreProvider>
    </>
  );
};

export default App;
