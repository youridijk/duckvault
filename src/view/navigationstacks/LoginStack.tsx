import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../types/navigation/LoginStackParamList';
import LoginScreen from '../screens/LoginScreen';
import TabBar from '../screens/TabBar';

export default function() {
  const Stack = createNativeStackNavigator<LoginStackParamList>();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'TabBar'} component={TabBar} />
    </Stack.Navigator>
  );
}
