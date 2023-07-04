import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import { ProfileStackParamList } from '../../types/Navigation';
import stackScreenOptions from '../../options/StackScreenOptions';
import { useTranslation } from 'react-i18next';
import PrivateCollectionScreen from '../screens/PrivateCollectionScreen';

export default function() {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{
      ...stackScreenOptions,
      headerBackTitle: t('navigation.back') as string,
    }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t('navigation.profile') as string }}
      />

      <Stack.Screen
        name="PrivateCollection"
        component={PrivateCollectionScreen}
        options={{ title: t('navigation.privateCollection') as string }}
      />
    </Stack.Navigator>
  );
}
