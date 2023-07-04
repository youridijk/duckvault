import colors from '../../styles/Colors';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeIcon as HomeIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutLine,
  UserIcon as UserIconOutline,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserIcon as UserIconSolid,
} from 'react-native-heroicons/solid';
import { useTranslation } from 'react-i18next';

type IconProps = { focused: boolean; color: string };

import HomeScreen from './HomeScreen';
import SearchStack from '../navigationstacks/SearchStack';
import ProfileStack from '../navigationstacks/ProfileStack';


export default function() {
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();

  function _homeIcon({ focused, color }: IconProps) {
    return focused ? <HomeIconSolid color={color} /> : <HomeIconOutline color={color} />;
  }

  function _searchIcon({ focused, color }: IconProps) {
    return focused ? <MagnifyingGlassIconSolid color={color} /> : <MagnifyingGlassIconOutLine color={color} />;
  }

  function _profileIcon({ focused, color }: IconProps) {
    return focused ? <UserIconSolid color={color} /> : <UserIconOutline color={color} />;
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
        name="ProfileStack"
        component={ProfileStack}
        options={{ tabBarIcon: _profileIcon, title: t('navigation.profile') as string }}
      />

      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{ tabBarIcon: _searchIcon, title: t('navigation.search') as string }}

      />
    </Tab.Navigator>
  );
}
