import colors from '../../styles/Colors';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeIcon as HomeIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutLine,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
} from 'react-native-heroicons/solid';
import {useTranslation} from 'react-i18next';

import HomeScreen from './HomeScreen';
import SearchStackScreen from '../navigationstacks/SearchStackScreen';


export default function () {
  const Tab = createBottomTabNavigator();
  const {t} = useTranslation();

  function _homeIcon({focused, color}: {focused: boolean; color: string}) {
    return focused ? <HomeIconSolid color={color} /> : <HomeIconOutline />;
  }

  function _searchIcon({focused, color}: {focused: boolean; color: string}) {
    return focused ? (
      <MagnifyingGlassIconSolid color={color} />
    ) : (
      <MagnifyingGlassIconOutLine />
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.white,
        },
        tabBarLabelStyle: {
          color: colors.white,
          fontSize: 13,
          fontWeight: 'bold',
        },
      }}>
      {/*<Tab.Screen*/}
      {/*  name={t('navigation.home')}*/}
      {/*  component={HomeScreen}*/}
      {/*  options={{tabBarIcon: _homeIcon}}*/}
      {/*/>*/}
      <Tab.Screen
        name={t('navigation.issues')}
        component={SearchStackScreen}
        options={{tabBarIcon: _searchIcon}}
      />
    </Tab.Navigator>
  );
}
