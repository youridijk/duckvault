import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../types/navigation/SearchStackParamList';
import IssueDetailScreen from '../screens/IssueDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import StackScreenOptions from '../../options/StackScreenOptions';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button } from 'react-native';
import useAuth from '../../state/auth/useAuth';

export default function() {
  const Stack = createNativeStackNavigator<SearchStackParamList>();
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        ...StackScreenOptions,
        headerBackTitle: t('navigation.back') as string,
      }}
    >
      <Stack.Screen
        name="Search"
        options={{
          title: t('navigation.search') as string,
          navigationBarHidden: true,
          headerTransparent: false,
          headerBackTitleVisible: false,
          // headerShown: false,
          headerRight: () => (
            <Button
              onPress={logout}
              title="Logout"
            />
          ),
        }}
        component={SearchScreen}
      />
      <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
    </Stack.Navigator>
  );
}
