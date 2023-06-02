import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {IssuesListProvider} from './state/IssuesContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import TabBar from './view/screens/TabBar';
import {useFlipper} from '@react-navigation/devtools';

import './i18n/index';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

function App() {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <IssuesListProvider>
          <TabBar />
        </IssuesListProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
