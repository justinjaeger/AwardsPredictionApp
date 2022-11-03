import 'react-native-gesture-handler';
import React from 'react';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { Provider as StoreProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';
import theme from './theme';
import { persistor, store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />
        <StoreProvider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <ApplicationProvider {...eva} theme={{ ...theme }}>
            <Navigation />
          </ApplicationProvider>
          {/* </PersistGate> */}
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
