import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFlipper } from '@react-navigation/devtools';

import './i18n/index';
import Theme from './styles/Theme';
import AuthProvider from './state/auth/AuthProvider';
import FirstScreen from './view/screens/FirstScreen';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

function App() {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={Theme}>
        <AuthProvider>
          <FirstScreen />
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
