import { Text } from 'react-native';
import text from '../../styles/Text';

export default function({ error }: { error: any }) {
  return <Text style={text.h3}>Error fetching data {error.message ?? JSON.stringify(error, null, 2)}</Text>;
}
