import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../types/Navigation';
import LoginScreen from '../screens/LoginScreen';
import TabBar from '../screens/TabBar';
import RegistrationScreen from '../screens/RegistrationScreen';

export default function() {
  const Stack = createNativeStackNavigator<LoginStackParamList>();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Registration' component={RegistrationScreen} />
      <Stack.Screen name='TabBar' component={TabBar} />
    </Stack.Navigator>
  );
}
