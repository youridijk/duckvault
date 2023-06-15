import {Text} from 'react-native';
import text from '../../styles/Text';

export default function ({error}: {error: Error}) {
  return <Text style={text.h3}>Error fetching data {error.message}</Text>;
}
