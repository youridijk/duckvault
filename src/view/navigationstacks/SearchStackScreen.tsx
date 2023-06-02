import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchStackParamList} from '../../types/navigation/SearchStackParamList';
import IssueDetailScreen from '../screens/IssueDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import StackScreenOptions from '../../options/StackScreenOptions';

export default function () {
  const Stack = createNativeStackNavigator<SearchStackParamList>();

  return (
    <Stack.Navigator screenOptions={StackScreenOptions}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
    </Stack.Navigator>
  );
}
