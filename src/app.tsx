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
import { Hub } from 'aws-amplify';

const App = () => {
  // https://docs.amplify.aws/lib/utilities/hub/q/platform/js/#listening-for-messages
  // https://docs.amplify.aws/lib/utilities/hub/q/platform/js/#channels
  Hub.listen(/.*/, (data) => {
    console.error('Listening for all messages: ', data.payload.data);
  });

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
