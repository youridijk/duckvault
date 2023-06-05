import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchStackParamList} from '../../types/navigation/SearchStackParamList';
import IssueDetailScreen from '../screens/IssueDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import StackScreenOptions from '../../options/StackScreenOptions';
import {useTranslation} from 'react-i18next';

export default function () {
  const Stack = createNativeStackNavigator<SearchStackParamList>();
  const {t} = useTranslation();

  return (
    <Stack.Navigator screenOptions={StackScreenOptions}>
      <Stack.Screen
        name="Search"
        options={{
          title: t('navigation.search') as string,
        }}
        component={SearchScreen}
      />
      <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
    </Stack.Navigator>
  );
}
