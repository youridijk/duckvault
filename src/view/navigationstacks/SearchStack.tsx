import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../types/Navigation';
import IssueDetailScreen from '../screens/IssueDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import StackScreenOptions from '../../options/StackScreenOptions';
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function() {
  const Stack = createNativeStackNavigator<SearchStackParamList>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        ...StackScreenOptions,
        headerBackTitle: t('navigation.back') as string,
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: t('navigation.search') as string,
        }}
      />
      <Stack.Screen
        name="IssueDetail"
        component={IssueDetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
